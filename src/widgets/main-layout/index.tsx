import { Outlet } from "react-router";
import { Header } from "./header";

export const MainLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};
