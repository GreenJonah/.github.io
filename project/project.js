// Puts the exhaust shims into the html
function addExShims() {
var numValves = document.getElementById('exNum').value;
var exValve = [];

for (j = 0; j < numValves; j++) {
exValve[j] = `<table id='ex${j}' class='valve'>
<tr>
<td>
<input id="exGap${j}" class="input" placeholder="Current Gap">
</td>
</tr>
<tr>
<td>
	<input id="exThickness${j}" class="input" placeholder="Shim Thickness">
</td>
</tr>
</table>`;
}

var i = 0;
// Remove all of the previous children
var myNode = document.getElementById("exDisplay");
while (myNode.firstChild) {
    myNode.removeChild(myNode.firstChild);
}

if (numValves == 1) {
    i = 0;
    document.getElementById('exDisplay').insertAdjacentHTML('beforeend', exValve[i]);
} else if (numValves == 2) {
  while (i < 2)
  {
    document.getElementById('exDisplay').insertAdjacentHTML('beforeend', exValve[i]);
    i++;
  }
} else if (numValves == 3) {
  while (i < 3)
  {
    document.getElementById('exDisplay').insertAdjacentHTML('beforeend', exValve[i]);
    i++;
  }
}
}

// Puts the correct number of  intake shims in the html
function addInShims() {
  var numValves = document.getElementById('inNum').value;
	var inValve = [];

	for (j = 0; j < numValves; j++) {
	inValve[j] = `<table id='in${j}' class='valve'>
	<tr>
	<td>
	<input id="inGap${j}" class="input" placeholder="Current Gap">
	</td>
	</tr>
	<tr>
	<td>
		<input id="inThickness${j}" class="input" placeholder="Shim Thickness">
	</td>
	</tr>
	</table>`;
	}
  var i = 0;

  // Remove all of the previous children
  var myNode = document.getElementById("inDisplay");

  while (myNode.firstChild) {
      myNode.removeChild(myNode.firstChild);
  }

	//reset i
	i = 0 ;

	if (numValves == 1) {
	    i = 0;
	    document.getElementById('inDisplay').insertAdjacentHTML('beforeend', inValve[i]);
	} else if (numValves == 2) {
	  while (i < 2)
	  {
	    document.getElementById('inDisplay').insertAdjacentHTML('beforeend', inValve[i]);
	    i++;
	  }
	} else if (numValves == 3) {
	  while (i < 3)
	  {
	    document.getElementById('inDisplay').insertAdjacentHTML('beforeend', inValve[i]);
	    i++;
	  }
	}
}

function CustomAlert(){
    this.render = function(dialog){
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogoverlay = document.getElementById('dialogoverlay');
        var dialogbox = document.getElementById('dialogbox');
        dialogoverlay.style.display = "block";
        dialogoverlay.style.height = winH+"px";
        dialogbox.style.left = (winW/2) - (337 * .5)+"px";
        dialogbox.style.top = (winH/2) - (250 * .5)+ "px";
        dialogbox.style.display = "block";
        document.getElementById('dialogboxhead').innerHTML = "Shim Calculator";
        document.getElementById('dialogboxbody').innerHTML = dialog;
        document.getElementById('dialogboxfoot').innerHTML = '<button onclick="Alert.ok()">OK</button>';

    }
	this.ok = function(){
		document.getElementById('dialogbox').style.display = "none";
		document.getElementById('dialogoverlay').style.display = "none";
	}
}
var Alert = new CustomAlert();

// Puts the new values on the screen
function displayNew(ex1, ex2, ex3, in1, in2, in3) {
		if (ex1 == 0.00) {
			ex1 = '';
		}
		if (ex2 == 0.00) {
			ex2 = '';
		}
		if (ex3 == 0.00) {
			ex3 = '';
		}
		if (in1 == 0.00) {
			in1 = '';
		}
		if (in2 == 0.00) {
			in2 = '';
		}
		if (in3 == 0.00) {
			in3 = '';
		}

		Alert.render(`Exhaust<br/> ${ex1} ${ex2} ${ex3}<br/><br/>
									Intake<br/> ${in1} ${in2} ${in3}`);
}

// Calculates the values for the new shim and returns the value
function calculate(gap, tolerance, thickness) {
	// Dont display a negative tolorance if a shim is left empty
	if (gap == 0.00 || thickness == 0.00)
		return 0.00;
  shim = ((Number(gap) - Number(tolerance)) + Number(thickness));
  return shim.toFixed(4);
}

// Gets all of the values ready for calculation
function getValues() {
  // Get Tolerance
  var exTolerance = document.getElementById('exTolerance').value;
  var inTolerance = document.getElementById('inTolerance').value;

	// Get the number of exhaust and intake shims
	var exNum = document.getElementById('exNum').value;
	var inNum = document.getElementById('inNum').value;

	// Make variables for calculated shims
	var ex1 = 0.00;
	var ex2 = 0.00;
	var ex3 = 0.00;
	var in1 = 0.00;
	var in2 = 0.00;
	var in3 = 0.00;

  // Get the exhaust and intake shims parent
	var exParent = document.getElementById('exDisplay');
	var inParent = document.getElementById('inDisplay');
  // Only do work for the shims that are made
	if (exNum >= 1) {
		var gap = document.getElementById('exGap0').value;
		var thickness = document.getElementById('exThickness0').value;
		ex1 = calculate(gap, exTolerance, thickness);
	}
	if (exNum >= 2) {
		var gap = document.getElementById('exGap1').value;
		var thickness = document.getElementById('exThickness1').value;
		ex2 = calculate(gap, exTolerance, thickness);
	}
	if (exNum >= 3) {
		var gap = document.getElementById('exGap2').value;
		var thickness = document.getElementById('exThickness2').value;
		ex3 = calculate(gap, exTolerance, thickness);
	}

	if (inNum >= 1) {
		var gap = document.getElementById('inGap0').value;
		var thickness = document.getElementById('inThickness0').value;
		in1 = calculate(gap, inTolerance, thickness);
	}
	if (inNum >= 2) {
		var gap = document.getElementById('inGap1').value;
		var thickness = document.getElementById('inThickness1').value;
		in2 = calculate(gap, inTolerance, thickness)
	}
	if (inNum >= 3) {
		var gap = document.getElementById('inGap2').value;
		var thickness = document.getElementById('inThickness2').value;
		in3 = calculate(gap, inTolerance, thickness)
	}

	displayNew(ex1, ex2, ex3, in1, in2, in3);
}
