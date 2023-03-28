<template>
  <div class="main-area">   
    <div v-if="isQuizOver" class="text-center m-3">
      <h3>{{ store.username }}  Your score is {{ score }}!</h3>
      <div><button class="btn btn-secondary mt-5 mb-5" @click="redirectToHome">Try Again !</button></div>
    </div>
    <div class="wrapper-outer" v-else>
      <div>Time Remaining: {{store.timer}} </div>
      <component :is="currentQuestionType" :questions="currentQuestion" :answer="currentQuestion.answer" @submit-answer="submitAnswer"></component>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, watchEffect, onMounted   } from 'vue';
import { useQuizStore } from '../store/quiz.js'
import BooleanQuestion from './BooleanQuestion.vue'
import MultiChoice from './MultiChoice.vue'
import {  useRouter } from 'vue-router';

export default defineComponent({
  components: {
    BooleanQuestion,
    MultiChoice
  },
  setup() {
    const router = useRouter();
    const redirectToHome = () => {
      store.resetQuiz();
      router.push({ name: 'home' });
    };
    const store = useQuizStore();

    const isQuizOver = computed(() => store.isQuizOver());
    const score = computed(() => store.score);
    const currentQuestion = computed(() => store.questions[store.currentQuestionIndex] );
    const currentQuestionType = computed(() => store.questions[store.currentQuestionIndex] && store.questions[store.currentQuestionIndex].type === 'boolean' ? 'BooleanQuestion' : 'MultiChoice' );

    const submitAnswer = (answer) => {
     store.setAnswer(answer);
      if (answer) {
        store.incrementScore();
      }
      store.incrementQuestionIndex();
    };

    watchEffect(() => {
      currentQuestion.value,
      currentQuestionType.value,
      isQuizOver.value
    })

    onMounted(async () => {
      if (!store.questions.length) {
        redirectToHome()
      }
    });

    return {
      currentQuestion,
      currentQuestionType,
      isQuizOver,
      score,
      submitAnswer,
      redirectToHome,
      store
    };
  }
});
</script>
<style scoped>
  .main-area {
    display: grid;
    box-shadow: 0 0 25px #0000001a;
    max-width: 800px;
    margin: 0 auto;
    width: 100%;
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
  }

  .wrapper-outer {
    text-align: center;
  }

</style>