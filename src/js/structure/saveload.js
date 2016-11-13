import drawstyles from './drawstyles.js';

function save(highlighter) {
	let canvasElement = highlighter.getCanvasElement(),
		imageData = canvasElement.toDataURL();
	highlighter.imageData = imageData;
	return imageData;
}

function load(highlighter) {
	if (highlighter.imageData) {
		drawstyles.clear(highlighter);
		drawstyles.initMarkStyle(highlighter);
		let canvasElement = highlighter.getCanvasElement(),
			image = new Image();
		image.src = highlighter.imageData;
		image.onload = function() {
			canvasElement.getContext('2d').drawImage(image, 0, 0);
		};
	}
}

export default {
	save: save,
	load: load
};