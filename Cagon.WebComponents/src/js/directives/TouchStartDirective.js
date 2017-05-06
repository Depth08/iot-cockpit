/**
 * Created by Rafael on 24/03/2017.
 */

(function() {
    angular
        .module('EzacOgnWebApp')
        .directive('touchStart', function() {
            return {
                restrict: 'A',
                link: function($scope, $elm, $attributes) {
                    $elm.bind('touchstart', function(event) {
                        event.preventDefault();

                        $elm.addClass('pressed');

                        $scope.$apply(function() {
                            $scope.$eval($attributes.touchStart);
                        });
                    });
                }
            };
        });
})();