import draw from './draw.js';
import canvasstyledimension from './canvasstyledimension.js';
import scrollattach from './scrollattach.js';

// initiate canvas on initiating highlighter object
function initCanvasOnElement(highlighter) {
	let wholeContainer = highlighter.getWholeContainer();
	let element = highlighter.getElement();
	let canvasElement = document.createElement('canvas');
	let canvasContainer = document.createElement('div');
	wholeContainer.style.position = wholeContainer.style.position != 'absolute' ? 'relative' : 'absolute';

	// add highlighter
	canvasContainer.appendChild(canvasElement);
	wholeContainer.appendChild(canvasContainer);
	highlighter.options.canvasContainer = canvasContainer;
	highlighter.options.canvasElement = canvasElement;

	// init canvas styles and dimensions
	canvasstyledimension.init(highlighter, canvasContainer, element, canvasElement);

	// bind canvas to element on scroll
	scrollattach.initVariables(highlighter);
	scrollattach.hookCanvasToElement();

	// start draw on canvas
	canvasElement.addEventListener('touchstart', draw.startDrawing.bind(highlighter), false);
	canvasElement.addEventListener('touchmove', draw.drawLine.bind(highlighter), false);
}

export default {
	initCanvasOnElement: initCanvasOnElement
}