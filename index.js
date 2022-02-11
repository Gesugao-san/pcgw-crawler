
// https://stackoverflow.com/a/51162901/8175291
const request = require('request');
const fs = require('fs');

var appid, baseTemplateVerdict;
var baseTemplateData = {
	"Base Input Path":  "data/base_templates",
	"Base Output Path": "cache/output",
	"Singleplayer":    "1. Game (singleplayer).wikitext",
	"Multiplayer":     "2. Game (multiplayer).wikitext",
	"Unknown":         "3. Game (unknown).wikitext",
	"Series":          "4. Series.wikitext",
	"Sample article":  "5. Sample article.wikitext"
}


function getArrayOfIDs(origin_array) {
	var keys = [];
	for (var k in origin_array) {
		if (typeof origin_array[k].id != "number") // See "genres" ids, IT'S STRINGS, WHY?!
			origin_array[k].id = parseInt(origin_array[k].id, 10);
		keys.push(origin_array[k].id);
	}
	return keys
}

function DetermineBaseTemplate(categories_array, genres_array) {
	var searchData = {
		"Multiplayer": {
			"genres": ["29"],
			"categories": ["1", "9", "20", "27", "36", "37", "38", "39"]
		},
		"Singleplayer": {
			"categories": ["2"]
		}
	};
	var scores = {
		"Multiplayer": 0,
		"Singleplayer": 0
	};
	for (let i = 0; i < 8; i++) { // all categories of "Multiplayer" category
		for (let ii = 0; ii < categories_array.length; ii++)
			if (categories_array[ii].id == searchData["Multiplayer"]["categories"][i])
				scores["Multiplayer"] += 1;
	}
	if (categories_array.includes(searchData["Singleplayer"]["categories"]))
		scores["Singleplayer"] += 1;
	if (genres_array.includes(searchData["Multiplayer"]["genres"]))
		scores["Multiplayer"] += 1;

	console.log("Scores: " + JSON.stringify(scores));
	if (scores["Multiplayer"] + scores["Singleplayer"] == 0)
		return "Unknown"
	if (scores["Multiplayer"] >= scores["Singleplayer"])
		return "Multiplayer"
	else
		return "Singleplayer"
}

// https://stackoverflow.com/a/34976444/8175291
// https://bobbyhadz.com/blog/javascript-check-if-array-contains-substring-match
function replaceTemplateFieldValue(fileDataAsArray, matchOn, replacingOn, delimiterType) {
	console.log("Script: Replacing base template field values...");
	let matches = fileDataAsArray.findIndex(s => s.includes(matchOn));
	if (matches != -1) {
		console.log("Search of \"" + matchOn + "\" succesed: [" + matches + "]\n" + fileDataAsArray[matches]);
	} else {
		console.log("Search of \"" + matchOn + "\" failed!");
		return 1;
	}
	if (delimiterType == "=") {
		if (fileDataAsArray[matches].split(delimiterType)[1][0] == " ") // " = "
			console.log(fileDataAsArray[matches].split(delimiterType)[1].slice(1, -1));
		else
			console.log(fileDataAsArray[matches].split(delimiterType)[1]);
		fileDataAsArray[matches] = fileDataAsArray[matches].split(delimiterType)[0] + delimiterType + " " + replacingOn + "\n";
		console.log(fileDataAsArray[matches].slice(0, -1));
	} else if (delimiterType == "|") {
			console.log(fileDataAsArray[matches].split(delimiterType)[1]);
			fileDataAsArray[matches] = fileDataAsArray[matches].split(delimiterType)[0] + delimiterType + replacingOn + "}}\n";
			console.log(fileDataAsArray[matches].slice(0, -1));
	} else {
		throw new Error("Check delimiterType!");
	}
	console.log("Script: Replacing base template field values done.");
}

function writeBaseTemplateToOutput(outputFilePath, DataAsArray) {
	console.log("Script: File writing...");
	var file = fs.createWriteStream(outputFilePath);
	file.on('error', function(err) {throw new Error("Write error!" + err);});
	DataAsArray.forEach(function(v) {file.write(v);});
	file.end();
	console.log("Script: File writing done.");
}

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
	appid = 10;
	console.log("Script: Started up. Target Steam AppID: " + appid);
	console.log("Script: Fetching Steam API data...");
	try {
		/* for (const i of Array.from(Array(12).keys()).slice(3, 5)) {} */
		const html = JSON.parse(await downloadPage("https://store.steampowered.com/api/appdetails/?appids=" + appid + "&l=en&format=json")); //('https://microsoft.com')
		console.log("Script: Steam API data successfully fetched.");
		if (html[appid].success != true) {
			//console.log("Is request to API was success:" + html[appid].success); //.slice(0, 250) + "...");
			console.log("Steam API: Requested app is unknown, unpublished, or deleted. Possible workaround: \"https://steamdb.info/app/" + appid + "/\"");
			return 1;
		}
		console.log("Steam API: Requested app is present. Determining base template...");
		baseTemplateVerdict = DetermineBaseTemplate(html[appid].data.categories, html[appid].data.genres);
		console.log("Verdict: Base template is " + baseTemplateVerdict + ". File: \"" + baseTemplateData[baseTemplateVerdict] + "\".");
		/* fs.copyFile(
				baseTemplateData["Base Input Path"] + "/" + baseTemplateData[baseTemplateVerdict],
				baseTemplateData["Base Output Path"] + "/page.wikitext", (err) => {
			if (err)
				throw err;
			else
				console.log("Base Template was copied to \"" + baseTemplateData["Base Output Path"] + "\".");
		}); */
		var baseTemplateReaded = fs.readFileSync(baseTemplateData["Base Input Path"] + "/" + baseTemplateData[baseTemplateVerdict]).toString().split("\n");
		replaceTemplateFieldValue(baseTemplateReaded, "cover", html[appid].data.name + " cover.jpg", "=");
		replaceTemplateFieldValue(baseTemplateReaded, "/developer", html[appid].data.developers, "|");
		replaceTemplateFieldValue(baseTemplateReaded, "/publisher", html[appid].data.publishers, "|");
		replaceTemplateFieldValue(baseTemplateReaded, "steam appid", appid, "=");
		writeBaseTemplateToOutput(baseTemplateData["Base Output Path"] + "/page.wikitext", baseTemplateReaded);
	} catch (error) {
		console.error(error);
		return 1;
	}
	console.log("Script: Finished.");
}

// run your async function
main();
