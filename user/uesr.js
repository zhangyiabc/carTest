var lenKm1 = 1229;
var lenKm4 = null;
try {
    var lenKm1Err = JSON.parse(localStorage.getItem("errorArr")).length || 0;
} catch (error) {
    
}
(function(){
    if (!sessionStorage.getItem("isLogon")) {
        return false;
    }
    $('span.yourName').html(localStorage.getItem("uName"));

    /**
     * Km1 : 科目一
     * item：第一个canvas
     * cont1:canvas的画布
     */
    var km1Item1 = $('.km1 .item1 canvas')[0];
    var km1cont1 = km1Item1.getContext('2d');

    var km1Item2 = $('.km1 .item2 canvas')[0];
    var km1cont2 = km1Item2.getContext('2d');

    var km4Item1 =  $('.km4 .item1 canvas')[0];
    var km4cont1 = km4Item1.getContext('2d');

    var km4Item2 =  $('.km4 .item2 canvas')[0];
    var km4cont2 = km4Item2.getContext('2d');

    function bindEvent(){
        $('.km1 .item1 .schedule-header').click(function(){
            $(this).addClass('active').parents('.km1').find('.item2 .schedule-header').removeClass('active');
            $(this).find('div.hide').show();
            // console.log($(this).find('div.hide i'))
            var bfs =   Number(localStorage.getItem('index')) / lenKm1 * 360;
            render(km1cont1,km1Item1,bfs,"#48dbfb","#c44569","#f19066" );
        })
        $('.km1 .item2 .schedule-header').click(function(){
            $(this).addClass('active').parents('.km1').find('.item1 .schedule-header').removeClass('active');
            $(this).find('div.hide').show();

            var bfs =  lenKm1Err / Number(localStorage.getItem('index')) * 360;
            render(km1cont2,km1Item2,bfs,"#48dbfb","#ee5253","#F8EFBA" );
        })


        $('.km4 .item1 .schedule-header').click(function(){
            $(this).addClass('active').parents('.km4').find('.item2 .schedule-header').removeClass('active');

        })
        $('.km4 .item2 .schedule-header').click(function(){
            $(this).addClass('active').parents('.km4').find('.item1 .schedule-header').removeClass('active');

        })
    }
    function Circle(x, y, r, sAngle, eAngle, color) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.sAngle = sAngle;
        this.eAngle = eAngle;
        this.color = color;
    }

    Circle.prototype = {
        draw: function (context) {
            context.beginPath();
            context.moveTo(this.x, this.y);
            context.fillStyle = this.color;
            context.arc(this.x, this.y, this.r, this.sAngle, this.eAngle, false);
            context.fill();

        },
    }


    function render(context, dom, maxSecond,color1,color2,color3) {
        //i为百分数
        var i = 0;
        var timer = setInterval(function () {
            i += 1.1;

            if (i >= maxSecond) {
                clearInterval(timer)
            }
            
           $(dom).siblings().find('i').text((i/360 * 100).toFixed(2));

            (function (i) {
                context.clearRect(0, 0, dom.width, dom.height);
                var circle1 = new Circle(65, 65, 40, 0, 360 * Math.PI / 180, color1);
                circle1.draw(context);
                // (n-90)
                var circle1 = new Circle(65, 65, 40, -90 * Math.PI / 180, (i - 90) * Math.PI /
                    180,
                    color2);
                circle1.draw(context);
                var circle1 = new Circle(65, 65, 31, 0, 360 * Math.PI / 180, color3);
                circle1.draw(context);
            })(i)

        }, 30);
    }
    bindEvent();
})()