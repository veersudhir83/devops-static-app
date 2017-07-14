/***********************************************
* jQuery Page Scroll Progress Bar v1.0 By Dynamic Drive
* Project Page: http://www.dynamicdrive.com/dynamicindex3/pagescrollprogressbar.htm
***********************************************/

jQuery(function($){
    var growmouseover = [true, '25px'] // magnify progress bar onmouseover? [Boolean, newheight]

///////// No need to edit beyond here /////////

    var $indicatorparts = $(document.body).append('<div class="scrollindicator"><div class="scrollprogress"></div></div>')
    var $indicatorMain = $indicatorparts.find('div.scrollindicator')
    var $scrollProgress = $indicatorparts.find('div.scrollprogress')
    var indicatorHeight = $indicatorMain.outerHeight()
    var transformsupport = $scrollProgress.css('transform')
    transformsupport = (transformsupport == "none" || transformsupport =="")? false: true

    function syncscrollprogress(){
        var winheight = $(window).height()
        var docheight = $(document).height()
        var scrollTop = $(window).scrollTop()
        var trackLength = docheight - winheight
        var pctScrolled = Math.floor(scrollTop/trackLength * 100) // gets percentage scrolled (ie: 80 NaN if tracklength == 0)
            $scrollProgress.css('transform', 'translate3d(' + (-100 + pctScrolled) + '%,0,0)')
    }

    if (transformsupport){
        $indicatorMain.css('visibility', 'visible')

        $indicatorMain.on('click', function(e){
            var trackLength = $(document).height() - $(window).height()
            var scrollamt = e.clientX/($(window).width()-32) * trackLength
            $('html,body').animate({scrollTop: scrollamt}, 'fast')
        })

        if (growmouseover[0]){
            $indicatorMain.on('mouseenter touchstart', function(e){
                $(this).css('height', growmouseover[1])
                e.stopPropagation()
            })

            $indicatorMain.on('mouseleave', function(e){
                $(this).css('height', indicatorHeight)
            })

            $(document).on('touchstart', function(e){
                $indicatorMain.css('height', indicatorHeight)
            })
        }

        $(window).on("scroll load", function(){
            requestAnimationFrame(syncscrollprogress)
        })
    }
})