define(['app', 'services/popup/authorization/AuthorizationController'], function (app) {

    app.service('AuthorizationService', ['$modal', function ($modal) {
        /**
         * 新增授权
         */
        this.popup = function (params) {
            var modalInstance = $modal.open({
                templateUrl: 'js/services/popup/authorization/authorizationTemplate.html',
                controller: 'AuthorizationController',
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
