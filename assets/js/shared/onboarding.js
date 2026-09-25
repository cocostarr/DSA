// Shows a short, skippable welcome tour on a visitor's first page load,
// and lets them replay it anytime via the "?" button in the navbar.

document.addEventListener('DOMContentLoaded', function () {

  const overlay = document.getElementById('tour-overlay');
  const iconEl = document.getElementById('tour-icon');
  const titleEl = document.getElementById('tour-title');
  const bodyEl = document.getElementById('tour-body');
  const dotsEl = document.getElementById('tour-dots');
  const skipBtn = document.getElementById('tour-skip-btn');
  const nextBtn = document.getElementById('tour-next-btn');
  const helpBtn = document.getElementById('tour-help-btn');

  if (!overlay) {
    // This page doesn't have the tour markup — nothing to do.
    return;
  }

  const STORAGE_KEY = 'eduviz-tour-seen';

  const steps = [
    {
      icon: '👋',
      title: 'Welcome to EduViz DSA. A New Way to Learn.',
      body: 'Learn Data Structures & Algorithms the Nigerian way with visual step-by-step examples and Pidgin explanations.'
    },
    {
      icon: '🧭',
      title: 'Navigate with the sidebar',
      body: 'Use the sidebar on the left to jump between any data structure or algorithm at any time.'
    },
    {
      icon: '🗣️',
      title: 'Toggle Pidgin anytime',
      body: 'Flip the Pidgin switch in the top right to see every explanation in Pidgin English.'
    },
    {
      icon: '🎮',
      title: 'Try it yourself',
      body: 'Every page has a hands-on box where you can Push, Pop, Search, Sort, and more right in your browser.'
    },
    {
      icon: '➡️',
      title: 'Follow the Next button',
      body: 'Prefer a guided path? Use the Next button at the bottom of each page to move through topics in the order they\'re taught.'
    }
  ];

  let currentStep = 0;

  function render() {
    const step = steps[currentStep];
    iconEl.textContent = step.icon;
    titleEl.textContent = step.title;
    bodyEl.textContent = step.body;

    dotsEl.innerHTML = '';
    steps.forEach(function (_, i) {
      const dot = document.createElement('span');
      dot.className = 'w-1.5 h-1.5 rounded-full ' + (i === currentStep ? 'bg-[#0D9488]' : 'bg-[#E5E7EB]');
      dotsEl.appendChild(dot);
    });

    nextBtn.textContent = currentStep === steps.length - 1 ? 'Get Started' : 'Next';
  }

  function show() {
    currentStep = 0;
    render();
    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
  }

  function hide() {
    overlay.classList.add('hidden');
    overlay.classList.remove('flex');
    localStorage.setItem(STORAGE_KEY, 'true');
  }

  nextBtn.addEventListener('click', function () {
    if (currentStep < steps.length - 1) {
      currentStep++;
      render();
    } else {
      hide();
    }
  });

  skipBtn.addEventListener('click', function () {
    hide();
  });

  if (helpBtn) {
    helpBtn.addEventListener('click', function () {
      show();
    });
  }

  // ---------- Init: show automatically on first-ever visit ----------
  if (!localStorage.getItem(STORAGE_KEY)) {
    show();
  }

});