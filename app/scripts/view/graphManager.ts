import { MassDescription, SpringDescription } from "../worldDescription.js";
import { StageManager } from "./stageManager.js";

export class GraphManager {
    private readonly stageManager: StageManager;

    private readonly springDescriptions: {[key: string]: SpringDescription} = {};
    private readonly massDescriptions: {[key: string]: MassDescription} = {};

    constructor(
        private readonly div: HTMLDivElement
    ) {
        this.stageManager = new StageManager(div);
    }

    /**
     * Sets the dimensions of the stage.
     * @param w - The stage width
     * @param h - The stage height
     */
    public setDimensions(w: number, h: number): void {
      this.stageManager.setDimensions(w, h);
      this.div.style.width = `${w}px`;
      this.div.style.height = `${h}px`;
    }

    public deleteSpring(springId: string): void {
        this.stageManager.removeSpring(springId);
    }

    public deleteMass(massId: string): void {
        this.stageManager.removeMass(massId);
    }

    public updateMass(massId: string, newMassDesc: MassDescription): void {
        this.stageManager.updateMass(massId, newMassDesc);
    }

    public updateSpring(springId: string, newSpringDesc: SpringDescription): void {
        this.stageManager.updateSpring(springId, newSpringDesc);
    }

    public addMass(massId: string, massDesc: MassDescription): void {
        this.stageManager.addMass(massId, massDesc);
    }

    public addSpring(springId: string, springDesc: SpringDescription): void {
        this.stageManager.addSpring(springId, springDesc);
    }
}