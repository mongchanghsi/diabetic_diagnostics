import {
  SAVE_AN,
  SAVE_LEFT_FOOT,
  SAVE_RIGHT_FOOT,
} from '../utils/actions/actionTypes';

interface IState {
  an_base64: string;
  left_foot_base64: string;
  right_foot_base64: string;
}

interface IUserAction {
  type: string;
  payload: {
    image_base64: string;
  };
}

const initialUserDetailState: IState = {
  an_base64: '',
  left_foot_base64: '',
  right_foot_base64: '',
};

const imageReducer = (
  state: IState = initialUserDetailState,
  action: IUserAction
) => {
  switch (action.type) {
    case SAVE_AN:
      return {
        ...state,
        an_base64: action.payload.image_base64,
      };
    case SAVE_LEFT_FOOT:
      return {
        ...state,
        left_foot_base64: action.payload.image_base64,
      };
    case SAVE_RIGHT_FOOT:
      return {
        ...state,
        right_foot_base64: action.payload.image_base64,
      };
    default:
      return state;
  }
};

export default imageReducer;
