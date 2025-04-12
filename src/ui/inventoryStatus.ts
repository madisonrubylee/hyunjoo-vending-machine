import { VendingMachine } from "@/classes/VendingMachine";
import { DRINK_EMOJIS, DRINKS, DrinkType } from "@/constants";

export function inventoryStatus(vm: VendingMachine) {
  const el = document.getElementById("inventoryStatus");
  if (!el) return;

  const html = Object.entries(vm.getInventory())
    .map(([name, count]) => {
      const price = DRINKS[name as DrinkType];
      const isAvailable = count > 0 && vm.getBalance() >= price;
      const emoji = DRINK_EMOJIS[name] || "🥤";

      return `
        <div class="drink-item ${
          isAvailable ? "available" : ""
        }" data-drink="${name}">
          <div class="drink-image">${emoji}</div>
          <div class="drink-name">${name}</div>
          <div class="drink-price">${price}원</div>
        </div>
      `;
    })
    .join("");

  el.innerHTML = html;
}
