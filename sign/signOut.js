(function () {
    $('.head').load("../head/head.html");
    $('.mybtn').click(function () {
        var uName = $('.u-name').val();
        var name = $('.register-name').val();
        var pass = $('.register-pass').val();
        var repass = $(".register-repass").val();
        console.log(name, pass, repass);
        if (name == localStorage.getItem('name')) {
            alert("该账户已注册!");
            return false;
        }
        if (uName || name || pass || repass) {
            if (repass == pass) {
                alert("注册成功");
                //首先清空
                localStorage.clear();
                //存储sessionStorage
                //理由：创建完成后用户登录时对比sessionStorage，正确便登录成功
                sessionStorage.setItem("name", name);
                sessionStorage.setItem("password", pass);
                //存储localStorage 以便下次登录
                localStorage.setItem("uName", uName);
                localStorage.setItem("name", name);
                localStorage.setItem("password", pass);
                //跳转到登录界面
                var isTo = confirm("是否跳转到登录界面？");
                console.log(isTo)
                if (isTo) {
                    var initPath = window.location.pathname;
                    var index = initPath.indexOf('sign');
                    var house = initPath.substring(0, index);
                    window.location.pathname = house + "sign/signIn.html";
                }
            } else {
                alert("两次密码输入不一致，请确认")
            }

        } else {
            alert('注册信息不完全，请检查后再次输入');
        }
    })
})()