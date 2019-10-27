
export type SimConfig = {
    masses: {
        [key: string]: {
            xPos: number;
            yPos: number;
            xVelocity: number;
            yVelocity: number;
        };
    };
    springs: {
        [key: string]: {
            source: string;
            target: string;
            equilibriumLength: string;
            springConstant: string;
        };
    };
};

class MassSim {
    constructor(
        public xPos: number,
        public yPos: number,
        public xVelocity: number,
        public yVelocity: number,
        public mass: number
    ) {}

    public applyForce(xForce: number, yForce: number, timeDiff: number): void {
        throw new Error("Unimplemented");
    }
}

class SpringSim {
    constructor(
        public readonly equilibriumLength: number,
        public readonly springConstant: number,
        public readonly source: MassSim,
        public readonly target: MassSim,
    ) {
    }

    public apply(timeDiff: number): void {
        const xDiff = this.target.xPos - this.source.xPos;
        const yDiff = this.target.yPos - this.source.yPos;

        const length = Math.sqrt(xDiff*xDiff + yDiff*yDiff);
        const tension = -(length - this.equilibriumLength)*this.springConstant;

        // atan works with infinity value if xDiff = 0
        let directionAngle = Math.atan(yDiff / xDiff);

        if (xDiff < 0) directionAngle *= -1;

        const xForceOnSource = tension*Math.cos(directionAngle);
        const yForceOnSource = tension*Math.sin(directionAngle);

        this.source.applyForce(xForceOnSource, yForceOnSource, timeDiff);
    }
}

export class PhysicsSim {
    private readonly masses: {[key: string]: MassSim} = {};
    private readonly springs: {[key: string]: SpringSim} = {};
    constructor(config: SimConfig) {

    }
}