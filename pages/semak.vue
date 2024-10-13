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
    console.log("Respons API:", result.data); // Log the full response

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

    alert("URL Disemak Dengan Jayanya: " + JSON.stringify(result.data));
  } catch (error) {
    if (error.response) {
      alert("Ralat: " + error.response.data.message);
    } else {
      alert("Ralat: Tidak dapat menyemak URL. Sila cuba lagi.");
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
  <section class="bg-[#22273D] text-white min-h-screen py-8 px-4 md:px-6">
    <div class="container mx-auto">
      <!-- First Section: Semak Form -->
      <div class="bg-[#1A1E2A] rounded-lg shadow-lg p-6 md:p-8 mb-6 opacity-90">
        <h1 class="text-2xl font-bold mb-4 text-center">Semak</h1>
        <form
          @submit="onSubmit"
          @reset="onReset"
          v-if="show"
          class="space-y-4 md:space-y-6 text-center"
        >
          <div>
            <label
              for="link"
              :class="labelColor"
              class="block mb-2 text-sm font-medium"
            >
              {{ labelText }}
            </label>
            <input
              type="url"
              v-model="form.link"
              name="link"
              id="link"
              class="bg-transparent border border-gray-300 text-white text-sm rounded-lg focus:ring-[#6179B2] focus:border-[#6179B2] block w-full p-2.5"
              placeholder="Tampal di sini"
              required
            />
          </div>
          <button
            type="submit"
            class="text-white bg-[#4E608F] hover:bg-[#6179B2] focus:ring-4 focus:ring-[#86AAF9] font-medium rounded-lg text-sm px-5 py-2.5 mt-4"
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

      <!-- Second Section: Maklumat Tambahan -->
      <div class="bg-[#1A1E2A] rounded-lg shadow-lg p-6 md:p-8 mb-6 opacity-90">
        <h2 class="text-lg font-semibold text-center">
          Sumber Maklumat Tambahan:
        </h2>
        <ul class="space-y-2 text-center">
          <li>
            <a
              href="https://www.bnm.gov.my/financial-consumer-alert-list"
              target="_blank"
              class="text-[#86AAF9] underline"
            >
              Senarai Amaran Pengguna Kewangan BNM
            </a>
          </li>
          <li>
            <a
              href="https://www.sc.com.my/investor-alert-list"
              target="_blank"
              class="text-[#86AAF9] underline"
            >
              Senarai Amaran Pelabur SC
            </a>
          </li>
        </ul>
      </div>

      <!-- Third Section: Quiz -->
      <div
        class="bg-[#1A1E2A] rounded-lg shadow-lg p-6 md:p-8 mb-6 text-center opacity-90"
      >
        <h2 class="text-lg font-semibold mb-4">
          Bolehkah anda mengenal pasti apabila anda sedang menjadi mangsa
          "Phishing"??
        </h2>
        <p class="mt-2 mb-4">
          <!-- Added bottom margin here -->
          "Phishing" merupakan salah satu teknik yang selalu diguna pakai oleh
          penyerang siber untuk mendapatkan maklumat-maklumat sensitif pengguna.
          Sila tekan butang hijau dibawah untuk menyertai kuiz "Anti-Phishing"
          kami.
        </p>

        <NuxtLink
          to="/quiz"
          class="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4"
        >
          Ambil Kuiz Kami
        </NuxtLink>
      </div>

      <!-- Fourth Section: Iframe -->
      <div
        class="bg-[#1A1E2A] rounded-lg shadow-lg p-6 md:p-8 mb-6 text-center opacity-90"
      >
        <h2 class="text-lg font-semibold text-center">
          Anda juga boleh mengguna portal dibawah untuk menyemak akaun Bank yang
          mencurigakan
        </h2>
        <div class="mt-6">
          <iframe
            src="https://semakmule.rmp.gov.my/"
            width="100%"
            height="700"
            class="rounded-lg border-2 border-gray-600 mx-auto block"
            title="Semak Mule"
          ></iframe>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.container {
  max-width: 800px; /* Maintain a maximum width for the container */
  margin: 0 auto;
}

/* Fullscreen width and responsive */
@media (max-width: 768px) {
  .container {
    padding: 0 1rem; /* Responsive padding for smaller screens */
  }
}

/* Adjust vertical margins */
.mb-6 {
  margin-bottom: 1.5rem; /* Adjust bottom margin for better spacing */
}
</style>
