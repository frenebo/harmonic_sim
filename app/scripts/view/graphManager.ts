import { MassDescription, SpringDescription } from "../worldDescription";
import { GraphicsLayer } from "./graphicsWrappers/graphicsLayer";
import { StageManager } from "./stageManager";

export class GraphManager {
    private readonly stageManager: StageManager;

    private readonly springDescriptions: {[key: string]: SpringDescription} = {};
    private readonly massDescriptions: {[key: string]: MassDescription} = {};

    constructor(div: HTMLDivElement) {
        this.stageManager = new StageManager(div);
    }

    public deleteSpring(springId: string): void {

    }

    public deleteMass(massId: string): void {

    }

    public updateMass(massId: string, newMassDesc: MassDescription): void {

    }

    public updateSpring(springId: string, newSpringDesc: SpringDescription): void {

    }

    public addMass(massId: string, massDesc: MassDescription): void {

    }

    public addSpring(springId: string, springDesc: SpringDescription): void {

    }
}