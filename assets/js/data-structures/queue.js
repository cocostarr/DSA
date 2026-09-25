document.addEventListener('DOMContentLoaded', function () {

  let queue = [];
  let stepCount = 0;

  const enqueueInput = document.getElementById('enqueue-input');
  const enqueueBtn = document.getElementById('enqueue-btn');
  const dequeueBtn = document.getElementById('dequeue-btn');
  const peekBtn = document.getElementById('peek-btn');
  const queueMessage = document.getElementById('queue-message');
  const stepCounter = document.getElementById('step-counter');
  const queueContainer = document.getElementById('queue-container');

  function render() {
    queueContainer.innerHTML = '';

    queue.forEach(function (value, index) {
      const isFront = index === 0;
      const box = document.createElement('div');

      box.className = isFront
        ? 'flex-1 h-10 bg-[#D97706] rounded-lg flex items-center justify-center'
        : 'flex-1 h-10 border-2 border-[#D97706] rounded-lg flex items-center justify-center';

      const label = document.createElement('span');
      label.className = isFront
        ? 'text-[13px] font-code text-white'
        : 'text-[13px] font-code text-[#D97706]';
      label.textContent = value;

      box.appendChild(label);
      queueContainer.appendChild(box);
    });

    stepCounter.textContent = 'Step ' + stepCount;
  }

  enqueueBtn.addEventListener('click', function () {
    const value = enqueueInput.value.trim();

    if (value === '') {
      queueMessage.textContent = 'Enter a value before enqueuing.';
      return;
    }

    queue.push(value);
    stepCount++;
    queueMessage.textContent = 'Enqueued "' + value + '" at the rear.';
    enqueueInput.value = '';
    render();
  });

  dequeueBtn.addEventListener('click', function () {
    if (queue.length === 0) {
      queueMessage.textContent = 'Queue is empty — nothing to dequeue.';
      return;
    }

    const removed = queue.shift();
    stepCount++;
    queueMessage.textContent = 'Dequeued "' + removed + '" from the front.';
    render();
  });

  peekBtn.addEventListener('click', function () {
    if (queue.length === 0) {
      queueMessage.textContent = 'Queue is empty — nothing to peek at.';
      return;
    }

    queueMessage.textContent = '"' + queue[0] + '" is currently at the front.';
  });

  render();

});