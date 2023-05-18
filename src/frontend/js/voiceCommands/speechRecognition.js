import { voiceCommandFunctions } from "./handleVoiceCommands.js";

//enable voice commands 
const sequence1 = "OK microwave";
const sequence2 = "ok microwave";
const sequence3 = "Okay microwave";
const sequence4 = "okay microwave";
//end voice commands 
const endPhrase1 = "deactivate";
const endPhrase2 = "Deactivate";

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

  
  if (!voiceCommandsEnabled) {
    if (transcript.includes(sequence1) || transcript.includes(sequence2) || transcript.includes(sequence3) || transcript.includes(sequence4)) {
      // Enable voice commands
      voiceCommandsEnabled = true;
      speak("Voice commands are activated. To deactivate voice commands say 'deactivate'.");
    }
  } else {
    //check if user retries to activate voice commands 
    if(transcript.includes(sequence1) || transcript.includes(sequence2) || transcript.includes(sequence3) || transcript.includes(sequence4)){
      speak("Voice commands are already activated.");
      return; 
    }

    // Check if the user said the phrase to end voice commands
    if (transcript.includes(endPhrase1) || transcript.includes(endPhrase2)) {
      // Disable voice commands
      voiceCommandsEnabled = false;
      speak("Voice commands are deactivated. To activate them say 'okay microwave'.");
      return; 
    }

    // Handle voice commands here
    const intent = await voiceCommandFunctions.extractIntent(transcript);
    if(intent == 'invalid'){
      speak("Command was not recognized try again");
      return; 
    }
    // handle intent screen and UI 
    let args = voiceCommandFunctions.figureMetric(intent, transcript);
   

    if(args == null  && intent != 'cancel'){
      speak("You need to provide appropriate metric for: " + intent + " operation");
      return; 
    }

    handleIntent(args);
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

function handleIntent(args){

  // User feedback has been recorded, reload the sleep timer.
  reloadSleepTimer();

  switch (args.intent) {
    case 'reheat':
      // Announce intent.
      speak(args.command);
      switchToReheatUI();
      if(args.minutes == 0 && args.seconds == 0){
        speak("The time needs to be set greater than 0 minutes and 0 seconds. Try again.");
        return;
      } else if(args.minutes < 0 || args.seconds < 0){
        speak("The time cannot be set to negative. Try again.");
        return;
      }
      minutesLeft = parseInt(args.minutes);
      secondsLeft = parseInt(args.seconds);
      refreshTimerDisplay();
      // Delay for 1 second.
      setTimeout(() => {
        speak("Starting in 3 seconds...");
        // Delay for 3 seconds.
        setTimeout(() => {
          startTimer();
        }, 5000);
      }, 1000);
      break;
    case 'defrost':
      // Announce intent.
      speak(args.command);
      switchToDefrostUI();
      if(args.minutes == 0 && args.seconds == 0){
        speak("The time needs to be set greater than 0 minutes and 0 seconds. Try again.");
        return;
      } else if(args.minutes < 0 || args.seconds < 0){
        speak("The time cannot be set to negative. Try again.");
        return;
      }
      minutesLeft = parseInt(args.minutes);
      secondsLeft = parseInt(args.seconds);
      refreshTimerDisplay();
      // Delay for 1 second.
      setTimeout(() => {
        speak("Starting in 3 seconds...");
        // Delay for 3 seconds.
        setTimeout(() => {
          startTimer();
        }, 5000);
      }, 1000);
      break;
    case 'watt':
      switchToPowerUI();
      if(args.watt <  wattageLOW || args.watt > wattageHIGH){
        speak("The power needs to be set greater than 600 watts and less than 1200 watts. Try again.");
        return;
      }
      // Announce intent.
      speak(args.command);
      wattage = parseInt(args.watt);
      refreshPowerDisplay();
      break;
    case 'cancel':
      if (inProgress) {
        speak("Cancelling.");
        clearTimer();
      } else {
        speak("There is no operation to cancel.");
      }
      break;
    case 'resume':
      if(inProgress){
        speak("Resuming.");
        resumeTimer();
      } else {
        speak("There is no operation to resume.");
      }
      break;
    case 'pause':
      if(inProgress){
        speak("Pausing.");
        pauseTimer();
      } else {
        speak("There is no operation to pause.");
      }
      break;
  }
}