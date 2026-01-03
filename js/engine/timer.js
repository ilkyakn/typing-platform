/* ================================
   TIMER ENGINE
   (Handles countdown and infinite mode)
   ================================ */

let timerInterval = null;
let remainingTime = null;
let timerRunning = false;

/* Süreyi başlat */
function startTimer(durationInSeconds, onFinishCallback) {
  stopTimer(); // varsa eski timer'ı temizle

  // Süresiz mod
  if (durationInSeconds === null) {
    remainingTime = null;
    timerRunning = true;
    return;
  }

  remainingTime = durationInSeconds;
  timerRunning = true;

  timerInterval = setInterval(() => {
    remainingTime--;

    if (remainingTime <= 0) {
      stopTimer();
      if (typeof onFinishCallback === "function") {
        onFinishCallback();
      }
    }
  }, 1000);
}

/* Timer'ı durdur */
function stopTimer() {
  if (timerInterval !== null) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  timerRunning = false;
}

/* Kalan süreyi al */
function getRemainingTime() {
  return remainingTime;
}

/* Timer çalışıyor mu? */
function isTimerRunning() {
  return timerRunning;
}

/* Dışarıya aç */
window.startTimer = startTimer;
window.stopTimer = stopTimer;
window.getRemainingTime = getRemainingTime;
window.isTimerRunning = isTimerRunning;
