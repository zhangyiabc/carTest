
// 问题
/**
 * 1.数据拿不到  405  403
 * 2.不一样的json数据
 * 3.
 */

var tableData = null;
//题目数组索引
var _i = Number(localStorage.getItem('index') || 0);

//关于题目得数据存储在对象里面
var problemObj = {
    //ABCD选项
    rightKey: null,
    myExplainsText: null,
    //便于读取，进而存储下来
    id: null,
    rightItem: null,
    myExplainsUrl: '',
}
//收藏题目数组
var collectionArr = JSON.parse(localStorage.getItem('collectionArr')) || [];
//错误题目数组
var errorArr = JSON.parse(localStorage.getItem('errorArr')) || [];
//科目以及车型信息
var testInfo = {
    km: localStorage.getItem("km"),
    carType: localStorage.getItem("carType"),
}

/**
 * 根据不同条件获取不同的数据
 * @param {*} option 不同的条件：科目(科目一、科目四),车型(小车、货车、客车、摩托车)
 */
function getTestData(obj) {
    if (obj.km == "1") {
        
        switch (obj.carType) {
            case "c":
                //小车
                send("../json/c1.json")
                break;
            case "a":
                //客车
                send("../json/a.json")
                break;
            case "b":
                //货车
                send("../json/b.json")
                break;
            case "e":
                //摩托车
                send("../json/motuoche.json")
                break;
            default:
                break;
        }
    } else if (obj.km == "4") {
        send("../json/4.json")
    }
}

function send(url) {
    $.ajax({
        url: url,
        dataType: "json",
        data: {
            key: "f6835df552381091cd26b5e5ef87e709",

        },
        type:"get",
        success: function (res) {
            if (res.reason == "ok") {
                var type = localStorage.getItem("testType");
                tableData = getTypeData(res.result, type);
                renderDom(_i);
            }

        }
    })
};
//根据不同的设置返回不同的数据
/**
 * 
 * @param {*} dataArr 需要处理的数组
 * @param {*} option 处理数据的条件 顺序练习、乱序练习(rand)、模拟考试练习(mock)
 * @param {*} return 返回处理后的数组
 */
function getTypeData(dataArr, option) {
    var nowData = [];
    //以下方法使用了lodash
    if (option == "rand") {
        //随机序
        var randArr = _.shuffle(dataArr);
        nowData = randArr;

    } else if (option == 'mock') {
        //模拟考试 ： 100道题
        var randArr = _.shuffle(dataArr);
        var arr_100 = _.chunk(randArr, 100);
        nowData = _.sample(arr_100);
    } else if (option == "order") {
        nowData = dataArr;
    }
    return nowData;

    // 自己封装方法实现

    // var data = res;
    //倒序
    // data.sort(function (a, b) {
    //     return b.id - a.id;
    // })
    //乱序
    // data.sort(function (a, b) {
    //     return 0.5 - Math.random()
    // })
    //乱序 取一定的数量
    // var dataLast = truncation(data, 100);
    // return dataLast



    // 封装方法取固定长度数组
    // function truncation(arr, maxLen) {
    //     var num = 1;
    //     var mediateArr = [];
    //     var targetArr = [];
    //     arr.forEach(function (item) {
    //         mediateArr.push(item);
    //         if (num % maxLen == 0) {
    //             targetArr.push(mediateArr);
    //             mediateArr = [];
    //         }
    //         if (num == (arr.length - 1)) {
    //             targetArr.push(mediateArr);
    //         }
    //         num++;
    //     })
    //     // console.log(targetArr)
    // }
}

