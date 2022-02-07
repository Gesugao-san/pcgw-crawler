
var triangleArea = function() {
	var base   = parseFloat(document.getElementById('base'  ).value);
	var height = parseFloat(document.getElementById('height').value);

	var output = document.getElementById('output');

	if(isNaN(base) || isNaN(height)) {
		output.textContent = "Input invalid!";
		throw new Error("Input invalid!");
	} else {
		var area = .5 * base * height;
		output.textContent = "Area = " + area;
	}

	alert("Echo:", var1);
};

// ---

var getJSON = function() {
	var fs = require('fs');
	var file = fs.readFileSync('../../config/input.json', 'utf8');
	var obj = JSON.parse(file);
	var output2 = document.getElementById('output2');

	if(isNaN(obj.Steam)) {
		output2.textContent = "Input invalid!";
		throw new Error("Input invalid!");
	} else {
		output2.textContent = "JSON = " + obj.Steam;
		console.log("2.", obj.Steam);
	}
};
