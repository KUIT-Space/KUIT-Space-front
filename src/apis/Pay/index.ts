import { useSuspenseQuery, UseSuspenseQueryOptions } from "@tanstack/react-query";

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

export const getPayHome = async (spaceId: number): Promise<ApiResponse<ResponseOfReadPayHome>> => {
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
    ...options,
  });
};

export const getPayDetail = async (
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
  return useSuspenseQuery({
    queryKey: payKeys.detail(spaceId, payRequestId),
    queryFn: () => getPayDetail(spaceId, payRequestId),
    ...options,
  });
};

export const getRequestedPayList = async (
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
    ...options,
  });
};

export const getPayRequestList = async (
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
    ...options,
  });
};

export const getBankInfo = async (spaceId: number): Promise<ApiResponse<ResponseOfBankInfo>> => {
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
    ...options,
  });
};

export const createPay = async (
  spaceId: number,
  data: RequestOfCreatePay,
): Promise<ApiResponse<ResponseOfCreatePay>> => {
  return client
    .post(`space/${spaceId}/pay/create`, {
      json: data,
    })
    .json();
};

export const completePay = async (
  spaceId: number,
  payRequestTargetId: number,
): Promise<ApiResponse<{ success: boolean }>> => {
  return client.patch(`space/${spaceId}/pay/${payRequestTargetId}/complete`).json();
};

export const deletePay = async (
  spaceId: number,
  payRequestId: number,
): Promise<ApiResponse<{ success: boolean }>> => {
  return client.delete(`space/${spaceId}/pay/${payRequestId}`).json();
};
