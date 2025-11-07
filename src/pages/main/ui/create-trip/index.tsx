import { Button, Checkbox, DropdownMenu, Flex, Popover, RadioCards, Text } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import dayjs from "dayjs";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { usePostTrip, useTripPlanStore } from "@/entities/trips/model";
import * as styles from "./index.css";

const PLACE_OPTIONS: string[] = [
  "서울",
  "부산",
  "제주",
  "가평/양평",
  "강릉/속초",
  "경주",
  "여수",
  "인천",
  "전주",
  "순천/홍천",
  "태안",
  "통영/거제/남해",
];
const TERM_OPTIONS = [
  { id: 1, label: "당일치기" },
  { id: 2, label: "1박 2일" },
  { id: 3, label: "2박 3일" },
  { id: 4, label: "3박 4일" },
  { id: 5, label: "4박 5일" },
  { id: 6, label: "5박 6일" },
];
const THEME_OPTIONS = [
  { id: "FAMOUS_SPOT", label: "유명관광지", emoji: "🚠" },
  { id: "EXPERIENCE_ACTIVITY", label: "체험/액티비티", emoji: "🌊" },
  { id: "SNS_HOTSPOT", label: "SNS 핫플", emoji: "📷" },
  { id: "HEALING", label: "힐링", emoji: "🍵" },
  { id: "CULTURE_ART", label: "문화/예술", emoji: "🏛️" },
  { id: "SHOPPING", label: "쇼핑", emoji: "🛍️" },
  { id: "RESTAURANT", label: "음식점", emoji: "🥘" },
];

