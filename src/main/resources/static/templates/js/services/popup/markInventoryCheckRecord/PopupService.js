define(['app', 'services/popup/markInventoryCheckRecord/PopupController'], function (app) {

    app.service('MarkInventoryCheckRecordService', ['$modal', function ($modal) {
        /**
         * 标记库存记录为已处理
         */
        this.popup = function (params) {

            var modalInstance = $modal.open({
                templateUrl: 'js/services/popup/markInventoryCheckRecord/Template.html',
                controller: 'MarkInventoryCheckRecordController',
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
