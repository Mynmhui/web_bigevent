$(function() {
    const form = layui.form;
    // 自定义验证
    form.verify({
        // 密码验证
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        // 校验原密码不能和新密码相同
        samePwd: (val) => {
            if (val === $("[name=oldPwd]").val()) return "新旧密码不能相同！";
        },
        // 校验新密码和确认密码是否一致
        rePwd: (val) => {
            if (val !== $("[name=newPwd]").val()) return "两次密码不一致！";
        },
    })
    // 更新密码
    $('.layui-form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: res =>{
                if(res.status !== 0 ) return layer.msg('更新密码失败！');
                layer.msg('更新密码成功！');
                // 强制清空 token
                localStorage.removeItem('token');
                // 跳转到登录页面
                window.parent.location.href = "/login.html";
            }
        })
    })
})