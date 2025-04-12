import { VendingMachine } from "@/classes/VendingMachine";
import { showPurchaseSuccess } from "@/ui/messages";
import { updateUI } from "@/ui/updateUI";
import { log } from "@/utils/log";

export function initDrinkHandlers(vm: VendingMachine) {
  const container = document.getElementById("inventoryStatus");

  container?.addEventListener("click", (e) => {
    const drinkItem = (e.target as Element).closest(".drink-item");
    if (!drinkItem?.classList.contains("available")) return;

    const drinkName = drinkItem.getAttribute("data-drink");
    if (!drinkName) return;

    const success = vm.purchase(drinkName as any);
    if (success) {
      showPurchaseSuccess(drinkName);
      const paymentType = vm.getPaymentType();
      if (paymentType === "card" && vm.getBalance() === 0) {
        log("카드가 반환되었습니다.");
      }
      updateUI(vm);
    }
  });
}
