let firstOperand = '';
let secondOperand ='';
let result;
let displayValue = '0';
let operator = null;
let secondOperator = null;
let operatorUsed = false;
let operatorTwoUsed = false;

const display = document.getElementById("display");



function addition(){
    result = parseFloat(firstOperand) + parseFloat(secondOperand);
    console.log(result);
    display.innerText = result;
}
function subtraction(){
    result = firstOperand - secondOperand;
    display.innerText = result;
}
function multiplication(){
    result = firstOperand * secondOperand;
    display.innerText = result;
}
function division(){
    result = firstOperand / secondOperand;
    display.innerText = result;
}
let numbers = '';
function updateDisplay(userInput){
        
    numbers += userInput;
    display.innerText = numbers;     
}

function ac(){
    display.innerText = displayValue;
    firstOperand ='';
    secondOperand ='';
    operatorUsed = false;
    operator = null;
    numbers ='';
}

function del(){
    const lastItem = numbers[numbers.length - 1];
    numbers = numbers.toString().slice(0,-1);
    display.innerText = numbers;
    if (operatorUsed == true){
        if (numbers.lastItem == "+" || numbers.lastItem == "-" || numbers.lastItem == "x" || numbers.lastItem == "÷"){
            operatorUsed= false;
            operator = null;
            console.log("Operator removed");
        }else{
            secondOperand = secondOperand.slice(0,-1);  
            console.log("Second Operator removed");
        }
    } else {
        if (numbers.length < 1){
            display.innerText = displayValue;
        }
        firstOperand = firstOperand.slice(0,-1);
        console.log("First operator removed");
    }
}
function operate(firstOperand, secondOperand, operator){

    switch (operator) {
      case "+":
        addition(firstOperand, secondOperand);
        break;
      case "-":
        subtraction(firstOperand, secondOperand);
        break;
      case "x":
        multiplication(firstOperand, secondOperand);
        break;
      case "÷":
    
        division(firstOperand, secondOperand);
        break;
    }
  }

 let userInput = [];
function userInputCalc(userInput){
    if (operatorUsed == false){
        firstOperand += userInput;
        console.log(`First operand ${firstOperand}`);
    } else{
        if (userInput == "+" || userInput == "-" || userInput == "x" || userInput == "÷"){
            operator = userInput;
        }else{
        secondOperand += userInput;
        console.log(`Second operand ${secondOperand}`); 
        }
        
    }
}

  // Get user Input for number buttons
  const numberButtons = document.querySelectorAll(".number");

  numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      //appendNumber(button.innerText)
      console.log(`Button ${button.innerText} was pressed`);
 
      userInput= button.innerText;
      updateDisplay(userInput);
      userInputCalc(userInput);
    })
  });
  // End of user input for number buttons

  // Get user input for operationButtons
  const operationButtons = document.querySelectorAll(".btnOperator")
  operationButtons.forEach((button) => {
    button.addEventListener("click", () => {
    //  calculator.chooseOperation(button.innerText);
    operatorUsed = true;
     operator = button.innerText;
     userInput = operator;
      updateDisplay(operator);
      userInputCalc(userInput);
    });
  });

  // End of user input for operationButtons

  // Equal buttons 
const equalButton = document.querySelector(".btnEqual");
  equalButton.addEventListener('click', button => {
    updateDisplay(button.innerText);
    if (secondOperand == 0){
        alert("Can't divide by 0");
        ac();
    }else{
        operate(firstOperand, secondOperand, operator); 
    }
   
  })

document.getElementById("AC").addEventListener("click", button => {
    ac();
})
  
document.getElementById("delete").addEventListener("click", button => {
    del();
})
