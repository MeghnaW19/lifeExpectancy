/* Importing Modules*/
let log4js = require('log4js');
const readline = require('readline');
const fs = require('fs');
let logger = log4js.getLogger();

/*  functions to validate start year*/
let convert = function convert(startYear)
{
	if (typeof startYear === 'string')
	{
		return '';
	}

	if (typeof startYear !== 'number' || isNaN(startYear))
	{
		throw new Error('Not a number');
	}

	/* Creating readstream */
	const rl = readline.createInterface({
				input: fs.createReadStream('../inputdata/final.csv')
				});
	const countryCodes = ['KHM', 'BTN', 'MYS', 'DEU', 'AGO'];
	const indicators = ['SP.DYN.LE00.FE.IN', 'SP.DYN.LE00.MA.IN'];
	/* Variable decleration */
	let obj = {};
	/*  functions to read input data line by line */
	rl.on('line', (line) =>
	{
		/*	To clean junk data*/
		let cleanedLine = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
		// logger.debug(cleanedLine);

		countryCodes.forEach((countryCode)=>{
			if(countryCode === cleanedLine[1]) {
				if(!obj[cleanedLine[4]]) {
					obj[cleanedLine[4]] = {
						total: {
							female: 0,
							male: 0
						}
					};
				}
				if(!obj[cleanedLine[4]][cleanedLine[0]]) {
					obj[cleanedLine[4]][cleanedLine[0]] = {};
				}
				indicators.forEach((indicator)=>{
					if(indicator === cleanedLine[3]) {
						if(indicator.split('.')[3] === 'FE') {
							// Country specific data
							obj[cleanedLine[4]][cleanedLine[0]]['Female'] = cleanedLine[5];
							// adding to total
							obj[cleanedLine[4]].total.female =
							obj[cleanedLine[4]].total.female + parseInt(cleanedLine[5], 10);
						} else {
							obj[cleanedLine[4]][cleanedLine[0]]['Male'] = cleanedLine[5];
							obj[cleanedLine[4]].total.male =
							obj[cleanedLine[4]].total.male + parseInt(cleanedLine[5], 10);
						}
					}
				});
			}
		});
	});

	rl.on('close', () =>
	{
	/* Creating the JSON* */
	fs.writeFile('../outputdata/outputlifeExpectancyMeghna.json', JSON.stringify(obj));
	});

	return 'JSON written successfully';
};

		// convert(2011);
module.exports = convert;
