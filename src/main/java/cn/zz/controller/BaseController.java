package cn.zz.controller;

import cn.zz.pojo.Dept;
import cn.zz.pojo.Emp;
import cn.zz.service.BaseService;

import cn.zz.service.impl.BaseServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class BaseController<T> {
    @Autowired
    private BaseService<T> baseService;
    /**
     * layui数据表格的URL接口地址，默认会自动传递两个参数：?page=1&limit=30（该参数可通过 request 自定义）
     *
     * @param page  代表当前页码
     * @param limit 代表每页数据量
     * @return
     */
    @RequestMapping("loadData")
    @ResponseBody  //指定返回数据是json类型
    public Map<String, Object> loadData(Integer page, Integer limit) {
        HashMap<String, Object> map = null;
        try {
            map = baseService.findTByPage(page,limit);
            map.put("code", 0);
            map.put("msg", "数据请求正常");
        } catch (Exception e) {
            e.printStackTrace();
            map.put("code", 200);
            map.put("msg", "数据请求异常");
        }
        return map;
    }


    @RequestMapping("loadDataByParam")
    @ResponseBody  //指定返回数据是json类型
    public Map<String, Object> loadDataByParam(Integer page, Integer limit, T t) {
        HashMap<String, Object> map = null;
        try {
            map =baseService.findTByPageAndParams(page,limit,t);
            map.put("code", 0);
            map.put("msg", "数据请求正常");
        } catch (Exception e) {
            e.printStackTrace();
            map.put("code", 200);
            map.put("msg", "数据请求异常");
        }
        return map;
    }

    @RequestMapping("delTById")
    @ResponseBody
    public String delTById(Integer id) {
        try {
            return   baseService.removeTById(id);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }


    }


    //批量删除员工数据

    @RequestMapping("delBatchTByIds")
    @ResponseBody
    public String delBatchTByIds(Integer[] ids){
        try {
            return baseService.removeBatchByIds(ids);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }


    //添加员工
    @RequestMapping("saveT")
    @ResponseBody
    public String saveT(T t){
        try {
            return baseService.saveT(t);
        }catch (Exception e){
            e.printStackTrace();
            return "error";
        }
    }

    //修改员工信息
    @RequestMapping("modifyT")
    @ResponseBody
    public String modifyT(T t){
        try {
            return baseService.modifyT(t);
        }catch (Exception e){
            e.printStackTrace();
            return "error";
        }
    }

    //加载单表所有数据
    @RequestMapping("loadAllT")
    @ResponseBody
    public List<T> loadAllT(){
        try {
            return baseService.findTtAll();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
