import React from "react";
import {
  messagesCreateContainerState,
  MessageType,
  stackSelectedState,
} from "../../store/store";
import { FaRobot } from "react-icons/fa";
import { useRecoilState, useSetRecoilState } from "recoil";
import { ALL_STACK } from "../../utils/stack";

export const BubbleMessage = ({
  id,
  message,
  sendAt,
  sender,
  stack,
}: MessageType) => {
  const [messages, setMessages] = useRecoilState(messagesCreateContainerState);
  const setStackSelected = useSetRecoilState(stackSelectedState);

  const selectItemStack = (e: React.MouseEvent<HTMLDivElement>) => {
    const { innerHTML } = e.currentTarget;

    setStackSelected((prev) => [...prev, innerHTML]);

    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        message: innerHTML + "has been added to the configuration.",
        sendAt: new Date(),
        sender: "bot",
      },
    ]);

    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        message: "Do you want something else ?",
        sendAt: new Date(),
        sender: "bot",
        stack: ALL_STACK.filter((item) => item !== innerHTML),
      },
    ]);
  };

  return (
    <>
      <div
        className={`${
          sender === "bot"
            ? "bg-gray-300 text-left"
            : "bg-blue-500 justify-self-end"
        } text-black grid w-fit mb-6 rounded-full p-3 relative`}
      >
        <div className="flex gap-3 items-center">
          {sender === "bot" && <FaRobot />}
          <p className={`${sender === "client" ? "text-white" : "text-black"}`}>
            {message}
          </p>
        </div>

        <label
          className={`${
            sender === "bot" ? "-bottom-5 left-0" : "-bottom-5 right-0"
          } text-gray-500 text-xs absolute w-20 `}
        >
          {sendAt.getHours() +
            " : " +
            sendAt.getMinutes() +
            " : " +
            sendAt.getSeconds()}
        </label>
      </div>
      {stack && (
        <div className="w-full flex flex-wrap gap-2 py-2 pb-4">
          {stack.map((item, idx) => {
            return (
              <div
                className="py-1 px-3 bg-gray-300 hover:bg-blue-500 hover:text-white rounded-full cursor-pointer"
                key={idx}
                onClick={selectItemStack}
              >
                {item}
              </div>
            );
          })}
        </div>
      )}{" "}
    </>
  );
};
