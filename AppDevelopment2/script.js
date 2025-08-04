let flashcards = [
  { question: "What is HTML?", answer: "HyperText Markup Language" },
  { question: "What is CSS?", answer: "Cascading Style Sheets" },
];
let currentCard = 0;
let showingAnswer = false;

function displayCard(index) {
  const questionEl = document.getElementById("question");
  const answerEl = document.getElementById("answer");

  showingAnswer = false;
  questionEl.style.display = "block";
  answerEl.style.display = "none";

  questionEl.textContent = flashcards[index].question;
  answerEl.textContent = flashcards[index].answer;
}

function toggleAnswer() {
  const questionEl = document.getElementById("question");
  const answerEl = document.getElementById("answer");

  showingAnswer = !showingAnswer;
  questionEl.style.display = showingAnswer ? "none" : "block";
  answerEl.style.display = showingAnswer ? "block" : "none";
}

function nextCard() {
  currentCard = (currentCard + 1) % flashcards.length;
  displayCard(currentCard);
}

function prevCard() {
  currentCard = (currentCard - 1 + flashcards.length) % flashcards.length;
  displayCard(currentCard);
}

function addFlashcard() {
  const q = document.getElementById("newQuestion").value.trim();
  const a = document.getElementById("newAnswer").value.trim();
  if (q && a) {
    flashcards.push({ question: q, answer: a });
    document.getElementById("newQuestion").value = "";
    document.getElementById("newAnswer").value = "";
    updateCardList();
    alert("Flashcard Added!");
  }
}

function updateCardList() {
  const list = document.getElementById("card-list");
  list.innerHTML = "";

  flashcards.forEach((card, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span><strong>${card.question}</strong> - ${card.answer}</span>
      <div>
        <button onclick="editCard(${index})">✏️</button>
        <button onclick="deleteCard(${index})">🗑</button>
      </div>`;
    list.appendChild(li);
  });
}

function editCard(index) {
  const newQ = prompt("Edit Question:", flashcards[index].question);
  const newA = prompt("Edit Answer:", flashcards[index].answer);
  if (newQ && newA) {
    flashcards[index] = { question: newQ, answer: newA };
    updateCardList();
  }
}

function deleteCard(index) {
  if (confirm("Delete this card?")) {
    flashcards.splice(index, 1);
    updateCardList();
    displayCard(currentCard = 0);
  }
}

document.getElementById("toggle-theme").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Init
window.onload = () => {
  displayCard(currentCard);
  updateCardList();
};
