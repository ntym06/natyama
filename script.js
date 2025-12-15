const blocks = document.querySelectorAll('.text-box .lang');
const labels = document.querySelectorAll('.lang-labels span');
const floatText = document.querySelector('.float-text');
const afterScroll = document.querySelector('.after-scroll');
const body = document.body;

// 言語ごとの色
const langColors = {
  en: { bg: [238,243,250], fg: [20,40,80] },
  ja: { bg: [246,241,231], fg: [60,30,10] },
  de: { bg: [255,255,255], fg: [50,50,50] }
};

// ブラウザ言語で初期判定
let userLang = navigator.language || navigator.userLanguage;
userLang = userLang.toLowerCase();

let lang = 'en';
if(userLang.startsWith('de')) lang = 'de';
else if(userLang.startsWith('ja')) lang = 'ja';

function showLang(lang) {
  blocks.forEach(b => b.classList.remove('active'));
  document.querySelector('.lang.'+lang).classList.add('active');

  const {bg, fg} = langColors[lang];
  body.style.background = `rgb(${bg[0]},${bg[1]},${bg[2]})`;
  floatText.querySelector('.text-box').style.color = `rgba(${fg[0]},${fg[1]},${fg[2]},0.85)`;
}

// 初期表示
showLang(lang);

// 言語ラベルクリックで切替
labels.forEach(label => {
  label.addEventListener('click', () => {
    const selected = label.dataset.lang;
    showLang(selected);
  });
});

// 背景の刻々変化
function animateBackground() {
  const now = new Date();
  const seconds = now.getHours()*3600 + now.getMinutes()*60 + now.getSeconds();
  const daySeconds = 24*3600;
  const t = (seconds % daySeconds)/daySeconds;

  const activeLang = document.querySelector('.lang.active').classList[1];
  const {bg} = langColors[activeLang];
  const delta = [5,5,5];
  const [r,g,b] = bg.map((v,i)=>Math.round(v + Math.sin(t*2*Math.PI)*delta[i]));
  body.style.background = `rgb(${r},${g},${b})`;

  requestAnimationFrame(animateBackground);
}

animateBackground();

// スクロールに応じた文字のにじみ・消失 & イメージ表示
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const maxScroll = 500; 
  const t = Math.min(scrollY / maxScroll, 1);

  floatText.querySelector('.text-box').style.filter = `blur(${t*5}px)`;
  floatText.querySelector('.text-box').style.opacity = 1 - t;

  if(t >= 1) {
    afterScroll.style.display = 'block';
  } else {
    afterScroll.style.display = 'none';
  }
});
