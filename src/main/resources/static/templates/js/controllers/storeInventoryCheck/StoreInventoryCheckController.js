/**
 * 调拨单-列表
 */
define(['app', 'directives/biz-Select', 
        'services/CommonService', 
        'services/service',
        'services/StoreInventoryCheckServcie',
        ], function (app) {
    app.controller('StoreInventoryCheckController', ['$http','$scope','$filter', '$rootScope', '$state','StoreInventoryCheckServcie','popupWinService','QueryDataService', 'BizSelectService', 'CommonService','pagedataLoading',
        function ($http,$scope,$filter, $rootScope, $state,StoreInventoryCheckServcie,popupWinService, QueryDataService, BizSelectService,  CommonService,pagedataLoading) {
            
            $scope.vo = {};
            $scope.cityVo = {};
         
            
            //处理
            $scope.send = function () {
                $scope.query();
            };
            
            $scope.query = function () {
            	//  if(!$scope.cityVo.cityId){
        	    // 	 bootbox.alert('请先选择城市!');
        	    // 	 return;
        	    // }
            	$scope.city_Id=$scope.cityVo.cityId?$scope.cityVo.cityId:-1;
            	pagedataLoading.loading();
            	StoreInventoryCheckServcie.send($scope.city_Id).then(function (response) {
            		pagedataLoading.unloading(); 
                	if (response.success == true) {
	                    popupWinService.show({msg:'校正成功！',isCancleBtnHide:true}).result.then(function(param){
	                    	 $scope.cityVo = {};
	   	             	});
	   	            }else{
	                   bootbox.alert(response.error);
	                }
                });
            
            };

        }]);
});