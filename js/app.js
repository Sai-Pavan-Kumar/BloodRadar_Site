document.addEventListener('DOMContentLoaded', () => {
  if (window.BloodRadar) {
    if (window.BloodRadar.Navigation) {
      window.BloodRadar.Navigation.init();
    }
    if (window.BloodRadar.Calculator) {
      window.BloodRadar.Calculator.init();
    }
    if (window.BloodRadar.EmailLauncher) {
      window.BloodRadar.EmailLauncher.init();
    }
  }
});
