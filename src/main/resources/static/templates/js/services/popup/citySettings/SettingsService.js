define(['app', 'services/popup/citySettings/SettingsController'], function (app) {

    app.service('SettingsService', ['$modal', function ($modal) {
        /**
         * 弹出切换用户角色的窗口
         */
        this.popup = function (params) {
            var modalInstance = $modal.open({
                templateUrl: 'js/services/popup/citySettings/settingsTemplate.html',
                controller: 'SettingsController',
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
