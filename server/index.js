import express from "express";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { fromIni } from "@aws-sdk/credential-providers";
import cors from "cors";
import envConfig from "./config/envConfig.js";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const app = express();
const port = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Configure AWS
const client = new S3Client({
  region: envConfig.aws.region,
  credentials: fromIni({ profile: envConfig.aws.profile }),
});

app.get("/", (req, res) => {
  res.send("Hello from s3 backend!");
});

// Route to generate pre-signed URL
app.get("/upload-url", async (req, res) => {
  const { fileName, fileType } = req.query;

  const command = new PutObjectCommand({
    Bucket: envConfig.aws.bucketName,
    Key: `uploads/${fileName}`, // Define the path inside the bucket
    ContentType: fileType,
  });

  const url = await getSignedUrl(client, command, { expiresIn: 60 });

  res.json({ data: { url }, isSuccess: true });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