//渲染页面
function renderDom(index) {
    var nowObj = tableData[index];
    //str 存储dom元素
    var str = '';
    problemObj.id = nowObj.id;
    // {
    //     "id": "1228",
    //     "question": "驾驶机动车在道路上违反交通安全法规的行为属于违法行为。",
    //     "answer": "1",
    //     "item1": "正确",
    //     "item2": "错误",
    //     "item3": "",
    //     "item4": "",
    //     "explains": "题干中明确表述“违反道路交通安全法规”，违反法律法规即视为违法行为。",
    //     "url": ""
    // }
    problemObj.rightItem = nowObj.answer;

    var now = nowObj.explains;

    if (nowObj.explains.indexOf('http') != -1) {
        problemObj.myExplainsUrl = now.substr(now.indexOf('http'));
        problemObj.myExplainsText = now.slice(0, now.indexOf('http'));
    } else {
        problemObj.myExplainsText = nowObj.explains;
    }

    switch (Number(nowObj.answer)) {
        case 1:
            problemObj.rightKey = "A";
            break;
        case 2:
            problemObj.rightKey = "B";
            break;
        case 3:
            problemObj.rightKey = "C";
            break;
        case 4:
            problemObj.rightKey = "D";
            break;
        default:
            break;
    }
    //渲染页面
    if (nowObj.item3) {
        str = `<div class="col-sm-3 pic border  box  align-self-center"></div>
    <div class="col-sm-5 ques  box align-self-center border">
        <div class="icon collector" title="收藏" data-active="">&#xee99;</div>
        <div class="icon record" title="错题本"><a href="javascript:;">&#xe60d;</a></div>

        <p class="ques-num">第${problemObj.id}题</p>
        <p class="ques-text">${nowObj.question}</p>
        <div class="my-btn-vertical">
            <label for="item1" class="d-block" data-id="1" data-isclick="true">
                <input type="radio"  name="options" id="item1">
                <i>A:</i>
                <span class="option1">${nowObj.item1}</span>
                <div class=" icon d-inline-block  px-1"></div>
            </label>
            <label for="item2" class="d-block" data-id="2" data-isclick="true">
                <input type="radio" name="options" id="item2">
                <i>B:</i>
                <span class="option1">${nowObj.item2}</span>
                <div class=" icon d-inline-block px-1"></div>
            </label>
            <label for="item3" class="d-block" data-id="3" data-isclick="true">
                <input type="radio" name="options" id="item3">
                <i>C:</i>
                <span class="option1">${nowObj.item3}</span>
                <div class=" icon d-inline-block px-1"></div>
            </label> 
            <label for="item4" class="d-block" data-id="4" data-isclick="true">
                <input type="radio" name="options" id="item4">
                <i>D:</i>
                <span class="option1">${nowObj.item4}</span>
                <div class=" icon d-inline-block px-1"></div>
            </label> 
        </div>
        <button class="btn btn-primary next " disabled>下一题</button>
        <button class="btn btn-danger text-white right ">正确答案是：<span class="badge badge-light"></span></button>
    </div>
    <div class="col-sm-3 explain box  align-self-center border">
        <span class="badge  badge-primary py-2">解释：</span>
        <p class=><span></span><a  href=""></a></p>
    </div>`;
    } else {
        str = `<div class="col-sm-3 pic border  box  align-self-center"></div>
    <div class="col-sm-5 ques  box align-self-center border">
    <div class="icon collector" title="收藏" data-active="">&#xee99;</div>
    <div class="icon record" title="错题本"><a href="javascript:;">&#xe60d;</a></div>

        <p class="ques-num">第${problemObj.id}题</p>
        <p class="ques-text">${nowObj.question}</p>
        <div class="my-btn-vertical">
            <label for="item1" class="d-block" data-id="1" data-isclick="true">
                <input type="radio"  name="options" id="item1">
                <i>A:</i>
                <span class="option1">${nowObj.item1}</span>
                <div class=" icon d-inline-block px-1"></div>
            </label>

            <label for="item2" class="d-block" data-id="2" data-isclick="true">
                <input type="radio" name="options" id="item2">
                <i>B:</i>
                <span class="option1">${nowObj.item2}</span>
                <div class=" icon d-inline-block px-1"></div>
            </label>
            
             
        </div>
        <button class="btn btn-primary next" disabled>下一题</button>
        <button class="btn btn-danger text-white right ">正确答案是：<span class="badge badge-light"></span></button>
    </div>
    <div class="col-sm-3 explain box  align-self-center border">
        <span class="badge  badge-primary py-2">解释：</span>
        <p class=><span></span><a  href=""></a></p>
    </div>`
    }
    $('.test').find(".my-test-content").html(str)
    $('.test').find(".pic").css({
        backgroundImage: "url(" + nowObj.url + ")",
    })

}

