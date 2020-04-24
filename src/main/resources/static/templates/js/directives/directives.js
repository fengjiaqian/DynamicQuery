/*******************************************************************************
 * GLobal Directives
 ******************************************************************************/

// Route State Load Spinner(used on page or content load)
MetronicApp.directive('ngSpinnerBar', ['$rootScope', function ($rootScope) {
    return {
        link: function (scope, element, attrs) {
            // by defult hide the spinner bar
            element.addClass('hide'); // hide spinner bar by default

            // display the spinner bar whenever the route changes(the content
            // part started loading)
            $rootScope.$on('$stateChangeStart', function () {
                element.removeClass('hide'); // show spinner bar
            });

            // hide the spinner bar on rounte change success(after the content
            // loaded)
            $rootScope.$on('$stateChangeSuccess', function () {
                element.addClass('hide'); // hide spinner bar
                $('body').removeClass('page-on-load'); // remove page loading
                // indicator
                Layout.setSidebarMenuActiveLink('match'); // activate selected
                // link in the
                // sidebar menu

                // auto scorll to page top
                /***************************************************************
                 * setTimeout(function() { Metronic.scrollTop(); // scroll to
				 * the top on content load },
                 * $rootScope.settings.layout.pageAutoScrollOnLoad);
                 **************************************************************/
            });

            // handle errors
            $rootScope.$on('$stateNotFound', function () {
                element.addClass('hide'); // hide spinner bar
            });

            // handle errors
            $rootScope.$on('$stateChangeError', function () {
                element.addClass('hide'); // hide spinner bar
            });
        }
    };
}])

// Handle global LINK click
MetronicApp.directive('a', function () {
    return {
        restrict: 'E',
        link: function (scope, elem, attrs) {
            if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                elem.on('click', function (e) {
                    e.preventDefault(); // prevent link click for above criteria
                });
            }
        }
    };
});

// Handle Dropdown Hover Plugin Integration
MetronicApp.directive('dropdownMenuHover', function () {
    return {
        link: function (scope, elem) {
            elem.dropdownHover();
        }
    };
});

MetronicApp.directive('tree', function ($compile) {
    return {
        restrict: "E",
        scope: {
            family: '='
        },
        template: '<ul><li ng-repeat="child in family.sonIndex"><tree family="child"></tree></li></ul>',
        compile: function (tElement, tAttr) {
            var contents = tElement.contents().remove();
            var compiledContents;
            return function (scope, iElement, iAttr) {
                if (!compiledContents) {
                    compiledContents = $compile(contents);
                }
                compiledContents(scope, function (clone, scope) {
                    iElement.append(clone);
                });
            };
        }
    };
});

MetronicApp.directive('trees',
    function (RecursionHelper) {
        return {
            restrict: "E",
            replace: true,
            scope: {
                sonlabel: '='
            },
            template: '<ul class="sub-menu">'
            + '<li ng-repeat="son in sonlabel" ng-if="son.privilegeType==\'Menu\'">'
            + '<a href="{{son.url}}">'
            + '<i class="{{son.icon}}"></i>'
            + '<span class="title" ng-bind="son.title"></span><span class="arrow"  ng-if="son.sonIndex.length"></span></a>'
            + '<trees sonlabel="son.sonIndex" ng-if="son.sonIndex.length" ></trees>'
            + '</li></ul>',
            compile: function (element) {
                return RecursionHelper.compile(element);
            }
        }
    });

MetronicApp.directive('ngThumb', ['$window', function ($window) {
    var helper = {
        support: !!($window.FileReader && $window.CanvasRenderingContext2D),
        isFile: function (item) {
            return angular.isObject(item) && item instanceof $window.File;
        },
        isImage: function (file) {
            var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
        }
    };

    return {
        restrict: 'A',
        template: '<canvas/>',
        link: function (scope, element, attributes) {
            if (!helper.support)
                return;

            var params = scope.$eval(attributes.ngThumb);

            if (!helper.isFile(params.file))
                return;
            if (!helper.isImage(params.file))
                return;

            var canvas = element.find('canvas');
            var reader = new FileReader();

            reader.onload = onLoadFile;
            reader.readAsDataURL(params.file);

            function onLoadFile(event) {
                var img = new Image();
                img.onload = onLoadImage;
                img.src = event.target.result;
            }

            function onLoadImage() {
                var width = params.width || this.width / this.height * params.height;
                var height = params.height || this.height / this.width * params.width;
                canvas.attr({
                    width: width,
                    height: height
                });
                canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
            }
        }
    };
}]);

