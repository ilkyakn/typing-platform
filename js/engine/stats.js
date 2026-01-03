/* ================================
   STATS ENGINE
   (Calculates typing statistics)
   ================================ */

/*
  Kurallar:
  - Kelime karşılaştırması sıra bazlıdır
  - Büyük/küçük harf önemsizdir
  - Noktalama işaretleri yok sayılır
*/

function normalizeWord(word) {
  return word
    .toLowerCase()
    .replace(/[.,!?;:()"']/g, "");
}

function calculateStats(typingData) {
  const referenceWords = typingData.referenceWords;
  const typedWords = typingData.typedWords;
  const keystrokes = typingData.keystrokes;

  let correct = 0;
  let wrong = 0;
  let missed = 0;

  const maxLen = Math.max(referenceWords.length, typedWords.length);

  for (let i = 0; i < maxLen; i++) {
    const refWord = referenceWords[i];
    const typedWord = typedWords[i];

    if (typedWord === undefined) {
      missed++;
      continue;
    }

    if (refWord === undefined) {
      wrong++;
      continue;
    }

    const normalizedRef =
      window.spellingMode === "imlasiz" ? normalizeWord(refWord) : refWord;

    const normalizedTyped =
      window.spellingMode === "imlasiz" ? normalizeWord(typedWord) : typedWord;

    if (normalizedRef === normalizedTyped) {
      correct++;
    } else {
      wrong++;
    }
  }

  return {
    correct,
    wrong,
    missed,
    keystrokes
  };
}

/* Dışarıya aç */
window.calculateStats = calculateStats;
