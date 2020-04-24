/**
 * 更改库存
 */
define(['app'], function (app) {


    app.service('WarehouseInventoryService', ['QHttp', function (QHttp) {
        /**
         * 列表
         */
        this.getList = function (data) {
            return QHttp.request({
            	method: 'post',
                url: "/getWarehouseList",
                data:data
            });
        };
        /**
         * 库存详情
         */
        this.inventoryDetail = function (data) {
            return QHttp.request({
            	method: 'post',
                url: '/getInventoryDetail',
                data:data
            });
        };
        /**
         * 库存修改
         */
        this.modWarehouseInventory = function (data) {
            return QHttp.request({
            	method: 'post',
                url: '/modWarehouseInventory',
                data:data
            });
        };
        /**
         * 通过skuId和warehouseId查询库存
         */
        this.queryInventory = function (data) {
            return QHttp.request({
            	method: 'get',
                url: '/getWarehouseInventory/'+data.productSkuId+'/'+data.warehouseId,
            });
        };
        /**
         * 库存转移
         */
        this.transferInventory = function (data) {
            return QHttp.request({
                url: '/warehouseInventoryTransfers',
                data:data
            });
            
        };

        /**
         * 库存变更明细修改
         */
        this.modWarehouseInventoryRecord = function (data) {
            return QHttp.request({
                method: 'post',
                url: '/modWarehouseInventoryRecord',
                data:data
            });
        };

    }]);
});