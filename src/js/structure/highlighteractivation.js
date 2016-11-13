import scrollattach from './scrollattach.js';

let activeCanvasClass = 'active-canvas-highlighter';

function activate(highlighter){
	let canvasContainer = highlighter.getCanvasContainer();
	let canvasElement = highlighter.getCanvasElement();
	canvasContainer.style.pointerEvents = 'auto';
	canvasElement.style.zIndex = '10';
	scrollattach.unhookCanvasFromElement(highlighter);
	scrollattach.hookElementToCanvas(highlighter);
}

function deactivate(highlighter){
	let canvasContainer = highlighter.getCanvasContainer();
	let canvasElement = highlighter.getCanvasElement();
	canvasContainer.style.pointerEvents = 'none';
	canvasElement.style.zIndex = '1';
	scrollattach.hookCanvasToElement(highlighter);
	scrollattach.unhookElementFromCanvas(highlighter);
}

function initActiveCanvasStyle(){
	if(!document.getElementById('canvashighlighter')){
		let style = document.createElement('style');
		style.type = 'text/css';
		style.id = 'canvashighlighter';
		style.innerHTML = `canvas.${activeCanvasClass} { z-index: 2 !important;}`;
		document.getElementsByTagName('head')[0].appendChild(style);
	}
}

export default {
	activate: activate,
	deactivate: deactivate,
	initActiveCanvasStyle: initActiveCanvasStyle,
	activeCanvasClass: activeCanvasClass
};