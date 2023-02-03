/**
 * A scratch card custom element made with Lit.
 * Inspired from this CodePen made by Totati: https://codepen.io/Totati/pen/pPXrJV
 *
 * @author Matteo De Nardis <matteodn96@gmail.com>
 */
var _ScratchCard_instances, _ScratchCard_brushSrc, _ScratchCard_brush, _ScratchCard_canvas, _ScratchCard_container, _ScratchCard_content, _ScratchCard_isDrawing, _ScratchCard_lastPoint, _ScratchCard_resizeObserver, _ScratchCard_ctx_get, _ScratchCard_dispatchClear, _ScratchCard_refreshCanvas, _ScratchCard_scale, _ScratchCard_distanceBetween, _ScratchCard_angleBetween, _ScratchCard_getFilledInPixels, _ScratchCard_getMouse, _ScratchCard_handlePercentage, _ScratchCard_onMouseDown, _ScratchCard_onMouseMove, _ScratchCard_onMouseUp;
import { __classPrivateFieldGet, __classPrivateFieldSet, __decorate } from "tslib";
import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators/custom-element.js";
import { property } from "lit/decorators/property.js";
import { createRef, ref } from "lit/directives/ref.js";
let ScratchCard = class ScratchCard extends LitElement {
    constructor() {
        super();
        _ScratchCard_instances.add(this);
        _ScratchCard_brushSrc.set(this, `data:image/png;base64,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`);
        _ScratchCard_brush.set(this, void 0);
        _ScratchCard_canvas.set(this, createRef());
        _ScratchCard_container.set(this, createRef());
        _ScratchCard_content.set(this, createRef());
        _ScratchCard_isDrawing.set(this, false);
        _ScratchCard_lastPoint.set(this, {
            x: 0,
            y: 0
        });
        _ScratchCard_resizeObserver.set(this, void 0);
        /**
         * Scales up (> 1) or down (< 1) the size of the uncovered area with a single scratch.
         * @defaultValue `1`
         */
        this.brushScale = 1;
        /**
         * If true, the cover image is centered in the scratching area.
         * @defaultValue `true`
         */
        this.centerCover = true;
        /**
         * Specifies the color, gradient or pattern to use to fill the scratch area if a `coverSrc` is not provided.
         * It follows the `CanvasRenderingContext2D.fillStyle` specification.
         * If this is an invalid value while the `coverSrc` is missing, the scratch card will show as already scratched.
         * @defaultValue `white`
         */
        this.fillStyle = "white";
        /**
         * Whether to scale or not the cover to avoid leaving empty spaces in the scratch area.
         * This can happen when the scratch area and the cover image have not the same aspect ratio.
         * To set as true, just add the attribute; for example, both `preserveAspectRatio` and `preserveAspectRatio="false"` evaluate to `true`
         * (the behaviour is the same to the standard `disabled` attribute).
         * @defaultValue `false`
         */
        this.preserveAspectRatio = false;
        /**
         * Percentage threshold to consider the card as fully scratched.
         * For instance, if `showAllAt="80"` the content will be entirely revelead when the 80% of the card's surface is scratched.
         * @defaultValue `100`
         */
        this.showAllAt = 100;
        /**
         * Whether to stop emitting or not warnings to the browser console, such as `"The image is being scaled up"`.
         * @defaultValue `false`
         */
        this.silenceWarnings = false;
        __classPrivateFieldSet(this, _ScratchCard_brush, new Image(), "f");
        __classPrivateFieldGet(this, _ScratchCard_brush, "f").src = __classPrivateFieldGet(this, _ScratchCard_brushSrc, "f");
        __classPrivateFieldSet(this, _ScratchCard_resizeObserver, new ResizeObserver(() => __classPrivateFieldGet(this, _ScratchCard_instances, "m", _ScratchCard_refreshCanvas).call(this)), "f");
    }
    render() {
        return html `
			<div class="container" ${ref(__classPrivateFieldGet(this, _ScratchCard_container, "f"))}>
				<canvas
					${ref(__classPrivateFieldGet(this, _ScratchCard_canvas, "f"))}
					width="0"
					height="0"
					@mousedown=${__classPrivateFieldGet(this, _ScratchCard_instances, "m", _ScratchCard_onMouseDown)}
					@touchstart=${{ handleEvent: (e) => __classPrivateFieldGet(this, _ScratchCard_instances, "m", _ScratchCard_onMouseDown).call(this, e), passive: true }}
					@mousemove=${__classPrivateFieldGet(this, _ScratchCard_instances, "m", _ScratchCard_onMouseMove)}
					@touchmove=${__classPrivateFieldGet(this, _ScratchCard_instances, "m", _ScratchCard_onMouseMove)}
					@mouseup=${__classPrivateFieldGet(this, _ScratchCard_instances, "m", _ScratchCard_onMouseUp)}
					@touchend=${__classPrivateFieldGet(this, _ScratchCard_instances, "m", _ScratchCard_onMouseUp)}
				></canvas>
				<div class="content" ${ref(__classPrivateFieldGet(this, _ScratchCard_content, "f"))}>
					<slot></slot>
				</div>
			</div>
		`;
    }
    updated(_changedProperties) {
        super.firstUpdated(_changedProperties);
        __classPrivateFieldGet(this, _ScratchCard_instances, "m", _ScratchCard_refreshCanvas).call(this);
        __classPrivateFieldGet(this, _ScratchCard_resizeObserver, "f").observe(__classPrivateFieldGet(this, _ScratchCard_container, "f").value);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        __classPrivateFieldGet(this, _ScratchCard_resizeObserver, "f").disconnect();
    }
    /**
     * Returns the card's underlying content.
     */
    get slottedElement() {
        return this.shadowRoot.querySelector("slot").assignedElements()[0];
    }
    /**
     * Method to manually clear the card, revealing immediately the underlying content.
     */
    clearCard() {
        if (__classPrivateFieldGet(this, _ScratchCard_canvas, "f").value && __classPrivateFieldGet(this, _ScratchCard_canvas, "f").value.parentNode) {
            __classPrivateFieldGet(this, _ScratchCard_canvas, "f").value.parentNode.removeChild(__classPrivateFieldGet(this, _ScratchCard_canvas, "f").value);
            __classPrivateFieldGet(this, _ScratchCard_instances, "m", _ScratchCard_dispatchClear).call(this);
        }
        else if (!this.silenceWarnings) {
            console.warn("clearCanvas() called while canvas is not attached to the DOM");
        }
        this.slottedElement.style.visibility = "visible";
    }
};
_ScratchCard_brushSrc = new WeakMap(), _ScratchCard_brush = new WeakMap(), _ScratchCard_canvas = new WeakMap(), _ScratchCard_container = new WeakMap(), _ScratchCard_content = new WeakMap(), _ScratchCard_isDrawing = new WeakMap(), _ScratchCard_lastPoint = new WeakMap(), _ScratchCard_resizeObserver = new WeakMap(), _ScratchCard_instances = new WeakSet(), _ScratchCard_ctx_get = function _ScratchCard_ctx_get() {
    return __classPrivateFieldGet(this, _ScratchCard_canvas, "f").value.getContext("2d", { willReadFrequently: true });
}, _ScratchCard_dispatchClear = function _ScratchCard_dispatchClear() {
    const options = { bubbles: true, composed: true };
    this.dispatchEvent(new CustomEvent("cleared", options));
}, _ScratchCard_refreshCanvas = function _ScratchCard_refreshCanvas() {
    this.slottedElement.style.visibility = "hidden";
    const width = __classPrivateFieldGet(this, _ScratchCard_container, "f").value.offsetWidth;
    const height = __classPrivateFieldGet(this, _ScratchCard_container, "f").value.offsetHeight;
    __classPrivateFieldGet(this, _ScratchCard_canvas, "f").value.style.width = `${width}px`;
    __classPrivateFieldGet(this, _ScratchCard_canvas, "f").value.style.height = `${height}px`;
    const scaleFactor = window.devicePixelRatio;
    const scaledWidth = width * scaleFactor;
    const scaledHeight = height * scaleFactor;
    __classPrivateFieldGet(this, _ScratchCard_canvas, "f").value.width = Math.floor(scaledWidth);
    __classPrivateFieldGet(this, _ScratchCard_canvas, "f").value.height = Math.floor(scaledHeight);
    if (this.coverSrc) {
        const cover = new Image();
        cover.src = this.coverSrc;
        cover.setAttribute("crossOrigin", "");
        cover.onload = () => {
            console.debug(this.preserveAspectRatio);
            const [dWidth, dHeight] = this.preserveAspectRatio
                ? __classPrivateFieldGet(this, _ScratchCard_instances, "m", _ScratchCard_scale).call(this, scaledWidth, scaledHeight, cover.width, cover.height)
                : [cover.width, cover.height];
            const dx = this.centerCover ? (scaledWidth - dWidth) / 2 : 0;
            const dy = this.centerCover ? (scaledHeight - dHeight) / 2 : 0;
            const translateX = (scaledWidth - width) / -2;
            const translateY = (scaledHeight - height) / -2;
            __classPrivateFieldGet(this, _ScratchCard_instances, "a", _ScratchCard_ctx_get).drawImage(cover, dx, dy, dWidth, dHeight);
            __classPrivateFieldGet(this, _ScratchCard_instances, "a", _ScratchCard_ctx_get).save();
            __classPrivateFieldGet(this, _ScratchCard_instances, "a", _ScratchCard_ctx_get).setTransform(-scaleFactor, 0, 0, -scaleFactor, translateX, translateY);
            __classPrivateFieldGet(this, _ScratchCard_instances, "a", _ScratchCard_ctx_get).restore();
            this.slottedElement.style.visibility = "visible";
        };
    }
    else if (this.fillStyle) {
        __classPrivateFieldGet(this, _ScratchCard_instances, "a", _ScratchCard_ctx_get).fillStyle = this.fillStyle;
        __classPrivateFieldGet(this, _ScratchCard_instances, "a", _ScratchCard_ctx_get).rect(0, 0, width, height);
        __classPrivateFieldGet(this, _ScratchCard_instances, "a", _ScratchCard_ctx_get).fill();
        this.slottedElement.style.visibility = "visible";
    }
    else {
        this.clearCard();
    }
}, _ScratchCard_scale = function _ScratchCard_scale(targetWidth, targetHeight, actualWidth, actualHeight) {
    if (!this.silenceWarnings && (targetWidth > actualWidth || targetHeight > actualHeight)) {
        console.warn("The scratch-card cover image is being scaled up");
    }
    const wRatio = targetWidth / actualWidth;
    const hRatio = targetHeight / actualHeight;
    const newW = actualWidth * hRatio;
    if (newW >= targetWidth) {
        return [newW, targetHeight];
    }
    else {
        return [targetWidth, actualHeight * wRatio];
    }
}, _ScratchCard_distanceBetween = function _ScratchCard_distanceBetween(point1, point2) {
    return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}, _ScratchCard_angleBetween = function _ScratchCard_angleBetween(point1, point2) {
    return Math.atan2(point2.x - point1.x, point2.y - point1.y);
}, _ScratchCard_getFilledInPixels = function _ScratchCard_getFilledInPixels(stride) {
    if (!stride || stride < 1) {
        stride = 1;
    }
    const pixels = __classPrivateFieldGet(this, _ScratchCard_instances, "a", _ScratchCard_ctx_get).getImageData(0, 0, __classPrivateFieldGet(this, _ScratchCard_canvas, "f").value.width, __classPrivateFieldGet(this, _ScratchCard_canvas, "f").value.height), pixelsDataLength = pixels.data.length, total = pixelsDataLength / stride;
    let count = 0;
    // Iterate over all pixels
    for (let i = 0; i < pixelsDataLength; i += stride) {
        if (pixels.data[i] === 0) {
            count++;
        }
    }
    return Math.round((count / total) * 100);
}, _ScratchCard_getMouse = function _ScratchCard_getMouse(e) {
    let offsetX = 0, offsetY = 0;
    if (__classPrivateFieldGet(this, _ScratchCard_canvas, "f").value.offsetParent !== undefined) {
        let op = __classPrivateFieldGet(this, _ScratchCard_canvas, "f").value.offsetParent;
        while (op) {
            offsetX += op.offsetLeft;
            offsetY += op.offsetTop;
            op = op.offsetParent;
        }
    }
    const x = "pageX" in e ? e.pageX : e.touches[0].clientX, y = "pageY" in e ? e.pageY : e.touches[0].clientY;
    return {
        x: x - offsetX,
        y: y - offsetY
    };
}, _ScratchCard_handlePercentage = function _ScratchCard_handlePercentage(filledInPixels) {
    filledInPixels = filledInPixels || 0;
    if (filledInPixels >= this.showAllAt) {
        __classPrivateFieldGet(this, _ScratchCard_canvas, "f").value.parentNode.removeChild(__classPrivateFieldGet(this, _ScratchCard_canvas, "f").value);
        __classPrivateFieldGet(this, _ScratchCard_instances, "m", _ScratchCard_dispatchClear).call(this);
        console.debug(`Removed cover at ${filledInPixels}% scratched`);
    }
}, _ScratchCard_onMouseDown = function _ScratchCard_onMouseDown(e) {
    __classPrivateFieldSet(this, _ScratchCard_isDrawing, true, "f");
    __classPrivateFieldSet(this, _ScratchCard_lastPoint, __classPrivateFieldGet(this, _ScratchCard_instances, "m", _ScratchCard_getMouse).call(this, e), "f");
}, _ScratchCard_onMouseMove = function _ScratchCard_onMouseMove(e) {
    if (!__classPrivateFieldGet(this, _ScratchCard_isDrawing, "f")) {
        return;
    }
    e.preventDefault();
    const currentPoint = __classPrivateFieldGet(this, _ScratchCard_instances, "m", _ScratchCard_getMouse).call(this, e), dist = __classPrivateFieldGet(this, _ScratchCard_instances, "m", _ScratchCard_distanceBetween).call(this, __classPrivateFieldGet(this, _ScratchCard_lastPoint, "f"), currentPoint), angle = __classPrivateFieldGet(this, _ScratchCard_instances, "m", _ScratchCard_angleBetween).call(this, __classPrivateFieldGet(this, _ScratchCard_lastPoint, "f"), currentPoint), scaleFactor = window.devicePixelRatio;
    for (let i = 0; i < dist; i++) {
        const w = __classPrivateFieldGet(this, _ScratchCard_brush, "f").width * this.brushScale;
        const h = __classPrivateFieldGet(this, _ScratchCard_brush, "f").height * this.brushScale;
        const x = __classPrivateFieldGet(this, _ScratchCard_lastPoint, "f").x + Math.sin(angle) * i - 25 - (w - __classPrivateFieldGet(this, _ScratchCard_brush, "f").width) / 2;
        const y = __classPrivateFieldGet(this, _ScratchCard_lastPoint, "f").y + Math.cos(angle) * i - 25 - (h - __classPrivateFieldGet(this, _ScratchCard_brush, "f").height) / 2;
        __classPrivateFieldGet(this, _ScratchCard_instances, "a", _ScratchCard_ctx_get).globalCompositeOperation = "destination-out";
        __classPrivateFieldGet(this, _ScratchCard_instances, "a", _ScratchCard_ctx_get).drawImage(__classPrivateFieldGet(this, _ScratchCard_brush, "f"), x * scaleFactor, y * scaleFactor, w, h);
    }
    __classPrivateFieldSet(this, _ScratchCard_lastPoint, currentPoint, "f");
    __classPrivateFieldGet(this, _ScratchCard_instances, "m", _ScratchCard_handlePercentage).call(this, __classPrivateFieldGet(this, _ScratchCard_instances, "m", _ScratchCard_getFilledInPixels).call(this, this.coverSrc ? 32 : 1));
}, _ScratchCard_onMouseUp = function _ScratchCard_onMouseUp() {
    __classPrivateFieldSet(this, _ScratchCard_isDrawing, false, "f");
};
ScratchCard.styles = css `
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
__decorate([
    property({ type: Number })
], ScratchCard.prototype, "brushScale", void 0);
__decorate([
    property({ type: Boolean })
], ScratchCard.prototype, "centerCover", void 0);
__decorate([
    property()
], ScratchCard.prototype, "coverSrc", void 0);
__decorate([
    property()
], ScratchCard.prototype, "fillStyle", void 0);
__decorate([
    property({ type: Boolean })
], ScratchCard.prototype, "preserveAspectRatio", void 0);
__decorate([
    property({ type: Number })
], ScratchCard.prototype, "showAllAt", void 0);
__decorate([
    property({ type: Boolean })
], ScratchCard.prototype, "silenceWarnings", void 0);
ScratchCard = __decorate([
    customElement("scratch-card")
], ScratchCard);
export { ScratchCard };
//# sourceMappingURL=ScratchCard.js.map