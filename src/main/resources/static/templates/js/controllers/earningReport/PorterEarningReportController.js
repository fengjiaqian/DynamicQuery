/**
 * 搬运工业绩报表
 */
define(['app', 'directives/biz-Select', 
        'services/CommonService', 
        'services/service',
        'services/EarningReportService',
        ], function (app) {
    app.controller('PorterEarningReportController', ['$http','$scope','$filter', '$rootScope', '$state','EarningReportService','popupWinService','QueryDataService', 'BizSelectService', 'CommonService','ExcelFileDownLoad','pagedataLoading',
        function ($http,$scope,$filter, $rootScope, $state,EarningReportService,popupWinService, QueryDataService, BizSelectService,  CommonService,ExcelFileDownLoad,pagedataLoading) {
            
            $scope.vo = {};
            $scope.vm = {};
            $scope.cityVo = {};
            $scope.isDisabled=false;
            //格式化date
            $scope.formatDate = function (date) {
                var d = new Date(date),
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();

                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;
                
                return [year, month].join('');
            }
            //将年月格式转化成年月日
            $scope.formatDate1 = function (da) {
                var d = new Date(da);
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();

                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;
                
                return [year, month, day].join('-');
            }
            $scope.setDatePeriod = function (type,dateString) {
            	var yearString = dateString.substring(0,4);
                var monthString = dateString.substring(4);
                dateString=[yearString,monthString].join('-');
                var date = new Date(dateString);
                year = date.getFullYear();
                month = date.getMonth() + 1;
                //当月
                if (type == 'start') {
                    return  new Date(date.setDate(1));
                }
                if(type=='end'){
                	//计算当月最大天数
                    if (month == 2) {
                        maxDays = year % 4 == 0 ? 29 : 28;
                    } else if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
                        maxDays = 31;
                    } else {
                        maxDays = 30;
                    }
                    return new Date(date.setDate(maxDays));
                }
            }
            //默认为当前月
            var date = new Date();
        	$scope.vo.startTime1=$scope.formatDate(date);
        	$scope.vo.endTime1=$scope.formatDate(date);
            
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
            //若为出纳\城市管理员\城市经理\仓管    城市固定
            $scope.initCity=function(){
            	if(($scope.userInfo.userRole=='Cashier'|| $scope.userInfo.userRole=='CityManager')|| ($scope.userInfo.userRole=='CityAdmin'|| $scope.userInfo.userRole=='StoreAdmin')){
            	    $scope.isDisabled=true;
            		$scope.cityVo.cityObj={};
                	$scope.vo.city_Id=$scope.userInfo.city.cityId? $scope.userInfo.city.cityId:null;
                	$scope.cityVo.provinceObj = $scope.userInfo.city.province;
                	$scope.cityVo.cityId = $scope.userInfo.city.cityId;
                }
            }
            $scope.initCity();

           //查询
            $scope.searchClick = function () {
            	$scope.vm.pager.index=1;
                $scope.query();
            };
            
            //重置
            $scope.resetClick = function () {
            	if(($scope.userInfo.userRole=='Cashier'|| $scope.userInfo.userRole=='CityManager')|| ($scope.userInfo.userRole=='CityAdmin'|| $scope.userInfo.userRole=='StoreAdmin')){
            		$scope.vo.startTime=null;
            		$scope.vo.startTime1=null;;
                    $scope.vo.endTime=null;
                    $scope.vo.endTime1=null;
                }else{
                	$scope.vo = {};
                    $scope.cityVo={};
                }
                $scope.vm.pager.index=1;
                $scope.query();
            };

            $scope.$on('$viewContentLoaded', function () {
                $scope.query();
            });
            
            $scope.query = function () {
                QueryDataService.storeSearchData($scope);
                if(($scope.userInfo.userRole!='Cashier'&& $scope.userInfo.userRole !='CityManager') && ($scope.userInfo.userRole!='CityAdmin'&& $scope.userInfo.userRole!='StoreAdmin')){
                	$scope.vo.city_Id=$scope.cityVo.cityId?$scope.cityVo.cityId:null;
                }
                $scope.vo.currentPage=$scope.vm.pager.index;
                $scope.vo.pageSize=$scope.vm.pager.pageSize;
                $scope.vo.startTime=$scope.vo.startTime1;
                $scope.vo.endTime=$scope.vo.endTime1;
                pagedataLoading.loading();
                $scope.vm.items={};
                EarningReportService.getPorterReport($scope.vo).then(function (response) {
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
            //同步按钮
            $scope.reportCalculation=function(){
                $scope.vo.type =2;
                $scope.vo.city_Id=$scope.cityVo.cityId?$scope.cityVo.cityId:null;
                if((!$scope.vo.startTime1 || !$scope.vo.endTime1) || !$scope.vo.city_Id){
                	bootbox.alert('城市和时间为必选项!');
                	return;
                }
                //获取当前区域仓库id
                if($scope.vo.city_Id){
                	$scope.cityObj={
                			cityId: $scope.vo.city_Id
                	}
                	pagedataLoading.loading(); 
                	EarningReportService.getWareHouseList($scope.cityObj).then(function (response) {
                          if (response.success == true) {
                                $scope.vm.warehouseSelectList = response.data.dataList;
	                            //同步计算
	                          	if($scope.vm.warehouseSelectList.length>0){
	                          		 var num=0;                  		    	
	                          		 $scope.send=function(i){
	                          			if (i >= $scope.vm.warehouseSelectList.length){
	                          				$scope.a();
	                          				return false;
	                          			} 
	                          			$scope.vo.warehouse_Id=$scope.vm.warehouseSelectList[i].id;
	                          			//同步按钮-处理时间
	                          			var sTime=$scope.vo.startTime1;
	                          			var eTime=$scope.vo.endTime1;
	                          			$scope.vo.startTime=$scope.formatDate1($scope.setDatePeriod('start',sTime));
	                          			$scope.vo.endTime=$scope.formatDate1($scope.setDatePeriod('end',eTime));
                      		    		EarningReportService.reportCalculation($scope.vo).then(function (response) {
              	                            if (response.success == true) {
              	                            	i++;
        	                          			num++;
              	                            	$scope.send(i);
              	                            }else{
              	                            	pagedataLoading.unloading();
              	                            	bootbox.alert(response.error);
              	                            }
              	                        });
                      		    		 
	                          		 }
	                          		 $scope.send(0);
	                          		 $scope.a=function(){
		                          	    pagedataLoading.unloading();
	                          			if(num==$scope.vm.warehouseSelectList.length){
	     	                            	bootbox.alert('同步成功!',function () {
	     	                                       $scope.query();
	     	                            	});
	                          				//bootbox.alert('同步成功!');
	   	    	                         }else{
	   	    	                            bootbox.alert('同步失败!');
		    	                         }
	                          		 }
	                          	}else{
	                          		bootbox.alert('无仓库列表!');
	                          	}
                          }else{
                        	  bootbox.alert(response.error);
                          }
                    })
                }else{
                	bootbox.alert('请先选择城市!');
                }
            }
            /**
             * 导出excel表格
             */
            $scope.exportExcel = function () {
            	$scope.vo.currentPage=1;
                $scope.vo.pageSize=$scope.vm.pager.recordCount;
                //处理日期
                if($scope.vo.startTime){
                	$scope.vo.startTime=$scope.vo.startTime.replace("-","").substring(0,6);
                }
                if($scope.vo.endTime){
                	$scope.vo.endTime=$scope.vo.endTime.replace("-","").substring(0,6);
                }
                ExcelFileDownLoad.downLoad("/templates/PorterEarningReport/downloadExcel",$scope.vo,"搬运工业绩报表");
            };
           
        }]);
});