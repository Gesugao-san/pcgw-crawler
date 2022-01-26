
const fs = require('fs');
const wtf = require('wtf_wikipedia');

/* fs.readFile('./data/base_templates/1. Game (singleplayer).wikitext', function (err, data) {
	if (err) throw err;
	if (data.includes('monetization')){
		console.log(data) //Do Things
	}
}); */

let file_source = './data/base_templates/1. Game (singleplayer).wikitext';
let file_destination = './cache/output/page.wikitext';

/* fs.copyFile(file_source, file_destination, (err) => {
	if (err) throw err;
	else console.log('File "' + file_source +'" was copied to "' + file_destination +'".');
}); */


fs.readFile(file_destination, 'utf8', function (err,data) {
	if (err) {
		return console.log(err);
	}
	//var result = data.replace(/string to be replaced/g, 'replacement');
	var result = wtf(data).infoboxes()[0].wikitext().replace(/^\s*\n/gm, "");
	console.log(result);

	/* fs.writeFile(file_destination, result, 'utf8', function (err) {
		if (err) return console.log(err);
	}); */
});

