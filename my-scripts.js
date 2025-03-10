function solveExpression() {
    let expression = document.getElementById('mathInput').value;
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
      document.getElementById('solution').innerText = "Rezolvare pas cu pas:";
      document.getElementById('steps').innerHTML = simplifiedSteps.map(step => `<p>${step}</p>`).join('');
      document.getElementById('result').innerText = "Rezultatul: " + result;
    } catch (error) {
      document.getElementById('solution').innerText = "Eroare de calcul!";
      document.getElementById('steps').innerHTML = "";
      document.getElementById('result').innerText = "";
    }
  }

  function startCamera() {
    alert("Funcția de cameră va fi implementată aici");
  }

  function importFromGallery() {
    alert("Funcția de import din galerie va fi implementată aici");
  }
  function addKeyboard(){
    let equation=document.getElementById('mathInput');
    let text =equation.innerText.toLowerCase().replace(/[^a-z]/g, '');
    equation.innerText=text;
    
   
  }