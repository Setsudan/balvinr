import { defineStore } from 'pinia'
import type { IProduct } from '~/types/product.type'

export const useCart = defineStore('cart', {
  state: () => ({
    items: [] as IProduct[],
  }),
  getters: {
    totalItems(): number {
      return this.items.length
    },
    totalPrice(): number {
      return this.items.reduce((total, item) => total + item.price, 0)
    },
  },
  actions: {
    addItem(item: IProduct): void {
      this.items.push(item)
    },
    removeItem(index: number): void {
      this.items.splice(index, 1)
    },
    clearCart(): void {
      this.items = []
    },
  },
})
