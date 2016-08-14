// calibaration algorithms for x and Y positions of points
export default (function() {

	function calibarateX(clientX, parents, canvasContainer, calibarationLevel, lang) {
		var elementX = clientX;
		elementX = calibarateElementX(elementX, parents);
		elementX = calibarateScrollLeft(elementX, parents, canvasContainer);
		elementX = calibarateScaleX(elementX, canvasContainer, calibarationLevel, lang);
		return elementX;
	}

	function calibarateY(clientY, parents, canvasContainer, calibarationLevel, transformOriginY) {
		var elementY = clientY;
		elementY = calibarateElementY(elementY, parents);
		elementY = calibarateScrollTop(elementY, parents, canvasContainer);
		elementY = calibarateScaleY(elementY, canvasContainer, calibarationLevel, transformOriginY);
		return elementY;
	}

	// in case of absolute divs only - calculate left
	function calibarateElementX(clientX, parents) {
		var additions = 0;
		let accumOffsetLeft = 0;
		parents = parents.toArray().reverse();
		parents.forEach(function(element, number) {
			additions += (element.getBoundingClientRect().left - accumOffsetLeft);
			accumOffsetLeft += element.getBoundingClientRect().left;
		});
		return clientX - additions;
	}

	// in case of absolute divs only - calculate top
	function calibarateElementY(clientY, parents) {
		var additions = 0;
		let accumOffsetTop = 0;
		parents = parents.toArray().reverse();
		parents.forEach(function(element, number) {
			additions += (element.getBoundingClientRect().top - accumOffsetTop);
			accumOffsetTop += element.getBoundingClientRect().top;
			console.log(element, additions);
		});
		console.log('total', additions);
		return clientY - additions;
	}

	// calculate scroll left
	function calibarateScrollLeft(clientX, parents, container) {
		var initialWidth = container.offsetWidth;
		var scaledWidth = container.getBoundingClientRect().width;
		var widthDiff = scaledWidth - initialWidth;
		var scaleX = scaledWidth / initialWidth;
		scaleX = parseFloat(scaleX.toFixed(5));

		var additions = 0;
		parents.each(function(number, element) {
			if (element === container) {
				additions += element.scrollLeft + element.scrollLeft * (scaleX - 1);
			} else {
				additions += element.scrollLeft;
			}
		});
		return clientX + additions;
	}

	// calculate scroll top
	function calibarateScrollTop(clientY, parents, container) {
		var initialHeight = container.offsetHeight;
		var scaledHeight = container.getBoundingClientRect().height;
		var scaleY = scaledHeight / initialHeight;
		scaleY = parseFloat(scaleY.toFixed(5));

		var additions = 0;
		parents.each(function(number, element) {
			if (element === container) {
				additions += element.scrollTop + element.scrollTop * (scaleY - 1);
			} else {
				additions += element.scrollTop;
			}
		});
		return clientY + additions;
	}

	// calculate scale X
	function calibarateScaleX(clientX, container, calDegree, lang) {
		var initialWidth = container.offsetWidth;
		var scaledWidth = container.getBoundingClientRect().width;
		var widthDiff = scaledWidth - initialWidth;
		var scaleX = scaledWidth / initialWidth;
		scaleX = parseFloat(scaleX.toFixed(5));
		var calibaratedValue = 0;
		for (var calLevel = 0; calLevel <= calDegree; calLevel++) {
			calibaratedValue += clientX * Math.pow(1 - scaleX, calLevel);
		}

		if (lang === 'a') {
			// calibarate width
			for (var _calLevel = 0; _calLevel <= calDegree; _calLevel++) {
				calibaratedValue += widthDiff * Math.pow(1 - scaleX, _calLevel);
			}
			return calibaratedValue;
		}

		return calibaratedValue;
	}

	// calculate scale Y
	function calibarateScaleY(clientY, container, calDegree, transformOriginY) {
		var initialHeight = container.offsetHeight;
		var scaledHeight = container.getBoundingClientRect().height;
		transformOriginY = Number(transformOriginY);
		var transformOriginYCorrectionFactor = transformOriginY / (scaledHeight + transformOriginY);
		var scaleY = scaledHeight / initialHeight;
		scaleY = parseFloat(scaleY.toFixed(5));
		var calibaratedValue = 0;
		for (var calLevel = 0; calLevel <= calDegree; calLevel++) {
			calibaratedValue += clientY * Math.pow(1 - scaleY, calLevel);
		}
		for (var _calLevel2 = 1; _calLevel2 <= calDegree; _calLevel2++) {
			calibaratedValue -= transformOriginY * Math.pow(1 - scaleY, _calLevel2);
		}
		return calibaratedValue;
	}

	return {
		calibarateX: calibarateX,
		calibarateY: calibarateY
	}

}());
