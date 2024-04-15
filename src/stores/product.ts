import { type Product } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductStore = defineStore('product', () => {
  const cart = ref<Product[]>([])
  const selectedProduct = ref<Product | undefined>()

  function addToCart(item: Product) {
    cart.value.push(item)
  }

  function removeFromCart(item: Product) {
    const index = cart.value.findIndex((i) => i.id === item.id)
    if (index !== -1) {
      cart.value.splice(index, 1)
    }
  }

  function setSelectedProduct(product: Product) {
    selectedProduct.value = product
  }

  return { cart, addToCart, removeFromCart, selectedProduct, setSelectedProduct }
})
