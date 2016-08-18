import initiation from './structure/initiation.js';
import highlighterActivation from './structure/highlighteractivation.js';
import drawStyles from './structure/drawstyles.js';
import saveload from './structure/saveload.js';

var Highlighter = (function($) {

	function Highlighter(options) {
		this.options = options;
		this.image = '';
		initiation.initCanvasOnElement(this);
	}

	Highlighter.prototype.getElement = function() {
		let element = document.querySelector(`#${this.options.element}`);
		if(!this.options.element || !element ){
			throw 'element id not detected';
		}
		return element;
	};

	Highlighter.prototype.getCanvasElement = function() {
		return this.options.canvasElement;
	};

	Highlighter.prototype.getCanvasContainer = function() {
		return this.options.canvasContainer;
	};

	Highlighter.prototype.getCanvasContainerDimensions = function() {
		return this.options.canvasContainerDimensions;
	};

	Highlighter.prototype.getWholeContainer = function() {
		return this.options.container ? document.querySelector(this.options.container) : document.querySelector('body');
	};

	Highlighter.prototype.getZIndex = function() {
		return this.options.zIndex || '1';
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

	Highlighter.prototype.getColor = function() {
		return this.options.color || 'yellow';
	};

	Highlighter.prototype.activateHighlighter = function() {
		highlighterActivation.activate(this);
	};

	Highlighter.prototype.deactivateHighlighter = function() {
		highlighterActivation.deactivate(this);
	};

	Highlighter.prototype.startMarker = function() {
		drawStyles.initMarkStyle(this);
	};

	Highlighter.prototype.startEraser = function() {
		drawStyles.initEraseStyle(this);
	};

	Highlighter.prototype.saveImage = function() {
		saveload.save(this);
	};

	Highlighter.prototype.loadImage = function() {
		saveload.load(this);
	};

	window.Highlighter = Highlighter;

	return Highlighter;

})(jQuery);