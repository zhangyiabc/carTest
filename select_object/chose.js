var carType = localStorage.getItem("carType") || '';
var km;
var type = null;
console.log(carType)
function bindEvent() {
    $('.car-content').on('click', '.car-type', function () {
        $(this).addClass('active').siblings()
            .removeClass('active')
        $('.car-content > a.btn').removeClass('disabled');
        type = $(this).data('cartype');
        console.log(type)
        
        
    })

    $('.car-content').on('click', 'a.btn', function () {
        if(type === carType){
            return;
        }else{
            carType = type;
            localStorage.setItem("index",0);
        }
        console.log(carType)
        localStorage.setItem('carType',carType);
    })
}

bindEvent();