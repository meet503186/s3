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
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { uploadFileApi } from "./utils";

export function Uploader() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!file) {
      toast({
        variant: "destructive",
        title: "No File Selected",
        description: "You must select a file before attempting to upload.",
      });

      return;
    }

    uploadFileApi({
      file,
    });
  };

  return (
    <Card className="w-[450px]">
      <CardHeader>
        <CardTitle>Upload file</CardTitle>
        <CardDescription>Upload your files to aws s3 bucket.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Input
                id="name"
                type="file"
                accept="image/*"
                placeholder="Name of your project"
                onChange={handleFileChange}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        {/* <Button variant="outline">Cancel</Button> */}
        <Button onClick={handleUpload}>Upload</Button>
      </CardFooter>
    </Card>
  );
}
