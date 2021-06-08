import { config } from 'dotenv';

config();
interface IEnv {
  api_endpoint: string;
  rpi_endpoint: string;
  flask_endpoint: string;
}

const decodeEnv = (env: string) => {
  switch (env) {
    case 'dev':
    case 'int':
    case 'prod':
      return env;
    case 'integration':
      return 'int';
    case 'development':
      return 'dev';
    case 'production':
      return 'prod';
    default:
      return 'dev';
  }
};

const decode_api_endpoint = (env: string): string => {
  switch (env) {
    case 'dev':
      return process.env.REACT_APP_LOCAL_API_ENDPOINT || '';
    case 'int':
      return process.env.REACT_APP_INTEGRATION_API_ENDPOINT || '';
    case 'prod':
      return process.env.REACT_APP_DEPLOYED_API_ENDPOINT || '';
    default:
      return '';
  }
};

const api_endpoint = decode_api_endpoint(
  decodeEnv(process.env.REACT_APP_ENVIRONMENT || '')
);

const envConfig: IEnv = {
  api_endpoint,
  rpi_endpoint: process.env.REACT_APP_RPI_ENDPOINT || '',
  flask_endpoint: process.env.REACT_APP_FLASK_ENDPOINT || '',
};

export default envConfig;
