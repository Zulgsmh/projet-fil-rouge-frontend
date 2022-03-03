import axios from "axios";
import { toast } from "react-toastify";

// ---- check authentication
/*
export const checkAuthentication = async (
  token: string,
  callbackSignout?: () => void,
) => {
  //check if token is provided
  await checkIfTokenExists(token);
  //check if already valid

  //if valid decode jwt and setUp store with user data

  //else if not valid
  //remove token, clear user data and redirect
  if (callbackSignout) {
    signOut(callbackSignout);
  } else {
    signOut();
  }
};
*/

// ---- Sign in

type TokenReponse = string;

type Credentials = {
  email: string;
  password: string;
};

//-------

export type RegisterType = {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
};

export const createUser = async (registerData: RegisterType) => {
  await axios
    .post("http://localhost:8080/api/v1/users", {
      firstName: registerData.firstname,
      lastName: registerData.lastname,
      email: registerData.email,
      password: registerData.password,
      country: "France",
    })
    .then(() => toast.success("Your account has been created !"))
    .catch(() => toast.error("An error appear"));
};

//-----

function removeTokens() {
  window.localStorage.clear();
}

export function getToken(): string {
  const token = window.localStorage.getItem("authToken");
  return token ? token : "";
}

/**
 * @param callBack | can be the redirect function to push user to home page
 */
export const signOut = async (callBack?: () => void) => {
  await axios.delete(`http://localhost:8080/api/v1/tokens/${getToken()}`);
  removeTokens();
  if (callBack) callBack();
};
