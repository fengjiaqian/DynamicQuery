define(['app'], function (app) {

    app.service('UserPrivilegeService', ['QHttp', function (QHttp) {
        var self = this;
        /**获取有权限访问的url（包含Button，Menu，Page）*/
        /**从服务端获取权限数据*/
        this.getUserPrivilege = function () {
            return QHttp.request({
                method: 'get',
                url: 'user/findUserPrivilegeList'
            });
        }
        /**有权限的路由*/
        this.getAllCanAccessUrl = function () {
            refreshPrivilege();
            var privilegeList = localStorage.getItem("PrivilegeList");
            if (privilegeList) {
                return angular.fromJson(privilegeList);
            }
            return null;
        }
        /**有权限的按钮*/
        this.getAllPrivilegeButton = function () {
            refreshPrivilege();
            var privilegeList = localStorage.getItem("privilegeButton");
            if (privilegeList) {
                return angular.fromJson(privilegeList);
            }
            return null;
        }
        /**有权限的菜单树*/
        this.getMenuTree = function () {
            refreshPrivilege();
            var privilegeList = localStorage.getItem("MenuTree");
            if (privilegeList) {
                return angular.fromJson(privilegeList);
            }
            return null;
        }
        function refreshPrivilege() {
            if (!self.loaded) {
                self.getUserPrivilege().then(function (data) {
                    self.storePrivilegeData(data.data);
                });
            }
        }

        /**存储权限数据*/
        this.storePrivilegeData = function (data) {
            self.loaded = true;

            var privilegeList = [];
            var privilegeButton = [];
            angular.forEach(data, function (item) {
                if (item.url) {
                    if (item.privilegeType === 'Button') {
                        privilegeButton.push({
                            privilegeType: item.privilegeType,
                            privilegeCode: item.privilegeCode,
                            url: item.url
                        });
                    } else {
                        privilegeList.push({
                            privilegeType: item.privilegeType,
                            privilegeCode: item.privilegeCode,
                            url: item.url
                        });
                    }

                }
                //考虑到后端返回的数据不规律，此处不要加 else
                if (item.sonIndex) {
                    //递归收集子url
                    conllectPrivilege(privilegeList, item);
                }
            });

            privilegeList.push({
                privilegeType: '',
                privilegeCode: '',
                url: '/error.html'
            });

            localStorage.setItem("MenuTree", angular.toJson(data));
            localStorage.setItem("PrivilegeList", angular.toJson(privilegeList));
            localStorage.setItem("privilegeButton", angular.toJson(privilegeButton));


            //递归收集当前角色所有能访问的列表
            function conllectPrivilege(arr, obj) {
                if (obj.sonIndex) {
                    angular.forEach(obj.sonIndex, function (sonUrl) {
                        //if(sonUrl.url){ //这个判断可以不要，保留只是为了privilegeType==Button时强制填写url
                        if (sonUrl.privilegeType === 'Button') {
                            privilegeButton.push({
                                privilegeType: sonUrl.privilegeType,
                                privilegeCode: sonUrl.privilegeCode,
                                url: sonUrl.url
                            });
                        } else {
                            arr.push({
                                privilegeType: sonUrl.privilegeType,
                                privilegeCode: sonUrl.privilegeCode,
                                url: sonUrl.url
                            });
                        }
                        //}
                        if (sonUrl.sonIndex) {
                            conllectPrivilege(arr, sonUrl);
                        }
                    });
                } else {
                    return;
                }
            }
        }
    }]);

});