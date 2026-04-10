const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calcBtn = document.getElementById('calculate-wealth');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    // .then( res => res.json())
    // .then( data => );
    const data = await res.json();

    const user = data.results[0];

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }

    addData(newUser);
}

// Double the wealth
function doubleWealth(){
    data = data.map(item =>{
        return {name: item.name, money: item.money * 2 };
    });

    updateDOM();
}

// Sort people by richest
function sortByWealth(){
    data.sort((a,b) => b.money - a.money);
    updateDOM();
}

// Show only milionaires - filter
function showMillionaires(){
    data = data.filter(item => 
        item.money > 1000000 );
    updateDOM();
}

// Calculate entire wealth
function calculateWealth(){
    // let total = 0;
    // data.forEach( item => total += item.money);
    // console.log(total);
    // const user = {
    //     name: 'TOTAL',
    //     money: total
    // };
    // addData(user);
    const totalWealth = data.reduce((total,item) => (total += item.money), 0);
    const wealthEl = document.createElement('div');
    wealthEl.innerHTML = `<h3>Total wealth: <strong> ${formatMoney(totalWealth)}</strong> </h3>`;
    main.appendChild(wealthEl);
}

// Add new obj to data array
function addData(obj){
    data.push(obj);
    updateDOM();
}


// Update DOM
function updateDOM(providedData = data){
    // Clear main div
    main.innerHTML = '<h2><strong>Person</strong>Wealth</h2>';

    providedData.forEach(item  => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    })
}

// Format number as money
function formatMoney(number){
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//Event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleWealth);
sortBtn.addEventListener('click', sortByWealth);
showBtn.addEventListener('click', showMillionaires);
calcBtn.addEventListener('click', calculateWealth);