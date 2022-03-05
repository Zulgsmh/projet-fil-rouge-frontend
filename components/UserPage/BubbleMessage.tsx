import React from "react";
import { MessageType } from "../../store/store";
import { FaRobot } from "react-icons/fa";

export const BubbleMessage = ({ id, message, sendAt, sender }: MessageType) => {
  return (
    <div
      className={`${
        sender === "bot" ? "bg-gray-300" : "bg-blue-500 justify-self-end"
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
  );
};
