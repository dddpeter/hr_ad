/**
 * Created by dddpe on 2016-7-15.
 */
$(document).ready(function(){
    var audio = document.getElementById("backSound");
    audio.pause();
    var mySwiper = new Swiper ('.swiper-container', {
        direction: 'vertical',
        loop: false,
        onInit: function(swiper){ //Swiper2.x的初始化是onFirstInit
            swiperAnimateCache(swiper); //隐藏动画元素
            swiperAnimate(swiper); //初始化完成开始动画
        },
        onSlideChangeEnd: function(swiper){
            swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
        }
    });
    $('.music').on('click',function(){
        var audio = document.getElementById("backSound");
        if(audio.paused) {
            audio.play();
            $('.music').addClass('music-circle');
        }
        else{
            audio.pause();
            $('.music').removeClass('music-circle')
        }
    });

});
