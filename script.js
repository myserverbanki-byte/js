const fs = require('fs');
const text = fs.readFileSync('script.js', 'utf-8');

class Button {
    text = ''

    constructor(text) {
        this.text = text;
        this.render();

    }
    render() {
        const placeToRender = document.querySelector('.btns');
        if (placeToRender) {
            const btn = document.createElement('button');
            btn.classList.add('btn');
            btn.innerHTML = this.text;
            placeToRender.appendChild(btn);
        } else {
            console.warn('Элемент с классом "btns" не найден в DOM. Кнопка не будет отображена.');
        }
    }
}
new Button('click me');