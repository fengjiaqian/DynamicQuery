/**
 * 调拨单-列表
 */
define(['app', 'directives/biz-Select', 
        'services/CommonService', 
        'services/service',
        'services/AddressHandlingService',
        ], function (app) {
    app.controller('AddressHandlingController', ['$http','$scope','$filter', '$rootScope', '$state','AddressHandlingService','popupWinService','QueryDataService', 'BizSelectService', 'CommonService','pagedataLoading',
        function ($http,$scope,$filter, $rootScope, $state,AddressHandlingService,popupWinService, QueryDataService, BizSelectService,  CommonService,pagedataLoading) {
            
            $scope.vo = {};
            $scope.cityVo = {};
         
            
            //处理
            $scope.send = function () {
                $scope.query();
            };
            
            $scope.query = function () {
            	$scope.city_Id=$scope.cityVo.cityId?$scope.cityVo.cityId:-1;
            	pagedataLoading.loading();
            	AddressHandlingService.send($scope.city_Id).then(function (response) {
            		pagedataLoading.unloading(); 
                	if (response.success == true) {
	                    popupWinService.show({msg:'提交成功！',isCancleBtnHide:true}).result.then(function(param){
	                    	 $scope.cityVo = {};
	   	             	});
	   	            }else{
	                   bootbox.alert(response.error);
	                }
                });
            
            };
         
        }]);
});