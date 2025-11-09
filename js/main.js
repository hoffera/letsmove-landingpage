/*  ---------------------------------------------------
  Template Name: Activitar
  Description:  Activitar Fitness HTML Template
  Author: Colorlib
  Author URI: https://colorlib.com
  Version: 1.0
  Created: Colorlib
---------------------------------------------------------  */

'use strict';

(function ($) {

    /*------------------
        Preloader
    --------------------*/
    $(window).on('load', function () {
        $(".loader").fadeOut();
        $("#preloder").delay(200).fadeOut("slow");

        /*------------------
            Gallery filter
        --------------------*/
        $('.gallery-controls ul li').on('click', function() {
            $('.gallery-controls ul li').removeClass('active');
            $(this).addClass('active');
        });
        if($('.gallery-filter').length > 0 ) {
            var containerEl = document.querySelector('.gallery-filter');
            var mixer = mixitup(containerEl);
        }

        $('.blog-gird').masonry({
			itemSelector: '.grid-item',
			columnWidth: '.grid-sizer',
		});

    });

    /*------------------
        Background Set
    --------------------*/
    $('.set-bg').each(function () {
        var bg = $(this).data('setbg');
        $(this).css('background-image', 'url(' + bg + ')');
    });

    /*------------------
		Navigation
	--------------------*/
    $(".mobile-menu").slicknav({
        prependTo: '#mobile-menu-wrap',
        allowParentLinks: true
    });

    /*------------------
		Menu Hover
	--------------------*/
    $(".header-section .nav-menu .mainmenu ul li").on('mousehover', function() {
        $(this).addClass('active');
    });
    $(".header-section .nav-menu .mainmenu ul li").on('mouseleave', function() {
        $('.header-section .nav-menu .mainmenu ul li').removeClass('active');
    });

    /*------------------
        Carousel Slider
    --------------------*/
    $(".hero-items").owlCarousel({
        loop: true,
        margin: 0,
        nav: true,
        items: 1,
        dots: true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        navText: ['<i class="arrow_carrot-left"></i>', '<i class="arrow_carrot-right"></i>'],
        smartSpeed: 1200,
        autoHeight: false,
    });

    /*------------------
        Testimonial Slider
    --------------------*/
   $(".testimonial-slider").owlCarousel({
        loop: true,
        margin: 0,
        nav: false,
        items: 1,
        dots: true,
        navText: ['<i class="arrow_carrot-left"></i>', '<i class="arrow_carrot-right"></i>'],
        smartSpeed: 1200,
        autoHeight: false,
        autoplay: true,
    });

    /*------------------
        Magnific Popup
    --------------------*/
    $('.video-popup').magnificPopup({
        type: 'iframe'
    });

    $('.image-popup').magnificPopup({
        type: 'image'
    });

    /*------------------
        Magnific Popup
    --------------------*/
    $('.show-result-select').niceSelect();

    /*------------------
       Timetable Filter
    --------------------*/
    $('.timetable-controls ul li').on('click', function() {
        var tsfilter = $(this).data('tsfilter');
        $('.timetable-controls ul li').removeClass('active');
        $(this).addClass('active');
        
        if(tsfilter == 'all') {
            $('.classtime-table').removeClass('filtering');
            $('.ts-item').removeClass('show');
        } else {
            $('.classtime-table').addClass('filtering');
        }
        $('.ts-item').each(function(){
            $(this).removeClass('show');
            if($(this).data('tsmeta') == tsfilter) {
                $(this).addClass('show');
            }
        });
    });

    /*------------------
       Toggle Option (Price Plan)
    --------------------*/
    $('.toggle-option .toggle-btn').on('click', function() {
        $('.toggle-option .toggle-btn').removeClass('active');
        $(this).addClass('active');
        var option = $(this).data('option');
        
        // Esconder todas as classes de preço
        $('.price-plan').hide();
        
        // Mostrar apenas a classe correspondente
        if (option === 'monthly') {
            $('.price-monthly').show();
        } else if (option === 'quarterly') {
            $('.price-quarterly').show();
        } else if (option === 'years') {
            $('.price-years').show();
        }
    });

    /*------------------
       URL Routing - Scroll to Section
    --------------------*/
    function scrollToSection(sectionId) {
        var $section = $('#' + sectionId);
        if ($section.length) {
            var headerHeight = $('.header-section').outerHeight() || 100;
            var targetPosition = $section.offset().top - headerHeight;
            
            $('html, body').animate({
                scrollTop: targetPosition
            }, 800, 'swing');
        }
    }

    // Verificar URL ao carregar a página
    $(document).ready(function() {
        var path = window.location.pathname;
        var hash = window.location.hash;
        
        // Se a URL contém /planos, fazer scroll até a seção
        if (path.includes('/planos') || path.endsWith('/planos')) {
            setTimeout(function() {
                scrollToSection('planos');
            }, 500); // Aguardar o preloader
        }
        
        // Se há hash na URL (ex: #planos), fazer scroll
        if (hash) {
            var sectionId = hash.substring(1); // Remove o #
            setTimeout(function() {
                scrollToSection(sectionId);
            }, 500);
        }
    });

    // Interceptar cliques em links que começam com /planos
    $(document).on('click', 'a[href*="/planos"], a[href*="#planos"]', function(e) {
        var href = $(this).attr('href');
        
        // Se o link é para a mesma página com /planos ou #planos
        if (href.includes('/planos') || href.includes('#planos')) {
            e.preventDefault();
            scrollToSection('planos');
            
            // Atualizar URL sem recarregar a página
            if (history.pushState) {
                history.pushState(null, null, '/planos');
            }
        }
    });

})(jQuery);