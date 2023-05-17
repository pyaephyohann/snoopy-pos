interface Config {
  jwtSrcret: string;
}

export const config: Config = {
  jwtSrcret: process.env.JWT_SECRET || "",
};
