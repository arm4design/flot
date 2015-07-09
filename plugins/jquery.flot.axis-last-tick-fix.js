/**
 * axis-last-tick-fix
 * 
 * This plugin fixes an original flot.js issue that resizes the chart area
 * because of axes tick calculation.
 * 
 * Further details at https://github.com/flot/flot/issues/1212
 * 
 * @author Armando Soriano
 */
(function($){
    
    function init(plot, classes) {
        
        /*
         * -------------------------------
         * Internal extensions / overrides
         * -------------------------------
         */
        
        var Internal = classes.Internal;
        
        /**
         * Removes a loop block to avoid accidental chart area width changes
         * 
         * Further details at https://github.com/flot/flot/issues/1212
         * 
         * @override
         */
        Internal.prototype.adjustLayoutForThingsStickingOut = function() {
            // possibly adjust plot offset to ensure everything stays
            // inside the canvas and isn't clipped off

            var minMargin = plot.getOptions().grid.minBorderMargin,
                series = plot.getData(), plotOffset = plot.getPlotOffset(),
                axis, i;

            // check stuff from the plot (FIXME: this should just read
            // a value from the series, otherwise it's impossible to
            // customize)
            if (minMargin == null) {
                minMargin = 0;
                for (i = 0; i < series.length; ++i)
                    minMargin = Math.max(minMargin, 2 * (series[i].points.radius + series[i].points.lineWidth/2));
            }

            var margins = {
                left: minMargin,
                right: minMargin,
                top: minMargin,
                bottom: minMargin
            };

            plotOffset.left = Math.ceil(Math.max(margins.left, plotOffset.left));
            plotOffset.right = Math.ceil(Math.max(margins.right, plotOffset.right));
            plotOffset.top = Math.ceil(Math.max(margins.top, plotOffset.top));
            plotOffset.bottom = Math.ceil(Math.max(margins.bottom, plotOffset.bottom));
        };
        
    };
    
    // inserts the plugin 
    $.plot.plugins.push({
        init: init,
        options: {},
        name: 'axis-last-tick-fix',
        version: '1.0'
    });
    
})(jQuery);