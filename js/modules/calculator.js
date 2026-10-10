window.BloodRadar = window.BloodRadar || {};

window.BloodRadar.Calculator = (function() {
  let currentCalculatorMode = 'WHOLE_BLOOD';
  let currentSelectedGroup = 'A+';

  function init() {
    const chips = document.querySelectorAll('.chip-btn');
    const modeButtons = document.querySelectorAll('.mode-toggle-btn');
    const donateList = document.getElementById('matrix-donate-list');
    const receiveList = document.getElementById('matrix-receive-list');
    const noteBox = document.getElementById('calc-note-text');
    const currentSelectedLabel = document.getElementById('calc-selected-group');

    if (!chips.length || !donateList || !receiveList) return;

    const donateCountBadge = document.getElementById('donate-count-badge');
    const receiveCountBadge = document.getElementById('receive-count-badge');

    function renderCompatibility() {
      const modeData = window.BloodRadar.COMPATIBILITY_DATA[currentCalculatorMode] || window.BloodRadar.COMPATIBILITY_DATA['WHOLE_BLOOD'];
      const data = modeData[currentSelectedGroup];
      if (!data) return;

      if (currentSelectedLabel) {
        currentSelectedLabel.textContent = currentSelectedGroup;
      }

      if (donateCountBadge) {
        const count = data.canDonateTo.length;
        donateCountBadge.textContent = `${count} ${count === 1 ? 'Group' : 'Groups'}`;
      }

      donateList.innerHTML = data.canDonateTo.map(item => {
        const isSpecial = item.includes('Universal') || item.includes('All');
        return `<span class="matrix-pill ${isSpecial ? 'highlight-emerald' : 'highlight-red'}">${item}</span>`;
      }).join('');

      if (receiveCountBadge) {
        const count = data.canReceiveFrom.length;
        receiveCountBadge.textContent = `${count} ${count === 1 ? 'Group' : 'Groups'}`;
      }

      receiveList.innerHTML = data.canReceiveFrom.map(item => {
        const isSpecial = item.includes('Universal') || item.includes('Everyone');
        return `<span class="matrix-pill ${isSpecial ? 'highlight-emerald' : ''}">${item}</span>`;
      }).join('');

      if (noteBox) {
        noteBox.textContent = data.note;
      }
    }

    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentSelectedGroup = chip.getAttribute('data-bg');
        renderCompatibility();
      });
    });

    modeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        modeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCalculatorMode = btn.getAttribute('data-mode') || 'WHOLE_BLOOD';
        renderCompatibility();
      });
    });

    renderCompatibility();
  }

  return { init };
})();
