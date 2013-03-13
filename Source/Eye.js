/*
---

description: |
             Eye following the mouse by moving inside a circular eye socket.
             We assume the eye is initially positioned at the center of the circle.
             Its position must be absolute or relative (we're using top and left)
             Specifically, this class provides the behavior of a Pupil.

authors:
- Goutte <antoine@goutenoir.com>

demo:
- http://jsfiddle.net/goutte/B2Nza

licence:
- mathematics

requires:
- core/1.4.5:Class
- core/1.4.5:Element
- core/1.4.5:Array
- core/1.4.5:Options
- core/1.4.5:Events

provides:
- Eye

...
*/
var Eye = new Class ({

  Implements: [Options],

  options: {
    socketRadius: 5, // radius of the circle in which the eye can move
    stickToSocket: true, // constraint the eye to the perimeter of the circle
    behavior:     'follow', // or 'flee', constrained to the eye socket
    bindResize:    true, // re-setups the spatial context of the eye on resize
    bindMouseMove: true,
    bindTouchMove: false, // should this be true by default ?
    eventListenerElement: window
  },

  initialize: function (element, options) {
    if (options.eventListenerElement) options.eventListenerElement = document.id(options.eventListenerElement);
    this.setOptions(options);
    this.element = document.id(element);

    if (-1 == ['relative','absolute'].indexOf(this.element.getStyle('position')))
      throw new Error("Eye must be positioned as absolute or relative.");

    this.setupSpatialContext();

    this.bindEyeMoveEvents();
    this.bindResizeEvent();
  },

  setupSpatialContext: function () {
    this.coordinates = this.element.getCoordinates();
    this.elementTop  = this.element.getStyle('top').toInt();
    this.elementLeft = this.element.getStyle('left').toInt();
  },

  bindEyeMoveEvents: function () {
    if (this.options.bindMouseMove) {
      this.options.eventListenerElement.addEvent('mousemove', function(event){
        this.reactToEventPosition(event.page.x, event.page.y);
      }.bind(this));
    }
    if (this.options.bindTouchMove) {
      this.options.eventListenerElement.addEvent('touchmove', function(event){
        event.preventDefault();
        var touch = event.touches[0];
        this.reactToEventPosition(touch.pageX, touch.pageY);
      }.bind(this));
    }
  },

  bindResizeEvent: function () {
    if (this.options.bindResize) {
      this.options.eventListenerElement.addEvent('resize', function(event){
        this.setupSpatialContext();
      }.bind(this));
    }
  },

  /**
   * Makes the element react to the coords specified according to configuration
   * while restraining itself in a circle of radius `options.socketRadius`
   *
   * @param x
   * @param y
   */
  reactToEventPosition: function (x, y) {
    switch (this.options.behavior) {
      case 'flee':
        this.lookAway(x, y);
        break;
      case 'follow':
      default:
        this.lookAt(x, y);
    }
  },

  /**
   * Makes the element move in the direction of the coords specified
   * while restraining itself in a circle of radius `options.socketRadius`
   *
   * @param x
   * @param y
   * @param factor
   */
  lookAt: function (x, y, factor) {
    if (typeof factor == 'undefined' || null == factor) factor = 1;
    var eyeX = this.coordinates.left + this.coordinates.width / 2;
    var eyeY = this.coordinates.top + this.coordinates.height / 2;

    var newPos = this.normalize(x - eyeX, y - eyeY, this.options.socketRadius * factor);
    newPos.x = newPos.x + this.elementLeft;
    newPos.y = newPos.y + this.elementTop;
    this.element.setPosition(newPos);
  },

  /**
   * Makes the element move in the *opposite* direction of the coords specified
   * while restraining itself in a circle of radius `options.socketRadius`
   *
   * @param x
   * @param y
   */
  lookAway: function (x, y) {
    this.lookAt(x, y, -1);
  },

  normalize: function (x, y, factor) {
    if (typeof factor == 'undefined' || null == factor) factor = 1;
    var r = {x:x, y:y};
    var norm = Math.sqrt(x*x + y*y);
    if (norm != 0 && (this.options.stickToSocket || norm > Math.abs(factor))) {
      r.x = x * factor / norm;
      r.y = y * factor / norm;
    }
    return r;
  }

});