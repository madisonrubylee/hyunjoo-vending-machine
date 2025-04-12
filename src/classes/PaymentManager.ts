import { PaymentType } from "@/types/vending";
import {
  COIN_TYPES,
  CARD_APPROVAL_PROBABILITY,
  DEFAULT_CARD_BALANCE,
} from "@/constants";
import { log } from "@/utils/log";

export class PaymentManager {
  private balance = 0;
  private pendingChange = 0;
  private paymentType: PaymentType = "cash";

  setPaymentType(type: PaymentType): void {
    this.paymentType = type;
    this.balance = 0;
    this.pendingChange = 0;
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
      this.paymentType = "card";
      log("카드 승인 성공");
    } else {
      log("카드 승인 실패");
    }

    return approved;
  }

  canMakeChange(amount: number): boolean {
    let remaining = amount;
    const sortedCoins = [...COIN_TYPES].sort((a, b) => b - a);

    for (const coin of sortedCoins) {
      const count = Math.floor(remaining / coin);
      remaining -= count * coin;
    }

    return remaining === 0;
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

  resetBalance(): void {
    this.balance = 0;
  }

  getPaymentType(): PaymentType {
    return this.paymentType;
  }

  setPendingChange(amount: number): void {
    this.pendingChange = amount;
    this.balance = amount;
  }
}
