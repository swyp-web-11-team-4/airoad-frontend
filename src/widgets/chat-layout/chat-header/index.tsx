import { NotePencilIcon } from "@phosphor-icons/react";
import { Share1Icon } from "@radix-ui/react-icons";
import { Button, Flex, IconButton, Text } from "@radix-ui/themes";
import { UserSection } from "@/entities/member/ui";
import iconLogo from "@/shared/asset/icon-logo.png";
import { Header } from "@/widgets/header";
import * as styles from "./index.css";

/* TODO 데이터 연동 작업 */
export const ChatHeader = () => {
  return (
    <Header>
      <Flex align="center" gap="20px">
        <div className={styles.logo}>
          <img src={iconLogo} height={16} alt="로고 아이콘" />
        </div>
        <Flex align="center" gap="3">
          <Text size="4" weight="medium">
            제주 3박4일 일정
          </Text>
          <IconButton variant="ghost" color="gray">
            <NotePencilIcon />
          </IconButton>
        </Flex>
      </Flex>

      <div className={styles.infoList}>
        <Text size="1" className={styles.info}>
          제주도
        </Text>
        <Text size="1" className={styles.info}>
          2025.10.19 (일)
        </Text>
        <Text size="1" className={styles.info}>
          2박 3일
        </Text>
        <Text size="1" className={styles.info}>
          테마명1, 테마명2, 테마명3
        </Text>
        <Text size="1" className={styles.info}>
          1인
        </Text>
      </div>

      <Flex align="center" gap="2">
        <Button size="3" variant="surface" color="gray" highContrast>
          <Share1Icon />
          공유하기
        </Button>
        <UserSection />
      </Flex>
    </Header>
  );
};
