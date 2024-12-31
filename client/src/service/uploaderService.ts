import { IResUploaderPreSigned } from "@/interface/uploader.interface";
import requests, { IApiResponse } from "./httpService";
import { AxiosRequestConfig } from "axios";

export const UPLOADER = {
  GET_SIGNED_URL: (
    query: string
  ): Promise<IApiResponse<IResUploaderPreSigned>> =>
    requests.get(`/upload-url?${query}`),

  UPLOAD_FILE: (
    preSignedUrl: string,
    file: File,
    config?: AxiosRequestConfig
  ): Promise<IApiResponse<any>> => requests.put(preSignedUrl, file, config),
};
