import initiation from './structure/initiation.js';
import highlighterActivation from './structure/highlighteractivation.js';
import drawStyles from './structure/drawstyles.js';
import saveload from './structure/saveload.js';
import functions from './structure/functions.js';

class Highlighter {
	constructor(options) {
		this.options = options;
		this.events = {};
		this.imageData = '';
		initiation.initCanvas(this);
	}

	getElement() {
		let element = document.querySelector(`#${this.options.element}`);
		if(!functions.getFromHighlighterOptions(this, 'element') || !element ){
			throw 'element id not detected';
		}
		return element;
	}

	getDrawType() {
		let drawType = functions.getFromHighlighterOptions(this, 'drawType') || 'mouse';
		if(drawType == 'mouse'){
			this.mouseState = 0;
		}
		return drawType;
	}

	getCanvasElement() {
		return functions.getFromHighlighterOptions(this, 'canvasElement');
	}

	getCanvasContainer() {
		return functions.getFromHighlighterOptions(this, 'canvasContainer');
	}

	getCanvasContainerDimensions() {
		return functions.getFromHighlighterOptions(this, 'canvasContainerDimensions');
	}

	getWholeContainer() {
		return functions.getFromHighlighterOptions(this, 'container') ? document.querySelector(functions.getFromHighlighterOptions(this, 'container')) : document.querySelector('body');
	}

	getZIndex() {
		return functions.getFromHighlighterOptions(this, 'zIndex') || '1';
	}

	getCalibarationLevel() {
		return functions.getFromHighlighterOptions(this, 'calibarationLevel') || 10;
	}

	getLanguage() {
		return functions.getFromHighlighterOptions(this, 'lang') || 'e';
	}

	getRadius() {
		return functions.getFromHighlighterOptions(this, 'radius') || 10;
	}

	getContext() {
		return this.getCanvasElement().getContext('2d');
	}

	getOpacity() {
		return functions.getFromHighlighterOptions(this, 'opacity');
	}

	getColor() {
		return functions.getFromHighlighterOptions(this, 'color') || 'yellow';
	}

	activateHighlighter() {
		highlighterActivation.activate(this);
	}

	deactivateHighlighter() {
		highlighterActivation.deactivate(this);
	}

	startMarker() {
		drawStyles.initMarkStyle(this);
	}

	startEraser() {
		drawStyles.initEraseStyle(this);
	}

	clearCanvas() {
		drawStyles.clear(this);
	}

	saveImage() {
		saveload.save(this);
	}

	loadImage() {
		saveload.load(this);
	}
}

window.Highlighter = Highlighter;