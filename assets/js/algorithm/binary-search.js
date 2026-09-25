document.addEventListener('DOMContentLoaded', function () {

  const array = [2, 5, 9, 14, 21]; // must stay sorted for binary search to work
  let target = null;
  let low = -1;
  let high = -1;
  let mid = -1;
  let found = false;
  let finished = false;
  let stepCount = 0;

  const searchValueInput = document.getElementById('search-value');
  const startBtn = document.getElementById('start-btn');
  const nextBtn = document.getElementById('next-btn');
  const searchMessage = document.getElementById('search-message');
  const stepCounter = document.getElementById('step-counter');
  const searchContainer = document.getElementById('search-container');
  const pointerLabels = document.getElementById('pointer-labels');

  function render() {
    searchContainer.innerHTML = '';
    pointerLabels.innerHTML = '';

    array.forEach(function (value, index) {
      // ---------- The value box ----------
      const box = document.createElement('div');
      const outOfRange = low !== -1 && (index < low || index > high);

      if (found && index === mid) {
        box.className = 'w-11 h-11 border-2 border-[#059669] rounded-lg flex items-center justify-center text-[14px] font-code text-white bg-[#059669]';
      } else if (index === mid && !finished) {
        box.className = 'w-11 h-11 border-2 border-[#DC2626] rounded-lg flex items-center justify-center text-[14px] font-code text-white bg-[#DC2626]';
      } else if (outOfRange || (finished && !found)) {
        box.className = 'w-11 h-11 border-2 border-[#E5E7EB] rounded-lg flex items-center justify-center text-[14px] font-code text-[#9CA3AF] bg-[#F3F4F6]';
      } else if (low === -1) {
        box.className = 'w-11 h-11 border-2 border-[#E5E7EB] rounded-lg flex items-center justify-center text-[14px] font-code text-[#9CA3AF]';
      } else {
        // Still within the current search range, just not the midpoint
        box.className = 'w-11 h-11 border-2 border-[#DC2626] rounded-lg flex items-center justify-center text-[14px] font-code text-[#DC2626] bg-[#FEF2F2]';
      }
      box.textContent = value;
      searchContainer.appendChild(box);

      // ---------- The L / M / H label above it ----------
      const label = document.createElement('div');
      label.className = 'w-11 text-center text-[10px] font-bold font-ui text-[#DC2626]';
      if (!finished && index === low && index === mid) {
        label.textContent = 'L,M';
      } else if (!finished && index === high && index === mid) {
        label.textContent = 'M,H';
      } else if (!finished && index === mid) {
        label.textContent = 'M';
      } else if (!finished && index === low) {
        label.textContent = 'L';
      } else if (!finished && index === high) {
        label.textContent = 'H';
      } else {
        label.textContent = '';
      }
      pointerLabels.appendChild(label);
    });

    stepCounter.textContent = 'Step ' + stepCount;
  }

  function checkMid() {
    stepCount++;
    mid = Math.floor((low + high) / 2);
    const value = array[mid];

    if (String(value) === target) {
      found = true;
      finished = true;
      nextBtn.disabled = true;
      searchMessage.textContent = 'Found "' + target + '" at index ' + mid + '! Search complete.';
    } else if (low > high) {
      finished = true;
      nextBtn.disabled = true;
      searchMessage.textContent = '"' + target + '" is not in the list. Search complete.';
    } else if (Number(target) < value) {
      searchMessage.textContent = 'Middle is "' + value + '" — target is smaller, so search the left half.';
      high = mid - 1;
    } else {
      searchMessage.textContent = 'Middle is "' + value + '" — target is bigger, so search the right half.';
      low = mid + 1;
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
    low = 0;
    high = array.length - 1;
    found = false;
    finished = false;
    nextBtn.disabled = false;

    checkMid();
  });

  nextBtn.addEventListener('click', function () {
    if (finished) return;

    if (low > high) {
      finished = true;
      nextBtn.disabled = true;
      searchMessage.textContent = '"' + target + '" is not in the list. Search complete.';
      render();
      return;
    }

    checkMid();
  });

  render();

});