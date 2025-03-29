import { useSuspenseQuery, UseSuspenseQueryOptions } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { ApiResponse, client } from "../client";

export interface TargetOfPayRequest {
  targetMemberId: number;
  requestedAmount: number;
}

export interface RequestOfCreatePay {
  totalAmount: number;
  bankName: string;
  bankAccountNum: string;
  targets: TargetOfPayRequest[];
  valueOfPayType?: string;
}

export interface ResponseOfCreatePay {
  payRequestId: number;
}

export interface PayRequestInfoInHome {
  payRequestId: number;
  totalAmount: number;
  receivedAmount: number;
  totalTargetNum: number;
  sendCompleteTargetNum: number;
}

export interface RequestedPayInfoInHome {
  payRequestTargetId: number;
  payCreatorName: string;
  payCreatorProfileImgUrl: string;
  requestedAmount: number;
}

export interface ResponseOfReadPayHome {
  requestInfoInHome: PayRequestInfoInHome[];
  requestedPayInfoInHome: RequestedPayInfoInHome[];
}

export interface ResponseOfTargetDetail {
  targetMemberId: number;
  targetMemberName: string;
  targetMemberProfileImageUrl: string;
  requestedAmount: number;
  complete: boolean;
}

export interface ResponseOfReadPayDetail {
  payRequestId: number;
  totalAmount: number;
  receivedAmount: number;
  totalTargetNum: number;
  sendCompleteTargetNum: number;
  bankName: string;
  bankAccountNum: string;
  createdDate: string;
  responseOfTargetDetails: ResponseOfTargetDetail[];
}

export interface ResponseOfPayRequestInfo {
  payRequestId: number;
  totalAmount: number;
  receivedAmount: number;
  totalTargetNum: number;
  sendCompleteTargetNum: number;
}

export interface ResponseOfReadPayRequestList {
  completePayRequestList: ResponseOfPayRequestInfo[];
  inCompletePayRequestList: ResponseOfPayRequestInfo[];
}

export interface ResponseOfRequestedPayInfo {
  payRequestTargetId: number;
  payCreatorName: string;
  payCreatorProfileImageUrl: string;
  requestedAmount: number;
  bankName: string;
  bankAccountNum: string;
}

export interface ResponseOfReadRequestedPayList {
  completeRequestedPayList: ResponseOfRequestedPayInfo[];
  inCompleteRequestedPayList: ResponseOfRequestedPayInfo[];
}

export interface BankInfo {
  bankName: string;
  bankAccountNumber: string;
}

export interface ResponseOfBankInfo {
  bankInfos: BankInfo[];
}

export const payKeys = {
  all: (spaceId: number) => ["pay", spaceId] as const,
  home: (spaceId: number) => [...payKeys.all(spaceId), "home"] as const,
  detail: (spaceId: number, payRequestId: number) =>
    [...payKeys.all(spaceId), "detail", payRequestId] as const,
  requested: (spaceId: number) => [...payKeys.all(spaceId), "requested"] as const,
  request: (spaceId: number) => [...payKeys.all(spaceId), "request"] as const,
  bank: (spaceId: number) => [...payKeys.all(spaceId), "bank"] as const,
};

const getPayHome = async (spaceId: number): Promise<ApiResponse<ResponseOfReadPayHome>> => {
  return client.get(`space/${spaceId}/pay`).json();
};

export const usePayHomeQuery = (
  spaceId: number,
  options?: Partial<
    UseSuspenseQueryOptions<
      ApiResponse<ResponseOfReadPayHome>,
      Error,
      ApiResponse<ResponseOfReadPayHome>,
      ReturnType<typeof payKeys.home>
    >
  >,
) => {
  return useSuspenseQuery({
    queryKey: payKeys.home(spaceId),
    queryFn: () => getPayHome(spaceId),
    gcTime: 30 * 1000,
    refetchInterval: 30 * 1000,
    ...options,
  });
};

const getPayDetail = async (
  spaceId: number,
  payRequestId: number,
): Promise<ApiResponse<ResponseOfReadPayDetail>> => {
  return client.get(`space/${spaceId}/pay/${payRequestId}`).json();
};

