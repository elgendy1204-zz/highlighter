// calibaration algorithms for x and Y positions of points
export default (function() {

	function calibarateX(clientX, parents, canvasContainer, calibarationLevel, lang) {
		let elementX = clientX;
		elementX = calibarateElementX(elementX, parents);
		elementX = calibarateScrollLeft(elementX, parents, canvasContainer);
		elementX = calibarateScaleX(elementX, canvasContainer, calibarationLevel, lang);
		return elementX;
	}

	function calibarateY(clientY, parents, canvasContainer, calibarationLevel, transformOriginY) {
		let elementY = clientY;
		elementY = calibarateElementY(elementY, parents);
		elementY = calibarateScrollTop(elementY, parents, canvasContainer);
		elementY = calibarateScaleY(elementY, canvasContainer, calibarationLevel, transformOriginY);
		return elementY;
	}

	// in case of absolute divs only - calculate left
	function calibarateElementX(clientX, parents) {
		let additions = 0,
			accumOffsetLeft = 0;
		parents = parents.toArray().reverse();
		parents.forEach(function(element, number) {
			additions += (element.getBoundingClientRect().left - accumOffsetLeft);
			accumOffsetLeft += element.getBoundingClientRect().left;
		});
		return clientX - additions;
	}

	// in case of absolute divs only - calculate top
	function calibarateElementY(clientY, parents) {
		let additions = 0,
			accumOffsetTop = 0;
		parents = parents.toArray().reverse();
		parents.forEach(function(element, number) {
			additions += (element.getBoundingClientRect().top - accumOffsetTop);
			accumOffsetTop += element.getBoundingClientRect().top;
		});
		return clientY - additions;
	}

	// calculate scroll left
	function calibarateScrollLeft(clientX, parents, container) {
		let initialWidth = container.offsetWidth,
			scaledWidth = container.getBoundingClientRect().width,
			widthDiff = scaledWidth - initialWidth,
			scaleX = scaledWidth / initialWidth,
			additions = 0;

		scaleX = parseFloat(scaleX.toFixed(5));

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
		let initialHeight = container.offsetHeight,
			scaledHeight = container.getBoundingClientRect().height,
			scaleY = scaledHeight / initialHeight,
			additions = 0;

		scaleY = parseFloat(scaleY.toFixed(5));

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
		let initialWidth = container.offsetWidth,
			scaledWidth = container.getBoundingClientRect().width,
			widthDiff = scaledWidth - initialWidth,
			scaleX = scaledWidth / initialWidth,
			calibaratedValue = 0;

		scaleX = parseFloat(scaleX.toFixed(5));

		for (let calLevel = 0; calLevel <= calDegree; calLevel++) {
			calibaratedValue += clientX * Math.pow(1 - scaleX, calLevel);
		}

		if (lang === 'a') {
			// calibarate width
			for (let _calLevel = 0; _calLevel <= calDegree; _calLevel++) {
				calibaratedValue += widthDiff * Math.pow(1 - scaleX, _calLevel);
			}
			return calibaratedValue;
		}

		return calibaratedValue;
	}

	// calculate scale Y
	function calibarateScaleY(clientY, container, calDegree, transformOriginY) {
		transformOriginY = Number(transformOriginY);
		let initialHeight = container.offsetHeight,
			scaledHeight = container.getBoundingClientRect().height,
			transformOriginYCorrectionFactor = transformOriginY / (scaledHeight + transformOriginY),
			scaleY = scaledHeight / initialHeight,
			calibaratedValue = 0;

		scaleY = parseFloat(scaleY.toFixed(5));

		for (let calLevel = 0; calLevel <= calDegree; calLevel++) {
			calibaratedValue += clientY * Math.pow(1 - scaleY, calLevel);
		}
		for (let _calLevel2 = 1; _calLevel2 <= calDegree; _calLevel2++) {
			calibaratedValue -= transformOriginY * Math.pow(1 - scaleY, _calLevel2);
		}
		return calibaratedValue;
	}

	return {
		calibarateX: calibarateX,
		calibarateY: calibarateY
	}

}());