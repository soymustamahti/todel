export interface IEnvironment {
  port?: number;
  env?: string;
  host?: string;
  accessTokenSecret?: string;
  ignoreExpiration?: boolean;
  accessTokenExpiresIn?: string;
  refreshTokenSecret?: string;
  refreshTokenExpiresIn?: string;
  minio?: {
    endpoint?: string;
    port?: number;
    useSSL?: boolean;
    bucket?: string;
    accessKey?: string;
    secretKey?: string;
  };
  database?: {
    host?: string;
    port?: number;
    user?: string;
    password?: string;
    name?: string;
    loggers?: boolean;
    synchronize?: boolean;
  };
}
