import { Outlet } from "react-router";
import { MainHeader } from "./main-header";

export const MainLayout = () => {
  return (
    <div>
      <MainHeader />
      <Outlet />
    </div>
  );
};
