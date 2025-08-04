const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const translateBtn = document.getElementById("translateBtn");
const fromLang = document.getElementById("fromLang");
const toLang = document.getElementById("toLang");

const copyBtn = document.getElementById("copyBtn");
const speakInputBtn = document.getElementById("speakInput");
const speakOutputBtn = document.getElementById("speakOutput");
const micBtn = document.getElementById("micBtn");

const apiKey = 'YOUR_RAPIDAPI_KEY'; // Replace with your key

async function translateText() {
    const text = inputText.value.trim();
    if (!text) return alert("Please enter some text");

    try {
        const response = await fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', {
            method: 'POST',
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'Accept-Encoding': 'application/gzip',
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
            },
            body: new URLSearchParams({
                q: text,
                source: fromLang.value === "auto" ? "" : fromLang.value,
                target: toLang.value
            })
        });

        const result = await response.json();
        if (result.data && result.data.translations[0]) {
            outputText.value = result.data.translations[0].translatedText;
        } else {
            alert("Translation failed. Please try again.");
        }
    } catch (error) {
        alert("Translation failed. Check your API key or internet connection.");
        console.error(error);
    }
}

translateBtn.addEventListener("click", translateText);

// 🎤 Voice input
micBtn.addEventListener("click", () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = fromLang.value || 'en';
    recognition.onresult = (event) => {
        inputText.value = event.results[0][0].transcript;
    };
    recognition.start();
});

// 🔊 Text-to-speech for input and output
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
}

speakInputBtn.addEventListener("click", () => {
    speak(inputText.value);
});
speakOutputBtn.addEventListener("click", () => {
    speak(outputText.value);
});

// 📋 Copy translated text
copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(outputText.value)
        .then(() => alert("Copied to clipboard!"))
        .catch(() => alert("Failed to copy."));
});
