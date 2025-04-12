import { DrinkInventory, DrinkType } from "@/types/vending";

export class InventoryManager {
  private inventory: DrinkInventory = {
    COKE: 5,
    WATER: 5,
    COFFEE: 5,
  };

  decreaseInventory(drinkName: DrinkType): void {
    this.inventory[drinkName]--;
  }

  increaseInventory(drinkName: DrinkType): void {
    this.inventory[drinkName]++;
  }

  hasStock(drinkName: DrinkType): boolean {
    return this.inventory[drinkName] > 0;
  }

  getInventoryCount(drinkName: string): number {
    return this.inventory[drinkName] || 0;
  }

  getInventory(): DrinkInventory {
    return this.inventory;
  }
}
