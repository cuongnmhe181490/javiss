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

const mealTypeLabels = {
  breakfast: "Bữa sáng",
  lunch: "Bữa trưa",
  dinner: "Bữa tối",
  snack: "Bữa phụ",
} as const;

const mealTagLabels: Record<string, string> = {
  "high-protein": "Giàu đạm",
  quick: "Nhanh gọn",
  "budget-friendly": "Tiết kiệm",
  "beginner-friendly": "Dễ nấu",
  vegetarian: "Ăn chay",
  "meal-prep": "Nấu trước",
  balanced: "Cân bằng",
  snack: "Bữa phụ",
};

const ingredientLabels: Record<string, string> = {
  "rolled oats": "Yến mạch cán dẹt",
  "greek yogurt": "Sữa chua Hy Lạp",
  milk: "Sữa tươi",
  "chia seeds": "Hạt chia",
  "mixed berries": "Các loại quả mọng",
  egg: "Trứng",
  eggs: "Trứng",
  spinach: "Rau chân vịt",
  "feta cheese": "Phô mai feta",
  "whole grain bread": "Bánh mì nguyên cám",
  banana: "Chuối",
  "protein powder": "Bột protein",
  "peanut butter": "Bơ đậu phộng",
  "chicken breast": "Ức gà",
  "white rice": "Gạo trắng",
  cucumber: "Dưa leo",
  tomato: "Cà chua",
  tomatoes: "Cà chua",
  "plain yogurt": "Sữa chua không đường",
  "canned tuna": "Cá ngừ hộp",
  chickpeas: "Đậu gà",
  greens: "Rau xanh",
  "olive oil": "Dầu ô liu",
  lentils: "Đậu lăng",
  onion: "Hành tây",
  carrot: "Cà rốt",
  "vegetable broth": "Nước dùng rau củ",
  salmon: "Cá hồi",
  broccoli: "Bông cải xanh",
  lemon: "Chanh",
  tofu: "Đậu phụ",
  rice: "Cơm",
  peas: "Đậu Hà Lan",
  "soy sauce": "Nước tương",
  "coconut milk": "Nước cốt dừa",
  apple: "Táo",
};

const recipeTranslations = {
  "breakfast-overnight-oats": {
    name: "Yến mạch protein qua đêm",
    description: "Yến mạch, sữa chua và quả mọng cho buổi sáng giàu đạm.",
    instructions: ["Trộn đều nguyên liệu.", "Để lạnh qua đêm.", "Thêm quả mọng trước khi ăn."],
  },
  "breakfast-omelet-toast": {
    name: "Bánh mì trứng rau chân vịt",
    description: "Trứng, rau chân vịt và feta ăn cùng bánh mì nguyên cám.",
    instructions: ["Đánh đều trứng.", "Áp chảo rau và trứng với feta.", "Ăn kèm bánh mì nướng."],
  },
  "breakfast-smoothie-bowl": {
    name: "Smoothie chuối bơ đậu phộng",
    description: "Sinh tố đặc với chuối, sữa chua và bơ đậu phộng.",
    instructions: ["Xay mịn nguyên liệu.", "Đổ ra bát.", "Rưới thêm bơ đậu phộng lên trên."],
  },
  "lunch-chicken-rice-bowl": {
    name: "Cơm gà sốt chanh",
    description: "Bát cơm cân bằng với ức gà, dưa leo và sốt sữa chua.",
    instructions: ["Nấu cơm.", "Áp chảo ức gà.", "Xếp cùng rau và sốt sữa chua."],
  },
  "lunch-tuna-salad": {
    name: "Salad cá ngừ đậu gà",
    description: "Salad nhanh với cá ngừ, đậu gà và rau xanh.",
    instructions: ["Trộn các nguyên liệu.", "Rưới chanh và dầu ô liu.", "Dùng ngay khi còn tươi."],
  },
  "lunch-lentil-soup": {
    name: "Súp đậu lăng cà chua",
    description: "Món súp no bụng, tiết kiệm và dễ nấu từ nguyên liệu cơ bản.",
    instructions: ["Xào thơm rau củ.", "Nấu cùng đậu lăng và cà chua.", "Nêm lại rồi dùng nóng."],
  },
  "dinner-salmon-rice": {
    name: "Cơm cá hồi bông cải",
    description: "Bữa tối cân bằng với cá hồi, cơm và bông cải xanh.",
    instructions: ["Áp chảo cá hồi.", "Hấp bông cải và nấu cơm.", "Hoàn thiện với chanh."],
  },
  "dinner-tofu-fried-rice": {
    name: "Cơm rang đậu phụ",
    description: "Cơm rang dễ làm với đậu phụ, rau củ và nước tương.",
    instructions: ["Chuẩn bị cơm nguội.", "Xào đậu phụ cùng rau củ.", "Cho cơm và nước tương vào đảo đều."],
  },
  "dinner-chickpea-curry": {
    name: "Cà ri đậu gà",
    description: "Cà ri tiết kiệm với đậu gà, cà chua và nước cốt dừa.",
    instructions: ["Phi thơm hành và gia vị.", "Nấu cùng đậu gà và nước cốt dừa.", "Ăn kèm cơm nóng."],
  },
  "snack-apple-pb": {
    name: "Táo chấm bơ đậu phộng",
    description: "Bữa phụ nhanh với táo lát và bơ đậu phộng.",
    instructions: ["Cắt táo thành lát.", "Bày ra đĩa.", "Ăn cùng bơ đậu phộng."],
  },
} as const;

