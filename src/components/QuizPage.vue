<template>
  <div class="quiz-container">
    <h1 class="quiz-title">在线答题</h1>
    
    <div v-if="currentQuestion" class="question-card">
      <div class="question-header">
        <span class="question-number">问题 {{ currentIndex + 1 }}/{{ questions.length }}</span>
        <span class="score-display">得分: {{ score }}</span>
      </div>
      
      <h2 class="question-text">{{ currentQuestion.question }}</h2>
      
      <div class="options-container">
        <button
          v-for="(option, index) in currentQuestion.options"
          :key="index"
          :class="[
            'option-btn',
            selectedOption === index ? 'selected' : '',
            submitted ? (index === currentQuestion.correctAnswer ? 'correct' : 'incorrect') : ''
          ]"
          :disabled="submitted"
          @click="selectOption(index)"
        >
          {{ String.fromCharCode(65 + index) }}. {{ option }}
        </button>
      </div>
      
      <div class="action-buttons">
        <button
          v-if="!submitted"
          class="submit-btn"
          :disabled="selectedOption === null"
          @click="submitAnswer"
        >
          提交答案
        </button>
        <button
          v-if="submitted"
          class="next-btn"
          @click="goToNextQuestion"
        >
          {{ currentIndex === questions.length - 1 ? '完成测验' : '下一题' }}
        </button>
      </div>
    </div>
    
    <div v-else-if="quizCompleted" class="result-card">
      <h2 class="result-title">测验完成!</h2>
      <div class="final-score">
        你的得分: {{ score }}/{{ questions.length }}
      </div>
      <div class="result-stats">
        <p>正确率: {{ ((score / questions.length) * 100).toFixed(1) }}%</p>
        <p>用时: {{ timeSpent }} 秒</p>
      </div>
      <button class="restart-btn" @click="restartQuiz">
        重新开始
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';

// 模拟题库数据
const questions = ref([
  {
    question: 'Vue.js 是什么类型的框架?',
    options: [
      '渐进式 JavaScript 框架',
      '纯前端 CSS 框架',
      '后端服务器框架',
      '数据库框架'
    ],
    correctAnswer: 0
  },
  {
    question: 'Vue 3 中组合式 API 的入口函数是什么?',
    options: [
      'setup()',
      'init()',
      'create()',
      'start()'
    ],
    correctAnswer: 0
  },
  {
    question: '以下哪个不是 Vue 的生命周期钩子?',
    options: [
      'onMounted',
      'onBeforeUpdate',
      'onComplete',
      'onUnmounted'
    ],
    correctAnswer: 2
  },
  {
    question: 'Vue 中的响应式数据是通过什么实现的?',
    options: [
      'Object.defineProperty',
      'Proxy',
      'ES6 装饰器',
      '以上都不是'
    ],
    correctAnswer: 1
  },
  {
    question: '在 Vue 3 中，以下哪个是新的组件类型?',
    options: [
      'Fragment',
      'Teleport',
      'Suspense',
      '以上都是'
    ],
    correctAnswer: 3
  }
]);

const currentIndex = ref(0);
const selectedOption = ref(null);
const submitted = ref(false);
const score = ref(0);
const quizCompleted = ref(false);
const startTime = ref(null);
const timeSpent = ref(0);
let timerInterval = null;

// 计算当前问题
const currentQuestion = computed(() => {
  if (quizCompleted.value) return null;
  return questions.value[currentIndex.value];
});

// 开始计时
const startTimer = () => {
  startTime.value = Date.now();
  timerInterval = setInterval(() => {
    timeSpent.value = Math.floor((Date.now() - startTime.value) / 1000);
  }, 1000);
};

// 停止计时
const stopTimer = () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
};

// 选择答案
const selectOption = (index) => {
  if (!submitted.value) {
    selectedOption.value = index;
  }
};

// 提交答案
const submitAnswer = () => {
  if (selectedOption.value !== null) {
    submitted.value = true;
    if (selectedOption.value === currentQuestion.value.correctAnswer) {
      score.value++;
    }
  }
};

// 下一题
const goToNextQuestion = () => {
  if (currentIndex.value < questions.value.length - 1) {
    currentIndex.value++;
    selectedOption.value = null;
    submitted.value = false;
  } else {
    // 完成测验
    stopTimer();
    quizCompleted.value = true;
  }
};

// 重新开始
const restartQuiz = () => {
  currentIndex.value = 0;
  selectedOption.value = null;
  submitted.value = false;
  score.value = 0;
  quizCompleted.value = false;
  timeSpent.value = 0;
  startTimer();
};

// 生命周期
onMounted(() => {
  startTimer();
});

onUnmounted(() => {
  stopTimer();
});
</script>

<style scoped>
.quiz-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.quiz-title {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: 600;
}

.question-card,
.result-card {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
}

.question-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.question-number {
  font-weight: 600;
  color: #666;
}

.score-display {
  font-weight: 600;
  color: #42b883;
}

.question-text {
  font-size: 20px;
  margin-bottom: 25px;
  color: #333;
  line-height: 1.5;
}

.options-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 30px;
}

.option-btn {
  background: #f8f9fa;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  padding: 15px 20px;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 16px;
  color: #495057;
}

.option-btn:hover:not(:disabled) {
  background: #e9ecef;
  border-color: #dee2e6;
  transform: translateY(-1px);
}

.option-btn.selected {
  background: #e3f2fd;
  border-color: #2196f3;
}

.option-btn.correct {
  background: #e8f5e9;
  border-color: #4caf50;
  color: #2e7d32;
}

.option-btn.incorrect {
  background: #ffebee;
  border-color: #f44336;
  color: #c62828;
}

.option-btn:disabled {
  cursor: not-allowed;
  opacity: 0.9;
}

.action-buttons {
  display: flex;
  justify-content: center;
}

.submit-btn,
.next-btn,
.restart-btn {
  padding: 12px 30px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 120px;
}

.submit-btn {
  background: #2196f3;
  color: white;
}

.submit-btn:hover:not(:disabled) {
  background: #1976d2;
  transform: translateY(-1px);
}

.submit-btn:disabled {
  background: #bdbdbd;
  cursor: not-allowed;
}

.next-btn {
  background: #4caf50;
  color: white;
}

.next-btn:hover {
  background: #388e3c;
  transform: translateY(-1px);
}

.result-card {
  text-align: center;
}

.result-title {
  color: #333;
  margin-bottom: 20px;
  font-size: 24px;
}

.final-score {
  font-size: 36px;
  font-weight: bold;
  color: #2196f3;
  margin-bottom: 20px;
}

.result-stats {
  margin-bottom: 30px;
  font-size: 16px;
  color: #666;
}

.result-stats p {
  margin: 8px 0;
}

.restart-btn {
  background: #ff9800;
  color: white;
}

.restart-btn:hover {
  background: #f57c00;
  transform: translateY(-1px);
}
</style>