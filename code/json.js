
// ..\pcgw-crawler> node ".\code\json.js"
//https://stackoverflow.com/a/10011078/8175291
var fs = require('fs');
var obj = JSON.parse(fs.readFileSync('./config/input.json', 'utf8'));

console.log(obj['Steam']);
