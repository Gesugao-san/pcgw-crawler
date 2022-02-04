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

function checkToken(_type, _token) {
	var params_0 = {
		action: "checktoken",
		type: _type,
		token: _token,
		format: "json"
	};

	console.log("Checking token (" + _type + ")...");
	request.get({ url: url, qs: params_0 }, function(error, res, body) {
		if (error) {
			console.log(error);
			return;
		}
		console.log(JSON.parse(body));
		return;
	});
}

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
		checkToken("login", logintoken);
		loginRequest(logintoken);
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
        lgname: "username@botname",
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
        data = JSON.parse(body);
        console.log(JSON.stringify(data));
        if (data.login.result != "Success") { // "Failed"
            console.log("Credentials incorrect, errors possible!"); // "Logging error (check credentials), aborting!"
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
        checkToken("csrf", data.query.tokens.csrftoken);
        editRequest(data.query.tokens.csrftoken);
    });
}

// Step 4: POST request to edit a page
function editRequest(csrf_token) {
    var params_3 = {
        action: "edit",
        title: "User:Gesugao-san",
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
    console.log("Ending program."); // logoutRequest(login_token);
}

// Step 5: POST request to log out.
function logoutRequest(login_token) {
    var params_4 = {
        action: "logout",
        token: login_token,
        format: "json"
    };

    console.log("Making logout request...");
    request.post({ url: url, form: params_4 }, function (error, res, body) {
        if (error) {
            console.log(error);
            return;
        }
        console.log(JSON.stringify(JSON.parse(body)));
        console.log("Ending program.");
    });
}


// Start From Step 1
getLoginToken();
