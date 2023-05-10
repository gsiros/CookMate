// JS file for the frontend

const heatbutton = document.getElementById('heatbutton');
const defrostbutton = document.getElementById('defrostbutton');
const presetsbutton = document.getElementById('presetsbutton');



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
});