define(['app'], function (app) {


    app.service('DynamicSqlQueryConfigService', ['QHttp', function (QHttp) {
        /**
         * 获取列表
         */
        this.getList = function (data) {
            return QHttp.request({
                url: "findSqlReportList",
                data: data
            });
        };


        /**
         * 新增
         */
        this.addSqlReport = function (data) {
            return QHttp.request({
                url: "saveOrUpdateSqlReport",
                data: data
            });
        };

        /**
         * 修改
         */
        this.edit = function (data) {
            return QHttp.request({
                url: "saveOrUpdateSqlReport",
                data: data
            });
        };
        /**
         * 执行脚本
         */
        this.excuteSql = function (data) {
            return QHttp.request({
                url: "executeSqlReport",
                data: data
            });
        };
        this.detail = function (id) {
            return QHttp.request({
                url: "selectSqlReportPO",
                data: id
            });
        };
        /**
         * 删除
         */
        this.del = function (id) {
            return QHttp.request({
                url: "deleteSqlReportById",
                data: id
            });
        }
    }]);
});