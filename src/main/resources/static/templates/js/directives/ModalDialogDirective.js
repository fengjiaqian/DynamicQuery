/**
 * Created by Lifeng on 2016/5/4.
 */
define(['app'], function (app) {

    app.directive('modalDialog', [function () {
        return {
            restrict: "E",
            transclude: true,
            templateUrl: "assets/js/directive/tpl/modal_dialog.html"
        };
    }]);

});