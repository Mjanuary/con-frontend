import axios from "axios";
import { Dispatch } from "redux";
import { APP_URL } from "../config/app.config";
import { setAxiosToken } from "../utils/AxiosToken";
import { errorToText } from "../utils/errors";
import { ActionTypes } from "./types";

// action url
const url = APP_URL;

/**
 * * ****************************** INTERFACES *****************************
 */

export interface Basic {
  loading: boolean;
}

/**
 * * ****************************** ACTIONS *****************************
 */
export interface AddBasicInfo {
  type: ActionTypes.ADD_BASIC_INFO;
  payload: Basic;
}

export type FT_AddBasicInfo = (
  callBack: (status: boolean, msg: string) => void
) => void;
export const FC_AddBasicInfo = (
  callBack: (status: boolean, msg: string) => void
) => {
  return async (dispatch: Dispatch) => {
    try {
      setAxiosToken();
      const res = await axios.get<Basic>(`${url}/basicinfos/acalqual`);
      // * save data
      dispatch<AddBasicInfo>({
        type: ActionTypes.ADD_BASIC_INFO,
        payload: res.data,
      });
      callBack(true, "");
    } catch (error) {
      callBack(
        false,
        errorToText(error, () => {})
      );
    }
  };
};
