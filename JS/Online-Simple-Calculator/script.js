var a;
var isInputFinished = false;
var operand1Taken = false;
var isDecimal = false;
var operand1 = 0;
var operand2 = 0;
var operator = "";
var steps = 0;
var easteregg = false;

var btnClickAudio = new Audio("assets/button-click.mp3");
var clkTickAudio = new Audio("assets/clock-tick.mp3");

const input = document.querySelector(".calc-inputs");
const stepCount = document.querySelector(".step-counter");

function takeInput(a) {
  btnClickAudio.play();
  console.log(typeof a);

  if (typeof a == "string" && a != "00" && a != "." && a != "0") {
    if (operand1Taken) {
      multiOperandCalculation();
    }
    isInputFinished = true;
    operator = a;
    steps++;
    stepCount.innerHTML = "0" + steps;
  }

  if (isInputFinished) {
    checkDecimal();
    operand1Taken = true;
    input.value = "";
    isInputFinished = false;
    isDecimal = false;
  }

  if (typeof a == "number" && !operand1Taken) {
    operand1 = operand1 * 10 + a;
    console.log("first number = ", operand1);
  } else if (typeof a == "number" && operand1Taken) {
    operand2 = operand2 * 10 + a;
    console.log("second number = ", operand2);
  }

  if (a == "0") {
    if (!operand1Taken) {
      operand1 *= 10;
    } else {
      operand2 *= 10;
    }
  }

  if (a == "00") {
    if (!operand1Taken) {
      operand1 *= 100;
    } else {
      operand2 *= 100;
    }
  }

  input.value += a;
    console.log("first number = ", operand1);
  console.log("second number = ", operand2);
}

function clearScreen() {
  btnClickAudio.play();
  input.value = "";
  isInputFinished = false;
  operand1 = 0;
  operand2 = 0;
  operator = "";
  operand1Taken = false;
  steps = 0;
  stepCount.innerHTML = "";
  isDecimal = false;
  if (easteregg) {
    input.value = "NO ESCAPE";
  }
}

function backspace() {
  btnClickAudio.play();
  input.value = input.value.slice(0, -1);
  if (!operand1Taken) {
    operand1 = Math.floor(operand1 / 10);
  } else {
    if (operand2 == 0) {
      operator = "";
    }
    operand2 = Math.floor(operand2 / 10);
  }
}

function evaluateInput() {
  btnClickAudio.play();
  if (operand1 == 777 && operand2 == 0) {
    easteregg = true;
    initiateTimeBomb();
  }
  checkDecimal();
  console.log("operand1 = ", operand1);
  console.log("operand2 = ", operand2);
  if (operand1Taken) {
    input.value = "= ";
    if (operator == "+") {
      input.value += operand1 + operand2;
    } else if (operator == "-") {
      input.value += operand1 - operand2;
    } else if (operator == "×") {
      input.value += operand1 * operand2;
    } else if (operator == "÷") {
      input.value += operand1 / operand2;
    } else if (operator == "%") {
      input.value += operand1 % operand2;
    }
  }
}

function addDecimal() {
  btnClickAudio.play();
  if (!isDecimal) {
    input.value += ".";
    isDecimal = true;
  }
}

function checkDecimal() {
  console.log("isDecimal = ", isDecimal);
  console.log("operand1Taken = ", operand1Taken);
  if (isDecimal && !operand1Taken) {
    operand1 = parseFloat(input.value);
    console.log("type of operand1 = ", typeof operand1);
    console.log("first number = ", operand1);
  } else if (isDecimal && operand1Taken) {
    // remove first character from input.value
    operand2 = parseFloat(input.value.slice(1));
    console.log("type of operand2 = ", typeof operand2);
    console.log("second number = ", operand2);
  }
}

function multiOperandCalculation() {
  if (operator == "+") {
    operand1 += operand2;
  } else if (operator == "-") {
    operand1 -= operand2;
  } else if (operator == "×") {
    operand1 *= operand2;
  } else if (operator == "÷") {
    operand1 /= operand2;
  } else if (operator == "%") {
    operand1 %= operand2;
  }
  console.log("operand1 = ", operand1);
  operand2 = 0;
}

function initiateTimeBomb() {
  let time = 10;
  stepCount.innerHTML = ":)";
  input.value = "Activating";
  setTimeout(() => {
    input.value = "Time Bomb";
    clkTickAudio.play();
  }, 1000);
  setTimeout(() => {
    let timer = setInterval(() => {
      clkTickAudio.play();
      stepCount.innerHTML = ":)";
      input.value = time;
      time--;
      if (time < 0) {
        clearInterval(timer);
        input.value = "BOOM!";
        easteregg = false;
        setTimeout(() => {
          window.location.assign("https://www.youtube.com/watch?v=xvFZjo5PgG0");
        }, 1000);
      }
    }, 1000);
  }, 2000);
}
