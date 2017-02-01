var lights = [];

function vent(ms = 0) {
  return new Promise(r => setTimeout(r, ms));
}


window.addEventListener("load", function() {
	var lightsP = document.getElementById("lights");

	for (var i = 0; i < 100; i++) {
		var l = document.createElement("div");
		l.className = "led";
		l.setAttribute("data-content", i);
		lightsP.appendChild(l);
		lights.push(l);
		tenn(i, SVART);
	}
	var textarea = document.querySelector("textarea");
	var button = document.querySelectorAll("button")[0];
	function unblock() {
		button.removeAttribute('disabled');
	}
	function blink() {
		textarea.style.background = "#f99";
		setTimeout(() => {
			textarea.style.background = "";
		}, 200)
	}

	button.addEventListener("click", function() {
		button.setAttribute("disabled", "");
		for (var i = 0; i < 100; i++) {
			tenn(i, SVART);
		}
		try {  
			eval("(async () => { try { "
				+ textarea.value.replace("vent", "await vent")
				+ " } catch(e) { blink() } finally { unblock()  }"
			+ " })()");
		} catch(e) {
			blink();
			unblock();
		} 
	});
	var code = localStorage.getItem("code");

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

	var reset = document.querySelectorAll("button")[1];
	reset.addEventListener("click", function() {
		localStorage.removeItem("code");
		location.href = location.href;
	});

}, false);

function range(b,e,s = 1) {
	return 
}

function color(r,g,b) {
	return `rgb(${Math.floor(r)},${Math.floor(g)},${Math.floor(b)})`
}

function tenn(x, [r, g, b]=[255,255,255]) {
	var c1 = color(r,g,b);
	var c2 = color(r*0.9, g*0.9, b*0.9);
	var c3 = color(r*0.94, g*0.94, b*0.94);
	lights[x].style.background = "linear-gradient(" + c1 + " 0%, " + c2 + " 50%, " + c3 + " 100%)";
	lights[x].style.boxShadow = ("0px 0px 5px 1px " + color(r,g,b));
}

function slukk(x) {
	tenn(x, SVART);
}

var RØD = [255, 0, 0];
var BLÅ = [0,0,255];
var GRØNN = [0,255,0];
var ROSA = [255,0,255];
var GUL = [255, 255, 0];
var HVIT = [255, 255, 255];
var SVART = [40, 40, 40];

