
document.addEventListener('DOMContentLoaded', function () {

  let array = [5, 12, 8, 3, 19];
  let stepCount = 0;
  let highlightIndex = null; // which index to visually highlight after an operation

  // ---------- Shared elements ----------
  const arrayMessage = document.getElementById('array-message');
  const arrayContainer = document.getElementById('array-container');
  const stepCounter = document.getElementById('step-counter');

  // ---------- Tabs ----------
  const tabs = {
    access: document.getElementById('tab-access'),
    insert: document.getElementById('tab-insert'),
    delete: document.getElementById('tab-delete'),
    search: document.getElementById('tab-search')
  };
  const panels = {
    access: document.getElementById('panel-access'),
    insert: document.getElementById('panel-insert'),
    delete: document.getElementById('panel-delete'),
    search: document.getElementById('panel-search')
  };

  // ---------- Operation controls ----------
  const accessIndex = document.getElementById('access-index');
  const accessBtn = document.getElementById('access-btn');

  const insertValue = document.getElementById('insert-value');
  const insertPosition = document.getElementById('insert-position');
  const insertBtn = document.getElementById('insert-btn');

  const deletePosition = document.getElementById('delete-position');
  const deleteBtn = document.getElementById('delete-btn');

  const searchValue = document.getElementById('search-value');
  const searchBtn = document.getElementById('search-btn');

  // ---------- Draw the array on screen ----------
  function render() {
    arrayContainer.innerHTML = '';

    array.forEach(function (value, index) {
      const isHighlighted = index === highlightIndex;

      const wrapper = document.createElement('div');
      wrapper.className = 'flex flex-col items-center gap-1';

      const cell = document.createElement('div');
      cell.className = isHighlighted
        ? 'w-12 h-12 border-2 border-[#3B82F6] rounded-lg flex items-center justify-center text-[15px] font-code text-white bg-[#3B82F6]'
        : 'w-12 h-12 border-2 border-[#3B82F6] rounded-lg flex items-center justify-center text-[15px] font-code text-[#3B82F6]';
      cell.textContent = value;

      const indexLabel = document.createElement('span');
      indexLabel.className = 'text-[10px] font-code text-[#9CA3AF]';
      indexLabel.textContent = index;

      wrapper.appendChild(cell);
      wrapper.appendChild(indexLabel);
      arrayContainer.appendChild(wrapper);
    });

    stepCounter.textContent = 'Step ' + stepCount;
  }

  // ---------- Switch between tabs ----------
  function switchTab(name) {
    Object.keys(tabs).forEach(function (key) {
      const isActive = key === name;
      tabs[key].classList.toggle('border-[#3B82F6]', isActive);
      tabs[key].classList.toggle('text-[#3B82F6]', isActive);
      tabs[key].classList.toggle('border-transparent', !isActive);
      tabs[key].classList.toggle('text-[#9CA3AF]', !isActive);
      panels[key].classList.toggle('hidden', !isActive);
    });

    highlightIndex = null;
    arrayMessage.textContent = '';
    render();
  }

  tabs.access.addEventListener('click', function () { switchTab('access'); });
  tabs.insert.addEventListener('click', function () { switchTab('insert'); });
  tabs.delete.addEventListener('click', function () { switchTab('delete'); });
  tabs.search.addEventListener('click', function () { switchTab('search'); });

  // ---------- ACCESS ----------
  accessBtn.addEventListener('click', function () {
    const index = parseInt(accessIndex.value, 10);

    if (isNaN(index) || index < 0 || index >= array.length) {
      highlightIndex = null;
      arrayMessage.textContent = 'Enter a valid index between 0 and ' + (array.length - 1) + '.';
      render();
      return;
    }

    highlightIndex = index;
    stepCount++;
    arrayMessage.textContent = 'array[' + index + '] = ' + array[index];
    render();
  });

  // ---------- INSERT ----------
  insertBtn.addEventListener('click', function () {
    const value = insertValue.value.trim();
    const position = parseInt(insertPosition.value, 10);

    if (value === '') {
      arrayMessage.textContent = 'Enter a value to insert.';
      return;
    }
    if (isNaN(position) || position < 0 || position > array.length) {
      arrayMessage.textContent = 'Enter a valid position between 0 and ' + array.length + '.';
      return;
    }

    array.splice(position, 0, value);
    highlightIndex = position;
    stepCount++;
    arrayMessage.textContent = 'Inserted "' + value + '" at position ' + position + '. Items after it shifted right.';
    insertValue.value = '';
    insertPosition.value = '';
    render();
  });

  // ---------- DELETE ----------
  deleteBtn.addEventListener('click', function () {
    const position = parseInt(deletePosition.value, 10);

    if (isNaN(position) || position < 0 || position >= array.length) {
      arrayMessage.textContent = 'Enter a valid position between 0 and ' + (array.length - 1) + '.';
      return;
    }

    const removed = array.splice(position, 1)[0];
    highlightIndex = null;
    stepCount++;
    arrayMessage.textContent = 'Deleted "' + removed + '" from position ' + position + '. Items after it shifted left.';
    deletePosition.value = '';
    render();
  });

  // ---------- SEARCH ----------
  searchBtn.addEventListener('click', function () {
    const value = searchValue.value.trim();

    if (value === '') {
      arrayMessage.textContent = 'Enter a value to search for.';
      return;
    }

    const foundIndex = array.findIndex(function (item) {
      return String(item) === value;
    });

    stepCount++;

    if (foundIndex === -1) {
      highlightIndex = null;
      arrayMessage.textContent = '"' + value + '" was not found in the array.';
    } else {
      highlightIndex = foundIndex;
      arrayMessage.textContent = 'Found "' + value + '" at index ' + foundIndex + '.';
    }

    render();
  });

  // ---------- Init ----------
  render();

});