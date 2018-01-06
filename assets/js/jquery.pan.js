jQuery.fn.extend({

    pan: function () {
	
	var panWrapper = document.createElement('div');
	jQuery(panWrapper).addClass("panWrapper");
	
	var panImg=document.createElement('img');
	jQuery(panImg).addClass("i").css("position","absolute");
	
	var zi=document.createElement('a');
	jQuery(zi).addClass("controls in");
	jQuery(panWrapper).append(zi);
	
	var zo=document.createElement('a');
	jQuery(zo).addClass("controls out");
	jQuery(panWrapper).append(zo);
	
	var close=document.createElement('a');
	jQuery(close).addClass("controls close");
	jQuery(panWrapper).append(close);
	
	jQuery(panWrapper).append(panImg);
	jQuery("body").append(panWrapper);
	
	jQuery(this).click(function(e){
		var t=jQuery(this);
        var big = t.attr("data-big");
		jQuery(".panWrapper").show();
        jQuery(".panWrapper img.i").css("width","auto").attr("src",big).load(function(){panInit();});
		return false;
	});
	
	jQuery(zi).click(function(e){
		var panImg=jQuery(".panWrapper img.i");
		panImg.css("width",parseInt( parseInt(panImg.css("width"))*1.2));
		panInit(); 
	});
	
	jQuery(zo).click(function(e){
		var panImg=jQuery(".panWrapper img.i");
		panImg.css("width",parseInt( parseInt(panImg.css("width"))/1.2)+1);
		panInit(); 
	});
	
	jQuery(close).click(function (e) { 
		jQuery(".panWrapper").fadeOut("slow"); 
	});
	
    jQuery(panWrapper).mousemove(function (e) { 
		panInit(); 
	});
	
	jQuery("body").keydown(function (e) {
        if (e.keyCode == 27) {
            jQuery(close).click();
        }
    });
	
	jQuery(panWrapper).mousewheel(function (evt) { 
		if(evt.deltaY>0)
			jQuery(zo).click();
		else
			jQuery(zi).click();
		panInit();
	});
	
	function panInit() {
		
		var panImg=jQuery(".panWrapper img.i");
		var panWrapper=jQuery(".panWrapper");
		
        var w = parseInt(panImg.css("width"));
        var h = parseInt(panImg.css("height"));
        var x = parseInt(panImg.css("left"));
        var y = parseInt(panImg.css("top"));

        var ml = 0 - (w - jQuery(panWrapper).width());
        var mt = 0 - (h - jQuery(panWrapper).height());

        var nl = parseInt((ml * parseInt(event.pageX)) / parseInt(jQuery(panWrapper).width()));
        var nt = parseInt((mt * parseInt(event.pageY)) / parseInt(jQuery(panWrapper).height()));
		
		if( parseInt(jQuery(panWrapper).width())>w && parseInt(jQuery(panWrapper).height())>h) {
			panImg.css("left", ((parseInt(jQuery(panWrapper).width()) - w)/2));
			panImg.css("top", ((parseInt(jQuery(panWrapper).height()) - h)/2));
		}
		else if(parseInt(jQuery(panWrapper).width())>w){
			panImg.css("left", ((parseInt(jQuery(panWrapper).width()) - w)/2));
			panImg.css("top", nt);
		}
		else if(parseInt(jQuery(panWrapper).height())>h){
			panImg.css("left", nl);
			panImg.css("top", ((parseInt(jQuery(panWrapper).height()) - h)/2));
		}
		else {
			panImg.css("left", nl);
			panImg.css("top", nt);
		}
    }
	
    }
});

 (function(){
	var prefix = "", _addEventListener, onwheel, support;
	
    if ( window.addEventListener ) {
        _addEventListener = "addEventListener";
    } else {
        _addEventListener = "attachEvent";
        prefix = "on";
    }
 
    if ( document.onmousewheel !== undefined ) {
        support = "mousewheel";
    }
    try {
        WheelEvent("wheel");
        support = "wheel";
    } catch (e) {}
    if ( !support ) {
        support = "DOMMouseScroll";
    }
 
    window.addWheelListener = function( elem, callback, useCapture ) {
        _addWheelListener( elem, support, callback, useCapture );

        if( support == "DOMMouseScroll" ) {
            _addWheelListener( elem, "MozMousePixelScroll", callback, useCapture );
        }
    };
 
    function _addWheelListener( elem, eventName, callback, useCapture ) {
        elem[ _addEventListener ]( prefix + eventName, support == "wheel" ? callback : function( originalEvent ) {
            !originalEvent && ( originalEvent = window.event );

            var event = {
                originalEvent: originalEvent,
                target: originalEvent.target || originalEvent.srcElement,
                type: "wheel",
                deltaMode: originalEvent.type == "MozMousePixelScroll" ? 0 : 1,
                deltaX: 0,
                delatZ: 0,
                preventDefault: function() {
                    originalEvent.preventDefault ?
                        originalEvent.preventDefault() :
                        originalEvent.returnValue = false;
                }
            };
             
            if ( support == "mousewheel" ) {
                event.deltaY = - 1/40 * originalEvent.wheelDelta;
                originalEvent.wheelDeltaX && ( event.deltaX = - 1/40 * originalEvent.wheelDeltaX );
            } else {
                event.deltaY = originalEvent.detail;
            }
 
            return callback( event );
 
        }, useCapture || false );
    }

	jQuery.fn.mousewheel = function(handler) {
		return this.each(function() {
			window.addWheelListener(this, handler, true);
		});
	};
 })(jQuery);