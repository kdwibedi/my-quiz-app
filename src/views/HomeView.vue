<template>
  <div class="main-area">
    <div class="container">
      <label class="d-flex">Enter Your Name</label>

      <input type="text" class="form-control" v-model="uname"/>
      <label class="d-flex">Select Category</label>

      <select  class="form-select" v-model="selectedCategory">
        <option value="">Any Category</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
      </select>
  
      <label class="d-flex">Select Difficulty</label>
      <select  class="form-select" v-model="selectedDifficulty">
        <option value="">Any Difficulty</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select> 
  
      <div class="col-md-12 mb-3 submit-btn text-center">
        <button type="button" class="btn btn-secondary mt-4"  @click="fetchQuestions">Start Quiz</button>  
      </div>     

    </div>
  </div>
</template>

<script>
import { useQuizStore } from '../store/quiz.js'
export default {
  data() {
    return {
      categories: [],
      questions: [],
      selectedCategory: '',
      selectedAnswer: {},
      startQuiz: false,
      selectedDifficulty: 'easy',
      uname: ''
    };
  },
  methods: {
    async fetchCategories() {
      const store = useQuizStore();
      await store.fetchCategories();
      this.categories = store.categories;
      this.selectedCategory = this.categories[0].id;
    },
    async fetchQuestions() {
      const store = useQuizStore();
      await store.fetchQuestions(this.selectedCategory, this.selectedDifficulty);
      store.username = this.uname;
      this.questions = store.questions;
      this.selectedAnswer = {};
      this.startQuiz = true;
      this.$router.push({
        name: 'GamePage',
      })
    }    
  },
  async created() {
    await this.fetchCategories();
  },
};
</script>
<style>
  .main-area {
    display: grid;
    box-shadow: 0 0 25px #0000001a;
    max-width: 640px;
    margin: 0 auto;
    width: 100%;
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
  }
  button {
    width: 17rem;
    height: 4rem;
  }

  .submit-btn {
    height: 10rem;
    margin-top: 5rem;
  }
  label {
    display: flex;
    align-items: center;
    justify-content: left;
    margin: 2rem 0rem 0.3rem;
  }
</style>