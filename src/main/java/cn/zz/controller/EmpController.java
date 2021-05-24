package cn.zz.controller;

import cn.zz.dao.EmpMapper;
import cn.zz.pojo.Emp;
import cn.zz.service.EmpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("emp")
public class EmpController extends BaseController<Emp> {
    @Autowired
    private EmpService empService;

}
