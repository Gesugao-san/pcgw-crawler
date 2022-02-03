/*
    tokens.js
    MediaWiki API Demos
    Demo of `Token` module: Fetch token of type `login`
    https://www.mediawiki.org/wiki/API:Tokens#JavaScript
    MIT License
*/

var request = require('request'),
    url = "https://www.mediawiki.org/w/api.php";

var params = {
    action: "query",
    meta: "tokens",
    type: "login", // createaccount, csrf, deleteglobalaccount, login, patrol, rollback, setglobalaccountstatus, userrights, watch
    format: "json"
};

request.get( { url: url, qs: params }, function( error, response, body ){
    body = JSON.parse( body );
    console.log( body.query.tokens.logintoken );
});
