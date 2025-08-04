const quotes = [
  { text: "The best way to predict the future is to invent it.", author: "Alan Kay" },
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein" },
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { text: "You miss 100% of the shots you don’t take.", author: "Wayne Gretzky" },
  { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
  { text: "If you don't like something, change it. If you can't change it, change your attitude.", author: "Maya Angelou" }
];

const quoteText = document.getElementById("quote-text");
const quoteAuthor = document.getElementById("quote-author");
const newQuoteBtn = document.getElementById("new-quote");
const toggleThemeBtn = document.getElementById("toggle-theme");

function showRandomQuote() {
  const random = Math.floor(Math.random() * quotes.length);
  quoteText.textContent = `"${quotes[random].text}"`;
  quoteAuthor.textContent = `— ${quotes[random].author}`;
}

newQuoteBtn.addEventListener("click", showRandomQuote);
window.addEventListener("load", showRandomQuote);

toggleThemeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
