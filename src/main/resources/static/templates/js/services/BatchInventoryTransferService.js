/**
 * 货位库存同步
 */
define(['app'], function (app) {


    app.service('BatchInventoryTransferService', ['QHttp', function (QHttp) {

        /**
         * 货位库存同步
         */
        this.send = function (data) {
            return QHttp.request({
            	method: 'post',
                url: "/batchInventoryTransfer",
                data: data
            });
        };

        /**
         * 新增退货移库单
         */
        this.addStoreTransferOrder = function (warehouseId) {
            return QHttp.request({
                method: 'get',
                url: "/addStoreTransferOrderByTH/"+ warehouseId
            });
        };

    }]);
});