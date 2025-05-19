/**
 * Datum constructor parameters
 */
export type DatumParameters = {
	/**
	 * The digit to be displayed
	 */
	datum: number;
	/**
	 * Initial position
	 */
	position: {
		x: number;
		y: number;
	};
};

export type DatumPosition = {
	x: number;
	y: number;
};

/**
 * Datum
 */
export class Datum {
	private amplitude: number;
	private axis: "x" | "y";
	private datum: number;
	private delay: number;
	private font: {
		family: string;
		size: number;
	};
	private initialPosition: DatumPosition;
	private isComplexMovement: boolean;
	private offset: number;
	private opacity: number;
	private position: DatumPosition;
	private scale: number;
	private speed: {
		primary: number;
		secondary: number;
		tertiary: number;
	};
	private startTime: number;

	constructor(params: DatumParameters) {
		// Use params to initialize properties
		this.datum = params.datum;
		this.initialPosition = params.position;
		this.position = params.position;

		// Initialize other properties
		this.amplitude = Math.random() * 25 + 3;
		this.axis = Math.round(Math.random() * 1) ? "x" : "y";
		this.delay = Math.round(Math.random() * 2000);
		this.font = {
			family: "Poppins",
			size: 24,
		};
		// Allow for a 30% chance for complex movement
		this.isComplexMovement = Math.random() < 0.3;
		this.offset = Math.random() * 1000;
		this.opacity = 0;
		this.scale = 0;
		this.speed = {
			primary: Math.random() * 0.001 + 0.0003,
			secondary: Math.random() * 0.002 + 0.001,
			tertiary: Math.random() * 0.003 + 0.002,
		};
		this.startTime = Date.now();
	}

	private calculatePosition(time: number) {
		const theta = time + this.offset;

		if (this.isComplexMovement) {
			return (
				Math.sin(theta * this.speed.primary) * this.amplitude * 0.5 +
				Math.sin(theta * this.speed.secondary) * this.amplitude * 0.3 +
				Math.sin(theta * this.speed.tertiary) * this.amplitude * 0.2
			);
		}

		return (
			Math.sin(theta * this.speed.primary) * this.amplitude +
			Math.sin(theta * this.speed.secondary) * (this.amplitude * 0.2)
		);
	}

	public draw(ctx: CanvasRenderingContext2D) {
		if (Date.now() - this.startTime < this.delay) {
			return;
		}

		ctx.save();
		ctx.translate(this.position.x, this.position.y);
		ctx.scale(this.scale, this.scale);

		// Render datum
		ctx.fillStyle = `rgba(190, 238, 255, ${this.opacity})`;
		ctx.font = `${this.font.size}px ${this.font.family}`;
		ctx.textAlign = "center";
		ctx.textBaseline = "middle";
		ctx.fillText(this.datum.toString(), 0, 0);

		ctx.restore();
	}

	/**
	 * Update the position of the datum
	 *
	 * NOTE: Primarily for window resizing
	 */
	public updatePosition(position: DatumPosition) {
		this.initialPosition = position;
	}

	public update(time: number) {
		if (time - this.startTime < this.delay) {
			return;
		}

		// Fade in
		if (this.opacity < 1) {
			this.opacity += 0.02;
		}

		// Scale up
		if (this.scale < 1) {
			this.scale += 0.04;
		}

		const newPosition = this.calculatePosition(time);
		this.position = {
			x: this.axis === "x" ? this.initialPosition.x + newPosition : this.initialPosition.x,
			y: this.axis === "y" ? this.initialPosition.y + newPosition : this.initialPosition.y,
		};
	}
}
