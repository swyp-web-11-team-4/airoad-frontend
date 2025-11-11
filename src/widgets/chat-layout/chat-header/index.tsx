import { NotePencilIcon } from "@phosphor-icons/react";
import { Share1Icon } from "@radix-ui/react-icons";
import { Button, Flex, IconButton, Text } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { UserSection } from "@/entities/member/ui";
import { PEOPLE_OPTIONS, TERM_OPTIONS, THEME_OPTIONS } from "@/entities/trips/config";
import { tripsQueries } from "@/entities/trips/model";
import iconLogo from "@/shared/asset/icon-logo.png";
import { PAGE_ROUTES } from "@/shared/config";
import { Header } from "@/widgets/header";
import * as styles from "./index.css";

export const ChatHeader = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const tripPlanId = Number(params.get("tripPlanId"));
  const { data } = useQuery(tripsQueries.info(tripPlanId));

  useEffect(() => {
    if (!tripPlanId) navigate(PAGE_ROUTES.ROOT);
  }, [tripPlanId, navigate]);
  return (
    <Header>
      <Flex align="center" gap="20px">
        <div className={styles.logo}>
          <img src={iconLogo} height={16} alt="로고 아이콘" />
        </div>
        <Flex align="center" gap="3">
          <Text size="4" weight="medium">
            {data?.title || "타이틀 없음"}
          </Text>
          <IconButton variant="ghost" color="gray">
            <NotePencilIcon />
          </IconButton>
        </Flex>
      </Flex>

      <div className={styles.infoList}>
        <Text size="1" className={styles.info}>
          {data?.region ?? "-"}
        </Text>
        <Text size="1" className={styles.info}>
          {data?.startDate ? dayjs(data.startDate).format("YYYY.MM.DD (dd)") : "-"}
        </Text>
        <Text size="1" className={styles.info}>
          {TERM_OPTIONS.find((term) => term.id === data?.duration)?.label ?? "-"}
        </Text>
        <Text size="1" className={styles.info}>
          {data?.themes
            ?.map((id) => THEME_OPTIONS.find((theme) => theme.id === id)?.label ?? id)
            .join(", ") ?? "-"}
        </Text>
        <Text size="1" className={styles.info}>
          {PEOPLE_OPTIONS.find((people) => people.id === data?.peopleCount)?.label ?? "-"}
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
