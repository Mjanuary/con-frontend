import {
  ToggleSideMenu,
  SaveAuthData,
  AddBasicInfo,
  Logout,
  ChangeCurrentAccess,
} from "./";

export enum ActionTypes {
  LOGIN_DETAILS = "LOGIN_DETAILS",
  LOGOUT = "LOGOUT",
  TOGGLE_MENU = "TOGGLE_MENU",
  CHANGE_CURRENT_ACCESS = "CHANGE_CURRENT_ACCESS",
  ADD_BASIC_INFO = "ADD_BASIC_INFO",
}

export type Action =
  | SaveAuthData
  | ToggleSideMenu
  | AddBasicInfo
  | Logout
  | ChangeCurrentAccess;
