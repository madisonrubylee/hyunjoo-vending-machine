import { VendingMachine } from "@/classes/VendingMachine";
import { updateUI } from "@/ui/updateUI";
import { updateDrinkSelectionUI } from "@/ui/drinkUI";
import { DRINKS } from "@/constants";
import { log } from "@/utils/log";

export function initCardHandlers(vm: VendingMachine) {
  document
    .querySelector("#cardInput .payment-button")
    ?.addEventListener("click", () => {
      if (vm.processCardPayment()) {
        log("카드가 인식되었습니다. 음료를 선택해주세요.");
        const drinks = Object.entries(DRINKS).filter(
          ([name]) => vm.getInventoryCount(name) > 0
        );

        if (drinks.length === 0) {
          log("구매 가능한 음료 없음");
          return;
        }
        updateDrinkSelectionUI(drinks);
      } else {
        log("카드 인식에 실패했습니다.");
      }
    });

  document
    .querySelector("#cardInput .return-button")
    ?.addEventListener("click", () => {
      if (vm.getBalance() > 0) {
        log("카드가 반환되었습니다.");
        vm.resetBalance();
        document.querySelectorAll(".drink-item").forEach((item) => {
          item.classList.remove("available");
        });
        updateUI(vm);
      }
    });

  document
    .querySelector(".return-card-button")
    ?.addEventListener("click", () => {
      if (vm.getBalance() > 0) {
        log("카드가 반환되었습니다.");
        vm.resetBalance();
        document.querySelectorAll(".drink-item").forEach((item) => {
          item.classList.remove("available");
        });
        updateUI(vm);
      }
    });
}
