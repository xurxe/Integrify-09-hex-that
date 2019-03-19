const main = document.querySelector('main');
const colorInput = document.querySelector('#colorInput');
const hexInput = document.querySelector('#hexInput');
const hexes = [
    "the patriarchy",
    "racism",
    "climate change",
    "Donald Trump",
    "boredom",
    "xenophobia",
    "the haters",
    "compulsory heterosexuality",
    "nazis",
    "facists",
    "child molesters",
    "pollution",
    "transphobia",
    "homophobes",
    "wars",
    "oppression",
    "animal abusers",
];



function generateRandomColor() {
    let randomColor = '#' + Math.random().toString(16).substr(2, 6).toUpperCase();
    return randomColor;
};



function hexToRgb(hexcode) {
    let rawR = hexcode.slice(1,3);
    let rawG = hexcode.slice(3,5);
    let rawB = hexcode.slice(5,7);

    let R = parseInt(rawR, 16);
    let G = parseInt(rawG, 16);
    let B = parseInt(rawB, 16);

    let rgb = [R, G, B];
    return rgb;
};



function formatRgb(array) {
    let rgb = `rgb(${array[0]}, ${array[1]}, ${array[2]})`;
    return rgb;
};



function rgbToHsl(array) {
    let [R, G, B] = array;

    let rawMax = Math.max(R, G, B);
    let rawMin = Math.min(R, G, B);

    let max = rawMax / 255;
    let min = rawMin / 255;

    let rawH, rawS, rawL;

    rawL = (max + min) / 2;

    if (rawMax === rawMin) {
        rawS = 0;
        rawH = 0;
    }

    else if (rawL <= 0.5) {
        rawS = (max - min) / (max + min);
    }
    
    else if (rawL > 0.5) {
        rawS = (max - min) / (2 - max - min);
    };

    if (rawMax == R) {
        rawH = (G - B) / (max - min);
    }

    else if (rawMax == G) {
        rawH = 2 + (B - R) / (max - min);
    }

    else if (rawMax == B) {
        rawH = 4 + (R - G) / (max - min);
    };

    let H;
    
    if (rawH < 0) {
        H = Math.round(rawH + 360);
    }

    else {
        H = Math.round(rawH);
    }

    let S = Math.round(rawS * 100);
    let L = Math.round(rawL * 100);

    let hsl = [H, S, L];
    return hsl;
};



function formatHsl(array) {
    let hsl = `hsl(${array[0]}, ${array[1]}%, ${array[2]}%)`;
    return hsl;
};



/* function pickContrastingFont(hexcode) {
    let rgb = hexToRGB(hexcode);
    console.log(rgb);
    let rgbArray= rgb.match(/\d+/g);
    let R = parseInt(rgbArray[0]);
    let G = parseInt(rgbArray[1]);
    let B = parseInt(rgbArray[2]);

    let max = Math.max(R, G, B) / 255;
    let min = Math.min(R, G, B) / 255;

    let rawL = (max + min) / 2;
    if (rawL < 0.6) {
        return 'white';
    }

    else if (rawL >= 0.6) {
        return 'black';
    };
}; */


function pickContrastingFont(hexcode) {
    let backgroundRgb = hexToRgb(hexcode);
    let backgroundHsl = rgbToHsl(backgroundRgb);
    console.log(hexcode, backgroundHsl);


    let backgroundH = parseInt(backgroundHsl[0]);
    let backgroundS = parseInt(backgroundHsl[1]);
    let backgroundL = parseInt(backgroundHsl[2]);

    let H, S, L;
    H = backgroundH;
    S = Math.round(backgroundS - backgroundS / 1.5);
    
    if (backgroundS + backgroundL < 90) {
        L = 90;
    }

    else {
        L = 10;
    }
    
    hsl = [H, S, L];

    return hsl;
};



function pickRandomHex() {
    i = Math.floor(Math.random() * (hexes.length - 1));
    hex = hexes[i];
    hexes.splice(i, 1);
    hexes.push(hex);
    return hex;
};



function generateDivs(number) {
    for (let i = 0; i < number; i++) {
        let colorDiv = document.createElement('div');
        main.appendChild(colorDiv);
        colorDiv.style.lineHeight = '50px';

        let backgroundColor = generateRandomColor();
        colorDiv.style.background = backgroundColor;

        let fontColor = formatHsl(pickContrastingFont(backgroundColor));
        colorDiv.style.color = fontColor;

        hex = pickRandomHex();
        colorDiv.textContent = `${backgroundColor}: Hex ${hex}!`;

        console.log(fontColor);

    };
};

generateDivs(5);
