
module.exports = function add(num1, num2) {
if(typeof num1 !== 'number' || typeof num2 !== 'number') {
     throw Error('Incorrect parameters');
 }
	return num1 + num2;
};

