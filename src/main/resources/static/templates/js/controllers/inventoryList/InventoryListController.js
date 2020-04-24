/**
 * 调拨单-列表
 */
define(['app', 'directives/biz-Select', 
        'services/CommonService', 
        'services/service',
        'services/WarehouseInventoryService',
        'services/popup/modifyWarehouseInvertory/PopupService',
        'services/popup/transferInventory/PopupService',
        ], function (app) {
    app.controller('InventoryListController', ['$http','$scope','$filter', '$rootScope', '$state','ModifyWarehouseInvertoryService','TransferInventoryService','WarehouseInventoryService','popupWinService','QueryDataService', 'BizSelectService', 'CommonService','ExcelFileDownLoad','pagedataLoading',
        function ($http,$scope,$filter, $rootScope, $state,ModifyWarehouseInvertoryService,TransferInventoryService,WarehouseInventoryService,popupWinService, QueryDataService, BizSelectService,  CommonService, ExcelFileDownLoad, pagedataLoading) {
            
            $scope.vo = {};
            $scope.vm = {};
            $scope.cityVo = {};
            $scope.vo.state = 0;

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
                $scope.vm.pager.index=1;
                $scope.query();
            };

            // $scope.$on('$viewContentLoaded', function () {
            //     $scope.query();
            // });
            
            QueryDataService.initSearchData($scope);// 初始化数据
            $scope.query = function () {
                $scope.vo.cityId=$scope.cityVo.cityId?$scope.cityVo.cityId:null;
                $scope.vo.pageNum=$scope.vm.pager.index;
                $scope.vo.pageSize=$scope.vm.pager.pageSize;
                $scope.vm.items={};
                pagedataLoading.loading();
                WarehouseInventoryService.getList($scope.vo).then(function (response) {
            		pagedataLoading.unloading(); 
                    if (response.success == true) {
                        $scope.vm.items = response.data? response.data.dataList:null;
                        $scope.vm.pager.recordCount = response.data? response.data.pager.recordCount:0;
                        $scope.vm.pager.currentPage = response.data? response.data.pager.currentPage:0;
                        $scope.vm.pager.totalPage = response.data? response.data.pager.totalPage:0;
                    }else{
                    	 bootbox.alert(response.exception);
                    }
                });
            
            };
            
            //编辑库存
            $scope.editSkuStock=function(item,type){
            	if(type===0){
            		if(!item.warehouseId){
               		 bootbox.alert("找不到仓库Id!")
               				 return;
               	   }
            	}else{
            		//新增仓库
            		item.type=type
            	}
            	ModifyWarehouseInvertoryService.popup(item).then(function(data){
            		  if(data.success==true){
            				  $scope.query();
            		  }else{
            			  bootbox.alert(data.error);
            		  }
            	})
            }
            
            //转移库存
            $scope.transferInventory=function(item){
            	TransferInventoryService.popup(item).then(function(data){
            		  if(data.success==true){
            				 $scope.query();
            		  }else{
            			  bootbox.alert(data.error);
            		  }
            	})
            }

            /**
             * 导出excel表格
             */
            $scope.exportExcel = function () {
                $scope.vo.cityId=$scope.cityVo.cityId?$scope.cityVo.cityId:null;
                if(!$scope.vo.cityId){
                    bootbox.alert('请选择城市！');
                    return false;
                }
                $scope.vo.pageNum=1;
                $scope.vo.pageSize=$scope.vm.pager.recordCount;
                ExcelFileDownLoad.downLoad("/templates/inventoryListReport/downloadExcel",$scope.vo,"仓库库存报表");
            };
          
        }]);
});