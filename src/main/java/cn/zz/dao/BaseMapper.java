package cn.zz.dao;

import cn.zz.pojo.Dept;
import cn.zz.pojo.Emp;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface BaseMapper<T> {
    //根据主键id删除数据
    int deleteByPrimaryKey(Integer ids);
    //根据单个实体添加数据
    int insert(T t);
    //根据单个实体动态添加数据
    int insertSelective(T t);

    //根据主键查找数据
    T selectByPrimaryKey(Integer ids);

    //根据单个实体动态查找数据
    int updateByPrimaryKeySelective(T t);

    //根据单个实体查找数据
    int updateByPrimaryKey(T t);

    //查询所有数据
    List<T> selAllTByPage();

    //根据条件查找数据
    List<T> selAllTByPageParams(T t);

    //根据主键批量删除数据
    Integer deleteBatchByIds(@Param("ids") Integer[] ids);


    //查询单表所有数据
    List<T> selTAll();
}
