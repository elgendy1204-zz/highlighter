function initMarkStyle(highlighter){
	let context = highlighter.getContext();
	context.globalCompositeOperation = "source-over";
}

function initEraseStyle(highlighter){
	let context = highlighter.getContext();
	context.globalCompositeOperation = "destination-out";
}

function clear(highlighter){
	let context = highlighter.getContext();
	let canvas = highlighter.getCanvasElement();
	context.clearRect(0, 0, canvas.width, canvas.height);
}

export default {
	initMarkStyle: initMarkStyle,
	initEraseStyle: initEraseStyle,
	clear: clear
};