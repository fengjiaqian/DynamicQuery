/**
 * Created by feixiang on 2016/7/7.
 */
define(['app', 'directives/ModalDialogDirective'], function (app) {

    app.factory('ModalDialogFactory', ['$compile', '$animate', '$rootScope', '$q', '$state', '$timeout', function ($compile, $animate, $rootScope, $q, $state, $timeout) {
        var dialogTemplete = "<modal-dialog><div ng-include='options.url'></div></modal-dialog>";
        return {
            dialog: function (options) {
                var scope = options.scope || $rootScope.$new();
                scope.options = options;
                options.url = options.url || 'assets/js/directive/tpl/modal_confirm.html';
                options.title = options.title || '提示';
                options.btns = options.btns || [{
                        name: '确认',
                        cls: 'btn-primary',
                        action: angular.noop
                    }];
                options.autoClose = options.autoClose;
                var dialog = angular.element($compile(dialogTemplete)(scope));
                $animate.enter(dialog, angular.element(document.body));
                scope.closeDialog = function (data) {
                    var leave = $animate.leave(dialog);
                    if (options.callback) {
                        leave.then(function () {
                            options.callback(data);
                        });
                    }
                };
                scope.executeBefroeClose = function (fn) {
                    fn && scope.closeDialog(fn());
                };

                scope.closeDialogAndRoute = function (state) {
                    if ($state.current.name === state) {
                        window.scrollTo(0, 0);
                    } else {
                        $state.go(state);
                    }
                    scope.closeDialog();
                };

                if (options.autoClose) {
                    $timeout(function () {
                        scope.closeDialog()
                    }, 1500)
                }

                return dialog;
            },


            confirm: function (message) {
                var _this = this;
                return $q(function (resolve, reject) {
                    _this.dialog({
                        title: '确认',
                        content: message,
                        url: 'assets/js/directive/tpl/modal_confirm.html',
                        btns: [{
                            name: '取消',
                            cls: 'default',
                            action: function () {
                                reject();
                            }
                        }, {
                            name: '确认',
                            cls: 'primary',
                            action: function () {
                                resolve();
                            }
                        }]
                    });
                });
            },

            alert: function (message) {
                var _this = this;
                return $q(function (resolve) {
                    _this.dialog({
                        title: '提示',
                        content: message,
                        url: 'assets/js/directive/tpl/modal_confirm.html',
                        btns: [{
                            name: '确认',
                            cls: 'primary',
                            action: function () {
                                resolve();
                            }
                        }]
                    });
                });
            },

            toast: function (message) {
                var _this = this;
                return $q(function (resolve) {
                    _this.dialog({
                        title: '',
                        content: message,
                        autoClose: true,
                        url: 'assets/js/directive/tpl/toast.html',
                        action: function () {
                            resolve();
                        }
                    })
                })
            }
        };
    }]);

});