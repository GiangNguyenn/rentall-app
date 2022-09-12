import React, { useEffect } from "react";
import { IUser } from "../../../../store/types/user.types";
import ChatBox from "../../ChatBox/ChatBox";

type MessageProps = {
  content: string;
  from: IUser;
  to: IUser;
  at: string;
};

type ChatBodyProps = {
  content: MessageProps[];
  from: string;
};

const ChatBody = ({ content, from }: ChatBodyProps) => {
  useEffect(() => {}, []);

  return (
    <div className="flex bg-light rounded py-2 px-3 ml-3 flex-col overflow-x-hidden overflow-y-auto">
      {content.map((message) => (
        <ChatBox content={message.content} mine={message.from._id === from} />
      ))}
    </div>
  );
};

export default ChatBody;