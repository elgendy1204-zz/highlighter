var highlighter = new Highlighter({
	// canvas and element - whole - container
	container: 'body',

	// element selector
	element : '.container',

	// canvas z-index , default equals 10
	zIndex : '3',

	// default equals 10
	calibarationLevel: 10,

	// default equals 'e'
	lang: 'e',

	// default equals 10
	radius: 10,

	// highlighter opacity - default equal 0.5
	opacity: 0.5,

	// highlighter color - default equal yellow
	color: 'red'
});


var startBtn = $('#start');
var endBtn = $('#end');
var startMarker = $('#mark');
var startEraser = $('#eraser');


startBtn.on('click', function(){
	highlighter.activateHighlighter();
});

endBtn.on('click', function(){
	highlighter.deactivateHighlighter();
});

startMarker.on('click', function(){
	highlighter.startMarker();
});

startEraser.on('click', function(){
	highlighter.startEraser();
});