const PEOPLE_OPTIONS = [
  { id: 1, label: "1인" },
  { id: 2, label: "2인" },
  { id: 3, label: "3인" },
  { id: 4, label: "4인" },
  { id: 5, label: "5인" },
  { id: 6, label: "6인 이상" },
];
export default function CreateTrip() {
  const [place, setPlace] = useState("서울");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [termId, setTermId] = useState<number>(1);
  const [themes, setThemes] = useState<string[]>([]);
  const [peopleCount, setPeopleCount] = useState<number>(1);

  const [openPlace, setOpenPlace] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [openTerm, setOpenTerm] = useState(false);
  const [openTheme, setOpenTheme] = useState(false);
  const [openPeople, setOpenPeople] = useState(false);
  const [selectedCard, setSelectedCard] = useState("");
  const { updateTripMetaData, updateTripIdData } = useTripPlanStore();
  const { mutate: postTrip, isPending } = usePostTrip();
  const handleCreate = () => {
    if (!date) return;
    postTrip(
      {
        themes,
        startDate: dayjs(date).format("YYYY-MM-DD"),
        duration: termId,
        region: place,
        peopleCount,
      },
      {
        onSuccess: (res) => {
          const { conversationId, tripPlanId } = res.data ?? {};
          if (conversationId && tripPlanId) {
            updateTripMetaData({
              themes,
              startDate: dayjs(date).format("YYYY-MM-DD"),
              duration: termId,
              region: place,
              peopleCount,
            });

            updateTripIdData({
              conversationId,
              tripPlanId,
            });
          }
        },
      },
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.imgBox}>
        <img src="/images/main-view.jpg" alt="배경" className={styles.img} />
      </div>

      <div className={styles.layoutBox}>
        <div className={styles.titleBox}>
          <Text size="8" weight="bold">
            AI 로 가볍게 계획하는 한국여행
          </Text>
          <Text size="6" weight="regular" align="center">
            유명 관광지, 동선 최적화, 식사까지 추천해드려요. <br />
            복잡함은 줄이고 여행을 풍부하게 하세요.
          </Text>
        </div>

        <div className={styles.formBox}>
          <RadioCards.Root
            className={styles.selectBox}
            columns={{ initial: "1", sm: "5" }}
            gap="2"
            variant="classic"
            value={selectedCard}
            onValueChange={setSelectedCard}
          >
            <DropdownMenu.Root
              open={openPlace}
              onOpenChange={(open) => {
                setOpenPlace(open);
                if (open) setSelectedCard("place");
              }}
            >
              <div className={styles.cardWrap}>
                <RadioCards.Item value="place" className={styles.radioItem}>
                  <Flex direction="column" width="100%">
                    <Text size="2">여행지</Text>
                    <Text size="4" color={place ? undefined : "gray"}>
                      {place || "여행지 선택"}
                    </Text>
                  </Flex>
                </RadioCards.Item>

                <DropdownMenu.Trigger>
                  <button
                    type="button"
                    className={styles.overlayTrigger}
                    aria-label="여행지 메뉴 열기"
                    onClick={() => setSelectedCard("place")}
                  />
                </DropdownMenu.Trigger>
              </div>

              <DropdownMenu.Content
                variant="soft"
                color="gray"
                className={styles.dropdownContent}
                align="start"
                side="bottom"
                sideOffset={6}
              >
                {PLACE_OPTIONS.map((city) => (
                  <DropdownMenu.Item
                    key={city}
                    onSelect={() => {
                      setPlace(city);
                      setOpenPlace(false);
                    }}
                  >
                    {city}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Root>

            <Popover.Root
              open={openDate}
              onOpenChange={(open) => {
                setOpenDate(open);
                if (open) setSelectedCard("date");
              }}
            >
              <div className={styles.cardWrap}>
                <RadioCards.Item value="date" className={styles.radioItem}>
                  <Flex direction="column" width="100%">
                    <Text size="2">날짜</Text>
                    <Text size="4" color={date ? undefined : "gray"}>
                      {date ? dayjs(date).format("YYYY.MM.DD (dd)") : "날짜 선택"}
                    </Text>
                  </Flex>
                </RadioCards.Item>

                <Popover.Trigger>
                  <button
                    type="button"
                    className={styles.overlayTrigger}
                    aria-label="날짜 선택 열기"
                    onClick={() => setSelectedCard("date")}
                  />
                </Popover.Trigger>
              </div>

              <Popover.Content
                className={styles.popoverContent}
                align="start"
                side="bottom"
                sideOffset={6}
              >
                <DayPicker
                  mode="single"
                  selected={date}
                  onSelect={(value) => {
                    setDate(value ?? undefined);
                    setOpenDate(false);
                  }}
                  weekStartsOn={0}
                  className={styles.calendar}
                  styles={{
                    root: { width: "100%" },
                    months: { width: "100%" },
                    month: { width: "100%" },
                    table: { width: "100%" },
                    caption: { margin: 0 },
                  }}
                />
              </Popover.Content>
            </Popover.Root>

            <DropdownMenu.Root
              open={openTerm}
              onOpenChange={(open) => {
                setOpenTerm(open);
                if (open) setSelectedCard("term");
              }}
            >
              <div className={styles.cardWrap}>
                <RadioCards.Item value="term" className={styles.radioItem}>
                  <Flex direction="column" width="100%">
                    <Text size="2">여행 기간</Text>
                    <Text size="4">
                      {TERM_OPTIONS.find((value) => value.id === termId)?.label || "여행 기간 선택"}
                    </Text>
                  </Flex>
                </RadioCards.Item>

                <DropdownMenu.Trigger>
                  <button
                    type="button"
                    className={styles.overlayTrigger}
                    aria-label="여행 기간 메뉴 열기"
                    onClick={() => setSelectedCard("term")}
                  />
                </DropdownMenu.Trigger>
              </div>

              <DropdownMenu.Content
                className={styles.dropdownContent}
                variant="soft"
                color="gray"
                align="start"
                side="bottom"
                sideOffset={6}
              >
                {TERM_OPTIONS.map((term) => (
                  <DropdownMenu.Item
                    key={term.id}
                    onSelect={() => {
                      setTermId(term.id);
                      setOpenTerm(false);
                    }}
                  >
                    {term.label}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Root>

            <DropdownMenu.Root
              open={openTheme}
              onOpenChange={(data) => {
                setOpenTheme(data);
                if (data) setSelectedCard("theme");
              }}
            >
              <div className={styles.cardWrap}>
                <RadioCards.Item value="theme" className={styles.radioItem}>
                  <Flex direction="column" width="100%">
                    <Text size="2">여행 테마</Text>
                    <Text size="4" color={themes.length ? undefined : "gray"}>
                      {themes.length
                        ? themes
                            .map((theme) => THEME_OPTIONS.find((d) => d.id === theme)?.label)
                            .join(", ")
                        : "테마 선택"}
                    </Text>
                  </Flex>
                </RadioCards.Item>

                <DropdownMenu.Trigger>
                  <button
                    type="button"
                    className={styles.overlayTrigger}
                    aria-label="여행 테마 메뉴 열기"
                    onClick={() => setSelectedCard("theme")}
                  />
                </DropdownMenu.Trigger>
              </div>

              <DropdownMenu.Content
                className={styles.dropdownContent}
                align="start"
                variant="soft"
                color="indigo"
                side="bottom"
                sideOffset={6}
              >
                {THEME_OPTIONS.map((theme) => {
                  const checked = themes.includes(theme.id);
                  return (
                    <DropdownMenu.Item key={theme.id} onSelect={(e) => e.preventDefault()}>
                      <Flex align="center" gap="2" onPointerDown={(e) => e.stopPropagation()}>
                        <Checkbox
                          checked={checked}
                          onCheckedChange={(next) => {
                            setThemes((prev) =>
                              next ? [...prev, theme.id] : prev.filter((t) => t !== theme.id),
                            );
                          }}
                          aria-label={theme.label}
                        />
                        <Text>
                          {theme.emoji} {theme.label}
                        </Text>
                      </Flex>
                    </DropdownMenu.Item>
                  );
                })}
              </DropdownMenu.Content>
            </DropdownMenu.Root>

            <DropdownMenu.Root
              open={openPeople}
              onOpenChange={(open) => {
                setOpenPeople(open);
                if (open) setSelectedCard("people");
              }}
            >
              <div className={styles.cardWrap}>
                <RadioCards.Item value="people" className={styles.radioItem}>
                  <Flex direction="column" width="100%">
                    <Text size="2">인원 수</Text>
                    <Text size="4">
                      {PEOPLE_OPTIONS.find((value) => value.id === peopleCount)?.label ||
                        "인원 선택"}
                    </Text>
                  </Flex>
                </RadioCards.Item>
                <DropdownMenu.Trigger>
                  <button
                    type="button"
                    className={styles.overlayTrigger}
                    aria-label="인원 선택 열기"
                    onClick={() => setSelectedCard("people")}
                  />
                </DropdownMenu.Trigger>
              </div>
              <DropdownMenu.Content
                className={styles.dropdownContent}
                align="start"
                variant="soft"
                color="gray"
                side="bottom"
                sideOffset={6}
              >
                {PEOPLE_OPTIONS.map((people) => (
                  <DropdownMenu.Item
                    key={people.id}
                    onSelect={() => {
                      setPeopleCount(people.id);
                      setOpenPeople(false);
                    }}
                  >
                    {people.label}
                  </DropdownMenu.Item>
                ))}
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </RadioCards.Root>
        </div>
        <Flex align="center" justify="center" width="100%">
          <Button
            size="4"
            color="indigo"
            onClick={handleCreate}
            disabled={isPending}
            aria-busy={isPending}
          >
            {isPending ? "생성 중..." : "AI 여행일정 만들기"}
          </Button>
        </Flex>
      </div>
    </div>
  );
}
