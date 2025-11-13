import type { Icon } from "@phosphor-icons/react";
import { ForkKnifeIcon, MapPinAreaIcon, PathIcon } from "@phosphor-icons/react";

export const STEP_TRANSITION_INTERVAL = 2000;

export interface LoadingStep {
  id: string;
  icon: Icon;
  iconType: "place" | "restaurant" | "route";
  label: string;
}

export const LOADING_STEPS: LoadingStep[] = [
  {
    id: "place",
    icon: MapPinAreaIcon,
    iconType: "place",
    label: "장소 찾는 중...",
  },
  {
    id: "restaurant",
    icon: ForkKnifeIcon,
    iconType: "restaurant",
    label: "맛집 찾는 중...",
  },
  {
    id: "route",
    icon: PathIcon,
    iconType: "route",
    label: "경로 파악 중...",
  },
];

export const CHAT_LIST_SIZE = 10;
