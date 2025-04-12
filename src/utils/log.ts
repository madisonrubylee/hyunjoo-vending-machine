export function log(message: string): void {
  const el = document.getElementById("log");
  if (el) {
    el.textContent = el.textContent + message + "\n";
    el.scrollTop = el.scrollHeight;
  }
}

export function updateInventoryDisplay(html: string): void {
  const el = document.getElementById("inventoryStatus");
  if (el) {
    el.innerHTML = html;
  }
}
