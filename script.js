const blocks = document.querySelectorAll('.lang');
const labels = document.querySelectorAll('.lang-labels span');
const floatText = document.querySelector('.float-text');
const body = document.body;

const langColors = {
  en: { bg: [238,243,250] },
  ja: { bg: [246,241,231] },
  de: { bg: [245,245,245] }
};

// 初期言語
let lang = 'en';
const browserLang = navigator.language.toLowerCase();
if (browserLang.startsWith('ja')) lang = 'ja';
if (browserLang.startsWith('de')) lang = 'de';

function showLang(target) {
  blocks.forEach(b => b.classList.remove('active'));
  document.querySelector('.lang.' + target).classList.add('active');

  const { bg } = langColors[target];
  body.style.backgroundColor = `rgb(${bg[0]},${bg[1]},${bg[2]})`;
}

showLang(lang);

// UI 切替
labels.forEach(label => {
  label.addEventListener('click', () => {
    showLang(label.dataset.lang);
  });
});

// スクロール dissolve
window.addEventListener('scroll', () => {
  const t = Math.min(window.scrollY / 400, 1);
  floatText.style.opacity = 1 - t;
  floatText.style.filter = `blur(${t * 6}px)`;
});
