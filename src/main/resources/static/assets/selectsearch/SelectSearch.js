(function () {
  'use strict';

  var module = angular.module('select-search', []);
  
  module.directive('ngSelectSearch', function($animate, $compile, $parse) {
	  
	   function parseOptions(optionsExp, element, scope) {

		 var NG_OPTIONS_REGEXP = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?(?:\s+disable\s+when\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/;
	 
	     var match = optionsExp.match(NG_OPTIONS_REGEXP);
	     if (!(match)) {
	          throw new Error(
	                  "Expected expression in form of " +
	                  "'_select_ (as _label_)? for (_key_,)?_value_ in _collection_'" +
	                  " but got '" + optionsExp + "'.");
	     }
	     var valueName = match[5] || match[7];
	     var keyName = match[6];
	     var displayFn = $parse(match[2]);
	     var keyFn = $parse(match[1]);
	     var valuesFn = $parse(match[8]);
	 
	     var labelArray = [],
	       idArray = [],
	       optionValues = [];
	     scope.$watch(match[8], function(newValue, oldValue) {
	       if (newValue && newValue.length > 0) {
	         optionValues = valuesFn(scope) || [];
	         labelArray = [];
	         idArray = []
	         for (var index = 0, l = optionValues.length; index < l; index++) {
	           var it = optionValues[index];
	           if (match[2] && match[1]) {
	             var localIt = {};
	             localIt[valueName] = it;
	             var label = displayFn(scope, localIt);
	             var dataId = keyFn(scope, localIt);
	             labelArray.push(label);
	             idArray.push(dataId);
	           }
	         }
	 
	         scope.options = {
	           'optionValues': optionValues,
	           'labelArray': labelArray,
	           'idArray': idArray
	         }
	       }
	     });
	   }
	   var config =  {
	     restrict: 'A',
	     require: ['ngModel'],
	     priority: 100,
	     replace: false,
	     scope: true,
	     template: '<div class="chose-container">' +
	       '<div class="chose-single"><span class="j-view" ng-bind="vm.choosed"></span><i class="glyphicon glyphicon-remove"></i></div>' +
	       '<div class="chose-drop chose-hide j-drop">' +
	       '<div class="chose-search">' +
	       '<input class="j-key" type="text" autocomplete="off">' +
	       '</div>' +
	       '<ul class="chose-result">' +
	       // '<li ng-repeat="'+repeatTempl+'" data-id="'+keyTempl+'" >{{'+ valueTempl+'}}</li>'+
	       '</ul>' +
	       '</div>' +
	       '</div>',
	     link: {
	       pre: function selectSearchPreLink(scope, element, attr, ctrls) {
	         var tmplNode = $(config.template).first();
	 
	         var modelName = attr.ngModel,
	           name = attr.name? attr.name:('def'+Date.now());
	         tmplNode.attr('id', name + '_chosecontianer');
	 
	         $animate.enter(tmplNode, element.parent(), element);
	       },
	       post: function selectSearchPostLink(scope, element, attr, ctrls) {
	         var choseNode = element.next(); //$('#'+attr.name +'_chosecontianer');
	         choseNode.addClass(attr.class);
	         element.addClass('chose-hide');
	         // 当前选中项
	         var ngModelCtrl = ctrls[0];
	         if (!ngModelCtrl || !attr.name) return;
	 
	         parseOptions(attr.ngOptions, element, scope);
	         var rs = {};
	 
	         function setView() {
	           var currentKey = ngModelCtrl.$modelValue;
	           if (isNaN(currentKey) || !currentKey) {
	             currentKey = '';
	             choseNode.find('.j-view:first').text('请选择');
	             choseNode.find('i').addClass('chose-hide');
	           }
	           if ((currentKey + '').length > 0) {
	             for (var i = 0, l = rs.idArray.length; i < l; i++) {
	               if (rs.idArray[i] == currentKey) {
	                 choseNode.find('.j-view:first').text(rs.labelArray[i]);
	                 choseNode.find('i').removeClass('chose-hide');
	                 break;
	               }
	             }
	           }
	         }
	 
	         function setViewAndData() {
	           if (!scope.options) {
	             return;
	           }
	           rs = scope.options;
	           setView();
	         }
	         scope.$watchCollection('options', setViewAndData);
	         scope.$watch(attr.ngModel, setView);
	 
	 
	         function getListNodes(value) {
	           var nodes = [];
	           value = $.trim(value);
	           for (var i = 0, l = rs.labelArray.length; i < l; i++) {
	             if (rs.labelArray[i].indexOf(value) > -1) {
	               nodes.push($('<li>').data('id', rs.idArray[i]).text(rs.labelArray[i]))
	             }
	           }
	           return nodes;
	 
	         }
	         choseNode.on('keyup', '.j-key', function() {
	           // 搜索输入框keyup，重新筛选列表
	           var value = $(this).val();
	           choseNode.find('ul:first').empty().append(getListNodes(value));
	           return false;
	         }).on('click', function() {//显示选择列表
	           choseNode.find('.j-drop').removeClass('chose-hide');
	           if (choseNode.find('.j-view:first').text() != '请选择') {
	             choseNode.find('i').removeClass('chose-hide');
	           }
	           choseNode.find('ul:first').empty().append(getListNodes(choseNode.find('.j-key').val()));
	           
	           choseNode.find('.j-key').focus();//焦点定位到过滤输入框
	           return false;
	         }).on('click', 'ul>li', function() {//选择中操作
	           var _this = $(this);
	           ngModelCtrl.$setViewValue(_this.data('id'));
	           ngModelCtrl.$render();
	           choseNode.find('.j-drop').addClass('chose-hide');
	           choseNode.find('.j-key').val("");//清除过滤值
	           return false;	 
	         }).on('click', 'i', function() {//清除选中值
	           ngModelCtrl.$setViewValue('');
	           ngModelCtrl.$render();
	           choseNode.find('.j-view:first').text('请选择');
	           return false;	 
	         });
	         //隐藏下拉框
	         $(document).on("click", function() {
	           $('.j-drop').addClass('chose-hide');
	           choseNode.find('i').addClass('chose-hide');
	           choseNode.find('.j-key').val("");////清除过滤值
	           //return false;
	         });
	 
	       }
	     }
	   };
	   return config;
	 });
})();