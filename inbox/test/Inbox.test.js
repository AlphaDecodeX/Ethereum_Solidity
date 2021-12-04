// contract test code will go here

const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());

// class Car {
//     park() {
//         return 'Stopped';
//     }
//     drive() {
//         return 'vroom';
//     }
// }

// let car;

// beforeEach(() => {
//     car = new Car();
// })

// describe('Car Class', () => {
//     it('can park', () => {
//         assert.equal(car.park(), 'Stopped');
//     });

//     it('can drive', () => {
//         assert.equal(car.drive(), 'vroom');
//     })
// });