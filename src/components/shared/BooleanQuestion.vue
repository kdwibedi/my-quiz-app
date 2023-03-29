<template>
  <div class="container">
    <div class="row flex-wrap">
      <div class="col-12 title">
        <div v-html="questions.question"></div>
      </div>
      <div class="col-md-6 mb-3">
        <button @click="selectAnswer('True')"  :disabled="state.showAnswer" class="btn" :class="{
            'btn-danger': state.showAnswer && questions.correct_answer !== 'True',
            'btn-success': state.showAnswer && questions.correct_answer === 'True',
            'btn-primary': !state.showAnswer,
          }"> True </button>
      </div>
      <div class="col-md-6 mb-3">
        <button @click="selectAnswer('False')"  :disabled="state.showAnswer" class="btn" :class="{
            'btn-danger': state.showAnswer && questions.correct_answer !== 'False',
            'btn-success': state.showAnswer && questions.correct_answer === 'False',
            'btn-primary': !state.showAnswer,
          }">False </button>
      </div>
      <div class="col-md-12 mb-3 submit-btn">

        <div v-if="state.showAnswer || store.timer  < 1">
          <div v-if="!state.showAnswer && store.timer  < 1">
             Time Out !!! your score is 0 for this question
          </div>
          <div v-else>
            <div v-if="state.isCorrect">
              Yeah !!! Correct Answer
            </div>
            <div v-else>
                Wrong Answer !!!! 
            </div>
          </div>
          <button class="btn btn-secondary" @click="submitAnswer">Submit Answer</button>        
        </div>     
      </div> 
    </div>

      
    </div>
  </template>
  
  <script>
   
  import { defineComponent, reactive } from 'vue'
  import { useQuizStore } from '../../store/quiz.js'
  
  export default defineComponent({
    props: {
      questions: Object,
    },
    setup(props, {emit}) {
      const store = useQuizStore();
      store.startTimer();

      const state = reactive({
        isCorrect: false,
        showAnswer: false
      });

      const submitAnswer = () => {
        store.startTimer();
        emit('submit-answer', state.isCorrect);
        state.isCorrect = false;
        state.showAnswer = false;
      }
  
      const selectAnswer = (answer) => {
        store.resetTimer();
        state.isCorrect = answer === props.questions.correct_answer
        store.setAnswer(state.isCorrect)
        state.showAnswer = true;
      }

      return {
        submitAnswer,
        selectAnswer,
        state,
        store
      }
    }
  })
  </script>

  <style scoped>
    .title {
      padding: 3rem;
      text-align: left;
      font-size: 2rem;
    }

    @media (max-width: 400px) {
      .title {
        font-size: 1rem;
      }
    }
    button {
      width: 17rem;
      height: 4rem;
    }
    .submit-btn {
      height: 10rem;
      margin-top: 5rem;
    }
</style>
  