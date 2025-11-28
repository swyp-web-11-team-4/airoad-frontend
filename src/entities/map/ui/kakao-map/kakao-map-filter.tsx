import { CaretDownIcon } from "@phosphor-icons/react";
import { Box, Button, Checkbox, Flex, Popover, Text } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import type { MarkerFilterOption } from "../../model";
import * as styles from "./kakao-map-filter.css";

interface KakaoMapFilterProps {
  filterOptions: MarkerFilterOption[];
  selectedFilters: string[];
  onFilterChange: (filters: string[]) => void;
}

export const KakaoMapFilter = ({
  filterOptions,
  selectedFilters,
  onFilterChange,
}: KakaoMapFilterProps) => {
  const [tempFilters, setTempFilters] = useState<string[]>(selectedFilters);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTempFilters(selectedFilters);
    }
  }, [selectedFilters, isOpen]);

  const allValues = filterOptions.map((option) => option.value);
  const isAllSelected = tempFilters.length === allValues.length;

  const handleToggleAll = () => {
    if (isAllSelected) {
      setTempFilters([]);
    } else {
      setTempFilters(allValues);
    }
  };

  const handleToggleFilter = (value: string) => {
    setTempFilters((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value],
    );
  };

  const handleConfirm = () => {
    onFilterChange(tempFilters);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setTempFilters(selectedFilters);
    setIsOpen(false);
  };

  const renderTriggerText = () => {
    if (selectedFilters.length === 0)
      return (
        <Text weight="bold" color="gray">
          일정 없음
        </Text>
      );

    if (filterOptions.length === selectedFilters.length) {
      return (
        <Flex align="center" gap="1">
          <Text color="indigo" weight="bold">
            전체
          </Text>
          <Text>일정</Text>
        </Flex>
      );
    }

    const selectedOptions = filterOptions
      .filter((option) => selectedFilters.includes(option.value))
      .sort((a, b) => Number(a.value) - Number(b.value));

    return (
      <Flex align="center" gap="1">
        <Flex align="center" gap="1">
          {selectedOptions.map((option, index) => (
            <Text key={option.value}>
              <Text style={{ color: option.labelColor }}>{option.label.replace("일차", "")}</Text>
              {index < selectedOptions.length - 1 && "·"}
            </Text>
          ))}
        </Flex>
        <Text>일차 일정</Text>
      </Flex>
    );
  };

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger>
        <button type="button" className={styles.trigger}>
          {renderTriggerText()}
          <CaretDownIcon weight="bold" />
        </button>
      </Popover.Trigger>
      <Popover.Content className={styles.content}>
        <Flex direction="column" gap="4">
          <Flex direction="column" gap="1">
            <Flex justify="between" align="center">
              <Box py="1" px="3">
                <Text size="2" weight="bold">
                  일차별 일정보기
                </Text>
              </Box>
              <Flex asChild align="center" gap="2" className={styles.checkboxWrapper}>
                <Text as="label" size="2" weight="regular">
                  <Checkbox checked={isAllSelected} onCheckedChange={handleToggleAll} />
                  전체 선택
                </Text>
              </Flex>
            </Flex>

            <Flex direction="column" gap="2" className={styles.filterList}>
              {filterOptions.map((option) => (
                <Flex
                  key={option.value}
                  align="center"
                  gap="2"
                  asChild
                  className={styles.checkboxWrapper}
                >
                  <Text as="label" size="2" weight="bold" style={{ color: option.labelColor }}>
                    <Checkbox
                      checked={tempFilters.includes(option.value)}
                      onCheckedChange={() => handleToggleFilter(option.value)}
                    />
                    {option.label}
                  </Text>
                </Flex>
              ))}
            </Flex>
          </Flex>

          <Flex gap="2">
            <Button
              className={styles.button}
              size="2"
              color="gray"
              variant="soft"
              onClick={handleCancel}
            >
              취소
            </Button>
            <Button
              className={styles.button}
              size="2"
              color="indigo"
              variant="solid"
              onClick={handleConfirm}
            >
              확인
            </Button>
          </Flex>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  );
};
