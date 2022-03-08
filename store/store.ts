import { atom } from "recoil";
import { CreateContainerType } from "../api/containers/containerAPI";

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

//----- Messages

export type MessageType = {
  id: number;
  message: string;
  sender: "client" | "bot";
  sendAt: Date;
};

export const messagesCreateContainerState = atom<MessageType[]>({
  key: "messagesCreateContainerState",
  default: [],
});

export const createContainerState = atom<CreateContainerType>({
  key: "createContainerState",
  default: {
    name: "",
    userId: "",
    servicesInstalled: [],
  },
});
