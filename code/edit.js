/*
	edit.js

	MediaWiki API Demos
	Demo of `Login` module: Sending post request to login
	https://www.mediawiki.org/wiki/API:Login#JavaScript
	https://github.com/wikimedia/mediawiki-api-demos/blob/master/javascript/edit.js

	MIT license
*/

var request = require( 'request' ).defaults( { jar: true } ),
	//url = 'https://test.wikipedia.org/w/api.php';
	url = 'https://www.pcgamingwiki.com/w/api.php';

// Step 1: GET request to fetch login token
function getLoginToken() {
	var params = {
		action: 'query',
		meta: 'tokens',
		type: 'login',
		format: 'json'
	};

	console.log("Starting program.");
	console.log("Getting new login token...");
	request.get( { url: url, qs: params }, function ( error, res, body ) {
		var data, logintoken;
		if ( error ) {
			console.log(error);
			return;
		}
		data = JSON.parse( body );
		logintoken = data.query.tokens.logintoken;
		data.query.tokens.logintoken = "[CENSORED]";
		console.log(JSON.stringify(data));
		loginRequest( logintoken );
	} );
}

// Step 2: POST request to log in.
// Use of main account for login is not
// supported. Obtain credentials via Special:BotPasswords
// (https://www.mediawiki.org/wiki/Special:BotPasswords) for lgname & lgpassword
// https://www.pcgamingwiki.com/wiki/Special:BotPasswords
function loginRequest(login_token) {
    var params_1 = {
        action: "login",
        lgname: "bot_username",
        lgpassword: "bot_password",
        lgtoken: login_token,
        format: "json"
    };

    console.log("Making login request...");
    request.post({ url: url, form: params_1 }, function (error, res, body) {
        if (error) {
            console.log(error);
            return;
        }
        getCsrfToken();
    });
}

// Step 3: GET request to fetch CSRF token
function getCsrfToken() {
    var params_2 = {
        action: "query",
        meta: "tokens",
        format: "json"
    };

    console.log("Getting new CSRF token for edits...");
    request.get({ url: url, qs: params_2 }, function(error, res, body) {
        if (error) {
            console.log(error);
            return;
        }
        var data = JSON.parse(body);
        editRequest(data.query.tokens.csrftoken);
    });
}

// Step 4: POST request to edit a page
function editRequest(csrf_token) {
    var params_3 = {
        action: "edit",
        title: "Sandbox",
        appendtext: "\n<br>This is test text added by bot a bot in automatic mode, yey.",
        summary: "Edited by a bot in automatic mode.",
        bot: true,
        token: csrf_token,
        format: "json"
    };

    console.log("Making edit request...");
    request.post({ url: url, form: params_3 }, function (error, res, body) {
        if (error) {
            console.log(error);
            return;
        }
    });
    console.log("Ending program.");
}

// Start From Step 1
getLoginToken();
