import { UserSection } from "@/entities/member/ui";
import logo from "@/shared/asset/logo.png";
import { Header } from "../header";

export const MainHeader = () => {
  return (
    <Header>
      <img src={logo} alt="로고" height={32} />
      <UserSection />
    </Header>
  );
};
