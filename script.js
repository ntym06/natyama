document.addEventListener('DOMContentLoaded', () => {

  const langs = document.querySelectorAll('.lang');
  const labels = document.querySelectorAll('.lang-labels span');
  const floatText = document.querySelector('.float-text');
  const body = document.body;

  /* 言語ごとの色 */
  const colors = {
    en: { bg: [238,243,250], fg: [20,40,80] },
    ja: { bg: [246,241,231], fg: [60,30,10] },
    de: { bg: [255,255,255], fg: [50,50,50] }
  };

  /* 言語表示切替 */
  function setLang(lang) {
    langs.forEach(el => el.classList.remove('active'));
    const active = document.querySelector('.lang.' + lang);
    if (!active) return;

    active.classList.add('active');

    const { bg, fg } = colors[lang];
    body.style.backgroundColor = `rgb(${bg.join(',')})`;
    floatText.style.color = `rgba(${fg.join(',')},0.35)`;
  }

  /* 初期言語（ブラウザ） */
  const browserLang = navigator.language.startsWith('ja')
    ? 'ja'
    : navigator.language.startsWith('de')
    ? 'de'
    : 'en';

  setLang(browserLang);

  /* クリック切替 */
  labels.forEach(label => {
    label.addEventListener('click', () => {
      setLang(label.dataset.lang);
    });
  });

  /* スクロールで「溶ける」 */
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    const max = 400;
    const t = Math.min(y / max, 1);

    floatText.style.filter = `blur(${t * 6}px)`;
    floatText.style.opacity = `${1 - t}`;
  });

});
