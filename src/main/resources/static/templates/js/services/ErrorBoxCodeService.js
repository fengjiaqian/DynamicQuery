/**
 * 仓库库存校正记录
 */
define(['app'], function (app) {


    app.service('ErrorBoxCodeService', ['QHttp', function (QHttp) {
        /**
         * 错误条码记录列表
         */
        this.listErrorBoxCode = function (data) {
            return QHttp.request({
            	method: 'post',
                url: "/listErrorBoxCode",
                data:data
            });
        };

    }]);
});