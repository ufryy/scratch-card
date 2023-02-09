# Scratch card <!-- omit in toc -->

[![image](https://img.shields.io/npm/l/scratch-card-web-component)](https://github.com/ufryy/scratch-card/blob/main/LICENSE) [![npm](https://img.shields.io/npm/dy/scratch-card-web-component)](https://www.npmjs.com/package/scratch-card-web-component)

A scratch card wrapped in a web component, inspired by the <a href="https://codepen.io/Totati/pen/pPXrJV" target="_blank">CodePen made by Totati</a> and written with <a href="https://lit.dev/" target="_blank">Lit</a> and TypeScript.

## Table of Contents <!-- omit in toc -->

- [Demo](#demo)
- [Installation](#installation)
- [Usage](#usage)
  - [Properties](#properties)
  - [CSS properties](#css-properties)
- [Known issues](#known-issues)
- [License](#license)

## Demo

You can see the scratch card in action [here](https://ufryy.github.io/scratch-card/) with explicit config details.

## Installation

```bash
# npm
npm install scratch-card-web-component

# yarn
yarn add scratch-card-web-component

# pnpm
pnpm add scratch-card-web-component
```

## Usage

The scratch card can be imported and used in an HTML page in this way:

```html
<script type="module">
    import "scratch-card-web-component"
</script>

<div id="app">
    <scratch-card fillColor="salmon">
        <span>Ciao!</span>
    </scratch-card>
</div>
```

The scratch card sets its dimensions to **100% width and height of its parent**.

You *should not* create a scratch card via JavaScript/TypeScript, but there you can access and modify its attributes:

```typescript
import type { ScratchCard } from "scratch-card-web-component";

const scratchCard = document.querySelector("scratch-card") as ScratchCard;
scratchCard.fillColor = "rebeccapurple";
```

### Properties

Note that the boolean properties are false when they are missing from the html ([Lit docs](https://lit.dev/docs/components/properties/#boolean-attributes)).

- `brushScale`: number (default `1`), scales up (> 1) or down (< 1) the size of the uncovered area with a single scratch.
- `centerCover`: boolean (default `false`), if true, the cover image is centered in the scratching area.
- `coverSrc`: string or undefined (default `undefined`), URL path (relative or absolute) of the image to be used as cover to scratch. If undefined, then the scratch area will be filled with a rectangle with style specified by the `fillColor` property.
- `fillColor`: string (default `white`), specifies the color to use to fill the scratch area if a `coverSrc` is not provided. If this is an invalid value while the `coverSrc` is missing, the scratch card will show as already scratched.
- `preserveAspectRatio`: boolean (default `false`), whether to scale or not the cover to avoid leaving empty spaces in the scratch area. This can happen when the scratch area and the cover image have not the same aspect ratio.
- `showAllAt`: number (default `100`), percentage threshold to consider the card as fully scratched. For instance, if `showAllAt="80"` the content will be entirely revealed when the 80% of the card's surface is scratched.
- `silenceWarnings`: boolean (default `false`), whether to stop emitting or not warnings to the browser console, such as `"The image is being scaled up"`.

### CSS properties

You can customize some styling of the scratch card via these CSS properties:

- `--scratch-card-bg-fallback` (default `transparent`): background to show while the canvas image is still loading (use to avoid [FUOC effect](https://en.wikipedia.org/wiki/Flash_of_unstyled_content)).
- `--scratch-card-border-radius` (default `0`): applies a border-radius to the scratch card.
- `--scratch-card-cursor` (default `default`): applies a custom cursor when scratching the card.

You can set a CSS property directly on one of the scratch-card's parent elements.

## Known issues

On Android the scratch card does not behave as expected.

## License

[MIT](https://github.com/ufryy/scratch-card/blob/main/LICENSE)
