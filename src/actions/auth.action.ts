import axios from "axios";
import { Dispatch } from "redux";
import { APP_HEADER_NAME, APP_TOKEN_NAME, APP_URL } from "../config/app.config";
import { setAxiosToken } from "../utils/AxiosToken";
import { errorToText } from "../utils/errors";
import { ActionTypes } from "./types";
// import { API_URL } from "../utils/api";

// action url
const url = `${APP_URL}/auth`;

/**
 * * ****************************** INTERFACES *****************************
 */

export interface AuthUser {
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  status: string;
  phone: string;
}

export interface AuthAccess {
  role_name: string;
  access: string;
  user_to_access_id: string;
  user_id: string;
  role_id: string;
  date: Date | null;
  domain_id: string;
  domain_name: string;
}

export interface API_RequestAuth {
  user: AuthUser;
  access: AuthAccess[];
}
export interface API_RequestAuth_Login extends API_RequestAuth {
  jwt: string;
}

export interface Auth {
  isAuthenticated: boolean;
  user: AuthUser | null;
  access: AuthAccess[];
  selected_access: AuthAccess | null;
  jwt: string;
}

/**
 * * ****************************** ACTIONS *****************************
 */
export interface SaveAuthData {
  type: ActionTypes.LOGIN_DETAILS;
  payload: API_RequestAuth_Login;
}

export type FT_Login = (
  data: { username: string; password: string },
  callBack: (status: boolean, msg: string) => void
) => void;
export const FC_Login = (
  data: { username: string; password: string },
  callBack: (status: boolean, msg: string) => void
) => {
  return async (dispatch: Dispatch) => {
    try {
      const res = await axios.post<{ token: string }>(`${url}/login`, {
        email: data.username,
        password: data.password,
      });
      localStorage.setItem(APP_TOKEN_NAME, res.data.token);

      setAxiosToken(res.data.token);
      const res_details = await axios.get<API_RequestAuth>(`${url}/me`);

      dispatch<SaveAuthData>({
        type: ActionTypes.LOGIN_DETAILS,
        payload: { ...res_details.data, jwt: res.data.token },
      });

      // setAxiosToken();
      callBack(true, "");
    } catch (error) {
      console.log({ error });
      callBack(false, errorToText(error));
    }
  };
};

export interface SaveAuthData {
  type: ActionTypes.LOGIN_DETAILS;
  payload: API_RequestAuth_Login;
}

export type FT_CheckUserIsAuthenticated = (
  callBack: (status: boolean, msg: string) => void
) => void;
export const FC_CheckUserIsAuthenticated = (
  callBack: (status: boolean, msg: string) => void
) => {
  return async (dispatch: Dispatch) => {
    setAxiosToken();

    try {
      const res = await axios.get<API_RequestAuth>(`${url}/me`);
      console.log({ LOGIN_CURRENT_USER_INFO: res.data });

      dispatch<SaveAuthData>({
        type: ActionTypes.LOGIN_DETAILS,
        payload: {
          ...res.data,
          jwt: localStorage.getItem(APP_TOKEN_NAME) + "",
        },
      });
      callBack(true, "");
    } catch (error) {
      console.log({ error });
      callBack(false, errorToText(error));
    }
  };
};

// *** Logout
export interface Logout {
  type: ActionTypes.LOGOUT;
}
export type FT_Logout = () => void;
export const FC_Logout = () => {
  delete axios.defaults.headers.common[`${APP_HEADER_NAME}`];
  localStorage.removeItem(APP_TOKEN_NAME);
  localStorage.clear();
  return {
    type: ActionTypes.LOGOUT,
  } as Logout;
};

//* Change access
export interface ChangeCurrentAccess {
  type: ActionTypes.CHANGE_CURRENT_ACCESS;
  payload: string;
}

export type FT_ChangeCurrentAccess = (access_id: string) => void;
export const FC_ChangeCurrentAccess = (access_id: string) => ({
  type: ActionTypes.CHANGE_CURRENT_ACCESS,
  payload: access_id,
});
