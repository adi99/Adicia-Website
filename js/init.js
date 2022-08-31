
/*
 * Copyright (c) 2022 Frenify
 * Author: Frenify
 * This file is made for CURRENT TEMPLATE
*/


// filter array
var MetaPortalFilterArray		= [];


(function($){
  "use strict";
	
	var FrenifyPreloader 	= false;
  	var FrenifyTime 		= new Date();
	var FrenifyCounter		= 0;
  
	var FrenifyMetaPortal = {
		
		init: function(){
			FrenifyMetaPortal.ready();
			FrenifyMetaPortal.menuCenter();
			FrenifyMetaPortal.imgToSVG();
			FrenifyMetaPortal.BgImg();
			FrenifyMetaPortal.totopFixer();
			FrenifyMetaPortal.slider();
			FrenifyMetaPortal.headerFixer();
			FrenifyMetaPortal.fn_cs_counter();
			FrenifyMetaPortal.video();
			FrenifyMetaPortal.collection();
			FrenifyMetaPortal.contactForm();
			FrenifyMetaPortal.totopScroll();
			FrenifyMetaPortal.seachSomething();
			FrenifyMetaPortal.walletAndLeftNavOpener();
			FrenifyMetaPortal.resizeWalletAndLeftNav();
			FrenifyMetaPortal.headerAnchor();
			FrenifyMetaPortal.isotope();
			FrenifyMetaPortal.qnt();
			FrenifyMetaPortal.countdown();
			FrenifyMetaPortal.hold();
			FrenifyMetaPortal.filterItems();
			FrenifyMetaPortal.applyFilter();
			FrenifyMetaPortal.navSubMenu();
			FrenifyMetaPortal.roadmapSwiper();
		},
		
		/* since v3.0 */
		roadmapSwiper: function(){
			// slider
			var section		= $('.fn_cs_roadmap .swiper-container');
			section.each(function(){
				var element				= $(this);
				// Main Slider
				var mainSliderOptions 	= {
					loop: false,
					speed: 1500,
					autoplay:{
						delay: 5000,
						disableOnInteraction: false,
					},
					slidesPerView: 4,
					spaceBetween: 40,
					direction: 'horizontal',
					loopAdditionalSlides: 10,
					watchSlidesProgress: true,
					breakpoints: {
						768: {
							slidesPerView: 1
						},
						1040: {
							slidesPerView: 2
						},
						1200: {
							slidesPerView: 3
						},
						1400: {
							slidesPerView: 4
						}
					}
				};
				var mySwiper = new Swiper(element, mainSliderOptions);
				var slidersCount = mySwiper.params.loop ? mySwiper.slides.length - 2 : mySwiper.slides.length;
				var widthParts = 100 / slidersCount;
				
				var step = element.closest('.fn_cs_roadmap').find('.step_in');
				
				FrenifyMetaPortal.roadmapStep(mySwiper,step,widthParts);
				
				mySwiper.on('slideChange', function () {
					FrenifyMetaPortal.roadmapStep(this,step,widthParts);
				});
			});	
		},
		
		roadmapStep: function(mySwiper,step,widthParts){
			var breakpoint = parseInt(mySwiper.currentBreakpoint);
			var viewBox;
			switch(breakpoint){
				case 1400: viewBox = 4; break;
				case 1200: viewBox = 3; break;
				case 1040: viewBox = 4; break;
				case 768: viewBox = 1; break;
				default: viewBox = 4;
			}

			step.css({width: (mySwiper.activeIndex+viewBox)*widthParts + '%'});
		},
		
		translateVal: function(el) {
			var progress = el.style.transform.match(/translate3d\((.+)px,(.+)px,(.+)px\)/);
			return progress[1];
		},
		
		menuCenter: function(){
			var left 		= $('.header .trigger_logo');
			var right 		= $('.header .wallet');
			var nav 		= $('.header .nav');
			var leftWidth 	= 0;
			var rightWidth 	= 0;
			if(left.length){
				leftWidth 	= parseInt(left.width());
			}
			if(right.length){
				rightWidth 	= parseInt(right.width());
			}
			
			if(leftWidth < rightWidth){
				nav.css({paddingLeft: ((rightWidth - leftWidth)) + 'px'});
			}else{
				nav.css({paddingRight: ((leftWidth - rightWidth)) + 'px'});
			}
			nav.css({opacity: 1});
			
		},
		
		navSubMenu: function(){
			$('.metaportal_fn_leftnav .nav_holder a').off().on('click',function(){
				var e = $(this);
				var s = e.siblings('.sub-menu');
				var svg = $('.metaportal_fn_leftnav .nav_holder .icon').html();
				if(s.length){
					FrenifyCounter++;
					if(!s.find('>li>.prev').length){
						s.prepend('<li><a href="#" class="prev"><span class="creative_link">'+svg+e.text()+'</span></a></li>');
					}
					$('.metaportal_fn_leftnav .nav_holder > ul').css({transform: 'translateX(-'+(100*FrenifyCounter)+'%)'});
					FrenifyMetaPortal.previousItems();
					return false;
				}
			});
		},
		
		previousItems: function(){
			$('.metaportal_fn_leftnav .nav_holder .prev').off().on('click',function(){
				FrenifyCounter--;
				$('.metaportal_fn_leftnav .nav_holder > ul').css({transform: 'translateX(-'+(100*FrenifyCounter)+'%)'});
				return false;
			});	
		},
		
		isotopeCollection: function(){
			$('.grid').isotope({
				itemSelector: 'li', // .element-item
				layoutMode: 'fitRows'
			});
		},
		
		
		applyFilter: function(){
			
			// initialization isotope function to our items
			FrenifyMetaPortal.isotopeCollection();
			
			// left filter on click function
			$('.metaportal_fn_filters .checkbox').off().on('click',function(){
				
					// our clicked filter
				var element 	= $(this),
					
					// collection wrapper
					parent		= element.closest('.metaportal_fn_collection'),
					
					// filter result box
					resultBox	= parent.find('.metaportal_fn_result_box'),
					
					// detect selected filter ID
					id 			= element.data('id'),
					
					// get category name
					category 	= element.data('category'),
					
					// get filter name
					filterName	= element.find('.text').text(),
					
					// filter counter wrapper
					filterCount = resultBox.find('.filter_count span');
				
				// if clicked item has clicked first time
				if(!element.hasClass('selected')){
					
					// attach 'selected' class to our filter
					element.addClass('selected');
					
					// add 'clear all' button to our result box if there was no any filters early
					if(resultBox.find('.result_item').length === 0){
						resultBox.append('<a href="#" class="clear_all">Clear All</a>');
					}
					
					// find our 'clear all' button and add our new filter before the button
					resultBox.find('.clear_all').before('<div class="result_item" data-id="'+id+'"><a href="#" title="Remove Filter">' + category + ': '+'<span>' + filterName + '</span>' + '<img src="svg/cancel.svg" alt="" class="fn__svg"></a></div>');
					
					// change selected filter checkbox value into 'checked'
					element.find('input[type="checkbox"]').prop('checked','checked');
					
					// increase filter count and insert into our counter wrapper
					filterCount.text(parseInt(filterCount.text())+1);
					
					// add new filter id into our filters array in order to apply isotope filter for items next
					MetaPortalFilterArray.push(id);
					
					// recall image to svg functions, because we have added new button where has an svg icon
					FrenifyMetaPortal.imgToSVG();
					
					// recall remove filter function, because we have added new filter
					FrenifyMetaPortal.removeFilter();
				}
				// if clicked item has already clicked and clicked second time
				else{
					
					// remove attached 'selected' class
					element.removeClass('selected');
					
					// remove this filter from result box
					parent.find('.result_item[data-id="'+id+'"]').remove();
					
					// remove 'clear all' button if removed filter was the only one (alone)
					if(resultBox.find('.result_item').length === 0){
						resultBox.find('.clear_all').remove();
					}
					
					// change selected filter checkbox value into 'not checked'
					element.find('input[type="checkbox"]').prop('checked','');
					
					// decrease filter count and insert into our counter wrapper
					filterCount.text(parseInt(filterCount.text())-1);
					
					// remove new filter ID from our filters array in order to apply isotope filter for items next
					var index = MetaPortalFilterArray.indexOf(id);
					if(index !== -1){
						MetaPortalFilterArray.splice(index, 1);
					}
				}
				
				
				FrenifyMetaPortal.recallGridAfterFiltering();
				
				return false;
			});
			
			// call remove filter function
			FrenifyMetaPortal.removeFilter();
		},
		
		recallGridAfterFiltering: function(clear){
			var $grid = $('.grid').isotope({
				itemSelector: 'li', // .element-item
				layoutMode: 'fitRows'
			});
			if(clear === 'clear'){
				$grid.isotope({ filter: '*' });
				MetaPortalFilterArray = [];
				return false;
			}
			
			// selected filters
			var filters = '';

			// if there is no any selected filters
			if(MetaPortalFilterArray.length === 0){
				filters = '*';
			}
			// if there has one or more selected filters
			else{
				$.each(MetaPortalFilterArray, function(index,value){
					filters += '.id'+value;
				});
			}
			// run isotope after filter has been clicked
			$grid.isotope({ filter: filters });
		},
		
		removeFilter: function(){
			$('.metaportal_fn_result_box .result_item a').off().on('click',function(){
				var e 			= $(this),
					parent		= e.closest('.metaportal_fn_collection'),
					resultItem	= e.closest('.result_item'),
					resultBox	= parent.find('.metaportal_fn_result_box'),
					id 			= resultItem.data('id'),
					filterCount = resultBox.find('.filter_count span');
				resultItem.remove();
				parent.find('.metaportal_fn_filters .checkbox[data-id="'+id+'"]').removeClass('selected').find('input[type="checkbox"]').prop('checked','');
				filterCount.text(parseInt(filterCount.text())-1);
				if(resultBox.find('.result_item').length === 0){
					resultBox.find('.clear_all').remove();
				}
				// remove new filter ID from our filters array in order to apply isotope filter for items next
				var index = MetaPortalFilterArray.indexOf(id);
				if(index !== -1){
					MetaPortalFilterArray.splice(index, 1);
				}
				FrenifyMetaPortal.recallGridAfterFiltering();
				return false;
			});
			
			$('.metaportal_fn_result_box .clear_all').off().on('click',function(){
				var e 			= $(this),
					parent		= e.closest('.metaportal_fn_collection'),
					filterBox	= parent.find('.metaportal_fn_filters'),
					resultBox	= parent.find('.metaportal_fn_result_box'),
					filterCount = resultBox.find('.filter_count span');
				filterCount.text(0);
				resultBox.find('.result_item').remove();
				e.remove();
				filterBox.find('.checkbox').removeClass('selected').find('input[type="checkbox"]').prop('checked','');
				FrenifyMetaPortal.recallGridAfterFiltering('clear');
				return false;
			});
		},
		
		filterItems: function(){
			$('.metaportal_fn_filters .filter_item.opened').each(function(){
				var e = $(this);
				e.find('.filter_item__content').slideDown(300);
			});
			$('.filter_item__header a').off().on('click',function(){
				var parent = $(this).closest('.filter_item');
				if(parent.hasClass('opened')){
					parent.removeClass('opened');
					parent.find('.filter_item__content').slideUp(300);
				}else{
					parent.addClass('opened');
					parent.find('.filter_item__content').slideDown(300);
				}
				return false;
			});
		},
		
		hold: function(){
			var inactivityTime = function () {
				var time;
				var holdable			= $('#social,.metaportal_fn_search');
				window.onload 			= resetTimer;
				document.onmousemove 	= resetTimer;
				document.onkeypress	 	= resetTimer;
				function logout() {
					holdable.addClass('hold');
				}
				function resetTimer() {
					clearTimeout(time);
					time = setTimeout(logout, 2000);
					holdable.removeClass('hold');
				}
			};
			inactivityTime();
		},
			
		
		
		countdown: function(){
			$('.metaportal_fn_countdown').each(function(){
				var e = $(this),
					t = e.data('type');
				if(t === 'due_date'){
				var countDownDate = new Date(e.data('date')).getTime();
				}else if(t === 'ever'){
					var days 	= parseInt(e.data('days')) * 24 * 3600,
						hours	= parseInt(e.data('hours')) * 3600,
						minutes	= parseInt(e.data('minutes')) * 60,
						seconds	= parseInt(e.data('seconds'));
					var ever	= days + hours + minutes + seconds;
				}
				var p = e.parent();
				if(e.hasClass('boxed')){
					e.after('<div class="metaportal_fn_boxed_countdown"><ul><li class="days"><div class="item"><div class="count"><h3 class="fn__gradient_title"></h3></div><span>Days</span></div></li><li class="hours"><div class="item"><div class="count"><h3 class="fn__gradient_title"></h3></div><span>Hours</span></div></li><li class="minutes"><div class="item"><div class="count"><h3 class="fn__gradient_title"></h3></div><span>Minutes</span></div></li><li class="seconds"><div class="item"><div class="count"><h3 class="fn__gradient_title"></h3></div><span>Seconds</span></div></li></ul></div>');
					e.remove();
				}
				if(t === 'due_date'){
					// Update the count down every 1 second
					setInterval(function() {
						// Get today's date and time
						var now = new Date().getTime();

						// Find the distance between now and the count down date
						var distance = countDownDate - now;

						// Time calculations for days, hours, minutes and seconds
						var days = Math.floor(distance / (1000 * 60 * 60 * 24));
						var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
						var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
						var seconds = Math.floor((distance % (1000 * 60)) / 1000);

						if(e.hasClass('boxed')){
							days = (days < 10 ? '0' + days : days);
							hours = (hours < 10 ? '0' + hours : hours);
							minutes = (minutes < 10 ? '0' + minutes : minutes);
							seconds = (seconds < 10 ? '0' + seconds : seconds);
							p.find('.days h3').text(days);
							p.find('.hours h3').text(hours);
							p.find('.minutes h3').text(minutes);
							p.find('.seconds h3').text(seconds);
						}else{
							var text = '';
							if(days > 0){text += days + 'd: ';}
							text += hours + 'h: ' + minutes + 'm: ' + seconds + 's';
							e.text(text);
						}
						
					}, 1000);
				}else if(t === 'ever'){
					setInterval(function(){
						days 	= Math.floor(ever / 86400);
						hours	= Math.floor((ever % 86400) / 3600);
						minutes	= Math.floor((ever % 3600) / 60);
						seconds	= Math.floor((ever % 60));
							
						if(e.hasClass('boxed')){
							days = (days < 10 ? '0' + days : days);
							hours = (hours < 10 ? '0' + hours : hours);
							minutes = (minutes < 10 ? '0' + minutes : minutes);
							seconds = (seconds < 10 ? '0' + seconds : seconds);
							p.find('.days h3').text(days);
							p.find('.hours h3').text(hours);
							p.find('.minutes h3').text(minutes);
							p.find('.seconds h3').text(seconds);
						}else{
							var text = '';
							if(days > 0){text += days + 'd: ';}
							text += hours + 'h: ' + minutes + 'm: ' + seconds + 's';
							e.text(text);
						}
						ever--;
					}, 1000);
				}
			});
		},
		
		qnt: function(){
			$('.qnt .decrease').off().on('click',function(){
				var e = $(this),
					s = e.closest('.qnt').find('.summ');
				var sVal = parseInt(s.text());
				if(sVal >= 2){sVal--;}
				s.text(sVal);
				var price = sVal * s.data('price');
				s.closest('.mint_list').find('.total_price').html(price);
				return false;
			});
			$('.qnt .increase').off().on('click',function(){
				var e = $(this),
					s = e.closest('.qnt').find('.summ');
				var sVal = parseInt(s.text());
				sVal++;
				s.text(sVal);
				var price = sVal * s.data('price');
				s.closest('.mint_list').find('.total_price').html(price);
				return false;
			});
		},
		isotope: function(){
			$('.fn-isotope').isotope({
				itemSelector: '.isotope-item',
				masonry: {}
			});
		},
		
		headerAnchor: function(){
			$('.header .nav a').on('click',function(){
				var e = $(this);
				if($(e.attr('href')).length){
					$("html, body").animate({ scrollTop: $(e.attr('href')).offset().top }, 1000);
				}
			});
		},
		
		resizeWalletAndLeftNav: function(){
			var walletHeight = $('.metaportal_fn_walletbox').height();
			$('.metaportal_fn_walletbox .walletbox').css({minHeight: walletHeight});
			
			
			var leftnavHeight = $('.metaportal_fn_leftnav').height();
			$('.metaportal_fn_leftnav .navbox').css({minHeight: leftnavHeight});
		},
		
		ready: function(){
			$('.metaportal_fn_walletbox, .metaportal_fn_wallet_closer, .metaportal_fn_leftnav, .metaportal_fn_leftnav_closer').removeClass('ready');
		},
		
		walletAndLeftNavOpener: function(){
			var walletbox 	= $('.metaportal_fn_walletbox');
			var closer		= $('.metaportal_fn_wallet_closer,.metaportal_fn_walletbox .fn__closer');
			$('.wallet_opener').on('click',function(){
				walletbox.addClass('active');
				closer.addClass('active');
				
				return false;
			});
			closer.on('click',function(){
				walletbox.removeClass('active');
				closer.removeClass('active');
				
				return false;
			});
			
			var leftNav 	= $('.metaportal_fn_leftnav');
			var closer2		= $('.metaportal_fn_leftnav_closer,.metaportal_fn_leftnav .fn__closer');
			$('.header .trigger,.metaportal_fn_mobnav .social_trigger .trigger').on('click',function(){
				leftNav.addClass('active');
				closer2.addClass('active');
				
				return false;
			});
			closer2.on('click',function(){
				leftNav.removeClass('active');
				closer2.removeClass('active');
				
				return false;
			});
			var mobOpener 	= $('.metaportal_fn_mobnav .mob_mid .trigger');
			var mobDD		= $('.metaportal_fn_mobnav .mob_bot');
			mobOpener.on('click',function(){
				if(mobOpener.hasClass('active')){
					mobOpener.removeClass('active');
					mobDD.slideUp(300);
				}else{
					mobOpener.addClass('active');
					mobDD.slideDown(300);
				}
				
				return false;
			});
		},
		
		preloader: function(){
			if(FrenifyPreloader){return false;}FrenifyPreloader = true;
  			var date2 			= new Date();
			var difference		= date2-FrenifyTime;
			var waitTime 		= 3000;
			if(difference < waitTime){
				waitTime -= difference;
			}else{
				waitTime = 0;
			}
			setTimeout(function(){
				$('.metaportal_fn_preloader').addClass('ready');
			},waitTime);
		},
		
		seachSomething: function(){
			var searchOpener 	= $('.metaportal_fn_search');
			var searchbox 		= $('.metaportal_fn_searchbox');
			var searchCloser	= $('.metaportal_fn_search_closer');
			var input 			= searchbox.find('input');
			var button 			= searchbox.find('a');
			searchOpener.on('click',function(){
				if(searchbox.hasClass('active')){
					searchbox.removeClass('active');
					searchCloser.removeClass('active');
				}else{
					searchbox.addClass('active');
					searchCloser.addClass('active');
					input.val('');
					setTimeout(function(){
						input[0].focus();
					},100);
				}
				return false;
			});
			searchCloser.on('click',function(){
				searchbox.removeClass('active');
				searchCloser.removeClass('active');
				return false;
			});
			input.on("keypress", function(event) {
				if (event.key === "Enter") {
					event.preventDefault();
					button.trigger('click');
				}
			});
			button.on('click',function(){
				var string = $('.metaportal_fn_searchbox input').val();
				window.find(string);
				searchbox.removeClass('active');
				searchCloser.removeClass('active');
				return false;
			});
		},
		
		totopScroll: function(){
			var minSpeed 		= 500;
			var maxSpeed		= 1500;
			$(".metaportal_fn_totop").off().on('click', function(e) {
				e.preventDefault();
				var speed		= ($(window).scrollTop()-$(window).height())/2;
				if(speed < minSpeed){speed = minSpeed;}
				if(speed > maxSpeed){speed = maxSpeed;}
				$("html, body").animate({ scrollTop: 0 }, speed);
				return false;
			});
		},
		
		contactForm: function(){
			$(".contact_form #send_message").on('click', function(){
				var name 		= $(".contact_form #name").val();
				var email 		= $(".contact_form #email").val();
				var tel 		= $(".contact_form #tel").val();
				var subject 	= $(".contact_form #subject").val();
				var message 	= $(".contact_form #message").val();
				var success     = $(".contact_form .returnmessage").data('success');

				$(".contact_form .returnmessage").empty(); //To empty previous error/success message.
				//checking for blank fields	
				if(name === '' || email === '' || message === ''){
					$('.contact_form .empty_notice').slideDown(500).delay(2000).slideUp(500);
				}
				else{
					// Returns successful data submission message when the entered information is stored in database.
					$.post("modal/contact.php",{ ajax_name: name, ajax_email: email, ajax_subject: subject, ajax_message:message, ajax_tel: tel}, function(data) {

						$(".contact_form .returnmessage").append(data);//Append returned message to message paragraph


						if($(".contact_form .returnmessage span.contact_error").length){
							$(".contact_form .returnmessage").slideDown(500).delay(2000).slideUp(500);		
						}else{
							$(".contact_form .returnmessage").append("<span class='contact_success'>"+ success +"</span>");
							$(".contact_form .returnmessage").slideDown(500).delay(4000).slideUp(500);
						}

						if(data===""){
							$("#contact_form")[0].reset();//To reset form fields on success
						}

					});
				}
				return false; 
			});
		},
		
		collection: function(){
			$('.fn_cs_collection').each(function(){
				var collection = $(this);
				var items = collection.find('.item');
				var itemsLength = items.length;
				setInterval(function(){
					var numberOne = Math.floor(Math.random() * itemsLength);
					var numberTwo = Math.floor(Math.random() * itemsLength);

					while(numberTwo === numberOne){
						numberTwo = Math.floor(Math.random() * itemsLength);
					}
					var firstDiv = collection.find('.item').eq(numberOne);
					var secondDiv = collection.find('.item').eq(numberTwo);
					var firstImage = firstDiv.find('input').val();
					var secondImage = secondDiv.find('input').val();
					firstDiv.addClass('ready');	
					secondDiv.addClass('ready');
					setTimeout(function(){
						firstDiv.find('input').val(secondImage);
						firstDiv.find('.abs_img').css({backgroundImage: 'url('+secondImage+')'});
						secondDiv.find('input').val(firstImage);
						secondDiv.find('.abs_img').css({backgroundImage: 'url('+firstImage+')'});
						firstDiv.removeClass('ready');	
						secondDiv.removeClass('ready');
					},500);
				},2000);
			});
		},
		
		video: function(){
			$('.popup-youtube, .popup-vimeo').each(function() { // the containers for all your galleries
				$(this).magnificPopup({
					disableOn: 700,
					type: 'iframe',
					mainClass: 'mfp-fade',
					removalDelay: 160,
					preloader: false,
					fixedContentPos: false
				});
			});

			$('.popup-soundcloud').magnificPopup({
				type: 'image',
				gallery: {
					enabled: true, 
				},
			});	
		},
		
		fn_cs_counter: function(){
			$('.fn_cs_counter').each(function() {
				var el = $(this);
				el.waypoint({
					handler: function(){
						if(!el.hasClass('stop')){
							el.addClass('stop').countTo({
								refreshInterval: 50,
								formatter: function (value, options) {
									return value.toFixed(options.decimals).replace(/\B(?=(?:\d{3})+(?!\d))/g, '');
								},	
							});
						}
					},
					offset:'90%'	
				});
			});	
		},
		
		headerFixer: function(){
			var body		= $('body');
			var header		= $('.header');
			var scrollTop 	= $(window).scrollTop();
			if(scrollTop > 10){
				header.addClass('active');
			}else{
				header.removeClass('active');
			}
			if(scrollTop > 300){
				body.addClass('totop-active');
			}else{
				body.removeClass('totop-active');
			}
		},
		
		slider: function(){
			$('.fn_cs_slider').each(function(){
				var slider 			= $(this);
				
				var sliderTop 		= slider.find('.slider_top');
				var sliderBottom 	= slider.find('.slider_content');
				var activeIndex 	= 2;
				var speed			= 6000; // milliseconds
				
				// init slider animation
				var myInterval 		= setInterval(function(){
					activeIndex++;
					activeIndex 	= FrenifyMetaPortal.sliderDo(sliderTop,sliderBottom,activeIndex);
				},speed);
				
				
				// previous navigation button
				slider.find('.slider_nav .prev').off().on('click',function(){
					clearInterval(myInterval);
					activeIndex--;
					activeIndex 	= FrenifyMetaPortal.sliderDo(sliderTop,sliderBottom,activeIndex);
					myInterval 		= setInterval(function(){
						activeIndex++;
						activeIndex = FrenifyMetaPortal.sliderDo(sliderTop,sliderBottom,activeIndex);
					},speed);
					return false;
				});
				
				// next navigation button
				slider.find('.slider_nav .next').off().on('click',function(){
					clearInterval(myInterval);
					activeIndex++;
					activeIndex 	= FrenifyMetaPortal.sliderDo(sliderTop,sliderBottom,activeIndex);
					myInterval 		= setInterval(function(){
						activeIndex++;
						activeIndex = FrenifyMetaPortal.sliderDo(sliderTop,sliderBottom,activeIndex);
					},speed);
					return false;
				});
				
				// previous and next item
				slider.find('.slider_top li').off().on('click',function(){
					var getClass = $(this).attr('class');
					if(getClass === 'next'){
						activeIndex++;
					}else if(getClass === 'prev'){
						activeIndex--;
					}else{
						return false;
					}
					clearInterval(myInterval);
					activeIndex 	= FrenifyMetaPortal.sliderDo(sliderTop,sliderBottom,activeIndex);
					myInterval 		= setInterval(function(){
						activeIndex++;
						activeIndex = FrenifyMetaPortal.sliderDo(sliderTop,sliderBottom,activeIndex);
					},speed);
					return false;
				});
			});
				
		},
		
		sliderDo: function(sliderTop,sliderBottom,activeIndex){
			var topLength	= sliderTop.find('li').length;
			if(activeIndex > topLength){activeIndex-=topLength;}
			var indexPrev	= activeIndex - 1;
			var indexPrev2	= activeIndex - 2;
			var indexNext 	= activeIndex + 1;
			var indexNext2 	= activeIndex + 2;
			if(indexPrev > topLength){indexPrev-=topLength;}
			if(indexPrev2 > topLength){indexPrev2-=topLength;}
			if(indexNext > topLength){indexNext-=topLength;}
			if(indexNext2 > topLength){indexNext2-=topLength;}
			if(indexPrev < 1){indexPrev += topLength;}
			if(indexPrev2 < 1){indexPrev2 += topLength;}
			if(activeIndex < 1){activeIndex += topLength;}
			if(indexNext < 1){indexNext += topLength;}
			if(indexNext2 < 1){indexNext2 += topLength;}
			sliderTop.find('li').removeClass('prev prev2 active next next2');
			sliderTop.find('li[data-index="'+indexPrev2+'"]').addClass('prev2');
			sliderTop.find('li[data-index="'+indexPrev+'"]').addClass('prev');
			sliderTop.find('li[data-index="'+activeIndex+'"]').addClass('active');
			sliderTop.find('li[data-index="'+indexNext+'"]').addClass('next');
			sliderTop.find('li[data-index="'+indexNext2+'"]').addClass('next2');
			return activeIndex;
		},
		
		
		totopFixer: function(){
			var w = $('.metaportal_fn_totop .totop_inner').width();	
			$('.metaportal_fn_totop').css({height: w + 'px'});
		},
		
		imgToSVG: function(){
			$('img.fn__svg').each(function(){
				var img 		= $(this);
				var imgClass	= img.attr('class');
				var imgURL		= img.attr('src');

				$.get(imgURL, function(data) {
					var svg 	= $(data).find('svg');
					if(typeof imgClass !== 'undefined') {
						svg 	= svg.attr('class', imgClass+' replaced-svg');
					}
					img.replaceWith(svg);

				}, 'xml');

			});
		},

	  	BgImg: function(){
			var div = $('*[data-bg-img]');
			div.each(function(){
				var element = $(this);
				var attrBg	= element.attr('data-bg-img');
				var dataBg	= element.data('bg-img');
				if(typeof(attrBg) !== 'undefined'){
					element.css({backgroundImage:'url('+dataBg+')'});
				}
			});
		},
    
  	};
  	
	
	// READY Functions
	$(document).ready(function(){
		FrenifyMetaPortal.init();
		setTimeout(function(){
			FrenifyMetaPortal.isotope();
			FrenifyMetaPortal.isotopeCollection();
		},150);
	});
	
	// RESIZE Functions
	$(window).on('resize',function(){
		FrenifyMetaPortal.resizeWalletAndLeftNav();
		FrenifyMetaPortal.totopFixer();
		FrenifyMetaPortal.isotope();
		FrenifyMetaPortal.isotopeCollection();
		FrenifyMetaPortal.roadmapSwiper();
	});
	
	// LOAD Functions
	$(window).on('load',function(){
		FrenifyMetaPortal.preloader();
		FrenifyMetaPortal.isotope();
		FrenifyMetaPortal.isotopeCollection();
		
		setTimeout(function(){
			
			FrenifyMetaPortal.isotope();
			FrenifyMetaPortal.isotopeCollection();
		},200);
	});
	
	$(window).on('scroll',function(){
		FrenifyMetaPortal.headerFixer();
	});
	
  	window.addEventListener("load", function(){
		FrenifyMetaPortal.preloader();
	});
	
})(jQuery);