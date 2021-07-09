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
        data: content,
        error: null,
      };
    } catch (error) {
      return {
        status: 500,
        data: 'Internal Server Error',
        error: error.message,
      };
    }
  }

  static async take_foot() {
    try {
      const result = await fetch(
        `${config.rpi_endpoint}${endpoints.TAKE_FOOT}`,
        {
          ...requestOptions_GET,
        }
      );
      const content = await result.json();
      return {
        status: result.status,
        data: content,
        error: null,
      };
    } catch (error) {
      return {
        status: 500,
        data: 'Internal Server Error',
        error: error.message,
      };
    }
  }

  static async save_images(
    nric: string,
    an_base64: string,
    left_foot_base64: string,
    right_foot_base64: string
  ) {
    try {
      const result = await fetch(
        `${config.api_endpoint}${endpoints.SAVE_IMAGES}`,
        {
          ...requestOptions_POST,
          body: JSON.stringify({
            nric,
            an_base64,
            left_foot_base64,
            right_foot_base64,
          }),
        }
      );
      const content = await result.json();
      return {
        status: result.status,
        data: content,
        error: null,
      };
    } catch (error) {
      return {
        status: 500,
        data: 'Internal Server Error',
        error: error.message,
      };
    }
  }

  static async predict_an(image: string) {
    try {
      const result = await fetch(
        `${config.flask_endpoint}${endpoints.PREDICT_AN}`,
        {
          ...requestOptions_POST,
          body: JSON.stringify({
            image,
          }),
        }
      );
      const content = await result.json();
      return {
        status: result.status,
        data: content.result,
        error: null,
      };
    } catch (error) {
      return {
        status: 500,
        data: 'Internal Server Error',
        error: error.message,
      };
    }
  }

  static async predict_foot(image: string) {
    try {
      const result = await fetch(
        `${config.flask_endpoint}${endpoints.PREDICT_FOOT}`,
        {
          ...requestOptions_POST,
          body: JSON.stringify({
            image,
          }),
        }
      );
      const content = await result.json();
      return {
        status: result.status,
        data: content.result,
        error: null,
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
