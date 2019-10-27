import { ViewManager } from "./view/viewManager.js";

export function showText(div: HTMLDivElement): void {
  const viewManager = new ViewManager(div);

  let num = 300;
  let goingUp = false;
  const doIt = () => {
    if (goingUp) {
      num += 5;
      if (num >= 300) {
        goingUp = false;
      }
    } else {
      num -= 5;
      if (num <= 50) {
        goingUp = true;
      }
    }
    viewManager.updateWorldDescription({
      masses: {
        a: {
          x: 50,
          y: 50,
        },
        b: {
          x: num,
          y: 50,
        },
        c: {
          x: 50,
          y: num,
        }
      },
      springs: {
        springId: {
          sourceMassId: "a",
          targetMassId: "b",
        },
        otherSpringId: {
          sourceMassId: "a",
          targetMassId: "c",
        }
      },
    });
    setTimeout(doIt, 20);
  }
  doIt();
  // div.textContent = "Example Text";
}
