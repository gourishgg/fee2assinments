// function g2() {
//     console.log("g2");
// }
// g2();
// const sum=function(a,b){return a+b};
// console.log(sum(5, 3));
// const sum = (a, b) => a + b;//there is no this keyword in arrow function, so it is not suitable for object methods or constructors. Arrow functions are best suited for short, single-purpose functions.
// //there is no arguments object in arrow functions, so they cannot access the arguments passed to them. Arrow functions are not suitable for use as methods in classes or objects, as they do not have their own this context. Arrow functions cannot be used as constructors and will throw an error if used with the new keyword. Arrow functions are not suitable for use with the yield keyword, as they do not have their own this context and cannot be used as generators.
// console.log(sum(5, 3));
// function sum() {
//     console.log(arguments);
//     return arguments[0] + arguments[1];
// }
// console.log(sum(5, 3));
// const s = (...numbers) => console.log(numbers);//rest parameter syntax allows us to represent an indefinite number of arguments as an array.
// s(5, 3);
//node filename.js
// a=[1,2,3,4,5,6,7,8,9,10];
// console.log(a);
// b=[...a,89,90];
// console.log(b);
// var d=new Array(5);
// console.log(d);
// console.log(d.includes(5));
// inner function access outer function variables is called lexical scoping
//closure is a function that has access to its own scope, the outer function's scope, and the global scope. A closure is created when a function is defined inside another function, allowing the inner function to access variables from the outer function even after the outer function has finished executing.
//closure
// function outer() {
//     var a=5;
//     return function inner(){
//         a++;
//         console.log(a);
//     }
   
// }
// const fun=outer();
// fun();
// fun();
// fun();
// IIFE (Immediately Invoked Function Expression)
// (function() {
//     console.log("IIFE");
// })();
// var a = [1, 2, 3, 4, 5];
// var b = a.map((x) => x * 2);
// console.log(b);

// var c = a.filter((x) => x > 2);
// console.log(c);
// a={name:"John",age:30};
// const b=new Object();
// b.name="John";
// b.age=30;
// console.log(object.keys(b));
// Object.keys(b).forEach((key) => {
//     console.log(b[key]);
// });
// console.log(Object.entries(b));
// console.log(Object.values(b));
// console.log(b.address?.city); //optional chaining operator
// console.log(b);