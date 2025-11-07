import { Outlet } from "react-router";
import { ChatHeader } from "./chat-header";

export const ChatLayout = () => {
  return (
    <div>
      <ChatHeader />
      <Outlet />
    </div>
  );
};
