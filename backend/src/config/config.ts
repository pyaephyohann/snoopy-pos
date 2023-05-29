import dotenv from "dotenv";
dotenv.config();

interface Config {
  jwtSrcret: string;
  spaceEndpoint: string;
  spaceAccessKeyId: string;
  spaceSecretAccessKey: string;
}

export const config: Config = {
  jwtSrcret: process.env.JWT_SECRET || "",
  spaceEndpoint: process.env.SPACE_ENDPOINT || "",
  spaceAccessKeyId: process.env.SPACE_ACCESS_KEY_ID || "",
  spaceSecretAccessKey: process.env.SPACE_SECRET_ACCESS_KEY_ID || "",
};
