// Базовый класс для списков товаров
class Collection {
    items = [];

    addItem(item) {
        this.items.push(item);
    }

    removeItem(index) {
        this.items.splice(index, 1);
    }

    clear() {
        this.items = [];
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + item.getTotalPrice(), 0);
    }
}

// Класс товара
class Product {
    name = '';
    price = 0;

    constructor({ name, price }) {
        this.name = name;
        this.price = price;
    }

    render(container, onAddToCart) {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <div class="product-info">
                <span class="product-name">${this.name}</span>
                <span class="product-price">${this.price} руб.</span>
            </div>
            <button class="add-to-cart-btn" data-name="${this.name}">Добавить в корзину</button>
        `;

        const addButton = productElement.querySelector('.add-to-cart-btn');
        addButton.addEventListener('click', () => onAddToCart(this));

        container.appendChild(productElement);
    }
}

// Класс элемента корзины (товар с количеством)
class CartItem extends Product {
    quantity = 1;

    constructor(product) {
        super({ name: product.name, price: product.price });
    }

    increase() {
        this.quantity++;
    }

    decrease() {
        if (this.quantity > 1) {
            this.quantity--;
        }
    }

    remove() {
        this.quantity = 0;
    }

    getTotalPrice() {
        return this.price * this.quantity;
    }

    render(container, onIncrease, onDecrease, onRemove) {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <div class="cart-item-info">
                <span class="cart-item-name">${this.name}</span>
                <span class="cart-item-price">${this.price} руб.</span>
                <div class="quantity-controls">
                    <button class="decrease-btn">-</button>
                    <span class="quantity">${this.quantity}</span>
                    <button class="increase-btn">+</button>
                </div>
                <span class="total-price">Итого: ${this.getTotalPrice()} руб.</span>
            </div>
            <button class="remove-all-btn">Удалить все</button>
        `;

        // Кнопки изменения количества
        const increaseBtn = cartItemElement.querySelector('.increase-btn');
        const decreaseBtn = cartItemElement.querySelector('.decrease-btn');
        const removeBtn = cartItemElement.querySelector('.remove-all-btn');

        increaseBtn.addEventListener('click', () => onIncrease(this));
        decreaseBtn.addEventListener('click', () => onDecrease(this));
        removeBtn.addEventListener('click', () => onRemove(this));

        container.appendChild(cartItemElement);
    }
}

// Класс списка товаров (наследует от Collection)
class ProductList extends Collection {
    constructor() {
        super();
        this.loadProducts();
    }

    loadProducts() {
        const productsData = this.fetchProducts();
        productsData.forEach(data => {
            const product = new Product(data);
            this.addItem(product);
        });
    }

    fetchProducts() {
        return [
            { name: 'Shirt', price: 150 },
            { name: 'Socks', price: 100 },
            { name: 'Jacket', price: 250 },
            { name: 'Shoes', price: 350 }
        ];
    }

    render() {
        const container = document.querySelector('.goods-list');
        if (!container) return;

        container.innerHTML = ''; // Очищаем контейнер

        this.items.forEach(product => {
            product.render(container, (productToAdd) => {
                cart.addProduct(productToAdd);
            });
        });
    }
}

// Класс корзины (наследует от Collection)
class ShoppingCart extends Collection {
    constructor() {
        super();
    }

    // Добавление товара в корзину
    addProduct(product) {
        // Проверяем, есть ли уже такой товар в корзине
        const existingItem = this.items.find(item => item.name === product.name);

        if (existingItem) {
            existingItem.increase();
        } else {
            const cartItem = new CartItem(product);
            this.addItem(cartItem);
        }

        this.render();
    }

    // Увеличение количества товара
    increaseQuantity(cartItem) {
        cartItem.increase();
        this.render();
    }

    // Уменьшение количества товара
    decreaseQuantity(cartItem) {
        cartItem.decrease();
        // Если количество стало 0, удаляем товар
        if (cartItem.quantity === 0) {
            const index = this.items.indexOf(cartItem);
            if (index !== -1) {
                this.removeItem(index);
            }
        }
        this.render();
    }

    // Удаление товара из корзины
    removeProduct(cartItem) {
        cartItem.remove();
        const index = this.items.indexOf(cartItem);
        if (index !== -1) {
            this.removeItem(index);
        }
        this.render();
    }

    render() {
        const container = document.querySelector('.cart-list');
        const totalPriceElement = document.querySelector('.total-price-value');

        if (!container || !totalPriceElement) return;

        container.innerHTML = ''; // Очищаем контейнер корзины

        // Рендерим каждый товар в корзине
        this.items.forEach(cartItem => {
            cartItem.render(
                container,
                (item) => this.increaseQuantity(item),
                (item) => this.decreaseQuantity(item),
                (item) => this.removeProduct(item)
            );
        });

        // Обновляем общую стоимость
        totalPriceElement.textContent = this.getTotalPrice();
    }
}

// Создаём экземпляры классов
const productList = new ProductList();
const cart = new ShoppingCart();

// Рендерим основной список товаров
productList.render();

// Изначально рендерим пустую корзину
cart.render();
