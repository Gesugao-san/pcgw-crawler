
const request = require('request');
const querystring = require('querystring');
const fs = require('fs');
const path = require('path');

const parameters = {
	appid: 10, // 1162700, 730, 10
	l: 'en'
};

//lastGameachePath = path.basename('./output/' + parameters["appid"] + '.json');
//const get_request_args = querystring.stringify(parameters);

const req_options = {
	uri: 'http://store.steampowered.com/api/appdetails/?appids=' + parameters["appid"] + '&l=en',
	port: 80,
	method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8'
    }
};

console.log('Data receiving (AppID: ' + parameters["appid"] + ')...');
request(req_options, function(error, response, body) {
	if (!error && response.statusCode == 200) {
		body_parsed = JSON.parse(body);
		console.log('Data received:', body_parsed);
		console.log('Data saving...');
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
		console.log('|release dates= ');
		console.log('{{Infobox game/row/date|Steam|' + body_parsed[parameters["appid"]].data.release_date["date"] + '}}');
		console.log('|reception    = ');
		if (!typeof body_parsed[parameters["appid"]].data.metacritic in ['undefined', null]) {
			console.log('{{Infobox game/row/reception|Metacritic|' +
				body_parsed[parameters["appid"]].data.metacritic.url.replace(/\/|\?|\&/g, ' ').split(' ')[5] + '|' +
				body_parsed[parameters["appid"]].data.metacritic.score + '}}');
		} else {
			console.log('{{}}');
		};
		console.log('|taxonomy     = ');
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
		if (!typeof body_parsed[parameters["appid"]].data.demos in ['undefined', null]) {
			console.log('{{ii}} A demo is available from {{store link|Steam|' + body_parsed[parameters["appid"]].data.demos + '}}.');
		};
		console.log('');
		console.log('');
	} else {
		console.error('Error occured while data receiving:', error);
		console.log('Non-OK HTTP status code received:', response && response.statusCode);
	}
});
