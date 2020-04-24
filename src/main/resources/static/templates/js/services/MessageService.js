/**
 * 订单管理服务
 */
define(['app'], function (app) {


    app.service('MessageService', ['QHttp', function (QHttp) {
        /**
         * 查询列表服务
         */
        this.getMessageList = function (so) {
            return QHttp.request({
                url: "/ErrorMessage",
                data: so
            });
        };
        /**
         * 重新发送
         */
       this.resend = function (so) {
           return QHttp.request({
                url: "/reSend",
                data: so
            });
        };

       this.solve = function (so) {
            return QHttp.request({
                 url: "/reSendByOrderNo",
                 data: so
             });
       };
       /**
        * 批量删除
        */
       this.deleteMore = function (so) {
           return QHttp.request({
                url: "/msgDel",
                data: so
            });
      };
        

    }]);
});