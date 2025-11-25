import { Button, Text } from "@radix-ui/themes";
import * as styles from "./index.css";

interface DataFetchStateProps {
  type: "empty" | "error";
  title?: string;
  description?: string;
  actionText?: string;
  error?: Error;
  onAction?: () => void;
}

export function DataFetchState({
  type,
  title,
  description,
  actionText,
  error,
  onAction,
}: DataFetchStateProps) {
  if (type === "empty") {
    return (
      <div className={styles.dataFetchBox}>
        <img src="/images/no-data.png" alt="데이터 없음" className={styles.noDataBox} />
        <Text className={styles.titleBox}>{title ?? "데이터가 없습니다"}</Text>
        {description && <Text className={styles.titleBox}>{description}</Text>}
        <Button color="gray" variant="outline" onClick={onAction} className={styles.buttonBox}>
          {actionText ?? "새로 추가해보세요!"}
        </Button>
      </div>
    );
  }

  if (type === "error") {
    return (
      <div className={styles.dataFetchBox}>
        <img src="/images/error-state.png" alt="데이터 없음" className={styles.errorBox} />
        <Text className={styles.titleBox}>{title} 정보를 불러올 수 없습니다.</Text>
        <Text className={styles.titleBox}>{error?.message}</Text>
        {description && <Text className={styles.titleBox}>{description}</Text>}
        <Button color="gray" variant="outline" onClick={onAction} className={styles.buttonBox}>
          {actionText ?? "재시도"}
        </Button>
      </div>
    );
  }

  return null;
}
