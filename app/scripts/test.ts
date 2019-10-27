import { ViewManager } from "./view/viewManager.js";

export function showText(div: HTMLDivElement): void {
  const viewManager = new ViewManager(div);
  viewManager.updateWorldDescription({
    masses: {
      a: {
        x: 10,
        y: 10,
      },
      b: {
        x: 30,
        y: 30,
      },
    },
    springs: {
      springId: {
        sourceMassId: "a",
        targetMassId: "b",
      },
    },
  })
  // div.textContent = "Example Text";
}
