define(['app'], function (app) {

    app.service('CommonService', ['$http', '$q', function ($http, $q) {

        /**获取cityId*/
        this.getCityId = function (so) {
            return $q(function (resolve, reject) {
                $http({
                    method: 'post',
                    url: 'city/getCityId',
                    data: so
                }).success(function (data) {
                    resolve(data)
                }).error(function (data) {
                    reject(data.message);
                });
            });
        }


    }]);

});