import { PayReceiveInfo, PayRequestInfo } from "@/pages/PayPage/PayPage";
import {
  createRequestOptionsJSON,
  RequestOptions,
  createRequestOptionsJSON_AUTH,
} from "@/apis/_createRequestOptions";
import { request } from "http";

const fetchPayApi = async (url: string, options: RequestOptions) => {
  const response = await fetch(url, options).catch((err) => console.error(err));
  return response;
};

export const payRequestApi = async (
  spaceID: number,
  setCurrentData: React.Dispatch<React.SetStateAction<PayRequestInfo[] | undefined>>,
  setCompleteData: React.Dispatch<React.SetStateAction<PayRequestInfo[] | undefined>>,
) => {
  const requestOptions = createRequestOptionsJSON_AUTH("GET");
  if (!requestOptions) {
    return null;
  }
  const response = await fetchPayApi(`/api/space/${spaceID}/pay/request`, requestOptions);

  if (response) {
    response.json().then((data) => {
      setCurrentData(data.result.payRequestInfoInComplete);
      setCompleteData(data.result.payRequestInfoComplete);
    });
  }
};
export const payHomeApi = async (
  spaceID: number,
  setReqData: React.Dispatch<React.SetStateAction<PayRequestInfo[] | undefined>>,
  setRecData: React.Dispatch<React.SetStateAction<PayReceiveInfo[] | undefined>>,
) => {
  const requestOptions = createRequestOptionsJSON_AUTH("GET");
  if (!requestOptions) {
    return null;
  }
  const response = await fetchPayApi(`/api/space/${spaceID}/pay`, requestOptions);

  if (response) {
    response.json().then((data) => {
      setReqData(data.result.payRequestInfoDtoList);
      setRecData(data.result.payReceiveInfoDtoList);
    });
  }
};
