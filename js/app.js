'use strict'

// Mobile menu
$('body').append('<div class="mobile-nav" data-js="mobile-nav"><div class="mobile-nav__header" data-js="mobile-header"></div><div class="mobile-nav__city" data-js="mobile-city"></div><div class="mobile-nav__social" data-js="mobile-social"></div><div class="mobile-nav__list" data-js="mobile-menu-list"></div></div>')

$('[data-js~="mobile-header"]')
  .html($('[data-js~="logo"]').html())
  .append($('[data-js~="close-nav-modal-wrap"]').html());

$('[data-js~="mobile-city"]')
  .html($('[data-js~="city"]').html());
  
$('[data-js~="mobile-social"]')
  .html($('[data-js~="header-socials"]').html());
  
$('[data-js~="mobile-menu-list"]')
  .html($('[data-js~="nav-modal"]').html());
  
$('[data-js~="open-nav-modal"]').on('click', function (e) {
  e.preventDefault()
  $('body').addClass('has-nav-opened')
  $('[data-js~="nav-modal-wrapper"]').addClass('is-visible')
  $('[data-js~="mobile-nav"]').addClass('is-visible')
  $('[data-js~="close-nav-modal"]').css('display', 'block')
  $('[data-js~="open-nav-modal"]').css('display', 'none')
})
$('[data-js~="close-nav-modal"]').on('click', function (e) {
  e.preventDefault()
  $('body').removeClass('has-nav-opened')
  $('[data-js~="nav-modal-wrapper"]').removeClass('is-visible')
  $('[data-js~="mobile-nav"]').removeClass('is-visible')
  $('[data-js~="close-nav-modal"]').css('display', 'none')
  $('[data-js~="open-nav-modal"]').css('display', 'block')
})
$('[data-js~="nav-modal"]').on('click', function (e) {
  return e.stopPropagation()
})

// Header slider
$('.header__slider').slick({
  slidesToShow: 1,
  infinite: false,
  adaptiveHeight: true,
  autoplay: true,
  autoplaySpeed: 7000,
  speed: 1000,
  arrows: false,
  dots: false,
  fade: true,
  pauseOnHover:false,
  cssEase: 'ease-in-out',
});

//Top menu
var menuContainer = $('.header__nav-container');
//close menu
function closeTopMenu() {
  menuContainer.find('.header__nav-item').each(function(){
    if($(this).hasClass('is-active')) {
      $(this).find('.header__nav-submenu').stop().slideToggle(400);
      $(this).removeClass('is-active');
    }
  });
}

var scrollRegionPos = 0;

//close outside
$("body").click(function (e) {
    var target = $(e.target);
    if (!target.is('.news-slider__dots-item')) {
        closeTopMenu();
    }

    if (!target.closest('[data-js~="select-city"]').length) {
        if ($('[data-js~="city-popup"]').hasClass('city-popup-open')) {
            if ((!target.closest('[data-js~="city-popup"]').length && $('[data-js~="city-popup"]').is(":visible")) && !target.is('.news-slider__dots-item')) {
                $('[data-js~="city-popup"]').fadeOut(400).removeClass('city-popup-open');
            }
        }
    }
});

//close region scroll
$(window).scroll(function () {
    if ($('[data-js~="city-popup"]').hasClass('city-popup-open')) {
        let docScrollPos = $(document).scrollTop();
        let newsScrollPos = $('.news-slider').offset().top - $('.news-slider').height();
        if (docScrollPos > newsScrollPos) {
            $('[data-js~="city-popup"]').fadeOut(400).removeClass('city-popup-open');
        }
    }
});

$('.header__nav-link').click(function(e){
  e.preventDefault();
  let clickMenuItem = $(this).parents('.header__nav-item');

  if(!clickMenuItem.find('.header__nav-submenu').length) {
    let linkUrl = clickMenuItem.find('.header__nav-link').attr('href')
    window.location.href = linkUrl;
  }

  function openSubMenu() {
    clickMenuItem.toggleClass('is-active');
    clickMenuItem.find('.header__nav-submenu').stop().slideToggle(400);
  }
  if(clickMenuItem.hasClass('is-active')) {
    openSubMenu();
  }
  else {
    closeTopMenu();
    openSubMenu();
  }
});

//Banners
setInterval(function() {
  $(".banner.switch a").each(function() {
      $(this).hasClass("active") ? $(this).removeClass("active") : $(this).addClass("active")
  });
  $(".bannermobile.switch a").each(function() {
      $(this).hasClass("active") ? $(this).removeClass("active") : $(this).addClass("active")
  })
}, 3e3);


//News slider
let newsSliderArea = $('[data-js~="news-slider-area"]')
function newsSliderInit() {
  $('[data-js~="news-slider"]').newsSlider({});
  $('.news-slider__dots').children(":first").click()
}
newsSliderArea.waypoint(newsSliderInit, { offset: '100%', triggerOnce: true })

