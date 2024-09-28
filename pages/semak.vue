<script setup lang="ts">
import axios from "axios";
import { ref, reactive, nextTick } from "vue";

definePageMeta({
  layout: false,
});

// Reactive form state
const form = reactive({
  link: "",
});

// Control form visibility for reset
const show = ref(true);
const labelText = ref("URL Anda"); // Reactive variable for label text
const labelColor = ref("text-gray-900"); // Reactive variable for label color
const reportLinkVisible = ref(false); // Reactive variable to control report link visibility

const onSubmit = async (event: Event) => {
  event.preventDefault();

  try {
    const result = await axios.post("/api/semak/", { url: form.link });
    console.log("API Response:", result.data); // Log the full response

    // Check if the URL is unsafe based on the API response
    const isUnsafe = result.data.unsafe; // Use the `unsafe` property from the response

    // Update label text and color based on unsafe check
    if (isUnsafe) {
      labelText.value = "URL Anda Tidak Selamat"; // Update text for unsafe URL
      labelColor.value = "text-red-600"; // Change text color to red
      reportLinkVisible.value = true; // Show the report link
    } else {
      labelText.value = "URL Anda Selamat"; // Update text for safe URL
      labelColor.value = "text-green-600"; // Change text color to green
      reportLinkVisible.value = false; // Hide the report link
    }

    alert("URL Checked Successfully: " + JSON.stringify(result.data));
  } catch (error) {
    if (error.response) {
      alert("Error: " + error.response.data.message);
    } else {
      alert("Error: Unable to check the URL. Please try again.");
    }
  }
};

// Form reset handler
const onReset = (event: Event) => {
  event.preventDefault();
  // Reset form values
  form.link = "";
  labelText.value = "URL Anda"; // Reset label text
  labelColor.value = "text-gray-900"; // Reset label color
  reportLinkVisible.value = false; // Hide report link on reset
  // Trick to reset native form validation state
  show.value = false;
  nextTick(() => {
    show.value = true;
  });
};
</script>

<template>
  <section class="bg-gray-50 dark:bg-gray-900">
    <div
      class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
    >
      <div
        class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
      >
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1
            class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white"
          >
            Semak
          </h1>
          <form
            @submit="onSubmit"
            @reset="onReset"
            v-if="show"
            class="space-y-4 md:space-y-6"
          >
            <div>
              <label
                for="link"
                :class="labelColor"
                class="block mb-2 text-sm font-medium dark:text-white"
              >
                {{ labelText }}
                <!-- Dynamic label text -->
              </label>
              <input
                type="url"
                v-model="form.link"
                name="link"
                id="link"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Tampal di sini"
                required
              />
            </div>
            <button
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Hantar
            </button>
            <!-- Report link for unsafe URLs -->
            <div v-if="reportLinkVisible" class="mt-4">
              <p class="text-red-600">
                URL ini tidak selamat. Anda boleh
                <a
                  href="https://contentforum.my/make-complaint/"
                  target="_blank"
                  class="underline"
                  >melaporkan di sini</a
                >.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
