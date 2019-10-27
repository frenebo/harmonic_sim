import { ViewManager } from "./view/viewManager";

export function showText(div: HTMLDivElement): void {
  new ViewManager(div);
  // div.textContent = "Example Text";
}
