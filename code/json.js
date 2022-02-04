
// ..\pcgw-crawler> node ".\code\json.js"
//https://stackoverflow.com/a/10011078/8175291
var fs = require('fs');
var file = fs.readFileSync('./config/input.json', 'utf8');
var obj = JSON.parse(file);
const name = "AppID";

// https://stackoverflow.com/a/44185289/8175291
function get(object, key, default_value) {
	var result = object[key];
	return (typeof result !== "undefined") ? result : default_value;
}

console.log("1.", obj);
console.log("2.", obj.Steam);
console.log("3.", obj['Steam'].name);
console.log("4.", obj.Reception["Metacritic"]); // H E L P  M E  P L E A S E
// GOD https://stackoverflow.com/a/11922384/8175291
//console.dir(obj);

for (const prop1 in obj) {
    // `prop` contains the name of each property, i.e. `'code'` or `'items'`
    // consequently, `data[prop]` refers to the value of each property, i.e.
    // either `42` or the array
	console.log("*.", obj[prop1]);
	for (const prop2 in obj[prop1]) {
		console.log("*.", obj[prop1][prop2]);
	}
}
