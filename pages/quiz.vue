<script setup lang="ts">
import { ref } from "vue";
import blenderImage from "~/assets/img/blender.png"; // Import the first image
import emailImage from "~/assets/img/email.png"; // Import the second image

const currentQuestionIndex = ref(0);
const score = ref(0);
const feedbackMessage = ref("");
const feedbackExplanation = ref("");
const questions = ref([
  {
    text: "Adakah emel ini phishing atau sah?",
    image: blenderImage, // Use the first imported image
    correctAnswer: "phishing",
    feedback:
      "Emel ini adalah phishing kerana ia mengandungi pautan mencurigakan yang mengarah ke laman web palsu.",
  },
  {
    text: "Adakah emel ini phishing atau sah?",
    image: emailImage, // Use the second imported image
    correctAnswer: "phishing", // Example answer; adjust as needed
    feedback:
      "Emel ini tidak sah kerana pengirim menggunakan @gmail.com dan bukannya service@paypal.com.",
  },
]);

const isAnswering = ref(true); // Track whether the user can answer

const checkAnswer = (answer) => {
  const currentQuestion = questions.value[currentQuestionIndex.value];
  if (answer === currentQuestion.correctAnswer) {
    score.value++;
    feedbackMessage.value = "Betul!";
  } else {
    feedbackMessage.value = "Salah!";
  }

  // Show the feedback explanation
  feedbackExplanation.value = currentQuestion.feedback;

  // Disable options after answering
  isAnswering.value = false;
};

const goToNextQuestion = () => {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    feedbackMessage.value = ""; // Clear feedback message
    feedbackExplanation.value = ""; // Clear feedback explanation
    currentQuestionIndex.value++;
    isAnswering.value = true; // Enable options again for the next question
  }
};

const restartQuiz = () => {
  currentQuestionIndex.value = 0; // Reset question index
  score.value = 0; // Reset score
  feedbackMessage.value = ""; // Clear feedback message
  feedbackExplanation.value = ""; // Clear feedback explanation
  isAnswering.value = true; // Enable answering
};
</script>

<template>
  <section class="bg-[#22273D] text-white min-h-screen py-8 px-4 md:px-6">
    <div class="container mx-auto">
      <div
        class="bg-[#1A1E2A] rounded-lg shadow-lg p-6 md:p-8 mb-6 opacity-90 text-center"
      >
        <h1 class="text-2xl font-bold mb-4">Kuiz phishing</h1>
        <p class="mb-4">{{ questions[currentQuestionIndex].text }}</p>
        <img
          :src="questions[currentQuestionIndex].image"
          alt="Contoh Emel"
          id="email-image"
          class="mx-auto mb-4 w-1/2"
        />

        <div class="options" v-if="isAnswering">
          <button
            @click="checkAnswer('phishing')"
            class="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4"
          >
            phishing
          </button>
          <button
            @click="checkAnswer('legitimate')"
            class="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4"
          >
            Sah
          </button>
        </div>

        <p v-if="feedbackMessage" class="mt-4">{{ feedbackMessage }}</p>
        <p v-if="feedbackExplanation" class="mt-2">{{ feedbackExplanation }}</p>

        <button
          v-if="!isAnswering && currentQuestionIndex < questions.length - 1"
          @click="goToNextQuestion"
          class="text-white bg-[#4E608F] hover:bg-[#6179B2] focus:ring-4 focus:ring-[#86AAF9] font-medium rounded-lg text-sm px-5 py-2.5 mt-4"
        >
          Seterusnya
        </button>
      </div>

      <div
        class="bg-[#1A1E2A] rounded-lg shadow-lg p-6 md:p-8 mb-6 text-center opacity-90"
        v-if="currentQuestionIndex >= questions.length - 1 && !isAnswering"
      >
        <h2 class="text-lg font-semibold">Kuiz Lengkap!</h2>
        <p>Skor Anda: {{ score }}/{{ questions.length }}</p>
        <button
          @click="restartQuiz"
          class="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4"
        >
          Mula Semula Kuiz
        </button>
      </div>

      <!-- New Section for Checking Malicious URL -->
      <div class="text-center mt-8">
        <h3 class="text-lg font-semibold">Periksa Pautan Berbahaya</h3>
        <p class="mb-4">Klik butang di bawah untuk menyemak pautan.</p>
        <NuxtLink
          to="/semak"
          class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Semak Pautan
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
#email-image {
  max-width: 100%;
  height: auto; /* Maintain aspect ratio */
  margin: 10px auto; /* Center the image */
}
</style>
