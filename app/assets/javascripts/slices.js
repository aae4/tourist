		
		$(function slices() {
				var $menu			= $('#menu'),
				$menuItems			= $menu.children('a'),
				$mbcontainer			= $('#container1'),
				$mbClose			= $mbcontainer.children('.close'),
				$mbContentItems		= $mbcontainer.children('.content1'),
				$mbContentInnerItems= $mbContentItems.children('.content1_inner');
				$mbPattern			= $('#mb_pattern'),
				$works				= $('#image-list > li'),
				
				Menu		 		= (function(){
					
					var init		= function() {
						preloadImages();
						initPlugins();
						initPattern();
						initEventsHandler();
					},
					
					preloadImages	= function() {
						$works.each(function(i) {
							$('<img/>').attr('src' , $(this).children('img').data('bgimg'));
						});
					},
					
					initPlugins		= function() {
						$mbContentInnerItems.jScrollPane({
							verticalDragMinHeight: 40,
							verticalDragMaxHeight: 40
						});
					},

					initPattern		= function() {
						for(var i = 0; i < 16 ; ++i) {
							var screenwidth=$(window).width();
							var o		= 0,
							t		= Math.floor(Math.random()*50) + 1, 
							l		= Math.floor(Math.random()*392) + (screenwidth/2.5), /*modify this value to move the squares where you like*//* do the same with all values*/
							a		= Math.floor(Math.random()*101) - 50; 
									
							$el		= $('<div>').css({
								opacity			: o,
								top				: t + 'px',
								left			: l + 'px',
							});
								
							if (!$.browser.msie)
								$el.transform({'rotate'	: a + 'deg'});
								
							$el.appendTo($mbPattern);
						}
						$mbPattern.children().draggable(); 
					},
					
					disperse 		= function() {
						$mbPattern.children().each(function(i) {
							var distance=$(window).width();
							var 
							o			= 0,
							t			= Math.floor(Math.random()*50) + 1, 
							l			= Math.floor(Math.random()* 294) + (distance/2.5), 
							a			= Math.floor(Math.random()*101) - 50;   /* disperse function. as the name says, it is the function which sends the squares back to the initial position. The values need to be the same as above */
							$el			= $(this),
							param		= {
								width	: '50px',
								height	: '50px',
								opacity	: o,
								top		: t + 'px',
								left	: l + 'px'
							};
									
							if (!$.browser.msie)
								param.rotate	= a + 'deg';
									
							$el.animate(param, 1000, 'easeOutExpo');
						});
					},
					
				
					initEventsHandler	= function() {

						$menuItems.bind('click', function(e) {
							var $this	= $(this),
							pos		= $this.index(),
							speed	= $this.data('speed'),
							easing	= $this.data('easing');
							
							if(!$menu.data('open')){
								if($menu.data('moving')) return false;
								$menu.data('moving', true);
								$.when(openItem(pos, speed, easing)).done(function(){
									$menu.data({
										open	: true,
										moving	: false
									});
									showContentItem(pos);
									$mbPattern.children().fadeOut(500);
								});
							}
							else
							{
							$menu.data('open', false);
							$mbPattern.children().fadeIn(500, function() {
								$mbContentItems.hide();
								$mbcontainer.hide();
							});
								
							disperse();
							openItem(pos,speed,easing);
							$.when(openItem(pos, easing)).done(function(){
									$menu.data({
										open	: true,
									});
									showContentItem(pos);
									$mbPattern.children().fadeOut(500);
								});
							
							
							return false;}
						});
							
						$mbClose.bind('click', function(e) {
							$menu.data('open', false);
							$mbPattern.children().fadeIn(500, function() {
								$mbContentItems.hide();
								$mbcontainer.hide();
							});
								
							disperse();
							return false;
						});
							
						
								
					},

					showContentItem		= function(pos) {
						$mbContentItems.hide();
						$mbcontainer.show();
						$mbContentItems.eq(pos).show().children('.content1_inner').jScrollPane();
					},

					doro	= function(pos) {
						$mbContentItems.hide();
						$mbcontainer.show();
						$mbContentItems.eq(pos).show().children('.content1_inner').jScrollPane();
					},
					

					openItem			= function(pos, speed, easing) {
						return $.Deferred(
						function(dfd) {
							var distance=$(window).width();
							var distanceup=$(window).height();
							$mbPattern.children().each(function(i) {
								var $el			= $(this),
								param		= {
									width	: '100px',
									height	: '100px',
									top		: 170 + 100 * Math.floor(i/4),
									left	: distance/2.5+ 100 * Math.floor(i%4),  
									opacity	: 1
								};
								
								
										
								if (!$.browser.msie)
									param.rotate	= '0deg';
										
								$el.animate(param, speed, easing, dfd.resolve);
							});
						}
					).promise();
					};
						
					return {
						init : init
					};
					
				})();
			
				Menu.init();
			});