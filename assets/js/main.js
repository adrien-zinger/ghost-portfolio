"use strict";

var position = jQuery(window).scrollTop();

jQuery(document).on("ready", function () {
    jQuery(window).on('scroll', function () {
        animateLogoBackground();
    });
    jQuery(".site-content").fitVids();
    jQuery('.default-menu ul').addClass('main-menu sm sm-clean');
    jQuery(".pan").pan();
});



jQuery(window).on('load', function () {

    //Home Carousel Slider
    jQuery(".carousel-slider .carousel").each(function () {
        jQuery(this).flickity({
            contain: true,
            freeScroll: true,
            cellAlign: 'left',
            pageDots: false
        });
    });

    //Set menu
    jQuery('.main-menu').smartmenus({
        subMenusSubOffsetX: 1,
        subMenusSubOffsetY: -1,
        markCurrentItem: true
    });

    var $mainMenu = jQuery('.main-menu').on('click', 'span.sub-arrow', function (e) {
        var obj = $mainMenu.data('smartmenus');
        if (obj.isCollapsible()) {
            var $item = jQuery(this).parent(),
                    $sub = $item.parent().dataSM('sub');
            $sub.dataSM('arrowClicked', true);
        }
    }).bind({
        'beforeshow.smapi': function (e, menu) {
            var obj = $mainMenu.data('smartmenus');
            if (obj.isCollapsible()) {
                var $menu = jQuery(menu);
                if (!$menu.dataSM('arrowClicked')) {
                    return false;
                }
                $menu.removeDataSM('arrowClicked');
            }
        }
    });
    jQuery('#hamburger').on("click", showHideSmartmenu);
    jQuery('.doc-loader').fadeOut();

    var TxtRotate = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
      };
      
      TxtRotate.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];
      
        if (this.isDeleting) {
          this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
          this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
      
        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
      
        var that = this;
        var delta = 300 - Math.random() * 100;
      
        if (this.isDeleting) { delta /= 2; }
      
        if (!this.isDeleting && this.txt === fullTxt) {
          delta = this.period;
          this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
          this.isDeleting = false;
          this.loopNum++;
          delta = 500;
        }
      
        setTimeout(function() {
          that.tick();
        }, delta);
      };
      
      var txtRotateStart = function() {
        var elements = document.getElementsByClassName('txt-rotate');
        for (var i=0; i<elements.length; i++) {
          var toRotate = elements[i].getAttribute('data-rotate');
          var period = elements[i].getAttribute('data-period');
          if (toRotate) {
            new TxtRotate(elements[i], JSON.parse(toRotate), period);
          }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
        document.body.appendChild(css);
      };

      txtRotateStart();
});

var showHideSmartmenu = function (e) {
    e.preventDefault();
    jQuery('#hamburger').off("click");
    jQuery('#hamburger').toggleClass("on");

    jQuery('html, body, .sidebar, .menu-left-part, .menu-right-part, .site-content')
        .toggleClass("open")
        .delay(300)
        .queue(function (next) {
            jQuery(this).toggleClass("done");
            next();
        }
    );
    jQuery('#hamburger').on("click", showHideSmartmenu);
};

function is_touch_device() {
    return !!('ontouchstart' in window);
}
