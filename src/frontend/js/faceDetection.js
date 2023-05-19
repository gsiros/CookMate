
// Facial Recognition

const overlayAlwaysOnDisplay = document.getElementById('overlayAlwaysOnDisplay');
const alwaysOnDisplay = document.getElementById('alwaysOnDisplay');
const alwaysonTime = document.getElementById('alwaysonTime');
const unlockBtn = document.getElementById('unlockBtn');

// Import custom API to enable voice command analyzing according to display state (locked-unlocked)
import {customVoiceAPI} from './voiceCommands/speechRecognition.js';

let sleepTimer = null; 
let unlocked = false;
const sleepInterval = 30000; // 30 seconds
const scanForFaceInterval = 1000; // 1 second

let videoElement = null; 
let model = null; 
let stream = null;

const loadModel = async () => {
	//ask user for video permissions 
	console.log("Getting user media");
	stream = await navigator.mediaDevices.getUserMedia({video: true});

	if(!videoElement){
		videoElement = document.createElement('video'); 
		videoElement.srcObject = stream;
		// Safari configuration (Safari on iOS needs autoplay, playsInline and muted to work)
		videoElement.setAttribute('autoplay', '');
    	videoElement.setAttribute('muted', '');
    	videoElement.setAttribute('playsinline', '');
		await videoElement.play(); 
	}	 

	//load the model 
	if(!model){
		console.log("Loading model");
		model = await blazeface.load(); 
	}

	unlocked = false;
}

loadModel().then(() => {
	console.log("Loaded model successfully");
	closeSplashScreen();
	loadUI();
	turnOnAlwaysOnDisplay();
	detectFaces();
}).catch(err => {
	console.log("Error: " + err + " while loading model");
	closeSplashScreen();
	loadUI(); 
	turnOffAlwaysOnDisplay(); 
	// Fire-up the always on display timer:
	reloadSleepTimer();
});


async function detectFaces(){
	console.log("Looking for predictions");
	const predictions = await model.estimateFaces(videoElement);

	if(predictions != 0){
		//if face is detected exit the loop
		// unlock the interface
		unlocked = true;
		console.log("Detected face exiting loop");
		turnOffAlwaysOnDisplay();
		reloadSleepTimer();
	}else{
		//if face not detected continue to ask for face
		if(!unlocked){
			// Timeout in order to not drain the computational resources of the device.
			setTimeout(() => {
				console.log("No face detected, trying again.");
				requestAnimationFrame(detectFaces)
			}, scanForFaceInterval);
		}	
	}
}



function turnOffAlwaysOnDisplay(){
	overlayAlwaysOnDisplay.style.display = "none";
	alwaysOnDisplay.style.display = "none";
	customVoiceAPI.enable();
}

function turnOnAlwaysOnDisplay(){
	overlayAlwaysOnDisplay.style.display = "block";
	alwaysOnDisplay.style.display = "block";
	customVoiceAPI.disable();
}

function updateTime() {
	function padZero(value) {
		return value.toString().padStart(2, '0');
	}
	const currentTime = new Date();
	const hours = currentTime.getHours();
	const minutes = currentTime.getMinutes();
	const formattedTime = `${hours}:${padZero(minutes)}`;
	alwaysonTime.innerHTML = formattedTime;
}

unlockBtn.addEventListener('click', () => {
	unlocked = true;
	turnOffAlwaysOnDisplay();
	reloadSleepTimer();
});

function reloadSleepTimer(){
	// Reset the timer:
	clearTimeout(sleepTimer);
	sleepTimer = setTimeout(() => {
		if(timeout == null){
			turnOnAlwaysOnDisplay();
			unlocked = false;
			if (stream) {
				detectFaces();
			}
		}
	}, sleepInterval);  
}

// Update time every second
updateTime();
setInterval(updateTime, 1000);