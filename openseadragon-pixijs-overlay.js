(function() {
  var $ = window.OpenSeadragon;

  if (!$) {
    $ = require('openseadragon');
    if (!$) {
      throw new Error('OpenSeadragon is missing.');
    }
  }

  // ----------
  $.Viewer.prototype.pixiOverlay = function(options) {
    if (this._pixiOverlay) {
      return this._pixiOverlay;
    }

    this._pixiOverlay = new Overlay(this, options);
    return this._pixiOverlay;
  };

  // ----------
  var Overlay = function(viewer, options) {
    var self = this;
    this._viewer = viewer;

    this._containerWidth = 0;
    this._containerHeight = 0;
    this._worldWidth = options.worldWidth | 0;
    this._worldHeight = options.worldHeight | 0;

    this._canvasdiv = document.createElement('div');
    this._canvasdiv.style.position = 'absolute';
    this._canvasdiv.style.left = "0px";
    this._canvasdiv.style.top = "0px";
    this._canvasdiv.style.width = '100%';
    this._canvasdiv.style.height = '100%';
    this._viewer.canvas.appendChild(this._canvasdiv);

    this._app = new PIXI.Application(Object.assign(options || {}, {
      width: viewer.canvas.clientWidth,
      height: viewer.canvas.clientHeight
    }));
    this._canvasdiv.appendChild(this._app.view);

    this._viewport = new PIXI.Viewport({
      screenWidth: viewer.canvas.clientWidth,
      screenHeight: viewer.canvas.clientHeight,
      worldWidth: this._worldWidth,
      worldHeight: this._worldHeight,
    });

    this._app.stage.addChild(this._viewport);

    this._viewer.addHandler('update-viewport', function () {
      self.resize();
      self.updateViewport();
      self.render();
    });

    this._viewer.addHandler('open', function () {
      self.resize();
      self.updateViewport();
    });
    window.addEventListener('resize', function () {
      self.resize();
      self.updateViewport();
    });
  };

  // ----------
  Overlay.prototype = {
    viewport: function() {
      return this._viewport;
    },
    render: function () {
      this._app.render();
    },
    resize: function() {
      let resized = false;

      if (this._containerWidth !== this._viewer.container.clientWidth) {
        this._containerWidth = this._viewer.container.clientWidth;
        this._canvasdiv.setAttribute('width', this._containerWidth);
        resized = true;
      }

      if (this._containerHeight !== this._viewer.container.clientHeight) {
        this._containerHeight = this._viewer.container.clientHeight;
        this._canvasdiv.setAttribute('height', this._containerHeight);
        resized = true;
      }

      if (resized) {
        this._app.renderer.resize(this._containerWidth, this._containerHeight);
      }

      const image = this._viewer.world.getItemAt(0);
      const worldWidth = this._worldWidth || image.source.dimensions.x;
      const worldHeight = this._worldHeight || image.source.dimensions.y;

      this._viewport.resize(
        this._containerWidth, this._containerHeight,
        worldWidth, worldHeight
      );
    },
    updateViewport: function() {
      const image = this._viewer.world.getItemAt(0);
      const viewportZoom = image.viewportToImageZoom(this._viewer.viewport.getZoom(true));
      this._viewport.setZoom(viewportZoom);

      const center = image.viewportToImageCoordinates(this._viewer.viewport.getCenter(true));
      this._viewport.moveCenter(center.x, center.y);
    }
  };
})();