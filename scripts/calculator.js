let salary = document.querySelector('#salary');
let years = document.querySelector('#years');
let days = document.querySelector('#days');
let bonus = document.querySelector('#bonus');
let calculate = document.querySelector('#calculate');

calculate.addEventListener('click', function (e) {
    e.preventDefault();
    let result = salary.value * years.value * days.value;
    bonus.innerHTML = "$"+result;
    console.log(result);
});