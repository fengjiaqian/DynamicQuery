define(['app', 'services/DeliveryFactorService','services/service',], function (app) {

    app.controller('FactorController',
        ['$modalInstance', '$scope', '$rootScope', 'args', 'UserService', 'DeliveryFactorService', 'popupWinService',
            function ($modalInstance, $scope, $rootScope, args, UserService, DeliveryFactorService, popupWinService) {
               
                $scope.vo = {};
                $scope.data = args;
                //单个编辑才获取详情,批量不获取
                if($scope.data.type=='si'){
                	DeliveryFactorService.getDeliveryFactor($scope.data.ids[0]).then(function (response) {
                    	if (response.success == true) {
                    		$scope.vo = response.data? response.data:null; 
                    	}
                    });
                }
                
              
                //提交
                $scope.ok = function () {
                    var arg = {
                       distributionPercent: $scope.vo.distributionPercent,
                       distributionPercentForAmount: $scope.vo.distributionPercentForAmount,
                       skuIdList:$scope.data.ids
                    };
                    DeliveryFactorService.editDeliveryFactor(arg).then(function (response) {
                    	if(response.success==true){
                    		$modalInstance.close(response);
                    	}else{
                    		bootbox.alert(response.error);
                    	}
                    }, function (data) {
                        $modalInstance.dismiss(data);
                    });
                };

                // 取消按钮
                $scope.cancel = function () {
                    $modalInstance.dismiss();
                };
            }]);

});