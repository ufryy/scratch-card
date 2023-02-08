/**
 * A scratch card custom element made with Lit.
 * Inspired from this CodePen made by Totati: https://codepen.io/Totati/pen/pPXrJV
 *
 * @author Matteo De Nardis <matteodn96@gmail.com>
 */

import { LitElement, PropertyValues, css, html } from "lit";
import { customElement } from "lit/decorators/custom-element.js";
import { property } from "lit/decorators/property.js";
import { Ref, createRef, ref } from "lit/directives/ref.js";

interface Point {
	x: number;
	y: number;
}

@customElement("scratch-card")
export class ScratchCard extends LitElement {
	static override styles = css`
		.container {
			box-sizing: border-box;
			position: relative;
			width: 100%;
			height: 100%;
			background: var(--scratch-card-bg-fallback, transparent);
			border-radius: var(--scratch-card-border-radius, 0);
			-webkit-user-select: none;
			-moz-user-select: none;
			-ms-user-select: none;
			-o-user-select: none;
			user-select: none;
		}

		.container canvas {
			position: absolute;
			top: 0;
			left: 0;
			border-radius: inherit;
			cursor: var(--scratch-card-cursor, default);
		}

		.container .content {
			visibility: hidden;
			width: 100%;
			height: 100%;
		}
	`;

	readonly #brushSrc = `data:image/png;base64,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`;

