import calibartion from './calibartion.js';
import functions from './functions.js';

export default {
	putPoint: putPoint,
	startDrawing: startDrawing,
	drawLine: drawLine
}

// put a point on canvas
function putPoint(highlighter, elementX, elementY) {
	var context = highlighter.getContext();
	var radius = highlighter.getRadius();
	context.beginPath();
	context.arc(elementX, elementY, radius, 0, Math.PI * 2);
	context.fill();
}

// start paint on canvas
function startDrawing(event) {
	var parents = $(event.target).parents();
	var container = event.target.parentNode;
	var elementX = event.touches ? event.touches[0].clientX : event.pageX;
	var elementY = event.touches ? event.touches[0].clientY : event.pageY;
	var transformOriginY = $(container).css('transform-origin').split(' ')[1];
	var calibarationLevel = this.getCalibarationLevel();
	var lang = this.getLanguage();
	var context = this.getContext();
	transformOriginY = transformOriginY.replace('px', '');

	elementX = calibartion.calibarateX(elementX, parents, container, calibarationLevel, lang);
	elementY = calibartion.calibarateY(elementY, parents, container, calibarationLevel, transformOriginY);

	putPoint(this, elementX, elementY);
	context.beginPath();
	context.moveTo(elementX, elementY);
}

// draw lines on canvas
function drawLine(event) {
	var parents = $(event.target).parents();
	var container = event.target.parentNode;
	var elementX = event.touches ? event.touches[0].clientX : event.pageX;
	var elementY = event.touches ? event.touches[0].clientY : event.pageY;
	var transformOriginY = $(container).css('transform-origin').split(' ')[1];
	var calibarationLevel = this.getCalibarationLevel();
	var lang = this.getLanguage();
	transformOriginY = transformOriginY.replace('px', '');

	elementX = calibartion.calibarateX(elementX, parents, container, calibarationLevel, lang);
	elementY = calibartion.calibarateY(elementY, parents, container, calibarationLevel, transformOriginY);

	context.lineTo(elementX, elementY);
	context.stroke();
	putPoint(this, elementX, elementY);
	context.beginPath();
	context.moveTo(elementX, elementY);
}