/**
 * 销售库存预警
 */
define(['app'], function (app) {


    app.service('StoreWarningService', ['QHttp', function (QHttp) {
        /**
         * 销售库存预警明细
         */
        this.getList = function (data) {
            return QHttp.request({
            	method: 'post',
                url: "/storeWarning/listStoreWarning",
                data:data
            });
        };

    }]);
});