import { Auth, Action, ActionTypes } from "../actions";

// default state
const defaultState = {
  isAuthenticated: false,
  user: null,
  access: [],
  selected_access: null,
  jwt: "",
} as Auth;

export const authReducer = (state: Auth = defaultState, action: Action) => {
  switch (action.type) {
    case ActionTypes.LOGOUT:
      return defaultState;
    case ActionTypes.LOGIN_DETAILS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        jwt: action.payload.jwt,
        access: action.payload.access,
        selected_access:
          action.payload.access.length >= 1 ? action.payload.access[0] : null,
      } as Auth;
    case ActionTypes.CHANGE_CURRENT_ACCESS:
      let findAccess = state.access.find(
        (itm) => itm.user_to_access_id === action.payload
      );
      return {
        ...state,
        selected_access:
          findAccess === undefined ? state.selected_access : findAccess,
      } as Auth;
    default:
      return state;
  }
};
