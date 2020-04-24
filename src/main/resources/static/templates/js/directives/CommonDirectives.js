define(['app'], function (app) {

    /**
     * 防止重复提交
     */
    app.directive('ejpNoMoreSubmit', ['$interval', function ($interval) {
        var tmpDire = {
            restrict: 'A',
            link: LinkFn
        };

        function LinkFn(mScope, mElement, mAttrs) {
            mElement.bind('click', function (event) {
                mElement[0].disabled = true;
                $interval(function () {
                    mElement[0].disabled = false;
                }, 3000);
            })
        }

        return tmpDire;
    }]);


});