import { Text } from "@radix-ui/themes";
import * as styles from "./index.css";
export function InfoBox() {
  return (
    <div className={styles.infoBox}>
      <div className={styles.titleBox}>
        <Text size="8" weight="bold">
          여행을 일정별로 추천해드려요!
        </Text>
        <div className={styles.subtitleBox}>
          <Text size="6">
            여행 계획을 입력해 주시면, 추천 여행지를 AI 가 스마트하게 추천해드립니다!
          </Text>
          <Text size="6">제작한 여행일정은 자유롭게 공유 가능해요.</Text>
        </div>
      </div>
      <img className={styles.imgBox} src="images/seoul-map.png" alt="서울지도" />
    </div>
  );
}
