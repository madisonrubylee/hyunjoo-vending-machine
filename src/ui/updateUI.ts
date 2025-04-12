import { VendingMachine } from "@/classes/VendingMachine";
import { inventoryStatus } from "./inventoryStatus";

export function updateUI(vm: VendingMachine): void {
  inventoryStatus(vm);

  const currentBalance = document.getElementById("currentBalance");
  if (currentBalance) {
    currentBalance.textContent = vm.getBalance().toString();
  }
}
