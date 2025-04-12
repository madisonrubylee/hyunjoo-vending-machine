export type PaymentType = "cash" | "card";
export type DrinkInventory = { [key: string]: number };
export type DrinkType = "COKE" | "WATER" | "COFFEE";

export type DrinkInfo = {
  name: string;
  image: string;
  price: number;
};

export interface PurchaseResult {
  success: boolean;
  message: string;
  change?: number;
}

export interface VendingMachineState {
  balance: number;
  inventory: DrinkInventory;
  paymentType: PaymentType;
}
