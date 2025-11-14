export const PLACE_OPTIONS: string[] = [
  "서울",
  "경기도",
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
export const TERM_OPTIONS = [
  { id: 1, label: "당일치기" },
  { id: 2, label: "1박 2일" },
  { id: 3, label: "2박 3일" },
  { id: 4, label: "3박 4일" },
  { id: 5, label: "4박 5일" },
  { id: 6, label: "5박 6일" },
];

export const PEOPLE_OPTIONS = [
  { id: 1, label: "1인" },
  { id: 2, label: "2인" },
  { id: 3, label: "3인" },
  { id: 4, label: "4인" },
  { id: 5, label: "5인" },
  { id: 6, label: "6인 이상" },
];

export const THEME_OPTIONS = [
  { id: "FAMOUS_SPOT", label: "유명관광지", emoji: "🚠" },
  { id: "EXPERIENCE_ACTIVITY", label: "체험/액티비티", emoji: "🌊" },
  { id: "SNS_HOTSPOT", label: "SNS 핫플", emoji: "📷" },
  { id: "HEALING", label: "힐링", emoji: "🍵" },
  { id: "CULTURE_ART", label: "문화/예술", emoji: "🏛️" },
  { id: "SHOPPING", label: "쇼핑", emoji: "🛍️" },
] as const;

export const CATEGORY_OPTIONS = {
  MORNING: "오전일정",
  AFTERNOON: "오후일정",
  EVENING: "저녁일정",
};
