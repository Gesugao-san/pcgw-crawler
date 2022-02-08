
var echoSay = function() {
	var echo_in = document.getElementById('echo_in').value;
	var echo_status = document.getElementById('echo_status');
	if(echo_in === "") {
		/* var error = "Input empty!";
		alert(echo_in);
		echo_status.textContent = error;
		throw new Error(error); */
		console.debug("Func echoSay() triggered, but input empty, ignoring...");
		return 0;
	}
	var output = "Echo: " + echo_in;
	console.debug("Func echoSay() triggered, output: \"" + output + "\"");
	echo_status.textContent = output;
	alert(output);
	/* sleep(1);
	echo_status.textContent = "Waiting for input..."; */
};

var echoClear = function() {
	var echo_in = document.getElementById('echo_in');
	var echo_status = document.getElementById('echo_status');
	console.debug("Func echoClear() triggered.");
	echo_in.value = "";
	echo_status.textContent = "Waiting for input...";
};

// ---

var triangleСalculate = function() {
	var base   = parseFloat(document.getElementById('triangle_in1').value);
	var height = parseFloat(document.getElementById('triangle_in2').value);
	var output = document.getElementById('triangle_out');
	var status = document.getElementById('triangle_status');

	if(isNaN(base) || isNaN(height)) {
		var error = "Input invalid!";
		console.error("Func triggered, but error occured: " + error);
		status.textContent = error;
		output.textContent = "";
		throw new Error("Input invalid!");
	} else {
		var area = .5 * base * height;
		output.textContent = area;
		status.textContent = "Сalculating done.";
	}
};

var triangleClear = function() {
	var in1    = document.getElementById('triangle_in1');
	var in2    = document.getElementById('triangle_in2');
	var out    = document.getElementById('triangle_out');
	var status = document.getElementById('triangle_status');

	console.debug("Func triangleClear() triggered.");
	in1.value = "";
	in2.value = "";
	out.textContent = "N\\A";
	status.textContent = "Waiting for input...";
};

// ---

var getJSON = function() {
	var fs = require('fs');
	var file = fs.readFileSync('../../config/input.json', 'utf8');
	var obj = JSON.parse(file);
	var json_out = document.getElementById('json_out');

	if(isNaN(obj.Steam)) {
		json_out.textContent = "Input invalid!";
		throw new Error("Input invalid!");
	} else {
		json_out.textContent = "JSON: " + obj.Steam;
		console.log("2.", obj.Steam);
	}
};
