define(['app', 'services/popup/dynamicSqlQueryConfig/AddSqlQueryConfigController'], function (app) {

    app.service('AddSqlQueryConfigService', ['$modal', function ($modal) {
        /**
         * 弹出增加的窗口
         */
        this.popup = function (params) {
            var modalInstance = $modal.open({
                templateUrl: 'js/services/popup/dynamicSqlQueryConfig/addSqlQueryConfigTemplate.html',
                controller: 'AddSqlQueryConfigController',
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


