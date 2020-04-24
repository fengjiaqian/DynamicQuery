/**
 * 调拨单-列表
 */
define(['app', 'directives/biz-Select', 
        'services/CommonService', 
        'services/service',
        'services/WarehouseInfoSynService',
        ], function (app) {
    app.controller('WarehouseInfoSynController', ['$http','$scope','$filter', '$rootScope', '$state','WarehouseInfoSynService','popupWinService','QueryDataService', 'BizSelectService', 'CommonService','pagedataLoading',
        function ($http,$scope,$filter, $rootScope, $state,WarehouseInfoSynService,popupWinService, QueryDataService, BizSelectService,  CommonService,pagedataLoading) {
            
            $scope.vo = {};
            
            //同步
            $scope.syn = function () {
                $scope.query();
            };
            
            $scope.query = function () {
            	pagedataLoading.loading();
            	WarehouseInfoSynService.syn().then(function (response) {
            		pagedataLoading.unloading(); 
                	if (response.success == true) {
	                    popupWinService.show({msg:'同步成功！',isCancleBtnHide:true}).result.then(function(param){
	                    	 //$scope.cityVo = {};
	   	             	});
	   	            }else{
	                   bootbox.alert(response.error);
	                }
                });
            
            };
         
        }]);
});