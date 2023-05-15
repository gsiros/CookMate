// Create speech recognition object
const recognition = new webkitSpeechRecognition();

// Set language to Greek
recognition.lang = 'el-GR';

// Flag to track if voice commands are enabled
let voiceCommandsEnabled = false;

// Event handler for result event
recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  console.log('Recognized Greek words:', transcript);

  const sequence1 = "Γεια σου φουρνάκι";
  const sequence2 = "γεια σου φουρνάκι";
  
  if (!voiceCommandsEnabled) {
    if (transcript.includes(sequence1) || transcript.includes(sequence2)) {
      // Enable voice commands
      voiceCommandsEnabled = true;
      speak("Ενεργοποιήθηκαν οι φωνητικές εντολές. Για να τις απενεργοποιήσετε πείτε: τέλος φωνητικών εντολών.");
    } else {
      // Continue listening for voice commands
      recognition.start();
    }
  } else {
    // Handle voice commands here
    // ...

    // Check if the user said the phrase to end voice commands
    const endPhrase1 = "Τέλος φωνητικών εντολών";
    const endPhrase2 = "τέλος φωνητικών εντολών";
    if (transcript.includes(endPhrase1) || transcript.includes(endPhrase2)) {
      // Disable voice commands
      voiceCommandsEnabled = false;
      speak("Οι φωνητικές εντολές έχουν απενεργοποιηθεί");
    }

    // Continue listening for voice commands
    recognition.start();
  }
};

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
  utterance.lang = 'el-GR'; // Set the language to Greek
  const voices = window.speechSynthesis.getVoices();
  const greekVoice = voices.find((voice) => voice.lang === 'el-GR');
  if (greekVoice) {
    utterance.voice = greekVoice; // Set the voice to a Greek voice if available
  }
  window.speechSynthesis.speak(utterance);
}