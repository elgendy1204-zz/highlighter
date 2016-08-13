function attachCanvasToElementEvent(){
	let canvasContainer = this.getCanvasContainer();
	let element = this.getElement();
	canvasContainer.scrollTop = element.scrollTop;
	canvasContainer.scrollLeft = element.scrollLeft;
	console.log('start attaching');
}

//attach element to canvas
function attachElementToCanvasEvent(){
	let canvasContainer = this.getCanvasContainer();
	let element = this.getElement();
	element.scrollTop = canvasContainer.scrollTop;
	element.scrollLeft = canvasContainer.scrollLeft;
}

export default {
	attachCanvasToElement: attachCanvasToElement,
	attachElementToCanvas: attachElementToCanvas
}