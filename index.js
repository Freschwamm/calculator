let firstNumber;
let secondNumber;
let operator;
let decimal = false;
const display = document.querySelector(".display");
display.innerText = 0;
const buttons = document.querySelectorAll("button");

function add (firstNumber, secondNumber) {
    const result = parseFloat(firstNumber) + parseFloat(secondNumber)
    console.log('result', result) 
    return parseFloat(firstNumber) + parseFloat(secondNumber)
}

function subtract (firstNumber, secondNumber) {
    return parseFloat(firstNumber) - parseFloat(secondNumber)
}

function divide (firstNumber, secondNumber) {
    return parseFloat(firstNumber) / parseFloat(secondNumber)
}

function multiply (firstNumber, secondNumber) {
    return parseFloat(firstNumber) * parseFloat(secondNumber)
}

function percentage (firstNumber) {
    return (parseFloat(firstNumber) / 100)
}

function operate (firstNumber, secondNumber, operator) {
    if(operator === "+") {
        return add(firstNumber, secondNumber)
    }
    if(operator === "-") {
        return subtract(firstNumber, secondNumber)
    }
    if(operator === "*") {
        return multiply(firstNumber, secondNumber)
    }
    if(operator === "/") {
        return divide(firstNumber, secondNumber)
    }
    if(operator === "%"){
        console.log('operate')
        return percentage(firstNumber)
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
    button.addEventListener('click', (event) => {
        // resets all code
        if(button.value === "AC") {
            firstNumber = undefined;
            secondNumber = undefined;
            decimal = false;
            operator = undefined
            display.innerText = 0;
        }
        // if operation is set but equals not pressed and a new operation selected, calculate first operation and chain with new operation.
        // if(firstNumber && secondNumber && operator && button.className !== "decimal") {
        //     if(secondNumber.slice(-1) !== ".") {
        //         const result = operate(firstNumber, secondNumber, operator);
        //         display.innerText = result;
        //         firstNumber = result;
        //         secondNumber = undefined;
        //     }
        // }
        if(button.className === "decimal" && decimal === false) {
            if(firstNumber && !secondNumber) {
                firstNumber += "."
                display.innerText += ".";
                decimal = true;
                console.log('decimal first', firstNumber)
            }
            if (secondNumber) {
                display.innerText += ".";
                secondNumber += ".";
                decimal = true;
                console.log('decimal 2nd', secondNumber)
            }
        }
        // Checks if equals has been clicked and returns result and resets values
        if(button.value === "=" && secondNumber) {
            const result = operate(firstNumber, secondNumber, operator);
            if (result > 999999999) {
                
            }
            display.innerText = result;
            firstNumber = 0;
            secondNumber = 0;
        }
        // Sets the first number and only sets second once an operator has been picked
        if(button.className === "number"){
            if(operator) {
                if(secondNumber) {
                    display.innerText += button.value;
                    secondNumber += button.value;
                    console.log('add secondNumber', secondNumber)
                } else {
                    display.innerText = button.value;
                    secondNumber = button.value;
                    console.log('set secondNumber', secondNumber)
                }
            } else {
                if(firstNumber) {
                    display.innerText += button.value;
                    firstNumber += button.value;
                    console.log('add first', firstNumber)
                } else {
                    display.innerText = button.value;
                    firstNumber = button.value;
                    console.log('set first', firstNumber)
                }
            } 
        }
        // set operation to operator variable
        if(button.className === "operation"){
            operator = button.value;
            decimal = false;
            console.log('set operator', operator)
        }
        // Checks operator is percentage and calls operate
        // will only call on first number
        if (button.value === "%" && firstNumber) {
            const result = operate(firstNumber, 0, operator);
            display.innerText = result;
            firstNumber = undefined;
            secondNumber = undefined;
        }
    });
})