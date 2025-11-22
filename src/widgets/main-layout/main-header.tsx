import { useNavigate } from "react-router";
import { UserSection } from "@/entities/members/ui";
import logo from "@/shared/asset/logo.png";
import { PAGE_ROUTES } from "@/shared/config";
import { Header } from "../header";
import * as styles from "./index.css";
export const MainHeader = () => {
  const navigate = useNavigate();
  const handleMoveMain = () => {
    navigate(PAGE_ROUTES.ROOT);
  };
  return (
    <Header>
      <button type="button" className={styles.logo} onClick={handleMoveMain}>
        <img src={logo} alt="로고" height={32} />
      </button>
      <UserSection />
    </Header>
  );
};
