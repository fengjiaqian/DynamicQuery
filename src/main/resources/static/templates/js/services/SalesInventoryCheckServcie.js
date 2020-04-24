/**
 * 校正销售库存
 */
define(['app'], function (app) {


    app.service('SalesInventoryCheckServcie', ['QHttp', function (QHttp) {
        /**
         * 校正销售库存
         */
        this.send = function (cityId) {
            return QHttp.request({
            	method: 'get',
                url: "/getProductInventoryByCityId/"+cityId
            });
        };

        /**
         * 销售库存预警
         */
        this.storeWarning = function (cityId) {
            return QHttp.request({
                method: 'get',
                url: "/storeWarning/processStoreWarningSchedule/"+cityId
            });
        };

    }]);
});