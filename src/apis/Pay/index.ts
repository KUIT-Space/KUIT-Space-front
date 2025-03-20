import { ApiResponse } from "../client";

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
