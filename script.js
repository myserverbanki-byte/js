const fs = require('fs');
const text = fs.readFileSync('script.js', 'utf-8');

class Button {
    text = ''

    constructor(text) {
        this.text = text;
        this.render();

    }
    render() {
        const placeTorender = document.querySelector('.btns');
        if (placeTorender) {
            const btn = document.createElement('button');
            btn.classList.add('btn');
            btn.innerHTML = this.text;
            placeTorender.appendChild(btn);

        }
    }
}
new Button('click me');