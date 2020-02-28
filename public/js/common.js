$(function() {
    $(".select_wrap").on('click', function() {
        $(this).find("ul").animate({width:466 + "px"} ,"slow");
    });
    $(".select_wrap").on('mouseleave', function() {
        $(this).find("ul").animate({width:0} ,"slow");
    })

})


 function OnloadImg(url){

  var img=new Image();

  img.src=url;

  var img_width=img.width;

  var win_width=img.width+25;

  var height=img.height+30;

  var OpenWindow=window.open('','_blank', 'width='+img_width+', height='+height+', menubars=no, scrollbars=auto, left=700, top=300');

  OpenWindow.document.write("<style>body{margin:0px;}</style><img src='"+url+"' width='"+win_width+"'>");

 }