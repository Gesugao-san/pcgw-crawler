
const fs = require('fs');

const allFileContents = fs.readFileSync('./input.txt', 'utf-8');
allFileContents.split(/\r?\n/).forEach(line => {
	console.log(`console.log('${line}');`);
});
