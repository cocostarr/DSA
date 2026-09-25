document.addEventListener('DOMContentLoaded', function () {

  // ---------- The actual linked list structure ----------
  // Each node is a plain object: { value: ..., next: nodeOrNull }
  let head = null;
  let stepCount = 0;

  // Traversal state (used only by the Traverse tab)
  let traverseCurrent = null;
  let traverseStarted = false;

  // ---------- Shared elements ----------
  const listMessage = document.getElementById('list-message');
  const listContainer = document.getElementById('list-container');
  const stepCounter = document.getElementById('step-counter');

  // ---------- Tabs ----------
  const tabs = {
    inserthead: document.getElementById('tab-inserthead'),
    inserttail: document.getElementById('tab-inserttail'),
    delete: document.getElementById('tab-delete'),
    traverse: document.getElementById('tab-traverse')
  };
  const panels = {
    inserthead: document.getElementById('panel-inserthead'),
    inserttail: document.getElementById('panel-inserttail'),
    delete: document.getElementById('panel-delete'),
    traverse: document.getElementById('panel-traverse')
  };

  // ---------- Operation controls ----------
  const headValue = document.getElementById('head-value');
  const headBtn = document.getElementById('head-btn');

  const tailValue = document.getElementById('tail-value');
  const tailBtn = document.getElementById('tail-btn');

  const deleteValue = document.getElementById('delete-value');
  const deleteBtn = document.getElementById('delete-btn');

  const traverseStartBtn = document.getElementById('traverse-start-btn');
  const traverseNextBtn = document.getElementById('traverse-next-btn');

  // ---------- Draw the list on screen ----------
  function render() {
    listContainer.innerHTML = '';

    let node = head;
    while (node !== null) {
      const isHighlighted = traverseStarted && node === traverseCurrent;

      const box = document.createElement('div');
      box.className = isHighlighted
        ? 'border-2 border-[#7C3AED] rounded-lg px-3 py-2 text-[14px] font-code text-white bg-[#7C3AED]'
        : 'border-2 border-[#7C3AED] rounded-lg px-3 py-2 text-[14px] font-code text-[#7C3AED]';
      box.textContent = node.value;
      listContainer.appendChild(box);

      const arrow = document.createElement('span');
      arrow.className = 'text-[#7C3AED] font-bold text-[15px]';
      arrow.textContent = '→';
      listContainer.appendChild(arrow);

      node = node.next;
    }

    const nullLabel = document.createElement('span');
    nullLabel.className = 'text-[13px] font-code text-[#9CA3AF]';
    nullLabel.textContent = 'NULL';
    listContainer.appendChild(nullLabel);

    stepCounter.textContent = 'Step ' + stepCount;
  }

  // ---------- Switch between tabs ----------
  function switchTab(name) {
    Object.keys(tabs).forEach(function (key) {
      const isActive = key === name;
      tabs[key].classList.toggle('border-[#7C3AED]', isActive);
      tabs[key].classList.toggle('text-[#7C3AED]', isActive);
      tabs[key].classList.toggle('border-transparent', !isActive);
      tabs[key].classList.toggle('text-[#9CA3AF]', !isActive);
      panels[key].classList.toggle('hidden', !isActive);
    });

    // Leaving the Traverse tab resets its progress
    if (name !== 'traverse') {
      traverseStarted = false;
      traverseCurrent = null;
      traverseNextBtn.disabled = true;
    }

    listMessage.textContent = '';
    render();
  }

  tabs.inserthead.addEventListener('click', function () { switchTab('inserthead'); });
  tabs.inserttail.addEventListener('click', function () { switchTab('inserttail'); });
  tabs.delete.addEventListener('click', function () { switchTab('delete'); });
  tabs.traverse.addEventListener('click', function () { switchTab('traverse'); });

  // ---------- INSERT HEAD ----------
  headBtn.addEventListener('click', function () {
    const value = headValue.value.trim();

    if (value === '') {
      listMessage.textContent = 'Enter a value to insert.';
      return;
    }

    const newNode = { value: value, next: head };
    head = newNode;

    stepCount++;
    listMessage.textContent = 'Inserted "' + value + '" at the head. It now points to the old first node.';
    headValue.value = '';
    render();
  });

  // ---------- INSERT TAIL ----------
  tailBtn.addEventListener('click', function () {
    const value = tailValue.value.trim();

    if (value === '') {
      listMessage.textContent = 'Enter a value to insert.';
      return;
    }

    const newNode = { value: value, next: null };

    if (head === null) {
      head = newNode;
    } else {
      let node = head;
      while (node.next !== null) {
        node = node.next;
      }
      node.next = newNode;
    }

    stepCount++;
    listMessage.textContent = 'Inserted "' + value + '" at the tail.';
    tailValue.value = '';
    render();
  });

  // ---------- DELETE (by value) ----------
  deleteBtn.addEventListener('click', function () {
    const value = deleteValue.value.trim();

    if (value === '') {
      listMessage.textContent = 'Enter a value to delete.';
      return;
    }

    if (head === null) {
      listMessage.textContent = 'The list is empty — nothing to delete.';
      return;
    }

    // Special case: deleting the head itself
    if (String(head.value) === value) {
      head = head.next;
      stepCount++;
      listMessage.textContent = 'Deleted "' + value + '" — it was the head. The next node is now the head.';
      deleteValue.value = '';
      render();
      return;
    }

    // Walk the list looking one node ahead, so we can relink around the match
    let node = head;
    while (node.next !== null && String(node.next.value) !== value) {
      node = node.next;
    }

    if (node.next === null) {
      listMessage.textContent = '"' + value + '" was not found in the list.';
      return;
    }

    node.next = node.next.next;
    stepCount++;
    listMessage.textContent = 'Deleted "' + value + '" — its neighbors were reconnected around it.';
    deleteValue.value = '';
    render();
  });

  // ---------- TRAVERSE ----------
  traverseStartBtn.addEventListener('click', function () {
    if (head === null) {
      listMessage.textContent = 'The list is empty — nothing to traverse.';
      return;
    }

    traverseStarted = true;
    traverseCurrent = head;
    traverseNextBtn.disabled = false;
    stepCount++;
    listMessage.textContent = 'Starting at the head: "' + traverseCurrent.value + '"';
    render();
  });

  traverseNextBtn.addEventListener('click', function () {
    if (traverseCurrent === null || traverseCurrent.next === null) {
      listMessage.textContent = 'Reached the end of the list (NULL). Traversal complete.';
      traverseCurrent = null;
      traverseNextBtn.disabled = true;
      render();
      return;
    }

    traverseCurrent = traverseCurrent.next;
    stepCount++;
    listMessage.textContent = 'Moved to next node: "' + traverseCurrent.value + '"';
    render();
  });

  // ---------- Init: start with a small pre-built list ----------
  head = { value: 'A', next: { value: 'B', next: { value: 'C', next: null } } };
  render();

});