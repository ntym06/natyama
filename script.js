const body = document.body;

// 基準色（RGB）
const colors = [
  { hour: 0, color: [255,255,255] },     // 白
  { hour: 6, color: [238,243,250] },     // 朝淡い青
  { hour: 12, color: [200,225,255] },    // 昼青
  { hour: 18, color: [246,241,231] },    // 夕クリーム
  { hour: 24, color: [255,255,255] }     // 深夜ループ
];

function interpolateColor(c1, c2, t) {
  return c1.map((v,i) => Math.round(v + (c2[i]-v)*t));
}

function updateBackground() {
  const now = new Date();
  const h = now.getHours() + now.getMinutes()/60;
  
  // 現在の時間に近い2つの基準色を探す
  let i = 0;
  while (i < colors.length-1 && h >= colors[i+1].hour) i++;
  const c1 = colors[i].color;
  const c2 = colors[i+1].color;
  const t = (h - colors[i].hour)/(colors[i+1].hour - colors[i].hour);
  
  const [r,g,b] = interpolateColor(c1,c2,t);
  body.style.background = `rgb(${r},${g},${b})`;
  
  requestAnimationFrame(updateBackground);
}

updateBackground();
