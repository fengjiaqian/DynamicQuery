define(['app', 'services/popup/transferInventory/PopupController'], function (app) {

    app.service('TransferInventoryService', ['$modal', function ($modal) {
        /**
         * 修改库存
         */
        this.popup = function (params) {

            var modalInstance = $modal.open({
                templateUrl: 'js/services/popup/transferInventory/Template.html',
                controller: 'TransferInventoryController',
                size: 'md',
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
