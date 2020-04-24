/**
 * 调拨单-列表
 */
define(['app', 'directives/biz-Select', 
        'services/CommonService', 
        'services/service',
        'services/MessageService',
        ], function (app) {
    app.controller('ExceptionMessageController', ['$http','$scope','$filter', '$rootScope', '$state','MessageService','popupWinService','QueryDataService', 'BizSelectService', 'CommonService','ExcelFileDownLoad','pagedataLoading',
        function ($http,$scope,$filter, $rootScope, $state,MessageService,popupWinService, QueryDataService, BizSelectService,  CommonService,ExcelFileDownLoad,pagedataLoading) {
            
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
                $scope.cityVo = {};
                $scope.vm.pager.index=1;
                $scope.query();
            };

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
                MessageService.getMessageList($scope.vo).then(function (response) {
            		pagedataLoading.unloading(); 
                    if (response.success == true) {
                        $scope.vm.items = response.data? response.data.dataList:null;
                       /* angular.forEach($scope.vm.items,function(item){
                        	if(item.state==0 || item.state==20){ //为 未处理和处理失败
                        		 item.cannotChoose=false;
                        	}else{
                        		 item.cannotChoose=true;
                        	}
                        });*/
                        $scope.vm.pager.recordCount = response.data? response.data.pager.recordCount:0;
                        $scope.vm.pager.currentPage = response.data? response.data.pager.currentPage:0;
                        $scope.vm.pager.totalPage = response.data? response.data.pager.totalPage:0;
                       
                    }else{
                    	 bootbox.alert(response.error);
                    }
                });
            
            };
            
            
            //复选框 操作*********************************************************
            $scope.ids=[];
            $scope.checkAll = function (c, v) {//全选************
                if (c == true) {
                    angular.forEach(v, function (item) {
                    	    //if(item.cannotChoose==false){
                    	    	item.flag=true;
                                updateSelected('add', item, '');
                    	   // }
                    });
                } else {
                    angular.forEach(v, function (item) {
                    	 //if(item.cannotChoose===false){
                    		item.flag=false;
                            updateSelected('remove', item, '');
                    	// }
                    });
                }
            };//全选 end **************************************

            var updateSelected = function (action, item, name) {
                if (action == 'add' && $scope.ids.indexOf(item.id) == -1) {
                    $scope.ids.push(item.id);
                }
                if (action == 'remove' && $scope.ids.indexOf(item.id) != -1) {
                    var idx = $scope.ids.indexOf(item.id);
                    $scope.ids.splice(idx, 1);
                }
            }

            $scope.updateSelection = function ($event, item) {
                var checkbox = $event.target;
                var action = (checkbox.checked ? 'add' : 'remove');
                updateSelected(action, item, checkbox.name);
            }
            
            
            //复选框 操作 end******************************************************
          
            //单个重新发送
            $scope.handle=function(id){
            	$scope.datas=[];
            	$scope.item={
            			id:id,
            			userId:$scope.userInfo.userId
            	};
            	$scope.datas.push($scope.item);
            	$scope.resend($scope.datas);
            }
            
            $scope.resend=function(datas){
            	if(datas.length==0){
            		popupWinService.show("请选择需处理的记录！");
            		return false;
            	}
	            MessageService.resend(datas).then(function (response) {
	        		pagedataLoading.unloading(); 
	                if (response.success == true) {
	                	bootbox.alert("重新发送成功!", function () {
                            $scope.query();
                        });
	                    $scope.vo.master=false;
	                	$scope.ids=[];
	                }else{
	                	 bootbox.alert(response.error);
	                }
	            });
            }    
            
            //批量处理
            $scope.handleMore=function(){
            	$scope.datas=[];
            	for(var i=0;i<$scope.ids.length;i++){
            		$scope.item={
            				id:$scope.ids[i],
            			    userId:$scope.userInfo.userId	
            		}
            		$scope.datas.push($scope.item);
            	}
            	$scope.resend($scope.datas);
            }
            //批量删除
            $scope.deleteMore=function(){
            	$scope.datas=[];
            	for(var i=0;i<$scope.ids.length;i++){
            		$scope.item={
            				id:$scope.ids[i],
            			    userId:$scope.userInfo.userId	
            		}
            		$scope.datas.push($scope.item);
            	}
            	$scope.deleteM($scope.datas);
            }
            //导出
            $scope.exportExcel = function () {
                $scope.vo.currentPage = 1;
                $scope.vo.pageSize = $scope.vm.pager.recordCount;
                ExcelFileDownLoad.downLoad("/templates/ErrorMessage/downloadExcel", $scope.vo, "异常报文结果");
            };
            $scope.deleteM=function(datas){
            	if(datas.length==0){
            		popupWinService.show("请选择需处理的记录！");
            		return false;
            	}
	            MessageService.deleteMore(datas).then(function (response) {
	        		pagedataLoading.unloading(); 
	                if (response.success == true) {
	                	bootbox.alert("批量删除成功!", function () {
                            $scope.query();
                        });
	                    $scope.vo.master=false;
	                	$scope.ids=[];
	                }else{
	                	 bootbox.alert(response.error);
	                }
	            });
            }  
        }]);
});