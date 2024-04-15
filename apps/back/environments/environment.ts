import { IEnvironment } from './environment.interface';

export const environment: IEnvironment = {};

if (process.env.ENVIRONMENT === 'production') {
  environment.port = 3333;
  environment.host = 'http://64.226.90.58';
  environment.env = 'production';
  environment.accessTokenSecret =
    '221d3d9bf56df51b94496d937b509e809296778fa801cf8497f2a33cc63e532b';
  environment.accessTokenExpiresIn = '10m';
  environment.refreshTokenSecret =
    'af5e8f301ce70e102c07e21d242de91b8b3bffd44dcd0e955d97e9a523f17f72';
  environment.refreshTokenExpiresIn = '7d';
  environment.ignoreExpiration = false;
  environment.minio = {
    endpoint: '64.226.90.58',
    port: 9000,
    bucket: 'prod',
    useSSL: false,
    accessKey: 'UOf7XccQgbTFbfA6f0PE',
    secretKey: 'W6066qr6iCFRY82FC9sL26vq60vIC56fhm53LrdP',
  };
  environment.database = {
    host: '64.226.90.58',
    port: 5432,
    user: 'main',
    password: 'app-main',
    name: 'app',
    loggers: true,
    synchronize: true,
  };
}

if (process.env.ENVIRONMENT === 'development') {
  environment.port = 4444;
  environment.host = 'http://64.226.90.58';
  environment.env = 'development';
  environment.accessTokenSecret =
    '788e133c41d3e00417c93f0ed2759168dccf74d900309b7e03242cfef2d3d715';
  environment.accessTokenExpiresIn = '10m';
  environment.refreshTokenSecret =
    '8999327fef4bbc325c33c101953f78740401ea2aecb2cb9f07ad02b709eb32f9';
  environment.refreshTokenExpiresIn = '7d';
  environment.ignoreExpiration = true;
  environment.minio = {
    endpoint: '64.226.90.58',
    port: 9000,
    bucket: 'dev',
    useSSL: false,
    accessKey: 'UOf7XccQgbTFbfA6f0PE',
    secretKey: 'W6066qr6iCFRY82FC9sL26vq60vIC56fhm53LrdP',
  };
  environment.database = {
    host: '64.226.90.58',
    port: 5433,
    user: 'develop',
    password: 'app-develop',
    name: 'app',
    loggers: true,
    synchronize: true,
  };
}

if (!process.env.ENVIRONMENT) {
  environment.port = 3000;
  environment.host = 'http://localhost';
  environment.env = 'local';
  environment.accessTokenSecret = 'access-token-secret';
  environment.ignoreExpiration = true;
  environment.accessTokenExpiresIn = '10m';
  environment.refreshTokenSecret = 'refresh-token-secret';
  environment.refreshTokenExpiresIn = '7d';
  environment.minio = {
    endpoint: 'localhost',
    port: 9000,
    bucket: 'local',
    useSSL: false,
    accessKey: 'pyKqgY9PF9OPsI9De5f3',
    secretKey: '5k4Pky0WtAlQWkqFMKj2kc4vBdWYMHHj238Vuo6c',
  };
  environment.database = {
    host: 'localhost',
    port: 5434,
    user: 'local',
    password: 'app-local',
    name: 'app',
    loggers: false,
    synchronize: true,
  };
}

export default environment;
