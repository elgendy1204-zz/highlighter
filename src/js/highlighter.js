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

	getCanvasElement() {
		// return this.options.canvasElement;
		return functions.getFromHighlighterOptions(this, 'canvasElement');
	}

	getCanvasContainer() {
		// return this.options.canvasContainer;
		return functions.getFromHighlighterOptions(this, 'canvasContainer');
	}

	getCanvasContainerDimensions() {
		// return this.options.canvasContainerDimensions;
		return functions.getFromHighlighterOptions(this, 'canvasContainerDimensions');
	}

	getWholeContainer() {
		// return this.options.container ? document.querySelector(this.options.container) : document.querySelector('body');
		return functions.getFromHighlighterOptions(this, 'container') ? document.querySelector(functions.getFromHighlighterOptions(this, 'container')) : document.querySelector('body');
	}

	getZIndex() {
		// return this.options.zIndex || '1';
		return functions.getFromHighlighterOptions(this, 'zIndex') || '1';
	}

	getCalibarationLevel() {
		// return this.options.calibarationLevel || 10;
		return functions.getFromHighlighterOptions(this, 'calibarationLevel') || 10;
	}

	getLanguage() {
		// return this.options.lang || 'e';
		return functions.getFromHighlighterOptions(this, 'lang') || 'e';
	}

	getRadius() {
		// return this.options.radius || 10;
		return functions.getFromHighlighterOptions(this, 'radius') || 10;
	}

	getContext() {
		return this.getCanvasElement().getContext('2d');
	}

	getOpacity() {
		// return this.options.opacity;
		return functions.getFromHighlighterOptions(this, 'opacity');
	}

	getColor() {
		// return this.options.color || 'yellow';
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

	saveImage() {
		saveload.save(this);
	}

	loadImage() {
		saveload.load(this);
	}
}

window.Highlighter = Highlighter;