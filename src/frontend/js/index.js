// JS file for the frontend

const navbar = document.getElementById('navbar');
const heatbutton = document.getElementById('heatbutton');
const defrostbutton = document.getElementById('defrostbutton');
const presetsbutton = document.getElementById('presetsbutton');

const heatdefrostinterface = document.getElementById('heatinterface');
const presetsinterface = document.getElementById('presetsinterface');

const startBtn = document.getElementById('startBtn');
const clearBtn = document.getElementById('clearBtn');
const addMoreTimeBtnLeft = document.getElementById('addMoreTimeBtnLeft');
const addMoreTimeBtnRight = document.getElementById('addMoreTimeBtnRight');
const subMoreTimeBtnLeft = document.getElementById('subMoreTimeBtnLeft');
const subMoreTimeBtnRight = document.getElementById('subMoreTimeBtnRight');
const modifierBtn1 = document.getElementById('modifierBtn1');
const modifierBtn2 = document.getElementById('modifierBtn2');
const lcdText = document.getElementById('lcdText');

const heatTimer = document.getElementById('heatTimer');
const timerBtnContainers = document.querySelectorAll('.timerBtnContainer');
const stopgocontainer = document.getElementById('stopgocontainer');

let state = 0; // 0-heat, 1-defrost, 2-presets
let colors = ["#FF7D05", "#05A5FF", "#DA05FD"]; // the colors of the buttons in the navbar in each state
let action = ["REHEAT", "DEFROST", "PRESET"]
let actsLikeStart = true;
let pausedState = false;
let minutesLeft = 0;
let secondsLeft = 0;
let timeout = null;

const amount = 20; // amount to darken the background color of the element 

function darkenColor(hexColor, amount) {
    // Remove the "#" character if present
    hexColor = hexColor.replace("#", "");
  
    // Convert the hex color to RGB
    const r = parseInt(hexColor.substring(0, 2), 16);
    const g = parseInt(hexColor.substring(2, 4), 16);
    const b = parseInt(hexColor.substring(4, 6), 16);
  
    // Calculate the darkened RGB values
    const darkenedR = Math.max(r - amount, 0);
    const darkenedG = Math.max(g - amount, 0);
    const darkenedB = Math.max(b - amount, 0);
  
    // Convert the darkened RGB values back to hex
    const darkenedHexColor = `#${darkenedR.toString(16)}${darkenedG.toString(16)}${darkenedB.toString(16)}`;
  
    return darkenedHexColor;
}

function lightenColor(hexColor, amount) {
    // Remove the "#" character if present
    hexColor = hexColor.replace("#", "");
  
    // Convert the hex color to RGB
    const r = parseInt(hexColor.substring(0, 2), 16);
    const g = parseInt(hexColor.substring(2, 4), 16);
    const b = parseInt(hexColor.substring(4, 6), 16);
  
    // Calculate the lightened RGB values
    const darkenedR = Math.max(r + amount, 0);
    const darkenedG = Math.max(g + amount, 0);
    const darkenedB = Math.max(b + amount, 0);
  
    // Convert the darkened RGB values back to hex
    const darkenedHexColor = `#${darkenedR.toString(16)}${darkenedG.toString(16)}${darkenedB.toString(16)}`;
  
    return darkenedHexColor;
}

function rgbToHex(rgb) {

    rgb = rgb.replace("rgb(", "").replace(")", "").split(", ")

    const toHex = (value) => {
      const hex = value.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    };
  
    const red = toHex(parseInt(rgb[0]));
    const green = toHex(parseInt(rgb[1]));
    const blue = toHex(parseInt(rgb[2]));
  
    return `#${red}${green}${blue}`;
}

function getRemainingTimeInClockFormat(minutesLeft, secondsLeft) {
    let outMinutesLeft = minutesLeft;
    let outSecondsLeft = secondsLeft;
    if (minutesLeft < 10) {
        outMinutesLeft = "0" + minutesLeft;
    }
    if (secondsLeft < 10) {
        outSecondsLeft = "0" + secondsLeft;
    }
    return `${outMinutesLeft}:${outSecondsLeft}`;
}

function subtractOneSecond(){
    // Decrease the time by 1 second:
    if(minutesLeft > 0 || secondsLeft > 0){
        // If secondsLeft is 0, reset it to 59 and decrease minutesLeft by 1:
        if(secondsLeft == 0){
            secondsLeft = 59;
            if(minutesLeft != 0){
                minutesLeft -= 1;   
            }
        } else {
            secondsLeft -= 1;
        }
        lcdText.innerHTML = getRemainingTimeInClockFormat(minutesLeft, secondsLeft);        
    }
}

// Simulate on touchstart and touchend events on all 'clickable' elements:

const clickables = document.querySelectorAll('.clickable');

// For all clickable elements reduce and increase the background color on touchstart and touchend respectively:

