// Toggles Pidgin explanation boxes site-wide, and remembers the
// user's choice across page navigation using localStorage.

document.addEventListener('DOMContentLoaded', function () {

  const toggle = document.getElementById('pidgin-toggle');

  if (!toggle) {
    // This page doesn't have the toggle in its header — nothing to do.
    return;
  }

  const STORAGE_KEY = 'eduviz-pidgin-on';

  // The EN / Pidgin labels sit right beside the toggle button in the header.
  const enLabel = toggle.previousElementSibling;
  const pidginLabel = toggle.nextElementSibling;

  function applyState(isOn) {
    document.body.classList.toggle('pidgin-on', isOn);
    toggle.classList.toggle('is-on', isOn);
    toggle.setAttribute('aria-pressed', isOn ? 'true' : 'false');

    if (enLabel) {
      enLabel.classList.toggle('text-[#0D9488]', !isOn);
      enLabel.classList.toggle('text-[#9CA3AF]', isOn);
    }
    if (pidginLabel) {
      pidginLabel.classList.toggle('text-[#0D9488]', isOn);
      pidginLabel.classList.toggle('text-[#9CA3AF]', !isOn);
    }
  }

  // Restore whatever the user last chose, on every page load.
  const savedState = localStorage.getItem(STORAGE_KEY) === 'true';
  applyState(savedState);

  toggle.addEventListener('click', function () {
    const nowOn = !document.body.classList.contains('pidgin-on');
    applyState(nowOn);
    localStorage.setItem(STORAGE_KEY, nowOn);
  });

});