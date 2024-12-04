let displayNumber = "0";
let firstNumber;
let secondNumber;
let operator;
let firstNumberDecimal = false;
let secondNumberDecimal = false;
const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operation")
display.innerText = displayNumber;

function add (firstNumber, secondNumber) {
    return parseFloat(firstNumber) + parseFloat(secondNumber);
}

function subtract (firstNumber, secondNumber) {
    return parseFloat(firstNumber) - parseFloat(secondNumber);
}

function divide (firstNumber, secondNumber) {
    return parseFloat(firstNumber) / parseFloat(secondNumber);
}

function multiply (firstNumber, secondNumber) {
    return parseFloat(firstNumber) * parseFloat(secondNumber);
}

function percentage (displayNumber) {
    return (parseFloat(displayNumber) / 100);
}

function operate (firstNumber, secondNumber, operator) {
    if(operator === "+") {
        return add(firstNumber, secondNumber);
    }
    if(operator === "-") {
        return subtract(firstNumber, secondNumber);
    }
    if(operator === "*") {
        return multiply(firstNumber, secondNumber);
    }
    if(operator === "/") {
        return divide(firstNumber, secondNumber);
    }
    if(operator === "%"){
        return percentage(firstNumber);
    }
}

function updateDisplay() {

    if(displayNumber.length > 11) {
        display.innerText = displayNumber.substring(0, 11);
    } else {
        display.innerText = displayNumber
    }
}

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        setNumber(button.value)
    });
})

function setNumber(value) {
    // Sets the first number and only sets second once an operator has been picked
    if(operator) {
        if(secondNumber) {
            displayNumber += value;
            secondNumber += value;
            updateDisplay();
        } else {
            displayNumber = value;
            secondNumber = value;
            updateDisplay();
        }
    } else {
        if(firstNumber) {
            displayNumber += value;
            firstNumber += value;
            updateDisplay();
        } else {
            displayNumber = value;
            firstNumber = value;
            updateDisplay();
        }
    }
}

buttons.forEach((button) => {
    button.innerText = button.value;
    button.addEventListener('mouseover', (event) => {
        event.target.style.opacity = 0.5;  
    });
    button.addEventListener('mouseleave', (event) => {
        event.target.style.opacity = 1;  
    });
})

operatorButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if(button.value === "=" && firstNumber && secondNumber && operator) {
            equals();
        } 
        else if(button.value === "AC") {
            clear();
        }
        else if (button.value === "+/-"){
            positiveNegative();
        }
        else if (button.value === "%") {
            if(firstNumber && secondNumber) {
                equals()
            }
            const result = operate(displayNumber, 0, "%");
            displayNumber = result;
            updateDisplay()
        }
        else if(button.value === ".") {
            addDecimal();
            updateDisplay();
        }
        else if (firstNumber && secondNumber && operator !== ".") {
            equals();
            firstNumber = displayNumber;
        }
        else {
            setOperation(button.value);
        }
    });
})

function setOperation(value) {
    //  set operation to operator variable
    if(value !== "=") {
        operator = value;
    };
}

function equals() {
    const result = operate(firstNumber, secondNumber, operator) 
    displayNumber = roundAccurately(result, 11);
    updateDisplay()
    firstNumber = null;
    secondNumber = null;
}

function clear() {
    firstNumber = null;
    secondNumber = null;
    displayNumber = "0";
    firstNumberDecimal = false;
    secondNumberDecimal = false;
    operator = null;
    updateDisplay()
}

function addDecimal() {
    if(displayNumber.includes(".")){
        return
    } else if (displayNumber === firstNumber || displayNumber === secondNumber){
        displayNumber += "."
        if(firstNumber && !firstNumberDecimal) {
            firstNumber = displayNumber;
            firstNumberDecimal = true;
        }
        if(secondNumber && !secondNumberDecimal) {
            secondNumber = displayNumber
            secondNumberDecimal = true;
        }
    }
}

function positiveNegative() {
    if (displayNumber === firstNumber && !displayNumber.includes("-")){
        firstNumber = "-" + firstNumber;
        displayNumber = firstNumber;
        updateDisplay()
    } else if (displayNumber === firstNumber && displayNumber.includes("-")){
        firstNumber = firstNumber.split("-")[1]
        displayNumber = firstNumber
        updateDisplay()
    } else if (displayNumber === secondNumber && !displayNumber.includes("-")){
        secondNumber = "-" + secondNumber;
        displayNumber = secondNumber;
        updateDisplay();
    } else if (displayNumber === secondNumber && secondNumber.includes("-")){
        secondNumber = secondNumber.split("-")[1]
        displayNumber = secondNumber
        updateDisplay()
    }
}

function roundAccurately(num, places) {
    if(num.toString().length > places) {
        return num.toPrecision(places)
    }
    return num
}