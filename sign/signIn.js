//登录功能
(function(){
    $('.head').load("../head/head.html");
    $('.mybtn').click(function(){
        var name = $('.logon-name').val();
        var pass = $('.logon-pass').val();
        if (name || pass ) {
            if(!localStorage.getItem('name')){
                alert("没有该账户信息！请先注册！")
                return false;
            }
            
            if(name == localStorage.getItem("name") && pass == localStorage.getItem('password')){
                
                alert('登录成功！');
                sessionStorage.setItem("isLogon",true);
                var initPath = window.location.pathname;
                var index = initPath.indexOf('sign');
                var house = initPath.substring(0,index);
                window.location.pathname = house + "index/index.html";
            }else{
                alert("账户密码输入不正确，请检查")
            }
        }else{
            alert('信息输入不完全！请检查！')
            return false;
        }

        
    })
})()