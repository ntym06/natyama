document.addEventListener('DOMContentLoaded', () => {

  const langs = document.querySelectorAll('.lang');
  const labels = document.querySelectorAll('.lang-labels span');
  const textLayer = document.querySelector('.text-layer');
  const body = document.body;

  const colors = {
    en: [238,243,250],
    ja: [246,241,231],
    de: [255,255,255]
  };

  function setLang(lang) {
    langs.forEach(l => l.classList.remove('active'));
    const target = document.querySelector('.lang.' + lang);
    if (!target) return;

    target.classList.add('active');

    const bg = colors[lang];
    body.style.backgroundColor = `rgb(${bg.join(',')})`;

    // 溶け状態をリセット
    textLayer.style.opacity = 1;
    textLayer.style.filter = 'blur(0px)';
  }

  // 初期言語
  const initial =
    navigator.language.startsWith('ja') ? 'ja' :
    navigator.language.startsWith('de') ? 'de' :
    'en';

  setLang(initial);

  labels.forEach(label => {
    label.addEventListener('click', () => {
      setLang(label.dataset.lang);
    });
  });

  // スクロールで溶ける
  window.addEventListener('scroll', () => {
    const t = Math.min(window.scrollY / 400, 1);
    textLayer.style.opacity = 1 - t;
    textLayer.style.filter = `blur(${t * 6}px)`;
  });

});