clickables.forEach((clickable) => {
    clickable.addEventListener('touchstart', () => {
        clickable.style.backgroundColor = darkenColor(rgbToHex(window.getComputedStyle(clickable).backgroundColor), amount)
    });
    
    clickable.addEventListener('touchend', () => {
        clickable.style.backgroundColor = lightenColor(rgbToHex(window.getComputedStyle(clickable).backgroundColor), amount)
    });
});

// Navigation bar mechancis:

heatbutton.addEventListener('click', () => {
    // Make bg color orange:
    heatbutton.style.backgroundColor = "#FF7D05";
    defrostbutton.style.backgroundColor = "#D9D9D9";
    presetsbutton.style.backgroundColor = "#D9D9D9";
    // Make text color white and bold:
    heatbutton.style.color = "#FFFFFF";
    heatbutton.style.fontWeight = "bold";
    heatbutton.style.borderBottom = "none";
    heatbutton.style.borderLeft = "none";

    defrostbutton.style.color = "#959494";
    defrostbutton.style.fontWeight = "normal";
    defrostbutton.style.borderBottom = "5px solid #B3B3B3";
    
    presetsbutton.style.color = "#959494";
    presetsbutton.style.fontWeight = "normal";
    presetsbutton.style.borderBottom = "5px solid #B3B3B3";
    presetsbutton.style.borderRight = "5px solid #B3B3B3";

    // Change UI to Reheat UI.
    heatdefrostinterface.style.display = "flex";
    presetsinterface.style.display = "none";

    state = 0;
});

defrostbutton.addEventListener('click', () => {
    // Make bg color blue:
    heatbutton.style.backgroundColor = "#D9D9D9";
    defrostbutton.style.backgroundColor = "#05A5FF";
    presetsbutton.style.backgroundColor = "#D9D9D9";
    // Make text color white and bold:
    heatbutton.style.color = "#959494";
    heatbutton.style.fontWeight = "normal";
    heatbutton.style.borderBottom = "5px solid #B3B3B3";
    heatbutton.style.borderLeft = "5px solid #B3B3B3";
    
    defrostbutton.style.color = "#FFFFFF";
    defrostbutton.style.fontWeight = "bold";
    defrostbutton.style.borderBottom = "none";
    
    presetsbutton.style.color = "#959494";
    presetsbutton.style.fontWeight = "normal";
    presetsbutton.style.borderBottom = "5px solid #B3B3B3";
    presetsbutton.style.borderRight = "5px solid #B3B3B3";
    // Change UI to Defrost UI.
    heatdefrostinterface.style.display = "flex";
    presetsinterface.style.display = "none";

    state = 1;
});

presetsbutton.addEventListener('click', () => {
    // Make bg color orange:
    heatbutton.style.backgroundColor = "#D9D9D9";
    defrostbutton.style.backgroundColor = "#D9D9D9";
    presetsbutton.style.backgroundColor = "#DA05FD";
    // Make text color white and bold:
    heatbutton.style.color = "#959494";
    heatbutton.style.fontWeight = "normal";
    heatbutton.style.borderBottom = "5px solid #B3B3B3";
    heatbutton.style.borderLeft = "5px solid #B3B3B3";
    
    defrostbutton.style.color = "#959494";
    defrostbutton.style.fontWeight = "normal";
    defrostbutton.style.borderBottom = "5px solid #B3B3B3";
    
    presetsbutton.style.color = "#FFFFFF";
    presetsbutton.style.fontWeight = "bold";
    presetsbutton.style.borderBottom = "none";
    presetsbutton.style.borderRight = "none";
    // Change UI to Presets UI.
    heatdefrostinterface.style.display = "none";
    presetsinterface.style.display = "flex";
    
    state = 2;
});

// Timer UI backend:

addMoreTimeBtnLeft.addEventListener('click', () => {
    // Increase the time by 1 minute:
    minutesLeft += 1;
    lcdText.innerHTML = getRemainingTimeInClockFormat(minutesLeft, secondsLeft);
});

addMoreTimeBtnRight.addEventListener('click', () => {
    // Increase the time by 1 second:
    secondsLeft += 1;
    // If secondsLeft is 60, reset it to 0 and increase minutesLeft by 1:
    if(secondsLeft == 60){
        secondsLeft = 0;
        minutesLeft += 1;
    }
    lcdText.innerHTML = getRemainingTimeInClockFormat(minutesLeft, secondsLeft);
});

subMoreTimeBtnLeft.addEventListener('click', () => {
    // Decrease the time by 1 minute:
    if(minutesLeft != 0){
        minutesLeft -= 1;
        lcdText.innerHTML = getRemainingTimeInClockFormat(minutesLeft, secondsLeft);        
    }
});

