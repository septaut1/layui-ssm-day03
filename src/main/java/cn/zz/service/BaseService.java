package cn.zz.service;

import cn.zz.pojo.Dept;
import cn.zz.pojo.Emp;

import java.util.HashMap;
import java.util.List;

public interface BaseService<T> {
    //分页查询
    HashMap<String, Object> findTByPage(Integer page, Integer limit);

    //根据单个实体，分页查询
    HashMap<String, Object> findTByPageAndParams(Integer page, Integer limit, T t);

    //根据主键id删除数据
    String removeTById(Integer id);

    //根据主键id批量删除数据
    String removeBatchByIds(Integer[] ids);

    //根据单个实体添加数据
    String saveT(T t);

    //根据单个实体修改数据
    String modifyT(T t);

    //查找单个表所有数据
    List<T> findTtAll();
}
