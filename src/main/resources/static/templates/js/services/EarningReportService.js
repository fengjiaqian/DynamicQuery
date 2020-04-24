/**
 * 业绩报表
 */
define(['app'], function (app) {


    app.service('EarningReportService', ['QHttp', function (QHttp) {
        /**
         * 司机业绩报表列表
         */
        this.getDriverReport = function (data) {
            return QHttp.request({
                url: "/driverEarningReport",
                data:data
            });
        };
        /**
         * 司机业绩报表_同步
         */
        this.reportCalculation = function (data) {
            return QHttp.request({
                url: "/calcMotormanReport",
                async:false,
                data:data
            });
        };
        /**
         * 通过城市id获取当前仓库列表
         */
        this.getWareHouseList = function (data) {
            return QHttp.request({
                url: "/findAllWarehouseByCity",
                data:data
            });
        };
        /**
         *搬运工业绩报表列表
         */
        this.getPorterReport = function (data) {
            return QHttp.request({
                url: "/porterEarningReport",
                data:data
            });
        };
        /**
         *仓管业绩报表列表
         */
        this.getStoreKeeperReport = function (data) {
            return QHttp.request({
                url: "/storeKeeperEarningReport",
                data:data
            });
        };
        /**
         *业绩报表详情
         */
        this.getEarningReportDetail = function (data) {
            return QHttp.request({
                url: "/earningReportDetail",
                data:data
            });
        };
        /**
         *门店结算报表
         */
        this.getShopSettleReport = function (data) {
            return QHttp.request({
                url: "/shopexternalSettlementResult",
                data:data
            });
        };
        /**
        获取门店列表
         */
        this.getShopsById = function (cityId) {
            return QHttp.request({
            	method: 'get',
                url: "/findShopExternalCombobox/"+cityId
            });
        };
        /**
        获取门店结算报表-表头
         */
        this.getShopSettleReportRules = function () {
            return QHttp.request({
            	method: 'get',
                url: "/queryShopexternalSettlementRules"
            });
        };
        /**
        手动获取门店报表数据按钮
         */
        this.handShopSettleReport = function (data) {
            return QHttp.request({
                url: "/calc",
                data:data
            });
        };
        
        
    }]);
});