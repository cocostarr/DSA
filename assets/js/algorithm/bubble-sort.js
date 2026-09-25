
document.addEventListener('DOMContentLoaded', function () {

  const initialArray = [8, 3, 5, 4, 2];
  let array = [];
  const n = initialArray.length;

  let i = 0;              // left index of the pair currently being compared
  let passCount = 0;      // completed passes so far
  let limit = n - 1;      // comparisons happen while i < limit for the current pass
  let swappedInPass = false;
  let finished = false;
  let stepCount = 0;

  const startBtn = document.getElementById('start-btn');
  const nextBtn = document.getElementById('next-btn');
  const sortMessage = document.getElementById('sort-message');
  const stepCounter = document.getElementById('step-counter');
  const sortContainer = document.getElementById('sort-container');

  function render() {
    sortContainer.innerHTML = '';
    const sortedBoundary = n - passCount; // indices >= this are settled in place

    array.forEach(function (value, index) {
      const box = document.createElement('div');
      const isComparing = !finished && (index === i || index === i + 1) && index < sortedBoundary;
      const isSettled = index >= sortedBoundary;

      if (isSettled) {
        box.className = 'w-11 h-11 border-2 border-[#10B981] rounded-lg flex items-center justify-center text-[14px] font-code text-[#059669] bg-[#F0FDF4]';
      } else if (isComparing) {
        box.className = 'w-11 h-11 border-2 border-[#D97706] rounded-lg flex items-center justify-center text-[14px] font-code text-white bg-[#D97706]';
      } else {
        box.className = 'w-11 h-11 border-2 border-[#E5E7EB] rounded-lg flex items-center justify-center text-[14px] font-code text-[#111827]';
      }

      box.textContent = value;
      sortContainer.appendChild(box);
    });

    stepCounter.textContent = 'Step ' + stepCount;
  }

  function compareStep() {
    stepCount++;

    const left = array[i];
    const right = array[i + 1];

    if (left > right) {
      array[i] = right;
      array[i + 1] = left;
      swappedInPass = true;
      sortMessage.textContent = 'Compared ' + left + ' and ' + right + ' — out of order, swapped them.';
    } else {
      sortMessage.textContent = 'Compared ' + left + ' and ' + right + ' — already in order, no swap needed.';
    }

    i++;

    if (i >= limit) {
      // This pass is complete.
      passCount++;
      i = 0;
      limit = n - 1 - passCount;

      if (!swappedInPass || limit <= 0) {
        finished = true;
        nextBtn.disabled = true;
        sortMessage.textContent += ' No swaps needed on this pass — the list is fully sorted!';
      }

      swappedInPass = false;
    }

    render();
  }

  startBtn.addEventListener('click', function () {
    array = initialArray.slice(); // reset to a fresh unsorted copy
    i = 0;
    passCount = 0;
    limit = n - 1;
    swappedInPass = false;
    finished = false;
    stepCount = 0;
    nextBtn.disabled = false;

    compareStep();
  });

  nextBtn.addEventListener('click', function () {
    if (finished) return;
    compareStep();
  });

  // ---------- Init: show the starting unsorted array ----------
  array = initialArray.slice();
  render();

});