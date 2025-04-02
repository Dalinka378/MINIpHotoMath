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

function addKeyboard() {
  document.querySelector(".calc-buttons").style.display = "block";
  document.querySelector(".calc-container").style.display = "block";

}

let runningTotal = 0;
let buffer = "0";
let previousOperator = null;
const screen = document.querySelector(".screen");

function buttonClick(value) {
  if (!isNaN(value) || value === ".") {
    handleNumber(value);
  } else {
    handleSymbol(value);
  }
  screen.innerText = buffer;
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      previousOperator = null;
      break;
    case "=":
      if (previousOperator === null) return;
      flushOperation(parseFloat(buffer));
      previousOperator = null;
      buffer = runningTotal;
      runningTotal = 0;
      break;
    case "←":
      buffer = buffer.length === 1 ? "0" : buffer.slice(0, -1);
      break;
    case "+":
    case "-":
    case "×":
    case "÷":
      handleMath(symbol);
      break;
    case "√":
      buffer = Math.sqrt(parseFloat(buffer)).toString();
      break;
  }
}

function handleMath(symbol) {
  if (buffer === "0") return;
  const intBuffer = parseFloat(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }
  previousOperator = symbol;
  buffer = "0";
}

function flushOperation(intBuffer) {
  switch (previousOperator) {
    case "+":
      runningTotal += intBuffer;
      break;
    case "-":
      runningTotal -= intBuffer;
      break;
    case "×":
      runningTotal *= intBuffer;
      break;
    case "÷":
      runningTotal /= intBuffer;
      break;
  }
}

function handleNumber(value) {
  if (buffer === "0" && value !== ".") {
    buffer = value;
  } else {
    buffer += value;
  }
}

document.querySelector(".calc-buttons").addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    buttonClick(event.target.innerText);
  }
});

function calculateLogBase() {
  let x = parseFloat(document.getElementById("numberInput").value);
  let b = parseFloat(document.getElementById("baseInput").value);

  if (x > 0 && b > 0 && b !== 1) {
    document.getElementById("result").innerText = `log_${b}(${x}) = ${Math.log(x) / Math.log(b)}`;
  } else {
    document.getElementById("result").innerText = "Eroare: x și b trebuie să fie pozitive, iar b ≠ 1!";
  }
}
document.querySelectorAll('.key').forEach(button => {
  button.addEventListener('click', function() {
      const digit = this.textContent;
      const target = document.querySelector('.output-box');
      const rect = this.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();

      // Creăm un element temporar pentru animație
      const animDigit = document.createElement('div');
      animDigit.textContent = digit;
      animDigit.classList.add('animating-digit');
      document.body.appendChild(animDigit);

      // Setăm poziția inițială
      animDigit.style.position = 'absolute';
      animDigit.style.left = `${rect.left + rect.width / 2}px`;
      animDigit.style.top = `${rect.top + rect.height / 2}px`;

      // Forțăm reflow pentru a aplica noua poziție
      requestAnimationFrame(() => {
          animDigit.style.transform = `translate(${targetRect.left - rect.left}px, ${targetRect.top - rect.top}px)`;
          animDigit.style.opacity = '0';
      });

      // Ștergem elementul după animație și actualizăm output-ul
      setTimeout(() => {
          animDigit.remove();
          target.value += digit; // Adăugăm cifra la ecranul de scriere
      }, 500);
  });
});
