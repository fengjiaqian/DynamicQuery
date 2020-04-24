/**
 * 司机业绩报表
 */
define(['app', 'directives/biz-Select', 
        'services/CommonService', 
        'services/service',
        'services/EarningReportService',
        ], function (app) {
    app.controller('ShopSettReportController', ['$http','$scope','$filter', '$rootScope', '$state','EarningReportService','popupWinService','QueryDataService', 'BizSelectService', 'CommonService','ExcelFileDownLoad','pagedataLoading',
        function ($http,$scope,$filter, $rootScope, $state,EarningReportService,popupWinService, QueryDataService, BizSelectService,  CommonService,ExcelFileDownLoad,pagedataLoading) {
            
            $scope.vo = {};
            $scope.vm = {};
            $scope.cityVo = {};
            $scope.isDisabled=false;
            $scope.isShopCanEdit=true;
        
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
                var monthString = dateString.substring(5);
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
            //格式化date
            $scope.getPreMonth=function() {
                    let month = new Date().getMonth()+1;   //获取当前日期中月
                    let year =  new Date().getFullYear(); //获取当前日期中年
                    var year2 = year;
                    var month2 = parseInt(month) - 1;
                    if (month2 == 0) {//如果是1月份，则取上一年的12月份
                        year2 = parseInt(year2) - 1;
                        month2 = 12;
                    }
                    if (month2 < 10) {
                        month2 = '0' + month2;//月份填补成2位。
                    }
                    var t2 = year2 + '-' + month2;
                    return t2;
            }
            $scope.vo.settleYearMonth=$scope.getPreMonth();
            
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
            	if($scope.userInfo.userRole=='CityAdmin'){
            	    $scope.isDisabled=true;
            		$scope.cityVo.cityObj={};
                	$scope.vo.cityId=$scope.userInfo.city.cityId? $scope.userInfo.city.cityId:null;
                	$scope.vo.cityName=$scope.userInfo.city.cityId? $scope.userInfo.city.city:null;
                	$scope.cityVo.provinceObj = $scope.userInfo.city.province;
                	$scope.cityVo.cityId = $scope.userInfo.city.cityId;
                }
            }
            $scope.getShopSettleReportRules=function(){
            	EarningReportService.getShopSettleReportRules().then(function (response) {
                    if (response.success == true) {
                        $scope.vm.rules = response.data? response.data:null;
                    }else{
                    	 bootbox.alert(response.error);
                    }
                });
            }
            $scope.initCity();
            $scope.getShopSettleReportRules()
            
            $scope.getShopsById=function(cityId){
            	EarningReportService.getShopsById(cityId).then(function (response) {
            		pagedataLoading.unloading(); 
                    if (response.success == true) {
                        $scope.vm.shopsByIdList = response.data? response.data:null;
                    }else{
                    	 bootbox.alert(response.error);
                    }
                });
            };
            $scope.$watch("cityVo.cityId", function (data) {
            	if(data){
            		 $scope.isShopCanEdit=false
            		 $scope.getShopsById(data)
            	}
            }, true);

           //查询
            $scope.searchClick = function () {
            	$scope.vm.pager.index=1;
                $scope.query();
            };
            
            //重置
            $scope.resetClick = function () {
            	if($scope.userInfo.userRole=='CityAdmin'){
            		$scope.vo.settleYearMonth=null;
            		$scope.vo.shopExternalId=null;
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
                if($scope.userInfo.userRole!='CityAdmin'){
                	$scope.vo.cityId=$scope.cityVo.cityId?$scope.cityVo.cityId:null;
                	$scope.vo.cityName=$scope.cityVo.cityId?$scope.cityVo.cityObj.name:null;
                }
                $scope.vo.currentPage=$scope.vm.pager.index;
                $scope.vo.pageSize=$scope.vm.pager.pageSize;
                pagedataLoading.loading();
                $scope.vm.items={};
                EarningReportService.getShopSettleReport($scope.vo).then(function (response) {
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
            //手动生成数据
            $scope.hand_getData=function(){
            	    if(!$scope.cityVo.cityId){
            	    	 bootbox.alert('请先选择城市!');
            	    	 return;
            	    }
                    QueryDataService.storeSearchData($scope);
                    if($scope.userInfo.userRole!='CityAdmin'){
                    	$scope.vo.cityId=$scope.cityVo.cityId?$scope.cityVo.cityId:null;
                    	$scope.vo.cityName=$scope.cityVo.cityId?$scope.cityVo.cityObj.name:null;
                    }
                    //处理时间
                    let sTime=$scope.vo.settleYearMonth
                	$scope.vo.startTime=$scope.formatDate1($scope.setDatePeriod('start',sTime));
          			$scope.vo.endTime=$scope.formatDate1($scope.setDatePeriod('end',sTime));
                
                    pagedataLoading.loading();
                    EarningReportService.handShopSettleReport($scope.vo).then(function (response) {
                		pagedataLoading.unloading(); 
                        if (response.success == true) {
                        	bootbox.alert('同步成功!',function () {
                                 $scope.query();
                         	});
                           
                        }else{
                        	 bootbox.alert(response.error);
                        }
                    });
            }
           
            
           
           
        }]);
});