let element,
	canvasContainer;

function attachCanvasToElementEvent() {
	canvasContainer.scrollTop = element.scrollTop;
	canvasContainer.scrollLeft = element.scrollLeft;
}

function attachElementToCanvasEvent() {
	element.scrollTop = canvasContainer.scrollTop;
	element.scrollLeft = canvasContainer.scrollLeft;
}

function initVariables(highlighter) {
	canvasContainer = highlighter.getCanvasContainer();
	element = highlighter.getElement();
	highlighter.events.attachCanvasToElementEvent = attachCanvasToElementEvent;
	highlighter.events.attachElementToCanvasEvent = attachElementToCanvasEvent;
}

function hookCanvasToElement(highlighter) {
	element.addEventListener('scroll', highlighter.events.attachCanvasToElementEvent);
}

function unhookCanvasFromElement(highlighter) {
	element.removeEventListener('scroll', highlighter.events.attachCanvasToElementEvent);
}

function hookElementToCanvas(highlighter) {
	canvasContainer.addEventListener('scroll', highlighter.events.attachElementToCanvasEvent);
}

function unhookElementFromCanvas(highlighter) {
	canvasContainer.removeEventListener('scroll', highlighter.events.attachElementToCanvasEvent);
}

export default {
	initVariables: initVariables,
	hookCanvasToElement: hookCanvasToElement,
	unhookCanvasFromElement: unhookCanvasFromElement,
	hookElementToCanvas: hookElementToCanvas,
	unhookElementFromCanvas: unhookElementFromCanvas
}