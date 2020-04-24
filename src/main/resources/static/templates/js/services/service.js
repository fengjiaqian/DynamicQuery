/**
 * TODO bjw 临时文件，后继需要重新实现相应功能
 */
define(['app'], function (MetronicApp) {

    /**
     * 自定义alert提示窗口<br>
     *
     * usage:<br>
     * 1) 只提示消息
     *    popupWinService.show('your message');
     * 2) 自定义标题的提示消息
     *    popupWinService.show({title:'your title',msg:'your message'});
     * 3) 带响应操作的提示消息
     *    popupWinService.show('your message').result.then(function(param){
 *    	  // OK 按钮响应
 *        // your code
 *    },function(param){
 *        // 取消按钮响应
 *        // your code
 *    });
     * */
    MetronicApp.service('popupWinService', ['$modal', '$http', 'toastr', function ($modal, $http, toastr) {
        /*消息提示模式窗口*/
        this.show = function (config) {
            var DEFAULT = {
                templateUrl: 'views/modals/common/popupMessage.html',
                controller: function ($scope, $modalInstance, items) {
                    $scope.results = items;
                    // 确认按钮
                    $scope.ok = function () {
                        $modalInstance.close();
                    };
                    // 取消按钮
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                },
                size: 'sm',
                title: '提示消息',
                msg: '',
                isCancleBtnHide:true //提示框是否有取消按钮,默认隐藏
            }
            var cfg = (Object.prototype.toString.call(config) === "[object String]") ? $.extend(DEFAULT,{msg: config}, {msg: config.msg,isCancleBtnHide: config.isCancleBtnHide}) : $.extend(DEFAULT, config);

            //创建弹框对象
            var modalInstance = $modal.open({
                templateUrl: cfg.templateUrl,
                controller: cfg.controller,
                size: cfg.size,
                resolve: {
                    items: function () {
                        return {title: cfg.title, msg: cfg.msg, isCancleBtnHide: cfg.isCancleBtnHide};
                    }
                }
            });
            return modalInstance;
        };
        /*审核确认模式窗口*/
        this.check = function (config) {
            var DEFAULT = {
                templateUrl: 'views/modals/common/popupCheckWin.html',
                controller: function ($scope, $modalInstance, items) {
                    $scope.results = items;
                    // 确认按钮
                    $scope.ok = function () {
                        $modalInstance.close();
                    };
                    // 取消按钮
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                },
                size: 'sm',
                title: '审核提示',
                msg: ''
            }

            var cfg = (Object.prototype.toString.call(config) === "[object String]") ? $.extend(DEFAULT, {msg: config}) : $.extend(DEFAULT, config);

            //创建弹框对象
            var modalInstance = $modal.open({
                templateUrl: cfg.templateUrl,
                controller: cfg.controller,
                size: cfg.size,
                resolve: {
                    items: function () {
                        return {title: cfg.title, msg: cfg.msg};
                    }
                }
            });
            return modalInstance;
        };


        // 转换异常消息
        this.transferMsg = function (msg) {
            var MY_PATTERN = /([\u4e00-\u9fa5]+)[，|！]?/;
            var res = MY_PATTERN.exec(msg);
            var tmp = res && res[1];
            return tmp && tmp.length > 0 ? tmp : msg;
        };

        // 转换时间格式
        // yyyy-mm-dd hh:ii -> yyyy-mm-dd'T'HH:MM:ss.SSS
        // java转json格式识别用 
        this.formatDate = function (vo) {
            vo.beginDate = vo.beginDate && format(vo.beginDate);
            vo.endDate = vo.endDate && format(vo.endDate);
            function format(date) {
                return new Date(date).getTime();
            }

            var flag = true;
            // 开始时间和结束时间的范围限制
            if (vo.beginDate && vo.endDate && vo.beginDate > vo.endDate) {
                flag = false;
            }
            return flag;
        };

        //得到所有的区县
        this.getCounty = function (citySO, scope) {
            $http.post("city/selectCountyByProvinceAndCity", citySO).success(function (data) {
                    scope.countries = data;
                    if (scope.countries[0] === '' && scope.countries.length == 1) {
                        scope.countries = [];
                    }
                }
            ).error(function () {
            });
        };
    }]);


//等待数据加载
    MetronicApp.service('pagedataLoading', function () {
        this.loading = function () {
            Metronic.blockUI({
                target: '#datatable_ajax',
                boxed: true
            });
        };
        this.unloading = function () {
            Metronic.unblockUI('#datatable_ajax');
        };
        /**提交中*/
        this.submitting = function () {
            Metronic.blockUI({
                target: 'form',
                boxed: true
            });
        };
        /**提交完成*/
        this.submitted = function () {
            Metronic.unblockUI('form');
        }
    });
    
    /**
     * Excel文件下载
     */
    MetronicApp.service('ExcelFileDownLoad', ['$http','$q',function($http,$q) {

        this.downLoad = function(url,data,fileName){
    	   	 $http({
    	            url: url,
    	            method: 'post',
    	            responseType: 'arraybuffer',
    	            contentType: "application/json",
    	            data:data
    	        }).success(function(data,status, headers){
    	           var blob = new Blob([data], {type: "application/vnd.ms-excel"},decodeURI(headers()["x-filename"]));	 
    	          var a = document.createElement("a");
    	          document.body.appendChild(a);
    	          a.download = fileName;
    	          a.href = URL.createObjectURL(blob);
    	          a.click();
    	       })
        }


    }]);

});