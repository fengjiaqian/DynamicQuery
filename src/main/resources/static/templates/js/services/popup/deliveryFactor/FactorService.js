define(['app', 'services/popup/deliveryFactor/FactorController'], function (app) {

    app.service('FactorService', ['$modal', function ($modal) {
        /**
         * 弹出切换用户角色的窗口
         */
        this.popup = function (params) {
            var modalInstance = $modal.open({
                templateUrl: 'js/services/popup/deliveryFactor/factorTemplate.html',
                controller: 'FactorController',
                size: 'md',
                resolve: {
                    args: function () {
                        return params;
                    }
                }
            });

            return modalInstance.result;
        };
    }]);
});
