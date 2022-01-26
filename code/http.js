
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
async function makeSynchronousRequest(request) {
	try {
		let http_promise = getPromise();
		let response_body = await http_promise;

		// holds response from server that is passed when Promise is resolved
		console.log(response_body);
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
})();

// WHY
console.log(3); //4
