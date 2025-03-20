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

export const getPayHome = async (spaceId: number): Promise<ApiResponse<ResponseOfReadPayHome>> => {
  return client.get(`space/${spaceId}/pay`).json();
};

export const getPayDetail = async (
  spaceId: number,
  payRequestId: number,
): Promise<ApiResponse<ResponseOfReadPayDetail>> => {
  return client.get(`space/${spaceId}/pay/${payRequestId}`).json();
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

export const getRequestedPayList = async (
  spaceId: number,
): Promise<ApiResponse<ResponseOfReadRequestedPayList>> => {
  return client.get(`space/${spaceId}/pay/requested`).json();
};

export const getPayRequestList = async (
  spaceId: number,
): Promise<ApiResponse<ResponseOfReadPayRequestList>> => {
  return client.get(`space/${spaceId}/pay/request`).json();
};

export const getBankInfo = async (spaceId: number): Promise<ApiResponse<ResponseOfBankInfo>> => {
  return client.get(`space/${spaceId}/pay/bank`).json();
};

export const deletePay = async (
  spaceId: number,
  payRequestId: number,
): Promise<ApiResponse<{ success: boolean }>> => {
  return client.delete(`space/${spaceId}/pay/${payRequestId}`).json();
};

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
