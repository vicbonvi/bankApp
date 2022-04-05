'use strict';
/// //////////////////////////////////////////////
/// //////////////////////////////////////////////
// BANKIST APP
// Data
const cargasPagina = window.localStorage.getItem('cargasPagina') || 0;
window.localStorage.setItem('cargasPagina', Number(cargasPagina) + 1);

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

// global variables
let currentAccount;
let timer;
let sortOrder = 'afterbegin';

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
    // containerMovements.innerHTML += html;
    containerMovements.insertAdjacentHTML(sortOrder, html);
  });
};
/* función que inserta un campo nuevo en lo  accounts, llamado username que tenga las iniciales
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  username: js
};
*/
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
function calcDisplayBalance(acc) {
  acc.balance = acc.movements.reduce((acc, curval) => acc + curval, 0);
  labelBalance.textContent = `${acc.balance}€`;
}
displayMovements(account1.movements);
calcDisplayBalance(account1);

function displaySummary(acc) {
  //  calcular y mostrar depositos
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur, i, arr) => acc + cur, 0);
  labelSumIn.textContent = `${Math.abs(incomes)}€`;
  // calcular y mostrar retiradas de dinero
  const outcomes = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, cur, i, arr) => acc + cur, 0);
  labelSumOut.textContent = `${Math.abs(outcomes)}€`;
  // calcular y mostrar intereses

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(interest => interest > 1)
    .reduce((acc, cur) => acc + cur, 0);

  labelSumInterest.textContent = interest.toFixed(2) + '€';
}

const updateUI = function () {
  clearInterval(timer);
  startLogOutTimer();
  displayMovements(currentAccount.movements);
  calcDisplayBalance(currentAccount);
  displaySummary(currentAccount);
};

btnLogin.addEventListener('click', function (e) {
  console.log('me han pulsado');
  e.preventDefault();
  // obtener la cuenta que me interesa
  const username = inputLoginUsername.value;
  const pin = Number(inputLoginPin.value);
  const currentAccount = accounts.find(acc => acc.username === username);
  if (currentAccount && currentAccount.pin === pin) {
    updateUI();
    labelWelcome.textContent = `Bienvenido ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 1;
    inputLoginUsername.value = '';
    inputLoginPin.value = '';
    // quitar foco si lo tiene:
    inputLoginPin.blur();
  } else {
    console.log('pin incorrecto o usuario desconocido');
  }
});

const logout = function () {
  currentAccount = null;
  containerApp.style.opacity = 1;
  labelWelcome.textContent = `Log in to get started`;
};

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  sortOrder = sortOrder === 'afterbegin' ? 'beforeend' : 'afterbegin';
  updateUI();
});

btnTransfer.addEventListener('click', function (e) {
  console.log('solicitada transferencia');
  e.preventDefault();
  // comprobar las variables que necesito
  const destinyUsername = inputTransferTo.value;
  const amount = Number(inputTransferAmount.value);
  console.log(amount, destinyUsername);
  const destinyAccount = accounts.find(acc => acc.username === destinyUsername);
  //  condiciones para transferir
  /* valor positivo, usuario destino existente
  balance actual >= transferencia
  usuario destino != usuario actual */

  if (
    amount > 0 &&
    destinyAccount &&
    currentAccount.balance >= amount &&
    destinyAccount.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    destinyAccount.movements.push(amount);
    updateUI();
  } else {
    console.log('error en transferencia');
  }
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  console.log(
    `cerrar cuenta de ${currentAccount.username} con pin ${currentAccount.pin}`
  );
  const user = inputCloseUsername.value;
  const pin = Number(inputClosePin.value);
  if (user === currentAccount.username && pin === currentAccount.pin) {
    const index = accounts.findIndex(acc => acc.username === user);
    console.log(`elemento a eliminar ${index}`, accounts[index]);
    accounts.splice(index, 1);
    console.log(accounts);
    inputCloseUsername.value = inputClosePin.value = '';
    containerApp.style.opacity = 0;
  } else {
    console.log('No se puede eliminar la cuenta');
  }
});
// temporal login

currentAccount = account1;
updateUI();
containerApp.style.opacity = 1;

/* 
  vamos a necesitar para los prestamos
  método some o every (parecidos al find, pero permiten evaluar condiciones)
  una constante que sea el valor a evaluar (el 10% del importe del prestamo solicitado)
  
*/
btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  console.log('Préstamo solicitado');
  const amount = Number(inputLoanAmount.value);
  const minDepositRequired = amount * 0.1;
  if (
    amount > 0 &&
    currentAccount.movements.some(mov => mov > minDepositRequired)
  ) {
    currentAccount.movements.push(amount);
    console.log('Préstamo concedido');
    updateUI();
  } else {
    console.log('Préstamo denegado');
  }
  inputLoanAmount.value = '';
  inputLoanAmount.blur();
});

//  prueba sacar el balance total del banco
//
// const globalBankBalance = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, cur) => acc + cur, 0);
// console.log(globalBankBalance);

// timer

function startLogOutTimer() {
  let time = 300;
  const printTime = () => {
    const min = Math.trunc(time / 60);
    const sec = String(time % 60).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;
  };
  printTime(time);
  timer = setInterval(() => {
    time -= 1;
    if (time === 0) {
      clearInterval(timer);
      logout();
    }
    printTime(time);
  }, 1000);
}
