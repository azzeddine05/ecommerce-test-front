<template>
  <main>
    <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
      <h1 class="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        Shopping Cart
      </h1>

      <form class="mt-12">
        <section aria-labelledby="cart-heading">
          <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>

          <ul role="list" class="divide-y divide-gray-200 border-b border-t border-gray-200">
            <li v-for="product in cart" :key="product.id" class="flex py-6">
              <div class="flex-shrink-0">
                <img
                  :src="product.image"
                  :alt="product.title"
                  class="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
                />
              </div>

              <div class="ml-4 flex flex-1 flex-col sm:ml-6">
                <div>
                  <div class="flex justify-between">
                    <h4 class="text-sm">
                      <a href="#" class="font-medium text-gray-700 hover:text-gray-800">{{
                        product.title
                      }}</a>
                    </h4>
                    <p class="ml-4 text-sm font-medium text-gray-900">
                      {{
                        Intl.NumberFormat('fr-FR', {
                          style: 'currency',
                          currency: 'EUR'
                        }).format(product.price)
                      }}
                    </p>
                  </div>
                  <p class="mt-1 text-sm text-gray-500">{{ product.category }}</p>
                </div>

                <div class="mt-4 flex flex-1 items-end justify-between">
                  <p class="flex items-center space-x-2 text-sm text-gray-700">
                    <CheckIcon
                      v-if="product.inStock"
                      class="h-5 w-5 flex-shrink-0 text-green-500"
                      aria-hidden="true"
                    />
                    <ClockIcon
                      v-else
                      class="h-5 w-5 flex-shrink-0 text-gray-300"
                      aria-hidden="true"
                    />
                    <span>{{ product.inStock ? 'In stock' : `Will ship in 7 days` }}</span>
                  </p>
                  <div class="ml-4">
                    <button
                      @click="removeFromCart(product)"
                      type="button"
                      class="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </section>

        <!-- Order summary -->
        <section aria-labelledby="summary-heading" class="mt-10">
          <h2 id="summary-heading" class="sr-only">Order summary</h2>

          <div>
            <dl class="space-y-4">
              <div class="flex items-center justify-between">
                <dt class="text-base font-medium text-gray-900">Subtotal</dt>
                <dd class="ml-4 text-base font-medium text-gray-900">
                  {{
                    Intl.NumberFormat('fr-FR', {
                      style: 'currency',
                      currency: 'EUR'
                    }).format(cart.reduce((acc, product) => acc + product.price, 0))
                  }}
                </dd>
              </div>
            </dl>
            <p class="mt-1 text-sm text-gray-500">
              Shipping and taxes will be calculated at checkout.
            </p>
          </div>

          <div class="mt-10">
            <button
              type="submit"
              class="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              Checkout
            </button>
          </div>

          <div class="mt-6 text-center text-sm text-gray-500">
            <p>
              or
              <RouterLink to="/" class="font-medium text-indigo-600 hover:text-indigo-500">
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </RouterLink>
            </p>
          </div>
        </section>
      </form>
    </div>

    <!-- Policy grid -->
    <section aria-labelledby="policies-heading" class="border-t border-gray-200 bg-gray-50">
      <h2 id="policies-heading" class="sr-only">Our policies</h2>

      <div class="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div
          class="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-0"
        >
          <div
            v-for="policy in policies"
            :key="policy.name"
            class="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
          >
            <div class="md:flex-shrink-0">
              <div class="flow-root">
                <img class="-my-1 mx-auto h-24 w-auto" :src="policy.imageUrl" alt="" />
              </div>
            </div>
            <div class="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
              <h3 class="text-base font-medium text-gray-900">{{ policy.name }}</h3>
              <p class="mt-3 text-sm text-gray-500">{{ policy.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { useProductStore } from '@/stores/product'
import { CheckIcon, ClockIcon } from '@heroicons/vue/20/solid'

const { cart, removeFromCart } = useProductStore()

const policies = [
  {
    name: 'Free returns',
    imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-returns-light.svg',
    description:
      'Not what you expected? Place it back in the parcel and attach the pre-paid postage stamp.'
  },
  {
    name: 'Same day delivery',
    imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-calendar-light.svg',
    description:
      'We offer a delivery service that has never been done before. Checkout today and receive your products within hours.'
  },
  {
    name: 'All year discount',
    imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-gift-card-light.svg',
    description:
      'Looking for a deal? You can use the code "ALLYEAR" at checkout and get money off all year round.'
  },
  {
    name: 'For the planet',
    imageUrl: 'https://tailwindui.com/img/ecommerce/icons/icon-planet-light.svg',
    description:
      'We’ve pledged 1% of sales to the preservation and restoration of the natural environment.'
  }
]
</script>
