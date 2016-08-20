import initiation from './structure/initiation.js';
import highlighterActivation from './structure/highlighteractivation.js';
import drawStyles from './structure/drawstyles.js';
import saveload from './structure/saveload.js';

class Highlighter {
	constructor(options) {
		this.options = options;
		this.events = {};
		this.imageData = '';
		initiation.initCanvas(this);
	}

	getElement() {
		let element = document.querySelector(`#${this.options.element}`);
		if(!this.options.element || !element ){
			throw 'element id not detected';
		}
		return element;
	}

	getCanvasElement() {
		return this.options.canvasElement;
	}

	getCanvasContainer() {
		return this.options.canvasContainer;
	}

	getCanvasContainerDimensions() {
		return this.options.canvasContainerDimensions;
	}

	getWholeContainer() {
		return this.options.container ? document.querySelector(this.options.container) : document.querySelector('body');
	}

	getZIndex() {
		return this.options.zIndex || '1';
	}

	getCalibarationLevel() {
		return this.options.calibarationLevel || 10;
	}

	getLanguage() {
		return this.options.lang || 'e';
	}

	getRadius() {
		return this.options.radius || 10;
	}

	getContext() {
		return this.getCanvasElement().getContext('2d');
	}

	getOpacity() {
		return this.options.opacity;
	}

	getColor() {
		return this.options.color || 'yellow';
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