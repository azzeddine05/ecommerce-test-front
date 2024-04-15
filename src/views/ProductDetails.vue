<template>
  <div v-if="selectedProduct" class="bg-gray-50">
    <main>
      <div class="bg-white">
        <div
          class="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 sm:pb-32 sm:pt-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8"
        >
          <div class="lg:max-w-lg lg:self-end">
            <span class="font-medium text-gray-500 hover:text-gray-900">
              {{ selectedProduct?.category }}
            </span>

            <div class="mt-4">
              <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {{ selectedProduct?.title }}
              </h1>
            </div>

            <section aria-labelledby="information-heading" class="mt-4">
              <h2 id="information-heading" class="sr-only">Product information</h2>

              <div class="flex items-center">
                <p class="text-lg text-gray-900 sm:text-xl">{{ selectedProduct?.price }}</p>

                <div class="ml-4 border-l border-gray-300 pl-4">
                  <h2 class="sr-only">Reviews</h2>
                  <div class="flex items-center">
                    <div>
                      <div class="flex items-center">
                        <StarIcon
                          v-for="rating in [0, 1, 2, 3, 4]"
                          :key="rating"
                          :class="[
                            (selectedProduct?.rating?.rate ?? 0) > rating
                              ? 'text-yellow-400'
                              : 'text-gray-300',
                            'h-5 w-5 flex-shrink-0'
                          ]"
                          aria-hidden="true"
                        />
                      </div>
                      <p class="sr-only">{{ selectedProduct?.rating?.rate }} out of 5 stars</p>
                    </div>
                    <p class="ml-2 text-sm text-gray-500">
                      {{ selectedProduct?.rating?.count }} reviews
                    </p>
                  </div>
                </div>
              </div>

              <div class="mt-4 space-y-6">
                <p class="text-base text-gray-500">
                  lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam ac neque vel ex
                  sagittis cursus. Donec auctor nunc quis semper semper. Sed nec mi nec nunc. Nullam
                  auctor, nunc nec ultricies.
                </p>
              </div>

              <div class="mt-6 flex items-center">
                <CheckIcon class="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                <p class="ml-2 text-sm text-gray-500">In stock and ready to ship</p>
              </div>
            </section>
          </div>

          <!-- Product image -->
          <div class="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
            <div class="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
              <img
                :src="selectedProduct?.image"
                :alt="selectedProduct?.title"
                class="h-full w-full object-cover object-center"
              />
            </div>
          </div>

          <!-- Product form -->
          <div class="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
            <section aria-labelledby="options-heading">
              <h2 id="options-heading" class="sr-only">Product options</h2>

              <form>
                <div class="sm:flex sm:justify-between"></div>
                <div class="mt-10">
                  <button
                    v-if="!isInCart(selectedProduct)"
                    @click="addToCart(selectedProduct)"
                    type="submit"
                    class="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Add to cart
                  </button>
                  <button
                    v-if="isInCart(selectedProduct)"
                    @click="removeFromCart(selectedProduct)"
                    type="submit"
                    class="flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                  >
                    Remove from cart
                  </button>
                </div>
                <div class="mt-6 text-center">
                  <a href="#" class="group inline-flex text-base font-medium">
                    <ShieldCheckIcon
                      class="mr-2 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span class="text-gray-500 hover:text-gray-700">Lifetime Guarantee</span>
                  </a>
                </div>
              </form>
            </section>
          </div>
        </div>
      </div>

      <div class="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
        <!-- Policies section -->
        <section aria-labelledby="policy-heading">
          <h2 id="policy-heading" class="sr-only">Our policies</h2>
          <div
            class="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8"
          >
            <div v-for="policy in policies" :key="policy.name">
              <img :src="policy.imageSrc" alt="" class="h-24 w-auto" />
              <h3 class="mt-6 text-base font-medium text-gray-900">{{ policy.name }}</h3>
              <p class="mt-3 text-base text-gray-500">{{ policy.description }}</p>
            </div>
          </div>
        </section>
      </div>

      <section aria-labelledby="reviews-heading" class="bg-white">
        <div
          class="mx-auto max-w-2xl px-4 py-24 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-32"
        >
          <div class="lg:col-span-4">
            <h2 id="reviews-heading" class="text-2xl font-bold tracking-tight text-gray-900">
              Customer Reviews
            </h2>

            <div class="mt-3 flex items-center">
              <div>
                <div class="flex items-center">
                  <StarIcon
                    v-for="rating in [0, 1, 2, 3, 4]"
                    :key="rating"
                    :class="[
                      reviews.average > rating ? 'text-yellow-400' : 'text-gray-300',
                      'h-5 w-5 flex-shrink-0'
                    ]"
                    aria-hidden="true"
                  />
                </div>
                <p class="sr-only">{{ reviews.average }} out of 5 stars</p>
              </div>
              <p class="ml-2 text-sm text-gray-900">Based on {{ reviews.totalCount }} reviews</p>
            </div>

            <div class="mt-6">
              <h3 class="sr-only">Review data</h3>

              <dl class="space-y-3">
                <div
                  v-for="count in reviews.counts"
                  :key="count.rating"
                  class="flex items-center text-sm"
                >
                  <dt class="flex flex-1 items-center">
                    <p class="w-3 font-medium text-gray-900">
                      {{ count.rating }}<span class="sr-only"> star reviews</span>
                    </p>
                    <div aria-hidden="true" class="ml-1 flex flex-1 items-center">
                      <StarIcon
                        :class="[
                          count.count > 0 ? 'text-yellow-400' : 'text-gray-300',
                          'h-5 w-5 flex-shrink-0'
                        ]"
                        aria-hidden="true"
                      />

                      <div class="relative ml-3 flex-1">
                        <div class="h-3 rounded-full border border-gray-200 bg-gray-100" />
                        <div
                          v-if="count.count > 0"
                          class="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"
                          :style="{ width: `calc(${count.count} / ${reviews.totalCount} * 100%)` }"
                        />
                      </div>
                    </div>
                  </dt>
                  <dd class="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
                    {{ Math.round((count.count / reviews.totalCount) * 100) }}%
                  </dd>
                </div>
              </dl>
            </div>

            <div class="mt-10">
              <h3 class="text-lg font-medium text-gray-900">Share your thoughts</h3>
              <p class="mt-1 text-sm text-gray-600">
                If you’ve used this product, share your thoughts with other customers
              </p>

              <a
                href="#"
                class="mt-6 inline-flex w-full items-center justify-center rounded-md border border-gray-300 bg-white px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-50 sm:w-auto lg:w-full"
                >Write a review</a
              >
            </div>
          </div>

          <div class="mt-16 lg:col-span-7 lg:col-start-6 lg:mt-0">
            <h3 class="sr-only">Recent reviews</h3>

            <div class="flow-root">
              <div class="-my-12 divide-y divide-gray-200">
                <div v-for="review in reviews.featured" :key="review.id" class="py-12">
                  <div class="flex items-center">
                    <img
                      :src="review.avatarSrc"
                      :alt="`${review.author}.`"
                      class="h-12 w-12 rounded-full"
                    />
                    <div class="ml-4">
                      <h4 class="text-sm font-bold text-gray-900">{{ review.author }}</h4>
                      <div class="mt-1 flex items-center">
                        <StarIcon
                          v-for="rating in [0, 1, 2, 3, 4]"
                          :key="rating"
                          :class="[
                            review.rating > rating ? 'text-yellow-400' : 'text-gray-300',
                            'h-5 w-5 flex-shrink-0'
                          ]"
                          aria-hidden="true"
                        />
                      </div>
                      <p class="sr-only">{{ review.rating }} out of 5 stars</p>
                    </div>
                  </div>

                  <div
                    class="mt-4 space-y-6 text-base italic text-gray-600"
                    v-html="review.content"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useProductStore } from '@/stores/product'
