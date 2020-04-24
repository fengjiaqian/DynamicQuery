/**
 * 校正仓库库存
 */
define(['app'], function (app) {


    app.service('StoreInventoryCheckServcie', ['QHttp', function (QHttp) {
        /**
         * 校正仓库库存
         */
        this.send = function (cityId) {
            return QHttp.request({
            	method: 'get',
                url: "/getStoreInventoryByCityId/"+cityId,
            });
        };

    }]);
});