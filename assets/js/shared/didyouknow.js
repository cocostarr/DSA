// animates the progress bar in sync, and renders clickable dots.
document.addEventListener('DOMContentLoaded', function () {

  const facts = [
    'Donald Knuth first formally defined algorithms in his 1968 book <strong class="text-[#111827]">"The Art of Computer Programming"</strong>, which is still a gold-standard reference today.',
    'The word "algorithm" comes from <strong class="text-[#111827]">Al-Khwarizmi</strong>, a 9th-century Persian mathematician whose name was Latinized into "algorismus."',
    'A single Google search touches <strong class="text-[#111827]">dozens of data structures</strong> : hash tables, trees, and graphs before you see a result.',
    'Binary search was first published in <strong class="text-[#111827]">1946</strong>, but the first bug-free version wasn\'t written until 1962.',
    'Stacks power your browser\'s <strong class="text-[#111827]">back button</strong>. Every page you visit gets pushed on, and going back pops it off.',
    'Bubble Sort is rarely used in production — it\'s <strong class="text-[#111827]">O(n²)</strong>, but it remains one of the best sorts for teaching comparison and swapping.',
    'Linked lists were introduced in <strong class="text-[#111827]">1955–56</strong> as part of the IPL (Information Processing Language), one of the earliest AI programming languages.',
    'Every time you undo (Ctrl+Z) in an app, you\'re using a <strong class="text-[#111827]">stack</strong> behind the scenes to remember your last actions.'
  ];

  const dykText = document.getElementById('dyk-text');
  const dykBar = document.getElementById('dyk-bar');
  const dykDots = document.getElementById('dyk-dots');

  const ROTATE_MS = 10000; // matches the 10s CSS keyframe (dyk-fill)
  let currentIndex = 0;
  let intervalId = null;

  if (!dykText || !dykBar || !dykDots) {
    // Elements not on this page nothing to do.
    return;
  }

  // ---------- Build the dots ----------
  function renderDots() {
    dykDots.innerHTML = '';
    facts.forEach(function (_, i) {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', 'Show fact ' + (i + 1));
      dot.className =
        'w-1.5 h-1.5 rounded-full transition-colors duration-200 ' +
        (i === currentIndex ? 'bg-[#0D9488]' : 'bg-[#99F6E4]');
      dot.addEventListener('click', function () {
        goToFact(i);
        restartTimer(); // clicking resets the countdown
      });
      dykDots.appendChild(dot);
    });
  }

  // ---------- Restart the progress bar animation ----------
  function restartBarAnimation() {
    dykBar.classList.remove('is-animating');
    dykBar.style.width = '0%';
    // Force a reflow so the browser "notices" the class was removed,
    // otherwise re-adding it immediately won't restart the animation.
    void dykBar.offsetWidth;
    dykBar.classList.add('is-animating');
  }

  // ---------- Show a given fact ----------
  function goToFact(index) {
    currentIndex = index;
    dykText.innerHTML = facts[currentIndex];
    renderDots();
    restartBarAnimation();
  }

  // ---------- Advance to the next fact ----------
  function nextFact() {
    const next = (currentIndex + 1) % facts.length;
    goToFact(next);
  }

  // ---------- Timer controls ----------
  function startTimer() {
    intervalId = setInterval(nextFact, ROTATE_MS);
  }

  function restartTimer() {
    if (intervalId) clearInterval(intervalId);
    startTimer();
  }

  // ---------- Init ----------
  goToFact(0);
  startTimer();

});