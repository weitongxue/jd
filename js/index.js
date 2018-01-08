$(function(){
    jdSearch();
    jdLbt();
    qgLbt();
    initTimer();
    //京东头部的搜索栏
    function jdSearch(){
        var jdHeaderSearch = $(".jd_header_search_main");
        $(window).on("scroll",function(){
            let top = $(this).scrollTop();
            if(top > 0){
                let move = top /300;
                move = move > 0.9 ? 0.9:move;
                jdHeaderSearch .css({
                    "backgroundColor":"rgba(218, 45, 50, " + move + ")"
                })
            }

        })
    }

    //京东的轮播图区域
    function jdLbt(){
        var imgs = $(".imgs");
        var lbt = $(".jd_lbt");
        let width = lbt.width();
        var indicator = $(".indicator");
        var currentIndex = 1;
        //图片切换
        var play = ()=>{
            imgs.animate({
                transform:"translateX("+ -currentIndex * width + "px)"
            },300,function(){
                if (currentIndex == 9){
                    currentIndex = 1;
                    imgs.css("transform", "translateX("+ -currentIndex * width + "px)");
                }else if(currentIndex == 0){
                    currentIndex = 8;
                    imgs.css("transform", "translateX("+ -currentIndex * width + "px)");
                }
                //指示器
                indicator.find(":eq("+(currentIndex-1)+")").css({
                    "backgroundColor":"white"
                }).siblings().css({
                    "backgroundColor": "transparent"
                })

            })
        };
        //自动播放
        var id;
        var autoPlay = ()=>{
           id = setInterval(function(){
                currentIndex++;
                play();
            },2000)
        };
        autoPlay();

        //触屏事件
        var hammer = new Hammer(imgs[0]);//把$对象转换成document对象
        var left;
        hammer.on("panstart",function(){
            //获取手指放上去的位置（相对于imgs的偏移量）
            clearInterval(id) ;//清除定时器
            left = imgs.position().left;
        });

        hammer.on("panleft panright",function(e){
            var x = e.deltaX;
            imgs.css("transform", "translateX("+(left + x) + "px)");
        });
        hammer.on("panend",function(e){
            var x = e.deltaX;
            if(x > 0){
                if(x > width/4){
                    currentIndex--;
                    play();
                }else{
                    play();
                }
            }else{
                if(-x > width/4){
                    currentIndex++;
                    play();
                }else{
                    play();
                }
            }
            play();
            autoPlay();
        })

    }

    //抢购商品轮播图
    function qgLbt(){
        let main = $(".jd_qg_main");
        console.log(main);
        let hammer = new Hammer(main[0]);
        let left;
        hammer.on("panstart",function(){
            left = main.position().left;
        });
        hammer.on("panleft",function(e){
            var deltaX = e.deltaX;
            main.css({
                "transform":"translateX("+ (left + deltaX) +"px)"
            })
        });
        hammer.on("panright",function(e){
            let leftX = main.offset();
            if(left < 0){
                var deltaX = e.deltaX;
                main.css({
                    "transform":"translateX("+ (left + deltaX) +"px)"
                })
            }
        })
    }

    function initTimer() {
        let time = $(".jd_ms_left strong");
        let h = $(".jd_ms_left > div");

        let date = new Date();
        let hour = date.getHours();
        time.html(hour+2+"点场");
        let timer = 7200;
        setInterval(function () {
            timer--;
            let deadHour = parseInt(timer/3600);
            deadHour < 10? "0"+deadHour : deadHour;
            let deadMinute = parseInt((timer-3600*deadHour)/60);
            deadMinute < 10? "0"+deadMinute : deadMinute;
            let deadSecond = timer-deadHour*3600-deadMinute*60;
            deadSecond < 10? "0"+deadSecond : deadSecond;

            h.html(deadHour+":"+deadMinute+":"+deadSecond);
        },1000)
    }


});