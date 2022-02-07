
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
