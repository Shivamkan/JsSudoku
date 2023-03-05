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

function drawRect(canvas, start, size, color) {
    if(color == null){
        color = "#000000"
    }

    canvas.beginPath();
    canvas.fillStyle = color;
    canvas.rect(...start, ...size)
    canvas.fill();
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

function getAllUrlParams(url) {

  // get query string from url (optional) or window
  var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

  // we'll store the parameters here
  var obj = {};

  // if query string exists
  if (queryString) {

    // stuff after # is not part of query string, so get rid of it
    queryString = queryString.split('#')[0];

    // split our query string into its component parts
    var arr = queryString.split('&');

    for (var i = 0; i < arr.length; i++) {
      // separate the keys and the values
      var a = arr[i].split('=');

      // set parameter name and value (use 'true' if empty)
      var paramName = a[0];
      var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

      // (optional) keep case consistent
      paramName = paramName.toLowerCase();
      if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

      // if the paramName ends with square brackets, e.g. colors[] or colors[2]
      if (paramName.match(/\[(\d+)?\]$/)) {

        // create key if it doesn't exist
        var key = paramName.replace(/\[(\d+)?\]/, '');
        if (!obj[key]) obj[key] = [];

        // if it's an indexed array e.g. colors[2]
        if (paramName.match(/\[\d+\]$/)) {
          // get the index value and add the entry at the appropriate position
          var index = /\[(\d+)\]/.exec(paramName)[1];
          obj[key][index] = paramValue;
        } else {
          // otherwise add the value to the end of the array
          obj[key].push(paramValue);
        }
      } else {
        // we're dealing with a string
        if (!obj[paramName]) {
          // if it doesn't exist, create property
          obj[paramName] = paramValue;
        } else if (obj[paramName] && typeof obj[paramName] === 'string'){
          // if property does exist and it's a string, convert it to an array
          obj[paramName] = [obj[paramName]];
          obj[paramName].push(paramValue);
        } else {
          // otherwise add the property
          obj[paramName].push(paramValue);
        }
      }
    }
  }

  return obj;
}

function deepCopy(obj) {
    if (typeof obj == 'object') {
        if (Array.isArray(obj)) {
            var l = obj.length;
            var r = new Array(l);
            for (var i = 0; i < l; i++) {
                r[i] = deepCopy(obj[i]);
            }
            return r;
        } else {
            var r = {};
            r.prototype = obj.prototype;
            for (var k in obj) {
                r[k] = deepCopy(obj[k]);
            }
            return r;
        }
    }
    return obj;
}