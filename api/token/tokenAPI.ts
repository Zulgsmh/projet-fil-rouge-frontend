import jwtDecode from "jwt-decode";
import moment from "moment";

const TOKEN_REFRESH_MINUTES_DELAY = 30;

export function tokenNeedsRefresh(token: string): boolean {
  return (
    moment
      //@ts-ignore
      .unix(jwtDecode(token).iat)
      .isBefore(moment().subtract(TOKEN_REFRESH_MINUTES_DELAY, "minutes"))
  );
}
