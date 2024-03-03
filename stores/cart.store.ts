import { defineStore } from 'pinia'
import type { IProduct } from '~/types/product.type'

/**
 * Represents a cart store.
 */
export const useCart = defineStore('cart', {
  state: () => ({
    items: [] as IProduct[],
  }),

  getters: {
    /**
     * Gets the total number of items in the cart.
     * @returns The total number of items.
     */
    totalItems(): number {
      return this.items.length;
    },

    /**
     * Gets the total price of all items in the cart.
     * @returns The total price.
     */
    totalPrice(): number {
      return this.items.reduce((total, item) => total + item.price, 0);
    },
  },

  actions: {
    /**
     * Adds an item to the cart.
     * @param item - The item to add.
     */
    addItem(item: IProduct): void {
      this.items.push(item);
      this.persistCart(); // Persist the cart after adding an item
    },

    /**
     * Removes an item from the cart.
     * @param index - The index of the item to remove.
     */
    removeItem(index: number): void {
      this.items.splice(index, 1);
      this.persistCart(); // Persist the cart after removing an item
    },

    /**
     * Clears the cart.
     */
    clearCart(): void {
      this.items = [];
      this.persistCart(); // Persist the cart after clearing it
    },

    /**
     * Persists the cart by storing the items as a cookie.
     */
    persistCart(): void {
      // Convert the cart items to a JSON string
      const cartItems = JSON.stringify(this.items);
      // Set the cart items as a cookie
      document.cookie = `cart=${cartItems}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
    },

    /**
     * Restores the cart by retrieving the items from the cookie.
     */
    restoreCart(): void {
      // Get the cart items from the cookie
      const cartCookie = document.cookie.split(';').find((cookie) => cookie.trim().startsWith('cart='));
      if (cartCookie) {
        const cartItems = cartCookie.split('=')[1];
        // Parse the JSON string and assign it to the store state
        this.items = JSON.parse(cartItems);
      }
    },
  },
});
