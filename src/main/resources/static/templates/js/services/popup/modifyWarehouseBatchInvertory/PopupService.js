define(['app', 'services/popup/modifyWarehouseBatchInvertory/PopupController'], function (app) {

    app.service('ModifyWarehouseBatchInvertoryService', ['$modal', function ($modal) {
        /**
         * 修改货位库存
         */
        this.popup = function (params) {

            var modalInstance = $modal.open({
                templateUrl: 'js/services/popup/modifyWarehouseBatchInvertory/Template.html',
                controller: 'ModifyWarehouseBatchInvertoryController',
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
