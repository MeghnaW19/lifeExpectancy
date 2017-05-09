/*eslint-disable*/
module.exports = function convert(startYear)
{
	if(isNaN(startYear)){
		throw new "Not a number";
	}
	else{
	const readline=require("readline");
	const fs=require("fs");

var i=0;
var data=[];
var a=[];

const rl=readline.createInterface({
	input: fs.createReadStream("../inputdata/final.csv")
});
rl.on("line",(line)=>{
	
	if(i==0){

		var cleanedLine =line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
		
		var cleanedLine=line.split(",");
		data=cleanedLine;
		ageGroup=data.indexOf("Age-group");
		literatePersons=data.indexOf("Literate - Persons");
		areaName=data.indexOf("Area Name");
		i++;
	}
	data=line.split(",");

	//if(data[ageGroup])

	a.push({"Age_Group":data[ageGroup],"Literate_Persons":data[literatePersons],"Area_Name":data[areaName]});

	record=JSON.stringify(a);

	fs.writeFile("../outputdata/indiaCensusCharu.json",record);
	console.log(record);
});

rl.on("close",(line)=>{
	console.log("file closed");

});
return "JSON written successfully";
}
};