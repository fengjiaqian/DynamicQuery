/**
 * 货位库存
 */
define(['app'], function (app) {


    app.service('WarehouseBatchInventoryService', ['QHttp', function (QHttp) {
        /**
         * 列表
         */
        this.getBatchInventoryList = function (data) {
            return QHttp.request({
            	method: 'post',
                url: "/listBatchInventoryByStoreId",
                data:data
            });
        };
        /**
         * 变更明细
         */
        this.getBatchInventoryDetail = function (data) {
            return QHttp.request({
            	method: 'post',
                url: '/listProductStoreBatchChangeRecord',
                data:data
            });
        };
        /**
         * 库存修改
         */
        this.modWarehouseBatchInventory = function (data) {
            return QHttp.request({
            	method: 'post',
                url: '/updateProductStoreBatch',
                data:data
            });
        };
    }]);
});