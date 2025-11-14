import { NotePencilIcon } from "@phosphor-icons/react";
import { Share1Icon } from "@radix-ui/react-icons";
import { Button, Flex, IconButton, Text, TextField } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { use, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import { UserSection } from "@/entities/members/ui";
import { PEOPLE_OPTIONS, TERM_OPTIONS, THEME_OPTIONS } from "@/entities/trips/config";
import { tripsQueries, usePatchTrip } from "@/entities/trips/model";
import iconLogo from "@/shared/asset/icon-logo.png";
import { PAGE_ROUTES } from "@/shared/config";
import { Header } from "@/widgets/header";
import * as styles from "./index.css";

export const ChatHeader = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const tripPlanId = Number(params.get("tripPlanId"));
  const { data } = useQuery(tripsQueries.info(tripPlanId));
  const { mutate: patchTrip, isPending } = usePatchTrip();
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    if (!tripPlanId) navigate(PAGE_ROUTES.ROOT);
    if (data?.title) {
      setTitle(data.title);
    }
  }, [tripPlanId, navigate, data]);

  const handlePatch = () => {
    patchTrip(
      { id: tripPlanId, title },
      {
        onSuccess: () => {
          setEditMode(false);
          toast.success("타이틀 수정을 완료했습니다.");
        },
      },
    );
  };
  return (
    <Header>
      <Flex align="center" gap="20px">
        <div className={styles.logo}>
          <img src={iconLogo} height={16} alt="로고 아이콘" />
        </div>

        <Flex align="center" gap="3">
          {!editMode && (
            <>
              <Text size="4" weight="medium">
                {data?.title || "타이틀 없음"}
              </Text>
              <IconButton variant="ghost" color="indigo" onClick={() => setEditMode(true)}>
                <NotePencilIcon />
              </IconButton>
            </>
          )}
          {editMode && (
            <>
              <TextField.Root
                placeholder="일정 타이틀을 작성해주세요."
                size="2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={handlePatch}
                autoFocus
              />
              <Button size="1" color="indigo" disabled={isPending}>
                {isPending ? "수정중.." : "완료"}
              </Button>
            </>
          )}
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
