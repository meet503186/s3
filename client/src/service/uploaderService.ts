import { IResUploaderPreSigned } from "@/interface/uploader.interface";
import requests, { IApiResponse } from "./httpService";

export const UPLOADER = {
  GET_SIGNED_URL: (
    query: string
  ): Promise<IApiResponse<IResUploaderPreSigned>> =>
    requests.get(`/upload-url?${query}`),

  UPLOAD_FILE: (preSignedUrl: string, file: File): Promise<IApiResponse<any>> =>
    requests.put(preSignedUrl, file, {
      "Content-Type": file.type,
    }),
};
