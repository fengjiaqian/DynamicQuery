/**
 * 提供各种消息提示框
 */
(function () {
'use strict';

	var YJP_MsgBox = angular.module('yjp.MsgBox', ['yjp.template']);

	var _messageBox = ['$q', '$modal'];
	function messageBox ($q, $modal) {
		return {
			confirm: function(modalTitle,modalContent) {
				var deferred = $q.defer();
				/*
				* modalInstance是在弹窗的基础上再弹出confirm确认框时从第一个弹窗中传进的$modalInstance,
				* 若是直接在页面上弹出confirm确认框，则不能传$modalInstance,否则会报错
				*/
				var confirmModal = $modal.open({
					backdrop: 'static',
					templateUrl : 'views/modal/confirm.html',  // 指向确认框模板
					controller : 'ConfirmCtrl',// 初始化模态控制器
					windowClass: "confirmModal",// 自定义modal上级div的class
					size : 'sm', //大小配置
					resolve : {
						data : function(){
							return {modalTitle: modalTitle,modalContent: modalContent};
						}
					}
				});
				// 处理modal关闭后返回的数据
				confirmModal.result.then(function() {
					if(!!modalInstance) {
						modalInstance.dismiss('cancel');
					}
					deferred.resolve();
				},function(){
				
				});
				return deferred.promise;
			}
		}
	}

	messageBox.$inject = _messageBox; 
	YJP_MsgBox.factory('MsgBox', messageBox);

})();