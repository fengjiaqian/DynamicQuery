define(['app', 'services/popup/contentConfiguration/SynConfigurationController'], function (app) {

    app.service('SynConfigurationService', ['$modal', function ($modal) {

        /**
         * 弹出修改的窗口
         */
        this.popupdate = function (params) {
            var modalInstance = $modal.open({
                templateUrl: 'js/services/popup/contentConfiguration/synConfigurationTemplate.html',
                controller: 'SynConfigurationController',
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


