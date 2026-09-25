document.addEventListener('DOMContentLoaded', function () {

  let stack = [];
  let stepCount = 0;

  const pushInput = document.getElementById('push-input');
  const pushBtn = document.getElementById('push-btn');
  const popBtn = document.getElementById('pop-btn');
  const peekBtn = document.getElementById('peek-btn');
  const stackMessage = document.getElementById('stack-message');
  const stepCounter = document.getElementById('step-counter');
  const stackContainer = document.getElementById('stack-container');

  function render() {
    stackContainer.innerHTML = '';

    stack.forEach(function (value, index) {
      const isTop = index === stack.length - 1;
      const plate = document.createElement('div');

      plate.className = isTop
        ? 'w-full h-9 bg-[#059669] rounded-lg flex items-center justify-between px-3'
        : 'w-full h-9 border-2 border-[#059669] rounded-lg flex items-center px-3';

      const valueSpan = document.createElement('span');
      valueSpan.className = isTop
        ? 'text-[12px] font-code text-white'
        : 'text-[12px] font-code text-[#059669]';
      valueSpan.textContent = value;
      plate.appendChild(valueSpan);

      if (isTop) {
        const topLabel = document.createElement('span');
        topLabel.className = 'text-[10px] font-bold font-ui text-white opacity-80';
        topLabel.textContent = '← TOP';
        plate.appendChild(topLabel);
      }

      stackContainer.appendChild(plate);
    });

    stepCounter.textContent = 'Step ' + stepCount;
  }

  pushBtn.addEventListener('click', function () {
    const value = pushInput.value.trim();

    if (value === '') {
      stackMessage.textContent = 'Enter a value before pushing.';
      return;
    }

    stack.push(value);
    stepCount++;
    stackMessage.textContent = 'Pushed "' + value + '" onto the stack.';
    pushInput.value = '';
    render();
  });

  popBtn.addEventListener('click', function () {
    if (stack.length === 0) {
      stackMessage.textContent = 'Stack is empty — nothing to pop.';
      return;
    }

    const removed = stack.pop();
    stepCount++;
    stackMessage.textContent = 'Popped "' + removed + '" off the top.';
    render();
  });

  peekBtn.addEventListener('click', function () {
    if (stack.length === 0) {
      stackMessage.textContent = 'Stack is empty — nothing to peek at.';
      return;
    }

    const top = stack[stack.length - 1];
    stackMessage.textContent = '"' + top + '" is currently on top.';
  });

  render();

});