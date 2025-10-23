<template>
  <div class="quiz-container">
    <h1 class="quiz-title">在线答题</h1>
    
    <div v-if="currentQuestion" class="question-card">
      <div class="question-header">
        <span class="question-number">问题 {{ currentIndex + 1 }}/{{ questions.length }}</span>
        <span class="score-display">得分: {{ score }}</span>
      </div>
      
      <h2 class="question-text">{{ currentQuestion.stem }}</h2>
      <div class="question-type-badge">{{ currentQuestion.type === 'single_choice' ? '单选题' : '多选题' }}</div>
      
      <div class="options-container">
        <button
          v-for="(key, index) in Object.keys(currentQuestion.options)"
          :key="key"
          :class="[
            'option-btn',
            isOptionSelected(key) ? 'selected' : '',
            submitted ? (isCorrectOption(key) ? 'correct' : (isOptionSelected(key) ? 'incorrect' : '')) : ''
          ]"
          :disabled="submitted"
          @click="selectOption(key)"
        >
          {{ key }}. {{ currentQuestion.options[key] }}
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

// 题库数据（从接口获取或使用默认数据）
const questions = ref([]);

const currentIndex = ref(0);
const selectedOption = ref(null); // 单选题：字符串（如'A'）；多选题：数组（如['A', 'B']）
const submitted = ref(false);
const score = ref(0);
const quizCompleted = ref(false);
const startTime = ref(null);
const timeSpent = ref(0);
let timerInterval = null;

// 从sessionStorage加载题目数据
const loadQuestions = () => {
  try {
    const storedQuestions = sessionStorage.getItem('quizQuestions');
    if (storedQuestions) {
      const parsedQuestions = JSON.parse(storedQuestions);
      console.log('从sessionStorage加载的题目:', parsedQuestions);
      questions.value = parsedQuestions;
    } else {
      console.log('未找到题目数据，使用默认题目');
      // 使用默认题目
      questions.value = [
        {
          questionId: 1,
          stem: 'Vue.js 是什么类型的框架?',
          type: 'single_choice',
          options: {
            'A': '渐进式 JavaScript 框架',
            'B': '纯前端 CSS 框架',
            'C': '后端服务器框架',
            'D': '数据库框架'
          },
          correctAnswer: 'A'
        },
        {
          questionId: 2,
          stem: 'Vue 3 有哪些新特性？（多选）',
          type: 'multiple_choice',
          options: {
            'A': 'Composition API',
            'B': 'Teleport',
            'C': 'Fragments',
            'D': 'jQuery集成'
          },
          correctAnswer: ['A', 'B', 'C']
        }
      ];
    }
  } catch (error) {
    console.error('加载题目数据失败:', error);
    questions.value = [];
  }
};

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

// 判断选项是否被选中
const isOptionSelected = (key) => {
  if (currentQuestion.value.type === 'single_choice') {
    return selectedOption.value === key;
  } else {
    return Array.isArray(selectedOption.value) && selectedOption.value.includes(key);
  }
};

// 判断选项是否是正确答案
const isCorrectOption = (key) => {
  const correctAnswer = currentQuestion.value.correctAnswer;
  if (Array.isArray(correctAnswer)) {
    return correctAnswer.includes(key);
  } else {
    return correctAnswer === key;
  }
};

// 选择答案
const selectOption = (key) => {
  if (!submitted.value) {
    if (currentQuestion.value.type === 'single_choice') {
      // 单选题：直接设置选中的选项
      selectedOption.value = key;
    } else {
      // 多选题：切换选项的选中状态
      if (!Array.isArray(selectedOption.value)) {
        selectedOption.value = [];
      }
      const index = selectedOption.value.indexOf(key);
      if (index > -1) {
        selectedOption.value.splice(index, 1);
      } else {
        selectedOption.value.push(key);
      }
    }
  }
};

// 提交答案
const submitAnswer = () => {
  if (selectedOption.value !== null && 
      (currentQuestion.value.type === 'single_choice' || 
       (Array.isArray(selectedOption.value) && selectedOption.value.length > 0))) {
    submitted.value = true;
    
    // 判断答案是否正确
    const correctAnswer = currentQuestion.value.correctAnswer;
    let isCorrect = false;
    
    if (currentQuestion.value.type === 'single_choice') {
      isCorrect = selectedOption.value === correctAnswer;
    } else {
      // 多选题：所选答案与正确答案完全一致
      const selected = Array.isArray(selectedOption.value) ? selectedOption.value.sort() : [];
      const correct = Array.isArray(correctAnswer) ? correctAnswer.sort() : [];
      isCorrect = JSON.stringify(selected) === JSON.stringify(correct);
    }
    
    if (isCorrect) {
      score.value++;
    }
  }
};

// 下一题
const goToNextQuestion = () => {
  if (currentIndex.value < questions.value.length - 1) {
    currentIndex.value++;
    // 重置选项（根据题型初始化）
    const nextQuestion = questions.value[currentIndex.value];
    selectedOption.value = nextQuestion.type === 'multiple_choice' ? [] : null;
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
  // 根据第一题的题型初始化
  const firstQuestion = questions.value[0];
  selectedOption.value = firstQuestion?.type === 'multiple_choice' ? [] : null;
  submitted.value = false;
  score.value = 0;
  quizCompleted.value = false;
  timeSpent.value = 0;
  startTimer();
};

// 生命周期
onMounted(() => {
  loadQuestions();
  // 根据第一题的题型初始化selectedOption
  if (questions.value.length > 0) {
    selectedOption.value = questions.value[0].type === 'multiple_choice' ? [] : null;
  }
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
  margin-bottom: 15px;
  color: #333;
  line-height: 1.5;
}

.question-type-badge {
  display: inline-block;
  padding: 4px 12px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 20px;
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