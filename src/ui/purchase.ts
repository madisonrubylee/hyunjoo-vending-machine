import { VendingMachine } from "@/classes/VendingMachine";
import { log } from "@/utils/log";
import { DRINKS } from "@/constants";
import { showPurchaseSuccess } from "./messages";
import { updateUI } from "./updateUI";

export function selectDrink(vm: VendingMachine): void {
  const drinks = Object.entries(DRINKS).filter(
    ([name]) => vm.getInventoryCount(name as any) > 0
  );

  if (drinks.length === 0) {
    log("구매 가능한 음료 없음");
    return;
  }

  log("선택 가능한 음료:");
  drinks.forEach(([name, price], i) => {
    log(`${i + 1}. ${name} - ${price}원`);
  });

  const input = prompt("번호 입력");
  const idx = parseInt(input ?? "") - 1;

  if (idx >= 0 && idx < drinks.length) {
    const [name] = drinks[idx];
    const success = vm.purchase(name as any);
    if (success) {
      showPurchaseSuccess(name);
      log(`${name} 구매 완료`);
      log("카드가 반환되었습니다.");
    }
  } else {
    log("잘못된 선택");
  }

  updateUI(vm);
}
