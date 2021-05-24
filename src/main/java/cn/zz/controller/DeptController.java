package cn.zz.controller;

import cn.zz.pojo.Dept;
import cn.zz.service.DeptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


import java.util.List;

@Controller
@RequestMapping("dept")
public class DeptController extends BaseController<Dept>{
    @Autowired
    private DeptService deptService;


}
