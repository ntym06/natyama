const hour = new Date().getHours();
const body = document.body;

/*
  朝   5–10  真っ白
  昼  10–17  淡いブルー
  夕  17–21  クリーム
  夜  21–5   ほんのりブルーグレー
*/

if (hour >= 5 && hour < 10) {
  body.style.background = "#ffffff";
} else if (hour >= 10 && hour < 17) {
  body.style.background = "#eef3fa";
} else if (hour >= 17 && hour < 21) {
  body.style.background = "#f6f1e7";
} else {
  body.style.background = "#e9edf3";
}
