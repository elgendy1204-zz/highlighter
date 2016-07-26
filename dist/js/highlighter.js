var Highlighter = (function($) {

	function Highlighter(options) {
		this.options = options;
		initCanvasOnElement(this);
	}

	Highlighter.prototype.getElement = function() {
		return document.querySelector(this.options.element);
	};

	Highlighter.prototype.getCanvasContainer = function() {
		return this.options.canvasContainer;
	};

	Highlighter.prototype.getWholeContainer = function() {
		return document.querySelector(this.options.container);
	};

	Highlighter.prototype.getZIndex = function() {
		return this.options.index;
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

		// bind canvas to element on scroll
		element.addEventListener('scroll', attachCanvasToElement.bind(highlighter));
	}

	// Adjust canvas container position and dimensions with none scaled element
	function canvasContainerAdjustDimensions(highlighter, canvasContainer, element) {
		canvasContainer.style.width = element.getBoundingClientRect().width + 'px';
		canvasContainer.style.height = element.getBoundingClientRect().height + 'px';
		canvasContainer.style.position = 'absolute';
		canvasContainer.style.overflow = 'auto';
		canvasContainer.style.left = getPos(element).x + 'px';
		canvasContainer.style.top = getPos(element).y + 'px';
		canvasContainer.style.zIndex = highlighter.getZIndex() || '1';
		canvasContainer.style.pointerEvents = 'none';
		window.addEventListener("resize", adjustCanvasOnResize.bind(highlighter));
	}

	// element on resize
	function adjustCanvasOnResize(){
		var canvasContainer = this.getCanvasContainer();
		var element = this.getElement();
		canvasContainer.style.left = getPos(element).x + 'px';
		canvasContainer.style.top = getPos(element).y + 'px';
	}

	// get position of element
	function getPos(el) {
		for (var lx=0, ly=0; el != null; lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent);
		return {x: lx,y: ly};
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

	return Highlighter;

})(jQuery);