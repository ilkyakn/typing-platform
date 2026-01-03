/* ================================
   DURATION CONFIG
   (Time options for typing tests)
   ================================ */

/*
  value: saniye cinsinden süre
  active: FAZ 1'de aktif mi?
*/

const DURATIONS = [
  {
    id: "1min",
    label: "1 dk",
    value: 60,
    active: false
  },
  {
    id: "3min",
    label: "3 dk",
    value: 180,
    active: true   // FAZ 1 varsayılan
  },
  {
    id: "5min",
    label: "5 dk",
    value: 300,
    active: false
  },
  {
    id: "10min",
    label: "10 dk",
    value: 600,
    active: false
  },
  {
    id: "30min",
    label: "30 dk",
    value: 1800,
    active: false
  },
  {
    id: "infinite",
    label: "Süresiz",
    value: null,   // null = süresiz
    active: false
  }
];

/* Varsayılan süre */
const DEFAULT_DURATION = DURATIONS.find(d => d.active === true);

/* Dışarıya aç */
window.DURATIONS = DURATIONS;
window.DEFAULT_DURATION = DEFAULT_DURATION;
