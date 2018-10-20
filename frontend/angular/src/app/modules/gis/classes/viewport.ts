import { Point } from './point';

export class Viewport {
    constructor(
        public topLeft: Point,
        public bottomRight: Point
    ) {}

    get width(): number {
        return this.bottomRight.x - this.topLeft.x;
    }

    get height(): number {
        return this.topLeft.y - this.bottomRight.y;
    }

    public move(dx: number, dy: number): Viewport {
        return new Viewport(
            new Point(
                this.topLeft.x + dx,
                this.topLeft.y + dy
            ),
            new Point(
                this.bottomRight.x + dx,
                this.bottomRight.y + dy
            )
        );
    }
}
