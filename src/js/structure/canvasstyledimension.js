import functions from './functions.js';

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
	highlighter.options.canvasContainerDimensions = {};
	highlighter.options.canvasContainerDimensions['width'] = element.getBoundingClientRect().width;
	highlighter.options.canvasContainerDimensions['height'] = element.getBoundingClientRect().height;
	highlighter.options.canvasContainerDimensions['left'] = elementPositions.x;
	highlighter.options.canvasContainerDimensions['top'] = elementPositions.y;

	canvasContainer.style.width = highlighter.getCanvasContainerDimensions().width + 'px';
	canvasContainer.style.height = highlighter.getCanvasContainerDimensions().height + 'px';
	canvasContainer.style.position = 'absolute';
	canvasContainer.style.overflow = 'auto';
	canvasContainer.style.left = highlighter.getCanvasContainerDimensions().left + 'px';
	canvasContainer.style.top = highlighter.getCanvasContainerDimensions().top + 'px';
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
	canvasElement.style.display = 'block';
	canvasElement.style.position = 'absolute';
	canvasElement.style.left = '0px';
	canvasElement.style.right = '0px';
	canvasElement.style.zIndex = '1';
	canvasElement.width = element.scrollWidth;
	canvasElement.style.height = element.scrollHeight + 'px';
	canvasElement.height = element.scrollHeight;
}

function init(highlighter, canvasContainer, element, canvasElement){
	canvasContainerAdjustDimensions(highlighter, canvasContainer, element);
	canvasElementAdjustDimensions(canvasElement, element);
	initCanvasStyle(highlighter);
}

export default {
	init: init
}