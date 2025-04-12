import { VendingMachine } from "@/classes/VendingMachine";
import {
  handlePaymentTypeChange,
  initCashHandlers,
  initCardHandlers,
  initDrinkHandlers,
} from "./index";
import { updateUI } from "@/utils/ui";

export function initializeApp(vm: VendingMachine) {
  document
    .getElementById("paymentType")
    ?.addEventListener("change", handlePaymentTypeChange(vm));

  initCashHandlers(vm);
  initCardHandlers(vm);
  initDrinkHandlers(vm);

  updateUI(vm);
}
