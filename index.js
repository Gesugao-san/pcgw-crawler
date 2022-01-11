
const request = require('request');
const querystring = require('querystring');
const fs = require('fs');
const path = require('path');

const parameters = {
	appid: 10, // 1162700, 730, 570, 10
	l: 'en'
};

//lastGameachePath = path.basename('./output/' + parameters["appid"] + '.json');
//const get_request_args = querystring.stringify(parameters);

const req_options = {
	uri: 'http://store.steampowered.com/api/appdetails/?appids=' + parameters["appid"] + '&l=en&format=json',
	port: 80,
	method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8'
    }
};

console.log('Target info:');
console.log('Steam AppID:', parameters["appid"]);
console.log('Steam page URL: https://store.steampowered.com/app/' + parameters["appid"] + '/');
console.log('Steam Web API URL:', req_options.uri);

console.log('Data receiving in progress...');
request(req_options, function(error, response, body) {
	if (!error && response.statusCode == 200) {
		body_parsed = JSON.parse(body);
		console.log('Data received:\n', body_parsed);
		console.log('Data saving in progress...');
		fs.writeFile('./cache/' + parameters["appid"] + '.json', JSON.stringify(body_parsed, null, 2), function(err, result) {
			if (err)
				console.log('Error occured while data saving: ', err);
			else
				console.log('Data saved.');
		});
		console.log('Is request was success (according to Steam Web API):', body_parsed[parameters["appid"]].success);
		console.log('');
		console.log('{{auto-generated}}');
		console.log('{{stub}}');
		console.log('{{Infobox game');
		console.log('|cover        = ' + body_parsed[parameters["appid"]].data.name + ' cover.jpg');
		console.log('|developers   = ');
		console.log('{{Infobox game/row/developer|' + body_parsed[parameters["appid"]].data.developers + '}}');
		console.log('|publishers   = ');
		console.log('{{Infobox game/row/publisher|' + body_parsed[parameters["appid"]].data.publishers + '}}');
		console.log('|engines      = ');
		console.log('{{}}'); //ToDo?
		console.log('|release dates= '); // See "platforms" field from API
		console.log('{{Infobox game/row/date|Steam|' + body_parsed[parameters["appid"]].data.release_date["date"] + '}}');
		console.log('|reception    = ');
		if (!typeof body_parsed[parameters["appid"]].data.metacritic in ['undefined', null]) {
			console.log('{{Infobox game/row/reception|Metacritic|' +
				body_parsed[parameters["appid"]].data.metacritic.url.replace(/\/|\?|\&/g, ' ').split(' ')[5] + '|' +
				body_parsed[parameters["appid"]].data.metacritic.score + '}}');
		} else {
			console.log('{{}}');
		};
		console.log('|taxonomy     = '); // See "categories" and "genres" fields from API
		console.log('{{}}');
		console.log('|steam appid  =', parameters["appid"]);
		if (!typeof body_parsed[parameters["appid"]].data.demos in ['undefined', null]) {
			console.log('|steam appid side  =', body_parsed[parameters["appid"]].data.demos);
		} else {
			console.log('|steam appid side  = ');
		};
		console.log('|gogcom id    = ');
		if (!typeof body_parsed[parameters["appid"]].data.website in ['undefined', null]) {
			console.log('|official site=', body_parsed[parameters["appid"]].data.website);
		} else {
			console.log('|official site= ');
		};
		console.log('|hltb         = ');
		console.log('|mobygames    = ');
		console.log('|strategywiki = ');
		console.log('|wikipedia    = ');
		console.log('|winehq       = ');
		console.log('|license      = ');
		console.log('}}');
		console.log('');
		console.log("'''General information'''");
		console.log('{{mm}} [https://steamcommunity.com/app/' + parameters["appid"] + '/discussions/ Steam Community Discussions]');
		console.log('');
		console.log('==Availability==');
		console.log('{{Availability|');
		console.log('{{Availability/row| Steam |', parameters["appid"], '| Steam | | | Windows?, OS X?, Linux? }}');
		console.log('}}');
		console.log('');
		console.log('==Audio==');
		console.log('<!-- ... -->');
		console.log('{{L10n|content=');
		if (!typeof body_parsed[parameters["appid"]].data.demos in ['undefined', null]) {
			console.log('{{ii}} A demo is available from {{store link|Steam|' + body_parsed[parameters["appid"]].data.demos + '}}.');
		};
		console.log('<!-- Passing: Game data, Video, Input, Audio (part) -->');
		for (lang_selected in body_parsed[parameters["appid"]].data.supported_languages.split('<br>')[0].split(',')) {
			console.log('{{L10n/switch');
			console.log('|language  =', body_parsed[parameters["appid"]].data.supported_languages.split('<br>')[0].split(', ')[lang_selected].replace('<strong>*</strong>', ''));
			console.log('|interface = true');
			//body_parsed[parameters["appid"]].data.supported_languages.split('<br>')[0].split(', ')[lang_selected].replace('<strong>*</strong>', '*')[-1] == '*');
			console.log('|audio     =', body_parsed[parameters["appid"]].data.supported_languages.split('<br>')[0].split(', ')[lang_selected].includes('*'))
			console.log('|subtitles =', body_parsed[parameters["appid"]].data.supported_languages.split('<br>')[0].split(', ')[lang_selected].includes('*'))
			console.log('|notes     = ');
			console.log('|fan       = ');
			console.log('}}');
		}
		console.log('<!-- Passing: Other information -->');
		console.log('==System requirements==');
		if (body_parsed[parameters["appid"]].data.platforms["windows"] === true) {
			console.log('|OSfamily = Windows');
			console.log('|minOS    = ');
			console.log('|minCPU   = ');
			console.log('|minRAM   = ');
			console.log('|minHD    = ');
			console.log('|minGPU   = ');
			console.log('|minGPU2  = ');
			console.log('|minVRAM  = ');
			console.log('|minDX    = ');
			console.log('|recOS    = ');
			console.log('|recCPU   = ');
			console.log('|recRAM   = ');
			console.log('|recHD    = ');
			console.log('|recGPU   = ');
			console.log('|recGPU2  = ');
			console.log('|recVRAM  = ');
			console.log('|recDX    = ');
			//console.log('|notes    = {{ii}} <p>' + body_parsed[parameters["appid"]].data.pc_requirements.minimum.split('<p>')[1].replace(/\r?\n|\r/g, " "));
			//console.log('<p>' + body_parsed[parameters["appid"]].data.pc_requirements.minimum.split('<p>')[2].replace(/\r?\n|\r/g, " "));
			console.log('|notes    = {{ii}}', body_parsed[parameters["appid"]].data.pc_requirements.minimum);
		}
		if (body_parsed[parameters["appid"]].data.platforms["mac"] === true) {
			console.log('|OSfamily = OS X');
			console.log('|minOS    = ');
			console.log('|minCPU   = ');
			console.log('|minRAM   = ');
			console.log('|minHD    = ');
			console.log('|minGPU   = ');
			console.log('|minGPU2  = ');
			console.log('|minVRAM  = ');
			console.log('|minDX    = ');
			console.log('|recOS    = ');
			console.log('|recCPU   = ');
			console.log('|recRAM   = ');
			console.log('|recHD    = ');
			console.log('|recGPU   = ');
			console.log('|recGPU2  = ');
			console.log('|recVRAM  = ');
			console.log('|recDX    = ');
			console.log('|notes    = {{ii}}', body_parsed[parameters["appid"]].data.mac_requirements.minimum);
		}
		if (body_parsed[parameters["appid"]].data.platforms["linux"] === true) {
			console.log('|OSfamily = Linux');
			console.log('|minOS    = ');
			console.log('|minCPU   = ');
			console.log('|minRAM   = ');
			console.log('|minHD    = ');
			console.log('|minGPU   = ');
			console.log('|minGPU2  = ');
			console.log('|minVRAM  = ');
			console.log('|minDX    = ');
			console.log('|recOS    = ');
			console.log('|recCPU   = ');
			console.log('|recRAM   = ');
			console.log('|recHD    = ');
			console.log('|recGPU   = ');
			console.log('|recGPU2  = ');
			console.log('|recVRAM  = ');
			console.log('|recDX    = ');
			console.log('|notes    = {{ii}}', body_parsed[parameters["appid"]].data.linux_requirements.minimum);
		}
		console.log('}}');
		console.log('');
	} else {
		console.error('Error occured while data receiving:', error);
		console.log('Non-OK HTTP status code received:', response && response.statusCode);
	}
});
