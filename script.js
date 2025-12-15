const blocks = document.querySelectorAll('.text-box .lang');
const labelSpans = document.querySelectorAll('.lang-labels span');
const floatText = document.querySelector('.float-text');
const studioName = document.querySelector('.studio-name');
const shapeLines = document.querySelectorAll('.shape-line');
const body = document.body;

// 言語ごとの色
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

// 表示更新
function showLang(lang) {
  blocks.forEach(b => b.classList.remove('active'));
  document.querySelector('.lang.'+lang).classList.add('active');

  const {bg, fg} = langColors[lang];
  body.style.background = `rgb(${bg[0]},${bg[1]},${bg[2]})`;
  floatText.querySelector('.text-box').style.color = `rgba(${fg[0]},${fg[1]},${fg[2]},0.85)`;

  studioName.style.color = `rgba(${fg[0]},${fg[1]},${fg[2]},0.85)`;
  labelSpans.forEach(span => span.style.color = `rgba(${fg[0]},${fg[1]},${fg[2]},0.35)`);
  labelSpans.forEach(span => span.style.display = (span.dataset.lang === lang) ? 'inline' : 'none');
}

// 初期表示
showLang(lang);

// スクロールで本文にじみ消失 & SVGを浮かび上がらせる
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const maxScroll = 500; 
  const t = Math.min(scrollY / maxScroll, 1);

  // 文字にじみ
  floatText.querySelector('.text-box').style.filter = `blur(${t*4}px)`;
  floatText.querySelector('.text-box').style.opacity = 1 - t;

  // SVG線を強調
  shapeLines.forEach(line => {
    line.style.stroke = `rgba(255,255,255,${0.05 + t*0.3})`;
    line.style.strokeWidth = `${2 + t*2}px`;
    // 微細な展開動き
    line.setAttribute('d', `M${100+t*50},300 C${200+t*20},50 ${400+t*30},550 ${500+t*40},300`);
  });
});

// 背景刻々変化
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
