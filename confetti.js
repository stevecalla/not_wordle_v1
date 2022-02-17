
let animateConfetti = document.querySelector('#confetti');

function createConfetti() {
    for (let i = 0; i < 20; i++) {
      animateConfetti.innerHTML += `<div class='confetti'></div>`;
    }
  setTimeout(() => {
    for (let i = 0; i < 20; i++) {
      animateConfetti.innerHTML = ``;
    }
  }, 5000);
}