/**
 * 初始化会员收货地址经纬度
 */
define(['app'], function (app) {


    app.service('AddressHandlingService', ['QHttp', function (QHttp) {
        /**
         * 查询列表服务
         */
        this.send = function (cityId) {
            return QHttp.request({
            	method: 'get',
                url: "/initLocation/"+cityId,
            });
        };

    }]);
});