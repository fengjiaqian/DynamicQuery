/**
 * 调拨单-列表
 */
define(['app', 'directives/biz-Select', 
        'services/CommonService', 
        'services/service',
        'services/DataInitService',
        ], function (app) {
    app.controller('DataInitController', ['$http','$scope','$filter', '$rootScope', '$state','DataInitService','popupWinService','QueryDataService', 'BizSelectService', 'CommonService','pagedataLoading',
        function ($http,$scope,$filter, $rootScope, $state,DataInitService,popupWinService, QueryDataService, BizSelectService,  CommonService,pagedataLoading) {
            
            $scope.vo = {};
            $scope.cityVo = {};
         
            
            //处理
            $scope.send = function () {
            	$scope.vo.cityId=$scope.cityVo.cityId?$scope.cityVo.cityId:null;
            	if(!$scope.vo.startTime || !$scope.vo.startTime){
            	     popupWinService.show({msg:'起始时间不能为空！'})
            	     return;
            	}
                $scope.query();
            };
            
            $scope.query = function () {
            	pagedataLoading.loading();
            	DataInitService.send($scope.vo).then(function (response) {
            		pagedataLoading.unloading(); 
                	if (response.success == true) {
	                    popupWinService.show({msg:'提交成功！',isCancleBtnHide:true})
	   	            }else{
	                   bootbox.alert(response.error);
	                }
                });
            
            };
         
        }]);
});