/**绑定地区数据*/
MetronicApp.directive('ngBindArea', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        compile: function ngBindCompile(templateElement) {
            $compile.$$addBindingClass(templateElement);
            return function ngBindLink(scope, element, attr) {
                $compile.$$addBindingInfo(element, attr.ngBind);
                element = element[0];
                scope.$watch(attr.ngBindArea, function ngBindWatchAction(value) {
                    if (value == null || angular.isUndefined(value)) {
                        element.textContent = '';
                    } else if (value.province) {
                        var val = value.province;
                        if (value.city && value.city != value.province && value.city != value.county) {
                            val += ' - ' + value.city;
                        }
                        if (value.county != undefined && value.county != null && value.county != '' && value.county != "undefined") {
                            val += ' - ' + value.county;
                        }
                        element.textContent = val;
                    } else {
                        element.textContent = value;
                    }
                });
            };
        }
    };
}]);
/**绑定数据*/
MetronicApp.directive('ngBindWeek', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        compile: function ngBindCompile(templateElement) {
            $compile.$$addBindingClass(templateElement);
            return function ngBindLink(scope, element, attr) {
                $compile.$$addBindingInfo(element, attr.ngBind);
                element = element[0];
                scope.$watch(attr.ngBindWeek, function ngBindWatchAction(value) {
                    if (value == null || angular.isUndefined(value)) {
                        element.textContent = '';
                    } else {

                        var weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
                        element.textContent = weekdays[value];
                    }
                });
            };
        }
    };
}]);
/**
 * ng-model日期数据格式化指令
 **/
MetronicApp.directive('ejpDateformat', ['$filter', function ($filter) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attr, ngModelCtrl) {
            ngModelCtrl.$formatters.push(function (modelValue) {
                if (modelValue == undefined) {
                    return '';
                } else if (angular.isDate(modelValue)) {
                    return $filter('date')(modelValue, (attr.ejpDateformat == '') ? 'yyyy-MM-dd' : attr.ejpDateformat);
                } else if (angular.isNumber(modelValue)) {
                    return $filter('date')(new Date(modelValue), (attr.ejpDateformat == '') ? 'yyyy-MM-dd' : attr.ejpDateformat);
                } else {
                    return modelValue;
                }
            });
        }
    };
}]);

/**
 * 条件必输入项指令
 **/
MetronicApp.directive('ifrequired', ["$parse", function ($parse) {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, elem, attr, ctrl) {
            if (!ctrl) return;

            scope.$watch(attr.ifrequired, function (value, oldValue, _scope) {
                //console.log("监听值："+value);
                //重置当前控件
                ctrl.$setPristine();
                ctrl.$setUntouched();

                if (!value) {
                    /**此处需要综合考虑：条件变化后，是否清除当前控件的数据（可能是加载的数据或者初始化数据）*/
                    ctrl.$setViewValue(Number.NaN);
                    //ctrl.$modelValue= Number.NaN;
                    //ctrl.$$rawModelValue= undefined;
                }
                ctrl.$valid = true;
                ctrl.$invalid = false;

                ctrl.$validate();
            });

            ctrl.$validators.ifrequired = function (modelValue, viewValue) {
                var ifrequired = scope.$eval(attr.ifrequired);
                if (ifrequired) {
                    return !ctrl.$isEmpty(viewValue);
                } else {
                    return true;
                }
            };

            attr.$observe('ifrequired', function (value) {
                //console.log("观察值："+value);
                ctrl.$validate();
            });
        }
    };
}]);

/**
 * 日期判断的指令(判断日期在传入的日期之后)
 **/
MetronicApp.directive('gtDate', function () {
    function toDate(val) {
        if (angular.isDate(val)) {
            return val;
        } else if (angular.isString(val)) {
            return new Date(val.replace(/-/g, "/"));
        } else if (angular.isNumber(val)) {
            return new Date(val);
        } else {
            throw new Error("转换异常！");
        }

    }

    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, elem, attr, ctrl) {
            if (!ctrl) return;

            scope.$watch(attr.gtDate, function () {
                ctrl.$validate();
            });

            ctrl.$validators.gtDate = function (modelValue, viewValue) {
                var ltDate = scope.$eval(attr.gtDate);
                if (modelValue == undefined || ltDate == undefined) {
                    return false;
                } else {
                    return toDate(modelValue).getTime() > toDate(ltDate).getTime();
                }
            };
            attr.$observe('gtDate', function () {
                ctrl.$validate();
            });
        }
    };
});


/**
 * 判断密码是否相同
 **/
MetronicApp.directive('pwdSame', function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, elem, attr, ctrl) {
            if (!ctrl) return;

            ctrl.$validators.pwdSame = function (modelValue, viewValue) {
                var newPwd = scope.$eval(attr.pwdSame);
                if (modelValue == undefined || newPwd == undefined) {
                    return false;
                } else {
                    var new_pwd = newPwd;
                    var pwd_two = modelValue;
                    return pwd_two == new_pwd;
                }
            };
            attr.$observe('pwdSame', function () {
                ctrl.$validate();
            });
        }
    };
});
/**
 * 判断两个输入框的值是相同的<br>
 * <br>
 * 属性 no : 表示完全不一样，不区分是否为 null 或者为 "";<br>
 * 属性 not: 表示不相同，若其中一项为 null 或者为 ""时，返回true;<br>
 */
