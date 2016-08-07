import functions from './functions.js';
import draw from './draw.js';
import styledimension from './styledimension.js';

var Highlighter = (function($) {

	function Highlighter(options) {
		this.options = options;
		styledimension.initCanvasOnElement(this);
	}

	Highlighter.prototype.getElement = function() {
		return document.querySelector(this.options.element);
	};

	Highlighter.prototype.getCanvasElement = function() {
		return this.options.canvasElement;
	};

	Highlighter.prototype.getCanvasContainer = function() {
		return this.options.canvasContainer;
	};

	Highlighter.prototype.getWholeContainer = function() {
		return document.querySelector(this.options.container);
	};

	Highlighter.prototype.getZIndex = function() {
		return this.options.index || '1';
	};

	Highlighter.prototype.getCalibarationLevel = function() {
		return this.options.calibarationLevel || 10;
	};

	Highlighter.prototype.getLanguage = function() {
		return this.options.lang || 'e';
	};

	Highlighter.prototype.getRadius = function() {
		return this.options.radius || 10;
	};

	Highlighter.prototype.getContext = function() {
		return this.getCanvasElement().getContext('2d');
	};

	Highlighter.prototype.getOpacity = function() {
		return this.options.opacity;
	};

	window.Highlighter = Highlighter;

	return Highlighter;

})(jQuery);