/**
 * 配送系数
 */
define(['app'], function (app) {


    app.service('CitySettingsService', ['QHttp', function (QHttp) {
        /**
         * 获取列表
         */
        this.getList = function (data) {
            return QHttp.request({
                url: "getCitySettingsList",
                data:data
            });
        };
        /**
         * 开启/关闭抹零
         */
        this.editBtn = function (data) {
            return QHttp.request({
                url: "updateOne",
                data:data
            });
        };
        /**
         * 新增
         */
        this.addCity = function (data) {
            return QHttp.request({
                url: "addOne",
                data:data
            });
        };
    }]);
});