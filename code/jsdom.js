
const fs = require('fs');
// https://usefulangle.com/post/170/nodejs-synchronous-http-request
const https = require('https');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// function returns a Promise
function getPromise(_url) {
	return new Promise((resolve, reject) => {
		https.get(_url, (response) => {
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
async function makeSynchronousRequest(_url, _file) {
	try {
		let http_promise = getPromise(_url);
		let response_body = await http_promise;

		// holds response from server that is passed when Promise is resolved
		// console.log(response_body);
		const dom = new JSDOM(response_body);
		response_body = "<!-- AUTO GENERATED FROM 'https://www.pcgamingwiki.com/w/index.php?title=PCGamingWiki:Sample_article', DO NOT EDIT! -->\n"
		+ dom.window.document.getElementById('wpTextbox1').value;
		//console.log('Data received:\n', response_body);
		console.log('Data saving in progress ("' + _file + '")...');
		fs.writeFile('./data/base_templates/' + _file + '.wikitext', response_body, function(err, result) {
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

// anonymous async function to execute some code synchronously after http request
(async function () {
	// wait to http request to finish
	let base_url = 'https://www.pcgamingwiki.com/w/index.php?title=PCGamingWiki:Sample_article';
	await makeSynchronousRequest(base_url + '/Game_(singleplayer)&action=edit', '1. Game (singleplayer)');
	await makeSynchronousRequest(base_url + '/Game_(multiplayer)&action=edit',  '2. Game (multiplayer)');
	await makeSynchronousRequest(base_url + '/Game_(unknown)&action=edit',      '3. Game (unknown)');
	await makeSynchronousRequest(base_url + '/Series&action=edit',              '4. Series');
	await makeSynchronousRequest(base_url + '&action=edit',                     '5. Sample article');
})();
