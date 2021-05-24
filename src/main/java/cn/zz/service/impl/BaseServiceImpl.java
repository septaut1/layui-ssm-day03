package cn.zz.service.impl;

import cn.zz.dao.BaseMapper;
import cn.zz.pojo.Emp;
import cn.zz.service.BaseService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.HashMap;
import java.util.List;

//注意：BaseServiceImpl不能添加@Service注解，因为没有指定具体的实现类型，启动报错。
public class BaseServiceImpl<T> implements BaseService<T> {

    @Autowired
    private BaseMapper<T> baseMapper;

    /**
     * 不带条件查询
     * @param page
     * @param limit
     * @return
     */
    @Override
    public HashMap<String, Object> findTByPage(Integer page, Integer limit) {
        HashMap<String, Object> map = new HashMap<>();
        //开启分页
        PageHelper.startPage(page, limit);
        //嵌套查询
        List<T> list = baseMapper.selAllTByPage();
        PageInfo pageInfo = new PageInfo(list);
        map.put("count", pageInfo.getTotal());
        map.put("data", pageInfo.getList());
        return map;
    }

    /**
     * 带条件查询
     * @param page
     * @param limit
     * @param t
     * @return
     */
    @Override
    public HashMap<String, Object> findTByPageAndParams(Integer page, Integer limit,T t) {
        HashMap<String, Object> map = new HashMap<>();
        //开启分页
        PageHelper.startPage(page, limit);
        //嵌套查询
        List<T> list =baseMapper.selAllTByPageParams(t);
        PageInfo pageInfo = new PageInfo(list);
        map.put("count", pageInfo.getTotal());
        map.put("data", pageInfo.getList());
        return map;
    }

    /**
     * 根据主键id删除数据
     * @param id
     * @return
     */
    @Override
    public String removeTById(Integer id) {
        if (baseMapper.deleteByPrimaryKey(id)>0) {
            return "success";
        }
        return "fail";
    }

    /**
     * 根据主键ids批量删除数据
     * @param ids
     * @return
     */
    @Override
    public String removeBatchByIds(Integer[] ids) {
        if (baseMapper.deleteBatchByIds(ids)>0){
            return "success";
        }
        return "fail";
    }

    /**
     * 添加数据
     * @param
     * @return
     */
    @Override
    public String saveT(T t) {
        if (baseMapper.insert(t)>0){
            return "success";
        }
        return "fail";
    }

    /**
     * 修改数据
     * @param
     * @return
     */
    @Override
    public String modifyT(T t) {
        if (baseMapper.updateByPrimaryKeySelective(t)>0){
            return "success";
        }
        return "fail";
    }


    @Override
    public List<T> findTtAll() {
        return baseMapper.selTAll();
    }
}
