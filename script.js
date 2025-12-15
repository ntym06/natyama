const blocks = document.querySelectorAll('.text-box .lang');
const label = document.querySelector('.lang-label');
const floatText = document.querySelector('.float-text');
const studioName = document.querySelector('.studio-name');
const afterScroll = document.querySelector('.after-scroll');
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
  label.style.color = `rgba(${fg[0]},${fg[1]},${fg[2]},0.35)`;
  label.textContent = lang.toUpperCase();
}

// 初期表示
showLang(lang);

// スクロールで本文にじみ消失 & イメージ表示
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const maxScroll = 500; 
  const t = Math.min(scrollY / maxScroll, 1);

  floatText.querySelector('.text-box').style.filter = `blur(${t*4}px)`;
  floatText.querySelector('.text-box').style.opacity = 1 - t;

  // タイトル・ラベルも微妙に変化（透明度は減らさず色で柔らかく）
  const alpha = 0.85 - t*0.25; 
  studioName.style.color = `rgba(20,40,80,${alpha})`;
  label.style.color = `rgba(20,40,80,${alpha*0.5})`;

  // イメージ表示
  if(t >= 1){
    afterScroll.style.display = 'block';
    afterScroll.style.opacity = 1;
  } else {
    afterScroll.style.display = 'none';
    afterScroll.style.opacity = 0;
  }
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