MetronicApp.directive('same', function () {

    function isBlank(val) {
        return val == undefined || val == null || val == "";
    }

    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, elem, attr, ctrl) {
            if (!ctrl) return;

            scope.$watch(attr.same, function () {
                ctrl.$validate();
            })

            ctrl.$validators.same = function (modelValue, viewValue) {
                var val = scope.$eval(attr.same);

                if (attr.hasOwnProperty("no")) {
                    return val != modelValue;
                } else if (attr.hasOwnProperty("not")) {
                    return (isBlank(val) || isBlank(modelValue) || val != modelValue);
                } else {
                    return val == modelValue;
                }
            };
            attr.$observe('same', function () {
                ctrl.$validate();
            });
        }
    };
});

/**
 * 金额对比指令
 **/
MetronicApp.directive('numCompaired', function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, elem, attr, ctrl) {
            if (!ctrl) return;

            scope.$watch(attr.numCompaired, function () {
                ctrl.$validate();
            })

            ctrl.$validators.numCompaired = function (modelValue, viewValue) {
                var ltNum = scope.$eval(attr.numCompaired);
                if (modelValue == undefined || ltNum == undefined) {
                    return false;
                } else {
                    var lt_Num = parseInt(ltNum);
                    var gt_Num = parseInt(modelValue);
                    console.log(gt_Num > lt_Num);
                    return gt_Num > lt_Num;
                }
            };
            attr.$observe('numCompaired', function () {
                ctrl.$validate();
            });
        }
    };
});
/**
 * 金额对比指令（后面的值与前面的值相比较）
 **/
MetronicApp.directive('numCom', function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, elem, attr, ctrl) {
            if (!ctrl) return;

            scope.$watch(attr.numCom, function () {
                ctrl.$validate();
            })

            ctrl.$validators.numCom = function (modelValue, viewValue) {
                var ltNum = scope.$eval(attr.numCom);
                if (Number.isFinite(modelValue) && Number.isFinite(ltNum)) {
                    var lt_Num = parseInt(ltNum);
                    var gt_Num = parseInt(modelValue);
                    if (lt_Num == 0 || gt_Num == 0) {
                        return true;
                    }
                    console.log(gt_Num > lt_Num);
                    return gt_Num > lt_Num;
                } else {
                    return true;
                }
            };
            attr.$observe('numCom', function () {
                ctrl.$validate();
            });
        }
    };
});

/**
 * 金额对比指令(前面的值与后面的值相比较)
 **/
MetronicApp.directive('beforeCom', function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, elem, attr, ctrl) {
            if (!ctrl) return;

            scope.$watch(attr.beforeCom, function () {
                ctrl.$validate();
            })

            ctrl.$validators.beforeCom = function (modelValue, viewValue) {
                var rtNum = scope.$eval(attr.beforeCom);
                if (Number.isFinite(modelValue) && Number.isFinite(rtNum)) {
                    var rt_Num = parseInt(rtNum);
                    var lt_Num = parseInt(modelValue);
                    if (lt_Num == 0 || rt_Num == 0) {
                        return true;
                    }
                    return rt_Num > lt_Num;
                } else {
                    return true;
                }
            };
            attr.$observe('beforeCom', function () {
                ctrl.$validate();
            });
        }
    };
});

/**
 * 手机号码验证
 **/
MetronicApp.directive('mobile', function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, elem, attr, ctrl) {
            if (!ctrl) return;
            ctrl.$validators.mobile = function (modelValue, viewValue) {
                var value = modelValue || viewValue;
                return ctrl.$isEmpty(value) || /^((13[0-9])|(147)|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/.test(value);
            };
            attr.$observe('mobile', function () {
                ctrl.$validate();
            });
        }
    };
});
/**
 * 身份证号码验证
 **/
MetronicApp.directive('idNumber', function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function (scope, elem, attr, ctrl) {
            if (!ctrl) return;
            ctrl.$validators.mobile = function (modelValue, viewValue) {
                var value = modelValue || viewValue;
                return ctrl.$isEmpty(value) || /^(\d{15}(?!\d)|(\d{17}(\d|X|x)(?!\w)))$/.test(value);
            };
            attr.$observe('idNumber', function () {
                ctrl.$validate();
            });
        }
    };
});

/**
 * 地区输入项校验指令
 **/
