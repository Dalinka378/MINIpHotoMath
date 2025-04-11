// 1. Construim UI-ul: display + butoane
const container = document.createElement('div');
container.style.textAlign = 'center';
container.style.marginTop = '40px';

// Display (ca un ecran de calculator)
const display = document.createElement('div');
display.id = 'mathDisplay';
display.style.fontSize = '28px';
display.style.minHeight = '50px';
display.style.border = '1px solid #ccc';
display.style.padding = '10px';
display.style.width = '300px';
display.style.margin = '0 auto';
display.style.borderRadius = '8px';
display.style.background = '#f9f9f9';
display.style.overflowX = 'auto';
display.style.textAlign = 'right';
display.textContent = '';
container.appendChild(display);

// Grid de butoane
const buttonsContainer = document.createElement('div');
buttonsContainer.style.display = 'grid';
buttonsContainer.style.gridTemplateColumns = 'repeat(4, 60px)';
buttonsContainer.style.gap = '10px';
buttonsContainer.style.justifyContent = 'center';
buttonsContainer.style.marginTop = '20px';

const buttons = [
  '7', '8', '9', '←',
  '4', '5', '6', '+',
  '1', '2', '3', '-',
  '0', 'C', '=', '*',
  '/', '.', '(', ')'
];

buttons.forEach(text => {
  const btn = document.createElement('button');
  btn.textContent = text;
  btn.className = 'calc-button';
  btn.style.padding = '15px';
  btn.style.fontSize = '20px';
  btn.style.cursor = 'pointer';
  buttonsContainer.appendChild(btn);
});

container.appendChild(buttonsContainer);
document.body.appendChild(container);

// 2. Funcționalitate + animație
document.querySelectorAll('.calc-button').forEach(button => {
  button.addEventListener('click', function () {
    const digit = this.textContent.trim();
    const display = document.getElementById('mathDisplay');
    const rect = this.getBoundingClientRect();
    const targetRect = display.getBoundingClientRect();

    const flyingDigit = document.createElement('div');
    flyingDigit.innerText = digit;
    document.body.appendChild(flyingDigit);

    Object.assign(flyingDigit.style, {
      position: 'absolute',
      fontSize: '24px',
      fontWeight: 'bold',
      left: `${rect.left + rect.width / 2}px`,
      top: `${rect.top + rect.height / 2}px`,
      pointerEvents: 'none',
      zIndex: '1000',
      transition: 'transform 0.6s ease, opacity 0.6s ease',
    });

    const deltaX = targetRect.left + targetRect.width / 2 - (rect.left + rect.width / 2);
    const deltaY = targetRect.top + targetRect.height / 2 - (rect.top + rect.height / 2);

    requestAnimationFrame(() => {
      flyingDigit.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.6)`;
      flyingDigit.style.opacity = '0';
    });

    setTimeout(() => {
      flyingDigit.remove();

      if (digit === 'C') {
        display.textContent = '';
      } else if (digit === '=') {
        try {
          const result = eval(display.textContent);
          if (typeof result === 'number' && isFinite(result)) {
            display.textContent = result;
          }
        } catch (e) {
          // Nu afișăm nimic dacă e greșit
        }
      } else if (digit === '←') {
        display.textContent = display.textContent.slice(0, -1);
      } else {
        display.textContent += digit;
      }
    }, 600);
  });
});
