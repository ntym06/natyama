const blocks = document.querySelectorAll('.float-text .lang');
const buttons = document.querySelectorAll('.lang-switch button');
const body = document.body;

// 言語ごとの色設定
const langColors = {
  en: { bg: [238,243,250], fg: [20,40,80] },
  ja: { bg: [246,241,231], fg: [60,30,10] },
  de: { bg: [255,255,255], fg: [50,50,50] }
};

// ブラウザ言語で初期表示
let userLang = navigator.language || navigator.userLanguage;
userLang = userLang.toLowerCase();

let lang = 'en';
if(userLang.startsWith('de')) lang = 'de';
else if(userLang.startsWith('ja')) lang = 'ja';

showLang(lang);

// 切替ボタン
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.dataset.lang;
    showLang(lang);
  });
});

function showLang(lang) {
  blocks.forEach(b => b.classList.remove('active'));
  document.querySelector('.lang.'+lang).classList.add('active');

  const {bg, fg} = langColors[lang];
  body.style.background = `rgb(${bg[0]},${bg[1]},${bg[2]})`;
  document.querySelector('.float-text').style.color = `rgba(${fg[0]},${fg[1]},${fg[2]},0.35)`;
}

// 背景の刻々変化
function animateBackground() {
  const now = new Date();
  const seconds = now.getHours()*3600 + now.getMinutes()*60 + now.getSeconds();
  const daySeconds = 24*3600;
  const t = (seconds % daySeconds)/daySeconds;

  const {bg} = langColors[document.querySelector('.float-text .lang.active').classList[1]];
  const delta = [5,5,5];
  const [r,g,b] = bg.map((v,i)=>Math.round(v + Math.sin(t*2*Math.PI)*delta[i]));

  body.style.background = `rgb(${r},${g},${b})`;

  requestAnimationFrame(animateBackground);
}

animateBackground();
