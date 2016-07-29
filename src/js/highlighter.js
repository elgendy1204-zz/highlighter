import functions from './functions.js';
import draw from './draw.js';


var Highlighter = (function($) {

	function Highlighter(options) {
		this.options = options;
		initCanvasOnElement(this);
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

	// initiate canvas on initiating highlighter object
	function initCanvasOnElement(highlighter) {
		var wholeContainer = highlighter.getWholeContainer();
		var element = highlighter.getElement();
		var canvasElement = document.createElement('canvas');
		var canvasContainer = document.createElement('div');

		wholeContainer.style.position = wholeContainer.style.position != 'absolute' ? 'relative' : 'absolute';

		// Adjust canvas container dimensions with none scaled element
		canvasContainerAdjustDimensions(highlighter, canvasContainer, element);

		// Adjust canvas dimensions
		canvasElementAdjustDimensions(canvasElement, element);

		// add highlighter
		canvasContainer.appendChild(canvasElement);
		wholeContainer.appendChild(canvasContainer);
		highlighter.options.canvasContainer = canvasContainer;
		highlighter.options.canvasElement = canvasElement;

		// bind canvas to element on scroll
		element.addEventListener('scroll', attachCanvasToElement.bind(highlighter));

		// initiate default canvas style
		initCanvasStyle(highlighter);

		// start draw on canvas
		canvasElement.addEventListener('click', draw.startDrawing.bind(highlighter));
	}

	// default canvas style
	function initCanvasStyle(highlighter){
		var context = highlighter.getContext();
		var radius = highlighter.getRadius();
		context.lineCap = "round";
		context.lineJoin = "round";
		context.globalCompositeOperation = "source-over";
		context.strokeStyle = 'yellow';
		context.fillStyle = 'yellow';
		context.lineWidth = radius * 2;
	}

	// Adjust canvas container position and dimensions with none scaled element
	function canvasContainerAdjustDimensions(highlighter, canvasContainer, element) {
		let elementPositions = functions.getPos(element);
		canvasContainer.style.width = element.getBoundingClientRect().width + 'px';
		canvasContainer.style.height = element.getBoundingClientRect().height + 'px';
		canvasContainer.style.position = 'absolute';
		canvasContainer.style.overflow = 'auto';
		canvasContainer.style.left = elementPositions.x + 'px';
		canvasContainer.style.top = elementPositions.y + 'px';
		canvasContainer.style.zIndex = highlighter.getZIndex();
		canvasContainer.style.pointerEvents = 'none';
		window.addEventListener("resize", adjustCanvasOnResize.bind(highlighter));
	}

	// element on resize
	function adjustCanvasOnResize(){
		var canvasContainer = this.getCanvasContainer();
		var element = this.getElement();
		let elementPositions = functions.getPos(element);
		canvasContainer.style.left = elementPositions.x + 'px';
		canvasContainer.style.top = elementPositions.y + 'px';
	}

	// Adjust canvas element dimensions
	function canvasElementAdjustDimensions(canvasElement, element) {
		canvasElement.style.width = element.scrollWidth + 'px';
		canvasElement.width = element.scrollWidth;
		canvasElement.style.height = element.scrollHeight + 'px';
		canvasElement.height = element.scrollHeight;
	}

	//attach canvas to element
	function attachCanvasToElement(event){
		var canvasContainer = this.getCanvasContainer();
		var element = this.getElement();
		canvasContainer.scrollTop = element.scrollTop;
		canvasContainer.scrollLeft = element.scrollLeft;
	}

	//attach element to canvas
	function attachElementToCanvas(event){
		element.scrollTop = canvasContainer.scrollTop;
		element.scrollLeft = canvasContainer.scrollLeft;
	}


	window.Highlighter = Highlighter;

	return Highlighter;

})(jQuery);