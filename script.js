const board = document.getElementById("game-board");
const moveCount = document.getElementById("move-count");
const winMessage = document.getElementById("win-message");
const restartBtn = document.getElementById("restart-btn");
const successSound = document.getElementById("success-sound");

let symbols = ["🍎", "🍌", "🍇", "🍓", "🍍", "🍑", "🥝", "🍉"];
let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matchedPairs = 0;

function initGame() {
  board.innerHTML = "";
  winMessage.style.display = "none";
  restartBtn.style.display = "none";
  document.getElementById("confetti").innerHTML = "";

  moves = 0;
  matchedPairs = 0;
  moveCount.textContent = moves;

  cards = [...symbols, ...symbols];
  cards.sort(() => Math.random() - 0.5);

  cards.forEach(symbol => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.symbol = symbol;
    card.textContent = symbol;
    card.style.color = "transparent";

    card.addEventListener("click", () => {
      if (lockBoard || card.classList.contains("revealed") || card === firstCard) return;

      card.classList.add("revealed");
      card.style.color = "#000";

      if (!firstCard) {
        firstCard = card;
      } else {
        secondCard = card;
        lockBoard = true;
        moves++;
        moveCount.textContent = moves;

        if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
          matchedPairs++;
          successSound.play();
          resetTurn();

          if (matchedPairs === symbols.length) {
            winMessage.style.display = "block";
            restartBtn.style.display = "inline-block";
            showConfetti();
          }
        } else {
          setTimeout(() => {
            firstCard.classList.remove("revealed");
            secondCard.classList.remove("revealed");
            firstCard.style.color = "transparent";
            secondCard.style.color = "transparent";
            resetTurn();
          }, 1000);
        }
      }
    });

    board.appendChild(card);
  });
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

function showConfetti() {
  const confettiContainer = document.getElementById("confetti");
  confettiContainer.innerHTML = "";
  for (let i = 0; i < 50; i++) {
    const dot = document.createElement("span");
    dot.style.left = Math.random() * 100 + "vw";
    dot.style.top = "0px";
    dot.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
    confettiContainer.appendChild(dot);
  }
}

restartBtn.addEventListener("click", initGame);
initGame();
