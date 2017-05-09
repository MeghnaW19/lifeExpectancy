let fs = require('fs');
let country = ['Netherlands', 'Canada', 'United Kingdom',
'United States', 'Australia', 'France', 'Germany', 'Spain', 'South Africa'];
let data = [];
let final = [];
let sugarindex = 0;
let saltindex = 0;
let countryindex = 0;
let countryv = 0;
let sugar = 0;
let salt = 0;
let i = 0;
const sugarv = Array(9).fill(0);
const saltv = Array(9).fill(0);
module.exports = function convert(startYear)
{
  if(typeof startYear === 'string')
  {
    return;
  }
  if(typeof startYear !== 'number' || isNaN(startYear))
 {
       throw new Error('Not a number');
 }
const ln = require('readline').createInterface({
 input: fs.createReadStream('../inputdata/FoodFacts.csv')
});
ln.on('line', function (line) {
data = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
while(i < 1)
 {
   countryindex = data.indexOf('countries_en');
   sugarindex = data.indexOf('sugars_100g');
   saltindex = data.indexOf('salt_100g');
   i = i + 1;
 }
countryv = data[countryindex];
sugar = data[sugarindex];
salt = data[saltindex];
  if(salt === '') {
    salt = 0;
  }
    if(sugar === '') {
      sugar = 0;
}
let index = country.indexOf(countryv);
    if(index !== -1)
    {
     sugarv [index] = sugarv[index] + parseFloat(sugar);
     saltv [index] = saltv[index] + parseFloat(salt);
   }
});
ln.on('close', function() {
 for(let h = 0; h < country.length; h = h + 1) {
   final.push({Country: country[h],
   Sugar: sugarv[h],
   Salt: saltv[h]
});}
fs.writeFile('chart1.json', JSON.stringify(final));
});
};
