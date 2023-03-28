import {defineStore} from 'pinia';

export const useQuizStore = defineStore({
    id: 'quiz',
    state: () => ({
      categories: [],
      questions: [],
      selectedCategory: null,
      selectedDifficulty: null,
      currentQuestionIndex: 0,
      answers: [],
      score: 0,
      timer: 30,
      timerId: null,
      username: ""
    }),
    actions: {

      startTimer() {
        this.resetTimer();
        this.timer = 30;
        this.timerId = setInterval(() => {
          if (this.timer > 0) {
            this.timer--;
          } else {
            this.resetTimer();      
          }
        }, 1000); 
      },
      resetTimer() {
        
        clearInterval(this.timerId);
        this.timerId=null;
        while (this.timerId!== null){
          this.timerId=null;
        }
      }, 
      async fetchCategories() {
        this.isLoading = true;
        try {
            const response = await fetch('https://opentdb.com/api_category.php');
            const data = await response.json();
    
            this.categories = data.trivia_categories;
            this.isLoading = false;
          } catch (error) {
            this.error = error.message;
            this.isLoading = false;
          }

      },
      async fetchQuestions(categoryId,diffcultyId,amount=10) {
        const categoryFilter =categoryId ? `&category=${categoryId}` : ''
        const difficultyFilter = diffcultyId ? `&difficulty=${diffcultyId}` : ''
        console.log(categoryFilter,"==",difficultyFilter);
        try {
            const response = await fetch(`https://opentdb.com/api.php?amount=${amount}${categoryFilter}${difficultyFilter}`);
            const data = await response.json();

        
            this.questions = data.results;
            this.isLoading = false;
          } catch (error) {
            this.error = error.message;
            this.isLoading = false;
          }


        //this.questions = response.data.results
      },
      selectCategory(categoryId) {
        this.selectedCategory = categoryId
      },
      selectDifficulty(difficultyLevel) {
        this.selectedDifficulty = difficultyLevel
      },
      resetQuiz() {
        this.questions = []
        this.username = '';
        this.currentQuestionIndex = 0;
        this.selectedCategory = null
        this.selectedDifficulty = null
        this.score = 0
      },
      setCurrentQuestionIndex(index) {
        this.currentQuestionIndex = index;
      },
      setAnswer(answer) {
        this.answers[this.currentQuestionIndex] = answer;
        console.log(this.currentQuestionIndex,"this.answers",this.answers);
      },
      incrementScore() {
        this.score++;
      },
      incrementQuestionIndex() {
        this.currentQuestionIndex++;
      },
      isQuizOver() {
        console.log("opopuuu",this.questions.length,"==",this.currentQuestionIndex);
        return this.currentQuestionIndex >= this.questions.length ? true : false;
      }
    },
  })