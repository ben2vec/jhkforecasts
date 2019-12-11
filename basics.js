//ARRAYS

array = ['Jack','Hudson','Kersting']
console.log(array)
// prints array
console.log(array[1])
// prints 2nd term
array.shift()
console.log(array)
// takes away first term
array.unshift('Jack')
console.log(array)
// inserts term into front
array.pop()
console.log(array)
// takes out last term
array.push('Kersting')
console.log(array)
// adds term to end


//LOOPS

for (let counter = 5; counter < 11; counter++) {
    console.log(counter);
  }
// should print 5,6,7,8,9,10


let countString = '';
let i = 0;
do {
  countString = countString + i;
  i++;
} while (i < 5);
console.log(countString);
//should print 01234 string


for (let counterOne = 1; counterOne < 4; counterOne++){
    console.log(counterOne);
  }
// A for loop that prints 1, 2, and 3

let counterTwo = 1;
  while (counterTwo < 4) {
    console.log(counterTwo);
    counterTwo++;
  }
// A while loop that prints 1, 2, and 3

const myArray = [6, 19, 20, 81,81];
const yourArray = [19, 81, 2];
for (let i = 0; i < myArray.length; i++) {
  for (let j = 0; j < yourArray.length; j++) {
    if (myArray[i] === yourArray[j]) {
      console.log(myArray[i])
    }
  }
};
// prints duplicate vaules

const animal = 'cat';

for (let i = 0; i < animal.length; i++) {
  console.log(animal[i]);
  for (let j = 1; j < 4; j++) {
    console.log(j);
  }
}
//every time the outer loop runs, the inner loop completes all iterations.