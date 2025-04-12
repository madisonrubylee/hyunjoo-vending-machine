import { VendingMachine } from "@/classes/VendingMachine";
import { handlePaymentTypeChange } from "./payment";
import { initCashHandlers } from "./cash";
import { initCardHandlers } from "./card";
import { initDrinkHandlers } from "./drinks";
import { updateUI } from "@/ui/updateUI";

export function initializeApp(vm: VendingMachine) {
  document
    .getElementById("paymentType")
    ?.addEventListener("change", handlePaymentTypeChange(vm));

  initCashHandlers(vm);
  initCardHandlers(vm);
  initDrinkHandlers(vm);

  updateUI(vm);
}
