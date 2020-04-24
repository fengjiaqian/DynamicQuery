define(['app'], function (app) {


    app.service('ContentConfigurationService', ['QHttp', function (QHttp) {
        /**
         * 获取列表
         */
        this.getList = function (data) {
            return QHttp.request({
                url: "findContentList",
                data: data
            });

        };


        /**
         * 新增
         */
        this.addConfiguration = function (data) {
            return QHttp.request({
                url: "saveOrUpdate",
                data: data
            });
        };

        /**
         * 修改
         */
        this.edit = function (data) {
            return QHttp.request({
                url: "saveOrUpdate",
                data: data
            });

        };

        /**
         * 同步
         */
        this.syn = function (data) {
            return QHttp.request({
                url: "/templates/PurchaseInStock/SyncPurchaseInstockToSCM",
                data: data
            });

        };

        /**
         * 删除
         */
        this.del = function (id) {
            return QHttp.request({
                method: 'get',
                url: "/templates/deleteContentConfigurationById/" + id,
                data: id
            });
        }
    }]);
});