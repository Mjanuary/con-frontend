export enum UsersAccess {
  DOCUMENTS = "DOCUMENTS",
}

export const checkAccess = (
  role: string | null | undefined,
  userAccess: UsersAccess
) => {
  if (role === undefined || role === null) {
    return false;
  } else {
    return role.indexOf(userAccess) >= 0 ? true : false;
  }
};

export const RenderPageAccess = (
  role: string | null | undefined,
  userAccess: UsersAccess,
  callBack: () => void
) => {
  if (!checkAccess(role, userAccess)) {
    window.location.href = "/dashboard";
    return;
  } else {
    callBack();
  }
};
