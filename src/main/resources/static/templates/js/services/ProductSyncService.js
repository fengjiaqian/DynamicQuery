/**
 * 产品信息同步
 */
define(['app'], function (app) {


    app.service('ProductSyncService', ['QHttp', function (QHttp) {
        /**
         *根据SkuId校正
         */
        this.sendSku = function (cityId) {
            return QHttp.request({
            	method: 'get',
                url: "/productSyncBySku",
            });
        };
        /**
         *根据SkuId校正
         */
        this.sendInfo = function (cityId) {
            return QHttp.request({
                method: 'get',
                url: "/productSyncByInfo",
            });
        };
        /**
         * 产品信息初始化同步（知花知果）
         */
        this.initInfoByZhzg = function (count) {
            return QHttp.request({
                method: 'get',
                url: "/initProductInfoByZhzg/"+count,
            });
        };
        /**
         * 产品sku初始化同步（知花知果）
         */
        this.initSkuByZhzg = function (count) {
            return QHttp.request({
                method: 'get',
                url: "/initProductSkuByZhzg/"+count,
            });
        };
    }]);
});