<template>
  <section aria-labelledby="related-heading" class="px-4 py-16 sm:px-10">
    <div class="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
      <div v-for="product in products" :key="product.id">
        <div class="relative">
          <div class="relative h-72 w-full overflow-hidden rounded-lg">
            <img
              :src="product.image"
              :alt="product.title"
              class="h-full w-full object-cover object-center"
            />
          </div>
          <RouterLink :to="`/details/${product.id}`">
            <div @click="setSelectedProduct(product)" class="relative mt-4">
              <h5 class="text-sm font-medium text-gray-900">{{ product.title }}</h5>
              <p class="mt-1 text-sm text-gray-500">{{ product.category }}</p>
            </div>
          </RouterLink>
          <div
            class="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4"
          >
            <div
              aria-hidden="true"
              class="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
            />
            <p class="relative text-lg font-semibold text-white">
              {{
                Intl.NumberFormat('fr-FR', {
                  style: 'currency',
                  currency: 'EUR'
                }).format(product.price)
              }}
            </p>
          </div>
        </div>
        <div class="mt-6">
          <span
            v-if="!isInCart(product)"
            @click="addToCart(product)"
            class="relative cursor-pointer flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
            >Add to cart
          </span>
          <span
            v-if="isInCart(product)"
            @click="removeFromCart(product)"
            class="relative cursor-pointer flex items-center justify-center rounded-md border border-transparent bg-red-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-red-200"
            >Remove from Cart
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import api from '@/api'
import { useProductStore } from '@/stores/product'
import type { Product } from '@/types'
import { onMounted, ref } from 'vue'

const products = ref<Product[]>([])
const { addToCart, cart, removeFromCart, setSelectedProduct } = useProductStore()

const isInCart = (product: Product) => cart.some((item) => item.id === product.id)

onMounted(() => {
  api.products.getProducts().then((data) => {
    products.value = data?.products
  })
})
</script>
