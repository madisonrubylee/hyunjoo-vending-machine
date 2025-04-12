import { DRINKS, DrinkType, DRINK_TYPES } from "@/constants";

import { log } from "@/utils/log";
import { PaymentType, DrinkInventory } from "@/types/vending";
import { PaymentManager } from "./PaymentManager";
import { InventoryManager } from "./InventoryManager";

export class VendingMachine {
  private paymentManager: PaymentManager;
  private inventoryManager: InventoryManager;

  constructor() {
    this.paymentManager = new PaymentManager();
    this.inventoryManager = new InventoryManager();
  }

  getAvailableDrinks(): [DrinkType, number][] {
    return DRINK_TYPES.filter(
      (key) =>
        this.paymentManager.getBalance() >= DRINKS[key] &&
        this.inventoryManager.hasStock(key)
    ).map((key) => [key, DRINKS[key]]);
  }

  purchase(drinkName: DrinkType): boolean {
    const price = DRINKS[drinkName];

    if (!this.inventoryManager.hasStock(drinkName)) {
      log(`${drinkName} 품절`);
      return false;
    }

    if (this.paymentManager.getBalance() < price) {
      log(`잔액 부족 (${this.paymentManager.getBalance()}원)`);
      return false;
    }

    this.inventoryManager.decreaseInventory(drinkName);

    if (this.paymentManager.getPaymentType() === "card") {
      log(`${drinkName} 제공 완료`);
      this.paymentManager.resetBalance();
      return true;
    }

    const change = this.paymentManager.getBalance() - price;

    if (!this.paymentManager.canMakeChange(change)) {
      this.inventoryManager.increaseInventory(drinkName);
      log("잔돈 반환이 불가능합니다");
      return false;
    }

    this.paymentManager.setPendingChange(change);
    log(`${drinkName} 제공 완료. 반환 가능한 잔돈: ${change}원`);
    return true;
  }

  setPaymentType(type: PaymentType): void {
    this.paymentManager.setPaymentType(type);
  }

  insertCash(amount: number): boolean {
    return this.paymentManager.insertCash(amount);
  }

  processCardPayment(): boolean {
    return this.paymentManager.processCardPayment();
  }

  returnChange(): number {
    return this.paymentManager.returnChange();
  }

  getBalance(): number {
    return this.paymentManager.getBalance();
  }

  getInventoryCount(drinkName: string): number {
    return this.inventoryManager.getInventoryCount(drinkName);
  }

  getPaymentType(): PaymentType {
    return this.paymentManager.getPaymentType();
  }

  getInventory(): DrinkInventory {
    return this.inventoryManager.getInventory();
  }
}
