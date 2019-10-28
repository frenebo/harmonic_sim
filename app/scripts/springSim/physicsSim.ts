import { WorldDescription, MassDescription, SpringDescription } from "../worldDescription";

export type SimConfig = {
    masses: {
        [key: string]: {
            xPos: number;
            yPos: number;
            // xVelocity: number;
            // yVelocity: number;
            mass: number;
        };
    };
    springs: {
        [key: string]: {
            source: string;
            target: string;
            equilibriumLength: number;
            springConstant: number;
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
        this.xVelocity += xForce*timeDiff/this.mass;
        this.yVelocity += yForce*timeDiff/this.mass;
    }

    public move(timeDiff: number): void {
        this.xPos += this.xVelocity * timeDiff;
        this.yPos += this.yVelocity * timeDiff;
    }
}

class SpringSim {
    constructor(
        public readonly equilibriumLength: number,
        public readonly springConstant: number,
        public readonly source: MassSim,
        public readonly target: MassSim,
        public readonly sourceKey: string,
        public readonly targetKey: string,
    ) {
    }

    public apply(timeDiff: number): void {
        const xDiff = this.target.xPos - this.source.xPos;
        const yDiff = this.target.yPos - this.source.yPos;

        const length = Math.sqrt(xDiff*xDiff + yDiff*yDiff);
        const tension = (length - this.equilibriumLength)*this.springConstant;

        // atan works with infinity value if xDiff = 0
        let directionAngle = Math.atan(yDiff / xDiff);
        console.log(directionAngle);

        if (xDiff < 0) directionAngle += Math.PI;

        const xForceOnSource = tension*Math.cos(directionAngle);
        const yForceOnSource = tension*Math.sin(directionAngle);

        this.source.applyForce(xForceOnSource, yForceOnSource, timeDiff);
        this.target.applyForce(-xForceOnSource, -yForceOnSource, timeDiff);
    }
}

export class PhysicsSim {
    private readonly masses: {[key: string]: MassSim} = {};
    private readonly springs: {[key: string]: SpringSim} = {};

    constructor(config: SimConfig) {
        for (const massKey in config.masses) {
            const massConfig = config.masses[massKey];
            this.masses[massKey] = new MassSim(
                massConfig.xPos,
                massConfig.yPos,
                0,
                0,
                massConfig.mass,
            );
        }
        for (const springKey in config.springs) {
            const springConfig = config.springs[springKey];
            this.springs[springKey] = new SpringSim(
                springConfig.equilibriumLength,
                springConfig.springConstant,
                this.masses[springConfig.source],
                this.masses[springConfig.target],
                springConfig.source,
                springConfig.target,
            );
        }
    }

    public timeStep(timeDiff: number): void {
        for (const springKey in this.springs) {
            this.springs[springKey].apply(timeDiff);
        }
        for (const massKey in this.masses) {
            this.masses[massKey].move(timeDiff);
        }
    }

    public getWorldDesc(): WorldDescription {
        const massDescriptions: {[key: string]: MassDescription} = {};
        const springDescriptions: {[key: string]: SpringDescription} = {};

        for (const massKey in this.masses) {
            const mass = this.masses[massKey];
            massDescriptions[massKey] = {
                x: mass.xPos,
                y: mass.yPos,
            };
        }

        for (const springKey in this.springs) {
            const spring = this.springs[springKey];
            springDescriptions[springKey] = {
                sourceMassId: spring.sourceKey,
                targetMassId: spring.targetKey,
            }
        }

        return {
            masses: massDescriptions,
            springs: springDescriptions,
        };
    }
}