MetronicApp.directive('ejpAreaCheck', ['$http', function ($http) {
    return {
        require: '?ngModel',
        link: function (scope, elem, attrs, ctrl) {
            var validateUrl = attrs.ejpAreaCheck || 'city/validateCity.action';
            var validationErrorKey = "areaCheck";

            function isEmpty(str) {
                return null == str || typeof str === 'undefined' || str === '';
            }

            //监听
            scope.$watch(attrs.ngModel, function (modelValue) {
                ctrl.$setValidity("cityRequired", true);
                ctrl.$setValidity("provRequired", true);
                ctrl.$setValidity(validationErrorKey, true);

                if (angular.isUndefined(modelValue) || isEmpty(modelValue.province)) {
                    ctrl.$setValidity("provRequired", false);
                } else if (isEmpty(modelValue.city)) {
                    ctrl.$setValidity("cityRequired", false);
                    //console.log("假设【成功】")
                } else {
                    $http.post(validateUrl, modelValue).success(function (data, status) {
                        if (status === 200 && angular.isDefined(data) && data.result == "success") {
                            ctrl.$setValidity(validationErrorKey, true);
                            //console.log("校验【成功】")
                        } else {
                            ctrl.$setValidity(validationErrorKey, false);
                            //console.log("校验【失败】")
                        }
                    }).error(function (data, status) {
                        ctrl.$setValidity(validationErrorKey, false);
                        //console.log('通信【失败】');
                    });
                }
            }, true);
        }
    };
}]);

// 提交以后禁用按钮一段时间，防止重复提交
MetronicApp.directive('ejpNoMoreSubmit', ['$interval', function ($interval) {
    var tmpDire = {
        restrict: 'A',
        link: LinkFn
    };

    function LinkFn(mScope, mElement, mAttrs) {
        mElement.bind('click', function (event) {
            mElement[0].disabled = true;
            $interval(function () {
                mElement[0].disabled = false;
            }, 3000);
        })
    }

    return tmpDire;
}]);

// 校验时间应该在某个时间之前
MetronicApp.directive('ejpDateTerm', function () {
    var tmpDire = {
        restrict: 'A',
        require: 'ngModel',
        link: LinkFn
    };

    function LinkFn(mScope, mElement, mAttrs, mNgModel) {

        function dateAfterValidate(value) {

            var DATE_REG = /\w{4}-\w{2}-\w{2}/;
            var terminateDate = new Date(mAttrs.termDate);
            if (!DATE_REG.test(mAttrs.termDate)) {
                terminateDate = new Date(parseInt(mAttrs.termDate));
            }

            var beginDate = new Date(mAttrs.startDate);
            if (!DATE_REG.test(mAttrs.startDate)) {
                beginDate = new Date(parseInt(mAttrs.startDate));
            }
            var myDate = new Date(value);

            if (myDate < beginDate) {
                mNgModel.$setValidity('dateterm', true);
            } else {
                mNgModel.$setValidity('dateterm', false);
            }
            return value;
        }

        mNgModel.$parsers.push(dateAfterValidate);
    }

    return tmpDire;
});

// 校验时间在某个时间之后
MetronicApp.directive('beforeDate', function () {
    var tmpDire = {
        restrict: 'A',
        require: 'ngModel',
        link: LinkFn
    };

    function LinkFn(mScope, mElement, mAttrs, mNgModel) {

        function dateAfterValidate(value) {

            var DATE_REG = /\w{4}-\w{2}-\w{2}/;

            var beginDate = new Date(mAttrs.startDate);
            if (!DATE_REG.test(mAttrs.startDate)) {
                beginDate = new Date(parseInt(mAttrs.startDate));
            }

            var myDate = new Date(value);

            if (myDate >= beginDate) {
                mNgModel.$setValidity('datebefore', true);
            } else {
                mNgModel.$setValidity('datebefore', false);
            }
            return value;
        }

        mNgModel.$parsers.push(dateAfterValidate);
    }

    return tmpDire;
});

/**
 * 页面缓冲 进度条指令
 */
MetronicApp.directive('loadPageData', ['$interval', function ($interval) {
    return {
        template: '<div class="blockUI blockMsg blockElement" style="z-index: 6011; position: absolute; padding: 0px; margin: 0px; width: 30%; top: 80%; left: 360px; text-align: center; color: rgb(0, 0, 0); border: 0px; cursor: wait;">'
        + '   <div class="loading-message loading-message-boxed">'
        + '       <img src="assets/global/img/loading-spinner-grey.gif" align="" />'
        + '       <span>&nbsp;&nbsp;拼命加载中...</span>'
        + '   </div>'
        + '</div>',
        restrict: "E",
        replace: true
    }
}]);

MetronicApp.directive('submitLoad', ['$interval', function ($interval) {
    return {
        template: '<div class="blockUI blockMsg blockElement" style="z-index: 2011; position: absolute; padding: 0px; margin: 0px; width: 30%; top: 80%; left: 360px; text-align: center; color: rgb(0, 0, 0); border: 0px; cursor: wait;">'
        + '   <div class="loading-message loading-message-boxed">'
        + '       <img src="assets/global/img/loading-spinner-grey.gif" align="" />'
        + '       <span>&nbsp;&nbsp;提交中,请耐心等待...</span>'
        + '   </div>'
        + '</div>',
        restrict: "E",
        replace: true
    }
}]);

