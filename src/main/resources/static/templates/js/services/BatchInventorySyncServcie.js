/**
 * 货位库存同步
 */
define(['app'], function (app) {


    app.service('BatchInventorySyncServcie', ['QHttp', function (QHttp) {

        /**
         * 货位库存同步
         */
        this.send = function (data) {
            return QHttp.request({
            	method: 'post',
                url: "/syncBatchInventory",
                data: data
            });
        };

    }]);
});