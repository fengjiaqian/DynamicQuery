define(['app', 'services/popup/inStockConfig/AddInStockController',], function (app) {

    app.service('AddInStockService', ['$modal', function ($modal) {
                /**
                 * 弹出增加的窗口
                 */
                this.popup = function (params) {
                    var modalInstance = $modal.open({
                        templateUrl: 'js/services/popup/inStockConfig/systemConfig.html',
                        controller: 'AddInStockController',
                        size: 'lg',
                        backdrop:true,
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

