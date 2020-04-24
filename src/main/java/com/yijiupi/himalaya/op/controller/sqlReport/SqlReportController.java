package com.yijiupi.himalaya.op.controller.sqlReport;

import com.yijiupi.himalaya.base.search.PageList;
import com.yijiupi.himalaya.op.pagemodel.BaseResult;
import com.yijiupi.himalaya.op.pagemodel.PagesResult;
import com.yijiupi.himalaya.op.service.sqlReport.SqlReportService;
import com.yijiupi.himalaya.supplychain.dto.SqlReportDTO;
import com.yijiupi.himalaya.supplychain.dto.SqlReportQueryDTO;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;

/**
 *
 * 动态sql
 * @author: fengjiaqian
 * @date: 2018/8/9 11:18
 */


@RestController
@RequestMapping("templates")
public class SqlReportController {

    @Resource
    private SqlReportService taskService;

    /**
     * 增加或修改任务
     * @param dto
     * @return
     */
    @RequestMapping(value="/saveOrUpdateSqlReport",method = RequestMethod.POST)
    public BaseResult saveOrUpdateSqlReport(@RequestBody SqlReportDTO dto){
        taskService.saveOrUpdateTask(dto);
        return new BaseResult();
    }



    /**
     * 分页查询任务数据集合
     * @param query
     * @return
     */
    @RequestMapping(value = "/findSqlReportList",method = RequestMethod.POST)
    public BaseResult findSqlReportList(@RequestBody SqlReportQueryDTO query){
        PageList<SqlReportDTO>  pageList = taskService.selectTaskList(query);
        return new PagesResult<SqlReportDTO>(pageList);
    }


    /**
     * 删除任务
     *
     * @param dto
     */
    @RequestMapping(value = "/deleteSqlReportById",method = RequestMethod.POST)
    public BaseResult deleteSqlReportById(@RequestBody SqlReportDTO dto){
        taskService.deleteTaskById(dto);
        return new BaseResult();
    }

    /**
     * 执行sql
     *
     * @param dto
     */
    @RequestMapping(value = "/executeSqlReport",method = RequestMethod.POST)
    public List<Map> executeSqlReport(@RequestBody SqlReportDTO dto){
        return  taskService.executeSqlReport(dto);
    }

    /**
     * 查询任务详情
     * @param dto
     * @return
     */
    @RequestMapping(value = "/selectSqlReportPO",method = RequestMethod.POST)
    public SqlReportDTO selectSqlReportPO(@RequestBody SqlReportDTO dto){
        SqlReportDTO sqlReportDTO = taskService.selectSqlReportPO(dto);
        return sqlReportDTO;
    }
}
