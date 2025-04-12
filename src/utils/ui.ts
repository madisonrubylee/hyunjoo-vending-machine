import { VendingMachine } from "@/classes/VendingMachine";
import { DRINK_EMOJIS } from "@/constants";
import { formatCurrency } from "@/utils/format";

export function showReturnMessage(
  amount: number,
  isChange: boolean = false,
  isCard: boolean = false
): void {
  const balanceDisplay = document.querySelector(".balance-display");
  const message = document.createElement("div");
  message.className = "return-message";

  if (isCard) {
    message.textContent = "카드가 반환되었습니다";
    message.style.background = "rgba(67, 160, 71, 0.9)";
  } else if (isChange) {
    message.textContent = `${formatCurrency(amount)}원이 반환되었습니다`;
    message.style.background = "rgba(67, 160, 71, 0.9)";
  } else {
    message.textContent = `${formatCurrency(amount)}원권은 사용할 수 없습니다`;
  }

  balanceDisplay?.appendChild(message);

  setTimeout(() => {
    message.remove();
  }, 1500);
}

export function showPurchaseSuccess(drinkName: string): void {
  const drinkItem = Array.from(document.querySelectorAll(".drink-item")).find(
    (item) => item.querySelector(".drink-name")?.textContent === drinkName
  );

  if (drinkItem) {
    drinkItem.classList.add("dispensing");
    setTimeout(() => {
      addDispensedDrink(drinkName);
    }, 500);

    setTimeout(() => {
      drinkItem.classList.remove("dispensing");
    }, 1000);
  }
}

export function updateUI(vm: VendingMachine): void {
  const inventoryStatus = document.getElementById("inventoryStatus");
  const currentBalance = document.getElementById("currentBalance");

  if (inventoryStatus) {
    vm.getInventory();
  }

  if (currentBalance) {
    currentBalance.textContent = vm.getBalance().toString();
  }
}

function addDispensedDrink(drinkName: string): void {
  const dispenserEl = document.getElementById("dispensedItems");
  if (!dispenserEl) return;

  const drinkEmoji = DRINK_EMOJIS[drinkName] || "🥤";

  const item = document.createElement("div");
  item.className = "dispensed-item";
  item.textContent = drinkEmoji;

  dispenserEl.appendChild(item);

  if (dispenserEl.children.length > 5) {
    dispenserEl.removeChild(dispenserEl.children[0]);
  }
}
