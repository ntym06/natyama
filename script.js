const blocks = document.querySelectorAll('.float-text .lang');
const labels = document.querySelectorAll('.lang-labels span');
const floatText = document.querySelector('.float-text');
const studioName = document.querySelector('.studio-name');
const body = document.body;

// 言語ごとの色設定
const langColors = {
  en: { bg: [238,243,250], fg: [20,40,80] },
  ja: { bg: [246,241,231], fg: [60,30,10] },
  de: { bg: [255,255,255], fg: [50,50,50] }
};

// ブラウザ言語判定
let userLang = navigator.language || navigator.userLanguage;
userLang = userLang.toLowerCase();
let lang = 'en';
if(userLang.startsWith('de')) lang = 'de';
else if(userLang.startsWith('ja')) lang = 'ja';

// 表示更新関数
function showLang(lang) {
  blocks.forEach(b => b.classList.remove('active'));
  document.querySelector('.lang.'+lang).classList.add('active');

  const {bg, fg} = langColors[lang];
  floatText.querySelector('.text-box').style.color = `rgba(${fg[0]},${fg[1]},${fg[2]},0.85)`;
  studioName.style.color = `rgba(${fg[0]},${fg[1]},${fg[2]},0.85)`;
  labels.forEach(span => {
    span.style.color = `rgba(${fg[0]},${fg[1]},${fg[2]},0.35)`;
    span.style.display = (span.dataset.lang === lang) ? 'inline' : 'none';
  });
}

// 初期表示
showLang(lang);

// 背景・文字色を時間経過で緩やかに変化（ユーザーが切替なくても）
function animateColors() {
  const now = new Date();
  const t = (Date.now() % (60*1000*5)) / (60*1000*5); // 5分で1周期

  const {bg, fg} = langColors[lang];
  const delta = [5,5,5]; // わずかな変化
  const r = Math.round(bg[0] + Math.sin(t*2*Math.PI)*delta[0]);
  const g = Math.round(bg[1] + Math.sin(t*2*Math.PI)*delta[1]);
  const b = Math.round(bg[2] + Math.sin(t*2*Math.PI)*delta[2]);
  body.style.background = `rgb(${r},${g},${b})`;

  const fr = Math.round(fg[0] + Math.sin(t*2*Math.PI)*delta[0]);
  const fgc = Math.round(fg[1] + Math.sin(t*2*Math.PI)*delta[1]);
  const fb = Math.round(fg[2] + Math.sin(t*2*Math.PI)*delta[2]);
  floatText.querySelector('.text-box'
