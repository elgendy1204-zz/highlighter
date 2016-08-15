function save(highlighter){
	let canvasElement = highlighter.getCanvasElement();
	let imageData = canvasElement.toDataURL();
	highlighter.image = imageData;
	console.log(imageData);
	return imageData;
}

function load(highlighter){
	if(highlighter.image){
		let canvasElement = highlighter.getCanvasElement();
		let image = new Image();
		image.src = highlighter.image;
		image.onload = function(){
			canvasElement.getContext('2d').drawImage(image, 0 , 0);
		};
	}
}

export default {
	save: save,
	load: load
}