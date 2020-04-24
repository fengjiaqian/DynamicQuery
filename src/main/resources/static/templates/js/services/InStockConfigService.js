define(['app'], function (app) {


    app.service('InStockConfigService', ['QHttp', function (QHttp) {
        /**
         * 获取列表
         */
        this.getList = function (data) {
            return QHttp.request({
                url: "findInStockConfigList",
                data: data
            });

        };


        /**
         * 新增
         */
        this.addInStockConfig = function (data) {
            return QHttp.request({
                url: "saveOrUpdateInStockConfig",
                data: data
            });
        };

        /**
         * 修改
         */
        this.edit = function (data) {
            return QHttp.request({
                url: "saveOrUpdateInStockConfig",
                data: data
            });
        };


        /**
         * 修改状态
         */

        this.editStatus = function (data) {
            return QHttp.request({
                url: "updateInStockConfigStatus",
                data: data
            });
        };

        /**
         * 删除
         */
        this.del = function (id) {
            return QHttp.request({
                method: 'get',
                url: "/templates/deleteInStockConfigById/" + id,
                data: id
            });
        };

        /**
         * 根据ID查询策略详情
         */
        this.getInStockConfigById = function (id) {
            return QHttp.request({
                method: 'get',
                url: "/templates/selectInStockConfigDTO/" + id,
                data: id
            });
        };

        /**
         * 获取统计类目
         */
        this.findCategorys = function () {
            return QHttp.request({
                url: "findCategorys/701",
                method: "post",
                data: {}
                // data: { cityId: "701" }//暂时写死为 701
            });

        };
    }]);
});