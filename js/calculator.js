let firstOperand = null;
let secondOperand = null;
let result = null;
let displayValue = '0';
let firstOperator = null;
let secondOperator = null;

function updateDisplay() {
    const display = document.getElementById("display");
    display.innerText = displayValue;
    if (displayValue.length > 9) {
        display.innerText = displayValue.substring(0, 9);
    }
}
// Call it first time to update the calculator value to 0
updateDisplay();

function ac() {
    displayValue = '0';
    firstOperand = null;
    secondOperand = null;
    firstOperator = null;
    secondOperator = null;
    result = null;
    updateDisplay();
}

function del() {
   
   // console.log(firstOperand);
   // console.log(secondOperand);
   // console.log(firstOperator);
   // console.log(secondOperator);
   // if (secondOperand == null && secondOperator == null) {
   //     firstOperator = null;
   //     console.log("operator removed");
   // }else {    
   //     console.log("Last item was removed");
   // }
    displayValue = displayValue.toString().slice(0, -1);
    updateDisplay();
}

function operate(firstOperand, secondOperand, operator) {

    switch (operator) {
        case "+":
            return firstOperand + secondOperand;
            break;
        case "-":
            return firstOperand - secondOperand;
            break;
        case '*':
            return firstOperand * secondOperand;
            break;
        case "/":
            if (secondOperand === 0) {
                alert("Cant divide by 0");
                return "Error";
            } else {
                return firstOperand / secondOperand;
            }
            break;
    }
}


function userInputNumber(operand) {
    if (firstOperator === null) {
        if (displayValue === '0' || displayValue === 0) {
            displayValue = operand;
        } else if (displayValue === firstOperand) {
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    } else {
        if (displayValue === firstOperand) {
            displayValue = operand;
        } else {
            displayValue += operand;
        }
    }
}

function userInputOperator(operator) {
    if (firstOperator != null && secondOperator === null) {
        secondOperator = operator;
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        displayValue = roundAccurately(result, 15).toString();
        firstOperand = displayValue;
        result = null;
    } else if (firstOperator != null && secondOperator != null) {
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        secondOperator = operator;
        displayValue = roundAccurately(result, 15).toString();
        firstOperand = displayValue;
        result = null;
    } else {
        firstOperator = operator;
        firstOperand = displayValue;
    }
}

function Equal() {
    if (firstOperator === null) {
        displayValue = displayValue;
    } else if (secondOperator != null) {
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), secondOperator);
        if (result === 'Error') {
            displayValue = 'Error';
        } else {
            displayValue = roundAccurately(result, 15).toString();
            firstOperand = displayValue;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    } else {
        secondOperand = displayValue;
        result = operate(Number(firstOperand), Number(secondOperand), firstOperator);
        if (result === 'Error') {
            displayValue = 'Error';
        } else {
            displayValue = roundAccurately(result, 15).toString();
            firstOperand = displayValue;
            secondOperand = null;
            firstOperator = null;
            secondOperator = null;
            result = null;
        }
    }
}

function roundAccurately(num, places) {
    return parseFloat(Math.round(num + 'e' + places) + 'e-' + places);
}

// Function to add dot
function addDot(){
    let dot =".";
    if(displayValue === firstOperand || displayValue === secondOperand) {
        displayValue = '0';
        displayValue += dot;
    } else if(!displayValue.includes(dot)) {
        displayValue += dot;
    } 
    updateDisplay();
}
//End of add dot

// Get user Input for number buttons
const numberButtons = document.querySelectorAll(".number");
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log(`Button ${button.innerText} was pressed`);
        operand = button.innerText;
        userInputNumber(operand);
        updateDisplay();
    })
});
// End of user input for number buttons

// Get user input for operationButtons
const operationButtons = document.querySelectorAll(".btnOperator")
operationButtons.forEach((button) => {
    button.addEventListener("click", () => {

        let operator = button.innerText;
        userInputOperator(operator);
        updateDisplay();
    });
});

// End of user input for operationButtons

// Equal buttons 
const equalButton = document.querySelector(".btnEqual");
equalButton.addEventListener('click', button => {
    Equal();
    updateDisplay();
})
// End of equal 

// Clear 

document.getElementById("AC").addEventListener("click", button => {
    ac();
})
// End of Clear

// Delete last element
document.getElementById("delete").addEventListener("click", button => {
    del();
})
// End of delete last element

// Add decimal
document.getElementById("decimal").addEventListener("click", button => {
   addDot();
})

// End of Decimal

//keyboard support

document.addEventListener('keydown', function (event) {
    let patternForNumbers = /[0-9]/g;
    let patternForOperators = /[+\-*\/]/g;
    if (event.key.match(patternForNumbers)) {
      userInputNumber(event.key);
      updateDisplay();
    }
    if (event.key === '.') {
      addDot();
      updateDisplay();
    }
    if (event.key.match(patternForOperators)) {
      userInputOperator(event.key);
      updateDisplay();
    }
    if (event.key === 'Enter' || event.key === '=') {
      Equal();
      updateDisplay();
    }
    if (event.key === "Backspace") {
      del();
      updateDisplay();
    }
    if (event.key == 'd') {
      ac();
      updateDisplay();
    }
  
  });

  //end of keyboard support