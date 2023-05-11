// JS file for the frontend

const heatbutton = document.getElementById('heatbutton');
const defrostbutton = document.getElementById('defrostbutton');
const presetsbutton = document.getElementById('presetsbutton');

const heatdefrostinterface = document.getElementById('heatinterface');
const presetsinterface = document.getElementById('presetsinterface');

const amount = 20; // amount to darken the background color of the element 

function darkenColor(hexColor, amount) {
    // Remove the "#" character if present
    hexColor = hexColor.replace("#", "");
  
    // Convert the hex color to RGB
    const r = parseInt(hexColor.substring(0, 2), 16);
    console.log(hexColor.substring(0, 2))
    const g = parseInt(hexColor.substring(2, 4), 16);
    console.log(hexColor.substring(2, 4))
    const b = parseInt(hexColor.substring(4, 6), 16);
    console.log(hexColor.substring(4, 6))
  
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
});