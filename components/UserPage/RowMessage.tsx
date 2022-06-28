import React from "react";
import { MessageType } from "../../store/store";
import { BubbleMessage } from "./BubbleMessage";

export const RowMessage = ({
  sender,
  id,
  message,
  sendAt,
  stack,
}: MessageType) => {
  return (
    <>
      {sender === "bot" ? (
        <BubbleMessage
          id={id}
          message={message}
          sendAt={sendAt}
          sender={sender}
          stack={stack}
        />
      ) : (
        <div className="flex">
          <div className="flex-1 flex"></div>
          <BubbleMessage
            id={id}
            message={message}
            sendAt={sendAt}
            sender={sender}
            stack={stack}
          />
        </div>
      )}
    </>
  );
};
