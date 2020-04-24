/**
 *  同步下推订单
 */
define(['app'], function (app) {


    app.service('HandPushDownOrderService', ['QHttp', function (QHttp) {
        /**
         * 同步下推订单
         */
        this.push = function (so) {
        	 return QHttp.request({
                 url: "/addPushOrder",
                 method: 'post',
                 data:so
             });
        };

    }]);
});