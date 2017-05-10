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

	/* Variable decleration */
	let arr = [];
	let obj = {};
	/*  functions to read input data line by line */
	rl.on('line', (line) =>
	{
		/*	To clean junk data*/
		let cleanedLine = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
		// logger.debug(cleanedLine);
		if (cleanedLine[1] === 'KHM' || cleanedLine[1] === 'AGO' ||
			cleanedLine[1] === 'DEU' || cleanedLine[1] === 'MYS' || cleanedLine[1] === 'BTN')
		{
			if (cleanedLine[3] === 'SP.DYN.LE00.FE.IN')
			{
				obj['CountryName'] = cleanedLine[0];
				obj['Female'] = cleanedLine[5];
				obj['Year'] = cleanedLine[4];
			}
			if (cleanedLine[3] === 'SP.DYN.LE00.MA.IN')
			{
				obj['Male'] = cleanedLine[5];
				arr.push(obj);
			}
		}
	});

	rl.on('close', () =>
	{
	/* Creating the JSON* */
	logger.debug(JSON.stringify(arr, null, 4));
	fs.writeFile('../outputdata/outputlifeExpectancyMeghna.json', JSON.stringify(arr, null, 4));
	});

	return 'JSON written successfully';
};

//	convert(2011);
module.exports = convert;
