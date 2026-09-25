
document.addEventListener('DOMContentLoaded', function () {

  const array = [3, 7, 12, 19, 25];
  let target = null;
  let currentIndex = -1;   // -1 means search hasn't started
  let found = false;
  let finished = false;
  let stepCount = 0;

  const searchValueInput = document.getElementById('search-value');
  const startBtn = document.getElementById('start-btn');
  const nextBtn = document.getElementById('next-btn');
  const searchMessage = document.getElementById('search-message');
  const stepCounter = document.getElementById('step-counter');
  const searchContainer = document.getElementById('search-container');

  function render() {
    searchContainer.innerHTML = '';

    array.forEach(function (value, index) {
      const box = document.createElement('div');
      let className;

      if (found && index === currentIndex) {
        // The match
        className = 'w-11 h-11 border-2 border-[#059669] rounded-lg flex items-center justify-center text-[14px] font-code text-white bg-[#059669]';
      } else if (index === currentIndex && !finished) {
        // Currently being checked
        className = 'w-11 h-11 border-2 border-[#DC2626] rounded-lg flex items-center justify-center text-[14px] font-code text-white bg-[#DC2626]';
      } else if (index < currentIndex || (finished && !found)) {
        // Already checked and rejected
        className = 'w-11 h-11 border-2 border-[#E5E7EB] rounded-lg flex items-center justify-center text-[14px] font-code text-[#9CA3AF] bg-[#F3F4F6]';
      } else {
        // Not checked yet
        className = 'w-11 h-11 border-2 border-[#DC2626] rounded-lg flex items-center justify-center text-[14px] font-code text-[#DC2626] bg-[#FEF2F2]';
      }

      box.className = className;
      box.textContent = value;
      searchContainer.appendChild(box);
    });

    stepCounter.textContent = 'Step ' + stepCount;
  }

  function checkCurrentIndex() {
    stepCount++;
    const value = array[currentIndex];

    if (String(value) === target) {
      found = true;
      finished = true;
      nextBtn.disabled = true;
      searchMessage.textContent = 'Found "' + target + '" at index ' + currentIndex + '! Search complete.';
    } else if (currentIndex === array.length - 1) {
      finished = true;
      nextBtn.disabled = true;
      searchMessage.textContent = '"' + target + '" was not found after checking every item. Search complete.';
    } else {
      searchMessage.textContent = 'Index ' + currentIndex + ' is "' + value + '" — not a match. Click "Check Next" to continue.';
    }

    render();
  }

  startBtn.addEventListener('click', function () {
    const value = searchValueInput.value.trim();

    if (value === '') {
      searchMessage.textContent = 'Enter a value to search for first.';
      return;
    }

    target = value;
    currentIndex = 0;
    found = false;
    finished = false;
    nextBtn.disabled = false;

    checkCurrentIndex();
  });

  nextBtn.addEventListener('click', function () {
    if (finished) return;

    currentIndex++;
    checkCurrentIndex();
  });

  render();

});