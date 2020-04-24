/**
 * 仓库信息同步
 */
define(['app'], function (app) {


    app.service('WarehouseInfoSynService', ['QHttp', function (QHttp) {
        /**
         * 仓库信息同步
         */
        this.syn = function () {
            return QHttp.request({
                url: "/listAllWarehouseForSupplychain",
                //url: "/processBatchNo",
            });
        };

    }]);
});