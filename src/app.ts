import { VendingMachine } from "./classes/VendingMachine";
import { initializeApp } from "./handlers/init";

const vm = new VendingMachine();

document.addEventListener("DOMContentLoaded", () => {
  initializeApp(vm);
});
