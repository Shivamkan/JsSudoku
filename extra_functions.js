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

function drawText(canvas, pos, text, size, width, color="#FF0000", fill, textAlign='start', textBaseline='top'){
	canvas.textAlign = textAlign;
	canvas.textBaseline=textBaseline;
	canvas.font = String(size)+"px sans-serif";
	canvas.strokeStyle = color;
	canvas.lineWidth = width;
	if (fill!="" && fill!=null && fill!=undefined){
		canvas.fillStyle = fill;
		canvas.fillText(text,...pos);
	}
	canvas.strokeText(text,...pos);
}

function sample(arr, length){
	if(arr.length<length){throw "Too big"; return;}
	let output=[];
	while(output.length<length){
		rand = arr[Math.floor(arr.length * Math.random())];
		if (!output.includes(rand)){
			output.push(rand);
		}
	}
	return output;
}

function range(start, stop, step) {
    if (typeof stop == 'undefined') {
        // one param defined
        stop = start;
        start = 0;
    }

    if (typeof step == 'undefined') {
        step = 1;
    }

    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }

    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }

    return result;
}