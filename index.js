
// https://stackoverflow.com/a/51162901/8175291
const request = require('request');
var appid;

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
	console.log("Script: Fetching Steam API data...");
	try {
		/* for (const i of Array.from(Array(12).keys()).slice(3, 5)) {} */
		appid = 10;
		const html = JSON.parse(await downloadPage("https://store.steampowered.com/api/appdetails/?appids=" + appid + "&l=en&format=json")); //('https://microsoft.com')
		console.log("Script: Steam API data successfully fetched.");
		if (html[appid].success != true) {
			//console.log("Is request to API was success:" + html[appid].success); //.slice(0, 250) + "...");
			console.log("Steam API: Requested app is unknown, unpublished, or deleted. Possible workaround: \"https://steamdb.info/app/" + appid + "/\"");
			return 1;
		}
		console.log("Steam API: Requested app is present. Determining base template...");
		console.log(html[appid].data.categories);
	} catch (error) {
		console.error(error);
		return 1;
	}
	console.log("Script: Done.");
}

// run your async function
main();
