const main = document.querySelector('main');
const colorInput = document.querySelector('#color-input');
const hexInput = document.querySelector('#hex-input');
const generateButton = document.querySelector('#generate-button');
const hexes = [
    'animal abusers',
    'boredom',
    'bigotry',
    'colonialism',
    'compulsory heterosexuality',
    'child molesters',
    'chronic pain',
    'climate change',
    'death',
    'deforestation',
    'depression',
    'diet culture',
    'disease',
    'Donald Trump',
    'facists',
    'fossil fuels',
    'global warming',
    'homophobes',
    'institutionalized racism',
    'loneliness',
    'mass extinction',
    'mental health stigma',
    'misery',
    'nazis',
    'oppression',
    'pervasive ableism',
    'pollution',
    'poverty',
    'sexism',
    'soil erosion',
    'the haters',
    'the patriarchy',
    'transmisogyny',
    'transphobia',
    'trauma',
    'wars',
    'white supremacy',
    'xenophobia',
];


// generate random hex code
function generateRandomColor() {
    let randomColor = '#' + Math.random().toString(16).substr(2, 6).toUpperCase();
    return randomColor;
};



// convert hex code to RGB
function hexToRgb(hexcode) {
    // two digits for each (R, G, B)
    let rawR = hexcode.slice(1,3);
    let rawG = hexcode.slice(3,5);
    let rawB = hexcode.slice(5,7);

    // convert to integer (0-255)
    let R = parseInt(rawR, 16);
    let G = parseInt(rawG, 16);
    let B = parseInt(rawB, 16);

    // generate array with values
    let rgb = [R, G, B];
    return rgb;
};



// format RGB array for CSS
function formatRgb(array) {
    let rgb = `rgb(${array[0]}, ${array[1]}, ${array[2]})`;
    return rgb;
};



// convert RGB array to HSL array
function rgbToHsl(array) {
    let [R, G, B] = array;

    // get max and min from RGB values
    let rawMax = Math.max(R, G, B);
    let rawMin = Math.min(R, G, B);

    // convert to 0-1 range
    let max = rawMax / 255;
    let min = rawMin / 255;

    let rawH, rawS, rawL;

    rawL = (max + min) / 2;

    // if max and min are equal, it's an achromatic grey
    if (rawMax === rawMin) {
        rawS = 0;
        rawH = 0;
    }

    // if L is below 50%, use this formula
    else if (rawL <= 0.5) {
        rawS = (max - min) / (max + min);
    }
    
    // if L is over 50%, use this formula
    else if (rawL > 0.5) {
        rawS = (max - min) / (2 - max - min);
    };

    // if the highest color value is red, use this formula
    if (rawMax == R) {
        rawH = (G - B) / (max - min);
    }

    // if the highest color value is green, use this formula
    else if (rawMax == G) {
        rawH = 2 + (B - R) / (max - min);
    }

    // if the highest color value is blue, use this formula
    else if (rawMax == B) {
        rawH = 4 + (R - G) / (max - min);
    };

    let H, S, L;
    
    // if raw H is negative, add 360
    if (rawH < 0) {
        H = Math.round(rawH + 360);
    }

    // otherwise, round
    else {
        H = Math.round(rawH);
    }

    // multiply by 100 and round
    S = Math.round(rawS * 100);
    L = Math.round(rawL * 100);

    let hsl = [H, S, L];
    return hsl;
};



// format HSL array for CSS
function formatHsl(array) {
    let hsl = `hsl(${array[0]}, ${array[1]}%, ${array[2]}%)`;
    return hsl;
};



// pick a font color that has enough contrast with the background
function pickContrastingFont(hexcode) {

    // convert from hex to RGB
    let backgroundRgb = hexToRgb(hexcode);
    let backgroundR = backgroundRgb[0];
    let backgroundG = backgroundRgb[1];
    let backgroundB = backgroundRgb[2];

    // calculate perceived brigthness with luma formula
    brightness = 0.2126 * backgroundR + 0.7152 * backgroundG + 0.0722 * backgroundB;

    // convert from RGB to HSL
    let backgroundHsl = rgbToHsl(backgroundRgb);
    let backgroundH = backgroundHsl[0];
    let backgroundS = backgroundHsl[1];
    let backgroundL = backgroundHsl[2];

    // define variables for text H, S and L
    let H, S, L;

    // set complementary hue
    H = backgroundH - 180;

    if (H < 0) {
        H += 360;
    }

    S = backgroundS;
    
    if (brightness < 150) {
        L = 95;
    }

    else {
        L = 5;
    };
        
    // define result array
    hsl = [H, S, L];

    return hsl;
};



// pick a random element from the hexes array
function pickRandomHex(i) {
    // i will come from the i in the loop on generateDivs()
    // j is a random index from the array, excluding the items already used and pushed at the end (see below)
    j = Math.floor(Math.random() * (hexes.length - i));

    // pick a hex with the randomly-generated j index
    hex = hexes[j];

    // remove that hex from the array
    hexes.splice(j, 1);

    // add it at the end of the array
    hexes.push(hex);

    return hex;
};



// generate the given number of divs
function generateDivs(number) {
    for (let i = 0; i < number; i++) {
        let colorDiv = document.createElement('div');
        colorDiv.className = 'color-div';
        main.appendChild(colorDiv);

        let hexP = document.createElement('p');
        hexP.className = 'hex-p';
        colorDiv.appendChild(hexP);

        let colorP = document.createElement('p');
        colorP.className = 'color-p';
        colorDiv.appendChild(colorP);

        let backgroundColor = generateRandomColor();
        colorDiv.style.background = backgroundColor;

        let fontColor = formatHsl(pickContrastingFont(backgroundColor));
        colorDiv.style.color = fontColor;

        hex = pickRandomHex(i);
        hexP.textContent = `Hex ${hex}!`;

        console.log(fontColor);

    };
};



// remove previously-generated color divs
function clearColorDivs() {

    // select color divs
    let colorDivs = document.querySelectorAll('.color-div');

    // use a loop to delete them
    for (let i = 0; i < colorDivs.length; i++) {
        main.removeChild(colorDivs[i]);
    };
};



// after clicking the generate button, do the following:
generateButton.addEventListener('click', function() {

    // get number of colors to be generated from the input field
    const number = colorInput.value;

    // remove previous color divs
    clearColorDivs();

    // generate new ones
    generateDivs(number);
});

generateDivs(5);
