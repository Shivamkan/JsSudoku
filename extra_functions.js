function drawLine(canvas, start, end, width, color) {
	if(width == null || width == NaN){
		width = 1
	}
	if(color == null){
		color = "#000000"
	}
	canvas.beginPath();
	canvas.strokeStyle = color;
	canvas.lineWidth = width;
	canvas.moveTo(...start);
	canvas.lineTo(...end);
	canvas.stroke();
	canvas.closePath();
}