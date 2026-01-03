/* ================================
   KEYBOARD CONFIG
   (Supported keyboard layouts)
   ================================ */

/*
  id      : dahili kimlik
  label   : kullanıcıya gösterilecek ad
  active  : FAZ 1'de aktif mi?
*/

const KEYBOARDS = [
  {
    id: "F",
    label: "F Klavye",
    active: true     // FAZ 1 varsayılan
  },
  {
    id: "Q",
    label: "Q Klavye",
    active: false
  },
  {
    id: "E",
    label: "E Klavye",
    active: false
  }
];

/* Varsayılan klavye */
const DEFAULT_KEYBOARD = KEYBOARDS.find(k => k.active === true);

/* Dışarıya aç */
window.KEYBOARDS = KEYBOARDS;
window.DEFAULT_KEYBOARD = DEFAULT_KEYBOARD;
