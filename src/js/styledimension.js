import functions from './functions.js';
import draw from './draw.js';

export default (function() {
	// initiate canvas on initiating highlighter object
	function initCanvasOnElement(highlighter) {

		let wholeContainer = highlighter.getWholeContainer();
		let element = highlighter.getElement();
		let canvasElement = document.createElement('canvas');
		let canvasContainer = document.createElement('div');
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
		canvasElement.addEventListener('touchstart', draw.startDrawing.bind(highlighter), false);
//		canvasElement.addEventListener('touchmove', draw.drawLine.bind(highlighter), false);
	}

	// default canvas style
	function initCanvasStyle(highlighter){
		let context = highlighter.getContext();
		let radius = highlighter.getRadius();
		context.lineCap = "round";
		context.lineJoin = "round";
		context.globalCompositeOperation = "source-over";
		context.strokeStyle = highlighter.getColor();
		context.fillStyle = highlighter.getColor();
		context.lineWidth = radius * 2;
	}

	// Adjust canvas container position and dimensions with none scaled element
	function canvasContainerAdjustDimensions(highlighter, canvasContainer, element) {
		let elementPositions = functions.getPosition(element);
		canvasContainer.style.width = element.getBoundingClientRect().width + 'px';
		canvasContainer.style.height = element.getBoundingClientRect().height + 'px';
		canvasContainer.style.position = 'absolute';
		canvasContainer.style.overflow = 'auto';
		canvasContainer.style.left = elementPositions.x + 'px';
		canvasContainer.style.top = elementPositions.y + 'px';
		canvasContainer.style.zIndex = highlighter.getZIndex();
		canvasContainer.style.pointerEvents = 'none';
		canvasContainer.style.opacity = highlighter.getOpacity();
		window.addEventListener("resize", adjustCanvasOnResize.bind(highlighter));
	}

	// element on resize
	function adjustCanvasOnResize(){
		let canvasContainer = this.getCanvasContainer();
		let element = this.getElement();
		let elementPositions = functions.getPosition(element);
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
		let canvasContainer = this.getCanvasContainer();
		let element = this.getElement();
		canvasContainer.scrollTop = element.scrollTop;
		canvasContainer.scrollLeft = element.scrollLeft;
	}

	//attach element to canvas
	function attachElementToCanvas(event){
		element.scrollTop = canvasContainer.scrollTop;
		element.scrollLeft = canvasContainer.scrollLeft;
	}

	return{
		initCanvasOnElement: initCanvasOnElement
	}

}());