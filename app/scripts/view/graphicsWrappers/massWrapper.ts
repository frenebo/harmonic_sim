import { GraphicWrapper } from "./graphicsWrapper.js";

export class MassWrapper extends GraphicWrapper {
    private static readonly spritePadding = 30;
    private static readonly massFillColor = 0xE6E6E6;
    private static readonly borderColor = 0x000000;
    private static readonly borderWidth = 5;
    private static readonly massCircleRadius = 20;

    private static cachedTexture: PIXI.RenderTexture | null = null;

    private static drawSprite(renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer): PIXI.Sprite {
        const graphics = new PIXI.Graphics();

        graphics.beginFill(MassWrapper.massFillColor);
        graphics.drawCircle(
            MassWrapper.massCircleRadius + MassWrapper.spritePadding,
            MassWrapper.massCircleRadius + MassWrapper.spritePadding,
            MassWrapper.massCircleRadius,
        );
        graphics.endFill();

        graphics.lineStyle(MassWrapper.borderWidth, MassWrapper.borderColor);
        graphics.drawCircle(
            MassWrapper.massCircleRadius + MassWrapper.spritePadding,
            MassWrapper.massCircleRadius + MassWrapper.spritePadding,
            MassWrapper.massCircleRadius,
        );
        graphics.endFill();

        const texture = renderer.generateTexture(graphics);

        return new PIXI.Sprite(texture);
    }

    private readonly sprite: PIXI.Sprite;
    private xPos: number = 0;
    private yPos: number = 0;

    constructor(
        private readonly renderer: PIXI.CanvasRenderer | PIXI.WebGLRenderer,
    ) {
        super();

        this.sprite = MassWrapper.drawSprite(renderer);
        this.sprite.position.set(
            -MassWrapper.massCircleRadius,
            -MassWrapper.massCircleRadius,
        );
        this.addChild(this.sprite);
    }
}