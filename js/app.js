/* ================================
   APP CONTROLLER
   (Binds all engines together)
   ================================ */
function toImlasizText(text) {
  return text
    .toLowerCase()
    .replace(/[.,!?;:"'()\-]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

document.addEventListener("DOMContentLoaded", () => {
  /* --------- ELEMENTS --------- */
  const referenceTextEl = document.getElementById("reference-text");
  const typingInputEl = document.getElementById("typing-input");
  const resultAreaEl = document.getElementById("result-area");

  const resultTimeEl = document.getElementById("result-time");
  const resultCorrectEl = document.getElementById("result-correct");
  const resultWrongEl = document.getElementById("result-wrong");
  const resultMissedEl = document.getElementById("result-missed");
  const resultKeystrokesEl = document.getElementById("result-keystrokes");
  const restartBtn = document.getElementById("restart-btn");
  const topCorrectEl = document.getElementById("top-correct-value");
  const topTimeEl = document.getElementById("top-time-value");
  const topCorrectPill = document.getElementById("top-correct");
  const topTimePill = document.getElementById("top-time");
  // ================================
// STAT KUTULARI – SEÇİM ENGELİ
// ================================

// Sağ tık engelle
topCorrectPill.addEventListener("contextmenu", e => e.preventDefault());
topTimePill.addEventListener("contextmenu", e => e.preventDefault());

// Kopyalama engelle
topCorrectPill.addEventListener("copy", e => e.preventDefault());
topTimePill.addEventListener("copy", e => e.preventDefault());

  const timeButtons = document.querySelectorAll(".time-btn");
  const keyboardButtons = document.querySelectorAll(".keyboard-btn");
  const timerDisplayEl = document.getElementById("timer-display");
  const fullscreenBtn = document.getElementById("fullscreen-btn");
  const textSelectEl = document.getElementById("text-select");
  function updateTimerDisplay(seconds) {
  const min = String(Math.floor(seconds / 60)).padStart(2, "0");
  const sec = String(seconds % 60).padStart(2, "0");
  topTimeEl.textContent = `${min}:${sec}`;
}

  /* --------- STATE --------- */
  let testStarted = false;
  let startTimestamp = null;
  let selectedDuration = DEFAULT_DURATION.value; // saniye veya null
  let selectedKeyboard = DEFAULT_KEYBOARD.id;
  let timerIntervalDisplay = null;
  let hideCorrectValue = false;
  let hideTimeValue = false;

  /* --------- INIT --------- */
  function loadTextById(id) {
  let textObj;

  if (id === "random") {
    textObj = getRandomText();
  } else {
    textObj = TEXTS.find(t => t.id === id);
  }

  if (!textObj) return;

  let displayText;

if (window.spellingMode === "imlasiz") {
  displayText = toImlasizText(textObj.text);
} else {
  displayText = textObj.text.trim();
}

referenceTextEl.textContent = displayText;
setReferenceText(displayText);

resetTypingData();
typingInputEl.value = "";

  typingInputEl.disabled = false;

  testStarted = false;
  resultAreaEl.hidden = true;

  // Timer reset
if (timerIntervalDisplay) {
  clearInterval(timerIntervalDisplay);
  timerIntervalDisplay = null;
}

if (selectedDuration !== null) {
  updateTimerDisplay(selectedDuration);
} else {
}

}

loadTextById("random");

  // Başlangıçta süreyi ekrana yaz
if (selectedDuration !== null) {
  updateTimerDisplay(selectedDuration);
} else {
}

  /* --------- FUNCTIONS --------- */
  function enterFullscreen() {
  const el = document.documentElement;

  if (el.requestFullscreen) {
    el.requestFullscreen();
  } else if (el.webkitRequestFullscreen) {
    el.webkitRequestFullscreen();
  } else if (el.msRequestFullscreen) {
    el.msRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}
  function finishTest() {
    if (timerIntervalDisplay) {
  clearInterval(timerIntervalDisplay);
  timerIntervalDisplay = null;
}
    typingInputEl.disabled = true;

    const typingData = getTypingData();
    const stats = calculateStats(typingData);

    const endTimestamp = Date.now();
    const elapsedSeconds = Math.floor(
      (endTimestamp - startTimestamp) / 1000
    );

    resultTimeEl.textContent =
      selectedDuration === null
        ? `${elapsedSeconds} sn (süresiz)`
        : `${selectedDuration} sn`;

    resultCorrectEl.textContent = stats.correct;
    resultWrongEl.textContent = stats.wrong;
    resultMissedEl.textContent = stats.missed;
    resultKeystrokesEl.textContent = stats.keystrokes;

    resultAreaEl.hidden = false;
    // Canlı paneli final değerlerle kilitle
topCorrectEl.textContent = stats.correct;
  }

  /* --------- EVENTS --------- */
  // ================================
// REFERANS METİN – SEÇİM ENGELİ
// ================================

// Sağ tık engelle
referenceTextEl.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

// Mouse ile seçim engelle
referenceTextEl.addEventListener("mousedown", (e) => {
  e.preventDefault();
});

// Çift tık engelle
referenceTextEl.addEventListener("dblclick", (e) => {
  e.preventDefault();
});

// Klavye ile kopyalama engelle
referenceTextEl.addEventListener("copy", (e) => {
  e.preventDefault();
});

fullscreenBtn.addEventListener("click", () => {
  if (!document.fullscreenElement) {
    enterFullscreen();
  } else {
    exitFullscreen();
  }
});

document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement) {
    fullscreenBtn.textContent = "Tam Ekrandan Çık";
  } else {
    fullscreenBtn.textContent = "Tam Ekran";
  }
});

  // Yazmaya başlanınca test başlar
typingInputEl.addEventListener("keydown", (e) => {
    if (typingInputEl.disabled) return;
    
    if (!testStarted && e.key.length === 1) {
  testStarted = true;

  timeButtons.forEach(b => b.disabled = true);
  keyboardButtons.forEach(b => b.disabled = true);

  startTimestamp = Date.now();
  startTimer(selectedDuration, finishTest);

  if (selectedDuration !== null) {
    let remaining = selectedDuration;
    updateTimerDisplay(remaining);

    timerIntervalDisplay = setInterval(() => {
      remaining--;
      updateTimerDisplay(remaining);

      if (remaining <= 0) {
        clearInterval(timerIntervalDisplay);
        timerIntervalDisplay = null;
      }
    }, 1000);
  } else {
  }
}

  if (e.key.length === 1 || e.key === "Backspace") {
    registerKeystroke();
const stats = calculateStats(getTypingData());
topCorrectEl.textContent = stats.correct;

  }
});

  // Yazı güncellendikçe takip et
  typingInputEl.addEventListener("input", (e) => {
  updateTypedText(e.target.value);
const stats = calculateStats(getTypingData());
topCorrectEl.textContent = stats.correct;

topCorrectEl.textContent = stats.correct;
});


  // Kopyala / yapıştırı engelle
  typingInputEl.addEventListener("paste", (e) => {
    e.preventDefault();
  });
  textSelectEl.addEventListener("change", (e) => {
  if (testStarted) return;

  loadTextById(e.target.value);
  testStarted = false;
});

const spellingButtons = document.querySelectorAll(".spelling-btn");

spellingButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    spellingButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    window.spellingMode = btn.dataset.mode;
    loadTextById(textSelectEl.value);
  });
});

