import axios, { AxiosError, AxiosResponse } from "axios";
import envConfig from "../config/envConfig";
import { toast } from "@/hooks/use-toast";

export interface IApiResponse<T> extends AxiosResponse {
  data: T;
  isSuccess: boolean;
  message: string;
  statusCode: number;
}

const instance = axios.create({
  baseURL: envConfig.apiUrl,
  headers: {
    "ngrok-skip-browser-warning": true,
  },
});

const onError = (error: unknown) => {
  console.log("onError :- ", error);

  if (error instanceof AxiosError) {
    toast({
      variant: "destructive",
      title: error.response?.data.error || "Error",
      description: error.response?.data.message || "Something went wrong",
    });
  }

  return Promise.reject(error);
};

const responseBody = (response: IApiResponse<any>) => response.data;

const requests = {
  get: (url: string) =>
    instance
      .get(url)
      .then((res: Partial<IApiResponse<any>>) =>
        responseBody(res as IApiResponse<any>)
      )
      .catch(onError),
  post: (url: string, body: unknown) =>
    instance
      .post(url, body)
      .then((res: Partial<IApiResponse<any>>) =>
        responseBody(res as IApiResponse<any>)
      )
      .catch(onError),
  put: (url: string, body: unknown, headers?: any) =>
    instance
      .put(url, body, {
        headers,
      })
      .then((res: Partial<IApiResponse<any>>) =>
        responseBody(res as IApiResponse<any>)
      )
      .catch(onError),
  delete: (url: string) =>
    instance
      .delete(url)
      .then((res: Partial<IApiResponse<any>>) =>
        responseBody(res as IApiResponse<any>)
      )
      .catch(onError),
} as const;

export default requests;
