/**
 * 调拨单-列表
 */
define(['app', 'directives/biz-Select', 
        'services/CommonService', 
        'services/service',
        'services/QuickOrderService',
        ], function (app) {
    app.controller('QuickOrderController', ['$http','$window','$scope','$filter', '$rootScope', '$state','QuickOrderService','popupWinService','QueryDataService', 'BizSelectService', 'CommonService','pagedataLoading',
        function ($http,$window,$scope,$filter, $rootScope, $state,QuickOrderService,popupWinService, QueryDataService, BizSelectService,  CommonService,pagedataLoading) {
            
            $scope.vo = {};
            
            //处理
            $scope.send = function () {
                $scope.query();
            };
            $scope.query = function () {
            	pagedataLoading.loading();
            	QuickOrderService.send($scope.vo).then(function (response) {
            		pagedataLoading.unloading(); 
                	if (response.success == true) {
	                    popupWinService.show({msg:'提交成功！',isCancleBtnHide:true}).result.then(function(param){
	                    	$window.location.reload();
	   	             	});
	   	            }else{
	                   bootbox.alert(response.error);
	                }
                });
            
            };
         
        }]);
});