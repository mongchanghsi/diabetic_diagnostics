import {
  ENGLISH,
  MANDARIN,
  UPDATE_NRIC,
  CLEAR_NRIC,
  SAVE_AN,
  SAVE_LEFT_FOOT,
  SAVE_RIGHT_FOOT,
} from './actionTypes';

export const changeLangToEnglish = () => {
  return {
    type: ENGLISH,
    payload: {
      language: 'english',
    },
  };
};

export const changeLangToMandarin = () => {
  return {
    type: MANDARIN,
    payload: {
      language: 'mandarin',
    },
  };
};

export const updateNRIC = (nric: string) => {
  return {
    type: UPDATE_NRIC,
    payload: {
      nric,
    },
  };
};

export const clearNRIC = () => {
  return {
    type: CLEAR_NRIC,
    paylod: {
      nric: '',
    },
  };
};

export const storeANImage = (image_base64: string) => {
  return {
    type: SAVE_AN,
    payload: {
      image_base64,
    },
  };
};

export const storeLeftFootImage = (image_base64: string) => {
  return {
    type: SAVE_LEFT_FOOT,
    payload: {
      image_base64,
    },
  };
};

export const storeRightFootImage = (image_base64: string) => {
  return {
    type: SAVE_RIGHT_FOOT,
    payload: {
      image_base64,
    },
  };
};
