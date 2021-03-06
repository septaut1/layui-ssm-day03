<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<!--隐藏修改的div-->
<div id="updEmpDiv" style="display: none;margin-top: 20px;">
    <form class="layui-form" action="" lay-filter="updEmpFormFilter" id="updEmpForm">
        <!--员工主键empno-->
        <input type="hidden" name="empno"/>
        <div class="layui-form-item">
            <label class="layui-form-label">姓名</label>
            <div class="layui-input-inline">
                <input type="text" name="ename" lay-verify="required|ename" placeholder="请输入员工姓名" autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">工作</label>
            <div class="layui-input-inline">
                <input type="text" name="job" lay-verify="required" placeholder="请输入员工工作" autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">上司编号</label>
            <div class="layui-input-inline">
                <input type="text" name="mgr" lay-verify="required|number|mgr" placeholder="请输入员工上司编号" autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">工资</label>
            <div class="layui-input-inline">
                <input type="text" name="sal" lay-verify="required|number|sal" placeholder="请输入员工工资" autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">入职时间</label>
            <div class="layui-input-inline">
                <input type="text" name="hiredate" id="hiredate" lay-verify="required"
                       placeholder="请输入员工入职时间" autocomplete="off" class="layui-input my_class_date">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">奖金</label>
            <div class="layui-input-inline">
                <input type="text" name="comm" lay-verify="required|number|comm"
                       placeholder="请输入员工奖金" autocomplete="off" class="layui-input my_class_data">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">部门</label>
            <div class="layui-input-inline">
                <select name="deptno" id="updDept" lay-verify="required"></select>
            </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-input-block">
                <button class="layui-btn" lay-submit lay-filter="demo2">修改</button>
                <button type="reset" class="layui-btn layui-btn-primary">重置</button>
            </div>
        </div>
    </form>

</div>
</body>
</html>
