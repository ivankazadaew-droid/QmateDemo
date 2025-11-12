import { setWorldConstructor } from '@cucumber/cucumber';

export class CustomWorld {
    constructor() {
        this.cartItems = [];
    }

    addCartItem(item) {
        this.cartItems.push(item);
    }

    getCartItems() {
        return this.cartItems;
    }
}

setWorldConstructor(CustomWorld);
