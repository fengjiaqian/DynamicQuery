/**
 * 快速下单
 */
define(['app'], function (app) {


    app.service('QuickOrderService', ['QHttp', function (QHttp) {
        /**
         * 查询列表服务
         */
        this.send = function (data) {
            return QHttp.request({
            	method: 'post',
                url: "/quicklyOrder/"+data.orderType,
                data:data.content
            });
        };

    }]);
});