(function ($) {
    let newsSliderTimer;
    var autoplay = true;

    $.fn.newsSlider = function (opt) {
        var $this = this,
            itemClass = opt.itemClass || 'news-slider__images-item',
            itemClass = opt.itemClass || 'news-slider__images-item',
            $item = $this.find('.' + itemClass),
            itemCount = $item.length;

        var defaultIndex = 0;

        changeIndex(defaultIndex);

        // add data attributes images
        for (var i = 0; i < itemCount; i++) {
            $('.news-slider__images-item').each(function (i) {
                $(this).attr('data-slide-number', [i]);
            });
        }
        // add data attributes content
        for (var i = 0; i < itemCount; i++) {
            $('.news-slider__text-item').each(function (i) {
                $(this).attr('data-slide-number', [i]);
            });
        }
        // add data attributes dots
        for (var i = 0; i < itemCount; i++) {
            $('.news-slider__dots-item').each(function (i) {
                $(this).attr('data-slide-number', [i]);
            });
        }

        //Slide on click image
        $('.news-slider__images-item').bind('click', function (evt) {
            let sliderIndex = $(this).attr('data-slide-number');
            $(this).parents('[data-js~="news-slider-area"]').children('.news-slider__dots').find('[data-slide-number=' + sliderIndex + ']').click();

            //If user click stop autoplay
            if (evt.originalEvent != undefined) {
                autoplay = false;
            }
        });

        // Slide carousel
        $('.news-slider__dots-item').bind('click', function (evt) {
            //If user click stop autoplay
            if (evt.originalEvent != undefined) {
                autoplay = false;
            }
            // add class to current dot on click
            if (!autoplay) {
                $('.news-slider__dots-item').removeClass('is-active').addClass('transition-off -no-progress');
                $(this).addClass('is-active');
            }
            else {
                $('.news-slider__dots-item').removeClass('is-active').addClass('transition-off');
                $(this).removeClass('transition-off').addClass('is-active');
            }

            var index = $(this).index();

            $('.news-slider__images-item').removeClass('now prev next');
            var slide = $('.news-slider__images').find('[data-slide-number=' + index + ']');
            slide.prev().addClass('prev');
            slide.addClass('now');
            slide.next().addClass('next');

            $('.news-slider__text-item').removeClass('is-active');
            var sliderNewsActiveContent = $('.news-slider__text-item[data-slide-number=' + index + ']');
            sliderNewsActiveContent.addClass('is-active');

            if (slide.next().length == 0) {
                $('.news-slider__images-item:first-child').addClass('next');
            }

            if (slide.prev().length == 0) {
                $('.news-slider__images-item:last-child').addClass('prev');
            }

            let currentDot = $(this);

            //If user click stop autoplay
            if (evt.originalEvent != undefined) {
                autoplay = false;
                return;
            }

            function newsSliderDotPlay() {
                window.clearTimeout(newsSliderTimer);
                newsSliderTimer = window.setTimeout(function () {
                    let nextDot = currentDot.next('.news-slider__dots-item');
                    if (nextDot.length == 0) {
                        nextDot = currentDot.prevAll('.news-slider__dots-item').last();
                    }
                    if (!autoplay) {
                        window.clearTimeout(newsSliderTimer);
                        return;
                    }
                    nextDot.click();
                }, 7000);
            }

            //Autoplay
            newsSliderDotPlay();
        });

        function changeIndex(nowIndex) {
            // clear all class
            $this.find('.now').removeClass('now');
            $this.find('.next').removeClass('next');
            $this.find('.prev').removeClass('prev');
            if (nowIndex == itemCount - 1) {
                $item.eq(0).addClass('next');
            }
            if (nowIndex == 0) {
                $item.eq(itemCount - 1).addClass('prev');
            }

            $item.each(function (index) {
                if (index == nowIndex) {
                    $item.eq(index).addClass('now');
                }
                if (index == nowIndex + 1) {
                    $item.eq(index).addClass('next');
                }
                if (index == nowIndex - 1) {
                    $item.eq(index).addClass('prev');
                }
            });
        }

        //check text max height
        let newsSliderTextMaxHeight = null;
        let newsSliderTextMax = 0;
        function newsSliderCheckTextHeight() {
            $(".news-slider__text-item").each(function () {
                let newsSliderTextHeight = $(this).outerHeight();
                if (newsSliderTextHeight > newsSliderTextMax) {
                    newsSliderTextMax = newsSliderTextHeight;
                    newsSliderTextMaxHeight = $(this);
                }
            });

            if (newsSliderTextMaxHeight) {
                $(".news-slider__text-item").css("min-height", newsSliderTextMax + "px")
            }
        }

        $(window).resize(function () {
            newsSliderCheckTextHeight();
        });

    };
})(jQuery);
