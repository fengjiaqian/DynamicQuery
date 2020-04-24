define(['app', 'services/popup/modifyWarehouseInvertoryRecord/PopupController'], function (app) {

    app.service('ModifyWarehouseInvertoryRecordService', ['$modal', function ($modal) {
        /**
         * 修改仓库库存变更明细
         */
        this.popup = function (params) {

            var modalInstance = $modal.open({
                templateUrl: 'js/services/popup/modifyWarehouseInvertoryRecord/Template.html',
                controller: 'ModifyWarehouseInvertoryRecordController',
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