const exerciseTranslations = {
  "bodyweight-squat": {
    name: "Squat không tạ",
    description: "Bài cơ bản cho chân và mông, giúp cải thiện sức bền và kiểm soát chuyển động.",
    instructions: [
      "Đứng hai chân rộng bằng vai.",
      "Hạ hông xuống và giữ ngực mở.",
      "Đạp chân đứng lên lại.",
    ],
    cues: ["Siết bụng.", "Giữ gối hướng theo mũi chân."],
  },
  "goblet-squat": {
    name: "Goblet squat",
    description: "Biến thể squat với tạ đơn, dễ tăng tải mà vẫn ổn định.",
    instructions: [
      "Giữ tạ đơn trước ngực.",
      "Hạ xuống có kiểm soát.",
      "Đạp chân đứng lên bằng toàn bộ bàn chân.",
    ],
    cues: ["Giữ thân người vững.", "Dồn lực đều xuống bàn chân."],
  },
  "split-squat": {
    name: "Split squat",
    description: "Bài một chân giúp cải thiện cân bằng và sức mạnh từng bên.",
    instructions: [
      "Đứng chân trước chân sau.",
      "Hạ người thẳng xuống, giữ gót chân trước vững.",
      "Đạp chân trước để đứng lên.",
    ],
    cues: ["Giữ thân người thẳng.", "Kiểm soát vị trí thấp nhất."],
  },
  "romanian-deadlift-dumbbell": {
    name: "Romanian deadlift với tạ đơn",
    description: "Bài hip hinge tập trung vào gân kheo, mông và lưng sau.",
    instructions: [
      "Cầm tạ trước đùi.",
      "Đẩy hông ra sau và giữ lưng dài.",
      "Đứng lên bằng cách đưa hông về trước.",
    ],
    cues: ["Giữ tạ sát người.", "Không cong lưng."],
  },
  "barbell-rdl": {
    name: "Romanian deadlift với thanh tạ",
    description: "Bài hip hinge nặng hơn để tăng sức mạnh thân sau.",
    instructions: [
      "Nắm thanh tạ chắc tay.",
      "Hinge xuống đến khi gân kheo căng.",
      "Đưa hông về trước để đứng lên.",
    ],
    cues: ["Siết cơ xô.", "Kiểm soát pha hạ."],
  },
  "push-up": {
    name: "Hít đất",
    description: "Bài đẩy cơ bản cho ngực, vai và tay sau.",
    instructions: [
      "Đặt tay dưới vai.",
      "Hạ ngực xuống, giữ thân người thành một đường thẳng.",
      "Đẩy người lên lại.",
    ],
    cues: ["Giữ bụng chắc.", "Di chuyển cả thân cùng lúc."],
  },
  "incline-dumbbell-press": {
    name: "Đẩy ngực dốc với tạ đơn",
    description: "Bài đẩy ngực với góc vai dễ chịu hơn so với ghế phẳng.",
    instructions: [
      "Chỉnh ghế dốc nhẹ.",
      "Hạ tạ về phần ngực trên có kiểm soát.",
      "Đẩy tạ lên mà không mất ổn định vai.",
    ],
    cues: ["Giữ bả vai ổn định.", "Kiểm soát điểm thấp nhất."],
  },
  "bench-press": {
    name: "Đẩy ngực với thanh tạ",
    description: "Bài đẩy ngang kinh điển để tăng sức mạnh thân trên.",
    instructions: [
      "Ổn định lưng trên và nắm thanh tạ cân.",
      "Hạ thanh tạ về giữa ngực.",
      "Đẩy thanh tạ lên theo một đường ổn định.",
    ],
    cues: ["Chuẩn bị tư thế kỹ.", "Giữ quỹ đạo thanh tạ đều."],
  },
  "dumbbell-row": {
    name: "Kéo tạ đơn một tay",
    description: "Bài kéo ổn định giúp phát triển lưng và kiểm soát lực kéo.",
    instructions: [
      "Chống một tay lên ghế, tay còn lại kéo tạ.",
      "Kéo khuỷu tay về phía hông.",
      "Hạ tạ chậm để giữ căng cơ.",
    ],
    cues: ["Không xoay thân người.", "Dẫn lực bằng khuỷu tay."],
  },
  "band-row": {
    name: "Kéo dây kháng lực",
    description: "Bài kéo đơn giản, phù hợp khi tập tại nhà.",
    instructions: [
      "Cố định dây ở tầm ngực.",
      "Kéo tay cầm về phía thân.",
      "Trả dây chậm và có kiểm soát.",
    ],
    cues: ["Siết bả vai.", "Giữ cổ thư giãn."],
  },
  "lat-pulldown": {
    name: "Kéo xô máy",
    description: "Bài kéo dọc trên máy, dễ điều chỉnh mức tạ.",
    instructions: [
      "Ngồi thẳng, cố định đùi dưới pad.",
      "Kéo thanh xuống phần ngực trên bằng khuỷu tay.",
      "Trả thanh lên chậm.",
    ],
    cues: ["Không đung đưa.", "Giữ ngực mở."],
  },
  "pull-up": {
    name: "Kéo xà",
    description: "Bài kéo dọc đòi hỏi sức mạnh và kiểm soát tốt.",
    instructions: [
      "Treo người ổn định trên xà.",
      "Kéo ngực lên gần xà.",
      "Hạ người xuống có kiểm soát.",
    ],
    cues: ["Giữ thân chắc.", "Kéo mượt, không giật."],
  },
  "overhead-press-dumbbell": {
    name: "Đẩy vai với tạ đơn",
    description: "Bài đẩy dọc giúp phát triển vai và độ ổn định thân trên.",
    instructions: [
      "Đưa tạ lên ngang vai.",
      "Đẩy tạ lên trên đầu, giữ thân ổn định.",
      "Hạ tạ về ngang vai có kiểm soát.",
    ],
    cues: ["Không ưỡn lưng.", "Đẩy theo quỹ đạo mượt."],
  },
  "hip-thrust": {
    name: "Hip thrust",
    description: "Bài tập mông với điểm siết cơ rõ ở vị trí trên cùng.",
    instructions: [
      "Tựa lưng trên vào ghế.",
      "Đẩy hông lên đến khi thân song song sàn.",
      "Dừng nhẹ ở trên rồi hạ xuống.",
    ],
    cues: ["Hơi thu cằm.", "Siết mông thay vì dồn vào lưng dưới."],
  },
  "farmer-carry": {
    name: "Farmer carry",
    description: "Bài xách tạ giúp cải thiện tư thế, tay nắm và thể lực.",
    instructions: [
      "Đứng thẳng, cầm tạ hai bên.",
      "Bước đi đều, giữ thân trên ổn định.",
      "Quay đầu chậm và không nghiêng người.",
    ],
    cues: ["Giữ xương sườn ổn định.", "Đi chậm và chắc."],
  },
  plank: {
    name: "Plank trước",
    description: "Bài siết core cơ bản giúp ổn định thân người.",
    instructions: [
      "Đặt cẳng tay dưới vai.",
      "Siết bụng và mông.",
      "Giữ cơ thể thành một đường thẳng.",
    ],
    cues: ["Không võng hông.", "Thở đều khi siết bụng."],
  },
  "dead-bug": {
    name: "Dead bug",
    description: "Bài kiểm soát core giúp ổn định cột sống.",
    instructions: [
      "Nằm ngửa, giơ tay và gối lên.",
      "Duỗi tay và chân đối bên mà vẫn giữ lưng ổn định.",
      "Đổi bên chậm rãi.",
    ],
    cues: ["Di chuyển có kiểm soát.", "Giữ lưng dưới ổn định."],
  },
  "treadmill-incline-walk": {
    name: "Đi bộ dốc trên máy",
    description: "Cardio nhẹ, ít áp lực khớp và dễ hồi phục.",
    instructions: [
      "Chỉnh độ dốc vừa phải và tốc độ đi bộ nhanh.",
      "Giữ thân thẳng và bước đều.",
      "Dùng nhịp thở để kiểm soát cường độ.",
    ],
    cues: ["Giữ người thẳng.", "Chọn tốc độ có thể duy trì."],
  },
  "jumping-jack-intervals": {
    name: "Jumping jack theo hiệp",
    description: "Bài cardio nhanh, không cần thiết bị.",
    instructions: [
      "Bật hai chân rộng và đưa tay qua đầu.",
      "Quay về tư thế đầu với nhịp ổn định.",
      "Giữ các hiệp ngắn và thở đều.",
    ],
    cues: ["Tiếp đất êm.", "Giữ nhịp ổn định."],
  },
  "leg-press": {
    name: "Leg press",
    description: "Bài đạp chân trên máy, ổn định và dễ tăng tiến tải.",
    instructions: [
      "Đặt chân rộng bằng vai trên bàn đạp.",
      "Hạ bàn đạp có kiểm soát.",
      "Đạp lên bằng toàn bộ bàn chân.",
    ],
    cues: ["Không khóa gối đột ngột.", "Giữ hông ổn định trên ghế."],
  },
  "cable-row": {
    name: "Kéo cáp ngồi",
    description: "Bài kéo ngang giúp dày lưng và cải thiện tư thế.",
    instructions: [
      "Ngồi thẳng, giữ vai hạ thấp.",
      "Kéo tay cầm về thân với khuỷu tay sát người.",
      "Duỗi tay chậm để trở về vị trí đầu.",
    ],
    cues: ["Không nhún vai.", "Dừng nhẹ khi siết cơ lưng."],
  },
} as const;

