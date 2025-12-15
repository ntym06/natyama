const card = document.getElementById("card");

let t = 0;

function drift() {
  t += 0.01;

  const y = Math.sin(t) * 4;
  const x = Math.cos(t * 0.7) * 2;

  card.style.transform = `translate(${x}px, ${y}px)`;
  requestAnimationFrame(drift);
}

drift();
