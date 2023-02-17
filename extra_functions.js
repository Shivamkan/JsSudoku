function drawLine(canvas, start, end, width, color) {
	if(width == null || width == NaN){
		width = 1
	}
	if(color == null || color == NaN){
		color = "#000000"
	}
	myCanvas.beginPath();
	myCanvas.moveTo(start);
}