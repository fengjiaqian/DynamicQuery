/**
 * 系统配置
 */
define(['app', 'directives/biz-Select',
        'services/CommonService',
        'services/service',
        'services/SystemConfigService',
        ], function (app) {
    app.controller('SystemConfigController', ['$http','$scope',function ($http,$scope) {
            
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
                    'index': 1
                }
            };
            
            //获取登陆用户
            $scope.userInfo=angular.fromJson(localStorage.getItem("userInfo"));

            $scope.warehouseArr = [
                {warehouseName: '【湖北省-武汉市】长康路仓库1', id: 1, flag: false},
                {warehouseName: '【湖北省-武汉市】长康路仓库2', id: 2, flag: false},
                {warehouseName: '【湖北省-武汉市】长康路仓库3', id: 3, flag: false},
                {warehouseName: '【湖北省-武汉市】长康路仓库4', id: 4, flag: false},
                {warehouseName: '【湖北省-武汉市】长康路仓库5', id: 5, flag: false},
                {warehouseName: '【湖北省-武汉市】长康路仓库6', id: 6, flag: false},
            ];

           $scope.levelOneArr = [
                {categoryName: '饮料', id: 1, flag: false},
                {categoryName: '白酒', id: 2, flag: false},
                {categoryName: '啤酒', id: 3, flag: false},
                {categoryName: '休闲食品', id: 4, flag: false},
                {categoryName: '日化', id: 5, flag: false},
                {categoryName: '葡萄酒', id: 6, flag: false},
                {categoryName: '黄酒', id: 7, flag: false},
                {categoryName: '洋酒', id: 8, flag: false},
            ];

            $scope.levelTwoArr = [
                {categoryName: '二级类目', id: 1, flag: false},
                {categoryName: '二级类目', id: 2, flag: false},
                {categoryName: '二级类目', id: 3, flag: false},
                {categoryName: '二级类目', id: 4, flag: false},
                {categoryName: '二级类目', id: 5, flag: false},
                {categoryName: '二级类目', id: 6, flag: false},
                {categoryName: '二级类目', id: 7, flag: false},
            ];


            $scope.levelSpecialArr = [
                {name: '啤酒', id: 1, brand: '进口啤酒',productName:'德国新威原瓶原装黑啤500ml',supplier:'XXXX商贸公司',remind:'否',prohibit:'禁止入库',forceDate:'是', forcePicture:'否',forceQueility:'嗯'},
                {name: '休闲食品', id: 2, brand: '进口啤酒',productName:'德国新威原瓶原装黑啤5L',supplier:'XXXX商贸公司',remind:'否',prohibit:'禁止入库',forceDate:'是', forcePicture:'否',forceQueility:'嗯'},
                {name: '葡萄酒', id: 3, brand: '进口啤酒',productName:'德国新威原瓶原装黑啤500ml',supplier:'XXXX商贸公司',remind:'否',prohibit:'禁止入库',forceDate:'是', forcePicture:'否',forceQueility:'嗯'},
                {name: '饮料', id: 4, brand: '进口啤酒',productName:'德国新威原瓶原装黑啤5L',supplier:'XXXX商贸公司',remind:'否',prohibit:'禁止入库',forceDate:'是', forcePicture:'否',forceQueility:'嗯'},
            ];


            // tab 切换
            $scope.select = function (index) {
                $scope.activeTab = index;
                if(index !== 1){
                    $scope.levelTwoArr = [
                        {categoryName: '白酒二级类目', id: 1, flag: false},
                        {categoryName: '白酒二级类目', id: 2, flag: false},
                        {categoryName: '白酒二级类目', id: 3, flag: false},
                        {categoryName: '白酒二级类目', id: 4, flag: false},
                        {categoryName: '白酒二级类目', id: 5, flag: false},
                        {categoryName: '白酒二级类目', id: 6, flag: false},
                        {categoryName: '白酒二级类目', id: 7, flag: false},
                    ];
                }else{
                    $scope.levelTwoArr = [
                        {categoryName: '饮料二级类目', id: 1, flag: false},
                        {categoryName: '饮料二级类目', id: 2, flag: false},
                        {categoryName: '饮料二级类目', id: 3, flag: false},
                        {categoryName: '饮料二级类目', id: 4, flag: false},
                        {categoryName: '饮料二级类目', id: 5, flag: false},
                        {categoryName: '饮料二级类目', id: 6, flag: false},
                        {categoryName: '饮料二级类目', id: 7, flag: false},
                    ];
                }
            };


            $scope.$on('$viewContentLoaded', function () {
                $scope.query();
            });

            $scope.query = function () {
            
            };
            
            
            /*  复选框 操作 s*/
            $scope.ids=[];

            $scope.checkAll = function (c, v) {//全选
                if (c == true) {
                    angular.forEach(v, function (item) {
                	    	item.flag=true;
                            updateSelected('add', item, '');
                    });
                } else {
                    angular.forEach(v, function (item) {
                    		item.flag=false;
                            updateSelected('remove', item, '');
                    });
                }
            };

            let updateSelected = function (action, item, name) {
                if (action == 'add' && $scope.ids.indexOf(item.id) == -1) {
                    $scope.ids.push(item.id);
                }
                if (action == 'remove' && $scope.ids.indexOf(item.id) != -1) {
                    let idx = $scope.ids.indexOf(item.id);
                    $scope.ids.splice(idx, 1);
                }
            };

            $scope.updateSelection = function ($event, item) {
                let checkbox = $event.target;
                let action = (checkbox.checked ? 'add' : 'remove');
                updateSelected(action, item, checkbox.name);
            };

            /*  复选框 操作 e*/


            // 删除--简版-后面有数据再调整
            $scope.delete=function(id){
                $scope.levelSpecialArr.splice(id - 1, 1);
            }

        }]);
});