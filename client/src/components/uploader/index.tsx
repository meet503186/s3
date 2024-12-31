import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRef, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { UPLOADER } from "@/service/uploaderService";
import { queryString } from "@/utils/helper";
import { Progress } from "../ui/progress";

export function Uploader() {
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploadPercentage, setUploadPercentage] = useState<number>(0);

  const { mutate: handleUpload, isPending } = useMutation({
    mutationKey: ["uploadFile"],
    mutationFn: async () => {
      if (!inputRef.current) return;

      if (!inputRef.current?.files?.length) {
        toast({
          variant: "destructive",
          title: "No File Selected",
          description: "You must select a file before attempting to upload.",
        });

        return;
      }

      const file = inputRef.current?.files[0];

      const preSignedResponse = await UPLOADER.GET_SIGNED_URL(
        queryString({ fileName: file.name, fileType: file.type })
      );

      //   upload file to s3
      return UPLOADER.UPLOAD_FILE(preSignedResponse.data.url, file, {
        headers: {
          "Content-Type": file.type,
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            setUploadPercentage(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            );
          }
        },
      });
    },
    onSuccess: () => {
      toast({
        title: "Upload Successful",
        description:
          "Your file has been uploaded to the S3 bucket successfully.",
      });

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    },
  });

  return (
    <Card className="w-[450px]">
      {isPending && (
        <Progress value={uploadPercentage} className="w-[100%] h-2" />
      )}
      <CardHeader>
        <CardTitle>Upload file</CardTitle>
        <CardDescription>Upload your files to aws s3 bucket.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Input
                ref={inputRef}
                type="file"
                // accept="image/*"
                disabled={isPending}
                placeholder="Name of your project"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button disabled={isPending} onClick={() => handleUpload()}>
          Upload
        </Button>
      </CardFooter>
    </Card>
  );
}
