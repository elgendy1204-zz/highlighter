function initMarkStyle(highlighter){
	let context = highlighter.getContext();
	context.globalCompositeOperation = "source-over";
}

function initEraseStyle(highlighter){
	let context = highlighter.getContext();
	context.globalCompositeOperation = "destination-out";
}

export default {
	initMarkStyle: initMarkStyle,
	initEraseStyle: initEraseStyle
}