	#brush: HTMLImageElement;
	#canvas: Ref<HTMLCanvasElement> = createRef();
	#container: Ref<HTMLDivElement> = createRef();
	#content: Ref<HTMLDivElement> = createRef();
	#isDrawing = false;
	#lastPoint: Point = {
		x: 0,
		y: 0
	};
	#resizeObserver: ResizeObserver;

	/**
	 * Scales up (> 1) or down (< 1) the size of the uncovered area with a single scratch.
	 * @defaultValue `1`
	 */
	@property({ type: Number })
	brushScale: number = 1;

	/**
	 * If true, the cover image is centered in the scratching area.
	 * @defaultValue `false`
	 */
	@property({ type: Boolean })
	centerCover: boolean = false;

	/**
	 * URL path (relative or absolute) of the image to be used as cover to scratch.
	 * If undefined, then the scratch area will be filled with a rectangle with style specified by the `fillColor` property.
	 * @defaultValue `undefined`
	 */
	@property()
	coverSrc?: string;

	/**
	 * Specifies the color to use to fill the scratch area if a `coverSrc` is not provided.
	 * If this is an invalid value while the `coverSrc` is missing, the scratch card will show as already scratched.
	 * @defaultValue `white`
	 */
	@property()
	fillColor: string = "white";

	/**
	 * Whether to scale or not the cover to avoid leaving empty spaces in the scratch area.
	 * This can happen when the scratch area and the cover image have not the same aspect ratio.
	 * To set as true, just add the attribute; for example, both `preserveAspectRatio` and `preserveAspectRatio="false"` evaluate to `true`
	 * (the behaviour is the same to the standard `disabled` attribute).
	 * @defaultValue `false`
	 */
	@property({ type: Boolean })
	preserveAspectRatio: boolean = false;

	/**
	 * Percentage threshold to consider the card as fully scratched.
	 * For instance, if `showAllAt="80"` the content will be entirely revealed when the 80% of the card's surface is scratched.
	 * @defaultValue `100`
	 */
	@property({ type: Number })
	showAllAt: number = 100;

	/**
	 * Whether to stop emitting or not warnings to the browser console, such as `"The image is being scaled up"`.
	 * @defaultValue `false`
	 */
	@property({ type: Boolean })
	silenceWarnings: boolean = false;

	constructor() {
		super();
		this.#brush = new Image();
		this.#brush.src = this.#brushSrc;
		this.#resizeObserver = new ResizeObserver(() => this.#refreshCanvas());
	}

	override render() {
		return html`
			<div class="container" ${ref(this.#container)}>
				<canvas
					${ref(this.#canvas)}
					width="0"
					height="0"
					@mousedown=${this.#onMouseDown}
					@touchstart=${{ handleEvent: (e: TouchEvent) => this.#onMouseDown(e), passive: true }}
					@mousemove=${this.#onMouseMove}
					@touchmove=${this.#onMouseMove}
					@mouseup=${this.#onMouseUp}
					@touchend=${this.#onMouseUp}
				></canvas>
				<div class="content" ${ref(this.#content)}>
					<slot></slot>
				</div>
			</div>
		`;
	}

	override updated(_changedProperties: PropertyValues) {
		super.firstUpdated(_changedProperties);
		this.#refreshCanvas();
		this.#resizeObserver.observe(this.#container.value!);
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.#resizeObserver.disconnect();
	}

	get #ctx(): CanvasRenderingContext2D {
		return this.#canvas.value!.getContext("2d", { willReadFrequently: true })!;
	}

	/**
	 * Returns the card's underlying content.
	 */
	get #slottedElement(): HTMLElement | null {
		if (!this.shadowRoot) {
			return null;
		}

		const slot = this.shadowRoot.querySelector("slot");
		if (!slot) {
			if (!this.silenceWarnings) {
				console.warn("Missing slot element needed by scratch-card");
			}
			return null;
		}

		return slot.assignedElements()[0] as HTMLElement;
	}

	/**
	 * Method to manually clear the card, revealing immediately the underlying content.
	 */
	clearCard(): void {
		if (!this.#slottedElement) {
			return;
		}

		if (this.#canvas.value && this.#canvas.value.parentNode) {
			this.#canvas.value.parentNode!.removeChild(this.#canvas.value);
			this.#dispatchClear();
		} else if (!this.silenceWarnings) {
			console.warn("clearCanvas() called while canvas is not attached to the DOM");
		}
		this.#slottedElement.style.visibility = "visible";
	}

	#dispatchClear(): void {
		const options = { bubbles: true, composed: true };
		this.dispatchEvent(new CustomEvent("cleared", options));
	}

	#refreshCanvas(): void {
		if (!this.#slottedElement) {
			return;
		}

		this.#slottedElement.style.visibility = "hidden";

		const width = this.#container.value!.offsetWidth;
		const height = this.#container.value!.offsetHeight;

		this.#canvas.value!.style.width = `${width}px`;
		this.#canvas.value!.style.height = `${height}px`;

		const scaleFactor = window.devicePixelRatio;
		const scaledWidth = width * scaleFactor;
		const scaledHeight = height * scaleFactor;
		this.#canvas.value!.width = Math.floor(scaledWidth);
		this.#canvas.value!.height = Math.floor(scaledHeight);

		if (this.coverSrc) {
			const cover = new Image();
			cover.src = this.coverSrc;
			cover.setAttribute("crossOrigin", "");
			cover.onload = () => {
				console.debug(this.preserveAspectRatio);
				const [dWidth, dHeight] = this.preserveAspectRatio
					? this.#scale(scaledWidth, scaledHeight, cover.width, cover.height)
					: [cover.width, cover.height];
				const dx = this.centerCover ? (scaledWidth - dWidth) / 2 : 0;
				const dy = this.centerCover ? (scaledHeight - dHeight) / 2 : 0;
				const translateX = (scaledWidth - width) / -2;
				const translateY = (scaledHeight - height) / -2;
				this.#ctx.drawImage(cover, dx, dy, dWidth, dHeight);
				this.#ctx.save();
				this.#ctx.setTransform(-scaleFactor, 0, 0, -scaleFactor, translateX, translateY);
				this.#ctx.restore();
				this.#slottedElement!.style.visibility = "visible";
			};
		} else if (this.fillColor) {
			this.#ctx.fillStyle = this.fillColor;
			const dWidth = this.preserveAspectRatio ? scaledWidth : width;
			const dHeight = this.preserveAspectRatio ? scaledHeight : height;
			this.#ctx.rect(0, 0, dWidth, dHeight);
			this.#ctx.fill();
			this.#slottedElement.style.visibility = "visible";
		} else {
			this.clearCard();
		}
	}

	#scale(
		targetWidth: number,
		targetHeight: number,
		actualWidth: number,
		actualHeight: number
	): number[] {
		if (!this.silenceWarnings && (targetWidth > actualWidth || targetHeight > actualHeight)) {
			console.warn("The scratch-card cover image is being scaled up");
		}

		const wRatio = targetWidth / actualWidth;
		const hRatio = targetHeight / actualHeight;

		const newW = actualWidth * hRatio;

		if (newW >= targetWidth) {
			return [newW, targetHeight];
		} else {
			return [targetWidth, actualHeight * wRatio];
		}
	}

	#distanceBetween(point1: Point, point2: Point): number {
		return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
	}

	#angleBetween(point1: Point, point2: Point): number {
		return Math.atan2(point2.x - point1.x, point2.y - point1.y);
	}

	// Only test every `stride` pixel. `stride`x faster, but might lead to inaccuracy
	#getFilledInPixels(stride: number): number {
		if (!stride || stride < 1) {
			stride = 1;
		}

		const pixels = this.#ctx.getImageData(
				0,
				0,
				this.#canvas.value!.width,
				this.#canvas.value!.height
			),
			pixelsDataLength = pixels.data.length,
			total = pixelsDataLength / stride;

		let count = 0;

		// Iterate over all pixels
		for (let i = 0; i < pixelsDataLength; i += stride) {
			if (pixels.data[i] === 0) {
				count++;
			}
		}

		return Math.round((count / total) * 100);
	}

	#getMouse(e: MouseEvent | TouchEvent): Point {
		let offsetX = 0,
			offsetY = 0;

		if (this.#canvas.value!.offsetParent !== undefined) {
			let op: HTMLElement | null = this.#canvas.value!.offsetParent as HTMLElement;
			while (op) {
				offsetX += op.offsetLeft;
				offsetY += op.offsetTop;
				op = op.offsetParent as HTMLElement | null;
			}
		}

		const x = "pageX" in e ? e.pageX : e.touches[0].clientX,
			y = "pageY" in e ? e.pageY : e.touches[0].clientY;

		return {
			x: x - offsetX,
			y: y - offsetY
		};
	}

	#handlePercentage(filledInPixels: number): void {
		filledInPixels = filledInPixels || 0;
		if (filledInPixels >= this.showAllAt) {
			this.#canvas.value!.parentNode!.removeChild(this.#canvas.value!);
			this.#dispatchClear();
			console.debug(`Removed cover at ${filledInPixels}% scratched`);
		}
	}

	#onMouseDown(e: MouseEvent | TouchEvent) {
		this.#isDrawing = true;
		this.#lastPoint = this.#getMouse(e);
	}

	#onMouseMove(e: MouseEvent | TouchEvent) {
		if (!this.#isDrawing) {
			return;
		}

		e.preventDefault();

		const currentPoint = this.#getMouse(e),
			dist = this.#distanceBetween(this.#lastPoint, currentPoint),
			angle = this.#angleBetween(this.#lastPoint, currentPoint),
			scaleFactor = window.devicePixelRatio;

		for (let i = 0; i < dist; i++) {
			const w = this.#brush.width * this.brushScale;
			const h = this.#brush.height * this.brushScale;
			const x = this.#lastPoint.x + Math.sin(angle) * i - 25 - (w - this.#brush.width) / 2;
			const y = this.#lastPoint.y + Math.cos(angle) * i - 25 - (h - this.#brush.height) / 2;
			this.#ctx.globalCompositeOperation = "destination-out";
			this.#ctx.drawImage(this.#brush, x * scaleFactor, y * scaleFactor, w, h);
		}

		this.#lastPoint = currentPoint;
		this.#handlePercentage(this.#getFilledInPixels(this.coverSrc ? 32 : 1));
	}

	#onMouseUp() {
		this.#isDrawing = false;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"scratch-card": ScratchCard;
	}
}
