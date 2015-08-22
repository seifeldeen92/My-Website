/*-----------------------------------------------------------------------------------
/*
/* Init JS
/*
-----------------------------------------------------------------------------------*/

/*----------------------------------------------------*/
/* Pre-Loader and Custom scroll Settings
------------------------------------------------------ */

 $(window).load(function() {
		$('body').addClass('loaded');
		
		setTimeout(function(){ 
			$("#loader-wrapper").remove();
			$("html").niceScroll({
        cursorcolor: "#424242", // change cursor color in hex
        cursoropacitymin: 0, // change opacity when cursor is inactive (scrollabar "hidden" state), range from 1 to 0
        cursoropacitymax: 1, // change opacity when cursor is active (scrollabar "visible" state), range from 1 to 0
        cursorwidth: "5px", // cursor width in pixel (you can also write "5px")
        cursorborder: "none", // css definition for cursor border
        cursorborderradius: "5px", // border radius in pixel for cursor
        zindex: "auto", // change z-index for scrollbar div
        scrollspeed: 50, // scrolling speed
        mousescrollstep: 60, // scrolling speed with mouse wheel (pixel)
        touchbehavior: true, // enable cursor-drag scrolling like touch devices in desktop computer
        enablemousewheel: true, // nicescroll can manage mouse wheel events
        enablekeyboard: true, // nicescroll can manage keyboard events
        smoothscroll: true, // scroll with ease movement
        sensitiverail: true, // click on rail make a scroll
        cursorminheight: 32, // set the minimum cursor height (pixel)
        preservenativescrolling: true, // you can scroll native scrollable areas with mouse, bubbling mouse wheel event
        railoffset: false, // you can add offset top/left for rail position
        bouncescroll: true, // (only hw accell) enable scroll bouncing at the end of content as mobile-like
	    });
		}, 1000);		

});



 jQuery(document).ready(function($) {
 	console.log("ready");
/*----------------------------------------------------*/
/* FitText Settings
------------------------------------------------------ */
	
		setTimeout(function() {
		 $('h1.responsive-headline').fitText(1, { minFontSize: '40px', maxFontSize: '90px' });
	 }, 100);


/*----------------------------------------------------*/
/* Smooth Scrolling
------------------------------------------------------ */

	 $('.smoothscroll').on('click',function (e) {
			e.preventDefault();

			var target = this.hash,
			$target = $(target);

			$('html, body').stop().animate({
					'scrollTop': $target.offset().top
			}, 800, 'swing', function () {
					window.location.hash = target;
			});
	});

/*----------------------------------------------------*/
/*  Particle ground
------------------------------------------------------*/
	
	/* ---- particles.js config ---- */

	particlesJS.load('particles-bg', 'js/particles.json');

/*----------------------------------------------------*/
/* Highlight the current section in the navigation bar
------------------------------------------------------*/

	var sections = $("section");
	var navigation_links = $("#nav-wrap a");

	sections.waypoint({

			handler: function(event, direction) {

			 var active_section;

			active_section = $(this);
			if (direction === "up") active_section = active_section.prev();

			var active_link = $('#nav-wrap a[href="#' + active_section.attr("id") + '"]');

				 navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		},
		offset: '35%'

	});


	/*----------------------------------------------------*/
	/*  WOW js for animation
	------------------------------------------------------ */

	var wow = new WOW(
	  {
	    boxClass:     'wow',      // animated element css class (default is wow)
	    animateClass: 'animated', // animation css class (default is animated)
	    offset:       0,          // distance to the element when triggering the animation (default is 0)
	    mobile:       true,       // trigger animations on mobile devices (default is true)
	    live:         true,       // act on asynchronously loaded content (default is true)
	    callback:     function(box) {
	      // the callback is fired every time an animation is started
	      // the argument that is passed in is the DOM node being animated
	    },
	    scrollContainer: null // optional scroll container selector, otherwise use window
	  }
	);
	wow.init();

/*----------------------------------------------------*/
/*  Make sure that #header-background-image height is
/* equal to the browser height.
------------------------------------------------------ */

	 $('header').css({ 'height': $(window).height() });
	 $(window).on('resize', function() {

				$('header').css({ 'height': $(window).height() });
				$('body').css({ 'width': $(window).width() })
	 });


/*----------------------------------------------------*/
/*  Fade In/Out Primary Navigation
------------------------------------------------------*/

	 $(window).on('scroll', function() {

		var h = $('header').height();
		var y = $(window).scrollTop();
			var nav = $('#nav-wrap');

		 if ( (y > h*.20) && (y < h) && ($(window).outerWidth() > 768 ) ) {
				nav.fadeOut('fast');
		 }
			else {
				 if (y < h*.20) {
						nav.removeClass('opaque').fadeIn('fast');
				 }
				 else {
						nav.addClass('opaque').fadeIn('fast');
				 }
			}

	});


/*----------------------------------------------------*/
/*  Modal Popup
------------------------------------------------------*/

		$('.item-wrap a').magnificPopup({

			 type:'inline',
			 fixedContentPos: false,
			 removalDelay: 200,
			 showCloseBtn: false,
			 mainClass: 'mfp-fade'

		});

		$(document).on('click', '.popup-modal-dismiss', function (e) {
				e.preventDefault();
				$.magnificPopup.close();
		});


/*----------------------------------------------------*/
/*  Flexslider
/*----------------------------------------------------*/
	 $('.flexslider').flexslider({
			namespace: "flex-",
			controlsContainer: ".flex-container",
			animation: 'slide',
			controlNav: true,
			directionNav: false,
			smoothHeight: true,
			slideshowSpeed: 7000,
			animationSpeed: 600,
			randomize: false,
	 });

/*----------------------------------------------------*/
/*  contact form
------------------------------------------------------*/

	 $('form#contactForm button.submit').click(function() {

			$('#image-loader').fadeIn();

			var contactName = $('#contactForm #contactName').val();
			var contactEmail = $('#contactForm #contactEmail').val();
			var contactSubject = $('#contactForm #contactSubject').val();
			var contactMessage = $('#contactForm #contactMessage').val();

			var data = 'contactName=' + contactName + '&contactEmail=' + contactEmail +
							 '&contactSubject=' + contactSubject + '&contactMessage=' + contactMessage;

			$.ajax({

				type: "POST",
				url: "inc/sendEmail.php",
				data: data,
				success: function(msg) {

						// Message was sent
						if (msg == 'OK') {
							 $('#image-loader').fadeOut();
							 $('#message-warning').hide();
							 $('#contactForm').fadeOut();
							 $('#message-success').fadeIn();   
						}
						// There was an error
						else {
							 $('#image-loader').fadeOut();
							 $('#message-warning').html(msg);
							$('#message-warning').fadeIn();
						}

				}

			});
			return false;
	 });


});








