let element,
	canvasContainer,
	attachCanvasToElement,
	attachElementToCanvas;

function attachCanvasToElementEvent() {
	canvasContainer.scrollTop = element.scrollTop;
	canvasContainer.scrollLeft = element.scrollLeft;
}

function attachElementToCanvasEvent() {
	element.scrollTop = canvasContainer.scrollTop;
	element.scrollLeft = canvasContainer.scrollLeft;
}

function initVariables(highlighter) {
	attachCanvasToElement = attachCanvasToElementEvent.bind(highlighter);
	attachElementToCanvas = attachElementToCanvasEvent.bind(highlighter);
	canvasContainer = highlighter.getCanvasContainer();
	element = highlighter.getElement();
}

function hookCanvasToElement() {
	element.addEventListener('scroll', attachCanvasToElement);
}

function unhookCanvasFromElement() {
	element.removeEventListener('scroll', attachCanvasToElement);
}

function hookElementToCanvas() {
	canvasContainer.addEventListener('scroll', attachElementToCanvas);
}

function unhookElementFromCanvas() {
	canvasContainer.removeEventListener('scroll', attachElementToCanvas);
}

export default {
	initVariables: initVariables,
	hookCanvasToElement: hookCanvasToElement,
	unhookCanvasFromElement: unhookCanvasFromElement,
	hookElementToCanvas: hookElementToCanvas,
	unhookElementFromCanvas: unhookElementFromCanvas
}