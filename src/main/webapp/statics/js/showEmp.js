layui.use('table', function(){
    var table = layui.table //引入table模块
        ,$=layui.jquery  //引入jQuery模块
        ,form=layui.form  //引入form模块
        ,layer=layui.layer //引入layer模块
        ,laydate = layui.laydate; //引入日期模板

    $(".my_class_date").each(function (){
        //执行一个laydate实例
        laydate.render({
            elem: this //指定元素
            ,type: 'date'
            ,calendar: true
            ,format: 'yyyy-MM-dd HH:mm:ss' //可任意组合
        });
    })



    var currentPage = 1; //创建全局变量，指定当前页是第1页

    var selJsonEmp={};   //查询条件，{}代表空的json数据

    //初始化加载员工数据
       loadAllDept();
    //初始化加载员工数据
      loadEmpAndDept();



    //工具条事件
    table.on('tool(test)', function(obj){ //注：tool 是工具条事件名，test 是 table 原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）

        console.log("data:",data);

        if(layEvent === 'del'){ //删除
            layer.confirm('真的删除行么', function(index){
                //向服务端发送删除指令
                delEmpByEmpno(obj);
                //关闭窗口
                layer.close(index);
            });
        } else if(layEvent === 'edit'){ //编辑
            //1.给表单赋值
            form.val("updEmpFormFilter", { //formTest 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
                "empno":data.empno
                ,"ename": data.ename // "name": "value"
                ,"job": data.job
                ,"mgr": data.mgr
                ,"sal": data.sal
                ,"hiredate": data.hiredate
                ,"comm": data.comm
                ,"deptno": data.dept.deptno
            });

            //2.弹出修改界面
            layer.open({
                type:1,  //弹出类型
                title:"员工修改界面",  //弹框标题
                area:['480px','520px'],  //弹框款高度
                anim: 3,  //弹出的动画效果
                shade:0.5,  //阴影遮罩
                content:$("#updEmpDiv")  //弹出的内容
            });
        }
    });


       function loadEmpAndDept(){
           //第一个实例
           table.render({
               elem: '#demo'
               ,height: 312
               ,url: '/emp/loadDataByParam' //数据接口
               ,page: true //开启分页
               ,limits: [5,10,15,20,100] //自定义分页条数
               ,limit: 5  //默认每页显示5条记录
               ,where: selJsonEmp  //where : 表示查询条件,layui会把该查询条件传递到后端控制器
               ,even: true  //隔行变色效果
               ,cols: [[ //表头
                   {type:'checkbox'}
                   ,{field: 'empno', title: '员工编号', width:130, sort: true}
                   ,{field: 'ename', title: '员工名字', width:130}
                   ,{field: 'mgr', title: '领导', width:130}
                   ,{field: 'job', title: '职位', width:130}
                   ,{field: 'hiredate', title: '入职时间', width: 180,sort: true}
                   ,{field: 'sal', title: '薪水', width: 80, sort: true}
                   ,{field: 'comm', title: '奖金', width: 80, sort: true}
                   ,{field: 'dname', title: '部门名', width: 80, templet: '<div>{{d.dept.dname}}</div>'}
                   ,{field: 'loc', title: '部门位置', width: 160, templet: '<div>{{d.dept.loc}}</div>'}
                   ,{field: 'right' ,title: '操作', width: 200,toolbar:"#barDemo"}
               ]]
               /*渲染完毕之后的回调函数*/
               ,done: function(res, curr, count){
                   //得到当前页码
                   console.log(curr);
                   //给currentPage赋值
                   currentPage = curr;
               }
           });

       }

       //查询条件的表单提交
       //submit(*)  *的值为之前绑定提交元素时设定的，（查询按钮的lay-filter的值） lay-filter="demo1"
    form.on('submit(demo1)', function(data){
        /*console.log(data.elem) //被执行事件的元素DOM对象，一般为button对象
        console.log(data.form) //被执行提交的form对象，一般在存在form标签时才会返回*/
        console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}

        selJsonEmp=data.field;
        loadEmpAndDept();
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });

       //添加功能提交
    form.on('submit(formDemo)',function (data){
        console.log(data.field) //当前容器的全部表单字段，名值对形式：{name: value}
        //调用员工的函数
        saveEmp(data.field);
        //关闭所有的弹出窗口
        layer.closeAll();
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    })
    //表单验证
    form.verify({
        ename: function(value, item){ //value：表单的值、item：表单的DOM对象
            if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
                return '用户名不能有特殊字符';
            }
            if(/(^\_)|(\__)|(\_+$)/.test(value)){
                return '用户名首尾不能出现下划线\'_\'';
            }
            if(/^\d+\d+\d$/.test(value)){
                return '用户名不能全为数字';
            }

            //如果不想自动弹出默认提示框，可以直接返回 true，这时你可以通过其他任意方式提示（v2.5.7 新增）
            if(value === 'xxx'){
                alert('用户名不能为敏感词');
                return true;
            }
        },
        mgr: function(value, item){ //value：表单的值、item：表单的DOM对象
            if(value > 9999 || value < 1001){
                return "上司编号只能在 1001 ~ 9999 之间！";
            }
        },
        sal: function(value, item){ //value：表单的值、item：表单的DOM对象
            if(value > 30000 || value < 4500){
                return "工资只能在 4500 ~ 30000 之间！";
            }
        },
        comm: function(value, item){ //value：表单的值、item：表单的DOM对象
            if(value > 5000 || value < 1500){
                return "奖金只能在 1500 ~ 5000 之间！";
            }
        }

    });

    //修改页面的提交
    form.on('submit(demo2)',function (upData){
        console.log(upData.field);
        updateEmp(upData.field);
        layer.closeAll();
        return false;
    })


    /********************标签事件绑定 *************************/
    /*绑定批量删除*/
    $("#batchEmpBtn").click(function (){
        var checkStatus=table.checkStatus("demo");//idTest 即为基础参数 id 对应的值(此处是table的id值)
        console.log(checkStatus.data) //获取选中行的数据
        console.log(checkStatus.data.length) //获取选中行数量，可作为是否有选中行的条件
        var arrEmp=checkStatus.data;
        if (arrEmp.length===0){
            return layer.msg("请选择需要删除的员工数据！",{icon: 7,time:2000,anim: 3,shade:0.5});

        }
        layer.confirm("真的批量删除员工数据吗？",function (index){
            //7905,7900,7844  -> [7905,7900,7844]
            //springmvc能够接收字符串类型的数字，以,号分隔，springmvc会自动转换了Integer的数组
            var empnoStr="";
            for (var i=0;i<arrEmp.length;i++){
                empnoStr +=arrEmp[i].empno+",";
            }
            empnoStr=empnoStr.substring(0,empnoStr.length-1);
            //向服务端发送删除指令
            delBatchEmpByEmpno(empnoStr);
            //关闭窗口
            layer.close(index);
        })
    })

    //绑定添加按钮
    $("#saveEmpBtn").click(function (){
        //在弹出框之前，清空表单数据
        $("#saveEmpForm").find("input").val("");
        //点击添加按钮，弹出添加功能模态框
        layer.open({
            type:1,  //弹出类型
            title:"员工添加界面",  //弹框标题
            area:['480px','520px'],  //弹框高度
            anim: 4,  //弹出的动画效果
            shade:0.5,  //阴影遮罩
            content: $("#saveEmpDiv") //弹出的内容
        });

    })



    /**********************自定义函数***************************/
    function loadAllDept(){
        //异步请求加载部门数据
        $.post(
            "/dept/loadAllT",    //请求的URL地址
            function (data){
                console.log("deptData:",data);
                //动态生成下拉框的option选项
                var optionStr = "<option value=''>===请选择===</option>";
                //遍历data
                //jquery的遍历
                //data : 表示数据
                //function (i,dept): 表示函数，i : 下标  dept: 表示每个数组对象
               $.each(data,function (i,dept){
                   optionStr +="<option value='"+dept.deptno+"'>"+dept.dname+"</option>"

               });
               $("#selDept").html(optionStr);
               //将部门名称加载进添加页面
                $("#saveDept").html(optionStr);
                //把生成好的数据渲染到修改功能下拉框
                $("#updDept").html(optionStr);
                form.render('select'); //刷新select选择框渲染
            },"json"
        ).error(function (){
            layer.msg("数据请求异常！")
        })
    }

    //根据员工编号删除员工数据
    function delEmpByEmpno(obj){
        //1.请求异步请求，删除数据
        $.post(
            "/emp/delTById", //请求的url路径
            {"id":obj.data.empno}, //传递到后端的参数，格式JSON
            function (data){
                if (data==='success'){
                    //2.成功 - 删除DOM，更新缓存
                    obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
                    // icon: 弹出信息的图标类型（0-6）；
                    // time:2000弹出时间2s；
                    // anim: 4弹出方式（0-6）；
                    // shade:0.5背景颜色深浅（0-1）
                    layer.msg("删除成功！",{icon: 1,time:2000,anim: 1,shade:0.5});
                } else {
                    layer.msg("删除失败！",{icon: 2,time:2000,anim: 2,shade:0.5});
                }
            },"text"//text : 表示后端响应的是文本
        ).error(function (){
            lay.msg("数据请求异常！",{icon: 6,time:2000,anim: 3,shade:0.5});
        })
    }
    //根据员工编号批量删除员工数据、
    function delBatchEmpByEmpno(empnoStr){
        //1.发送异步请求，输出数据
        $.post(
            "/emp/delBatchTByIds",//请求的URL路径
            {"ids":empnoStr},//传递到后端的参数
            function (data){
                if (data==='success'){
                    layer.msg("删除成功！",{icon: 1,time:2000,anim: 1,shade:0.5})
                    table.reload('demo', {
                        page: {
                            curr: currentPage //重新从指定的页码开始渲染表格数据
                        }
                    });
                }else{
                    layer.msg("删除失败！",{icon: 2,time:2000,anim: 2,shade:0.5});
                }
            },"text"
        ).error(function (){
            layer.msg("数据请求异常！",{icon: 7,time:2000,anim: 3,shade:0.5});
        })
    }

    //添加员工
    function  saveEmp(saveJSONEmp){
        $.post(
            "/emp/saveT", //请求的URL地址
            saveJSONEmp,//数据
            function (data){
                console.log(data);
                if (data==='success'){
                    layer.msg("添加成功！",{icon: 1,time:2000,anim: 1,shade:0.5})
                    //重新加载员工数据
                    loadEmpAndDept();
                }else {
                    layer.msg("添加失败！",{icon: 1,time:2000,anim: 1,shade:0.5})
                }
            },"text"
        ).error(function (){
            layer.msg("数据请求异常！",{icon: 1,time:2000,anim: 1,shade:0.5})
        })
    }

    //修改员工信息
    function updateEmp(updJsonEmp){
        $.post(
            "/emp/modifyT",
            updJsonEmp,
            function (data){
                console.log(data);
                if(data === 'success'){
                    layer.msg("员工信息修改成功！",{icon: 1,time:2000,anim: 4,shade:0.5});
                    //数据表格重载
                    table.reload('demo', {  //demo为table表格容器id
                        page: {
                            curr: currentPage //重新从第 currentPage(当前页) 页开始
                        }
                    }); //只重载数据

                }else{
                    layer.msg("员工信息修改失败！",{icon: 2,time:2000,anim: 4,shade:0.5});
                }
            },"text"
        ).error(function (){
            layer.msg("服务器异常！！！",{icon: 3,time:2000,anim: 6,shade:0.5});
        })
    }


});