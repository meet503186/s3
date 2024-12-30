import dotenv from "dotenv";

dotenv.config();

export default {
  aws: {
    region: process.env.AWS_REGION,
    bucketName: process.env.S3_BUCKET_NAME,
    profile: process.env.AWS_PROFILE,
  },
};
