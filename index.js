const screen = 'textview';
const numberButtons = document.getElementsByClassName('number');
const operators = document.getElementsByClassName('operator');

const operating = false;
const operand = '';

function clearScreen() {
  document.getElementById(screen).innerHTML = "0";
  resetOperating();
}

function evaluate() {
  var result;
  if(operating && isLastEnteredNumber()){
    var content = document.getElementById(screen).innerHTML;
    var numbers = content.split(operand);
    var firstNumber = parseInt(numbers[0], 10);
    var secondNumber = parseInt(numbers[1], 10);

    switch(operand) {
      case '+':
        result = firstNumber + secondNumber;
        break;
      case '÷':
        if(firstNumber !== 0 && secondNumber !== 0) {
          result = firstNumber / secondNumber;
        } else {
          result = 0;
        }
        break;
      case '×':
        result = firstNumber * secondNumber;
        break;
      case '–':
        result = firstNumber - secondNumber;
        break;
      default:
        console.log('Something went terribly wrong! ' + operand + " is not a supported operator!");
    }
  }

  resetOperating();
  document.getElementById(screen).innerHTML = result || 0;
  return result || 0;
}

function percent() {
  var content = document.getElementById(screen).innerHTML;
  if(operating && isLastEnteredNumber()) {
    var result = evaluate();      
    if(result != '0') {           
      content = content / 100;
    } else {                      
      content += '.0';
    }
  } else if (!operating && isLastEnteredNumber && content != '0') { 
      content = content / 100;
  } else {
    content += '.0';              
    console.log('Bug in percent function! Operating: ' + operating + ', screen content:' + content); // Log, because if this happens we have a bug lulz.
  }
  document.getElementById(screen).innerHTML = content;
  resetOperating();
}

function decimal() {
  document.getElementById(screen).innerHTML += ".";
}

function editPositiveNegativeValue() {
    var content = document.getElementById(screen).innerHTML;
    if(content.charAt(0) == '-') {
      content = content.slice(1);
    } else {
      content = "-" + content;
    }
    document.getElementById(screen).innerHTML = content;
}


function resetOperating() {
  operating = false;
  operand = '';
}


function isLastEnteredNumber() {
  var content = document.getElementById(screen).innerHTML;
  return !isNaN(content.charAt(content.length - 1));
}


function numberClick(event) {
  var content = document.getElementById(screen).innerHTML;
  var btnNum = event.target.innerHTML;
  
  if(content != "0"){
    content += btnNum;
  } else {
    content = btnNum;
  }
  document.getElementById(screen).innerHTML = content;
}

function operatorClick(event) {
  var operator = event.target.innerHTML;
  var content = document.getElementById(screen).innerHTML;

  switch(operator) {
    case '=':
      evaluate();
      break;
    case 'C':
      clearScreen();
      break;
    case '%':
      percent();
      break;
    case '+/-':
      editPositiveNegativeValue();
      break;
    case '.':
      decimal();
      break;
    default:
      operating = true;
      operand = operator;
      content += operator;
      document.getElementById(screen).innerHTML = content;
      break;
  }
}

for(var o = 0; o < operators.length; o++) {
  operators[o].addEventListener('click', operatorClick, false);
}

for(var b =  0; b < numberButtons.length; b++) {
numberButtons[b].addEventListener('click', numberClick, false);
}

clearScreen();