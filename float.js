const card = document.getElementById("card");

let t = 0;

function float() {
  t += 0.01;
  const y = Math.sin(t) * 6;
  card.style.transform = `translateY(${y}px)`;
  requestAnimationFrame(float);
}

float();
