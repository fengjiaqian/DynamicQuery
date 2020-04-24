/**
 * 配送系数
 */
define(['app'], function (app) {


    app.service('DeliveryFactorService', ['QHttp', function (QHttp) {
        /**
         * 产品SKU信息查询
         */
        this.getSkuList = function (data) {
            return QHttp.request({
                url: "getProductSkuInfo",
                data:data
            });
        };
        /**
         * 获取产品配送系数
         */
        this.getDeliveryFactor = function (id) {
            return QHttp.request({
            	method: 'get',
                url: "getProductInfoBySku/"+id,
            });
        };
        /**
         * 产品配送系数编辑
         */
        this.editDeliveryFactor = function (data) {
            return QHttp.request({
                url: "addDistributionPercent",
                data:data
            });
        };
        //配送系数日志
        this.getLogo = function (data) {
            return QHttp.request({
                url: "getDistributionPercentRecord",
                data:data
            });
        };
        
        
        
    }]);
});