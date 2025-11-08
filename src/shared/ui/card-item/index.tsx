import { Cross2Icon } from "@radix-ui/react-icons";
import { AlertDialog, Badge, Card, IconButton, Text } from "@radix-ui/themes";
import { useNavigate } from "react-router";
import { PAGE_ROUTES } from "@/shared/config";
import * as styles from "./index.css";

export type CardItemProps = {
  name: string;
  date: string;
  city: string;
  imgUrl: string;
  showDelete?: boolean;
  conversationId: number;
  tripPlanId: number;
  onDelete?: () => void;
};

export function CardItem({
  name,
  date,
  city,
  imgUrl,
  showDelete,
  onDelete,
  conversationId,
  tripPlanId,
}: CardItemProps) {
  const navigate = useNavigate();

  return (
    <Card
      size="2"
      className={styles.cardBox}
      onClick={() => {
        navigate(
          `${PAGE_ROUTES.TRIP_PLAN}?conversationId=${conversationId}&tripPlanId=${tripPlanId}`,
        );
      }}
    >
      <img
        className={styles.cardImg}
        src={imgUrl ?? "/images/default-card.png"}
        alt="기본 카드 이미지"
      />
      <div className={styles.cardData}>
        <Text size="3">{name ?? "타이틀 없음"}</Text>
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
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.();
            }}
          >
            <Cross2Icon />
          </IconButton>
        </AlertDialog.Trigger>
      )}
    </Card>
  );
}
