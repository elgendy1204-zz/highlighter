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
		canvasElement.addEventListener('click', startDrawing.bind(highlighter));
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
		canvasContainer.style.width = element.getBoundingClientRect().width + 'px';
		canvasContainer.style.height = element.getBoundingClientRect().height + 'px';
		canvasContainer.style.position = 'absolute';
		canvasContainer.style.overflow = 'auto';
		canvasContainer.style.left = getPos(element).x + 'px';
		canvasContainer.style.top = getPos(element).y + 'px';
		canvasContainer.style.zIndex = highlighter.getZIndex();
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







	// put a point on canvas
	function putPoint(highlighter, elementX, elementY) {
		var context = highlighter.getContext();
		var radius = highlighter.getRadius();
		context.beginPath();
		context.arc(elementX, elementY, radius, 0, Math.PI * 2);
		context.fill();
	}

	// start paint on canvas
	function startDrawing(event) {
		var parents = $(event.target).parents();
		var container = event.target.parentNode;
		var elementX = event.touches ? event.touches[0].clientX : event.pageX;
		var elementY = event.touches ? event.touches[0].clientY : event.pageY;
		var transformOriginY = $(container).css('transform-origin').split(' ')[1];
		var calibarationLevel = this.getCalibarationLevel();
		var lang = this.getLanguage();
		var context = this.getContext();
		transformOriginY = transformOriginY.replace('px', '');

		elementX = calibartion.calibarateX(elementX, parents, container, calibarationLevel, lang);
		elementY = calibartion.calibarateY(elementY, parents, container, calibarationLevel, transformOriginY);

		putPoint(this, elementX, elementY);
		context.beginPath();
		context.moveTo(elementX, elementY);
	}

	// draw lines on canvas
	function drawLine(event) {
		var parents = $(event.target).parents();
		var container = event.target.parentNode;
		var elementX = event.touches ? event.touches[0].clientX : event.pageX;
		var elementY = event.touches ? event.touches[0].clientY : event.pageY;
		var transformOriginY = $(container).css('transform-origin').split(' ')[1];
		var calibarationLevel = this.getCalibarationLevel();
		var lang = this.getLanguage();
		transformOriginY = transformOriginY.replace('px', '');

		elementX = calibartion.calibarateX(elementX, parents, container, calibarationLevel, lang);
		elementY = calibartion.calibarateY(elementY, parents, container, calibarationLevel, transformOriginY);

		context.lineTo(elementX, elementY);
		context.stroke();
		putPoint(this, elementX, elementY);
		context.beginPath();
		context.moveTo(elementX, elementY);
	}


	// calibaration algorithms for x and Y positions of points
	var calibartion = (function(){

		function calibarateX(clientX, parents, canvasContainer, calibarationLevel, lang) {
			var elementX = clientX;
			elementX = calibarateElementX(elementX, parents);
			elementX = calibarateScrollLeft(elementX, parents, canvasContainer);
			elementX = calibarateScaleX(elementX, canvasContainer, calibarationLevel, lang);
			return elementX;
		}

		function calibarateY(clientY, parents, canvasContainer, calibarationLevel, transformOriginY) {
			var elementY = clientY;
			elementY = calibarateElementY(elementY, parents);
			elementY = calibarateScrollTop(elementY, parents, canvasContainer);
			elementY = calibarateScaleY(elementY, canvasContainer, calibarationLevel, transformOriginY);
			return elementY;
		}

		// in case of absolute divs only - calculate left
		function calibarateElementX(clientX, parents) {
			var additions = 0;
			parents.each(function (number, element) {
				additions += element.offsetLeft;
			});
			return clientX - additions;
		}

		// in case of absolute divs only - calculate top
		function calibarateElementY(clientY, parents) {
			var additions = 0;
			parents.each(function (number, element) {
				additions += element.offsetTop;
			});
			return clientY - additions;
		}

		// calculate scroll left
		function calibarateScrollLeft(clientX, parents, container) {
			var initialWidth = container.offsetWidth;
			var scaledWidth = container.getBoundingClientRect().width;
			var widthDiff = scaledWidth - initialWidth;
			var scaleX = scaledWidth / initialWidth;
			scaleX = parseFloat(scaleX.toFixed(5));

			var additions = 0;
			parents.each(function (number, element) {
				if (element === container) {
					additions += element.scrollLeft + element.scrollLeft * (scaleX - 1);
				} else {
					additions += element.scrollLeft;
				}
			});
			return clientX + additions;
		}

		// calculate scroll top
		function calibarateScrollTop(clientY, parents, container) {
			var initialHeight = container.offsetHeight;
			var scaledHeight = container.getBoundingClientRect().height;
			var scaleY = scaledHeight / initialHeight;
			scaleY = parseFloat(scaleY.toFixed(5));

			var additions = 0;
			parents.each(function (number, element) {
				if (element === container) {
					additions += element.scrollTop + element.scrollTop * (scaleY - 1);
				} else {
					additions += element.scrollTop;
				}
			});
			return clientY + additions;
		}

		// calculate scale X
		function calibarateScaleX(clientX, container, calDegree, lang) {
			var initialWidth = container.offsetWidth;
			var scaledWidth = container.getBoundingClientRect().width;
			var widthDiff = scaledWidth - initialWidth;
			var scaleX = scaledWidth / initialWidth;
			scaleX = parseFloat(scaleX.toFixed(5));
			var calibaratedValue = 0;
			for (var calLevel = 0; calLevel <= calDegree; calLevel++) {
				calibaratedValue += clientX * Math.pow(1 - scaleX, calLevel);
			}

			if (lang === 'a') {
				// calibarate width
				for (var _calLevel = 0; _calLevel <= calDegree; _calLevel++) {
					calibaratedValue += widthDiff * Math.pow(1 - scaleX, _calLevel);
				}
				return calibaratedValue;
			}

			return calibaratedValue;
		}

		// calculate scale Y
		function calibarateScaleY(clientY, container, calDegree, transformOriginY) {
			var initialHeight = container.offsetHeight;
			var scaledHeight = container.getBoundingClientRect().height;
			transformOriginY = Number(transformOriginY);
			var transformOriginYCorrectionFactor = transformOriginY / (scaledHeight + transformOriginY);
			var scaleY = scaledHeight / initialHeight;
			scaleY = parseFloat(scaleY.toFixed(5));
			var calibaratedValue = 0;
			for (var calLevel = 0; calLevel <= calDegree; calLevel++) {
				calibaratedValue += clientY * Math.pow(1 - scaleY, calLevel);
			}
			for (var _calLevel2 = 1; _calLevel2 <= calDegree; _calLevel2++) {
				calibaratedValue -= transformOriginY * Math.pow(1 - scaleY, _calLevel2);
			}
			return calibaratedValue;
		}

		return{
			calibarateX: calibarateX,
			calibarateY: calibarateY
		}

	}());




	return Highlighter;

})(jQuery);