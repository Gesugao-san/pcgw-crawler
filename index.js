
//var config = require('./config/input.json');

const fs = require('fs');
//import fetch from 'node-fetch';
const request = require('request');


const req_options = {
	uri: 'http://store.steampowered.com/api/appdetails/?appids=10&l=en&format=json',
	port: 80,
	method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8'
    }
};

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

function getData() {
	return request.get('http://store.steampowered.com/api/appdetails/?appids=10&l=en&format=json', function (error, response, body) { //1
		if (!error && response.statusCode == 200) {
			var data = "data:"
			+ response.headers["content-type"]
			+ ";base64,"
			+ new Buffer.from(body).toString('base64');
			return data
			//return JSON.parse(body);
		}
	});
}

async function main() {
	console.log("1");
	var myData = await getData();
	console.log(myData);
	console.log("2");
}



generateWarningForPCGW();
//getAndCacheDataFromSteamAPI();
main();
