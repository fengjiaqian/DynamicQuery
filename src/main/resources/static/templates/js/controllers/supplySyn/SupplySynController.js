/**
 * 调拨单-列表
 */
define(['app', 'directives/biz-Select', 
        'services/CommonService', 
        'services/service',
        'services/SupplySynService',
        ], function (app) {
    app.controller('SupplySynController', ['$http','$scope','$filter', '$rootScope', '$state','SupplySynService','popupWinService','QueryDataService', 'BizSelectService', 'CommonService','pagedataLoading',
        function ($http,$scope,$filter, $rootScope, $state,SupplySynService,popupWinService, QueryDataService, BizSelectService,  CommonService,pagedataLoading) {
            
            $scope.vo = {};
            
            //处理
            $scope.send = function () {
                $scope.query();
            };
            
            $scope.query = function () {
            	pagedataLoading.loading();
            	SupplySynService.send().then(function (response) {
            		pagedataLoading.unloading(); 
                	if (response.success == true) {
	                    popupWinService.show({msg:'同步成功！',isCancleBtnHide:true})
	   	            }else{
	                   bootbox.alert(response.error);
	                }
                });
            
            };
         
        }]);
});