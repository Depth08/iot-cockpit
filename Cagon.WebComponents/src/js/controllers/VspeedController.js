/**
 * Created by Rafael on 26/03/2017.
 */

(function() {
    angular
        .module('EzacOgnWebApp')
        .controller('VspeedController', function() {
            this.value = 0;

            this.getDegrees = function() {
                return "rotate(" + (this.value * 8.6) + "deg)";
            };

            this.add = function(val) {
                this.value += val;
            };

            this.subtract = function(val) {
                this.value -= val;
            };
        });
})();