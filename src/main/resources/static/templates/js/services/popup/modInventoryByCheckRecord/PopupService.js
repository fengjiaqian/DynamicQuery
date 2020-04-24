define(['app', 'services/popup/modInventoryByCheckRecord/PopupController'], function (app) {

    app.service('ModInventoryByCheckRecordService', ['$modal', function ($modal) {
        /**
         * 根据库存校正记录变更库存
         */
        this.popup = function (params) {

            var modalInstance = $modal.open({
                templateUrl: 'js/services/popup/modInventoryByCheckRecord/Template.html',
                controller: 'ModInventoryByCheckRecordController',
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
