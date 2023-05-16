import { voiceCommandFunctions } from "./handleVoiceCommands.js";



// Create speech recognition object
const recognition = new webkitSpeechRecognition();

// Set language to English
recognition.lang = 'en-US';

// Flag to track if voice commands are enabled
let voiceCommandsEnabled = false;

// Event handler for result event
recognition.onresult = async (event) => {
  const transcript = event.results[0][0].transcript;
  console.log('Recognized english words:', transcript);

  const sequence1 = "Hey cookmate";
  const sequence2 = "hey cookmate";
  
  if (!voiceCommandsEnabled) {
    if (transcript.includes(sequence1) || transcript.includes(sequence2)) {
      // Enable voice commands
      voiceCommandsEnabled = true;
      speak("Voice commands are activated. To deactivate say okay cook mate.");
    }
  } else {
    
    if(transcript.includes(sequence1) || transcript.includes(sequence2)){
      speak("Voice commands are already activated.");
      return; 
    }
    // Handle voice commands here
    await voiceCommandFunctions.handleVoiceCommand(transcript);

    // Check if the user said the phrase to end voice commands
    const endPhrase1 = "OK cookmate";
    const endPhrase2 = "ok cookmate";
    if (transcript.includes(endPhrase1) || transcript.includes(endPhrase2)) {
      // Disable voice commands
      voiceCommandsEnabled = false;
      speak("Voice commands are deactivated. To activate them say hey cook mate.");
    }

  }
};

// Event handler for error event
recognition.onerror = (event) => {
  console.error('Speech recognition error:', event.error);
};

recognition.onend = () => {
  console.log("Speech ended detecting again");
  recognition.start();
}

// Request microphone permission
navigator.mediaDevices.getUserMedia({ audio: true })
  .then(() => {
    // Permission granted, start speech recognition
    recognition.start();
  })
  .catch((error) => {
    console.error('Error accessing microphone:', error);
  });

// Function to speak the response
function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US'; // Set the language to english
  const voices = window.speechSynthesis.getVoices();
  const englishVoice = voices.find((voice) => voice.lang === 'en-US');
  if (englishVoice ) {
    utterance.voice = englishVoice ; // Set the voice to a english voice if available
  }
  window.speechSynthesis.speak(utterance);
}