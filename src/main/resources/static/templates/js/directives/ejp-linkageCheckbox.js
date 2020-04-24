(function (angular) {
    'use strict';
    angular.module('ejp-linkageCheckbox', ['ngTouch'])
        .constant("ejpSlaveCheckboxConfig", {
            //.从属checkbox的model集合
            subModels: [],
            //.数据比较函数
            compare: function (src, dst) {
                if (src.id != undefined && src.id === dst.id) {
                    return true;
                } else {
                    var bol = false;
                    for (var dstK in dst) {
                        if (dst[dstK] === src[dstK]) {
                            bol = true;
                            break;
                        }
                    }
                    return bol;
                }
            },
            //.解析列表循环表达式
            parseRepeat: function (expression) {
                var match = expression.match(/^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+track\s+by\s+([\s\S]+?))?\s*$/);

                if (!match) {
                    return null;
                }

                var res = {
                    item: match[1],
                    list: match[2],
                    alias: match[3],
                    track: match[4]
                }
                match = res.item.match(/^(?:(\s*[\$\w]+)|\(\s*([\$\w]+)\s*,\s*([\$\w]+)\s*\))$/);
                if (!match) {
                    return null;
                }
                res.val = match[3] || match[1];
                res.key = match[2];

                console.log(res);
                return res;
            },
            //.预加载标识字段，可选配置
            loadingField: '__loading__'
        }).directive("ejpSlaveCheckbox", ['$parse', 'ejpSlaveCheckboxConfig', function ($parse, $config) {
        return {
            restrict: 'A',
            required: 'ngModel',
            compile: function ($element, $attr) {

                //获取存放选中值的字段
                function getCheckedField() {
                    var modelName = $attr.ngModel;
                    var idx = modelName.lastIndexOf(".");
                    if (idx > 0) {
                        return modelName.substr(idx + 1);
                    } else {
                        throw new Error("ejpSlaveCheckbox", "A checked field not found.");
                    }
                }

                //获取主控chckbox
                function getMasterCheckbox() {
                    var masterElement = angular.element("input:checkbox[data-ng-model='ejpMasterModel']");
                    if (masterElement.length == 0) {
                        masterElement = angular.element("#ejp-checkedboxMaster");
                    }

                    if (masterElement.length == 0) {
                        throw new Error("A master checkbox not found.");
                    } else {
                        console.log(masterElement);
                        return masterElement;
                    }
                }

                //获取列表循环表达式
                function getNgRepeatExpr() {
                    var repeatTR = angular.element("tr[data-ng-repeat~='item']");
                    if (repeatTR.length == 0) {
                        repeatTR = angular.element('#ejp-checkboxTR');
                    }

                    if (repeatTR.length == 0) {
                        throw new Error("A TR with ng-repeat not found.");
                    }

                    var expr = repeatTR.attr("ng-repeat");
                    if (angular.isUndefined(expr)) {
                        expr = repeatTR.attr("data-ng-repeat");
                    }

                    return config.parseRepeat(expr);
                }

                //获取取值按钮
                function getSelectItemsBtn() {
                    var btn = angular.element("input:button[data-ejp-callback='ejpCallback']");
                    if (btn.length == 0) {
                        btn = angular.element('#ejp-getSelectItemsBtn');
                    }

                    if (btn.length == 0) {
                        throw new Error("A button to get selectItems not found.");
                    } else {
                        console.log(btn);
                        return btn;
                    }
                }

                //获取选中值
                function getSelectItems() {

                    var res = {add: [], mov: []};

                    angular.forEach(config.itemList, function (item) {
                        var cf = item[config.checkedField];
                        var lf = item[config.loadingField];

                        if (!lf && cf) {//非加载项,选中
                            res.add.push(item);
                        } else if (lf && !cf) {//加载项,取消选中
                            res.mov.push(item);
                        }
                    });

                    return res;
                }

                //console.log("编译准备函数。。。。");
                //数据准备区

                //克隆默认配置（每次都初始化的数据）
                var config = angular.copy($config);

                config.compare = config.compare || function (src, dst) {
                        return src == dst;
                    };

                config.checkedField = getCheckedField();

                // 判断是否全选（true），全消状态(false)，或者部分选择状态(null)
                function getUnifiedState(bol) {
                    var result = bol;
                    for (var i = 0; i < config.subModels.length; i++) {
                        if (config.subModels[i].$viewValue != bol) {
                            result = false;
                            break;
                        }
                    }
                    return result;
                }

                return {
                    pre: function onPreLoadData($scope, element, attr, ctrl) {

                        if ($scope.$first) {
                            //<<::处理第一行数据时执行::>>
                            //预选中数据
                            config.loadingItems = $scope.$eval(attr.ejpSlaveCheckbox);

                            config.repeatExpr = getNgRepeatExpr();

                            //获取父级元素
                            var masterElement = getMasterCheckbox();

                            config.masterModel = masterElement.controller("ngModel");

                            //父级模型 发生变化 :::>>> 子级模型，全选或者全消
                            masterElement.on("click", function () {
                                angular.forEach(config.subModels, function (child) {
                                    child.$setViewValue(config.masterModel.$viewValue);
                                    child.$render();
                                })
                            });

                            //获取选中值按钮
                            var selectItemsBtn = getSelectItemsBtn();

                            var clickCallback = selectItemsBtn.attr("data-ejp-callback");

                            var callbackFn = $scope.$eval(clickCallback);

                            var clickFn = function () {
                                var ary = getSelectItems();
                                callbackFn(ary);
                            };


                            selectItemsBtn.off("click");
                            selectItemsBtn.on("click", clickFn);


                            //修改加载的数据选中状态值
                            var copyItems = angular.copy(config.loadingItems) || [];

                            //获取列表数据集合
                            config.itemList = $scope.$eval(config.repeatExpr.list);
                            if (copyItems.length > 0) {
                                angular.forEach(config.itemList, function (item) {
                                    for (var i = 0; i < copyItems.length; i++) {
                                        if (config.compare(item, copyItems[i])) {
                                            item[config.checkedField] = true;
                                            item[config.loadingField] = true;
                                            copyItems.splice(i, 1);//删除已匹配的数据（前提条件：itemList中没有重复的数据）
                                            break;
                                        }
                                    }
                                });
                            }
                        }
                    },
                    post: function ngEventHandler(scope, element, attr, ctrl) {
                        //<<::执行多次::>>

                        //当前模型
                        var model = element.controller("ngModel");
                        //收集所有子级checkbox的model
                        config.subModels.push(model);

                        //添加点击事件处事函数
                        element.on("click", function () {
                            //触发父级元素联动
                            var state = getUnifiedState(model.$viewValue);
                            if (state != null) {
                                config.masterModel.$setViewValue(state);
                                config.masterModel.$render();
                            }
                        });
                    }
                };
            }
        };
    }]);
})(window.angular);
