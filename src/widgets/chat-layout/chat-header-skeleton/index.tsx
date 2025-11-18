import { Flex, Skeleton } from "@radix-ui/themes";
import { UserSection } from "@/entities/members/ui";
import iconLogo from "@/shared/asset/icon-logo.png";
import { Header } from "@/widgets/header";
import * as styles from "./index.css";
export const ChatHeaderSkeleton = () => {
  return (
    <Header>
      <Flex align="center" gap="20px">
        <div className={styles.skeletonLogo}>
          <img src={iconLogo} height={16} alt="로고 아이콘" />
        </div>

        <Flex align="center" gap="3">
          <Skeleton width="152px" height="26px" loading />
        </Flex>
      </Flex>

      <div className={styles.skeletonInfoList}>
        <Skeleton width="453px" height="32px" />
      </div>

      <Flex align="center" gap="2">
        <UserSection />
      </Flex>
    </Header>
  );
};
