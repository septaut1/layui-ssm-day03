package cn.zz.service.impl;

import cn.zz.dao.EmpMapper;
import cn.zz.pojo.Emp;
import cn.zz.service.EmpService;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;

@Service
@Transactional(readOnly = false)
public class EmpServiceImpl extends BaseServiceImpl<Emp> implements EmpService {

}
