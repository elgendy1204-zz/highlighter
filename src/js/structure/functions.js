// get position of element
function getPos(el) {
	let elements = [];
	for (let lx = 0, ly = 0; el != null; lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent) {
		elements.push(el);
	}
	return { x: lx, y: ly, elements: elements };
}


// Helper function to get an element's exact position
function getPosition(el) {
	let xPos = 0,
		yPos = 0;

	while (el) {
		if (el.tagName == "BODY") {
			// deal with browser quirks with body/window/document and page scroll
			let xScroll = el.scrollLeft || document.documentElement.scrollLeft,
				yScroll = el.scrollTop || document.documentElement.scrollTop;

			xPos += (el.offsetLeft - xScroll + el.clientLeft);
			yPos += (el.offsetTop - yScroll + el.clientTop);
		} else {
			// for all other non-BODY elements
			xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
			yPos += (el.offsetTop - el.scrollTop + el.clientTop);
		}

		el = el.offsetParent;
	}
	return {
		x: xPos,
		y: yPos
	};
}

function addToHighlighterOptions(highlighter, key, value) {
	highlighter.options[key] = value;
}

function getFromHighlighterOptions(highlighter, key) {
	return highlighter.options[key];
}

export default {
	getPos: getPos,
	getPosition: getPosition,
	addToHighlighterOptions: addToHighlighterOptions,
	getFromHighlighterOptions: getFromHighlighterOptions
}
