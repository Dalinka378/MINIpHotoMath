function solveExpression() {
  let expression = document.getElementById("mathInput").value;
  try {
    let simplifiedSteps = [];
    let node = math.parse(expression);
    let lastStep = expression;

    while (true) {
      let simplified = math.simplify(lastStep).toString();
      if (simplified === lastStep) break;
      simplifiedSteps.push(simplified);
      lastStep = simplified;
    }

    let result = math.evaluate(expression);
    document.getElementById("solution").innerText = "Rezolvare pas cu pas:";
    document.getElementById("steps").innerHTML = simplifiedSteps
      .map((step) => `<p>${step}</p>`)
      .join("");
    document.getElementById("result").innerText = "Rezultatul: " + result;
  } catch (error) {
    document.getElementById("solution").innerText = "Eroare de calcul!";
    document.getElementById("steps").innerHTML = "";
    document.getElementById("result").innerText = "";
  }
}

function startCamera() {
  alert("Funcția de cameră va fi implementată aici");
}

function importFromGallery() {
  alert("Funcția de import din galerie va fi implementată aici");
}
function addKeyboard() {
  const calcButtons = document.getElementsByClassName("calc-buttons")[0];
  calcButtons.style = "display: block;";
}

let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector(".screen");

function buttonClick(value) {
  console.log(value);
  if (isNaN(value)) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  screen.innerText = buffer;
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }
      flushOperation(parseInt(buffer));
      previousOperator = null;
      buffer = runningTotal;
      runningTotal = 0;
      break;
    case "←":
      if (buffer.length == 1) {
        buffer = "0";
      } else {
        buffer.toString(0, buffer.length - 1);
      }
      break;
    case "+":
    case "-":
    case "×":
    case "÷":
      console.log("radical")
      handleMath(symbol);
      break;
    case '':
      
  }
}

function handleMath(symbol) {
  if (buffer === "0") {
    return;
  }

  const intBuffer = parseInt(buffer);

  console.log(runningTotal, intBuffer)

  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }
  previousOperator = symbol;
  buffer = "0";
}

function flushOperation(intBuffer) {
  if (previousOperator === "+") {
    runningTotal += intBuffer;
  } else if (previousOperator === "-") {
    runningTotal -= intBuffer;
  } else if (previousOperator === "×") {
    runningTotal *= intBuffer;
  } else if (previousOperator === "÷") {
    runningTotal /= intBuffer;
  } else if (previousOperator === "√") {
    console.log("radical",intBuffer,runningTotal)
    runningTotal = Math.sqrt(intBuffer);
  }
}

function handleNumber(handleNumber) {
  if (buffer === "0") {
    buffer = handleNumber;
  } else {
    buffer += handleNumber;
  }
}

function init() {
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}

init();
