/**
 * 调拨单-列表
 */
define(['app', 'directives/biz-Select', 
        'services/CommonService', 
        'services/service',
        'services/MessageService',
        ], function (app) {
    app.controller('OrderProcessingController', ['$http','$scope','$filter', '$rootScope', '$state','MessageService', 'QueryDataService', 'popupWinService','BizSelectService', 'CommonService','pagedataLoading',
        function ($http,$scope,$filter, $rootScope, $state,MessageService, QueryDataService, popupWinService, BizSelectService,  CommonService,pagedataLoading) {
            
            $scope.vo = {};
            $scope.vo.hasReturnOrder=false;
           
            //处理
            $scope.solve = function () {
                $scope.query();
            };
            
            $scope.query = function () {
                MessageService.solve($scope.vo).then(function (response) {
                	if (response.success == true) {
	                    popupWinService.show("处理成功！");
	                }else{
	                	 bootbox.alert(response.error);
	                }
                });
            
            };
            
        }]);
});