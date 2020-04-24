define(['app'], function (app) {

    app.service('UserService', ['QHttp', function (QHttp) {
        var userInfo = {};

        this.updateUserInfo = function (data) {
            userInfo = data;
        };

        this.getUserInfo = function () {
            return userInfo;
        };
        /*==================================================*/

        this.obtainUserInfo = function () {
            return QHttp.request({
                method: 'get',
                url: 'adminuser/getLoggedinUserInfo'
            });
        };
        /**获取全局会员类别*/
        this.getBizUserClass = function () {
            return QHttp.request({
                method: 'get',
                url: 'bizUserClass/findBizUserClassList'
            });
        };

        /**获取城市下的会员类别*/
        this.getBizUserClassInCity = function (cityId) {
            return QHttp.request({
                method: 'get',
                url: 'bizUserClass/findBizUserClassList/' + cityId
            });
        };

        /**获取登录用户详细信息*/
        this.getBizUserDetailInfo = function () {
            return QHttp.request({
                method: 'get',
                url: 'adminUser/getAdminUser.action'
            });
        };

        /**修改用户密码*/
        this.modifyUserPassword = function (arg) {
            return QHttp.request({
                url: 'adminUser/changePasswordByOldPassword.action',
                data: arg
            });
        };

        /**
         * 切换用户角色
         */
        this.switchUserRole = function (arg) {
            return QHttp.formRequest({
                url: 'adminuser/switchUserRole',
                data: arg
            });
        };

    }]);

});