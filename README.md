# Flot [![Build status](https://travis-ci.org/flot/flot.png)](https://travis-ci.org/flot/flot)

## Why this fork? ##

Flot is pretty extensible via plugins but some logics from its core
could block the developer to include new features or even modify
the default features (like "autoHighlight") so this fork redefines
the flot.js core as the (static) Internal prototype, allowing the 
developer to modify / extend the core easily. This fork blocks any
extension or modification from the runtime as well.
In resume, more secure and versatile code for this useful plugin.

Check the original project at <https://github.com/flot/flot>

Visit the original website at <http://www.flotcharts.org/>

API at [API reference](API.md)

## When to use the Internal prototype ##

Easy, anytime you don't want to fork and change the flot.js code. Using
the Internal prototype allows you to include those changes without creating
your own fork.

## Why use the Internal prototype (again) ##

Most of the modifications you would like to include in flot.js could be done
using the traditional plugins approach, but in several cases you will be
overriding default features which means to deploy the original feature and
after that, deploy the plugin feature. Using Internal you will get your Flot
implementation much lighter.

## Code encapsulation and security considerations ##

It's true that using the Internal prototype, it can be accessed in runtime
since Plot instance contains an Internal instance. Don't be worried about
possible hacks in runtime cause those instances are inmutables once are
instantiated.

## Installation ##

Just include the Javascript file after you've included jQuery.

Generally, all browsers that support the HTML5 canvas tag are
supported.

For support for Internet Explorer < 9, you can use [Excanvas]
[excanvas], a canvas emulator; this is used in the examples bundled
with Flot. You just include the excanvas script like this:

```html
<!--[if lte IE 8]><script language="javascript" type="text/javascript" src="excanvas.min.js"></script><![endif]-->
```

If it's not working on your development IE 6.0, check that it has
support for VML which Excanvas is relying on. It appears that some
stripped down versions used for test environments on virtual machines
lack the VML support.

You can also try using [Flashcanvas][flashcanvas], which uses Flash to
do the emulation. Although Flash can be a bit slower to load than VML,
if you've got a lot of points, the Flash version can be much faster
overall. Flot contains some wrapper code for activating Excanvas which
Flashcanvas is compatible with.

You need at least jQuery 1.2.6, but try at least 1.3.2 for interactive
charts because of performance improvements in event handling.


## Basic usage ##

Create a placeholder div to put the graph in:

```html
<div id="placeholder"></div>
```

You need to set the width and height of this div, otherwise the plot
library doesn't know how to scale the graph. You can do it inline like
this:

```html
<div id="placeholder" style="width:600px;height:300px"></div>
```

You can also do it with an external stylesheet. Make sure that the
placeholder isn't within something with a display:none CSS property -
in that case, Flot has trouble measuring label dimensions which
results in garbled looks and might have trouble measuring the
placeholder dimensions which is fatal (it'll throw an exception).

Then when the div is ready in the DOM, which is usually on document
ready, run the plot function:

```js
$.plot($("#placeholder"), data, options);
```

Here, data is an array of data series and options is an object with
settings if you want to customize the plot. Take a look at the
examples for some ideas of what to put in or look at the 
[API reference](API.md). Here's a quick example that'll draw a line 
from (0, 0) to (1, 1):

```js
$.plot($("#placeholder"), [ [[0, 0], [1, 1]] ], { yaxis: { max: 1 } });
```

The plot function immediately draws the chart and then returns a plot
object with a couple of methods.

[excanvas]: http://code.google.com/p/explorercanvas/
[flashcanvas]: http://code.google.com/p/flashcanvas/
