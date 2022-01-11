# banglejs-2-simple-clock-hands #

draws simple hands for an analog clock on a Bangle.js 2

This module draws some very simple (rectangular) hands for an analog clock running on a [Bangle.js 2](https://www.espruino.com/Bangle.js2).

![](Demo.png)

## Usage ##

Within a clock implementation, the module may be used as follows:

```
let Clockwork = require(...);
Clockwork.windUp({
  hands:require('https://raw.githubusercontent.com/rozek/banglejs-2-simpled-clock-hands/main/ClockHands.js'),
  ...
});
```

## Example ##

The following code shows a complete example for a (still simple) analog clock using this clock face:

```
let Clockwork = require('https://raw.githubusercontent.com/rozek/banglejs-2-simple-clockwork/main/Clockwork.js');

Clockwork.windUp({
  face: require('https://raw.githubusercontent.com/rozek/banglejs-2-four-fold-clock-face/main/ClockFace.js'),
  hands:require('https://raw.githubusercontent.com/rozek/banglejs-2-simple-clock-hands/main/ClockHands.js'),
},{
  Foreground:'#000000', Background:'#FFFFFF', Seconds:'#FF0000'
});
```

`Settings.Seconds` is optional and specifies the color in which the second hand should be drawn - if it is missing, `null` or `undefined`) no second hand will be drawn.

## License ##

[MIT License](LICENSE.md)
