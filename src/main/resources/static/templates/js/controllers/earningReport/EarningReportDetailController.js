/**
 * 业绩报表详情
 */
define(['app', 'directives/biz-Select', 
        'services/CommonService', 
        'services/service',
        'services/EarningReportService',
        ], function (app) {
    app.controller('EarningReportDetailController', ['$http','$scope','$filter', '$stateParams','$rootScope', '$state','EarningReportService','popupWinService','QueryDataService', 'BizSelectService', 'CommonService','ExcelFileDownLoad','pagedataLoading',
        function ($http,$scope,$filter,$stateParams, $rootScope, $state,EarningReportService,popupWinService, QueryDataService, BizSelectService,  CommonService,ExcelFileDownLoad,pagedataLoading) {
            
            $scope.vo = {};
            $scope.vm = {};
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
            $scope.vo.queryType= $stateParams.queryType;
            if($stateParams.queryType==1){
            	$scope.vo.deliveryUser_Id=$stateParams.id;
            	$state.current.data.pageTitle='司机业绩报表详情';
            }else if($stateParams.queryType==2){
            	$scope.vo.warehouse_Id=$stateParams.id;
            	$state.current.data.pageTitle='仓管业绩报表详情';
            }else{
            	$scope.vo.stevedoreUser_Id=$stateParams.id;
            	$state.current.data.pageTitle='搬运工业绩报表详情';
            }
            $scope.vo.statisticsClass=$stateParams.statisticsClass;
            $scope.vo.name=$stateParams.name;
            
            //获取登陆用户
            $scope.userInfo=angular.fromJson(localStorage.getItem("userInfo"));

            $scope.$on('$viewContentLoaded', function () {
                $scope.query();
            });
            
            $scope.query = function () {
                QueryDataService.storeSearchData($scope);
                $scope.vo.currentPage=$scope.vm.pager.index;
                $scope.vo.pageSize=$scope.vm.pager.pageSize;
                pagedataLoading.loading();
                $scope.vm.items={};
                EarningReportService.getEarningReportDetail($scope.vo).then(function (response) {
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
          
            /**
             * 导出excel表格
             */
            $scope.exportExcel = function () {
            	$scope.vo.currentPage=1;
                $scope.vo.pageSize=60000;
                //处理日期
                if($scope.vo.startTime){
                	$scope.vo.startTime=$scope.vo.startTime.replace("-","").substring(0,6);
                }
                if($scope.vo.endTime){
                	$scope.vo.endTime=$scope.vo.endTime.replace("-","").substring(0,6);
                }
                if($scope.vo.queryType==1){
                	var execlName='司机业绩报表详情'
                }else if($scope.vo.queryType==2){
                	var execlName='仓管业绩报表详情'
                }else{
                	var execlName='搬运工业绩报表详情'
                }
                ExcelFileDownLoad.downLoad("/templates/earningReportDetail/downloadExcel",$scope.vo,execlName);
            };
           
        }]);
});