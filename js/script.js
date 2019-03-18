let main = document.querySelector('main')


function generateRandomHex() {
    randomHex = '#' + Math.random().toString(16).substr(2, 6).toUpperCase();
    return randomHex;
}

function generateDivs(number) {
    for (let i = 0; i < number; i++) {
        let colorDiv = document.createElement('div');
        main.appendChild(colorDiv);
        colorDiv.style.height = '50px';
        colorDiv.style.background = generateRandomHex();
    };
};

generateDivs(10);

