define(['app', 'services/popup/dynamicSqlQueryConfig/UpdateSqlQueryConfigController'], function (app) {

    app.service('UpdateSqlQueryConfigService', ['$modal', function ($modal) {

        /**
         * 弹出修改的窗口
         */
        this.popupdate = function (params) {
            var modalInstance = $modal.open({
                templateUrl: 'js/services/popup/dynamicSqlQueryConfig/updateSqlQueryConfigTemplate.html',
                controller: 'UpdateSqlQueryConfigController',
                size: 'lg',
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


