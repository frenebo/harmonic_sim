import { ViewManager } from "./view/viewManager.js";
import { PhysicsSim } from "./springSim/physicsSim.js";

export function showText(div: HTMLDivElement): void {
  const viewManager = new ViewManager(div);

  const amplitudeOne = 1 - (2 + Math.sqrt(2));
  const amplitudeTwo = 1 - (2 - Math.sqrt(2));

  const sim = new PhysicsSim({
    masses: {
      co2one_a: {
        xPos: 80,
        yPos: 100,
        mass: 10,
      },
      co2one_b: {
        xPos: 210,
        yPos: 100,
        mass: 20,
      },
      co2one_c: {
        xPos: 280,
        yPos: 100,
        mass: 10,
      },

      co2two_a: {
        xPos: 80,
        yPos: 200,
        mass: 10,
      },
      co2two_b: {
        xPos: 200,
        yPos: 200,
        mass: 20,
      },
      co2two_c: {
        xPos: 320,
        yPos: 200,
        mass: 10,
      },

      four_one_a: {
        xPos: 110,
        yPos: 300,
        mass: 10,
      },
      four_one_b: {
        xPos: 190,
        yPos: 300,
        mass: 10,
      },
      four_one_c: {
        xPos: 290,
        yPos: 300,
        mass: 10,
      },
      four_one_d: {
        xPos: 410,
        yPos: 300,
        mass: 10,
      },

      four_two_a: {
        xPos: 100 - 10,
        yPos: 400,
        mass: 10,
      },
      four_two_b: {
        xPos: 200 - 10*amplitudeOne,
        yPos: 400,
        mass: 10,
      },
      four_two_c: {
        xPos: 300 + 10*amplitudeOne,
        yPos: 400,
        mass: 10,
      },
      four_two_d: {
        xPos: 400 + 10,
        yPos: 400,
        mass: 10,
      },

      four_three_a: {
        xPos: 100 - 20,
        yPos: 500,
        mass: 10,
      },
      four_three_b: {
        xPos: 200 - 20*amplitudeTwo,
        yPos: 500,
        mass: 10,
      },
      four_three_c: {
        xPos: 300 + 20*amplitudeTwo,
        yPos: 500,
        mass: 10,
      },
      four_three_d: {
        xPos: 400 + 20,
        yPos: 500,
        mass: 10,
      },
    },
    springs: {
      c02one_1: {
        source: "co2one_a",
        target: "co2one_b",
        equilibriumLength: 100,
        springConstant: 100,
      },
      c02one_2: {
        source: "co2one_b",
        target: "co2one_c",
        equilibriumLength: 100,
        springConstant: 100,
      },

      c02two_1: {
        source: "co2two_a",
        target: "co2two_b",
        equilibriumLength: 100,
        springConstant: 100,
      },
      c02two_2: {
        source: "co2two_b",
        target: "co2two_c",
        equilibriumLength: 100,
        springConstant: 100,
      },

      four_one_1: {
        source: "four_one_a",
        target: "four_one_b",
        equilibriumLength: 100,
        springConstant: 100,
      },
      four_one_2: {
        source: "four_one_b",
        target: "four_one_c",
        equilibriumLength: 100,
        springConstant: 100,
      },
      four_one_3: {
        source: "four_one_c",
        target: "four_one_d",
        equilibriumLength: 100,
        springConstant: 100,
      },

      four_two_1: {
        source: "four_two_a",
        target: "four_two_b",
        equilibriumLength: 100,
        springConstant: 100,
      },
      four_two_2: {
        source: "four_two_b",
        target: "four_two_c",
        equilibriumLength: 100,
        springConstant: 100,
      },
      four_two_3: {
        source: "four_two_c",
        target: "four_two_d",
        equilibriumLength: 100,
        springConstant: 100,
      },

      four_three_1: {
        source: "four_three_a",
        target: "four_three_b",
        equilibriumLength: 100,
        springConstant: 100,
      },
      four_three_2: {
        source: "four_three_b",
        target: "four_three_c",
        equilibriumLength: 100,
        springConstant: 100,
      },
      four_three_3: {
        source: "four_three_c",
        target: "four_three_d",
        equilibriumLength: 100,
        springConstant: 100,
      },
    },
  });

  const timeInterval = 0.025;

  const timeStep = () => {
    sim.timeStep(timeInterval*2);
    viewManager.updateWorldDescription(sim.getWorldDesc());
  }
  setInterval(timeStep, timeInterval*1000);
  // timeStep();
  // const doIt = () => {
  //   if (goingUp) {
  //     num += 5;
  //     if (num >= 300) {
  //       goingUp = false;
  //     }
  //   } else {
  //     num -= 5;
  //     if (num <= 50) {
  //       goingUp = true;
  //     }
  //   }
  //   viewManager.updateWorldDescription({
  //     masses: {
  //       a: {
  //         x: 50,
  //         y: 50,
  //       },
  //       b: {
  //         x: num,
  //         y: 50,
  //       },
  //       c: {
  //         x: 50,
  //         y: num,
  //       }
  //     },
  //     springs: {
  //       springId: {
  //         sourceMassId: "a",
  //         targetMassId: "b",
  //       },
  //       otherSpringId: {
  //         sourceMassId: "a",
  //         targetMassId: "c",
  //       }
  //     },
  //   });
  //   setTimeout(doIt, 20);
  // }
  // doIt();
  // div.textContent = "Example Text";
}
