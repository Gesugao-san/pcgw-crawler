
var fs = require('fs');
var file = '1. Game (singleplayer)';
var path = './data/base_templates/' + file + '.wikitext'; // "node .\code\search_in_template.js"
// https://stackoverflow.com/a/6832105/8175291
var array = fs.readFileSync(path).toString().split("\n");
console.clear();
for(i in array[0,5]) {
	console.log(array[i]);
}

// https://stackoverflow.com/a/34976444/8175291
// https://bobbyhadz.com/blog/javascript-check-if-array-contains-substring-match
const matchOn = "cover";
let matches = array.findIndex(s => s.includes(matchOn));
if (matches != -1) {
	console.log("Search of \"" + matchOn + "\" succesed: [" + matches + "]\n" + array[matches]);
} else {
	console.log("Search of \"" + matchOn + "\" failed!");
	return 1;
}

console.log(array[matches].split("=")[1].slice(1, -1));
array[matches] = array[matches].split("=")[0] + "= " + "ANOTHER GAME TITLE cover.jpg" //array[matches].split("=")[1].replace("GAME", "ANOTHER GAME");
console.log(array[matches]);

/* function templateSearch(array) {
	array
} */
