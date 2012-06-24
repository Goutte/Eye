/*
 ---

 description: Eye following the mouse by moving inside a circular eye socket.
              We assume the eye is initially positioned at the center of the circle.
              Its position must be absolute or relative (we're using top and left)

 authors:
 - Goutte <antoine@goutenoir.com>

 demo:
 - todo

 licence:
 - GPL

 requires:
 - Mootools

 provides:
 - Eye

 ...
 */
var Eye = new Class ({

  Implements: [Options],

  options: {
    socketRadius: 5, // radius of the circle in which the eye can move
    stickToSocket: true, // constraint the eye to the perimeter of the circle
    bindMouseMove: true,
    bindTouchMove: false,
    eventListenerElement: window
  },

  initialize: function (element, options) {
    this.setOptions(options);
    this.element = document.id(element);
    if (-1 == ['relative','absolute'].indexOf(this.element.getStyle('position')))
      throw new Error("Eye must be positioned as absolute or relative.");
    this.coordinates = this.element.getCoordinates();
    this.elementTop  = this.element.getStyle('top').toInt();
    this.elementLeft = this.element.getStyle('left').toInt();

    this.bindEyeMoveEvents();
  },

  bindEyeMoveEvents: function () {
    if (this.options.bindMouseMove) {
      document.id(this.options.eventListenerElement).addEvent('mousemove', function(event){
        this.lookTo(event.page.x, event.page.y);
      }.bind(this));
    }
    if (this.options.bindTouchMove) {
      document.id(this.options.eventListenerElement).addEvent('touchmove', function(event){
        event.preventDefault();
        var touch = event.touches[0];
        this.lookTo(touch.pageX, touch.pageY);
      }.bind(this));
    }
  },

  lookTo: function (x, y) {
    var eyeX = this.coordinates.left + this.coordinates.width / 2;
    var eyeY = this.coordinates.top + this.coordinates.height / 2;

    var newPos = this.normalize(x - eyeX, y - eyeY, this.options.socketRadius);
    newPos.x = newPos.x + this.elementLeft;
    newPos.y = newPos.y + this.elementTop;
    this.element.setPosition(newPos);
  },

  normalize: function (x, y, factor) {
    if (typeof factor == 'undefined' || null == factor) factor = 1;
    var r = {x:x, y:y};
    var norm = Math.sqrt(x*x + y*y);
    if (norm != 0 && (this.options.stickToSocket || norm > factor)) {
      r.x = x * factor / norm;
      r.y = y * factor / norm;
    }
    return r;
  }

});