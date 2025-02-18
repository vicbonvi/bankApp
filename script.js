'use strict';

/// //////////////////////////////////////////////
/// //////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = '';
  movements.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">
          ${i + 1} ${type}
        </div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;
    // containerMovements.innerHTML += html;  es más sensato usar el insertAdjacentHTML
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

displayMovements(account1.movements);
calcDisplayBalance(account1);
// función que inserta un campo nuevo llamado username que tenga las iniciales
const createUserNames = function (accounts) {
  accounts.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(palabra => palabra[0])
      .join('');
  });
};
createUserNames(accounts);
console.log(accounts);

// función de calcular y mostrar balance de cuenta
function calcDisplayBalance(acc) {
  acc.balance = acc.movements.reduce((acc, curval) => acc + curval, 0);
  labelBalance.textContent = `${acc.balance}€`;
}

// ejercicios y movidas 29/03
const deposits = account1.movements.filter(mov => mov > 0);
console.log(account1.movements);
console.log(deposits);

const totaldeposit2 = [2, 4, 6].reduce(
  (acc, curVal, i, arr) => acc + curVal,
  0
);
console.log(totaldeposit2, 'con reduce');

const totaldeposit3 = [2, 4, 6].reduce(
  (acc, curVal, i, arr) => (curVal > acc ? curVal : acc),
  Number.NEGATIVE_INFINITY
);
console.log(totaldeposit3, 'con reduce saco el valor máximo');

/*
objeto con max y min
origen: [2, 6, -10, 8, 30, 2]
*/
const minMaxNumeros = [2, 6, -10, 8, 30, 2];

// con spread operator
const minMaxSpread = {
  min: Math.min(...minMaxNumeros),
  max: Math.max(...minMaxNumeros),
};

// con reduce
const minMaxReduce = minMaxNumeros.reduce(
  (acc, cur) => ({
    min: Math.min(acc.min, cur),
    max: Math.max(acc.min, cur),
  }),
  {
    min: Number.NEGATIVE_INFINITY,
    max: Number.POSITIVE_INFINITY,
  }
);
// MAP, FILTER, REDUCE

const numeros = [1, 2, 4, 6];

const dobles = numeros.map(item => item * 2);

const dobles2 = [];
dobles2.forEach(item => {
  dobles2.push(item);
});

// funcion que recibe movimientos y los devuelve en otra moneda

const eurToUSD = 1.09;

const movementsUSD = account1.movements.map(mov => {
  return mov * eurToUSD;
});
console.log(account1.movements);
console.log(movementsUSD);
