package com.yijiupi.himalaya.op.service.sqlReport;


import com.alibaba.dubbo.config.annotation.Reference;
import com.yijiupi.himalaya.base.search.PageList;
import com.yijiupi.himalaya.supplychain.dto.SqlReportDTO;
import com.yijiupi.himalaya.supplychain.dto.SqlReportQueryDTO;
import com.yijiupi.himalaya.supplychain.service.ISqlReportService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * @author: fengjiaqian
 * @date: 2018/8/9 15:35
 */
@Service
public class SqlReportService {
    private static final Logger LOGGER = LoggerFactory.getLogger(SqlReportService.class);

    @Reference
    private ISqlReportService iTaskService;


    /**
     * 新增或修改任务
     * @param dto
     */
    public void saveOrUpdateTask(SqlReportDTO dto) {
        iTaskService.saveOrUpdateTask(dto);

    }

    /**
     * 查询任务集合
     * @param taskQueryDTO
     * @return
     */
    public PageList<SqlReportDTO> selectTaskList(SqlReportQueryDTO taskQueryDTO) {
        return iTaskService.selectTaskList(taskQueryDTO);
    }

    /**
     * 删除任务
     * @param dto
     */
    public void deleteTaskById(SqlReportDTO dto) {
        iTaskService.deleteTaskById(dto);
    }



    /**
     * 获取 任务
     * @param record
     * @return
     */
    public SqlReportDTO selectSqlReportPO(SqlReportDTO record){
        return iTaskService.selectTaskPO(record);
    }


    /**
     * 执行sql
     * @param
     */
    public List<Map> executeSqlReport(SqlReportDTO dto){
        return iTaskService.executeSql(dto);
    }

}
