
const fs = require('fs');
//const wtf = require('wtf_wikipedia');

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


fs.readFile(file_destination, 'utf8', function (err, data) {
	if (err) return console.log(err);

	let searchString = 'cover.jpg';
	let replaceString = '|cover        = ANOTHER GAME cover.jpg';
	let re = new RegExp('^.*' + searchString + '.*$', 'gm');
	let formatted = data.replace(re, replaceString);
	//var result = wtf(data).infoboxes()[0].get("cover").wikitext(); //.replace(/^\s*\n/gm, "");
	console.log(formatted);

	fs.writeFile(file_destination, formatted, 'utf8', function (err) {
		if (err) return console.log(err);
	});
});
