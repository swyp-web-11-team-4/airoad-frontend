import { Outlet } from "react-router";
import { Header } from "./header/header";

export const MainLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};
