/**
 * Created by Rafael on 24/03/2017.
 */
(function() {
    angular
        .module('EzacOgnWebApp')
        .directive('touchEnd', function() {
            return {
                restrict: 'A',
                link: function($scope, $elm, $attributes) {
                    $elm.bind('touchend', function(event) {
                        event.preventDefault();

                        $elm.removeClass('pressed');

                        $scope.$apply(function() {
                            $scope.$eval($attributes.touchEnd);
                        });
                    });
                }
            };
        });
})();