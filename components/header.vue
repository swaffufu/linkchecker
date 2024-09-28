<script setup lang="ts">
import { ref } from "vue";

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <div>
    <nav class="w-full bg-white dark:bg-gray-800 antialiased">
      <div class="max-w-screen-xl px-4 mx-auto 2xl:px-0 py-4">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <div class="flex items-center space-x-8">
            <div class="shrink-0">
              <NuxtLink to="/">
                <a href="#" title="">
                  <img
                    class="block w-auto h-8 dark:hidden"
                    src="https://padu.gov.my/_next/image?url=%2Fimages%2Fjata_negara.png&w=256&q=75"
                    alt=""
                  />
                  <img
                    class="hidden w-auto h-8 dark:block"
                    src="https://padu.gov.my/_next/image?url=%2Fimages%2Fjata_negara.png&w=256&q=75"
                    alt=""
                  />
                </a>
              </NuxtLink>
            </div>

            <!-- Desktop Menu -->
            <ul
              class="hidden lg:flex items-center justify-start gap-6 md:gap-8 py-3 sm:justify-center"
            >
              <li>
                <NuxtLink to="/">
                  <a
                    class="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
                  >
                    Utama
                  </a>
                </NuxtLink>
              </li>
              <li class="shrink-0">
                <NuxtLink to="/helpdesk">
                  <a
                    class="flex text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
                  >
                    Helpdesk
                  </a>
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Hamburger Icon (Mobile) -->
          <div class="lg:hidden">
            <button
              @click="toggleMenu"
              class="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Menu -->
        <div v-if="isMenuOpen" class="lg:hidden mt-4">
          <ul class="flex flex-col space-y-4">
            <li>
              <NuxtLink to="/">
                <a
                  class="block text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
                >
                  Utama
                </a>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/helpdesk">
                <a
                  class="block text-sm font-medium text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500"
                >
                  Helpdesk
                </a>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <slot />
  </div>
</template>

<style scoped></style>
