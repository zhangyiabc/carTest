//首页
/**
 * km 存储科目信息
 * testType 存储练题的方式：顺序、随机、模拟考试
 */
var km = localStorage.getItem('km') || '';
var testType = localStorage.getItem('testType') || '';

function bindEvent() {
    // 点击不同练习顺序，设置不同的题目，并且存入localStorage
    $('.km1').on('click', 'li', function () {
        $(this).addClass('active')
            .siblings().removeClass('active');
        $('.km1').find('a.btn').removeClass('disabled');
        $('.km4').find('a.btn').addClass('disabled');
        //科目一与科目四的样式不能同时出现
        $(this).parents('div.f-ul')
            .next().find('.km4 li')
            .removeClass('active')
            .end().find('a.btn')
            .addClass('disabled');

        testType = $(this).data('testtype');
    })
    $('.km4').on('click', 'li', function () {
        $(this).addClass('active')
            .siblings().removeClass('active');
        //科目一与科目四的样式不能同时出现
        $(this).parents('div.f-ul')
            .prev().find('.km1 li')
            .removeClass('active')
            .end().find('a.btn')
            .addClass('disabled');
        //由于目前科目四的题库还没有写，所以不能让他点击
        $('.km4').find('a.btn').removeClass('disabled');
        $('.km1').find('a.btn').addClass('disabled');

        testType = $(this).data('testtype');
    })
    //点击"开始练习"时判断是否为登录状态，如果不是，让用户登录
    $('.km1 a.btn').click(function () {
        isLogin()
        // 获取当前选择科目
        sub = $(this).data('sub');

        //存储进localStorage里面
        localStorage.setItem('testType', testType);
        if (sub === km) {
            return;
        } else {
            localStorage.setItem('km', km);
            //设置题目索引为0
            localStorage.setItem("index",0)
        }


    })
    $('.km4 a.btn').click(function () {
        isLogin();
        // 获取当前选择科目
        sub = $(this).data('sub');

        //存储进localStorage里面
        localStorage.setItem('testType', testType);
        if (sub === km) {
            return;
        } else {
            localStorage.setItem('km', km);
            //设置题目索引为0
            localStorage.setItem("index",0)
        }


    })
}

function isLogin() {
    if (!Boolean(sessionStorage.getItem('isLogon'))) {
        alert("您当前未登录，请先登录");
        return false;
    }
}
bindEvent();