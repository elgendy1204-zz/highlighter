var Highlighter = (function() {

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
		if(wholeContainer.style.position != 'absolute'){
			wholeContainer.style.position = 'relative';
		}
		canvasContainerAdjustDimensions(highlighter, canvasContainer, element);
		canvasElementAdjustDimensions(canvasElement, element);
		canvasContainer.appendChild(canvasElement);
		wholeContainer.appendChild(canvasContainer);

		highlighter.options.canvasContainer = canvasContainer;
		element.addEventListener('scroll', attachCanvasToElement.bind(highlighter));
	}

	// Adjust canvas container dimensions with none scaled element
	function canvasContainerAdjustDimensions(highlighter, canvasContainer, element) {
		canvasContainer.style.width = element.getBoundingClientRect().width + 'px';
		canvasContainer.style.height = element.getBoundingClientRect().height + 'px';
		canvasContainer.style.position = 'absolute';
		canvasContainer.style.overflow = 'auto';
		canvasContainer.style.left = element.getBoundingClientRect().left + 'px';
		canvasContainer.style.top = element.getBoundingClientRect().top + 'px';
		canvasContainer.style.zIndex = highlighter.getZIndex() || '1';
		canvasContainer.style.pointerEvents = 'none';
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

})();
