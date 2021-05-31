import { ENGLISH, MANDARIN, UPDATE_NRIC, CLEAR_NRIC } from './actionTypes';

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
