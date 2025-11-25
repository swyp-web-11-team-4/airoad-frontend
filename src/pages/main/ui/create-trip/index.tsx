import { Button, Checkbox, DropdownMenu, Flex, Popover, Text, TextArea } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import dayjs from "dayjs";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuthStore } from "@/entities/auth/model";
import { LoginDialog } from "@/entities/auth/ui";
import {
  PEOPLE_OPTIONS,
  PLACE_OPTIONS,
  TERM_OPTIONS,
  THEME_OPTIONS,
} from "@/entities/trips/config";
import { usePostTrip } from "@/entities/trips/model";
import { PAGE_ROUTES } from "@/shared/config";
import * as styles from "./index.css";

export default function CreateTrip() {
  const navigate = useNavigate();
  const accessToken = useAuthStore((s) => s.accessToken);
  const [place, setPlace] = useState("서울");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [termId, setTermId] = useState<number>(1);
  const [themes, setThemes] = useState<string[]>([]);
  const [peopleCount, setPeopleCount] = useState<number>(1);
  const [message, setMessage] = useState<string>("");

  const [openPlace, setOpenPlace] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [openTerm, setOpenTerm] = useState(false);
  const [openTheme, setOpenTheme] = useState(false);
  const [openPeople, setOpenPeople] = useState(false);
  const [openLogin, setLoginOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState("");
  const { mutate: postTrip, isPending } = usePostTrip();
  const handleCreate = () => {
    if (!accessToken) {
      setLoginOpen(true);
      return;
    }

    if (themes.length === 0) {
      setOpenTheme(true);
      setSelectedCard("theme");
      toast.error("테마를 선택해주세요.");
      return;
    }

    postTrip(
      {
        themes,
        startDate: dayjs(date).format("YYYY-MM-DD"),
        duration: termId,
        region: place,
        peopleCount,
        userMessage: message,
      },
      {
        onSuccess: (res) => {
          const { conversationId, tripPlanId } = res.data ?? {};
          if (conversationId && tripPlanId) {
            navigate(
              {
                pathname: PAGE_ROUTES.TRIP_PLAN,
                search: `?conversationId=${conversationId}&tripPlanId=${tripPlanId}`,
              },
              {
                state: { create: true },
              },
            );
          }
        },
      },
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.imgBox}>
        <img src="/images/main-view.png" alt="배경" className={styles.img} />
      </div>

      <div className={styles.layoutBox}>
        <div className={styles.titleBox}>
          <Text className={styles.mainTitle}>당신의 순간이 여행이 되는 곳</Text>
          <Text className={styles.subTitle} weight="regular" align="center">
            나만의 여행 경험을 Airoad와 함께
            <br />
            복잡한 여행 준비, 이제 더 쉽게 시작하게요
          </Text>
        </div>

        <div className={styles.formBox}>
          <div className={styles.selectBox({ empty: selectedCard !== "" })}>
            <DropdownMenu.Root
              open={openPlace}
              onOpenChange={(open) => {
                setOpenPlace(open);
                if (open) setSelectedCard("place");
              }}
            >
              <DropdownMenu.Trigger>
                <div
                  className={styles.selectItem(
                    selectedCard === "" ? {} : { active: selectedCard === "place" },
                  )}
                >
                  <Text size="1" weight="medium">
                    여행지
                  </Text>
                  <Text size="2" weight="medium">
                    {place}
                  </Text>
                </div>
              </DropdownMenu.Trigger>
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
            {selectedCard === "" && <div className={styles.selectLine} />}
            <Popover.Root
              open={openDate}
              onOpenChange={(open) => {
                setOpenDate(open);
                if (open) setSelectedCard("date");
              }}
            >
              <Popover.Trigger>
                <div
                  className={styles.selectItem(
                    selectedCard === "" ? {} : { active: selectedCard === "date" },
                  )}
                >
                  <Text size="1" weight="medium">
                    날짜
                  </Text>
                  <Text size="2" weight="medium">
                    {date ? dayjs(date).format("YYYY.MM.DD (dd)") : "날짜 선택"}
                  </Text>
                </div>
              </Popover.Trigger>
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
                  showOutsideDays
                  className={styles.calendar}
                />
              </Popover.Content>
            </Popover.Root>
            {selectedCard === "" && <div className={styles.selectLine} />}
            <DropdownMenu.Root
              open={openTerm}
              onOpenChange={(open) => {
                setOpenTerm(open);
                if (open) setSelectedCard("term");
              }}
            >
              <DropdownMenu.Trigger>
                <div
                  className={styles.selectItem(
                    selectedCard === "" ? {} : { active: selectedCard === "term" },
                  )}
                >
                  <Text size="1" weight="medium">
                    여행기간
                  </Text>
                  <Text size="2" weight="medium">
                    {TERM_OPTIONS.find((value) => value.id === termId)?.label || "여행 기간 선택"}
                  </Text>
                </div>
              </DropdownMenu.Trigger>
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
            {selectedCard === "" && <div className={styles.selectLine} />}
            <DropdownMenu.Root
              open={openTheme}
              onOpenChange={(data) => {
                setOpenTheme(data);
                if (data) setSelectedCard("theme");
              }}
            >
              <DropdownMenu.Trigger>
                <div
                  className={styles.selectItem(
                    selectedCard === "" ? {} : { active: selectedCard === "theme" },
                  )}
                >
                  <Text size="1" weight="medium">
                    여행테마
                  </Text>
                  <Text size="2" weight="medium">
                    {themes.length ? (
                      themes.length === 1 ? (
                        THEME_OPTIONS.find((d) => d.id === themes[0])?.label
                      ) : (
                        <>
                          {THEME_OPTIONS.find((d) => d.id === themes[0])?.label}
                          <Text weight="bold"> 외 {themes.length - 1}개</Text>
                        </>
                      )
                    ) : (
                      "테마 선택"
                    )}
                  </Text>
                </div>
              </DropdownMenu.Trigger>
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
            {selectedCard === "" && <div className={styles.selectLine} />}
            <DropdownMenu.Root
              open={openPeople}
              onOpenChange={(open) => {
                setOpenPeople(open);
                if (open) setSelectedCard("people");
              }}
            >
              <DropdownMenu.Trigger>
                <div
                  className={styles.selectItem(
                    selectedCard === "" ? {} : { active: selectedCard === "people" },
                  )}
                >
                  <Text size="1" weight="medium">
                    인원
                  </Text>
                  <Text size="2" weight="medium">
                    {PEOPLE_OPTIONS.find((value) => value.id === peopleCount)?.label || "인원 선택"}
                  </Text>
                </div>
              </DropdownMenu.Trigger>
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
          </div>
          <div className={styles.chatBox}>
            <TextArea
              className={styles.chatTextarea}
              rows={2}
              value={message}
              onChange={(e) => {
                const value = e.target.value;
                setMessage(value);
              }}
              onKeyDown={(e) => {
                e.currentTarget.value;
                if (e.key === "Enter") {
                  handleCreate();
                }
              }}
              placeholder="아이들과 함께 가기 좋은 박물관 위주로 여행하고 싶어요"
            />
            <Flex align="end" justify="end" width="100%">
              <Button
                radius="large"
                className={styles.createButton}
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

        <LoginDialog open={openLogin} onOpenChange={setLoginOpen} showTriggerButton={false} />
      </div>
    </div>
  );
}
