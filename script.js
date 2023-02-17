let myC = document.getElementById("myCanvas");
var dimension = [window.innerWidth, window.innerHeight];
let myCanvas = myC.getContext("2d");
let size = Math.min(dimension[0],dimension[1])*0.9;

{
	myC.width = size;
	myC.height = size;
	myC.style.left = String(((dimension[0]-size)/2));
	myC.style.top = String(((dimension[1]-size)/2));
	myC.style.position = "absolute"} //resizing canvas and centering it.

for(i=1;i<=8;i++){
	if(!(i%3)){
		drawLine(myCanvas, [(size*i)/9,0],[(size*i)/9,size],3 ,"#FF0000")
	}
	else{
		drawLine(myCanvas, [(size*i)/9,0],[(size*i)/9,size])
	}
}
for(i=1;i<=8;i++){
	if(!(i%3)){
		drawLine(myCanvas, [0,(size*i)/9],[size,(size*i)/9],3 ,"#FF0000")
	}
	else{
		drawLine(myCanvas, [0,(size*i)/9],[size,(size*i)/9])
	}
}