import { CheckIcon, StarIcon } from '@heroicons/vue/20/solid'
import { ShieldCheckIcon } from '@heroicons/vue/24/outline'
import type { Product } from '@/types'

const { selectedProduct, addToCart, removeFromCart, cart } = useProductStore()

const isInCart = (product?: Product) => cart.some((item) => item.id === product?.id)

const policies = [
  {
    name: 'Free delivery all year long',
    description:
      'Name another place that offers year long free delivery? We’ll be waiting. Order now and you’ll get delivery absolutely free.',
    imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-delivery-light.svg'
  },
  {
    name: '24/7 Customer Support',
    description:
      'Or so we want you to believe. In reality our chat widget is powered by a naive series of if/else statements that churn out canned responses. Guaranteed to irritate.',
    imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-chat-light.svg'
  },
  {
    name: 'Fast Shopping Cart',
    description:
      "Look at the cart in that icon, there's never been a faster cart. What does this mean for the actual checkout experience? I don't know.",
    imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-fast-checkout-light.svg'
  },
  {
    name: 'Gift Cards',
    description:
      "We sell these hoping that you will buy them for your friends and they will never actually use it. Free money for us, it's great.",
    imageSrc: 'https://tailwindui.com/img/ecommerce/icons/icon-gift-card-light.svg'
  }
]
const reviews = {
  average: 4,
  totalCount: 1624,
  counts: [
    { rating: 5, count: 1019 },
    { rating: 4, count: 162 },
    { rating: 3, count: 97 },
    { rating: 2, count: 199 },
    { rating: 1, count: 147 }
  ],
  featured: [
    {
      id: 1,
      rating: 5,
      content: `
          <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
        `,
      author: 'Emily Selman',
      avatarSrc:
        'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80'
    }
    // More reviews...
  ]
}
</script>
