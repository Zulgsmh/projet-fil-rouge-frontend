import axios from "axios";
import jwtDecode from "jwt-decode";
import moment from "moment";

const TOKEN_REFRESH_MINUTES_DELAY = 30;

function tokenNeedsRefresh(token: string): boolean {
  return (
    moment
      //@ts-ignore
      .unix(jwtDecode(token).iat)
      .isBefore(moment().subtract(TOKEN_REFRESH_MINUTES_DELAY, "minutes"))
  );
}

export const checkIfTokenExistsAndValid = async (
  token: string,
): Promise<boolean> => {
  return await axios
    .get(`http://localhost:8080/api/v1/tokens/${token}`)
    .then((res) => {
      if (res.data.token === true) {
        //check if token is already valid
        if (tokenNeedsRefresh(token)) {
          return false;
        }
        return true;
      }
      return false;
    })
    .catch((error) => {
      console.log(error);
      return false;
    });
};
