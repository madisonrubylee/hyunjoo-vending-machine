import { VendingMachine } from "./classes/VendingMachine";
import { initializeApp } from "./handlers/init";
import { inventoryStatus } from "./ui/inventoryStatus";

const vm = new VendingMachine();

document.addEventListener("DOMContentLoaded", () => {
  // 초기 음료수 목록 표시
  inventoryStatus(vm);
  // 나머지 초기화
  initializeApp(vm);
});