// ================================
// SADECE DENEMEYİ SIFIRLA (AYARLARA DOKUNMA)
// ================================
function restartTestOnly() {
if (timerIntervalDisplay) {
  clearInterval(timerIntervalDisplay);
  timerIntervalDisplay = null;
}

  typingInputEl.value = "";
  typingInputEl.focus();
  typingInputEl.disabled = false;

  stopTimer();

  if (selectedDuration !== null) {
    updateTimerDisplay(selectedDuration);
  }

  resetTypingData();

  topCorrectEl.textContent = "0";   // ← ÜST DOĞRU KELİME SIFIRLAMA

  resultAreaEl.hidden = true;
  testStarted = false;
}

document.addEventListener("keydown", function (e) {
  if (e.key === "F5") {
    e.preventDefault();
    restartTestOnly();
  }
});

restartBtn.addEventListener("click", () => {
  restartTestOnly();
});

// ================================
// STAT PILL GİZLE / GÖSTER (KALICI)
// ================================

// Sayfa açılırken localStorage durumunu uygula
if (localStorage.getItem("hideCorrectValue") === "true") {
  hideCorrectValue = true;
  topCorrectPill.classList.add("hidden-value");
}

if (localStorage.getItem("hideTimeValue") === "true") {
  hideTimeValue = true;
  topTimePill.classList.add("hidden-value");
}

// Doğru kelime tıklama
topCorrectPill.addEventListener("click", () => {
  hideCorrectValue = !hideCorrectValue;
  localStorage.setItem("hideCorrectValue", hideCorrectValue);

  if (hideCorrectValue) {
    topCorrectPill.classList.add("hidden-value");
  } else {
    topCorrectPill.classList.remove("hidden-value");
  }
});

// Süre tıklama
topTimePill.addEventListener("click", () => {
  hideTimeValue = !hideTimeValue;
  localStorage.setItem("hideTimeValue", hideTimeValue);

  if (hideTimeValue) {
    topTimePill.classList.add("hidden-value");
  } else {
    topTimePill.classList.remove("hidden-value");
  }
});

});





