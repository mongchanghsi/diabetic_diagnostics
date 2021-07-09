interface IEndpoints {
  LOGIN: string;
  UPDATE: string;
  TAKE_AN: string;
  TAKE_FOOT: string;
  PREDICT_AN: string;
  PREDICT_FOOT: string;
  SAVE_IMAGES: string;
}

const endpoints: IEndpoints = {
  LOGIN: '/api/user/login',
  UPDATE: '/api/user/update_details',
  TAKE_AN: '/take_an_photo',
  TAKE_FOOT: '/take_foot_photo',
  PREDICT_AN: '/predict_an',
  PREDICT_FOOT: '/predict_foot',
  SAVE_IMAGES: '/api/image/save_image',
};

export default endpoints;
