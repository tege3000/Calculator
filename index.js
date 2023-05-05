const numbers = document.querySelectorAll(".secondary");
const resultValue = document.querySelector(".result");
const operators = document.querySelectorAll(".operator");

let numbersArr = [];
let operatorsArr = [];
let display = "";


function add (a, b) {
    return a+b;
}

function subtract(a, b) {
    return a-b;
}

function multiply(a, b) {
    return a*b;
}

function divide(a, b) {
    return a/b;
}


// const firstNumber, secondNumber, operator;

function operate(operator, firstNumber, secondNumber) {
    if(operator == '+') {
        return add(firstNumber, secondNumber);
    }

    if(operator == '-') {
        return subtract(firstNumber, secondNumber);
    }

    if(operator == 'x') {
        return multiply(firstNumber, secondNumber);
    }

    if(operator == '/') {
        if(secondNumber == 0) {
            alert("Division by 0 is not allowed");
            return;
        }
        return divide(firstNumber, secondNumber);
    }
}

function clearArrayStorage() {
    numbersArr = [];
    operatorsArr = [];
}

// checks if numbersArr has an initial value. 
// Note: 0 is a valid value too
function doesNumberArrHaveAnInitialValue() {
    if(numbersArr[0] || numbersArr[0] == 0) {
        numbersArr.push(Number(resultValue.textContent)); 
    }
    else {
        numbersArr[0] = Number(resultValue.textContent);
    }
}

function compute(nextOp) {
    /**
     * Basic Operators: +, - , /, x, =
     */
    if(nextOp == '+' || nextOp == '-' || nextOp == '/' || nextOp == 'x') {
        resultValue.textContent = operate(operatorsArr[0], numbersArr[0], numbersArr[1]);
        clearArrayStorage();

        numbersArr[0] = Number(resultValue.textContent); // resets the current value as the new first number
        operatorsArr[0] = nextOp; //resets the first op to the nextOp from the previous iteration
    }
    
    if(nextOp == '='){
        resultValue.textContent = operate(operatorsArr[0], numbersArr[0], numbersArr[1]);
        clearArrayStorage();
    }

    /**
     * Other Operators; +/-, %, and C
     */

    if(operatorsArr[0] == '+/-' || nextOp == '+/-') {
        resultValue.textContent = (-1*Number(resultValue.textContent)).toString();
        clearArrayStorage();
    }

    if(operatorsArr[0] == '%' || nextOp == '%') {
        resultValue.textContent = (Number(resultValue.textContent)/100).toString();
        clearArrayStorage();
    }

    if(operatorsArr[0] == 'AC' || nextOp == 'AC') {
        resultValue.textContent = "";
        clearArrayStorage();
    }
}


//displays the results on the calculator screen
function displayResults() {
    if(this.textContent == ".") {
        if(!resultValue.textContent.includes('.') && this.textContent == ".") {
            display  += this.textContent; 
            resultValue.textContent = display; 
        }
    }
    else {
        display  += this.textContent; 
        resultValue.textContent = display; 
    }
}

//Handles number click
numbers.forEach((number) => { 
    number.addEventListener("click", displayResults)
})


// Handles Operator click
operators.forEach((operator) => {
    operator.addEventListener("click", (e) => {

        operatorsArr.push(operator.textContent);
        doesNumberArrHaveAnInitialValue();
        const nextOp = operatorsArr[1];

        compute(nextOp);
        display = "";
    })
})


