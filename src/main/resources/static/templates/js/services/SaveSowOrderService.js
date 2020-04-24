define(['app'], function (app) {


    app.service('SaveSowOrderService', ['QHttp', function (QHttp) {
        /**
         * 仓库信息同步
         */
        this.saveSow = function (data) {
            return QHttp.request({
                url: "/saveSowOrderBySCOP",
                data:data
            });
        };

    }]);
});