//检测会员标签名称是否已经使用 
MetronicApp.directive('ejpValidTag', ['$http', '$q', function ($http, $q) {
    var tmpDire = {
        restrict: 'A',
        require: 'ngModel',
        link: link
    };

    function link(scope, element, attrs, ctrl) {

        ctrl.$asyncValidators.ejpValidTag = function (modelValue, viewValue) {
            // can not be null
            var counter = 0;
            var oriId = scope.tagUser.id;

            if (ctrl.$isEmpty(modelValue)) {
                return $q.when();
            }

            var usedList = [];
            var def = $q.defer();

            var req = {
                url: "cityTag/findAllCityTagByCity",
                method: 'POST',
                data: {
                    city: scope.tagUser.city
                }
            };

            $http(req).then(successCb, failCb);

            function successCb(res) {
                if (res.data.result === 'success') {
                    usedList = [].concat(res.data.datas.dataList);
                    angular.forEach(usedList, function (item) {
                        if (item.id != oriId && item.tagName === modelValue) {
                            counter++;
                        }
                    });

                    console.log(usedList);

                    if (counter < 1) {
                        def.resolve();
                    } else {
                        def.reject();
                    }
                } else {
                    console.log("failed get all city tag of ", scope.tagUser.city, res);
                }
            }

            function failCb(res) {
                console.log("failed get all city tag of ", scope.tagUser.city, res);
            }

            return def.promise;
        }
    }

    return tmpDire;
}]);

MetronicApp.directive('refreshCollection', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        require: ['select', 'ngModel'],
        compile: function ngBindCompile($element, $attr) {
            var match = $attr.refreshCollection.match(/^\s*([\s\S]+?)\s+by\s+([\s\S]+?)?\s*$/);

            if (!match) {
                throw new Error("Expected expression in form of \"refreshFn by param\".");
            }

            var refreshFn = $parse(match[1] || '');
            var param = match[2];

            return function (scope, element, attrs, ctrl) {
                var unWatch = scope.$watch(param, function (nValue, oValue) {
                    ctrl[1].$setViewValue(Number.NaN);
                    if (angular.isDefined(nValue)) {
                        refreshFn(scope)(nValue);
                    }
                }, true/*此处性能比较差*/);
            };
        }
    };
}]);

/**
 * 数值过滤
 */
MetronicApp.directive('ejpNumberFilter', ['$filter', function ($filter) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attr, ngModelCtrl) {
            var onf = ngModelCtrl.$formatters.pop();
            ngModelCtrl.$formatters.push(function (modelValue) {
                if (modelValue == undefined) {
                    return '';
                }
                if (attr.ejpNumberFilter == '' || !isFinite(modelValue) || angular.isObject(modelValue)) {
                    return modelValue;
                } else {
                    return new Number(modelValue).toFixed(attr.ejpNumberFilter);
                }
            });
            ngModelCtrl.$formatters.push(onf);
        }
    };
}]);

/**金额校验*/
MetronicApp.directive('priceFormat', function () {
    return {
        restrict: 'A',
        scope: {
            price: '='
        },
        link: function ($scope, element, attrs) {

            element.bind('keyup', function () {
                var regStrs = [
                    ['^0(\\d+)$', '$1'], //禁止录入整数部分两位以上，但首位为0
                    ['[^\\d\\.]+$', ''], //禁止录入任何非数字和点
                    ['\\.(\\d?)\\.+', '.$1'], //禁止录入两个以上的点
                    ['^(\\d+\\.\\d{2}).+', '$1'] //禁止录入小数点后两位以上
                ];
                for (var i = 0; i < regStrs.length; i++) {
                    var reg = new RegExp(regStrs[i][0]);
                    this.value = this.value.replace(reg, regStrs[i][1]);
                }
            });
            element.bind('blur', function () {
                var v = this.value;
                if (v === '') {
                    v = '0.00';
                } else if (v === '0') {
                    v = '0.00';
                } else if (v === '0.') {
                    v = '0.00';
                } else if (/^0+\d+\.?\d*.*$/.test(v)) {
                    v = v.replace(/^0+(\d+\.?\d*).*$/, '$1');
                    //v = inp.getRightPriceFormat(v).val;
                } else if (/^0\.\d$/.test(v)) {
                    v = v + '0';
                } else if (!/^\d+\.\d{2}$/.test(v)) {
                    if (/^\d+\.\d{2}.+/.test(v)) {
                        v = v.replace(/^(\d+\.\d{2}).*$/, '$1');
                    } else if (/^\d+$/.test(v)) {
                        v = v + '.00';
                    } else if (/^\d+\.$/.test(v)) {
                        v = v + '00';
                    } else if (/^\d+\.\d$/.test(v)) {
                        v = v + '0';
                    } else if (/^[^\d]+\d+\.?\d*$/.test(v)) {
                        v = v.replace(/^[^\d]+(\d+\.?\d*)$/, '$1');
                    } else if (/\d+/.test(v)) {
                        v = v.replace(/^[^\d]*(\d+\.?\d*).*$/, '$1');
                        //ty = false;
                    } else if (/^0+\d+\.?\d*$/.test(v)) {
                        v = v.replace(/^0+(\d+\.?\d*)$/, '$1');
                        //ty = false;
                    } else {
                        v = '0.00';
                    }
                }
                this.value = v;
            });
        }
    }

});

