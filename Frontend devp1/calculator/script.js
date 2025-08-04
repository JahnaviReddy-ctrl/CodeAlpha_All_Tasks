let display = document.getElementById("display");
let historyList = document.getElementById("historyList");

function append(val) {
  display.value += val;
}

function clearDisplay() {
  display.value = '';
}

function deleteLast() {
  display.value = display.value.slice(0, -1);
}

function calculate() {
  try {
    let result = eval(display.value);
    display.value = result;
    let li = document.createElement('li');
    li.textContent = result;
    historyList.appendChild(li);
  } catch {
    display.value = "Error";
  }
}

function negate() {
  display.value = parseFloat(display.value) * -1;
}

function squareRoot() {
  display.value = Math.sqrt(parseFloat(display.value));
}

function clearHistory() {
  historyList.innerHTML = '';
}

function toggleTheme() {
  document.body.classList.toggle('dark-theme');
  document.body.classList.toggle('light-theme');
}

function showAbout() {
  alert("🎀 Calculator.int — Created with love by Cutie! 💗");
}

document.getElementById("bigSettingsBtn").addEventListener("click", () => {
  document.getElementById("settingsOptions").classList.toggle("hidden");
});
// Gear click toggle
document.getElementById("gearIcon").addEventListener("click", () => {
  document.getElementById("settingsOptions").classList.toggle("hidden");
});
// Theme toggle
document.getElementById('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-theme');
  document.body.classList.toggle('light-theme');
  document.getElementById('themeToggle').textContent =
    document.body.classList.contains('dark-theme') ? '🌙' : '🌈';
});
