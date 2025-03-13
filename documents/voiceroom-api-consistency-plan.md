# Voice Room API Consistency Improvement Plan

## Background

Currently, the `voiceroomApi.ts` file has been migrated to use the `ky` client for API requests. However, there's an inconsistency in how the API functions handle responses:

- Most API functions in the codebase return parsed JSON responses (response body)
- `VrCreateApi` and `VrEditApi` in `voiceroomApi.ts` return the raw `Response` object instead of the parsed JSON

This inconsistency makes it harder to use these APIs and reduces type safety across the application.

## Proposed Changes

The following changes should be made to improve consistency:

1. Update all Voice Room API functions to return parsed JSON responses
2. Apply proper TypeScript interfaces to the return values
3. Ensure consistent error handling across all functions
4. Identify and update any code that depends on the current behavior

## Implementation Details

### 1. Update `VrCreateApi`

Current implementation:
```typescript
export const VrCreateApi = async (spaceID: number, name: string): Promise<Response | null> => {
  try {
    const response = await client.post(`space/${spaceID}/voiceRoom`, {
      json: { name },
    });
    return response;
  } catch (error) {
    console.error("[VrCreateApi]", error);
    return null;
  }
};
```

Proposed implementation:
```typescript
export const VrCreateApi = async (spaceID: number, name: string): Promise<VoiceRoomCreateResponse | null> => {
  try {
    const response = await client.post(`space/${spaceID}/voiceRoom`, {
      json: { name },
    });
    return await response.json();
  } catch (error) {
    console.error("[VrCreateApi]", error);
    return null;
  }
};
```

### 2. Update `VrEditApi`

Current implementation:
```typescript
export const VrEditApi = async (spaceID: number, vrList: updateRoom[]): Promise<Response | null> => {
  try {
    const response = await client.patch(`space/${spaceID}/voiceRoom`, {
      json: { updateRoomList: vrList },
    });
    return response;
  } catch (error) {
    console.error("[VrEditApi]", error);
    return null;
  }
};
```

Proposed implementation:
```typescript
export const VrEditApi = async (spaceID: number, vrList: updateRoom[]): Promise<VoiceRoomEditResponse | null> => {
  try {
    const response = await client.patch(`space/${spaceID}/voiceRoom`, {
      json: { updateRoomList: vrList },
    });
    return await response.json();
  } catch (error) {
    console.error("[VrEditApi]", error);
    return null;
  }
};
```

### 3. Ensure Proper Interface Usage

Make sure all defined interfaces are properly utilized:

```typescript
/**
 * Response type for voice room token API
 */
export interface VoiceRoomTokenResponse extends ApiResponse {
  result: {
    token: string;
  };
}

/**
 * Response type for voice room creation API
 */
export interface VoiceRoomCreateResponse extends ApiResponse {
  result: {
    id: number;
    name: string;
  };
}

/**
 * Response type for voice room edit API
 */
export interface VoiceRoomEditResponse extends ApiResponse {
  result: {
    updatedRooms: {
      id: number;
      name: string;
    }[];
  };
}
```

### 4. Identify and Fix Dependent Code

Before implementing these changes, we need to identify all code that depends on `VrCreateApi` and `VrEditApi` returning `Response` objects. This is critical to prevent breaking existing functionality.

Steps to identify dependent code:

1. **Search for Direct API Calls**: Use grep or code search to find all instances where `VrCreateApi` and `VrEditApi` are called.

   ```bash
   grep -r "VrCreateApi" --include="*.tsx" --include="*.ts" src/
   grep -r "VrEditApi" --include="*.tsx" --include="*.ts" src/
   ```

2. **Analyze Usage Patterns**: For each usage found, analyze how the response is being handled:
   - If the code calls `.json()` on the response, it will break with the new implementation
   - If the code checks response status or headers, it will break with the new implementation
   - If the code only checks if the response is null, it may continue to work

3. **Common Patterns to Look For**:

   ```typescript
   // Pattern 1: Calling .json() on the response
   const response = await VrCreateApi(spaceId, name);
   if (response) {
     const data = await response.json();
     // Use data...
   }

   // Pattern 2: Checking response status
   const response = await VrCreateApi(spaceId, name);
   if (response && response.ok) {
     // Do something...
   }

   // Pattern 3: Accessing headers
   const response = await VrCreateApi(spaceId, name);
   if (response) {
     const someHeader = response.headers.get('some-header');
     // Use header...
   }
   ```

4. **Fix Dependent Code**: Update all dependent code to work with the new return type:

   ```typescript
   // Before:
   const response = await VrCreateApi(spaceId, name);
   if (response) {
     const data = await response.json();
     // Use data...
   }

   // After:
   const data = await VrCreateApi(spaceId, name);
   if (data) {
     // Use data directly...
   }
   ```

5. **Special Cases**: For code that needs access to response status or headers, consider:
   - Adding this information to the response interface
   - Creating helper functions that provide this information
   - In extreme cases, creating alternative API functions that return the raw Response

## Benefits

1. **Improved Type Safety**: By using proper TypeScript interfaces, we ensure type safety throughout the application.
2. **Consistent API Usage**: All API functions will follow the same pattern, making the codebase more maintainable.
3. **Better Developer Experience**: Developers can rely on consistent behavior across all API functions.
4. **Reduced Bugs**: Type checking will catch potential issues at compile time rather than runtime.

## Implementation Timeline

This task should be implemented in a separate branch to avoid conflicts with the current migration work. The changes are relatively small and focused, but require careful testing to ensure no functionality is broken.

Suggested approach:
1. Identify all dependent code (1-2 days)
2. Create a plan for updating dependent code (1 day)
3. Implement changes to API functions and dependent code (1-2 days)
4. Test thoroughly (1-2 days)

## Testing Plan

After implementation, the following should be tested:

1. Creating a new voice room
2. Editing existing voice rooms
3. Verifying that the returned data matches the expected interface structure
4. Ensuring that error handling works correctly
5. Testing all components and features that use these APIs
6. Regression testing of related functionality

## Conclusion

By implementing these changes, we'll improve the consistency and type safety of the Voice Room API functions, making them align with the rest of the codebase and enhancing the overall developer experience. However, it's crucial to carefully identify and update all dependent code to prevent breaking existing functionality.
