
//var config = require('./config/input.json');

const fs = require('fs');
//import fetch from 'node-fetch';
const request = require('request');

const parameters = {
	appid: 1162700, // 1162700, 730, 570, 10
	l: 'en'
};

const req_options = {
	uri: 'http://store.steampowered.com/api/appdetails/?appids=' + parameters["appid"] + '&l=en&format=json',
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


// https://usefulangle.com/post/170/nodejs-synchronous-http-request
const https = require('https');

// function returns a Promise
function getPromise() {
	return new Promise((resolve, reject) => {
		https.get('https://store.steampowered.com/api/appdetails/?appids=10&l=en&format=json', (response) => {
			let chunks_of_data = [];

			response.on('data', (fragments) => {
				chunks_of_data.push(fragments);
			});

			response.on('end', () => {
				let response_body = Buffer.concat(chunks_of_data);
				resolve(response_body.toString());
			});

			response.on('error', (error) => {
				reject(error);
			});
		});
	});
}

// async function to make http request
function saveFile(response_body) {
	try {
		let body_parsed = JSON.parse(response_body);
		console.log('Data received:\n', body_parsed);
		console.log('Data saving in progress...');
		fs.writeFile('./cache/SteamAPI/' + parameters["appid"] + '.json', JSON.stringify(body_parsed, null, 4), function(err, result) {
			if (err)
				console.log('Error occured while data saving: ', err);
			else
				console.log('Data saved.');
		});
	}
	catch(error) {
		// Promise rejected
		console.log(error);
	}
}
// async function to make http request
async function makeSynchronousRequest(request) {
	try {
		let http_promise = getPromise();
		let response_body = await http_promise;

		// holds response from server that is passed when Promise is resolved
		// console.log(response_body);
		saveFile(response_body);
	}
	catch(error) {
		// Promise rejected
		console.log(error);
	}
}

console.log(1);

// anonymous async function to execute some code synchronously after http request
(async function () {
	console.log(2);
	// wait to http request to finish
	await makeSynchronousRequest();

	// below code will be executed after http request is finished
	//  ^-- NO
	console.log(4); //3

	generateWarningForPCGW();

	const used = process.memoryUsage().heapUsed / 1024 / 1024;
	console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
})();

// WHY
console.log(3); //4
