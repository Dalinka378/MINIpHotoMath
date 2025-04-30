document.querySelectorAll('.calc-button').forEach(button => {
    button.addEventListener('click', function () {
      const digit = this.textContent.trim();
      const input = document.getElementById('mathInput');
      const rect = this.getBoundingClientRect();
      const targetRect = input.getBoundingClientRect();
  
      // Creează digit-ul care va zbura
      const flyingDigit = document.createElement('div');
      flyingDigit.innerText = digit;
      document.body.appendChild(flyingDigit);
  
      // Stilizare direct în JS
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
  
      // Calculăm cât trebuie să se deplaseze digit-ul
      const deltaX = targetRect.left + targetRect.width / 2 - (rect.left + rect.width / 2);
      const deltaY = targetRect.top + targetRect.height / 2 - (rect.top + rect.height / 2);
  
      // Lansăm animația
      requestAnimationFrame(() => {
        flyingDigit.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.6)`;
        flyingDigit.style.opacity = '0';
      });
  
      setTimeout(() => {
        flyingDigit.remove();
  
        // După animație: execuție în funcție de tipul butonului
        if (digit === 'C') {
          input.value = '';
        } else if (digit === '=') {
          try {
            input.value = eval(input.value);
          } catch (e) {
            input.value = 'Eroare';
          }
        } else if (digit === '←') {
          const start = input.selectionStart;
          const end = input.selectionEnd;
          const text = input.value;
  
          if (start === end && start > 0) {
            input.value = text.slice(0, start - 1) + text.slice(end);
            input.selectionStart = input.selectionEnd = start - 1;
          } else {
            input.value = text.slice(0, start) + text.slice(end);
            input.selectionStart = input.selectionEnd = start;
          }
        } else {
          const start = input.selectionStart;
          const end = input.selectionEnd;
          const text = input.value;
          input.value = text.slice(0, start) + digit + text.slice(end);
          input.selectionStart = input.selectionEnd = start + digit.length;
        }
  
        input.focus();
      }, 600);
    });
  });
  