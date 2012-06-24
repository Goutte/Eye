Eye
===

![Logo](http://github.com/Goutte/Eye/raw/master/Docs/Eye.jpg)


Make the pupil of an eye follow the mouse.
The eye is following the mouse by moving inside a circular eye socket.
We assume the eye is initially positioned at the center of the circle.
Its position must be absolute or relative. (we're using top and left)



How to use
----------

HTML

``` html
<div id="face">
  <div id="left_eye"  class="left_eye"></div>
  <div id="right_eye" class="right_eye"></div>
</div>
```


CSS

``` css
.face {
    position: relative;
    margin: 30px auto;
    width:  49px;
    height: 41px;
    background: url(https://github.com/Goutte/Eye/raw/master/Demo/assets/img/head.png) no-repeat;
}

.left_eye {
    position: absolute;
    left: 11px;
    top:  13px;
    width:  3px;
    height: 3px;
    background: url(https://github.com/Goutte/Eye/raw/master/Demo/assets/img/leftPupil.png) no-repeat;
}

.right_eye {
    position: absolute;
    left: 36px;
    top:  13px;
    width:  3px;
    height: 4px;
    background: url(https://github.com/Goutte/Eye/raw/master/Demo/assets/img/rightPupil.png) no-repeat;
}
```


JAVASCRIPT

``` javascript
var options = {
  socketRadius: 4, // radius of the circle in which the eye's pupil can move
  stickToSocket: false, // constraint the eye to the perimeter of the circle
  bindMouseMove: true,
  bindTouchMove: false,
}

var leftEye  = new Eye ('left_eye', options);
var rightEye  = new Eye ('right_eye', options);
```



Demo
----

http://jsfiddle.net/goutte/B2Nza


