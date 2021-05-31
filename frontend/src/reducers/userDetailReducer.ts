import { UPDATE_NRIC, CLEAR_NRIC } from '../utils/actions/actionTypes';

interface IState {
  nric: string;
}

interface IUserAction {
  type: string;
  payload: {
    nric: string;
  };
}

const initialUserDetailState: IState = { nric: '' };

const userDetailReducer = (
  state: IState = initialUserDetailState,
  action: IUserAction
) => {
  switch (action.type) {
    case UPDATE_NRIC:
      return {
        ...state,
        nric: action.payload.nric,
      };
    case CLEAR_NRIC:
      return {
        ...state,
        nric: '',
      };
    default:
      return state;
  }
};

export default userDetailReducer;
