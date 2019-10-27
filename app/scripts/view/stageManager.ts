import { SpringWrapper } from "./graphicsWrappers/springWrapper.js";
import { MassWrapper } from "./graphicsWrappers/massWrapper.js";
import { BackgroundWrapper } from "./graphicsWrappers/backgroundWrapper.js";
import { GraphicsLayer } from "./graphicsWrappers/graphicsLayer.js";
import { MassDescription, SpringDescription } from "../worldDescription.js";

export class StageManager {
    private readonly app: PIXI.Application;

    private readonly backgroundWrapper: BackgroundWrapper;

    private readonly graphicsLayersContainer: PIXI.Container;
    private readonly springGraphicsLayer: GraphicsLayer;
    private readonly massGraphicsLayer: GraphicsLayer;

    private readonly springWrappers: {[key: string]: SpringWrapper} = {};
    private readonly massWrappers: {[key: string]: MassWrapper} = {};

    private readonly positionZoomChangedListeners: Array<() => void> = [];

    constructor(
        div: HTMLDivElement
    ) {
        this.app = new PIXI.Application();
        div.appendChild(this.app.view);

        this.app.ticker.start();

        this.backgroundWrapper = new BackgroundWrapper(this.app.renderer);
        this.app.stage.addChild(this.backgroundWrapper.getDisplayObject());

        this.graphicsLayersContainer = new PIXI.Container();
        this.app.stage.addChild(this.graphicsLayersContainer);

        this.springGraphicsLayer = new GraphicsLayer();
        this.springGraphicsLayer.addTo(this.graphicsLayersContainer);

        this.massGraphicsLayer = new GraphicsLayer();
        this.massGraphicsLayer.addTo(this.graphicsLayersContainer);
    }

    public addSpring(springId: string, springDesc: SpringDescription): void {
        const springWrapper = new SpringWrapper();
        this.springWrappers[springId] = springWrapper;
        this.springGraphicsLayer.addChild(springWrapper);

        this.updateSpring(springId, springDesc);
    }

    public addMass(massId: string, massDesc: MassDescription): void {
        const massWrapper = new MassWrapper(this.app.renderer);
        this.massWrappers[massId] = massWrapper;
        this.massGraphicsLayer.addChild(massWrapper);

        this.updateMass(massId, massDesc);
    }

    public removeSpring(springId: string): void {
        this.springGraphicsLayer.removeChild(this.springWrappers[springId]);
        delete this.springWrappers[springId];
    }

    public removeMass(massId: string): void {
        this.massGraphicsLayer.removeChild(this.massWrappers[massId]);
        delete this.massWrappers[massId];
    }

    public updateMass(massId: string, massDesc: MassDescription): void {
        const massWrapper = this.massWrappers[massId];

        massWrapper.setLocalPosition(massDesc.x, massDesc.y);
    }

    public updateSpring(springId: string, springDesc: SpringDescription): void {
        const springWrapper = this.springWrappers[springId];

        const sourceMassWrapper = this.massWrappers[springDesc.sourceMassId];
        const targetMassWrapper = this.massWrappers[springDesc.targetMassId];

        springWrapper.setEndPoints(
            sourceMassWrapper.localX(),
            sourceMassWrapper.localY(),
            targetMassWrapper.localX(),
            targetMassWrapper.localY(),
        );
    }

    /**
     * Sets the dimensions of the stage.
     * @param width - The new width of the stage
     * @param height - The new height of the stage
     */
    public setDimensions(width: number, height: number): void {
      this.backgroundWrapper.setDimensions(width, height);
      this.app.renderer.resize(width, height);

      for (const listener of this.positionZoomChangedListeners) {
        listener();
      }
    }
}