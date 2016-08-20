import scrollattach from './scrollattach.js';

let activeCanvasClass = 'active-canvas-highlighter';

function activate(highlighter){
	let canvasContainer = highlighter.getCanvasContainer();
	canvasContainer.style.pointerEvents = 'auto';
	scrollattach.unhookCanvasFromElement(highlighter);
	scrollattach.hookElementToCanvas(highlighter);
}

function deactivate(highlighter){
	let canvasContainer = highlighter.getCanvasContainer();
	canvasContainer.style.pointerEvents = 'none';
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
}