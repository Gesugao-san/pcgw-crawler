
//var config = require('./config/input.json');

const fs = require('fs');
import fetch from 'node-fetch';


/* function showMessage(message) {
	if ((message === undefined) || (typeof message !== 'string')) {
		message = 'Error!';
	}
	console.log(message);
}
showMessage("Hi!"); */

function generateWarningForPCGW() {
	//let generate_state = "Generator (general warning): ";
	fs.writeFile('./cache/output/page.wikitext', "<!-- AUTO GENERATED FOR 'https://pcgamingwiki.com/', DO NOT EDIT! -->\n", (err) => {
		if (err)
			console.log("Generator (general warning): Error: \n", err);
		else
			console.log("Generator (general warning): OK");
	});
	//console.log(generate_state);
}

async function getAndCacheDataFromSteamAPI(params) {
	const response = await fetch('http://store.steampowered.com/api/appdetails/?appids=10&l=en&format=json');
	const data = await response.json();
	console.log(data);
}
/* function generateInfobox() {} */ /* populateInfobox */

generateWarningForPCGW();
getAndCacheDataFromSteamAPI();