export function translateMealType(value: string) {
  return mealTypeLabels[value as keyof typeof mealTypeLabels] ?? value;
}

export function translateMealTag(tag: string) {
  return mealTagLabels[tag] ?? tag;
}

export function translateIngredientName(name: string) {
  return ingredientLabels[name.toLowerCase()] ?? name;
}

export function translateRecipeName(id: string, fallback: string) {
  return recipeTranslations[id as keyof typeof recipeTranslations]?.name ?? fallback;
}

export function translateRecipeDescription(id: string, fallback: string) {
  return recipeTranslations[id as keyof typeof recipeTranslations]?.description ?? fallback;
}

export function translateRecipeInstructions(id: string, fallback: string[]) {
  return recipeTranslations[id as keyof typeof recipeTranslations]?.instructions ?? fallback;
}

export function translateExerciseName(id: string, fallback: string) {
  return exerciseTranslations[id as keyof typeof exerciseTranslations]?.name ?? fallback;
}

export function translateExerciseDescription(id: string, fallback: string) {
  return exerciseTranslations[id as keyof typeof exerciseTranslations]?.description ?? fallback;
}

export function translateExerciseInstructions(id: string, fallback: string[]) {
  return exerciseTranslations[id as keyof typeof exerciseTranslations]?.instructions ?? fallback;
}

export function translateExerciseCues(id: string, fallback: string[]) {
  return exerciseTranslations[id as keyof typeof exerciseTranslations]?.cues ?? fallback;
}
