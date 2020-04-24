define(['app', 'services/popup/contentConfiguration/UpdateConfigurationController'], function (app) {

    app.service('UpdateConfigurationService', ['$modal', function ($modal) {

        /**
         * 弹出修改的窗口
         */
        this.popupdate = function (params) {
            var modalInstance = $modal.open({
                templateUrl: 'js/services/popup/contentConfiguration/updateConfigurationTemplate.html',
                controller: 'UpdateConfigurationController',
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