export const usePayDetailQuery = (
  spaceId: number,
  payRequestId: number,
  options?: Partial<
    UseSuspenseQueryOptions<
      ApiResponse<ResponseOfReadPayDetail>,
      Error,
      ApiResponse<ResponseOfReadPayDetail>,
      ReturnType<typeof payKeys.detail>
    >
  >,
) => {
  if (Number.isNaN(payRequestId)) return;
  return useSuspenseQuery({
    queryKey: payKeys.detail(spaceId, payRequestId),
    queryFn: () => getPayDetail(spaceId, payRequestId),
    gcTime: 30 * 1000,
    refetchInterval: 30 * 1000,
    ...options,
  });
};

const getRequestedPayList = async (
  spaceId: number,
): Promise<ApiResponse<ResponseOfReadRequestedPayList>> => {
  return client.get(`space/${spaceId}/pay/requested`).json();
};

export const useRequestedPayListQuery = (
  spaceId: number,
  options?: Partial<
    UseSuspenseQueryOptions<
      ApiResponse<ResponseOfReadRequestedPayList>,
      Error,
      ApiResponse<ResponseOfReadRequestedPayList>,
      ReturnType<typeof payKeys.requested>
    >
  >,
) => {
  return useSuspenseQuery({
    queryKey: payKeys.requested(spaceId),
    queryFn: () => getRequestedPayList(spaceId),
    gcTime: 30 * 1000,
    refetchInterval: 30 * 1000,
    ...options,
  });
};

const getPayRequestList = async (
  spaceId: number,
): Promise<ApiResponse<ResponseOfReadPayRequestList>> => {
  return client.get(`space/${spaceId}/pay/request`).json();
};

export const usePayRequestListQuery = (
  spaceId: number,
  options?: Partial<
    UseSuspenseQueryOptions<
      ApiResponse<ResponseOfReadPayRequestList>,
      Error,
      ApiResponse<ResponseOfReadPayRequestList>,
      ReturnType<typeof payKeys.request>
    >
  >,
) => {
  return useSuspenseQuery({
    queryKey: payKeys.request(spaceId),
    queryFn: () => getPayRequestList(spaceId),
    gcTime: 30 * 1000,
    refetchInterval: 30 * 1000,
    ...options,
  });
};

const getBankInfo = async (spaceId: number): Promise<ApiResponse<ResponseOfBankInfo>> => {
  return client.get(`space/${spaceId}/pay/bank`).json();
};

export const useBankInfoQuery = (
  spaceId: number,
  options?: Partial<
    UseSuspenseQueryOptions<
      ApiResponse<ResponseOfBankInfo>,
      Error,
      ApiResponse<ResponseOfBankInfo>,
      ReturnType<typeof payKeys.bank>
    >
  >,
) => {
  return useSuspenseQuery({
    queryKey: payKeys.bank(spaceId),
    queryFn: () => getBankInfo(spaceId),
    gcTime: 30 * 1000,
    refetchInterval: 30 * 1000,
    ...options,
  });
};

const createPay = async (
  spaceId: number,
  data: RequestOfCreatePay,
): Promise<ApiResponse<ResponseOfCreatePay>> => {
  return client
    .post(`space/${spaceId}/pay/create`, {
      json: data,
    })
    .json();
};

export const useCreatePay = (spaceId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: RequestOfCreatePay) => createPay(spaceId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: payKeys.home(spaceId) });
      queryClient.invalidateQueries({ queryKey: payKeys.request(spaceId) });
    },
  });
};

const completePay = async (
  spaceId: number,
  payRequestTargetId: number,
): Promise<ApiResponse<{ success: boolean }>> => {
  return client.patch(`space/${spaceId}/pay/${payRequestTargetId}/complete`).json();
};

export const useCompletePay = (spaceId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payRequestTargetId: number) => completePay(spaceId, payRequestTargetId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: payKeys.home(spaceId) });
      queryClient.invalidateQueries({ queryKey: payKeys.requested(spaceId) });
      // We don't know which specific detail page might be affected, so invalidate all pay queries
      queryClient.invalidateQueries({ queryKey: payKeys.all(spaceId) });
    },
  });
};

const deletePay = async (
  spaceId: number,
  payRequestId: number,
): Promise<ApiResponse<{ success: boolean }>> => {
  return client.delete(`space/${spaceId}/pay/${payRequestId}`).json();
};

export const useDeletePay = (spaceId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payRequestId: number) => deletePay(spaceId, payRequestId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: payKeys.home(spaceId) });
      queryClient.invalidateQueries({ queryKey: payKeys.request(spaceId) });
    },
  });
};
