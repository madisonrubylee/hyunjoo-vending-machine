import {
  DRINKS,
  COIN_TYPES,
  DrinkType,
  DRINK_TYPES,
  CARD_APPROVAL_PROBABILITY,
  DEFAULT_CARD_BALANCE,
} from "@/constants";

import { log } from "@/utils/log";
import { PaymentType, DrinkInventory } from "@/types/vending";

export class VendingMachine {
  private balance = 0;
  private pendingChange = 0;
  private paymentType: PaymentType = "cash";
  private inventory: DrinkInventory = {
    COKE: 5,
    WATER: 5,
    COFFEE: 5,
  };

  setPaymentType(type: PaymentType): void {
    this.paymentType = type;
    if (type === "card") this.pendingChange = 0;
  }

  insertCash(amount: number): boolean {
    if (!COIN_TYPES.includes(amount)) {
      log(`허용되지 않은 금액: ${amount}원`);
      return false;
    }

    this.balance += amount;
    log(`투입된 금액: ${amount}원 (총합: ${this.balance}원)`);
    return true;
  }

  processCardPayment(): boolean {
    const approved = Math.random() < CARD_APPROVAL_PROBABILITY;

    if (approved) {
      this.balance = DEFAULT_CARD_BALANCE;
      this.setPaymentType("card");
      log("카드 승인 성공");
    } else {
      log("카드 승인 실패");
    }

    return approved;
  }

  getAvailableDrinks(): [DrinkType, number][] {
    return DRINK_TYPES.filter(
      (key) => this.balance >= DRINKS[key] && this.inventory[key] > 0
    ).map((key) => [key, DRINKS[key]]);
  }

  private canMakeChange(amount: number): boolean {
    let remaining = amount;
    const sortedCoins = [...COIN_TYPES].sort((a, b) => b - a);

    for (const coin of sortedCoins) {
      const count = Math.floor(remaining / coin);
      remaining -= count * coin;
    }

    return remaining === 0;
  }

  purchase(drinkName: DrinkType): boolean {
    const price = DRINKS[drinkName];

    if (!this.inventory[drinkName]) {
      log(`${drinkName} 품절`);
      return false;
    }

    if (this.balance < price) {
      log(`잔액 부족 (${this.balance}원)`);
      return false;
    }

    this.inventory[drinkName]--;

    if (this.paymentType === "card") {
      log(`${drinkName} 제공 완료`);
      this.balance = 0;
      return true;
    }

    const change = this.balance - price;

    if (!this.canMakeChange(change)) {
      this.inventory[drinkName]++;
      log("잔돈 반환이 불가능합니다");
      return false;
    }

    this.pendingChange = change;
    this.balance = change;
    log(`${drinkName} 제공 완료. 반환 가능한 잔돈: ${change}원`);
    return true;
  }

  returnChange(): number {
    const change = this.pendingChange;
    this.pendingChange = 0;
    this.balance = 0;
    log(`잔돈 ${change}원이 반환되었습니다`);
    return change;
  }

  getBalance(): number {
    return this.balance;
  }

  getInventoryCount(drinkName: string): number {
    return this.inventory[drinkName] || 0;
  }

  resetBalance(): void {
    this.balance = 0;
  }

  getPaymentType(): PaymentType {
    return this.paymentType;
  }

  getInventory(): DrinkInventory {
    return this.inventory;
  }
}
