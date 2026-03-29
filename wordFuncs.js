const wordSelect = document.getElementById("select-word");
const sentenceDisplay = document.getElementById("sentence-textarea");
const wordSpeakButton = document.getElementById("word-speak-button");
const sentenceSpeakButton = document.getElementById("sentence-speak-button");

wordSelect.addEventListener("change", syncSentence);

[wordSpeakButton, sentenceSpeakButton].forEach(button => {
    button.addEventListener("click", function() {
        const index = wordSelect.selectedIndex
        if (index > 0) {
            let option = wordSelect.options[index]
            let text = option.value;
            if (button === sentenceSpeakButton) text = option.dataset.sentence;
            speak(text);
        }
    });
 });


function speak(textToSay) {
    const message = new SpeechSynthesisUtterance(textToSay);
    message.pitch = 1.2;
    message.rate = 1.0;
    window.speechSynthesis.speak(message);
} 

function syncSentence() {
    const index = wordSelect.selectedIndex
    if (index > 0) {
        const selectedOption = wordSelect.options[index];
        sentenceDisplay.value = selectedOption.dataset.sentence;
    }
    else sentenceDisplay.value = "Please select a word!";
}