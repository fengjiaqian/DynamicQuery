/**
 * 订单列表
 */
define(['app'], function (app) {

    app.service('OrderListService', ['QHttp', function (QHttp) {
        /**
         * 订单列表
         */
        this.getList = function (data) {
            return QHttp.request({
                method: 'post',
                url: "/getOrderList",
                data: data
            });
        };
        /**
         * 订单列表详情
         */
        this.orderDetail = function (data) {
            return QHttp.request({
                method: 'get',
                url: '/getOrderDetail/' + data.orderId
            });
        };

        /**
         * 订单明细 消息记录及操作记录查询 by orderId
         */
        this.getOrderTrace = function (data) {
            return QHttp.request({
                method: 'get',
                url: '/getOrderTrace/' + data.orderId
            });
        };

        /**
         * 订单明细 用户经纪人信息 by
         */
        this.getUserInfo = function (data) {
            return QHttp.request({
                method: 'get',
                url: '/getUserInfo/' + data.userId + '/' + data.salesManId
            });
        };

        /**
         * 订单异常配送查询
         */
        this.getExcetpionOrderList = function (data) {
            return QHttp.request({
                method: 'post',
                url: '/getExcetpionOrderList',
                data: data
            });
        };

        /**
         * 获取城市列表
         */
        this.listProvinceAllCitiesDTO = function () {
            return QHttp.request({
                method: 'get',
                url: 'bizwebcontrol/jiupicitymultitree/listProvinceAllCitiesDTO/-1/0',
            })
        }
        /**
         * 盘点单同步
         */
        this.orderSync = function (data) {
            return QHttp.request({
                method: 'post',
                url: '/syncStoreCheck',
                data: data
            });
        };

        /**
         * 盘点单盈亏同步
         */
        this.orderLossSync = function (data) {
            return QHttp.request({
                method: 'post',
                url: '/syncStoreCheckResult',
                data: data
            });
        };

        /** 内配退取消*/
        this.orderCancle = function (data) {
            return QHttp.request({
                method: 'post',
                url: '/orderCancle/cancelNPTForBackGround', // http://yapi.yijiupidev.com/project/2227/interface/api/114788
                data: data
            });
        };


    }]);
});
