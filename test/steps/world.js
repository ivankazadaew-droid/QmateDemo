import { setWorldConstructor } from '@cucumber/cucumber';

export class CustomWorld {
    constructor() {
        this.cartItems = [];
    }

    addCartItem(cartItem) {
        const existingItem = this.cartItems.find(
            item => item.name === cartItem.name && item.price === cartItem.price
        );

        if (existingItem) {
            existingItem.quantity += cartItem.quantity;
        } else {
            this.cartItems.push(cartItem);
        }
    }

    getCartItems() {
        return this.cartItems;
    }
}

setWorldConstructor(CustomWorld);
