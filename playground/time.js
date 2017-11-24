let moment = require('moment');

//jan 1 1970 00:00 am
//javascript is stored in millisecond
// moment

//let date = new Date();
//let months =['Jan', 'Feb']

//let date = moment();
//date.add(1, 'years');
//date.add(10, 'years').subtract(9, 'months');
//console.log(date.format('MMM Do, YYYY'));

let time = moment();
console.log(time.format('h:mm a'));

let createAt = 111234;
let date = moment(createAt);
console.log(date.format('h:mm a')); 

//new Date().getTime();
let someTimeStamp = moment().valueOf();
console.log(someTimeStamp);