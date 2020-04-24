/**
 * Created by bjw on 2016/11/9.
 */
define([], function () {

    return {
        defaultUrl: "/userMessage.html",
        states: {
            'userMessage': {
                url: '/userMessage.html',
                templateUrl: 'views/workspace/userMessage.html',
                controller: 'userMessageController',
                data: {
                    pageTitle: '已登录用户的信息'
                },
                ncyBreadcrumb: {
                    label: '已登录用户的信息'
                },
                dependencies: ['js/controllers/workspace/userMessageController.js']
            },
            'messageHandle': {
            	ncyBreadcrumb: {
                    label: '消息处理'
                },
            },
            'earningReport': {
            	ncyBreadcrumb: {
                    label: '业绩报表'
                },
            },
            'exceptionMessage': {
                url: '/exceptionMessage.html',
                templateUrl: 'views/exceptionMessage/info.html',
                controller: 'ExceptionMessageController',
                data: {
                    pageTitle: '异常信息处理'
                },
                ncyBreadcrumb: {
                    label: '异常信息处理',
                    parent: 'messageHandle'
                },
                dependencies: ['js/controllers/exceptionMessage/ExceptionMessageController.js']
            },
            'orderProcessing': {
                url: '/orderProcessing.html',
                templateUrl: 'views/orderProcessing/orderProcessing.html',
                controller: 'OrderProcessingController',
                data: {
                    pageTitle: '按单号处理'
                },
                ncyBreadcrumb: {
                    label: '按单号处理',
                    parent: 'messageHandle'
                },
                dependencies: ['js/controllers/orderProcessing/OrderProcessingController.js']
            },
            'addressHandling': {
                url: '/addressHandling',
                templateUrl: 'views/addressHandling/addressHandling.html',
                controller: 'AddressHandlingController',
                data: {
                    pageTitle: '初始化会员收货地址经纬度'
                },
                ncyBreadcrumb: {
                    label: '初始化会员收货地址经纬度'
                },
                dependencies: ['js/controllers/addressHandling/AddressHandlingController.js']
            },
            'quickOrder;': {
                url: '/quickOrder',
                templateUrl: 'views/quickOrder/quickOrder.html',
                controller: 'QuickOrderController',
                data: {
                    pageTitle: '快速下单'
                },
                ncyBreadcrumb: {
                    label: '快速下单'
                },
                dependencies: ['js/controllers/quickOrder/QuickOrderController.js']
            },
            //司机业绩报表
            'driverEarningReport': {
                url: '/driverEarningReport',
                templateUrl: 'views/earningReport/driverEarningReport.html',
                controller: 'DriverEarningReportController',
                data: {
                    pageTitle: '司机业绩报表'
                },
                ncyBreadcrumb: {
                    label: '司机业绩报表',
                    parent: 'earningReport'
                },
                dependencies: ['js/controllers/earningReport/DriverEarningReportController.js']
            },
            //搬运工业绩报表
            'porterEarningReport': {
                    url: '/porterEarningReport',
                    templateUrl: 'views/earningReport/porterEarningReport.html',
                    controller: 'PorterEarningReportController',
                    data: {
                        pageTitle: '搬运工业绩报表'
                    },
                    ncyBreadcrumb: {
                        label: '搬运工业绩报表',
                        parent: 'earningReport'
                    },
                    dependencies: ['js/controllers/earningReport/PorterEarningReportController.js']
             },
             //仓管业绩报表
             'storeKeeperEarningReport': {
                    url: '/storeKeeperEarningReport',
                    templateUrl: 'views/earningReport/storeKeeperEarningReport.html',
                    controller: 'StoreKeeperEarningReportController',
                    data: {
                        pageTitle: '仓管业绩报表'
                    },
                    ncyBreadcrumb: {
                        label: '仓管业绩报表',
                        parent: 'earningReport'	
                        	
                    },
                    dependencies: ['js/controllers/earningReport/StoreKeeperEarningReportController.js']
            },
            //门店结算报表
            'shopSettReport': {
                url: '/shopSettReport.html',
                templateUrl: 'views/earningReport/shopSettReport.html',
                controller: 'ShopSettReportController',
                data: {
                    pageTitle: '门店结算报表'
                },
                ncyBreadcrumb: {
                    label: '门店结算报表',
                },
                dependencies: ['js/controllers/earningReport/ShopSettReportController.js']
            },
            // 订单列表
            'orderList': {
                url: '/orderList',
                templateUrl: 'views/orderList/orderList.html',
                controller: 'OrderListController',
                data: {
                    pageTitle: '订单列表'
                },
                ncyBreadcrumb: {
                    label: '订单列表'
                },
                dependencies: ['js/controllers/orderList/OrderListController.js']
            },
            // 订单列表详情
            'orderDetail': {
                url: '/orderDetail/:id/:salesManId',
                templateUrl: 'views/orderList/orderDetail.html',
                controller: 'OrderDetailController',
                data: {
                    pageTitle: '订单列表详情'
                },
                ncyBreadcrumb: {
                    label: '订单列表详情',
                    parent: 'orderList'
                },
                dependencies: ['js/controllers/orderList/OrderDetailController.js']
            },
            // 订单异常配送
            'excetpionOrderList': {
                url: '/excetpionOrderList',
                templateUrl: 'views/orderList/excetpionOrderList.html',
                controller: 'ExcetpionOrderListController',
                data: {
                    pageTitle: '订单异常配送查询'
                },
                ncyBreadcrumb: {
                    label: '订单异常配送查询',

                },
                dependencies: ['js/controllers/orderList/ExcetpionOrderListController.js']
            },
            //配送系数
            'DeliveryFactor': {
                url: '/deliveryFactor',
                templateUrl: 'views/deliveryFactor/deliveryFactor.html',
                controller: 'DeliveryFactorController',
                data: {
                    pageTitle: '配送系数'
                },
                ncyBreadcrumb: {
                    label: '配送系数',
                    	
                },
                dependencies: ['js/controllers/deliveryFactor/DeliveryFactorController.js']
             },
             //城市抹零开关
             'citySettings': {
                 url: '/citySettings',
                 templateUrl: 'views/citySettings/citySettings.html',
                 controller: 'CitySettingsController',
                 data: {
                     pageTitle: '城市设置'
                 },
                 ncyBreadcrumb: {
                     label: '城市设置',
                 },
                 dependencies: ['js/controllers/citySettings/CitySettingsController.js']
             },

            //内容配置
            'contentConfiguration': {
                url: '/contentConfiguration',
                templateUrl: 'views/contentConfiguration/contentConfiguration.html',
                controller: 'ContentConfigurationController',
                data: {
                    pageTitle: '内容配置'
                },
                ncyBreadcrumb: {
                    label: '内容配置',

                },
                dependencies: ['js/controllers/contentConfiguration/ContentConfigurationController.js']
            },
            //动态查询配置
            'dynamicSqlQueryConfig': {
                url: '/dynamicSqlQueryConfig',
                templateUrl: 'views/dynamicSqlQueryConfig/dynamicSqlQueryConfig.html',
                controller: 'DynamicSqlQueryConfigController',
                data: {
                    pageTitle: '动态查询配置'
                },
                ncyBreadcrumb: {
                    label: '动态查询配置',

                },
                dependencies: ['js/controllers/dynamicSqlQueryConfig/DynamicSqlQueryConfigController.js']
            },
            //执行动态查询
            'excuteSqlQuery': {
                url: '/excuteSqlQuery/:id',
                templateUrl: 'views/dynamicSqlQueryConfig/excuteSqlQuery.html',
                controller: 'ExcuteSqlQueryController',
                
                ncyBreadcrumb: {
                    label: '动态查询',
                },
                dependencies: ['js/controllers/dynamicSqlQueryConfig/ExcuteSqlQueryController.js']
            },
            //入库策略配置
            'instockConfig': {
                url: '/inStockConfig',
                templateUrl: 'views/inStockConfig/inStockConfig.html',
                controller: 'InStockConfigController',
                data: {
                    pageTitle: '收货配置'
                },
                ncyBreadcrumb: {
                    label: '收货配置',

                },
                dependencies: ['js/controllers/inStockConfig/InStockConfigController.js']
            },
            //添加入库策略
            'instockConfigAdd': {
                url: '/inStockConfigAdd',
                templateUrl: 'views/inStockConfig/inStockConfigAdd.html',
                controller: 'InStockConfigAddController',
                data: {
                    pageTitle: '添加策略'
                },
                ncyBreadcrumb: {
                    label: '添加策略',

                },
                dependencies: ['js/controllers/inStockConfig/InStockConfigAddController.js']
            },
            //修改入库策略
            'instockConfigUpdate': {
                url: '/inStockConfigUpdate/:configId',
                templateUrl: 'views/inStockConfig/inStockConfigUpdate.html',
                controller: 'InStockConfigUpdateController',
                data: {
                    pageTitle: '修改策略'
                },
                ncyBreadcrumb: {
                    label: '修改策略',
                },
                dependencies: ['js/controllers/inStockConfig/InStockConfigUpdateController.js']
            },
             //查看报表详情
             'earningReportDetail': {
                 url: '/earningReportDetail/:queryType/:name/:id/:statisticsClass',
                 templateUrl: 'views/earningReport/earningReportDetail.html',
                 controller: 'EarningReportDetailController',
                 data: {
                     pageTitle: '报表详情'
                 },
                 ncyBreadcrumb: {
                     label: '报表详情',
                     	
                 },
                 dependencies: ['js/controllers/earningReport/EarningReportDetailController.js']
             },
            //销售库存预警
            'storeWarning': {
                url: '/storeWarning/:cityId/:mobileNo/:storeWarningType',
                templateUrl: 'views/storewarning/storeWarning.html',
                controller: 'StoreWarningController',
                data: {
                    pageTitle: '销售库存预警'
                },
                ncyBreadcrumb: {
                    label: '销售库存预警',

                },
                dependencies: ['js/controllers/storeWarning/StoreWarningController.js']
            },
            //仓库库存
             'inventoryListNew': {
                 url: '/inventoryListNew',
                 templateUrl: 'views/inventoryList/inventoryList.html',
                 controller: 'InventoryListController',
                 data: {
                     pageTitle: '仓库库存'
                 },
                 ncyBreadcrumb: {
                     label: '仓库库存',
                     	
                 },
                 dependencies: ['js/controllers/inventoryList/InventoryListController.js']
             },
             //仓库库存_详情页
             'inventoryDetail': {
                 url: '/inventoryDetail/:storeId/:id/:productName/:productInfoSpecName/:warehouseId/:warehouseName/:cityName/:ownerName',
                 templateUrl: 'views/inventoryList/inventory_detail.html',
                 controller: 'InventoryDetailController',
                 data: {
                     pageTitle: '仓库变更明细'
                 },
                 ncyBreadcrumb: {
                     label: '仓库变更明细',
                     	
                 },
                 dependencies: ['js/controllers/inventoryList/InventoryDetailController.js']
             },
            //货位库存
            'batchInventoryList': {
                url: '/batchInventoryList/:storeId/:warehouseId/:productName/:productInfoSpecName',
                templateUrl: 'views/inventoryList/batchInventoryList.html',
                controller: 'BatchInventoryListController',
                data: {
                    pageTitle: '货位库存'
                },
                ncyBreadcrumb: {
                    label: '货位库存',

                },
                dependencies: ['js/controllers/inventoryList/BatchInventoryListController.js']
            },
            //货位库存_变更明细
            'batchInventoryDetail': {
                url: '/batchInventoryDetail/:storeBatchId/:changeRecordId/:productName/:productInfoSpecName/:warehouseId/:warehouseName',
                templateUrl: 'views/inventoryList/batchInventoryDetail.html',
                controller: 'BatchInventoryDetailController',
                data: {
                    pageTitle: '货位库存变更明细'
                },
                ncyBreadcrumb: {
                    label: '货位库存变更明细',

                },
                dependencies: ['js/controllers/inventoryList/BatchInventoryDetailController.js']
            },
             //仓库信息同步
             'warehouseInfoSyn': {
                 url: '/warehouseInfoSyn',
                 templateUrl: 'views/warehouseInfoSyn/warehouseInfoSyn.html',
                 controller: 'WarehouseInfoSynController',
                 data: {
                     pageTitle: '仓库信息同步'
                 },
                 ncyBreadcrumb: {
                     label: '仓库信息同步',
                     	
                 },
                 dependencies: ['js/controllers/warehouseInfoSyn/WarehouseInfoSynController.js']
             },
             //查询redis数据
             'redisFind': {
            	 url: '/redisFind',
            	 templateUrl: 'views/redisFind/redisFind.html',
            	 controller: 'redisFindController',
            	 data: {
            		 pageTitle: '查询redis数据'
            	 },
            	 ncyBreadcrumb: {
            		 label: '查询redis数据',
            		 
            	 },
            	 dependencies: ['js/controllers/redisFind/	.js']
             },

             //手动下推订单
             'handPushDownOrder': {
                 url: '/handPushDownOrder',
                 templateUrl: 'views/handPushDownOrder/handPushDownOrder.html',
                 controller: 'HandPushDownOrderController',
                 data: {
                     pageTitle: '手动下推订单'
                 },
                 ncyBreadcrumb: {
                     label: '手动下推订单',

                 },
                 dependencies: ['js/controllers/handPushDownOrder/HandPushDownOrderController.js']
             },
             //2.0数据初始化
             'dataInit': {
                 url: '/dataInit',
                 templateUrl: 'views/dataInit/dataInit.html',
                 controller: 'DataInitController',
                 data: {
                     pageTitle: '2.0数据初始化'
                 },
                 ncyBreadcrumb: {
                     label: '2.0数据初始化',

                 },
                 dependencies: ['js/controllers/dataInit/DataInitController.js']
             },
            //系统配置
            'systemConfig': {
                url: '/systemConfig',
                templateUrl: 'views/systemConfig/systemConfig.html',
                controller: 'SystemConfigController',
                data: {
                    pageTitle: '系统配置'
                },
                ncyBreadcrumb: {
                    label: '系统配置',

                },
                dependencies: ['js/controllers/systemConfig/SystemConfigController.js']
            },
            //校正销售库存
             'salesInventoryCheck': {
                 url: '/salesInventoryCheck',
                 templateUrl: 'views/salesInventoryCheck/salesInventoryCheck.html',
                 controller: 'SalesInventoryCheckController',
                 data: {
                     pageTitle: '校正销售库存'
                 },
                 ncyBreadcrumb: {
                     label: '校正销售库存',

                 },
                 dependencies: ['js/controllers/salesInventoryCheck/SalesInventoryCheckController.js']
             },
            //校正仓库库存
            'storeInventoryCheck': {
                url: '/storeInventoryCheck',
                templateUrl: 'views/storeInventoryCheck/storeInventoryCheck.html',
                controller: 'StoreInventoryCheckController',
                data: {
                    pageTitle: '校正仓库库存'
                },
                ncyBreadcrumb: {
                    label: '校正仓库库存',

                },
                dependencies: ['js/controllers/storeInventoryCheck/StoreInventoryCheckController.js']
            },
            //仓库库存校正记录
            'inventoryList': {
                url: '/inventoryCheckRecordList',
                templateUrl: 'views/inventoryCheckRecord/inventoryCheckRecordList.html',
                controller: 'InventoryCheckRecordListController',
                data: {
                    pageTitle: '仓库库存校正记录'
                },
                ncyBreadcrumb: {
                    label: '仓库库存校正记录',

                },
                dependencies: ['js/controllers/inventoryCheckRecord/InventoryCheckRecordListController.js']
            },
            //错误条码记录
            'errorBoxCodeList': {
                url: '/errorBoxCodeList',
                templateUrl: 'views/errorBoxCode/errorBoxCodeList.html',
                controller: 'ErrorBoxCodeListController',
                data: {
                    pageTitle: '错误条码记录'
                },
                ncyBreadcrumb: {
                    label: '错误条码记录',

                },
                dependencies: ['js/controllers/errorBoxCode/ErrorBoxCodeListController.js']
            },
            //货位库存同步
            'batchInventorySync': {
                url: '/batchInventorySync',
                templateUrl: 'views/batchInventorySync/batchInventorySync.html',
                controller: 'BatchInventorySyncController',
                data: {
                    pageTitle: '货位库存同步'
                },
                ncyBreadcrumb: {
                    label: '货位库存同步',

                },
                dependencies: ['js/controllers/batchInventorySync/BatchInventorySyncController.js']
            },
            //货区库存转移
            'batchInventoryTransfer': {
                url: '/batchInventoryTransfer',
                templateUrl: 'views/batchInventorySync/batchInventoryTransfer.html',
                controller: 'BatchInventoryTransferController',
                data: {
                    pageTitle: '货区库存转移'
                },
                ncyBreadcrumb: {
                    label: '货区库存转移',

                },
                dependencies: ['js/controllers/batchInventorySync/BatchInventoryTransferController.js']
            },
             //经销商一键同步
             'supplySyn': {
                 url: '/supplySyn',
                 templateUrl: 'views/supplySyn/supplySyn.html',
                 controller: 'SupplySynController',
                 data: {
                     pageTitle: '校正销售库存'
                 },
                 ncyBreadcrumb: {
                     label: '校正销售库存',

                 },
                 dependencies: ['js/controllers/supplySyn/SupplySynController.js']
             },
            //产品同步
            'productSync': {
                url: '/productSync',
                templateUrl: 'views/productSync/productSync.html',
                controller: 'ProductSyncController',
                data: {
                    pageTitle: '产品同步'
                },
                ncyBreadcrumb: {
                    label: '产品同步',

                },
                dependencies: ['js/controllers/productSync/ProductSyncController.js']
            },
            //盘点单同步
            'checkOrderSync': {
                url: '/checkOrderSync',
                templateUrl: 'views/checkOrderSync/checkOrderSync.html',
                controller: 'CheckOrderSyncController',
                data: {
                    pageTitle: '盘点单同步'
                },
                ncyBreadcrumb: {
                    label: '盘点单同步',

                },
                dependencies: ['js/controllers/checkOrderSync/CheckOrderSyncController.js']
            },
            //播种任务确认完成
            'saveSowOrder': {
                url: '/saveSowOrder',
                templateUrl: 'views/saveSowOrder/saveSowOrder.html',
                controller: 'SaveSowOrderController',
                data: {
                    pageTitle: '播种任务确认'
                },
                ncyBreadcrumb: {
                    label: '播种任务确认',

                },
                dependencies: ['js/controllers/saveSowOrder/SaveSowOrderController.js']
            },
            // 人员角色管理
            'rolesManager': {
                url: '/rolesManager',
                templateUrl: 'views/rolesManager/rolesManager.html',
                controller: 'RolesManagerController',
                data: {
                    pageTitle: '人员角色管理'
                },
                ncyBreadcrumb: {
                    label: '人员角色管理',

                },
                dependencies: ['js/controllers/rolesManager/RolesManagerController.js']
            },

            // 人员角色管理详情
            'roleInfo': {
                url: '/roleInfo',
                templateUrl: 'views/rolesManager/roleInfo.html',
                controller: 'RolesManagerController',
                data: {
                    pageTitle: '人员角色管理详情'
                },
                params: {'roleId': null, searchInfo: {}},
                ncyBreadcrumb: {
                    label: '人员角色管理详情',
                    parent: 'rolesManager'
                },
                dependencies: ['js/controllers/rolesManager/RolesManagerController.js']
            },
            // 人员角色授权详情
            'authorization': {
                url: '/authorization',
                templateUrl: 'views/rolesManager/authorization.html',
                controller: 'RolesManagerController',
                data: {
                    pageTitle: '人员角色授权'
                },
                params: {'roleId': null, searchInfo: {}},
                ncyBreadcrumb: {
                    label: '人员角色授权',
                    parent: 'rolesManager'
                },
                dependencies: ['js/controllers/rolesManager/RolesManagerController.js']
            },

        }
    };
});