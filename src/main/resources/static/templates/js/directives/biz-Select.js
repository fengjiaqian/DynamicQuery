/**
 * 通用Select下拉选择框
 */
define(['app'], function (app) {

    /**
     * 从服务器，获取下拉选择框所以内容列表
     */
    app.service('BizSelectService', ['QHttp', '$cacheFactory', function (QHttp, $cacheFactory) {
        this.lruCache = $cacheFactory('lruCache', {capacity: 10});
        this.getOptions = function (type, params) {

            //可考虑缓存此数据，避免重复发请求
            return QHttp.formRequest({
                method: 'GET',
                url: 'common/bizSelect.action?type=' + type,
                cache: this.lruCache
            });
        };
        this.getOptions2 = function (cityId) {
            //通过城市id获取当前城市仓库
            //可考虑缓存此数据，避免重复发请求
            return QHttp.formRequest({
                method: 'GET',
                url: 'common/bizSelect.action?type=' + cityId,
                cache: this.lruCache
            });
        };
        
    }]);

    /**
     * 显示下拉选择框
     */
    app.directive('bizSelect', ['BizSelectService', function (BizSelectService) {
        return {
            restrict: 'AE',
            scope: {
                name: '=',
                type: '=',
                required: '=',
                params: '='
            },
            template: function (tplNode, tplAttr) {
                return '<select class="form-control"'
                    + ' data-placeholder="请选择"'
                    + ' data-ng-options="item.id as item.name for item in selectList" >'
                    + '<option value="">请选择</option>'
                    + '</select>';
            },
            replace: true,
            link: function ($scope, elem, attrs) {
                BizSelectService.getOptions(attrs.type, attrs.params)
                    .then(function (response) {
                        if (response.success == true) {
                            $scope.selectList = response.data;
                        } else {
                            $scope.selectList = [];
                        }
                    }, function () {
                        $scope.selectList = [];
                    });
            }
        };
    }]);

    /**
     * 显示选中的下拉选择框字面内容
     */
    app.directive('bizSelectBind', ['$compile', 'BizSelectService', function ($compile, BizSelectService) {
        var tpl = [
            '<span class="label label-sm" data-ng-class="{' +
            '\'cn0\':\'label-warning\',' +
            '\'cn1\':\'label-primary\',' +
            '\'cn2\':\'label-success\',' +
            '\'cn3\':\'label-danger\',' +
            '\'cn4\':\'label-info\'' +
            '}[className]" data-ng-bind="context"></span>',
            '<span data-ng-bind="context"></span>'
        ];
        return {
            restrict: 'AE',
            scope: {
                type: '=',
                params: '=',
                tplidx: '='
            },
            template: function (tplNode, tplAttr) {
                return tpl[tplAttr.tplidx || '0'];
            },
            compile: function ngBindCompile(templateElement) {
                $compile.$$addBindingClass(templateElement);
                return function ngBindLink(scope, element, attrs) {
                    $compile.$$addBindingInfo(element, attrs.bizSelectBind);

                    scope.$parent.$watch(attrs.bizSelectBind, function ngBindWatchAction(value) {
                        scope.context = "";
                        BizSelectService.getOptions(attrs.type, attrs.params)
                            .then(function (response) {
                                if (response.success == true) {
                                    for (var i = 0; i < response.data.length; i++) {
                                        if (value == response.data[i].id) {
                                            scope.className = 'cn' + i % 5;
                                            scope.context = response.data[i].name;
                                            break;
                                        }
                                    }
                                }
                            });
                    });
                }
            }
        };
    }]);

});