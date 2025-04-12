import { VendingMachine } from "@/classes/VendingMachine";
import { log } from "@/utils/log";

export function handlePaymentTypeChange(vm: VendingMachine) {
  return (e: Event) => {
    const target = e.target;
    if (!(target instanceof HTMLSelectElement)) return;

    const isCash = target.value === "cash";

    if (vm.getBalance() > 0) {
      log("현재 결제가 진행 중입니다. 결제를 완료하거나 취소해주세요.");
      target.value = isCash ? "card" : "cash";
      return;
    }

    const cashInput = document.getElementById("cashInput");
    const cardInput = document.getElementById("cardInput");

    if (cashInput && cardInput) {
      cashInput.style.display = isCash ? "block" : "none";
      cardInput.style.display = isCash ? "none" : "block";
    }
  };
}