//number校验
MetronicApp.directive('numberFormat', function () {
    return {
        restrict: 'A',
        scope: {
            price: '='
        },
        link: function ($scope, element, attrs) {
            element.bind('keyup', function () {
                var regStrs = [
                    ['^0(\\d+)$', '$1'], //禁止录入整数部分两位以上，但首位为0
                    ['[^\\d\\.]+$', ''] //禁止录入任何非数字和点
                ];
                for (var i = 0; i < regStrs.length; i++) {
                    var reg = new RegExp(regStrs[i][0]);
                    this.value = this.value.replace(reg, regStrs[i][1]);
                }
            });
            element.bind('blur', function () {
                var v = this.value;
                if (v === '') {
                    v = '0';
                } else if (v === '0') {
                    v = '0';
                } else if (v === '0.') {
                    v = '0';
                } else if (/^0+\d+\.?\d*.*$/.test(v)) {
                    v = v.replace(/^0+(\d+\.?\d*).*$/, '$1');
                    //v = inp.getRightPriceFormat(v).val;
                } else if (/^0\.\d$/.test(v)) {
                    v = v;
                } else if (!/^\d+\.\d{2}$/.test(v)) {
                    if (/^\d+\.\d{2}.+/.test(v)) {
                        v = v.replace(/^(\d+\.\d{2}).*$/, '$1');
                    } else if (/^\d+$/.test(v)) {
                        v = v;
                    } else if (/^\d+\.$/.test(v)) {
                        v = v;
                    } else if (/^\d+\.\d$/.test(v)) {
                        v = v;
                    } else if (/^[^\d]+\d+\.?\d*$/.test(v)) {
                        v = v.replace(/^[^\d]+(\d+\.?\d*)$/, '$1');
                    } else if (/\d+/.test(v)) {
                        v = v.replace(/^[^\d]*(\d+\.?\d*).*$/, '$1');
                        //ty = false;
                    } else if (/^0+\d+\.?\d*$/.test(v)) {
                        v = v.replace(/^0+(\d+\.?\d*)$/, '$1');
                        //ty = false;
                    } else {
                        v = '0';
                    }
                }
                this.value = v;
            });
        }
    }

});
/**
 * 数值/金额输入框
 *
 **/
MetronicApp.directive('numeric', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function ($scope, element, attr, ctrl) {

            var fraction = parseInt(attr.fraction, 10);
            var NUMBER_REGEXP = function () {
                if (fraction > 0) {//(可输入)小数
                    if (attr.hasOwnProperty("negative")) {
                        //正负数
                        return /^\s*-?(0|[1-9]\d*)?(\.\d*)?\s*$/;
                    } else {
                        //正数
                        return /^\s*(0|[1-9]\d*)?(\.\d*)?\s*$/;
                    }
                } else {//整数
                    if (attr.hasOwnProperty("negative")) {
                        //正负数
                        return /^\s*-?[1-9]\d*\s*$/;
                    } else {
                        //正数
                        return /^\s*[1-9]\d*\s*$/;
                    }
                }
            }();

            ctrl.$validators.numeric = function (value) {
                if (ctrl.$isEmpty(value) || angular.isUndefined(value)) {
                    return true;
                } else {
                    var res = NUMBER_REGEXP.exec(value);
                    if (res == null) {
                        return false;
                    } else if (res.length == 3) {
                        if (res[2] === undefined) {
                            return true;
                        } else {
                            return res[2].length <= fraction + 1;
                        }
                    } else {
                        return true;
                    }
                }
            };

            if (attr.gt) {
                var minVal;
                ctrl.$validators.gt = function (value) {
                    return ctrl.$isEmpty(value) || angular.isUndefined(minVal) || value > minVal;
                };

                attr.$observe('gt', function (val) {
                    if (angular.isDefined(val) && !angular.isNumber(val)) {
                        val = parseFloat(val, 10);
                    }
                    minVal = isNumber(val) && !isNaN(val) ? val : undefined;
                    // TODO(matsko): implement validateLater to reduce number of
                    // validations
                    ctrl.$validate();
                });
            }

            if (attr.lt) {
                var maxVal;
                ctrl.$validators.lt = function (value) {
                    return ctrl.$isEmpty(value) || angular.isUndefined(maxVal) || value < maxVal;
                };

                attr.$observe('lt', function (val) {
                    if (angular.isDefined(val) && !angular.isNumber(val)) {
                        val = parseFloat(val, 10);
                    }
                    maxVal = isNumber(val) && !isNaN(val) ? val : undefined;
                    // TODO(matsko): implement validateLater to reduce number of
                    // validations
                    ctrl.$validate();
                });
            }
        }
    };
});


