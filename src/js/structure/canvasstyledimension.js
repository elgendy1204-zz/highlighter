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
function canvasContainerAdjust(highlighter, canvasContainer, element) {
	let elementPositions = functions.getPosition(element);
	let canvasContainerDimensions = {
		width: element.getBoundingClientRect().width,
		height: element.getBoundingClientRect().height,
		left: elementPositions.x,
		top: elementPositions.y,
	};
	functions.addToHighlighterOptions(highlighter, 'canvasContainerDimensions', canvasContainerDimensions);

	canvasContainer.style.width = highlighter.getCanvasContainerDimensions().width + 'px';
	canvasContainer.style.height = highlighter.getCanvasContainerDimensions().height + 'px';
	canvasContainer.style.position = 'absolute';
	canvasContainer.style.overflow = 'auto';
	canvasContainer.style.left = highlighter.getCanvasContainerDimensions().left + 'px';
	canvasContainer.style.top = highlighter.getCanvasContainerDimensions().top + 'px';
	canvasContainer.style.zIndex = highlighter.getZIndex();
	canvasContainer.style.pointerEvents = 'none';
	window.addEventListener("resize", adjustCanvasOnResize.bind(highlighter));
}

// whole Container style
function wholeContainerAdjust(wholeContainer){
	wholeContainer.style.position = wholeContainer.style.position != 'absolute' ? 'relative' : 'absolute';
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
function canvasElementAdjust(highlighter, canvasElement, element) {
	canvasElement.style.width = element.scrollWidth + 'px';
	canvasElement.style.display = 'block';
	canvasElement.style.position = 'absolute';
	canvasElement.style.left = '0px';
	canvasElement.style.right = '0px';
	canvasElement.style.zIndex = '1';
	canvasElement.width = element.scrollWidth;
	canvasElement.style.height = element.scrollHeight + 'px';
	canvasElement.height = element.scrollHeight;
	canvasElement.style.opacity = highlighter.getOpacity();
}

function init(highlighter, wholeContainer, canvasContainer, element, canvasElement){
	wholeContainerAdjust(wholeContainer);
	canvasContainerAdjust(highlighter, canvasContainer, element);
	canvasElementAdjust(highlighter, canvasElement, element);
	initCanvasStyle(highlighter);
}

export default {
	init: init
}