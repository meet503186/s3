import { UPLOADER } from "@/service/uploaderService";
import { queryString } from "@/utils/helper";

export const uploadFileApi = async ({ file }: { file: File }) => {
  // Get pre signed url
  const preSignedResponse = await UPLOADER.GET_SIGNED_URL(
    queryString({ fileName: file.name, fileType: file.type })
  );

  //   upload file to s3
  const response = await UPLOADER.UPLOAD_FILE(preSignedResponse.data.url, file);

  console.log(response);
};
