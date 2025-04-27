define([
	'jquery',
	'matchMedia'
], function ($, mediaCheck) {
	'use strict';
	
	return function (config) {
		var defaults = {
			mediaQuery: '(max-width: 767px)',
			accordionActive: 'cd-footer-accordion-active',
			contentSelector: '[data-role="content"]',
			titleSelector: '[data-role="title"]'
		};
		
		config = $.extend({}, defaults, config);
		
		/**
		 * Toggle accordion content
		 * @param {Object} $title
		 * @private
		 */
		function _toggleContent($title) {
			var $content = $title.next(config.contentSelector);
			
			if ($title.hasClass(config.accordionActive)) {
				$content.slideUp(300);
				$title.removeClass(config.accordionActive);
			} else {
				$content.slideDown(300);
				$title.addClass(config.accordionActive);
			}
		}
		
		/**
		 * Initialize accordion for mobile
		 * @private
		 */
		function _initMobileAccordion() {
			var $titles = $(config.titleSelector);
			
			// Hide all content initially on mobile
			$titles.next(config.contentSelector).hide();
			
			// Bind click event to titles
			$titles.on('click', function () {
				_toggleContent($(this));
			});
		}
		
		/**
		 * Reset accordion for desktop
		 * @private
		 */
		function _resetDesktopAccordion() {
			var $titles = $(config.titleSelector);
			
			// Show all content on desktop
			$titles.next(config.contentSelector).show();
			
			// Remove accordion active class
			$titles.removeClass(config.accordionActive);
			
			// Unbind click events
			$titles.off('click');
		}
		
		// Init function using mediaCheck for responsive behavior
		mediaCheck({
			media: config.mediaQuery,
			entry: function () {
				_initMobileAccordion();
			},
			exit: function () {
				_resetDesktopAccordion();
			}
		});
	};
});