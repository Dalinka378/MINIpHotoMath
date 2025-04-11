document.querySelectorAll('.calc-button').forEach(button => {
    button.addEventListener('click', function () {
      const digit = this.textContent.trim();
      if (["=", "C", "←"].includes(digit)) return;
      const input = document.getElementById('mathInput');
      const rect = this.getBoundingClientRect();
      const targetRect = input.getBoundingClientRect();
      const flyingDigit = document.createElement('div');
      flyingDigit.classList.add('animating-digit');
      flyingDigit.innerText = digit;
      document.body.appendChild(flyingDigit);
      flyingDigit.style.left = `${rect.left + rect.width / 2}px`;
      flyingDigit.style.top = `${rect.top + rect.height / 2}px`;
      const deltaX = targetRect.left + targetRect.width / 2 - (rect.left + rect.width / 2);
      const deltaY = targetRect.top + targetRect.height / 2 - (rect.top + rect.height / 2);
      requestAnimationFrame(() => {
        flyingDigit.style.transform = `translate(${deltaX}px, ${deltaY}px) scale(0.6)`;
        flyingDigit.style.opacity = '0';
      });
      setTimeout(() => {
        flyingDigit.remove();
        const start = input.selectionStart;
        const end = input.selectionEnd;
        const text = input.value;
        input.value = text.slice(0, start) + digit + text.slice(end);
        input.selectionStart = input.selectionEnd = start + digit.length;
        input.focus();
      }, 600); 
    });
  });
   