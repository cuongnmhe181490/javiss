import type { ActivityLevel, BudgetPeriod, Goal } from "@/types/profile";

export const goalLabels: Record<Goal, string> = {
  fat_loss: "Giảm mỡ",
  muscle_gain: "Tăng cơ",
  maintenance: "Duy trì",
  general_health: "Sức khỏe tổng quát",
};

export const activityLevelLabels: Record<ActivityLevel, string> = {
  sedentary: "Ít vận động",
  lightly_active: "Vận động nhẹ",
  moderately_active: "Vận động vừa",
  very_active: "Vận động cao",
  athlete: "Cường độ thể thao",
};

export const budgetPeriodLabels: Record<BudgetPeriod, string> = {
  daily: "Theo ngày",
  weekly: "Theo tuần",
};

export const themeLabels = {
  light: "Sáng",
  dark: "Tối",
  system: "Theo hệ thống",
} as const;

export const measurementSystemLabels = {
  metric: "Mét",
  imperial: "Imperial",
} as const;

export const pantryCategoryLabels = {
  proteins: "Đạm",
  vegetables: "Rau củ",
  fruits: "Trái cây",
  carbs_grains: "Tinh bột",
  dairy: "Sữa",
  spices_condiments: "Gia vị",
  other: "Khác",
} as const;

export const pantrySourceLabels = {
  manual: "Tự nhập",
  imported: "Đã nhập",
  shopping: "Từ mua sắm",
  recipe: "Từ công thức",
} as const;

export const weekdayLabels = {
  monday: "Thứ hai",
  tuesday: "Thứ ba",
  wednesday: "Thứ tư",
  thursday: "Thứ năm",
  friday: "Thứ sáu",
  saturday: "Thứ bảy",
  sunday: "Chủ nhật",
} as const;

export const sexLabels = {
  female: "Nữ",
  male: "Nam",
  intersex: "Liên giới tính",
  nonbinary: "Phi nhị nguyên",
  prefer_not_to_say: "Không muốn chia sẻ",
} as const;

export const workoutLevelLabels = {
  beginner: "Mới bắt đầu",
  intermediate: "Trung cấp",
  advanced: "Nâng cao",
} as const;

export const workoutKindLabels = {
  workout: "Buổi tập",
  rest: "Hồi phục",
} as const;

export const equipmentLabels = {
  bodyweight: "Trọng lượng cơ thể",
  dumbbells: "Tạ đơn",
  resistance_bands: "Dây kháng lực",
  bench: "Ghế tập",
  barbells: "Thanh tạ",
  cable_machines: "Máy cable",
  leg_press: "Máy đạp chân",
  treadmill: "Máy chạy bộ",
  full_gym_equipment: "Phòng gym đầy đủ",
} as const;

export function labelForGoal(goal: Goal) {
  return goalLabels[goal];
}

export function labelForActivityLevel(value: ActivityLevel) {
  return activityLevelLabels[value];
}

export function labelForBudgetPeriod(value: BudgetPeriod) {
  return budgetPeriodLabels[value];
}
