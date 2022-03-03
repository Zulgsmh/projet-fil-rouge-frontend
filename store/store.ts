import { atom } from "recoil";

export type UserType =
  | {
      email: string;
      exp: number;
      firstName: string;
      iat: number;
      id: string;
      iss: string;
      lastName: string;
      sub: string;
      userRoles: string[];
    }
  | undefined;

export const userState = atom<UserType>({
  key: "userState",
  default: undefined,
});

export const containersState = atom({
  key: "containersState",
  default: [],
});
