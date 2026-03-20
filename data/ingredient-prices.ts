export type SupportedCurrency = "VND";
export type SupportedRegion = "vi-VN";

export type IngredientPrice = {
  normalizedName: string;
  displayName: string;
  baseUnit: "g" | "ml" | "piece" | "slice" | "can" | "clove";
  baseQuantity: number;
  price: number;
  currency: SupportedCurrency;
  region: SupportedRegion;
  updatedAt: string;
};

export const ingredientPriceCatalog: IngredientPrice[] = [
  { normalizedName: "egg", displayName: "Trứng gà", baseUnit: "piece", baseQuantity: 1, price: 3000, currency: "VND", region: "vi-VN", updatedAt: "2026-03-20" },
  { normalizedName: "chicken breast", displayName: "Ức gà", baseUnit: "g", baseQuantity: 1000, price: 92000, currency: "VND", region: "vi-VN", updatedAt: "2026-03-20" },
  { normalizedName: "white rice", displayName: "Gạo trắng", baseUnit: "g", baseQuantity: 1000, price: 22000, currency: "VND", region: "vi-VN", updatedAt: "2026-03-20" },
  { normalizedName: "oats", displayName: "Yến mạch", baseUnit: "g", baseQuantity: 1000, price: 85000, currency: "VND", region: "vi-VN", updatedAt: "2026-03-20" },
  { normalizedName: "greek yogurt", displayName: "Sữa chua Hy Lạp", baseUnit: "g", baseQuantity: 1000, price: 125000, currency: "VND", region: "vi-VN", updatedAt: "2026-03-20" },
  { normalizedName: "milk", displayName: "Sữa tươi", baseUnit: "ml", baseQuantity: 1000, price: 32000, currency: "VND", region: "vi-VN", updatedAt: "2026-03-20" },
  { normalizedName: "chia seeds", displayName: "Hạt chia", baseUnit: "g", baseQuantity: 1000, price: 180000, currency: "VND", region: "vi-VN", updatedAt: "2026-03-20" },
  { normalizedName: "berries", displayName: "Dâu berry", baseUnit: "g", baseQuantity: 1000, price: 220000, currency: "VND", region: "vi-VN", updatedAt: "2026-03-20" },
  { normalizedName: "feta cheese", displayName: "Phô mai feta", baseUnit: "g", baseQuantity: 1000, price: 260000, currency: "VND", region: "vi-VN", updatedAt: "2026-03-20" },
  { normalizedName: "whole grain bread", displayName: "Bánh mì nguyên cám", baseUnit: "slice", baseQuantity: 1, price: 4500, currency: "VND", region: "vi-VN", updatedAt: "2026-03-20" },
  { normalizedName: "banana", displayName: "Chuối", baseUnit: "piece", baseQuantity: 1, price: 5000, currency: "VND", region: "vi-VN", updatedAt: "2026-03-20" },
  { normalizedName: "protein powder", displayName: "Bột protein", baseUnit: "g", baseQuantity: 1000, price: 520000, currency: "VND", region: "vi-VN", updatedAt: "2026-03-20" },
  { normalizedName: "peanut butter", displayName: "Bơ đậu phộng", baseUnit: "g", baseQuantity: 1000, price: 180000, currency: "VND", region: "vi-VN", updatedAt: "2026-03-20" },
  { normalizedName: "tuna", displayName: "Cá ngừ đóng hộp", baseUnit: "g", baseQuantity: 1000, price: 250000, currency: "VND", region: "vi-VN", updatedAt: "2026-03-20" },
  { normalizedName: "chickpeas", displayName: "Đậu gà", baseUnit: "g", baseQuantity: 1000, price: 70000, currency: "VND", region: "vi-VN", updatedAt: "2026-03-20" },
  { normalizedName: "greens", displayName: "Rau xanh trộn", baseUnit: "g", baseQuantity: 1000, price: 90000, currency: "VND", region: "vi-VN", updatedAt: "2026-03-20" },
  { normalizedName: "olive oil", displayName: "Dầu ô liu", baseUnit: "ml", baseQuantity: 1000, price: 160000, currency: "VND", region: "vi-VN", updatedAt: "2026-03-20" },
  { normalizedName: "lentils", displayName: "Đậu lăng", baseUnit: "g", baseQuantity: 1000, price: 70000, currency: "VND", region: "vi-VN", updatedAt: "2026-03-20" },
  { normalizedName: "onion", displayName: "Hành tây", baseUnit: "g", baseQuantity: 1000, price: 25000, currency: "VND", region: "vi-VN", updatedAt: "2026-03-20" },
  { normalizedName: "carrot", displayName: "Cà rốt", baseUnit: "g", baseQuantity: 1000, price: 22000, currency: "VND", region: "vi-VN", updatedAt: "2026-03-20" },
  { normalizedName: "vegetable broth", displayName: "Nước dùng rau củ", baseUnit: "ml", baseQuantity: 1000, price: 30000, currency: "VND", region: "vi-VN", updatedAt: "2026-03-20" },
  { normalizedName: "salmon", displayName: "Cá hồi", baseUnit: "g", baseQuantity: 1000, price: 320000, currency: "VND", region: "vi-VN", updatedAt: "2026-03-20" },
  { normalizedName: "broccoli", displayName: "Bông cải xanh", baseUnit: "g", baseQuantity: 1000, price: 55000, currency: "VND", region: "vi-VN", updatedAt: "2026-03-20" },
  { normalizedName: "lemon", displayName: "Chanh", baseUnit: "piece", baseQuantity: 1, price: 5000, currency: "VND", region: "vi-VN", updatedAt: "2026-03-20" },
  { normalizedName: "tofu", displayName: "Đậu hũ", baseUnit: "g", baseQuantity: 1000, price: 45000, currency: "VND", region: "vi-VN", updatedAt: "2026-03-20" },
  { normalizedName: "peas", displayName: "Đậu Hà Lan", baseUnit: "g", baseQuantity: 1000, price: 50000, currency: "VND", region: "vi-VN", updatedAt: "2026-03-20" },
  { normalizedName: "soy sauce", displayName: "Nước tương", baseUnit: "ml", baseQuantity: 1000, price: 50000, currency: "VND", region: "vi-VN", updatedAt: "2026-03-20" },
  { normalizedName: "coconut milk", displayName: "Nước cốt dừa", baseUnit: "ml", baseQuantity: 1000, price: 85000, currency: "VND", region: "vi-VN", updatedAt: "2026-03-20" },
  { normalizedName: "apple", displayName: "Táo", baseUnit: "piece", baseQuantity: 1, price: 12000, currency: "VND", region: "vi-VN", updatedAt: "2026-03-20" },
  { normalizedName: "cucumber", displayName: "Dưa leo", baseUnit: "g", baseQuantity: 1000, price: 25000, currency: "VND", region: "vi-VN", updatedAt: "2026-03-20" },
  { normalizedName: "tomato", displayName: "Cà chua", baseUnit: "g", baseQuantity: 1000, price: 28000, currency: "VND", region: "vi-VN", updatedAt: "2026-03-20" },
  { normalizedName: "spinach", displayName: "Cải bó xôi", baseUnit: "g", baseQuantity: 1000, price: 45000, currency: "VND", region: "vi-VN", updatedAt: "2026-03-20" },
];

export function getIngredientPriceCatalog() {
  return ingredientPriceCatalog;
}
