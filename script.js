const blocks = document.querySelectorAll('.lang');
const labels = document.querySelectorAll('.lang-labels span');
const floatText = document.getElementById('floatText');

const colors = {
  en: { bg: 'rgb(238,243,250)', fg: 'rgba(70,75,85,0.55)' },
  ja: { bg: 'rgb(246,241,231)', fg: 'rgba(80,70,60,0.55)' },
  de: { bg: 'rgb(250,250,250)', fg: 'rgba(90,90,90,0.5)' }
};

function showLang(lang) {
  blocks.forEach(b => b.classList.remove('active'));

  const active = document.querySelector('.lang.' + lang);
  if (!active) return;

  active.classList.add('active');
  active.style.color = colors[lang].fg;
  document.body.style.backgroundColor = colors[lang].bg;

  // 溶けをリセット
  floatText.style.opacity = 1;
  floatText.style.filter = 'blur(0px)';
}

// 初期言語（ブラウザ）
const initial =
  navigator.language.startsWith('ja') ? 'ja' :
  navigator.language.startsWith('de') ? 'de' : 'en';

showLang(initial);

// クリック切替
labels.forEach(label => {
  label.addEventListener('click', () => {
    showLang(label.dataset.lang);
  });
});

// スクロールでふわっと消える
window.addEventListener('scroll', () => {
  const t = Math.min(window.scrollY / 400, 1);
  floatText.style.opacity = 1 - t;
  floatText.style.filter = `blur(${t * 5}px)`;
});
