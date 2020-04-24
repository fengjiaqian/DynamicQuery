define(['app', 'services/popup/modifyWarehouseInvertory/PopupController'], function (app) {

    app.service('ModifyWarehouseInvertoryService', ['$modal', function ($modal) {
        /**
         * 修改库存
         */
        this.popup = function (params) {

            var modalInstance = $modal.open({
                templateUrl: 'js/services/popup/modifyWarehouseInvertory/Template.html',
                controller: 'ModifyWarehouseInvertoryController',
                size: 'lg',
                resolve: {
                    args: function () {
                        return angular.copy(params);
                    }
                }
            });

            return modalInstance.result;
        };
    }]);

});
