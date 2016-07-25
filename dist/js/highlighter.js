var Highlighter = (function() {

	function Highlighter(options) {
		this.options = options;

		initCanvasOnElement(this);
	}

	function initCanvasOnElement(highlighter) {
		console.log(highlighter.getElement());
	}

	Highlighter.prototype.getElement = function() {
		return this.options.element;
	};


	return Highlighter;

})();
