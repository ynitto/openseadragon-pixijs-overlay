# OpenSeadragonPixiJSOverlay

An [OpenSeadragon](http://openseadragon.github.io) plugin that adds PixiJS overlay capability.

Compatible with OpenSeadragon 3.1.0 or greater.

## Documentation

To use, include the `openseadragon-pixijs-overlay.js` file after `openseadragon.js` on your web page.

To add PixiJS overlay capability to your OpenSeadragon Viewer, call `pixiOverlay(options)` on it. The argument `options` is a same type of [PIXI.Appication constructor options](https://pixijs.download/release/docs/PIXI.Application.html#constructor). Also, you can set world-coordinate size as `worldWidth` and `worldHeight` properties. If not set, it automatically decide the same size of displaying the first image.

For example:

```javascript
var overlay = this.viewer.pixiOverlay({
    backgroundAlpha: 0
});
 ```

 This will return a new object with the following methods:

* `viewport()`: Gives access to [PIXI.viewport](https://github.com/davidfig/pixi-viewport), to add graphics.
* `resize()`: If your viewer changes size, you'll need to resize the overlay by calling this method.
* `render()`: If you force to render, you'll call this method.


See [online demo](https://ynitto.github.io/openseadragon-pixijs-overlay/demo.html) or demo.html for an example of it in use.

