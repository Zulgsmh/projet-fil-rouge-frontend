import { atom, selector } from "recoil";

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

/*
export const getLastMessageId = selector({
  key: "getLastMessageId",
  get: ({ get }) => {
    return get(messagesCreateContainerState).length;
  },
});
*/
