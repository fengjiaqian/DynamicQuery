/**
 * 调拨单-列表
 */
define(['app', 'directives/biz-Select', 
        'services/CommonService', 
        'services/service',
        'services/HandPushDownOrderService',
        ], function (app) {
    app.controller('HandPushDownOrderController', ['$http','$scope','$filter', '$rootScope', '$state','HandPushDownOrderService','popupWinService','QueryDataService', 'BizSelectService', 'CommonService','pagedataLoading',
        function ($http,$scope,$filter, $rootScope, $state,HandPushDownOrderService,popupWinService, QueryDataService, BizSelectService,  CommonService,pagedataLoading) {
            $scope.vo = {};
            $scope.vo.isModify=false;
            $scope.vo.isStockIn=false;
            $scope.vo.isPush=false;
            $scope.vo.isModifyXY=false;
            $scope.vo.isResend=false;
            $scope.vo.isReSetCostPrice=false;
            $scope.vo.isRetryWeizhiSync=false;
            //同步
            $scope.push = function () {
                $scope.query();
            };
            
            $scope.push = function () {
            	pagedataLoading.loading();
            	HandPushDownOrderService.push($scope.vo).then(function (response) {
            		pagedataLoading.unloading(); 
                	if (response.success == true) {
	                    popupWinService.show({msg:'下推成功！',isCancleBtnHide:true}).result.then(function(param){
	                    	 //$scope.cityVo = {};
	   	             	});
	   	            }else{
	                   bootbox.alert(response.error);
	                }
                });
            
            };
         
        }]);
});