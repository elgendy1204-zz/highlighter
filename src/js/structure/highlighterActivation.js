import scrollattach from './scrollattach.js';

function activate(highlighter){
	let canvasContainer = highlighter.getCanvasContainer();
	canvasContainer.style.pointerEvents = 'auto';
}

function deactivate(highlighter){
	let canvasContainer = highlighter.getCanvasContainer();
	canvasContainer.style.pointerEvents = 'none';
}

export default {
	activate: activate,
	deactivate: deactivate
}