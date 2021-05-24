package cn.zz.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("model")
public class modelController {
    @RequestMapping("showEmp")
    public String showEmp(){
        return "showEmp";

    }
    @RequestMapping("showPet")
    public String showPet(){
        return "showPet";
    }
}
