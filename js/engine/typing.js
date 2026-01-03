/* ================================
   TYPING ENGINE
   (Tracks user input & prepares data)
   ================================ */

let referenceText = "";
let typedText = "";
let keystrokeCount = 0;
let referenceWords = [];

/* Referans metni ayarla */
function setReferenceText(text) {
  referenceText = text;
  referenceWords = text.trim().split(/\s+/);

  const referenceTextEl = document.getElementById("reference-text");
  referenceTextEl.textContent = text;
}

/* Yazılan metni güncelle */
function updateTypedText(text) {
  typedText = text;
}

/* Tuş vuruşunu artır */
function registerKeystroke() {
  keystrokeCount++;
}

/* Verileri sıfırla */
function resetTypingData() {
  typedText = "";
  keystrokeCount = 0;
  referenceWords = [];
}

/* Referans kelimeleri al */
function getReferenceWords() {
  return referenceText.split(/\s+/);
}

/* Yazılan kelimeleri al */
function getTypedWords() {
  if (typedText.trim() === "") return [];
  return typedText.trim().split(/\s+/);
}

/* Ham veriyi döndür */
function getTypingData() {
  return {
    referenceWords: getReferenceWords(),
    typedWords: getTypedWords(),
    keystrokes: keystrokeCount
  };
}

/* Dışarıya aç */
window.setReferenceText = setReferenceText;
window.updateTypedText = updateTypedText;
window.registerKeystroke = registerKeystroke;
window.resetTypingData = resetTypingData;
window.getTypingData = getTypingData;
