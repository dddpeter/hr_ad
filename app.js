/**
 * Created by dddpe on 2016-7-15.
 */
$(document).ready(function(){
   /* var audio = document.getElementById("backSound");
    audio.pause();*/
    var currentDepartment={};
    var currentPosition={};
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
                list+='<li><span class="jobMe" style="cursor: pointer" data-index="'+ i +'">'+v.Title+
                    '<i class="fa fa-hand-o-left fa-2x"></i></span> </span></li>';
            }
            else{
                list+='<li><span style="cursor: pointer" class="jobMe" data-index="'+ i +'">'+v.Title+'</span></li>';
            }
        });
        $('.jobTitle').html(list);
    };
    function jobDetailParser(index){
        var thisJob=currentDepartment.Position[index];
        $('.jobTitleDetails').html(thisJob.Title);
        currentPosition=thisJob;
        var description='';
        var requirement='';
        if(thisJob.Description){
            $(thisJob.Description).each(function(i,v){
                description+='<li>'+(i+1)+'. '+v+'。</li>';
            });

        }
        else{
            description='(无)';
        }
        $(thisJob.Question).each(function(i,v){
            requirement+='<li>'+(i+1)+'. '+v+'。</li>';
        });
        $('.JobTask').html(description);
        $('.jobRequirement').html(requirement);
    };

    $('.department').on('click',function(){
        var deptName=$(this).html();
        var deptCode=$(this).data('dept');
        $('.layer').css('display','block');
        $('.layer').css('top','300%');
        mySwiper.detachEvents();
        $('.bottom').css('display','none');
        jobParsers(deptName,deptCode);
    });
    $('.closeLayer').on('click',function(){
        $('.layer').css('display','none');
        $('.layer').css('top','0');
        $('.bottom').css('display','block');
        mySwiper.attachEvents();
    });
    $('body').on('click','.jobMe',function(){
        var index=$(this).data('index');
        $('.layer').css('display','none');
        $('.layer').css('top','0');
        $('.layerJobDetails').css('display','block');
        $('.layerJobDetails').css('top','300%');
        jobDetailParser(index);
    });
    $('.readMore').on('click',function(){
        $('.layerJobDetails').css('display','none');
        $('.layerJobDetails').css('top','0');
        $('.bottom').css('display','block');
        mySwiper.attachEvents();
    });
    $('.ok').on('click',function(){
        $('.layerJobDetails').css('display','none');
        $('.layerJobDetails').css('top','0');
        $('.noticeLayer').css('top','300%');
        $('.noticeLayer').css('display','block');
        $('.selectedJob').html(currentPosition.Title);
    });
    $('.reviewMe').on('click',function(){
        mySwiper.slideTo(4,0);
        $('.noticeLayer').css('top','0');
        $('.noticeLayer').css('display','none');
        $('.bottom').css('display','block');
        mySwiper.attachEvents();

    });
    $('.notice-b-2').on('click',function(){
        window.location.href='http://pan.baidu.com/s/1qYKjGWs?adapt=mobile&fr=ftw';
    });

});