//添加事件
function bindEvent() {
    $('.test').on('click', 'button.next', function () {
        if ($('.test  label').eq(0)[0].dataset.isclick == "true") {
            return false;
        }
        if (!sessionStorage.getItem("isLogon")) {
            alert('您还没有登录，请先登录')
            return false;
        } else {
            _i++;
            localStorage.setItem('index', _i);
        }
        //将数组转换json格式
        var json_errArr = JSON.stringify(errorArr);
        var json_collArr = JSON.stringify(collectionArr);

        //转成字符串存入localStorage
        localStorage.setItem('errorArr', json_errArr);
        localStorage.setItem('collectionArr', json_collArr);
        renderDom(_i);
    })
    //点击选项后出结果，并且显示解释
    $('.test').on('click', 'label', function (e) {
        e.preventDefault();
        e.stopPropagation();
        //判断当前是否为登录状态
        if (!sessionStorage.getItem("isLogon")) {
            alert('您还没有登录，请先登录')
            return false;
        }
        //去除next按钮disabled属性
        $('button.next').removeAttr('disabled');

        var labelArr = $(this).parent();
        //判断目标元素身上isclick =？true 实现每个选项只能点击一次
        if ($(this)[0].dataset.isclick == "true") {
            // console.log(1234)
            for (var i = 0; i < labelArr[0].children.length; i++) {
                labelArr[0].children[i].dataset.isclick = false;
                $('.text').find('button.next').click();
            }
        } else {
            return false;
        }

        var a = $(this).data("id")

        //判断对错
        if (a == Number(problemObj.rightItem)) {
            $(this).find("div.icon").html('&#xe606;').addClass("iconYes").removeClass("iconNot");

        } else {
            //做错了
            $(this).find("div.icon").html('&#xe64b;').addClass("iconNot").removeClass('iconYes');
            $(".test").find('label').eq(Number(problemObj.rightItem) - 1).find("div.icon").html('&#xe606;').addClass('iconYes');
            //调用一个存放数组并且可以去重
            errorArr = intoArr(errorArr, tableData[_i]);
        }
        //正确答案
        $('.test').find('button.right').find('span').html(problemObj.rightKey);
        //解释
        $('.explain').find('p').find('span')
            .html(problemObj.myExplainsText)
            .end()
            .find('a').attr("href", problemObj.myExplainsUrl).html(problemObj.myExplainsUrl)
    })
    //点击收藏，记录该题目索引 并存储在localStorage里面

    $('.test').on('click', '.ques .collector', function (e) {
        e.preventDefault();
        e.stopPropagation();

        if ($(this)[0].dataset.active == "active") {
            $(this)[0].dataset.active = "";
            $(this).removeClass('active');
            collectionArr.pop();
        } else {
            $(this)[0].dataset.active = "active";
            $(this).addClass('active');
            console.log('已添加收藏');
            collectionArr = intoArr(collectionArr, tableData[_i]);

        }
    })


}
//存入数组
/**
 * 
 * @param {*} arrLast 数组中最后一个数据
 * @param {*} item 需要存储的当前数据
 */
function intoArr(arr, item) {
    arr.push(item);
    arr = uniq(arr);
    /**
     * 
     * @param {*} array 需要去重的数组
     */
    function uniq(array) {
        var temp = [];
        var l = array.length;
        for (var i = 0; i < l; i++) {
            for (var j = i + 1; j < l; j++) {
                if (array[i] === array[j]) {
                    i++;
                    j = i;
                }
            }
            temp.push(array[i]);
        }
        return temp;
    }
    return arr;

}

function init() {
    getTestData(testInfo);
    bindEvent()

}
init();