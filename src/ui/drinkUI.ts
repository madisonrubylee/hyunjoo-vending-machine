import { DrinkType, DRINKS, DRINK_EMOJIS } from "@/constants";

export function updateDrinkSelectionUI(drinks: [string, number][]): void {
  const inventoryStatus = document.getElementById("inventoryStatus");
  if (!inventoryStatus) return;

  const html = drinks
    .map(
      ([name, price]) => `
      <div class="drink-item available" data-drink="${name}" onclick="handleDrinkSelection('${name}')">
        <div class="drink-image">${DRINK_EMOJIS[name] || "🥤"}</div>
        <div class="drink-name">${name}</div>
        <div class="drink-price">${price}원</div>
      </div>
    `
    )
    .join("");

  inventoryStatus.innerHTML = html;
}

export function updateDrinkAvailability(balance: number): void {
  const drinks = document.querySelectorAll(".drink-item");

  drinks.forEach((drink) => {
    const priceEl = drink.querySelector(".drink-price");
    const price = parseInt(priceEl!.textContent!.replace(/[^0-9]/g, ""));

    if (balance >= price) {
      drink.classList.add("available");
    } else {
      drink.classList.remove("available");
    }
  });
}
