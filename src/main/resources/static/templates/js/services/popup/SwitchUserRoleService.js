define(['app', 'services/popup/SwitchUserRoleController'], function (app) {

    app.service('SwitchUserRoleService', ['$modal', function ($modal) {
        /**
         * 弹出切换用户角色的窗口
         */
        this.popup = function (params) {

            var modalInstance = $modal.open({
                templateUrl: 'js/services/popup/SwitchUserRoleTemplate.html',
                controller: 'SwitchUserRoleController',
                size: 'sm',
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
