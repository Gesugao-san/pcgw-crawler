
// https://stackoverflow.com/a/51162901/8175291

const request = require('request');

// wrap a request in an promise
function downloadPage(url) {
	return new Promise((resolve, reject) => {
		request(url, (error, response, body) => {
			if (error) reject(error);
			if (response.statusCode != 200) {
				reject('Invalid status code <' + response.statusCode + '>');
			}
			resolve(body);
		});
	});
}

// now to program the "usual" way
// all you need to do is use async functions and await
// for functions returning promises
async function main() {
	console.log("1");
	try {
		const html = await downloadPage("https://store.steampowered.com/api/appdetails/?appids=10&l=en&format=json"); //('https://microsoft.com')
		console.log('SHOULD WORK:');
		console.log(html.slice(0, 250) + "...");

		// try downloading an invalid url
		await downloadPage('http://      .com')
	} catch (error) {
		console.error(error);
	}
	console.log("2");
}

// run your async function
main();
