<template>
  <div class="container">
    <div class="row flex-wrap">
      <div class="col-12 title">
        <div v-html="questions.question"></div>
      </div>
      <div class="col-md-6 mb-3" v-for="(answer, index) in answers" :key="index">
        <button @click="selectAnswer(answer)"  :disabled="state.showAnswer || quiz.timer  < 1" class="btn" :class="{
            'btn-danger': state.showAnswer && questions.correct_answer != answer,
            'btn-success': state.showAnswer && questions.correct_answer == answer,
            'btn-primary': !state.showAnswer,
          }" v-html="answer"/>

      </div> 
      <div class="col-md-12 mb-3 submit-btn">
        <div v-if="state.showAnswer || quiz.timer  < 1">
          <div v-if="!state.showAnswer && quiz.timer  < 1">
             Time Out !!! your score is 0 for this question
          </div>
          <button class="btn btn-secondary" @click="submitAnswer">Submit Answer</button>
        
        </div> 
      </div> 
    </div>
  </div>
  
  </template>
  
  <script>   
  import { defineComponent, computed ,watchEffect, reactive} from 'vue'
  import { useQuizStore } from '../store/quiz.js'
  
  export default defineComponent({
    props: {
      questions: Object,
      correctAnswerIndex: Number
    },
  
    setup(props, {emit}) {

      const quiz = useQuizStore()
      quiz.startTimer();

      const state = reactive({
        isCorrect: false,
        showAnswer: false
      });

      const answers = computed(() => {
          const answerstemp = [props.questions.correct_answer, ...props.questions.incorrect_answers] 
          const shuffledAnswers = [...answerstemp]
          for (let i = shuffledAnswers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1))
            const temp = shuffledAnswers[i]
            shuffledAnswers[i] = shuffledAnswers[j]
            shuffledAnswers[j] = temp
          }
          return shuffledAnswers
        }      
      );

      const submitAnswer = () => {
        emit('submit-answer', state.isCorrect);
        state.isCorrect = false;
        state.showAnswer = false;
        quiz.startTimer();
      }

      const selectAnswer = (answer) => {
        quiz.resetTimer();
        state.isCorrect = answer === props.questions.correct_answer
        quiz.setAnswer(state.isCorrect)
        state.showAnswer = true;
      }

      watchEffect(() => {
        answers.value
      })

      return {
        submitAnswer,
        answers,
        selectAnswer,
        state,
        quiz
      }
    }
  })
  </script>
  <style scoped>
    .bg-red {
      background-color: red;
    }
    .bg-green {
      background-color: green;
    }

    button {
      width: 17rem;
      height: 4rem;
    }

    .submit-btn {
      height: 10rem;
      margin-top: 5rem;
    }
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
</style>
  