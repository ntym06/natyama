const body = document.body;
const buttons = document.querySelectorAll('.lang-switch button');
const blocks = document.querySelectorAll('.float-text .lang');

// 言語ごとの色設定
const langColors = {
  en: { bg: [238,243,250], fg: [20,40,80] }, // 淡い青／文字青
  ja: { bg: [246,241,231], fg: [60,30,10] }, // 夕クリーム／文字茶
  de: { bg: [255,255,255], fg: [50,50,50] }  // 白／文字グレー
};

// 初期表示
blocks.forEach(b => b.classList.remove('active'));
document.querySelector('.lang.en').classList.add('active');
setColors('en');

// 言語切替ボタン
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.dataset.lang;
    blocks.forEach(b => b.classList.remove('active'));
    document.querySelector('.lang.'+lang).classList.add('active');
    setColors(lang);
  });
});

// 背景・文字色設定
function setColors(lang) {
  const {bg, fg} = langColors[lang];
  body.style.background = `rgb(${bg[0]},${bg[1]},${bg[2]})`;
  document.querySelector('.float-text').style.color = `rgba(${fg[0]},${fg[1]},${fg[2]},0.35)`;
}

// 背景の刻々変化
function interpolateColor(c1, c2, t) {
  return c1.map((v,i) => Math.round(v + (c2[i]-v)*t));
}

function animateBackground() {
  const now = new Date();
  const seconds = now.getHours()*3600 + now.getMinutes()*60 + now.getSeconds();

  // 1日の秒数
  const daySeconds = 24*3600;
  const t = (seconds % daySeconds)/daySeconds;

  // 現在言語の背景色を少し揺らす
  const lang = document.querySelector('.float-text .lang.active').classList[1];
  const base = langColors[lang].bg;
  const delta = [5,5,5]; // 微変化
  const [r,g,b] = base.map((v,i) => Math.round(v + Math.sin(t*2*Math.PI)*delta[i]));

  body.style.background = `rgb(${r},${g},${b})`;

  requestAnimationFrame(animateBackground);
}

animateBackground();
