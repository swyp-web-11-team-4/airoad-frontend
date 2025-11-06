import logo from "@/shared/asset/logo.png";
import { UserSection } from "../user-section/user-section";
import * as styles from "./header.css";

export const Header = () => {
  return (
    <header className={styles.container}>
      <img src={logo} alt="로고" height={32} />
      <UserSection />
    </header>
  );
};
