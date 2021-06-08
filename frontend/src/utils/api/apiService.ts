import config from '../config';
import endpoints from '../../constants/endpoints';
import {
  requestOptions_GET,
  requestOptions_POST,
  requestOptions_PUT,
} from './apiConfig';

export class ApiService {
  static async login(nric: string) {
    try {
      const result = await fetch(`${config.api_endpoint}${endpoints.LOGIN}`, {
        ...requestOptions_POST,
        body: JSON.stringify({ nric }),
      });
      const content = await result.json();
      return {
        status: result.status,
        data: content.data,
        error: content.error,
      };
    } catch (error) {
      return {
        status: 500,
        data: 'Internal Server Error',
        error: error.message,
      };
    }
  }

  static async update(nric: string, height: number, weight: number) {
    try {
      const result = await fetch(`${config.api_endpoint}${endpoints.UPDATE}`, {
        ...requestOptions_PUT,
        body: JSON.stringify({ nric, height, weight }),
      });
      const content = await result.json();
      return {
        status: result.status,
        data: content.data,
        error: content.error,
      };
    } catch (error) {
      return {
        status: 500,
        data: 'Internal Server Error',
        error: error.message,
      };
    }
  }

  static async take_an() {
    try {
      const result = await fetch(`${config.rpi_endpoint}${endpoints.TAKE_AN}`, {
        ...requestOptions_GET,
      });
      const content = await result.json();
      return {
        status: result.status,
        data: content.data,
        error: content.error,
      };
    } catch (error) {
      return {
        status: 500,
        data: 'Internal Server Error',
        error: error.message,
      };
    }
  }
}
