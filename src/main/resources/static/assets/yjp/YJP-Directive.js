(function () {
  'use strict';

  var YJP_Directive = angular.module('yjp.directive', ['yjp.template']);

  /*******************************************************************************
   * GLobal Directives
   ******************************************************************************/

  // Route State Load Spinner(used on page or content load)
  YJP_Directive.directive('ngSpinnerBar', ['$rootScope', function ($rootScope) {
      return {
          link: function (scope, element, attrs) {
              // by defult hide the spinner bar
              element.addClass('hide'); // hide spinner bar by default

              // display the spinner bar whenever the route changes(the content
              // part started loading)
              $rootScope.$on('$stateChangeStart', function () {
                  element.removeClass('hide'); // show spinner bar
              });

              // hide the spinner bar on rounte change success(after the content
              // loaded)
              $rootScope.$on('$stateChangeSuccess', function () {
                  element.addClass('hide'); // hide spinner bar
                  $('body').removeClass('page-on-load'); // remove page loading
                  // indicator
                  Layout.setSidebarMenuActiveLink('match'); // activate selected
                  // link in the
                  // sidebar menu

                  // auto scorll to page top
                  /***************************************************************
                   * setTimeout(function() { Metronic.scrollTop(); // scroll to
  				 * the top on content load },
                   * $rootScope.settings.layout.pageAutoScrollOnLoad);
                   **************************************************************/
              });

              // handle errors
              $rootScope.$on('$stateNotFound', function () {
                  element.addClass('hide'); // hide spinner bar
              });

              // handle errors
              $rootScope.$on('$stateChangeError', function () {
                  element.addClass('hide'); // hide spinner bar
              });
          }
      };
  }])

  // Handle global LINK click
  YJP_Directive.directive('a', function () {
      return {
          restrict: 'E',
          link: function (scope, elem, attrs) {
              if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                  elem.on('click', function (e) {
                      e.preventDefault(); // prevent link click for above criteria
                  });
              }
          }
      };
  });

  // Handle Dropdown Hover Plugin Integration
  YJP_Directive.directive('dropdownMenuHover', function () {
      return {
          link: function (scope, elem) {
              elem.dropdownHover();
          }
      };
  });

  YJP_Directive.directive('tree', function ($compile) {
      return {
          restrict: "E",
          scope: {
              family: '='
          },
          template: '<ul><li ng-repeat="child in family.sonIndex"><tree family="child"></tree></li></ul>',
          compile: function (tElement, tAttr) {
              var contents = tElement.contents().remove();
              var compiledContents;
              return function (scope, iElement, iAttr) {
                  if (!compiledContents) {
                      compiledContents = $compile(contents);
                  }
                  compiledContents(scope, function (clone, scope) {
                      iElement.append(clone);
                  });
              };
          }
      };
  });

  YJP_Directive.directive('trees',['RecursionService',
      function (RecursionService) {
          return {
              restrict: "E",
              replace: true,
              scope: {
                  sonlabel: '='
              },
              template: '<ul class="sub-menu">'
              + '<li ng-repeat="son in sonlabel" ng-if="son.privilegeType==\'Menu\'">'
              + '<a href="{{son.url}}">'
              + '<i class="{{son.icon}}"></i>'
              + '<span class="title" ng-bind="son.title"></span><span class="arrow"  ng-if="son.sonIndex.length"></span></a>'
              + '<trees sonlabel="son.sonIndex" ng-if="son.sonIndex.length" ></trees>'
              + '</li></ul>',
              compile: function (element) {
                  return RecursionService.compile(element);
              }
          }
      }]);

  YJP_Directive.directive('ngThumb', ['$window', function ($window) {
      var helper = {
          support: !!($window.FileReader && $window.CanvasRenderingContext2D),
          isFile: function (item) {
              return angular.isObject(item) && item instanceof $window.File;
          },
          isImage: function (file) {
              var type = '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
              return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
          }
      };

      return {
          restrict: 'A',
          template: '<canvas/>',
          link: function (scope, element, attributes) {
              if (!helper.support)
                  return;

              var params = scope.$eval(attributes.ngThumb);

              if (!helper.isFile(params.file))
                  return;
              if (!helper.isImage(params.file))
                  return;

              var canvas = element.find('canvas');
              var reader = new FileReader();

              reader.onload = onLoadFile;
              reader.readAsDataURL(params.file);

              function onLoadFile(event) {
                  var img = new Image();
                  img.onload = onLoadImage;
                  img.src = event.target.result;
              }

              function onLoadImage() {
                  var width = params.width || this.width / this.height * params.height;
                  var height = params.height || this.height / this.width * params.width;
                  canvas.attr({
                      width: width,
                      height: height
                  });
                  canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
              }
          }
      };
  }]);

  /**绑定地区数据*/
  YJP_Directive.directive('ngBindArea', ['$compile', function ($compile) {
      return {
          restrict: 'A',
          compile: function ngBindCompile(templateElement) {
              $compile.$$addBindingClass(templateElement);
              return function ngBindLink(scope, element, attr) {
                  $compile.$$addBindingInfo(element, attr.ngBind);
                  element = element[0];
                  scope.$watch(attr.ngBindArea, function ngBindWatchAction(value) {
                      if (value == null || angular.isUndefined(value) || angular.isUndefined(value.province)) {
                          element.textContent = '';
                      } else {
                          var val = value.province;
                          if (value.city && value.city != value.province && value.city != value.county) {
                              val += ' - ' + value.city;
                          }
                          if (value.county != undefined && value.county != null && value.county != '' && value.county != "undefined") {
                              val += ' - ' + value.county;
                          }
                          element.textContent = val;
                      }
                  });
              };
          }
      };
  }]);
  YJP_Directive.filter('area',[function(){
	  return function(value,hyphen){
		  var char = hyphen || '';
          if (value == null || angular.isUndefined(value)) {
              return '';
          } else if (value.province) {
              var val = value.province;
              if (value.city && value.city != value.province && value.city != value.county) {
                  val += char + value.city;
              }
              if (value.county != undefined && value.county != null && value.county != '' && value.county != "undefined") {
                  val += char + value.county;
              }
              return val;
          } else {
              return value;
          }		  
	  };
  }]);
  /**绑定数据*/
  YJP_Directive.directive('ngBindWeek', ['$compile', function ($compile) {
      return {
          restrict: 'A',
          compile: function ngBindCompile(templateElement) {
              $compile.$$addBindingClass(templateElement);
              return function ngBindLink(scope, element, attr) {
                  $compile.$$addBindingInfo(element, attr.ngBind);
                  element = element[0];
                  scope.$watch(attr.ngBindWeek, function ngBindWatchAction(value) {
                      if (value == null || angular.isUndefined(value)) {
                          element.textContent = '';
                      } else {

                          var weekdays = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
                          element.textContent = weekdays[value];
                      }
                  });
              };
          }
      };
  }]);
  
  YJP_Directive.filter('nameMask', [function () {
      return function (name) {
          if (!name) {
              return '***';
          } else {
              return name.substring(0, 1) + "**";
          }
      };
  }]);
  
  YJP_Directive.directive('img', [function () {
      return {
          restrict: "E",
          link: function (scope, elem, attr) {
              var defalutImg = elem.attr("default-img") ||  "assets/yjp/img/propic_default.gif";
              elem.attr("src") || elem.attr("src", defalutImg);
                  elem.on("error", function () {
                      elem.attr("src", defalutImg);
                  });
              
          }
      };
  }]);
  
  YJP_Directive.directive('lazyImg', ['$window', '$document', '$rootScope', function ($window, $document, $rootScope) {
      return {
          restrice: 'A',
          compile: function () {
              var eventName = 'broadcastViewportChange';
              if (!$rootScope[eventName]) {
                  var win = angular.element($window);
                  var viewportChange = function () {
                      $rootScope.$broadcast(eventName);
                  };
                  win.on('scroll', viewportChange);
                  win.on('resize', viewportChange);
                  $rootScope[eventName] = true;
              }
              return function (scope, elem, attr) {
                  var doc = $document[0];
                  var win = angular.element($window);
                  var listener = scope.$on(eventName, function () {
                      var rect = elem[0].getBoundingClientRect();
                      var ret = true;
                      if (rect.height > 0 && rect.width > 0) {
                          var x = rect.top > 0 && (rect.top + rect.height / 3) < Math.max(doc.documentElement.clientHeight, win.innerHeight || 0);
                          var y = rect.left > 0 && (rect.left + rect.width / 3) < Math.max(doc.documentElement.clientWidth, win.innerWidth || 0);
                          ret = x && y;
                      }
                      if (ret) {
                          elem.attr('src', elem.attr('lazy-img'));
                          listener();
                          listener = null;
                      }
                  });
                  attr.$observe('lazyImg', function () {
                      scope.$broadcast(eventName);
                  });
              }
          }
      }
  }]);  
  
	/**
	 * 避免重复提交
	 */
  YJP_Directive.directive('avoidDuplicateSubmit', ['$interval', function ($interval) {
	    var tmpDire = {
	        restrict: 'A',
	        link: LinkFn
	    };

	    function LinkFn(mScope, mElement, mAttrs) {
	        mElement.bind('click', function (event) {
	            mElement[0].disabled = true;
	            $interval(function () {
	                mElement[0].disabled = false;
	            }, 3000);
	        })
	    }

	    return tmpDire;
	}]);
  
  /**
   * 页面模板
   */
  YJP_Directive.directive('pageBox', [function () {
      return {
          restrict: 'AE',
          replace: true,
          transclude: true,
          templateUrl: "views/pageTemplates/pageBox.html"
      };
  }]);

  /**
   * 页面头指令
   */
  YJP_Directive.directive('pageTop', [function () {
      return {
          restrict: 'AE',
          replace: true,
          transclude: true,
          templateUrl: "views/pageTemplates/pageTop.html"
      };
  }]);

  /**
   * 页面主体框
   **/
  YJP_Directive.directive('pageContent', [function () {
      return {
          restrict: 'AE',
          replace: true,
          transclude: true,
          templateUrl: "views/pageTemplates/pageContent.html"
      };
  }]);
  /**
   *页面搜索框
   **/
  YJP_Directive.directive('pageSearch', [function () {
      return {
          restrict: 'AE',
          replace: true,
          transclude: true,
          templateUrl: "views/pageTemplates/pageSearch.html",
      };
  }]); 
  
  /**
   * 放大显示图片
   */
  YJP_Directive.directive('imgViewer', function ($document, $compile) {
  	  return {
  	    restrict: 'A',
  	    scope: true,
  	    link: function (scope, element, attrs) {

  	      var tip = $compile('<div ng-class="tipClass"><img data-ng-src="{{ src }}"><div class="imgviewer-arrow"></div></div>')(scope),
  	          tipClassName = 'imgviewer',
  	          tipActiveClassName = 'imgviewer-show';

  	      scope.tipClass = [tipClassName];
  	      scope.src = attrs.ngSrc || attrs.src;
  	      
  	      if(attrs.tooltipPosition) {
  	        scope.tipClass.push('imgviewer-' + attrs.tooltipPosition);
  	      }
  	      else {
  	       scope.tipClass.push('imgviewer-down'); 
  	      }
  	      $document.find('body').append(tip);
  	      
  	      element.bind('mouseover', function (e) {
  	        tip.addClass(tipActiveClassName);
  	        
  	        var pos = e.target.getBoundingClientRect(),
  	            offset = tip.offset(),
  	            tipHeight = tip.outerHeight(),
  	            tipWidth = tip.outerWidth(),
  	            elWidth = pos.width || pos.right - pos.left,
  	            elHeight = pos.height || pos.bottom - pos.top,
  	            tipOffset = 10;
  	        
  	        if(tip.hasClass('imgviewer-right')) {
  	          offset.top = pos.top - (tipHeight / 2) + (elHeight / 2);
  	          offset.left = pos.right + tipOffset;
  	        }
  	        else if(tip.hasClass('imgviewer-left')) {
  	          offset.top = pos.top - (tipHeight / 2) + (elHeight / 2);
  	          offset.left = pos.left - tipWidth - tipOffset;
  	        }
  	        else if(tip.hasClass('imgviewer-down')) {
  	          offset.top = pos.top + elHeight + tipOffset;
  	          offset.left = pos.left - (tipWidth / 2) + (elWidth / 2);
  	        }
  	        else {
  	          offset.top = pos.top - tipHeight - tipOffset;
  	          offset.left = pos.left - (tipWidth / 2) + (elWidth / 2);
  	        }

  	        tip.offset(offset);
  	      });
  	      
  	      element.bind('mouseout', function () {
  	        tip.removeClass(tipActiveClassName);
  	      });

  	      tip.bind('mouseover', function () {
  	        tip.addClass(tipActiveClassName);
  	      });

  	      tip.bind('mouseout', function () {
  	        tip.removeClass(tipActiveClassName);
  	      });  	      
  	    }
  	  }
  	});	

  /**
   * 判断两个输入框的值是相同的<br>
   * <br>
   * 属性 no : 表示完全不一样，不区分是否为 null 或者为 "";<br>
   * 属性 not: 表示不相同，若其中一项为 null 或者为 ""时，返回true;<br>
   */
  YJP_Directive.directive('same', function () {

      function isBlank(val) {
          return val == undefined || val == null || val == "";
      }

      return {
          restrict: 'A',
          require: '?ngModel',
          link: function (scope, elem, attr, ctrl) {
              if (!ctrl) return;

              scope.$watch(attr.same, function () {
                  ctrl.$validate();
              })

              ctrl.$validators.same = function (modelValue, viewValue) {
                  var val = scope.$eval(attr.same);

                  if (attr.hasOwnProperty("no")) {
                      return val != modelValue;
                  } else if (attr.hasOwnProperty("not")) {
                      return (isBlank(val) || isBlank(modelValue) || val != modelValue);
                  } else {
                      return val == modelValue;
                  }
              };
              attr.$observe('same', function () {
                  ctrl.$validate();
              });
          }
      };
  });  
})();
