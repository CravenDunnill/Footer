define(['jquery'], function($) {
	'use strict';
	
	return function(config) {
		var defaults = {
			mediaQuery: '(max-width: 767px)',
			accordionActive: 'cd-footer-accordion-active',
			contentSelector: '[data-role="content"]',
			titleSelector: '[data-role="title"]'
		};
		
		config = $.extend({}, defaults, config);
		
		// Handle mobile accordion
		if (window.matchMedia(config.mediaQuery).matches) {
			var $titles = $(config.titleSelector);
			
			// Initially hide all content on mobile
			$titles.next(config.contentSelector).hide();
			
			// Add click handler
			$titles.on('click', function() {
				var $title = $(this);
				var $content = $title.next(config.contentSelector);
				
				// Toggle active class
				$title.toggleClass(config.accordionActive);
				
				// Toggle content with animation
				$content.slideToggle(300);
			});
		}
	};
});