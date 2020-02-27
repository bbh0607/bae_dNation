$(function() {
    $(".select_wrap").on('click', function() {
        $(this).find("ul").animate({width:466 + "px"} ,"slow");
    });
    $(".select_wrap").on('mouseleave', function() {
        $(this).find("ul").animate({width:0} ,"slow");
    })
})