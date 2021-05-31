import { ENGLISH, MANDARIN, MALAY, TAMIL } from '../utils/actions/actionTypes';

interface IState {
  language: string;
}

interface ILangAction {
  type: string;
  payload: {
    language: string;
  };
}

const initialLanguageState: IState = { language: 'english' };

const langReducer = (
  state: IState = initialLanguageState,
  action: ILangAction
) => {
  switch (action.type) {
    case ENGLISH:
      return {
        ...state,
        language: 'english',
      };
    case MANDARIN:
      return {
        ...state,
        language: 'mandarin',
      };
    case MALAY:
      return {
        ...state,
        language: 'malay',
      };
    case TAMIL:
      return {
        ...state,
        language: 'tamil',
      };
    default:
      return state;
  }
};

export default langReducer;
