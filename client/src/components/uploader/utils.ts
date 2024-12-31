import { UPLOADER } from "@/service/uploaderService";
import { queryString } from "@/utils/helper";
import { AxiosProgressEvent } from "axios";

export const uploadFileApi = async ({
  file,
  onUploadProgress,
}: {
  file: File;
  onUploadProgress: (progressEvent: AxiosProgressEvent) => void;
}) => {
  // Get pre signed url
  const preSignedResponse = await UPLOADER.GET_SIGNED_URL(
    queryString({ fileName: file.name, fileType: file.type })
  );

  //   upload file to s3
  const response = await UPLOADER.UPLOAD_FILE(
    preSignedResponse.data.url,
    file,
    {
      headers: {
        "Content-Type": file.type,
      },
      onUploadProgress,
    }
  );

  console.log(response);
};
