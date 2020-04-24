/**
 * 内容配置-列表
 */
define(['app', 'directives/biz-Select',
        'services/service',
    'services/DynamicSqlQueryConfigService',
], function (app) {
    app.controller('ExcuteSqlQueryController', ['$http','$scope', '$stateParams', '$rootScope', '$state', 'DynamicSqlQueryConfigService','ExcelFileDownLoad', 
        function ($http, $scope, $stateParams, $rootScope, $state, DynamicSqlQueryConfigService, ExcelFileDownLoad) {
	    	$scope.vo = {};
	    	$scope.vo.id=$stateParams.id;
	    	$scope.searchInputs = [];
	    	$scope.gridOptions = {  
	    			data: 'myData',
	    			i18n: 'zh-cn',
	    			showFilter:true,
	    			columnDefs:'myColumns'
	    	};
	    	//查询
            $scope.searchClick = function () {
                $scope.query();
            };

            //重置
            $scope.resetClick = function () {
                angular.forEach($scope.searchInputs, function(filter){
                	filter.value = "";
          		});
                $scope.query();
            };
            $scope.$on('$viewContentLoaded', function () {
                $scope.query();
            });
            $scope.query = function () {
            	DynamicSqlQueryConfigService.detail($scope.vo).then(function (dto) {
                    if (dto) {
                    	$scope.columnCodes=dto.parameters.split(",");
            	    	$scope.columnNames=dto.columnStr.split(",");
            	    	$scope.vo.taskName=dto.taskName;
            	    	
            	    	if ($scope.columnCodes.length == $scope.columnNames.length) {
            	    		// 动态加载查询条件
            	    		if (dto.filters) {
            	    			if ($scope.searchInputs.length == 0) {
            	    				for(var i = 0;i < $scope.columnCodes.length; i++) {
                    	            	if (dto.filters.indexOf(i+",") > -1) {
                    	            		$scope.searchInputs.push({id: $scope.columnCodes[i], name: $scope.columnNames[i], value:""});
                    	            	}
                    	            }
            	    			}
            	    			$scope.searchHide=false;
            	    		} else {
            	    			$scope.searchHide=true;
            	    		}
            	    		
            	    		var cols = [];
            	    		// 动态加载数据列
            	            for(var i = 0;i < $scope.columnCodes.length; i++) {
            	            	cols.push({field: $scope.columnCodes[i], displayName: $scope.columnNames[i]});    
            	            }
            	            $scope.myColumns = cols;
            	            $scope.vo.filterMap = {};
            	            if ($scope.searchInputs.length > 0) {
            	            	$scope.searchInputs.forEach(function(inputFilter){
            	            		if (inputFilter.value) {
            	            			$scope.vo.filterMap[inputFilter.id] = inputFilter.value.toString();
            	            		}
            	            	});
            	            }
            	            DynamicSqlQueryConfigService.excuteSql($scope.vo).then(function (response) {
                                if (response.length > 0) {
                                	$scope.myData = response;
                                } else {
                                	$scope.myData = [];
                                }
                            });
            	    	} else {
            	    		bootbox.alert("列码和列名数量不相等！");
            	    	}
                    } else {
                    	$scope.myData = [];
                        bootbox.alert("没有查询到配置数据！");
                    }
                });
	    		
            };
            $scope.exportExcel = function () {
            	$scope.vo.filterMap = {};
	            if ($scope.searchInputs.length > 0) {
	            	$scope.searchInputs.forEach(function(inputFilter){
	            		if (inputFilter.value) {
	            			$scope.vo.filterMap[inputFilter.id] = inputFilter.value.toString();
	            		}
	            	});
	            }
                ExcelFileDownLoad.downLoad("/templates/executeSqlReport/downloadExcel", $scope.vo, $scope.vo.taskName);
            };
            
/*           
            $scope.gridOptions = {
            		            data: 'myData ',
            		            multiSelect: false,
            		            enableColumnResize: true,
            		            enableCellEditOnFocus: true,
            		            enableRowEditOnSelected: true,
            		            i18n: 'zh-cn',
            		            columnDefs: [
            		                {displayName: '序号', cellClass: "text-center", width: '6%', enableCellEdit: false,
            		                    cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()"><span ng-cell-text>{{ row.rowIndex }}</span></div>'},
            		                {field: 'examClass', displayName: '检查分类', width: '10%', enableCellEdit: true,
            		                    editableCellTemplate: '<select style="width: 100%;" ui-select2 ng-grid-select2 is-grid="true" ng-model="row.entity.examClass" >\n <option ng-repeat="examClass in examClassDict" value="{{examClass.examClassName}}">{{examClass.examClassName}}</option>\n</select>'},
            		              
            		                {field: 'examEquipName', displayName: '设备名称', width: '15%', enableCellEdit: true,
            		                    editableCellTemplate: '<input style="width: 100%;" ng-input type="text" is-grid="true" ng-model="row.entity.examEquipName" ng-change="change()">'},
            		             
            		                {field: 'memo', displayName: '备注', width: '20%', enableCellEdit: true,
            		                    editableCellTemplate: '<input style="width: 100%;" ng-input type="text" is-grid="true" ng-model="row.entity.memo">'},
            		                {displayName: '操作', width: '8%', enableCellEdit: false, cellClass: 'text-center',
            		                    cellTemplate: '<div class="ngCellText" ng-class="col.colIndex()">\n    <span ng-cell-text>\n        <a><i class="icon-plus" ng-click="newItem(row.rowIndex)"></i></a>&nbsp;&nbsp;\n        <a><i class="icon-minus" ng-click="deleteItem(row.entity, row.rowIndex)"></i></a>\n    </span>\n</div>'}
            		            ]
            		        };*/
        }]);
});

