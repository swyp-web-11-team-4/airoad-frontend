import { Cross2Icon } from "@radix-ui/react-icons";
import { AlertDialog, Badge, Button, Card, IconButton, Select, Text } from "@radix-ui/themes";
import { useState } from "react";
import * as styles from "./plan-log.css";

// 추후 dto에 맞게 수정될 예정
type Trip = { id: number; name: string; date: string; city: string };

const trips: Trip[] = [
  { id: 1, name: "Trip A", date: "2025.11.24", city: "서울" },
  { id: 2, name: "Trip B", date: "2025.12.02", city: "부산" },
  { id: 3, name: "Trip C", date: "2026.01.05", city: "제주" },
  { id: 4, name: "Trip D", date: "2026.02.18", city: "서울" },
];
export function PlanLog() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [toastOpen, setToastOpen] = useState(false);

  return (
    <div className={styles.logBox}>
      <div className={styles.titleBox}>
        <Text size="6" weight="bold">
          최근 여행 계획
        </Text>
        <Select.Root defaultValue="latest" size="2">
          <Select.Trigger className={styles.orderBox} />
          <Select.Content color="gray" variant="soft">
            <Select.Item value="latest">최신순</Select.Item>
            <Select.Item value="date">날짜순</Select.Item>
          </Select.Content>
        </Select.Root>
      </div>

      <AlertDialog.Root>
        <div className={styles.cardContainer}>
          {trips.map((t) => (
            <Card key={t.id} size="2" className={styles.cardBox}>
              <img
                className={styles.cardImg}
                src="/images/default-card.png"
                alt="기본 카드 이미지"
              />
              <div className={styles.cardData}>
                <Text size="3">{t.name}</Text>
                <Text size="2" color="gray">
                  {t.date} 출발
                </Text>
                <Badge color="indigo" variant="outline">
                  {t.city}
                </Badge>
              </div>

              <AlertDialog.Trigger>
                <IconButton
                  className={styles.cardDeleteBtn}
                  size="2"
                  variant="solid"
                  color="red"
                  onClick={() => setSelectedId(t.id)}
                  aria-label="일정 삭제"
                >
                  <Cross2Icon />
                </IconButton>
              </AlertDialog.Trigger>
            </Card>
          ))}
        </div>

        <AlertDialog.Content maxWidth="360px">
          <AlertDialog.Title>일정을 삭제하시겠습니까?</AlertDialog.Title>
          <div className={styles.buttonBox}>
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                취소
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" variant="solid">
                일정 삭제
              </Button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </div>
  );
}
