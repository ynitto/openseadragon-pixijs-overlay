# OpenSeadragonPixiJSOverlay

An [OpenSeadragon](http://openseadragon.github.io) plugin that adds PixiJS overlay capability.

Compatible with OpenSeadragon 2.2.0 or greater.

## Documentation

To use, include the `openseadragon-pixijs-overlay.js` file after `openseadragon.js` on your web page.

To add PixiJS overlay capability to your OpenSeadragon Viewer, call `pixiOverlay(options)` on it. The argument `options` is same type of [PIXI.Appication constructor options](https://pixijs.download/release/docs/PIXI.Application.html#constructor).

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


See [online demo](http://ynitto.github.io/openseadragon-pixijs-overlay/demo.html) or demo.html for an example of it in use.