// 验证码指令 wr
MetronicApp.directive('validate', function () {
    var validateDri = {
        restrict: 'E',
        template: "<img id='imgObj'  ng-src='{{code}}' ng-click='changeImg()' />",
        link: functionLink
    };

    function functionLink($scope, element, attrs) {
        $scope.code = 'code';
        element.css("width", "102");
        element.css("height", "42");
        element.bind("mouseenter", function () {
            element.css("cursor", "pointer");
        });
        $scope.changeImg = function () {
            $scope.code = chgUrl($scope.code);
            console.log($scope.code);
        }
    };

    function chgUrl(url) {
        var timestamp = (new Date()).valueOf();
        url = url.substring(0, 4);
        if ((url.indexOf("&") >= 0)) {
            url = url + "×tamp=" + timestamp;
        } else {
            url = url + "?timestamp=" + timestamp;
        }
        return url;
    }

    return validateDri;
});

/**输出单条规模信息*/
MetronicApp.directive('stackTrace', function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            item: '='
        },
        template: "<div style=\"margin-left:20px\">" +
        "at <span data-ng-bind=\"item.claSS\"></span>.<span data-ng-bind=\"item.method\"></span>(" +
        "<span data-ng-if=\"item.file != null\">" +
        "	<span data-ng-bind=\"item.file\"></span>" +
        "	<span data-ng-if=\"item.line > -1\">:<span data-ng-bind=\"item.line\"></span></span>" +
        "</span>" +
        "<span data-ng-if=\"item.file == null\">Unknown Source</span>)" +
        "</div>"
    };
});

/**输出异常信息*/
MetronicApp.directive('throwable', function () {
    return {
        restrict: "E",
        replace: true,
        scope: {
            item: '='
        },
        template: "<div>"
        + "<div><span data-ng-bind=\"item.name\" style=\"color:red\"></span>:<span data-ng-bind=\"item.message\"></span></div>"
        + "<div data-ng-repeat=\"est in item.extendedStackTrace\">"
        + "    <stack-trace item=\"est\"></stack-trace>"
        + "</div>"
        + "</div>"
    };
});

MetronicApp.directive('onlyNumber', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, linkfn) {
            element.on("keypress", function (event) {
                return (47 < event.keyCode && event.keyCode < 58);
            });
        }
    }
});

// 限制输入数字
// num-limit = "value"
// 属性num-minus,如果为true表示可以为负值
// value 表示可以接受的小数位数，如果为0表示只能输入整数
MetronicApp
    .directive('numLimit', ['$log', function ($log) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function (scope, ele, attr, ctrl) {
                if (!ctrl) return;

                var length = parseInt(attr.numLimit);
                var canMinus = (parseInt(attr.numMinus) === 1);

                if (!isNaN(length) && !angular.isNumber(length) || length < 0) {
                    $log.warn('num maxlengh need length');
                    length = 0;
                }

                scope.$watch(attr.ngModel, function (newValue, oldValue) {

                    if (!newValue) return;

                    if (!angular.isNumber(length) || length < 0) {
                        $log.warn("format number must has a length");
                        length = 0;
                    }

                    var tmp = transform(newValue);

                    // 改变scope的属性
                    changePro(tmp);
                });

                /**
                 *格式化newValue为需要的格式
                 *@param newValue
                 */
                function transform(newValue) {

                    newValue = newValue + '';

                    var tmp;

                    if (length > 0 && newValue.indexOf('.') > 0) {
                        var tmpArr = newValue.split(".");
                        tmp = format(tmpArr[0]) + '.' + tmpArr[1].substring(0, length);
                    } else {
                        tmp = format(newValue.split('.')[0]);
                    }


                    return tmp;
                }


                /**
                 *去除可能开始的0
                 * @param arr,字符串,整数形式
                 */
                function format(arr) {
                    if (!arr || arr.length < 2) return arr;
                    // 是否负值
                    var minus = false;
                    var start = 0;
                    var res = [];
                    // 返回结果
                    if (arr[0] === '-') {
                        minus = true;
                        start = 1;
                    }

                    for (var ii = arr.length; start < ii; start++) {
                        if (arr[start] == '0') {
                            continue;
                        } else {
                            res = res.concat(arr.slice(start, arr.length));
                            break;
                        }
                    }

                    res = res.length > 0 ? res : [0];

                    $log.debug('ori value ', arr, ' after format (without minu maybe)', res);
                    return minus && canMinus ? '-' + res : res;
                }

                // 改变scope的属性,并改变view值
                function changePro(value) {
                    var exp = attr.ngModel + '=' + value;
                    ele.val(value);
                    $log.info('expression to evaluate is ', exp);
                    scope.$eval(exp);
                }
            }
        };
    }])

