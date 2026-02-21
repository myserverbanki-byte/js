class List {
    items = []
    constructor() {
        let goods = this.fetchGoods()
        goods = goods.map((cur) => {
            return new GoodItem(cur)
        })
        this.items.push(...goods)
    }
    fetchGoods() {
        return [
            { name: 'Shirt', price: 150 },
            { name: 'Socsk', price: 100 },
            { name: 'Jocsk', price: 250 },
            { name: 'Shoes', price: 350 }

        ]
    }
    render() {
        this.items.forEach(good => {
            good.render()
        })
    }
}

class GoodItem {
    name = ''
    price = 0
    constructor({ name, price }) {
        this.name = name
        this.price = price

    }
    render() {
        const placeToRender = document.querySelector('.goods-list')
        if (placeToRender) {
            const block = document.createElement('div')
            block.innerHTML = `Товар : ${this.name}, цена ${this.price} руб.`
            placeToRender.appendChild(block)
        }
    }
}
const list = new List()
list.render();