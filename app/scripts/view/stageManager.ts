import { SpringWrapper } from "./graphicsWrappers/springWrapper";
import { MassWrapper } from "./graphicsWrappers/massWrapper";
import { BackgroundWrapper } from "./graphicsWrappers/backgroundWrapper";
import { GraphicsLayer } from "./graphicsWrappers/graphicsLayer";

export class StageManager {
    private readonly app: PIXI.Application;

    private readonly backgroundWrapper: BackgroundWrapper;

    private readonly graphicsLayersContainer: PIXI.Container;
    private readonly springGraphicsLayer: GraphicsLayer;
    private readonly massGraphicsLayer: GraphicsLayer;

    private readonly springWrappers: {[key: string]: SpringWrapper} = {};
    private readonly massWrappers: {[key: string]: MassWrapper} = {};

    constructor(div: HTMLDivElement) {
        this.app = new PIXI.Application();
        div.appendChild(this.app.view);

        this.app.ticker.start();

        this.graphicsLayersContainer = new PIXI.Container();
        this.app.stage.addChild(this.graphicsLayersContainer);

        this.springGraphicsLayer = new GraphicsLayer();
        this.springGraphicsLayer.addTo(this.graphicsLayersContainer);
        this.massGraphicsLayer = new GraphicsLayer();
        this.massGraphicsLayer.addTo(this.graphicsLayersContainer);

        this.backgroundWrapper = new BackgroundWrapper(this.app.renderer);
    }
}