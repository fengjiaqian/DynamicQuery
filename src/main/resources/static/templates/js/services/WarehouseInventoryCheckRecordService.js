/**
 * 仓库库存校正记录
 */
define(['app'], function (app) {


    app.service('WarehouseInventoryCheckRecordService', ['QHttp', function (QHttp) {
        /**
         * 校正记录列表
         */
        this.listInventoryCheckRecord = function (data) {
            return QHttp.request({
            	method: 'post',
                url: "/listInventoryCheckRecord",
                data:data
            });
        };

        /**
         * 标记为“已处理”
         */
        this.markInventoryCheckRecord = function (data) {
            return QHttp.request({
            	method: 'post',
                url: '/markInventoryCheckRecord',
                data:data
            });
        };

        /**
         * 根据库存校正记录变更库存
         */
        this.modWarehouseInventoryByCheckRecord = function (data) {
            return QHttp.request({
                method: 'post',
                url: '/modWarehouseInventoryByCheckRecord',
                data:data
            });
        };

    }]);
});