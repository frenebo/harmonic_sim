import { GraphicWrapper } from "./graphicsWrapper.js";

export class SpringWrapper extends GraphicWrapper {
    private static readonly spriteLeftRightPadding = 25;
    private static readonly spriteTopBottomPadding = 25;
    private static readonly highlightedColor = 0xFFFF00;
    private static readonly unhighlightedColor = 0x000000;
    private static readonly lineWidth = 6;

    private static drawGraphics(
        graphics: PIXI.Graphics,
        sourceX: number,
        sourceY: number,
        targetX: number,
        targetY: number,
        isHighlighted: boolean,
    ): void {
        graphics.clear();

        let lineColor: number =isHighlighted ? SpringWrapper.highlightedColor : SpringWrapper.unhighlightedColor;
        graphics.lineStyle(SpringWrapper.lineWidth);

        const topLeftX = Math.min(sourceX, targetX);
        const topLeftY = Math.min(sourceY, targetY);

        graphics.moveTo(
            (sourceX - topLeftX) + SpringWrapper.spriteLeftRightPadding,
            (sourceY - topLeftY) + SpringWrapper.spriteTopBottomPadding,
        );
        graphics.lineTo(
            (targetX - topLeftX) + SpringWrapper.spriteLeftRightPadding,
            (targetY - topLeftY) + SpringWrapper.spriteTopBottomPadding,
        );
    }

    private readonly graphics: PIXI.Graphics;

    constructor() {
        super();

        this.graphics = new PIXI.Graphics();
        this.graphics.filters = [new PIXI.filters.FXAAFilter()];
        this.addChild(this.graphics);

        this.refresh(
            this.sourceX,
            this.sourceY,
            this.targetX,
            this.targetY,
            this.isHighlighted,
            true
        )
    }

    public setEndPoints(
        newSourceX: number,
        newSourceY: number,
        newTargetX: number,
        newTargetY: number,
    ): void {
        this.refresh(
            newSourceX,
            newSourceY,
            newTargetX,
            newTargetY,
            this.isHighlighted,
        );
    }

    public setHighlighted(newHighlighted: boolean): void {
        this.refresh(
            this.sourceX,
            this.sourceY,
            this.targetX,
            this.targetY,
            newHighlighted,
        );
    }

    private sourceX: number = 0;
    private sourceY: number = 0;
    private targetX: number = 0;
    private targetY: number = 0;
    private isHighlighted: boolean = false;

    public refresh(
        newSourceX: number,
        newSourceY: number,
        newTargetX: number,
        newTargetY: number,
        newIsHighlighted: boolean,
        forceRefresh=false,
    ) {
        // Redraw if this is the first time being drawn, or if the dimensions of the spring have changed,
        // or if the highlighted state has changed.
        if (
            forceRefresh ||
            newTargetX - newSourceX !== this.targetX - this.sourceX ||
            newTargetY - newSourceY !== this.targetY - this.sourceY ||
            newIsHighlighted !== this.isHighlighted)
        {
            SpringWrapper.drawGraphics(
                this.graphics,
                newSourceX,
                newSourceY,
                newTargetX,
                newTargetY,
                newIsHighlighted,
            );
        }

        this.setLocalPosition(
            Math.min(newSourceX, newTargetX) - SpringWrapper.spriteLeftRightPadding,
            Math.min(newSourceY, newTargetY) - SpringWrapper.spriteTopBottomPadding,
        );

        const angle = Math.atan((newTargetY - newSourceY) / (newTargetX - newSourceX)) + (newTargetX < newSourceX ? Math.PI : 0);
        const thicknessHorizontalOffset = Math.sin(angle) * SpringWrapper.lineWidth / 2;
        const thicknessVerticalOffset = Math.cos(angle) * SpringWrapper.lineWidth / 2;

        this.updateHitArea(new PIXI.Polygon(
            new PIXI.Point(
                newSourceX - this.localX() + thicknessHorizontalOffset,
                newSourceY - this.localY() - thicknessVerticalOffset,
            ),
            new PIXI.Point(
                newSourceX - this.localX() - thicknessHorizontalOffset,
                newSourceY - this.localY() + thicknessVerticalOffset,
            ),
            new PIXI.Point(
                newTargetX - this.localX() - thicknessHorizontalOffset,
                newTargetY - this.localY() + thicknessVerticalOffset,
            ),
            new PIXI.Point(
                newTargetX - this.localX() + thicknessHorizontalOffset,
                newTargetY - this.localY() - thicknessVerticalOffset,
            ),
        ));

        this.sourceX = newSourceX;
        this.sourceY = newSourceY;
        this.targetX = newTargetX;
        this.targetY = newTargetY;
        this.isHighlighted = newIsHighlighted;
    }
}