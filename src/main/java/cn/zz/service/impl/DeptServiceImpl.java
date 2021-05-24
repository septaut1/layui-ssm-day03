package cn.zz.service.impl;

import cn.zz.dao.DeptMapper;
import cn.zz.pojo.Dept;
import cn.zz.service.DeptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
@Transactional(readOnly = false)
public class DeptServiceImpl extends BaseServiceImpl<Dept> implements DeptService {
}
