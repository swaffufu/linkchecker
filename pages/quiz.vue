<script setup lang="ts">
import { ref } from "vue";
import blenderImage from "~/assets/img/image.png";
import emailImage from "~/assets/img/email.png";
import NavigationBar from '~/components/navbar.vue';

const currentQuestionIndex = ref(0);
const score = ref(0);
const feedbackMessage = ref("");
const feedbackExplanation = ref("");
const showModal = ref(false);

const closeModal = () => {
  showModal.value = false;
};

const questions = ref([
  {
    text: "Adakah emel ini phishing atau sah?",
    image: blenderImage,
    correctAnswer: "Phishing",
    feedback:
      "Emel ini adalah phishing kerana ia mengandungi pautan mencurigakan yang mengarah ke laman web palsu. Alamat emel bukan daripada @coca-cola.com dan link yang tertera tidak sah.",
    fakeUrl: "https://real-coca-cola-login.com",
  },
  {
    text: "Adakah emel ini phishing atau sah?",
    image: emailImage,
    correctAnswer: "Phishing",
    feedback:
      "Emel ini tidak sah kerana pengirim menggunakan @gmail.com, bukan service@paypal.com. Penyerang menyamar untuk mendapatkan kepercayaan pengguna.",
    fakeUrl: "https://paypal2.com",
  },
  {
    text: "Adakah halaman log masuk ini phishing atau sah?",
    iframeUrl: "/google.html",
    correctAnswer: "Phishing",
    feedback:
      "Halaman ini adalah phishing kerana ia meniru halaman log masuk Google untuk mencuri maklumat akaun anda. URL tidak sah, pastikan untuk tidak memasukkan kata laluan anda.",
    fakeUrl: "https://goolge.com",

  },
]);

const isAnswering = ref(true);

const checkAnswer = (answer) => {
  const currentQuestion = questions.value[currentQuestionIndex.value];
  if (answer === currentQuestion.correctAnswer) {
    score.value++;
    feedbackMessage.value = "Betul!";
  } else {
    feedbackMessage.value = "Salah!";
  }

  feedbackExplanation.value = currentQuestion.feedback;
  isAnswering.value = false;
  showModal.value = true;
};

const goToNextQuestion = () => {
  if (currentQuestionIndex.value < questions.value.length - 1) {
    feedbackMessage.value = "";
    feedbackExplanation.value = "";
    currentQuestionIndex.value++;
    isAnswering.value = true;
  }
};

const restartQuiz = () => {
  currentQuestionIndex.value = 0;
  score.value = 0;
  feedbackMessage.value = "";
  feedbackExplanation.value = "";
  isAnswering.value = true;
  closeModal();
};
</script>

<template>
  <NavigationBar />
  <section class="bg-[#e0e0eb] text-white min-h-screen py-8 px-4 md:px-6">
    <div class="container mx-auto">
      <div class="bg-[#1A1E2A] rounded-lg shadow-lg p-6 md:p-8 mb-6 opacity-90 text-center">
        <h1 class="text-2xl font-bold mb-4">Kuiz Phishing</h1>
        <p class="mb-4">{{ questions[currentQuestionIndex].text }}</p>
        
        <div v-if="questions[currentQuestionIndex].iframeUrl" class="relative inline-block">
          <div class="bg-white p-6 rounded-lg shadow-lg">
            <iframe :src="questions[currentQuestionIndex].iframeUrl" width="700" height="500" class="justify-center mt-2 border-0"></iframe>
          </div>
          <div v-if="showModal" class="modal-overlay absolute top-0 right-0">
            <div class="modal-content shadow-lg p-4 w-1/2 text-black">
              <h2 :class="feedbackMessage === 'Betul!' ? 'text-green-600' : 'text-red-600'">
                {{ feedbackMessage }}
              </h2>
              <p>{{ feedbackExplanation }}</p>
              <button @click="closeModal" class="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-1 mt-2">
                Tutup
              </button>
            </div>
          </div>
        </div>

        

        <div v-else class="relative inline-block">
          <a :href="questions[currentQuestionIndex].fakeUrl" target="_blank">
            <img
              :src="questions[currentQuestionIndex].image"
              alt="Contoh Emel"
              id="email-image"
              class="mx-auto mb-4"
            />
          </a>

          <div v-if="showModal" class="modal-overlay absolute top-0 right-0">
            <div class="modal-content shadow-lg p-4 w-1/2 text-black">
              <h2 :class="feedbackMessage === 'Betul!' ? 'text-green-600' : 'text-red-600'">
                {{ feedbackMessage }}
              </h2>
              <p>{{ feedbackExplanation }}</p>
              <button @click="closeModal" class="text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-1 mt-2">
                Tutup
              </button>
            </div>
          </div>
        </div>

        <div class="flex justify-center space-x-4 options" v-if="isAnswering">
          <button @click="checkAnswer('Phishing')" class="text-white bg-red-600 hover:bg-red-700 font-medium rounded-lg text-sm px-5 py-2.5 mt-4">
            Phishing
          </button>
          <button @click="checkAnswer('legitimate')" class="text-white bg-green-600 hover:bg-green-700 font-medium rounded-lg text-sm px-5 py-2.5 mt-4">
            Sah
          </button>
        </div>

        <p v-if="feedbackMessage" :class="feedbackMessage === 'Betul!' ? 'feedback-correct' : 'feedback-incorrect'" class="mt-4">
          {{ feedbackMessage }}
        </p>

        <button
          v-if="!isAnswering && currentQuestionIndex < questions.length - 1"
          @click="() => { goToNextQuestion(); closeModal(); }"
          class="text-white bg-[#4E608F] hover:bg-[#6179B2] font-medium rounded-lg text-sm px-5 py-2.5 mt-4"
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

      <div class="text-center mt-8">
        <h3 class="text-black font-semibold">Periksa Pautan Berbahaya</h3>
        <p class="text-black mb-4">Klik butang di bawah untuk menyemak pautan.</p>
        <NuxtLink
          to="/Main"
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
  height: auto;
  margin: 10px auto;
}

.modal-overlay {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 50;
  background-color: transparent;
}

.modal-content {
  background-color: white;
  border-radius: 8px;
  width: 300px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
}

.feedback-correct {
  color: green;
  font-weight: bold;
  font-size: 2.25rem;
}

.feedback-incorrect {
  color: red;
  font-weight: bold;
  font-size: 2.25rem;
}
</style>