//Regional news slider
if ($('[data-js~="region-news"]').find('.region-widget__news-item').length > 2) {
    $('[data-js~="region-news"]').slick({
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 7000,
        speed: 500,
        arrows: false,
        dots: true,
        pauseOnHover: false,
        cssEase: 'ease-in-out',
        responsive: [
            {
                breakpoint: 993,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    });
}

//Progress
let planValue = $('[data-js~="plan-value"]').text();
let graphValue = $('[data-js~="graph-value"]').text();
let graphProgress = (graphValue / planValue).toFixed(2);
let progress = $('[data-js~="graph-cricle"]');

if (isNaN(graphProgress)) {
    graphProgress = 0;
}

function progressInit() {
  progress.circleProgress({
    startAngle: -Math.PI/2,
    value: graphProgress,
    size: 300,
    emptyFill: '#fff',
    thickness: 12,
    fill: '#285769'
  });
  resizeProgress();
}

progress.waypoint(progressInit, { offset: '100%', triggerOnce: true })

$('[data-js~="graph-value"], [data-js~="plan-value"]').counterUp({
  delay: 10,
  time: 1000
});

function resizeProgress(){    
  let progressCanvas = $('.region-widget__graph-cricle canvas');
  let progressCanvasWidth = progressCanvas.outerWidth();
  progressCanvas.css("max-height", progressCanvasWidth);
}

$(document).ready(function(){
  resizeProgress();
  $(window).on("resize", function(){                      
    resizeProgress();
  });
});

//Search popup
$('[data-js~="region-search-input"]').on("input", function () {
    let regionSearchPopupContainer = $(this).parents('.region-widget__search').find('.region-widget__search-popup');

    //filter popup
    let filter = $(this).val();
    $('.region-widget__search-popup-item').each(function () {
        let dataResult = $(this).is('[data-region*="' + filter + '"]');
        let textResult = $(this).text().search(new RegExp(filter, "i")) < 0;
        if (textResult && !dataResult) {
            $(this).hide();
        } else {
            $(this).show();
        }
    });

    if ($(this).val().length >= 2) {
        //check search results
        let visibleItems = 0;
        $('.region-widget__search-popup-item').each(function () {
            if ($(this).css("display") == "block") {
                visibleItems++
            }
        });
        if (!$(this).hasClass('is-active') && visibleItems > 0) {
            regionSearchPopupContainer.slideToggle('400');
            $(this).addClass('is-active');
        }
    }
    else {
        if ($(this).hasClass('is-active')) {
            $(this).removeClass('is-active');
            regionSearchPopupContainer.slideToggle('400');
        }
    }
});

//Select region
$('.region-widget__search-popup-item').click(function () {
    let regionSearchPopupContainer = $(this).parents('.region-widget__search').find('.region-widget__search-popup');
    let searchItemValue = $(this).attr("data-region");
    $('[data-js~="region-search-input"]').val(searchItemValue);
    $('[data-js~="region-search-input"]').removeClass('is-active');
    regionSearchPopupContainer.slideToggle('400');
    $(this).parents("form").submit();
})


//Header select city
$('[data-js~="header-city-search-input"]').on("input", function () {

    //filter popup
    let filter = $(this).val();
    $('.city-list__group').each(function () {

        $(this).find('a').each(function () {
            let dataResult = $(this).is('[data-region*="' + filter + '"]');
            let textResult = $(this).text().search(new RegExp(filter, "i")) < 0;
            if (textResult && !dataResult) {
                $(this).parent("li").css({ "display": "none" });
            } else {
                $(this).parent("li").css({ "display": "block" });
            }
        }); 
    });

    $('.city-list__group').each(function () {
        if ($(this).find('li[style*="block"]').length > 0) {
            $(this).show();
        }
        else {
            $(this).hide();
        }
    });

    if ($(".city-list__group:visible").length < 3) {
        $('.header__city-popup-list.city-list').css({ "columns": "1" });
    }
    else {
        $('.header__city-popup-list.city-list').css({ "columns": "3" });
    }
});

$('[data-js~="select-city"]').click(function () {
    scrollRegionPos = $(document).scrollTop();
    $('[data-js~="city-popup"]').fadeIn(400).addClass('city-popup-open');
});

$('[data-js~="city-popup-close"]').click(function () {
    $('[data-js~="city-popup"]').fadeOut(400).removeClass('city-popup-open');
});

$('.regionlink').click(function (e) {
    e.preventDefault();
    let name = "region";
    let value = $(this)[0].dataset.region;
    let subdomain = $(this)[0].dataset.subdomain;
    let regionLink = '/?region=' + value;
    if (subdomain != undefined && subdomain != "")
        subdomain = subdomain + '.'
    
    if (window.location.host.includes('localhost')) {
        let index = window.location.host.indexOf('localhost');
        let strOut = window.location.host.substr(index);
        document.cookie = encodeURIComponent('isSubdomain') + '=' + encodeURIComponent('false') + "; " + encodeURIComponent('domain') + '=' + encodeURIComponent(strOut);
        document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + "; " + encodeURIComponent('domain') + '=' + encodeURIComponent(strOut);
        document.location = window.location.protocol + "//" + subdomain + strOut + regionLink;
    }
    else if (window.location.host.includes('dock7')) {
        let index = window.location.host.indexOf('bkd.dock7');
        let strOut = window.location.host.substr(index);
        document.cookie = encodeURIComponent('isSubdomain') + '=' + encodeURIComponent('false') + "; " + encodeURIComponent('domain') + '=' + encodeURIComponent(strOut);
        document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + "; " + encodeURIComponent('domain') + '=' + encodeURIComponent(strOut);
        document.location = window.location.protocol + "//" + subdomain + strOut + regionLink;
    }
    else if (window.location.host.includes('bkdrf')) {
        let index = window.location.host.indexOf('bkdrf');
        let strOut = window.location.host.substr(index);
        document.cookie = encodeURIComponent('isSubdomain') + '=' + encodeURIComponent('false') + "; " + encodeURIComponent('domain') + '=' + encodeURIComponent(strOut);
        document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(value) + "; " + encodeURIComponent('domain') + '=' + encodeURIComponent(strOut);
        document.location = window.location.protocol + "//" + subdomain + strOut + regionLink;
    }
});