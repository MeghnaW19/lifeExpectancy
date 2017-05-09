module.exports = function convert(startYear)
{
  if(isNaN(startYear))
{
        throw new Error('Not a number');
}
else
{
const readline = require('readline');
const fs = require('fs');
let data = [];
let i = 0;
let a = [];
let ageGroup = 0;
let literatePerson = 0;
let cleanedLine = [];
                        let rl = readline.createInterface({
                        input: fs.createReadStream('../inputdata/final.csv')
                                                  });
rl.on('line', (line) => {
        cleanedLine = line.split(',');
        if(i === 0)
				{
            cleanedLine = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
            data = cleanedLine;
            ageGroup = data.indexOf('Age-group');
            literatePerson = data.indexOf('Literate - Persons');
            i = i + 1;
				}
 data = line.split(',');

    a.push({agegroup: data[ageGroup], literateperson: data[literatePerson]});
});
rl.on('close', (line) => {
  cleanedLine = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  fs.writeFile('../outputdata/ic.json', JSON.stringify(a));
});
return 'JSON written successfully';
}
}
;
