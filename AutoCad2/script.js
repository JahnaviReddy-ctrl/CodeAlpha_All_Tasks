document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("chat-form");
  const input = document.getElementById("question-input");
  const chatBox = document.getElementById("chat-box");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const question = input.value.trim();
    if (!question) return;

    // Display user message
    appendMessage("You", question, "right");

    // Clear input field
    input.value = "";

    // Send question to backend
    try {
      const res = await fetch("/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await res.json();
      const answer = data.answer || "Sorry, I couldn't understand that.";
      appendMessage("Bot", answer, "left");
    } catch (err) {
      appendMessage("Bot", "Server error. Please try again.", "left");
    }
  });

  function appendMessage(sender, text, align) {
    const message = document.createElement("div");
    message.className = `message ${align}`;
    message.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatBox.appendChild(message);
    chatBox.scrollTop = chatBox.scrollHeight;
  }
});
