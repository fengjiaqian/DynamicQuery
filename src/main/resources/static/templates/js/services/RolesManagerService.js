define(['app'], function (app) {


    app.service('RolesManagerService', ['QHttp', function (QHttp) {
        /**
         * 查询城市下的所有用户
         */
        this.getList = function (data) {
            console.log(data)
            return QHttp.request({
                url: "/user/listAdminUserPageWithAuth",
                data: data,
                method:"POST",
            });
        };

        /**
         * 获取用户角色
         */
        this.getRoleList = function (data) {
            return QHttp.request({
                url: "/commonSelectOptionService/queryList ",
                data: data
            });
        };


        /**
         * 新增用户角色
         */
        this.addRole = function (data) {
            return QHttp.request({
                url: "/user/addAdminAuth",
                data: data
            });
        };

        /**
         * 删除用户角色
         */
        this.delRole = function (authId) {
            return QHttp.request({
                method: 'get',
                url: "/user/removeAdminAuth/" + authId,
                data: authId
            });
        };

        /**
         * 更新密码 lq说用修改密码的接口
         */
        this.updatePwd = function (data) {
            console.log(data)
            return QHttp.request({
                url: 'adminUser/changePasswordByAdmin.action',
                data: data
            });
        };

        // 获取角色授权信息
        this.getQueryRefList = function (data) {
            return QHttp.request({
                url: '/commonSelectOptionService/queryRefList',
                data: data
            });
        };


        // 获取仓库
        this.findWarehouseListByCityId = function (cityId) {
            return QHttp.request({
                method: 'get',
                url: '/warehouse/findJiuPiWarehouseListByCityId/' + cityId,
            });
        };

        // 配送员移除判断 authId 权限id / userId 用户id
        this.removeAdminAuthForDriver = function (authId, userId) {
            return QHttp.request({
                method: 'get',
                url: '/user/removeAdminAuthForDriver/' + authId + '/' + userId,
            });
        };


    }]);
});