let log4js = require('log4js');
let logger = log4js.getLogger();
module.exports = function convert(startYear)
{
	if(isNaN(startYear))
	{
		throw new Error('Not a number');
	}
	else
	{
		// var csv = require('fast-csv');
		let readLine = require('readline');
		let fs = require('fs');
		const col1 = 'sugars_100g';
		const col2 = 'salt_100g';
		const col3 = 'countries';

		let arr = [];
		let i = 0;
		let idx1 = null;
		let idx2 = null;
		let idx3 = null;
		// var keyLine = null;


		let readStream = fs.createReadStream('../inputdata/foodFacts.csv');

		let lineReader = readLine.createInterface({
		input: readStream
		});


		lineReader.on('line', function(line)
		{
			if(i === 0)
			{
				let cleanedLine = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
				cleanedLine = line.split(',');
				let data = cleanedLine;
				// keyLine = keyLine || data;
				idx1 = data.indexOf(col1);
				idx2 = data.indexOf(col2);
				idx3 = data.indexOf(col3);
				// var c = data[0];

				i = +1;
			}

			else
			{
				let data = line.split(',');
				arr.push({country: data[idx3], sugarAndSaltConsumptions: data[idx1] + data[idx2]});
				let record = JSON.stringify(arr);
				fs.writeFile('../outputdata/foodFactsRandeep.json', record);
				logger.debug(record);
			}
		});

		lineReader.on('close', ()=>{
			logger.debug('File closed');
		});


		return 'JSON written successfully';
	}
};


