/**
 * 调拨单-列表
 */
define(['app', 'directives/biz-Select', 
        'services/CommonService', 
        'services/service',
        'services/CitySettingsService',
        'services/popup/citySettings/SettingsService',
        ], function (app) {
    app.controller('CitySettingsController', ['$http','$scope','$filter', '$rootScope', '$state','CitySettingsService','SettingsService','popupWinService','QueryDataService', 'BizSelectService', 'CommonService','pagedataLoading',
        function ($http,$scope,$filter, $rootScope, $state,CitySettingsService,SettingsService,popupWinService, QueryDataService, BizSelectService,  CommonService,pagedataLoading) {
            
            $scope.vo = {};
            $scope.vm = {};
            $scope.cityVo = {};
         
            $scope.vm = {
                    pager: {
                        "currentPage": 1,
                        "pageSize": 20,
                        "recordCount": 0,
                        "totalPage": 1,
                        "offset": 0,
                        "previousPage": 0,
                        'index':1
                    }
            };
            
            //获取登陆用户
            $scope.userInfo=angular.fromJson(localStorage.getItem("userInfo"));
            

           //查询
            $scope.searchClick = function () {
            	$scope.vm.pager.index=1;
                $scope.query();
            };
            
            //重置
            $scope.resetClick = function () {
                $scope.vo = {};
                $scope.cityVo = {};
                $scope.vm.pager.index=1;
                $scope.query();
            };
            
            QueryDataService.initSearchData($scope);//初始化查询数据

            $scope.$on('$viewContentLoaded', function () {
                $scope.query();
            });
            
            $scope.query = function () {
                QueryDataService.storeSearchData($scope);
                $scope.vo.city_Id=$scope.cityVo.cityId?$scope.cityVo.cityId:null;
                $scope.vo.currentPage=$scope.vm.pager.index;
                $scope.vo.pageSize=$scope.vm.pager.pageSize;
                $scope.vm.items={};
                pagedataLoading.loading();
                CitySettingsService.getList($scope.vo).then(function (response) {
            		pagedataLoading.unloading(); 
                    if (response.success == true) {
                        $scope.vm.items = response.data? response.data.dataList:null;
                        $scope.vm.pager.recordCount = response.data? response.data.pager.recordCount:0;
                        $scope.vm.pager.currentPage = response.data? response.data.pager.currentPage:0;
                        $scope.vm.pager.totalPage = response.data? response.data.pager.totalPage:0;
                       
                    }else{
                    	 bootbox.alert(response.error);
                    }
                });
            
            };
            
            
           
          
            //开启/关闭抹零
            $scope.pa={};
            $scope.btnSetting=function(item){
            	if(item.discardState==1){
            		$scope.pa.discardState=2;
            	}else{
            		$scope.pa.discardState=1;
            	}
            	$scope.pa.id=item.id;
            	$scope.pa.operateUser_Id=$scope.userInfo.userId;
            	CitySettingsService.editBtn($scope.pa).then(function(data){
            		  if(data.success==true){
            			  bootbox.alert("修改成功!", function () {
            				  $scope.query();
                          });
            		  }else{
            			  bootbox.alert(data.error);
            		  }
            	})
            	
            }
            //新增
            $scope.addCity=function(){
            	SettingsService.popup().then(function(data){
            		  if(data.success==true){
            			  bootbox.alert("新增成功!", function () {
            				  $scope.query();
                          });
            		  }else{
            			  bootbox.alert(data.error);
            		  }
            	})
            }
            
        }]);
});