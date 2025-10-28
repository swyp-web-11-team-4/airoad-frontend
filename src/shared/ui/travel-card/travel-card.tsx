import { Cross2Icon } from "@radix-ui/react-icons";
import { AlertDialog, Badge, Card, IconButton, Text } from "@radix-ui/themes";
import * as styles from "./travel-card.css";

export type TravelCardProps = {
  name: string;
  date: string;
  city: string;
  showDelete?: boolean;
  onDelete?: () => void;
};

export function TravelCard({ name, date, city, showDelete, onDelete }: TravelCardProps) {
  return (
    <Card size="2" className={styles.cardBox}>
      <img className={styles.cardImg} src="/images/default-card.png" alt="기본 카드 이미지" />
      <div className={styles.cardData}>
        <Text size="3">{name}</Text>
        <Text size="2" color="gray">
          {date} 출발
        </Text>
        <Badge color="indigo" variant="outline">
          {city}
        </Badge>
      </div>

      {showDelete && (
        <AlertDialog.Trigger>
          <IconButton
            className={styles.cardDeleteBtn}
            size="2"
            variant="solid"
            color="red"
            aria-label="일정 삭제"
            onClick={onDelete}
          >
            <Cross2Icon />
          </IconButton>
        </AlertDialog.Trigger>
      )}
    </Card>
  );
}
