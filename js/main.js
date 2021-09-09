$(function () {
    //ПРОВЕРЯЕТ РАЗМЕР СЕКЦИИ если fullScreen то screenButton у img close.svg-----------------------
    function checkScreenSize() {
        const checkScreen = $('.content__section-header').parents().hasClass('fullScreen');
        if (checkScreen == true) {
            $('.screenButton').attr('src', 'images/close.svg');
            $('.screenButton').css('width', '18px');
        } else {
            $('.screenButton').attr('src', 'images/max_screen.svg');
            $('.screenButton').css('width', '30px');
        }

    }

//--------------------------------------------------------------------------------------------------



    //ЗАГРУЗКА КОНЕТА ПО СЕКЦИЯМ (ДОКУМЕНТЫ, ГЛАВНАЯ, БЛОГ) СРАЗУ ПОСЛЕ ОТКРЫТИЯ САЙТА---------------

    $('.content__section').each(function () {
        const sectionID = $(this).attr('id');

        $.ajax({
            url: `${sectionID}` + '.html',
            cache: false,
            success: function (html) {
                $("#" + sectionID).html(html);
               
                checkScreenSize(); //Проверка размера экрана
            }
        });
    });



    //ЗАГРУЗКА ВЫБРАННОГО КОНТЕНТА В ТУ СЕКЦИЮ ГДЕ БЫЛ КЛИК------------------------------------------


    $(document).on('click', '.content__elem-inner', function () {

        const selectedID = $(this).attr('id');
        const sectionName = $('#' + selectedID).closest('.content__section').attr('id');

        $.ajax({
            url: `${selectedID}` + '.html',
            cache: false,
            success: function (html) {
                $("#" + sectionName).html(html);
               
                checkScreenSize(); //Проверка размера экрана
               
            }
        });

    });







    //СТРЕЛКА НАЗАД В СЕКЦИИ-------------------------------------------------------------------------------

    $(document).on('click', '.back__arrow', function () {

        const backSectionName = $('.back__arrow').parents().parents().attr('id');

        $.ajax({
            url: `${backSectionName}` + '.html',
            cache: false,
            success: function (html) {
                $("#" + backSectionName).html(html);
                
                checkScreenSize();//Проверка размера экрана

            }
        });

    });


    //ДОБАВЛЯЕМ КЛАСС ACTIVE ДЛЯ БУРГЕРА----------------------------------------------------------------------
    $('.header__burger').on('click', function (event) {
        $('.header__burger, .header__menu').toggleClass('active');
        $('body').toggleClass('lock');

    })
    //автоматический закрытыть БУРГЕР
    $('.header__link').on('click', function (event) {
        $('.header__burger,.header__menu').removeClass('active');
        $('body').removeClass('lock');
    });



    //ПЕРЕХОД НА СТРАНИЦУ ЧЕРЕЗ БУРГЕР----------------------------------------------------------------------

    $('.header__link').on('click', function (event) {
        $('.content__section').removeClass('active');

        let activeClassName = event.target.className;

        if (activeClassName == 'main__link') {
            activeClassName = 'home';
        }
        if (activeClassName == 'documents__link') {
            activeClassName = 'folders';
        }
        if (activeClassName == 'blog__link') {
            activeClassName = 'news';
        }

        $('.' + activeClassName).toggleClass('active');

    });

    //ДОБАВЛЯЕМ КЛАСС fullScreen ДЛЯ СЕКЦИИ (МЕНЯЕМ СТРЕЛКИ И КРЕСТИК) -----------------------------------------

    $(document).on('click', '.screenButton', function () {


        const maxScreenSection = $(this).parents().parents().attr('id'); //Определяет на какой снкции нажали на стрелкт развертывания секции
        $('.content__section').each(function () {
            const sectionId = $(this).attr('id')
            if (sectionId != maxScreenSection) {
                $('#' + sectionId).toggleClass('display__none');//Добавляет класс display__none для не кликнутых секции
            }
        });
       
        $('#main').toggleClass('active');//Уберает заранее установленный active секции (поумолчанию для моб версии)
     
        $('#' + maxScreenSection).toggleClass('fullScreen');//Добавляет класс fullScreen для кликнутой секции

        
        checkScreenSize();//Проверка размера экрана
    

    })

    //ВЫВОДИТ ФАЙЛЫ ПАПОК 
    $(document).on('click', '.folder', function (){
        $(this).next().slideToggle(300).toggleClass('active');
    })


}); 