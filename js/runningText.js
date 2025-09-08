// runningText.js - Running Text Effect
export function initRunningText() {
  const runningText = document.querySelector('.running-text');

  if (runningText) {
    const originalText = runningText.textContent;
    runningText.innerHTML = (originalText + ' ').repeat(2);
  }
}
