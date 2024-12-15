// narrator.js
export const playNarration = (text, rate = 0.9, pitch = 1) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
  
    // Set voice and speed
    utterance.rate = rate;
    utterance.pitch = pitch;
  
    // Select a female voice
    const voices = synth.getVoices();
    const femaleVoice = voices.find((voice) =>
      voice.name.toLowerCase().includes("female") || voice.name.includes("Natasha")
    );
    if (femaleVoice) utterance.voice = femaleVoice;
  
    // Ensure voices are loaded before speaking
    if (voices.length > 0) {
      synth.speak(utterance);
    } else {
      synth.onvoiceschanged = () => {
        const updatedVoices = synth.getVoices();
        const updatedFemaleVoice = updatedVoices.find((voice) =>
          voice.name.toLowerCase().includes("female") || voice.name.includes("Natasha")
        );
        if (updatedFemaleVoice) utterance.voice = updatedFemaleVoice;
        synth.speak(utterance);
      };
    }
  };
  