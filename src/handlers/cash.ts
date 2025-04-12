import { VendingMachine } from "@/classes/VendingMachine";
import { showReturnMessage } from "@/ui/messages";
import { updateUI } from "@/ui/updateUI";

const INVALID_AMOUNTS = [10, 50, 50000];

export function initCashHandlers(vm: VendingMachine) {
  // bill-buttons 영역
  document.querySelectorAll(".bill-buttons button").forEach((button) => {
    button.addEventListener("click", () => {
      const amount = parseInt(
        button.textContent?.replace(/[^0-9]/g, "") || "0"
      );
      if (amount === 0) {
        const randomAmount =
          INVALID_AMOUNTS[Math.floor(Math.random() * INVALID_AMOUNTS.length)];
        showReturnMessage(randomAmount);
        return;
      }

      vm.insertCash(amount);
      updateUI(vm);
    });
  });

  // 현금 반환 버튼
  document.querySelector(".return-button")?.addEventListener("click", () => {
    const change = vm.returnChange();
    if (change > 0) {
      showReturnMessage(change, true);
    }
    updateUI(vm);
  });
}