subMoreTimeBtnRight.addEventListener('click', () => {
    // Decrease the time by 1 second:
    if(minutesLeft > 0 || secondsLeft > 0){
        // If secondsLeft is 0, reset it to 59 and decrease minutesLeft by 1:
        if(secondsLeft == 0){
            secondsLeft = 59;
            if(minutesLeft != 0){
                minutesLeft -= 1;   
            }
        } else {
            secondsLeft -= 1;
        }
        lcdText.innerHTML = getRemainingTimeInClockFormat(minutesLeft, secondsLeft);        
    }
});

modifierBtn1.addEventListener('click', () => {
    // Increase secondsLeft by 30:
    secondsLeft += 30;
    if(secondsLeft >= 60){
        secondsLeft -= 60;
        minutesLeft += 1;
    }
    lcdText.innerHTML = getRemainingTimeInClockFormat(minutesLeft, secondsLeft);        
});

modifierBtn2.addEventListener('click', () => {
    // Increase minutesLeft by 1:
    minutesLeft += 1;
    lcdText.innerHTML = getRemainingTimeInClockFormat(minutesLeft, secondsLeft);        
});

clearBtn.addEventListener('click', () => {
    // Reset the timer:
    if(timeout != null){
        clearTimeout(timeout);
        timeout = null;
        revertToNormalUI();
    }   
    minutesLeft = 0;
    secondsLeft = 0;
    lcdText.innerHTML = getRemainingTimeInClockFormat(minutesLeft, secondsLeft); 
    revertToNormalUI();
});

startBtn.addEventListener('click', () => {
    // Start the timer:
    if(actsLikeStart){
        startCountdown();
        cheangeToCountdownUI();
    } else {
        pausedState = !pausedState;
        if(pausedState){
            clearTimeout(timeout);
            timeout = null;
            startBtn.innerHTML = "RESUME";
            // enable blinking:
            enableBlinkingText();
        } else {
            startCountdown();
            startBtn.innerHTML = "PAUSE";
            // disable blinking:
            disableBlinkingText();
        }   
    }
    
});

function startCountdown(){
    timeout = setTimeout(() => {
        // Decrease secondsLeft by 1:
        subtractOneSecond();
        if(minutesLeft > 0 || secondsLeft > 0){
            startCountdown();
        } else {
            revertToNormalUI();
        }
    }, 1000);
}

function enableBlinkingText(){
    lcdText.classList.add("blink");    
}

function disableBlinkingText(){
    lcdText.classList.remove("blink");
}

// Prepare the interface for the countdown:
/*
    1) Make heatTimer height equal to the timer's.
    2) Make timerBtn containers display="none".
    3) Hide the modifier buttons.
    4) make the start button become pause.

*/

function cheangeToCountdownUI(){
    heatTimer.style.height = "14vh";
    timerBtnContainers.forEach((element) => {
        element.style.display = "none";
    });
    modifierBtn1.style.display = "none";
    modifierBtn2.style.display = "none";

    stopgocontainer.style.gap = "5vw";
    
    startBtn.innerHTML = "PAUSE";
    startBtn.style.backgroundColor = "#D9D9D9";
    startBtn.style.color = "black";
    startBtn.style.width = "40vw";
    actsLikeStart = !actsLikeStart;

    clearBtn.innerHTML = "CANCEL";
    clearBtn.style.width = "40vw";
    pausedState = false;
    disableNavigationBar();
}

function revertToNormalUI(){
    heatTimer.style.height = "24vh";
    timerBtnContainers.forEach((element) => {
        element.style.display = "flex";
    });
    modifierBtn1.style.display = "flex";
    modifierBtn2.style.display = "flex";

    stopgocontainer.style.gap = "10vw";

    startBtn.innerHTML = "START";
    startBtn.style.backgroundColor = "#6FCC79";
    startBtn.style.color = "white";
    startBtn.style.width = "33.8vw";
    actsLikeStart = !actsLikeStart;

    clearBtn.innerHTML = "CLEAR";
    clearBtn.style.width = "33.8vw";

    pausedState = false;
    disableBlinkingText();
    enableNavigationBar();
}

function disableNavigationBar(){
    heatbutton.style.display = "none";
    defrostbutton.style.display = "none";
    presetsbutton.style.display = "none";

    const textContainer = document.createElement('div');
    textContainer.innerHTML = `${action[state]} IN PROGRESS...`
    textContainer.style.backgroundColor = colors[state];
    textContainer.style.color = "white";
    textContainer.style.borderBottomLeftRadius = "20px";
    textContainer.style.borderBottomRightRadius = "20px";
    textContainer.style.borderLeft = "5px solid #B3B3B3;"
    textContainer.style.borderRight = "5px solid #B3B3B3;"    
    textContainer.style.borderBottom = "5px solid #B3B3B3;"    
    navbar.appendChild(textContainer)
}

function enableNavigationBar(){
    heatbutton.style.display = "flex";
    defrostbutton.style.display = "flex";
    presetsbutton.style.display = "flex";

    navbar.removeChild(navbar.lastChild);
}