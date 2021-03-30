var carType = localStorage.getItem("carType") || '';

function bindEvent() {
    $('.car-content').on('click', '.car-type', function () {
        $(this).addClass('active').siblings()
            .removeClass('active')
        $('.car-content > a.btn').removeClass('disabled');
        carType = $(this).data('cartype');
        console.log(carType);
    })

    $('.car-content').on('click', 'a.btn', function () {
        localStorage.setItem('carType',carType);
    })
}

bindEvent();