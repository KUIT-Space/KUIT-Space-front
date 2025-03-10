import { useSuspenseQuery } from "@tanstack/react-query";

import { ApiResponse, client } from "../client";

export const eventKeys = {
  all: (spaceId: number) => ["events", spaceId] as const,
  lists: (spaceId: number) => [...eventKeys.all(spaceId), "list"] as const,
  list: (spaceId: number, filters: string) => [...eventKeys.lists(spaceId), { filters }] as const,
  details: (spaceId: number) => [...eventKeys.all(spaceId), "detail"] as const,
  detail: (spaceId: number, eventId: number) => [...eventKeys.details(spaceId), eventId] as const,
};

// Type Definitions
interface EventInfoResponse {
  id: number;
  name: string;
  image: string;
  date: string;
  startTime: string;
  endTime: string;
}

interface EventParticipantInfo {
  id: number;
  name: string;
  profileImageUrl: string;
}

interface ReadEventsResponse {
  events: EventInfoResponse[];
}

interface ReadEventInfoResponse {
  id: number;
  name: string;
  image: string;
  date: string;
  startTime: string;
  endTime: string;
  participants: EventParticipantInfo[];
}

interface CreateEventResponse {
  id: number;
}

interface CreateEventRequest {
  name: string;
  image: string; // This would be a URL after image upload
  date: string;
  startTime: string;
  endTime: string;
}

interface UpdateEventParticipantRequest {
  spaceMemberId: number[];
}

/**
 * Create a new event
 * @param spaceId Space ID
 * @param eventData Event data to create
 * @returns Created event response with ID
 */
export const createEvent = async (
  spaceId: number,
  eventData: CreateEventRequest,
): Promise<ApiResponse<CreateEventResponse>> => {
  const params = new URLSearchParams();

  // Add event data to URL params
  Object.entries(eventData).forEach(([key, value]) => {
    params.append(key, value.toString());
  });

  return client.post(`space/${spaceId}/event?${params.toString()}`).json();
};

/**
 * Get all events for a space
 * @param spaceId Space ID
 * @returns List of events
 */
export const getEvents = async (spaceId: number): Promise<ApiResponse<ReadEventsResponse>> => {
  return client.get(`space/${spaceId}/events`).json();
};

export const useEventsQuery = (spaceId: number) => {
  return useSuspenseQuery({
    queryKey: eventKeys.lists(spaceId),
    queryFn: () => getEvents(spaceId),
  });
};

/**
 * Get details of a specific event
 * @param spaceId Space ID
 * @param eventId Event ID
 * @returns Event details including participants
 */
export const getEvent = async (
  spaceId: number,
  eventId: number,
): Promise<ApiResponse<ReadEventInfoResponse>> => {
  return client.get(`space/${spaceId}/event/${eventId}`).json();
};

export const useEventQuery = (spaceId: number, eventId: number) => {
  return useSuspenseQuery({
    queryKey: eventKeys.detail(spaceId, eventId),
    queryFn: () => getEvent(spaceId, eventId),
  });
};

/**
 * Delete an event
 * @param spaceId Space ID
 * @param eventId Event ID
 * @returns Success response
 */
export const deleteEvent = async (
  spaceId: number,
  eventId: number,
): Promise<ApiResponse<{ success: boolean }>> => {
  return client.delete(`space/${spaceId}/event/${eventId}`).json();
};

/**
 * Join an event
 * @param spaceId Space ID
 * @param eventId Event ID
 * @returns Success response
 */
export const joinEvent = async (
  spaceId: number,
  eventId: number,
): Promise<ApiResponse<{ success: boolean }>> => {
  return client.post(`space/${spaceId}/event/${eventId}/join`).json();
};

/**
 * Add participants to an event
 * @param spaceId Space ID
 * @param eventId Event ID
 * @param members Array of space member IDs to add as participants
 * @returns Success response
 */
export const addEventParticipants = async (
  spaceId: number,
  eventId: number,
  members: number[],
): Promise<ApiResponse<{ success: boolean }>> => {
  return client
    .post(`space/${spaceId}/event/${eventId}/participant/update`, {
      json: { spaceMemberId: members },
    })
    .json();
};

/**
 * Remove participants from an event
 * @param spaceId Space ID
 * @param eventId Event ID
 * @param members Array of space member IDs to remove as participants
 * @returns Success response
 */
export const removeEventParticipants = async (
  spaceId: number,
  eventId: number,
  members: number[],
): Promise<ApiResponse<{ success: boolean }>> => {
  return client
    .post(`space/${spaceId}/event/${eventId}/participant/delete`, {
      json: { spaceMemberId: members },
    })
    .json();
};
