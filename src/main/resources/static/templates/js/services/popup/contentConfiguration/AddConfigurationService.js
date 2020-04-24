define(['app', 'services/popup/contentConfiguration/AddConfigurationController'], function (app) {

    app.service('ConfigurationSettingsService', ['$modal', function ($modal) {
        /**
         * 弹出增加的窗口
         */
        this.popup = function (params) {
            var modalInstance = $modal.open({
                templateUrl: 'js/services/popup/contentConfiguration/addConfigurationTemplate.html',
                controller: 'AddConfigurationController',
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


