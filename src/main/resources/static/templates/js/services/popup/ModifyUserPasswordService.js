define(['app', 'services/popup/ModifyUserPasswordController'], function (app) {

    app.service('ModifyUserPasswordService', ['$modal', function ($modal) {
        /**
         * 弹出切换用户角色的窗口
         */
        this.popup = function (params) {

            var modalInstance = $modal.open({
                templateUrl: 'js/services/popup/ModifyUserPasswordTemplate.html',
                controller: 'ModifyUserPasswordController',
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
