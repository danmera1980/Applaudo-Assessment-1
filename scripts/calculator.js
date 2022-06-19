let salary = document.querySelector('#salary');
let years = document.querySelector('#years');
let days = document.querySelector('#days');
let bonus = document.querySelector('#bonus');
let calculate = document.querySelector('#calculate');

calculate.addEventListener('click', function (e) {
    e.preventDefault();
    let result;
    let daysSalary = parseInt(salary.value)/30
    if(years.value < 1){
        result = (parseInt(days.value) * daysSalary * 15)/365;
    } else if(years.value < 3){
        result = (daysSalary * 15);
    } else if(years.value < 10){
        result = (daysSalary * 19);
    } else {
        result = (daysSalary * 21);
    }
    bonus.innerHTML = '$' + result.toFixed(2);
});