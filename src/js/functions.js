export default {
	getPos: getPos
}

// get position of element
function getPos(el) {
	let elements = [];
	for (var lx = 0, ly = 0; el != null; lx += el.offsetLeft, ly += el.offsetTop, el = el.offsetParent){
		elements.push(el);
	}
	return { x: lx, y: ly, elements: elements };
}
