import scrollattach from './scrollattach.js';

function activate(highlighter){
	let canvasContainer = highlighter.getCanvasContainer();
	canvasContainer.style.pointerEvents = 'auto';
	scrollattach.unhookCanvasFromElement();
	scrollattach.hookElementToCanvas();
}

function deactivate(highlighter){
	let canvasContainer = highlighter.getCanvasContainer();
	canvasContainer.style.pointerEvents = 'none';
	scrollattach.hookCanvasToElement();
	scrollattach.unhookElementFromCanvas();
}

export default {
	activate: activate,
	deactivate: deactivate
}