import { DRINK_EMOJIS } from "@/constants";

export function showReturnMessage(
  amount: number,
  isChange: boolean = false
): void {
  const balanceDisplay = document.querySelector(".balance-display");
  const message = document.createElement("div");
  message.className = "return-message";

  if (isChange) {
    message.textContent = `${amount}원이 반환되었습니다`;
    message.style.background = "rgba(67, 160, 71, 0.9)"; // 초록색 배경
  } else {
    message.textContent = `${amount}원권은 사용할 수 없습니다`;
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

function addDispensedDrink(drinkName: string): void {
  const dispenserEl = document.getElementById("dispensedItems");
  const drinkEmoji = DRINK_EMOJIS[drinkName] || "🥤";

  const item = document.createElement("div");
  item.className = "dispensed-item";
  item.textContent = drinkEmoji;

  dispenserEl?.appendChild(item);

  const items = dispenserEl?.children || [];
  if (items.length > 5) {
    dispenserEl?.removeChild(items[0]);
  }
}
