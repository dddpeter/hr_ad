/**
 * Created by dddpe on 2016-7-15.
 */
$(document).ready(function(){
    var audio = document.getElementById("backSound")
    var currentDepartment={};
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
    function jobParsers(deptName,deptCode){
        $('.departmentList').html(deptName);
        currentDepartment=departments[deptCode];
        var list='';
        $(currentDepartment.Position).each(function(i,v){
            if(i==0){
                list+='<li><span>'+v.Title+'<i class="fa fa-hand-o-left fa-2x"></i></span> </span></li>';
            }
            else{
                list+='<li><span>'+v.Title+'</span></li>';
            }
        });
        $('.jobTitle').html(list);
    }
    $('.department').on('click',function(){
        var deptName=$(this).html();
        var deptCode=$(this).data('dept');
        $('.layer').css('display','block');
        $('.layer').css('top','300%');
        mySwiper.detachEvents();
        jobParsers(deptName,deptCode);
    });
    $('.closeLayer').on('click',function(){
        $('.layer').css('display','none');
        $('.layer').css('top','0');
        mySwiper.attachEvents();
    });

});
