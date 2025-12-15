/* ==========================
   Language-based gradient & motion
   ========================== */

document.addEventListener('DOMContentLoaded', () => {

  const blocks = document.querySelectorAll('.float-text .lang');
  const labels = document.querySelectorAll('.lang-labels span');
  const floatText = document.querySelector('.float-text');
  const body = document.body;

  if (!blocks.length || !floatText) return;

  /* 言語ごとの色設定 */
  const langColors = {
    en: { bg: [238, 243, 250], fg: [20, 40, 80] },
    ja: { bg: [246, 241, 231], fg: [60, 30, 10] },
    de: { bg: [255, 255, 255], fg: [50, 50, 50] }
  };

  /* ブラウザ言語から初期判定 */
  let userLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
  let lang = 'en';

  if (userLang.startsWith('de')) lang = 'de';
  else if (userLang.startsWith('ja')) lang = 'ja';

  /* 言語切替処理 */
  function showLang(selectedLang) {
    if (!langColors[selectedLang]) return;

    blocks.forEach(b => b.classList.remove('active'));
    const activeBlock = document.querySelector('.lang.' + selectedLang);
    if (activeBlock) activeBlock.classList.add('active');

    const { bg, fg } = langColors[selectedLang];

    body.style.background = `rgb(${bg[0]}, ${bg[1]}, ${bg[2]})`;
    floatText.style.color = `rgba(${fg[0]}, ${fg[1]}, ${fg[2]}, 0.35)`;

    lang = selectedLang;
  }

  /* 初期表示 */
  showLang(lang);

  /* ラベルクリックで言語切替 */
  labels.forEach(label => {
    label.addEventListener('click', () => {
      const selected = label.dataset.lang;
      showLang(selected);
    });
  });

  /* 背景のゆるやかな時間変化 */
  function animateBackground() {
    const now = new Date();
    const seconds =
      now.getHours() * 3600 +
      now.getMinutes() * 60 +
      now.getSeconds() +
      now.getMilliseconds() / 1000;

    const daySeconds = 24 * 3600;
    const t = (seconds % daySeconds) / daySeconds;

    const active = document.querySelector('.lang.active');
    if (active) {
      const activeLang = [...active.classList].find(c => c !== 'lang' && c !== 'active');

      const { bg } = langColors[activeLang];

      const delta = [6, 6, 6];
      const r = Math.round(bg[0] + Math.sin(t * Math.PI * 2) * delta[0]);
      const g = Math.round(bg[1] + Math.sin(t * Math.PI * 2 + 1) * delta[1]);
      const b = Math.round(bg[2] + Math.sin(t * Math.PI * 2 + 2) * delta[2]);

      body.style.background = `rgb(${r}, ${g}, ${b})`;
    }

    requestAnimationFrame(animateBackground);
  }

  anima
