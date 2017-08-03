
//顶部的音乐控制按钮
window.onload=function(){
     var control=document.getElementById("control");
    var audio=document.getElementById("audio");
    control.onclick=function(){
        if(audio.paused){
            audio.play();
            control.className="glyphicon glyphicon-pause";
        }else{
            audio.pause();
            control.className="glyphicon glyphicon-play";
        }
    };
}

$(document).ready(function() {
     /*纵向滚动条*/
    // custom scrollbar
    $("html").niceScroll({
        styler:"fb",
        cursorcolor:"rgb(16, 167, 175)",
        cursorwidth: '6',
        cursorborderradius: '10px',
        background: '#424f63',
        spacebarenabled:false,
        cursorborder: '0', 
        zindex: '1000'
    });

    $(".scrollbar1").niceScroll({
        styler:"fb",
        cursorcolor:"rgb(16, 167, 175)",
        cursorwidth: '6',
        cursorborderradius: '0',
        autohidemode: 'false',
        background: '#F1F1F1',
        spacebarenabled:false,
        cursorborder: '0'
    });

    
    $(".scrollbar1").getNiceScroll();
    if ($('body').hasClass('scrollbar1-collapsed')) {
        $(".scrollbar1").getNiceScroll().hide();
    }

    /*选项卡切换*/
    $('.resp-tabs-list li').click(function(){
        $(this).addClass('resp-tab-active').siblings().removeClass('resp-tab-active');
        $('.resp-tabs-container .tab-1').eq($(this).index()).show().siblings().hide();
    })

    /*回到頂部*/
    $().UItoTop({ easingType: 'easeOutQuart' });
   /* 环形图*/
    $('#demo-pie-1').pieChart({
            barColor: '#10A7AF',
            trackColor: '#fff',
            lineCap: 'round',
            lineWidth: 8,
            onStep: function (from, to, percent) {
                $(this.element).find('.pie-value').text(Math.round(percent) + '%');
            }
        });

        $('#demo-pie-2').pieChart({
            barColor: '#10A7AF',
            trackColor: '#fff',
            lineCap: 'butt',
            lineWidth: 8,
            onStep: function (from, to, percent) {
                $(this.element).find('.pie-value').text(Math.round(percent) + '%');
            }
        });

        $('#demo-pie-3').pieChart({
            barColor: '#10A7AF',
            trackColor: '#fff',
            lineCap: 'square',
            lineWidth: 8,
            onStep: function (from, to, percent) {
                $(this.element).find('.pie-value').text(Math.round(percent) + '%');
            }
        });
});
