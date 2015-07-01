## Writing plugins ##

This fork allows you to still using the same structure for plugins,
as well as using old plugins. The main difference is that you can
extend or modify the Internal prototype, which is passed as the
second argument in plugin's init function.

Check the original PLUGINS.md at <https://github.com/flot/flot/blob/master/PLUGINS.md>

## Extending the core ##

You can extend the Internal prototype doing

```js
/**
  * myCoolPlugin
  */
function myCoolPluginInit(plot, classes) {
    // classes argument contains Canvas and Internal
    var Internal = classes.Internal;
    Internal.prototype.extension = function(arg) {
        console.log("extension called with " + arg);
    };
    // in order to execute such method, use the "internal" instance in plot object
    plot.internal.extension("argument");
};

```

That plugin will print "extension called with argument" in your console.

## Overriding a core method ##

Say you need to execute the method above when highlighting a point (uh? why not? ;)),
in such case you can do as follows

```js
/**
  * myCoolPlugin
  */
function myCoolPluginInit(plot, classes) {
    // classes argument contains Canvas and Internal
    var Internal = classes.Internal;
    Internal.prototype.extension = function(arg) {
        console.log("extension called with " + arg);
    };
    // overrides the original method
    Internal.prototype.drawPointHighlight = function(series, point) {
        // the lines below are the original ones
        var x = point[0], y = point[1],
            axisx = series.xaxis, axisy = series.yaxis,
            highlightColor = (typeof series.highlightColor === "string") ? series.highlightColor :             $.color.parse(series.color).scale('a', 0.5).toString();

        if (x < axisx.min || x > axisx.max || y < axisy.min || y > axisy.max)
            return;
        
        var pointRadius = series.points.radius + series.points.lineWidth / 2;
        octx.lineWidth = pointRadius;
        octx.strokeStyle = highlightColor;
        var radius = 1.5 * pointRadius;
        x = axisx.p2c(x);
        y = axisy.p2c(y);

        octx.beginPath();
        if (series.points.symbol == "circle")
            octx.arc(x, y, radius, 0, 2 * Math.PI, false);
        else
            series.points.symbol(octx, x, y, radius, false);
        octx.closePath();
        octx.stroke();
        // and here we execute the new method
        this.extension("argument");
    };
    
};

```

You can use "this" keyword since you're already inside the instance.

You could also face some compatibility issue writting any other plugin
and need to add something to the .extension method. In such case do

```js
/**
  * myReallyCoolPlugin
  */
function myReallyCoolPluginInit(plot, classes) {
    // classes argument contains Canvas and Internal
    var Internal = classes.Internal;
    Internal.prototype.extension = function(arg) {
        if (arg)
            console.log("extension called with " + arg);
        else
            console.log("extension called without argument");
    };
    // ...
};

```

So, anytime the "myReallyCoolPlugin" is loaded after "myCoolPlugin" the
.extension method will be checking for passed argument.

This means: JUST TAKE CARE OF THE PLUGINS IMPLEMENTATION ORDER.

## When to use the Internal prototype ##

Easy, anytime you don't want to fork and change the flot.js code. Using
the Internal prototype allows you to include those changes without creating
your own fork.

## Why use the Internal prototype ##

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
