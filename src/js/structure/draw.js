import calibartion from './calibartion.js';

// put a point on canvas
function putPoint(highlighter, elementX, elementY) {
	let context = highlighter.getContext(),
		radius = highlighter.getRadius();
	context.beginPath();
	context.arc(elementX, elementY, radius, 0, Math.PI * 2);
	context.fill();
}

// start paint on canvas
function startDrawing(event) {
	let parents = $(event.target).parents(),
		container = event.target.parentNode,
		elementX = event.touches ? event.touches[0].clientX : event.pageX,
		elementY = event.touches ? event.touches[0].clientY : event.pageY,
		transformOriginY = $(container).css('transform-origin').split(' ')[1],
		calibarationLevel = this.getCalibarationLevel(),
		lang = this.getLanguage(),
		context = this.getContext();
	transformOriginY = transformOriginY.replace('px', '');

	elementX = calibartion.calibarateX(elementX, parents, container, calibarationLevel, lang);
	elementY = calibartion.calibarateY(elementY, parents, container, calibarationLevel, transformOriginY);

	putPoint(this, elementX, elementY);
	context.beginPath();
	context.moveTo(elementX, elementY);
	this.mouseState = 1;
}

function endDrawing(){
	this.mouseState = 0;
}

// draw lines on canvas
function drawLine(event) {
	let parents = $(event.target).parents(),
		container = event.target.parentNode,
		elementX = event.touches ? event.touches[0].clientX : event.pageX,
		elementY = event.touches ? event.touches[0].clientY : event.pageY,
		transformOriginY = $(container).css('transform-origin').split(' ')[1],
		calibarationLevel = this.getCalibarationLevel(),
		lang = this.getLanguage(),
		context = this.getContext(),
		drawType = this.getDrawType();
	transformOriginY = transformOriginY.replace('px', '');

	elementX = calibartion.calibarateX(elementX, parents, container, calibarationLevel, lang);
	elementY = calibartion.calibarateY(elementY, parents, container, calibarationLevel, transformOriginY);

	if(drawType == 'mouse'){
		if(event.which == 1 && this.mouseState == 0){
			context.lineTo(elementX, elementY);
			context.stroke();
			putPoint(this, elementX, elementY);
			context.beginPath();
			context.moveTo(elementX, elementY);
		}
	} else{
		context.lineTo(elementX, elementY);
		context.stroke();
		putPoint(this, elementX, elementY);
		context.beginPath();
		context.moveTo(elementX, elementY);
	}
}

export default {
	putPoint: putPoint,
	startDrawing: startDrawing,
	drawLine: drawLine,
	endDrawing: endDrawing
};