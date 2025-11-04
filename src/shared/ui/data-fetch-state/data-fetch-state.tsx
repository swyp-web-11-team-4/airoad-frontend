import { CrossCircledIcon, QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import { Button, Text } from "@radix-ui/themes";
import { ERROR_MESSAGE, type ErrorCode } from "@/shared/config/error-code";
import * as styles from "./data-fetch-state.css";

interface DataFetchStateProps {
  type: "empty" | "error";
  title?: string;
  description?: string;
  actionText?: string;
  errorCode?: ErrorCode;
  onAction?: () => void;
}

export function DataFetchState({
  type,
  title,
  description,
  actionText,
  errorCode,
  onAction,
}: DataFetchStateProps) {
  if (type === "empty") {
    return (
      <div className={styles.dataFetchBox}>
        <QuestionMarkCircledIcon color="#60646C" className={styles.iconBox} />
        <Text className={styles.titleBox}>{title ?? "데이터가 없습니다"}</Text>
        {description && <Text className={styles.titleBox}>{description}</Text>}
        <Button color="gray" variant="outline" onClick={onAction} className={styles.buttonBox}>
          {actionText ?? "새로 추가해보세요!"}
        </Button>
      </div>
    );
  }

  if (type === "error") {
    const errorText =
      (errorCode && ERROR_MESSAGE[errorCode]) || description || "오류가 발생했습니다.";

    return (
      <div className={styles.dataFetchBox}>
        <CrossCircledIcon color="#60646C" className={styles.iconBox} />
        <Text className={styles.titleBox}>{errorText}</Text>
        <Text className={styles.titleBox}>
          {description ?? "재시도 버튼을 눌러 다시 시도해주세요."}
        </Text>
        <Button color="gray" variant="outline" onClick={onAction} className={styles.buttonBox}>
          {actionText ?? "재시도"}
        </Button>
      </div>
    );
  }

  return null;
}
