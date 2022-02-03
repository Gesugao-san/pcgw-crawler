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

	request.get( { url: url, qs: params }, function ( error, res, body ) {
		var data;
		if ( error ) {
			return;
		}
		data = JSON.parse( body );
		loginRequest( data.query.tokens.logintoken );
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

    request.post({ url: url, form: params_1 }, function (error, res, body) {
        if (error) {
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

    request.get({ url: url, qs: params_2 }, function(error, res, body) {
        if (error) {
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
        appendtext: "test edit",
        token: csrf_token,
        format: "json"
    };

    request.post({ url: url, form: params_3 }, function (error, res, body) {
        if (error) {
            return;
        }
        console.log(body);
    });
}

// Start From Step 1
getLoginToken();
