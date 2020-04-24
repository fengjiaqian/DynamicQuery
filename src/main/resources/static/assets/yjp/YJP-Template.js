(function () {
  'use strict';

  var YJP_tpl = angular.module('yjp.template', []);
/**
 * 页面头部面包屑模板
 */
YJP_tpl.run(["$templateCache",function($templateCache){
	$templateCache.put("views/pageTemplates/pageTop.html",
	"<div>\n"+
	"  <h3 class=\"page-title\" data-ng-bind=\"$state.current.data.pageTitle\"></h3>\n"+
	"  <div data-ncy-breadcrumb></div>\n"+
	"</div>"
	);
}]);

/**
 * 页面主体模板
 */
YJP_tpl.run(["$templateCache",function($templateCache){
	$templateCache.put("views/pageTemplates/pageContent.html",
	//"<div>\n"+
	"	<div class=\"row\">\n"+
	"		<div class=\"col-md-12\">\n"+
	"			<div class=\"portlet light bordered\">\n"+
	"				<div class=\" portlet-title\">\n"+
	"					<div class=\" caption \" data-ng-hide=\"$state.current.data.captionHelper\">\n"+
	"						<i class=\" icon-settings font-green-sharp\"></i>\n"+
	"						<span class=\" caption-subject font-green-sharp bold uppercase\"> 搜索 </span>&nbsp;\n"+
	"						<span class=\" caption-helper\"> 输入搜索信息 </span>\n"+
	"					</div>\n"+
	"					<div class=\"caption\" data-ng-if=\" $state.current.data.captionHelper\">\n"+
	"						<i class=\"icon-settings font-green-sharp\"></i>\n"+
	"						<span class=\"caption-subject font-green-sharp bold uppercase\" data-ng-bind=\"$state.current.data.caption\"></span>\n"+
	"						<span class=\"caption-helper\" data-ng-bind=\"$state.current.data.captionHelper\"></span>\n"+
	"					</div>\n"+
	"				</div>\n"+
	"				<div class=\"portlet-body\" data-ng-transclude>\n"+
//	"					<div data-ng-transclude></div>\n"+
	"				</div>\n"+
	"			</div>\n"+
	"		</div>\n"+
	"	</div>\n"//+
	//"</div>"
	);
}]);


/**
 * 页面搜索模板
 */  
YJP_tpl.run(["$templateCache",function($templateCache){
	$templateCache.put("views/pageTemplates/pageSearch.html",
	"<form onkeydown=\"if(event.keyCode==13){return false;}\" class=\"form-horizontal data-ng-pristine data-ng-valid searchbox \">\n"+
	"	<div class=\"form-body\" data-ng-transclude>\n"+
//	"		<div class=\"row\">\n"+
//	"			<div data-ng-transclude></div>\n"+
//	"		</div>\n"+
	"	</div>\n"+
	"	<div class=\"form-actions\">\n"+
	"		<div class=\"row\">\n"+
	"			<div class=\"col-md-7 col-md-offset-5\">\n"+
	"				<button type=\"button\" class=\"btn btn-primary\" data-ng-click=\"searchClick()\"><i class=\"fa fa-search\"></i> 查询 </button>\n"+
	"				<button type=\"button\" class=\"btn btn-default\" data-ng-click=\"resetClick()\"><i class=\"fa fa-eraser\"></i> 清空 </button>\n"+
	"			</div>\n"+
	"		</div>\n"+
	"	</div>\n"+
	"</form>"
	);
}]);

/**
 * 确认窗口模板
 */
YJP_tpl.run(["$templateCache", function($templateCache) {
	  $templateCache.put("views/modal/confirm.html",
	    '<div class="m-c">\n'+
	    '  <div class="modal-header">\n'+
	    '    <h4 class="modal-title" data-ng-bind="title"></h4>\n'+
	    '  </div>\n'+
	    '  <div class="modal-body" data-ng-bind="content"></div>\n'+
	    '  <div class="modal-footer">\n'+
	    '    <button type="button" class="btn btn-primary" ng-click="ok()">确定</button>\n'+
	    '    <button type="button" class="btn btn-warning" ng-click="cancel()">取消</button>\n'+
	    '  </div>\n'+
	    '</div>\n'
	    );
}]);

/**
 * 提示窗口模板
 */
YJP_tpl.run(["$templateCache", function($templateCache) {
	  $templateCache.put("views/modal/alert.html",
	    '<div class="m-c">\n'+
	    '  <div class="modal-header">\n'+
	    '    <h4 class="modal-title">{{title}}</h4>\n'+
	    '  </div>\n'+
	    '  <div class="modal-body">{{content}}</div>\n'+
	    '  <div class="modal-footer">\n'+
	    '    <button type="button" class="btn btn-primary" ng-click="ok()">确定</button>\n'+
	    '  </div>\n'+
	    '</div>\n'
	    );
}]);



})();
