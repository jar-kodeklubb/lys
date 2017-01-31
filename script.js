var lights = [];

function vent(ms = 0) {
  return new Promise(r => setTimeout(r, ms));
}


window.addEventListener("load", function() {
	var lightsP = document.getElementById("lights");

	for (var i = 0; i < 100; i++) {
		var l = document.createElement("div");
		l.className = "led";
		lightsP.appendChild(l);
		lights.push(l);
		settFarge(i, SVART);
	}
	var textarea = document.querySelector("textarea");
	var button = document.querySelector("button");
	button.addEventListener("click", function() {
		button.setAttribute("disabled", "");
		for (var i = 0; i < 100; i++) {
			settFarge(i, SVART);
		}
		try {  
			eval("(async () => { "
				+ textarea.value.replace("vent", "await vent")
				+ ";button.removeAttribute('disabled');"
			+ " })()");
		} catch(e) { 
			button.removeAttribute('disabled'); 
		} 
	});
	var code = localStorage.getItem("code");
	console.log(code);
	if (code) textarea.value = code;
	textarea.addEventListener("keyup", function() {
		localStorage.setItem("code", textarea.value);
	});


	textarea.addEventListener("keydown", function(e){
	  if(e.keyCode==9 || e.which==9){
	      e.preventDefault();
	      var s = this.selectionStart;
	      this.value = this.value.substring(0,this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
	      this.selectionEnd = s+1; 
	  }
  });



}, false);

function range(b,e,s = 1) {
	return 
}

function color(r,g,b) {
	return `rgb(${Math.floor(r)},${Math.floor(g)},${Math.floor(b)})`
}

function settFarge(x, [r, g, b]) {
	var c1 = color(r,g,b);
	var c2 = color(r*0.9, g*0.9, b*0.9);
	var c3 = color(r*0.94, g*0.94, b*0.94);
	lights[x].style.backgroundImage = "-webkit-linear-gradient(top, " + c1 + " 0%, " + c2 + " 50%, " + c3 + " 100%)";
	lights[x].style.boxShadow = ("0px 0px 5px 0px " + color(r,g,b));
}

var RØD = [255, 0, 0];
var BLÅ = [0,0,255];
var GRØNN = [0,255,0];
var ROSA = [255,0,255];
var GUL = [255, 255, 0];
var HVIT = [255, 255, 255];
var SVART = [40, 40, 40];

