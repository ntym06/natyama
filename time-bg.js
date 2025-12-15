(function () {
  const hour = new Date().getHours();
  let bg = "#ffffff";
  let text = "#000000";

  if (hour >= 5 && hour < 10) {
    // morning
    bg = "#f5f5f2";
  } else if (hour >= 10 && hour < 17) {
    // day
    bg = "#ffffff";
  } else if (hour >= 17 && hour < 20) {
    // evening
    bg = "#f0ede8";
  } else {
    // night
    bg = "#0e0e0e";
    text = "#f2f2f2";
  }

  document.body.style.backgroundColor = bg;
  document.body.style.color = text;
})();
