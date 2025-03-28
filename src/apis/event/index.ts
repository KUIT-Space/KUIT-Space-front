import {
  QueryObserverOptions,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from "@tanstack/react-query";

import { ApiResponse, client } from "../client";

export const eventKeys = {
  all: (spaceId: number) => ["events", spaceId] as const,
  lists: (spaceId: number) => [...eventKeys.all(spaceId), "list"] as const,
  list: (spaceId: number, filters: string) => [...eventKeys.lists(spaceId), { filters }] as const,
  details: (spaceId: number) => [...eventKeys.all(spaceId), "detail"] as const,
  detail: (spaceId: number, eventId: number) => [...eventKeys.details(spaceId), eventId] as const,
};

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
  events: ReadEventsInfoResponse[];
}

export interface ReadEventInfoResponse {
  id: number;
  name: string;
  image: string;
  date: string;
  startTime: string;
  endTime: string;
  participants: EventParticipantInfo[];
}

export interface ReadEventsInfoResponse {
  id: number;
  name: string;
  image: string;
  date: string;
  startTime: string;
  endTime: string;
  totalNumberOfParticipants: number;
}

interface CreateEventResponse {
  id: number;
}

interface CreateEventRequest {
  name: string;
  image: File | null;
  date: string;
  startTime: string;
  endTime: string;
}

interface UpdateEventParticipantRequest {
  spaceMemberId: number[];
}

/**
 * Create a new event in a space
 * @param spaceId Space ID
 * @param eventData Event data
 * @returns Created event ID
 */
const createEvent = async (
  spaceId: number,
  eventData: CreateEventRequest,
): Promise<ApiResponse<CreateEventResponse>> => {
  const formData = new FormData();
  formData.append("name", eventData.name);
  formData.append("image", eventData.image!);
  formData.append("date", eventData.date);
  formData.append("startTime", eventData.startTime);
  formData.append("endTime", eventData.endTime);

  return client.post(`space/${spaceId}/event`, { body: formData }).json();
};

export const useCreateEvent = (spaceId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (eventData: CreateEventRequest) => createEvent(spaceId, eventData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: eventKeys.lists(spaceId),
      });
    },
  });
};

/**
 * Get all events for a space
 * @param spaceId Space ID
 * @returns List of events
 */
const getEvents = async (spaceId: number): Promise<ApiResponse<ReadEventsResponse>> => {
  return client.get(`space/${spaceId}/events`).json();
};

export const useEventsQuery = (
  spaceId: number,
  options?: Partial<
    UseSuspenseQueryOptions<
      ApiResponse<ReadEventsResponse>,
      Error,
      ApiResponse<ReadEventsResponse>,
      ReturnType<typeof eventKeys.lists>
    >
  >,
) => {
  return useSuspenseQuery({
    queryKey: eventKeys.lists(spaceId),
    queryFn: () => getEvents(spaceId),
    ...options,
  });
};

/**
 * Get details of a specific event
 * @param spaceId Space ID
 * @param eventId Event ID
 * @returns Event details including participants
 */
const getEvent = async (
  spaceId: number,
  eventId: number,
): Promise<ApiResponse<ReadEventInfoResponse>> => {
  return client.get(`space/${spaceId}/event/${eventId}`).json();
};

export const useEventQuery = (
  spaceId: number,
  eventId: number,
  options?: Partial<
    UseSuspenseQueryOptions<
      ApiResponse<ReadEventInfoResponse>,
      Error,
      ApiResponse<ReadEventInfoResponse>,
      ReturnType<typeof eventKeys.detail>
    >
  >,
) => {
  return useSuspenseQuery({
    queryKey: eventKeys.detail(spaceId, eventId),
    queryFn: () => getEvent(spaceId, eventId),
    ...options,
  });
};

/**
 * Delete an event
 * @param spaceId Space ID
 * @param eventId Event ID
 * @returns Success response
 */
const deleteEvent = async (
  spaceId: number,
  eventId: number,
): Promise<ApiResponse<{ success: boolean }>> => {
  return client.delete(`space/${spaceId}/event/${eventId}`).json();
};

export const useDeleteEvent = (spaceId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (eventId: number) => deleteEvent(spaceId, eventId),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: eventKeys.lists(spaceId),
      }),
  });
};

/**
 * Join an event
 * @param spaceId Space ID
 * @param eventId Event ID
 * @returns Success response
 */
const joinEvent = async (
  spaceId: number,
  eventId: number,
): Promise<ApiResponse<{ success: boolean }>> => {
  return client.post(`space/${spaceId}/event/${eventId}/join`).json();
};

export const useJoinEvent = (spaceId: number, eventId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => joinEvent(spaceId, eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: eventKeys.detail(spaceId, eventId),
      });
    },
  });
};

/**
 * Add participants to an event
 * @param spaceId Space ID
 * @param eventId Event ID
 * @param members Array of space member IDs to add as participants
 * @returns Success response
 */
const addEventParticipants = async (
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

export const useAddEventParticipants = (spaceId: number, eventId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (members: number[]) => addEventParticipants(spaceId, eventId, members),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: eventKeys.detail(spaceId, eventId),
      });
    },
  });
};

/**
 * Remove participants from an event
 * @param spaceId Space ID
 * @param eventId Event ID
 * @param members Array of space member IDs to remove as participants
 * @returns Success response
 */
const removeEventParticipants = async (
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

export const useRemoveEventParticipants = (spaceId: number, eventId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (members: number[]) => removeEventParticipants(spaceId, eventId, members),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: eventKeys.detail(spaceId, eventId),
      });
    },
  });
};
