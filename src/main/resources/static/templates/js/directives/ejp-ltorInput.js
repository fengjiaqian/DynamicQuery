(function (angular) {
    'use strict';
    angular.module('ejp-ltorInput', [])

        .directive('ejpLtorInput',
            ['$templateCache', '$compile', '$q', function (tplCache, $compile, $q) {
                //000011111111110000000000022222222220000000000000000000003333333333000000000000004444444444444440000000005555555555555550000000666666666666666000000000000000777777777700000000000000000008888888888
                var NG_OPTIONS_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/;

                return {
                    restrict: 'A',
                    require: 'ngModel',
                    //replace : true,
                    template: function (element, attr) {
                        var modelName = attr.ngModel;
                        var optionsExp = attr.ejpLtorInput;
                        var match;
                        if (!(match = optionsExp.match(NG_OPTIONS_REGEXP))) {
                            throw new Error(
                                "Expected expression in form of " +
                                "'_select_ (as _label_)? for (_key_,)?_value_ in _collection_'" +
                                " but got " + optionsExp);
                        }
                        var tpl = tplCache.get("views/templates/ltorInput.html");

                        var result = tpl.replace("{src-options}", optionsExp).replace("{target-options}", optionsExp.replace(match[7], modelName));

                        return result;
                    },
                    controller: 'ejpLtorInputCtrl',
                    compile: function (element, attr, ctrl) {
                        console.log("compile");
                        return {
                            pre: function (scope, element, attr, ctrl) {
                                console.log("pre");
                                $compile(element.contents())(scope);
                            },
                            post: function (scope, element, attr, ctrl) {
                                console.log("post");
                            }
                        };
                    }
                };
            }])
        .controller("ejpLtorInputCtrl", ["$scope", function ($scope) {

            $scope.toLeft = function () {

            };

            $scope.toRight = function () {

            };

            $scope.all2Left = function (event) {
                console.log(event);
            };
            $scope.all2Right = function (event) {
                console.log(event);
            };

            function doAll(src, target) {
                while (src.length > 0) {
                    target.push(src.shift());
                }
            }
        }])
        .run(["$templateCache", function ($templateCache) {
            $templateCache.put("views/templates/ltorInput.html",
                '<div class="input-group">' +
                '<select class="form-control" multiple="multiple" ng-click="toRight()" ng-options="{src-options}"></select>' +
                '<div class="input-group-addon">' +
                '	<div class="btn blue" data-ng-click="all2Right($event)"><i class="fa fa-angle-double-right" aria-hidden="true"></i></div><br>' +
                '	<div class="btn blue" data-ng-click="all2Left($event)"><i class="fa fa-angle-double-left" aria-hidden="true"></i></div>' +
                '</div>' +
                '<select class="form-control" multiple="multiple" ng-click="toLeft()" ng-options="{target-options}"></select>' +
                '</div>'
            );
        }]);
})(angular);
