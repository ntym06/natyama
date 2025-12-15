document.addEventListener('DOMContentLoaded', () => {

  const langs = document.querySelectorAll('.lang');
  const labels = document.querySelectorAll('.lang-labels span');
  const floatText = document.querySelector('.float-text');
  const body = document.body;

  if (!langs.length) return;

  const colors = {
    en: [238,243,250],
    ja: [246,241,231],
    de: [255,255,255]
  };

  function setLang(lang) {
    langs.forEach(el => el.classList.remove('active'));
    const target = document.querySelector('.lang.' + lang);
    if (!target) return;

    target.classList.add('active');

    const bg = colors[lang];
    body.style.backgroundColor = `rgb(${bg[0]},${bg[1]},${bg[2]})`;

    // 溶けた状態から戻す
    floatText.style.opacity = 1;
    floatText.style.filter = 'blur(0px)';
  }

  // 初期言語
  const browserLang =
    navigator.language.startsWith('ja') ? 'ja' :
    navigator.language.startsWith('de') ? 'de' :
    'en';

  setLang(browserLang);

  // クリック切替
  labels.forEach(label => {
    label.addEventListener('click', () => {
      setLang(label.dataset.lang);
    });
  });

  // スクロールで溶ける
  window.addEventListener('scroll', () => {
    const t = Math.min(window.scrollY / 400, 1);
    floatText.style.opacity = 1 - t;
    floatText.style.filter = `blur(${t * 6}px)`;
  });

});