/**
 * 页面模板
 */
MetronicApp.directive('pageBox', [function () {
    return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        templateUrl: "views/pageTemplates/pageBox.html"
    };
}]);

/**
 * 页面头指令
 */
MetronicApp.directive('pageTop', [function () {
    return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        templateUrl: "views/pageTemplates/pageTop.html"
    };
}]);

/**
 * 页面主体框
 **/
MetronicApp.directive('pageContent', [function () {
    return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        templateUrl: "views/pageTemplates/pageContent.html"
    };
}]);
/**
 *页面搜索框
 **/
MetronicApp.directive('pageSearch', [function () {
    return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        templateUrl: "views/pageTemplates/pageSearch.html",
    };
}]);

/**
 * 日期选择指令
 */
MetronicApp.directive("ejpDatepicker", ['$filter', function ($filter) {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attr, ctrl) {

            var format = (attr.ejpDatepicker == '') ? 'yyyy-MM-dd' : attr.ejpDatepicker;

            ctrl.$formatters.push(function (modelValue) {
                if (modelValue == undefined) {
                    return '';
                } else if (angular.isDate(modelValue)) {
                    return $filter('date')(modelValue, format);
                } else if (angular.isNumber(modelValue)) {
                    return $filter('date')(new Date(modelValue), format);
                } else {
                    return modelValue;
                }
            });

            element.datepicker({
                inline: true,
                rtl: Metronic.isRTL(),
                autoclose: true,
                dateFormat: format,
                onSelect: function (dateText) {
                    var modelPath = $(this).attr('ng-model');
                    putObject(modelPath, scope, dateText);
                    scope.$apply();
                }
            });
        }
    }
}]);

//添加限制字符长度css样式指令
MetronicApp.directive("restrictChars", function () {
    return {
        restrict: 'A',
        link: function (scope, element, attrs, ctrl) {
            element.css('word-break', 'keep-all');
            element.css('white-space', 'nowrap');
            element.css('overflow', 'hidden');
            element.css('text-overflow', 'ellipsis');

        }
    }
})


/**
 * 路径适配器<br>
 *
 * 根据系统配置文件，适配指令所在元素的路径信息
 **/
MetronicApp.directive("ejpInfoAdapter", ['DictionaryService', '$rootScope', '$state', function (DictionaryService, $rootScope, $state) {
    return {
        restrict: 'A',
        link: {
            pre: function (scope, element, attr, ctrl) {
                DictionaryService.getAppInfo().then(function (resp) {
                    if (resp.result == "success") {
                        if (attr.hasOwnProperty("path")) {
                            $state.appInfo = resp.data;
                            var idx = attr.src.indexOf(attr.path);
                            element.attr("src", attr.src.substring(0, idx) + resp.data.appName + attr.src.substr(idx));
                        } else if (attr.hasOwnProperty("appcnname")) {
                            if (attr.appcnname == '') {
                                element.text(resp.data.appCnName);
                            }
                        }
                    }
                });
            }
        }
    }
}]);

//输入框模板
MetronicApp.directive('inputTemplate', function () {
    return {
        restrict: "E",
        replace: true,
        transclude: true,
        scope: {
            labelname: '@',
            isrequired: '=',
        },
        template: "	<div class=\"form-group\">\n" +
        "		<label class=\"col-md-3 control-label\"> <span ng-bind=\"labelname\"></span> <span class=\"required\" ng-show=\"isrequired\"> * </span></label>\n" +
        "		<div class=\"col-md-4\">\n" +
        "			<div data-ng-transclude></div>\n" +
        "		</div>\n" +
        "	</div>\n"
    };
});

MetronicApp.directive('booleanRadio', [function () {

    return {
        restrict: "E",
        require: 'ngModel',
        scope: {
            radioValue: '=ngModel'
        },
        link: function (scope, element, attr, ngModel) {
            scope.isChecked = function (id) {
                return id == scope.radioValue;
            };
            scope.selectItem = function (id) {
                scope.radioValue = id;
            }
        },
        controller: ['$scope', function ($scope) {
            $scope.items = [{id: true, text: "是"}, {id: false, text: "否"}];
        }],
        template: '<div class="radio-list"><label class="radio-inline" ng-repeat="item in items" ng-click="selectItem(item.id)">' +
        '<div class="radio"><span ng-class="{\'checked\':isChecked(item.id)}"></span></div>&nbsp;{{item.text}}</label></div>'
    }

}]);