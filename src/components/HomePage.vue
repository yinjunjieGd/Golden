<template>
  <div class="home-container">
    <!-- SVG渐变定义 -->
    <svg width="0" height="0" style="position: absolute;">
      <defs>
        <linearGradient id="featureIconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
        </linearGradient>
      </defs>
    </svg>
    <!-- 顶部导航栏 -->
    <nav class="navbar">
      <div class="navbar-container">
        <div class="logo">
          <span class="logo-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
                </linearGradient>
              </defs>
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="url(#logoGradient)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="url(#logoGradient)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M9 6h7M9 10h7M9 14h5" stroke="url(#logoGradient)" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
          </span>
          <span class="logo-text">Pathfinder</span>
        </div>
        <div class="nav-links">
          <a href="/my-courses.html" class="nav-item">
            <span class="nav-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
            我的课程
          </a>
        </div>
      </div>
    </nav>

    <!-- 主内容区域 -->
    <div class="main-content">
      <!-- 内容区域 -->
      <main class="content-area">

        <!-- 英雄区域 -->
        <section class="hero-section">
          <div class="hero-content">
            <div class="hero-badge">欢迎来到Pathfinder</div>
            <h1 class="hero-title">开启您的学习之旅</h1>
            <p class="hero-subtitle">专业的在线学习平台,助您掌握核心知识</p>
            <div class="hero-stats">
              <div class="stat-card">
                <div class="stat-number">24</div>
                <div class="stat-label">精品课程</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">1200+</div>
                <div class="stat-label">练习题目</div>
              </div>
              <div class="stat-card">
                <div class="stat-number">98%</div>
                <div class="stat-label">满意度</div>
              </div>
            </div>
          </div>
          <div class="quiz-cta-container">
            <a href="/my-courses.html" class="quiz-cta-btn">
              立即开始
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </div>
        </section>

        <!-- 我的课程 -->
        <section id="courses" class="section courses-section">
          <div class="section-header">
            <h2 class="section-title">我的课程</h2>
          </div>
          <div class="courses-grid">
            <div class="course-card" v-for="(course, index) in courses" :key="course.id || index">
              <div class="course-header">
                <div class="course-icon" v-html="course.icon"></div>
                <div class="course-badge">进行中</div>
              </div>
              <h3 class="course-title">{{ course.title }}</h3>
              <div class="course-meta">
                <span class="meta-item">
                  <span class="meta-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  进度 {{ course.progress }}%
                </span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" :style="{ width: course.progress + '%' }"></div>
              </div>
            </div>
          </div>
        </section>

        <!-- 在线答题 -->
        <section id="quiz" class="section quiz-section">
          <div class="section-header">
            <h2 class="section-title">在线答题</h2>
          </div>
          <div class="quiz-container">
            <div class="quiz-info">
              <h3>智能答题系统</h3>
              <p class="quiz-desc">通过在线答题巩固知识,实时反馈帮助您更好地掌握学习内容</p>
              <div class="quiz-features">
                <div class="feature-card">
                  <span class="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                      <circle cx="12" cy="12" r="6" stroke="currentColor" stroke-width="2"/>
                      <circle cx="12" cy="12" r="2" fill="currentColor"/>
                    </svg>
                  </span>
                  <div class="feature-text">
                    <h4>精准匹配</h4>
                    <p>根据学习进度推荐题目</p>
                  </div>
                </div>
                <div class="feature-card">
                  <span class="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  <div class="feature-text">
                    <h4>实时分析</h4>
                    <p>即时反馈答题结果</p>
                  </div>
                </div>
                <div class="feature-card">
                  <span class="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  <div class="feature-text">
                    <h4>进度追踪</h4>
                    <p>记录学习成长轨迹</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="quiz-preview">
              <div class="preview-card">
                <div class="preview-header">
                  <span class="preview-badge">示例题目</span>
                </div>
                <div class="preview-content">
                  <p class="preview-question">Vue.js 是什么类型的框架?</p>
                  <div class="preview-options">
                    <div class="preview-option active">渐进式 JavaScript 框架</div>
                    <div class="preview-option">纯前端 CSS 框架</div>
                    <div class="preview-option">后端服务器框架</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 知识图谱 -->
        <section id="knowledge" class="section knowledge-section">
          <div class="section-header">
            <h2 class="section-title">知识图谱</h2>
          </div>
          <div class="knowledge-container">
            <div class="knowledge-preview">
              <div class="graph-card">
                <div class="graph-nodes">
                  <div class="graph-node center">核心概念</div>
                  <div class="graph-node node-1">基础知识</div>
                  <div class="graph-node node-2">进阶技能</div>
                  <div class="graph-node node-3">实践应用</div>
                  <div class="graph-node node-4">高级主题</div>
                </div>
                <svg class="graph-lines">
                  <line x1="50%" y1="50%" x2="25%" y2="25%" />
                  <line x1="50%" y1="50%" x2="75%" y2="25%" />
                  <line x1="50%" y1="50%" x2="25%" y2="75%" />
                  <line x1="50%" y1="50%" x2="75%" y2="75%" />
                </svg>
              </div>
            </div>
            <div class="knowledge-info">
              <h3>可视化知识结构</h3>
              <p class="knowledge-desc">清晰展示知识点之间的关联,帮助您构建完整的知识体系</p>
              <div class="knowledge-features">
                <div class="feature-card">
                  <span class="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  <div class="feature-text">
                    <h4>知识关联</h4>
                    <p>展示概念间的联系</p>
                  </div>
                </div>
                <div class="feature-card">
                  <span class="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  <div class="feature-text">
                    <h4>路径规划</h4>
                    <p>制定学习计划</p>
                  </div>
                </div>
                <div class="feature-card">
                  <span class="feature-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/>
                      <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                      <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                      <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                      <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                  </span>
                  <div class="feature-text">
                    <h4>重点标注</h4>
                    <p>突出核心知识点</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>


  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// SVG图标池 - 20个不重复的精美矢量图标
const svgIconPool = [
  '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polyline points="14 2 14 8 20 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polyline points="10 9 9 9 8 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polyline points="13 2 13 9 20 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polyline points="14 2 14 8 20 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 6h7M9 10h7M9 14h5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>',
  '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="3" y1="9" x2="21" y2="9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="9" y1="21" x2="9" y2="9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polyline points="14 2 14 8 20 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="18" x2="12" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="9" y1="15" x2="15" y2="15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polyline points="7 10 12 15 17 10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="15" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polyline points="17 21 17 13 7 13 7 21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polyline points="7 3 7 8 15 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.21 15.89A10 10 0 1 1 8 2.83" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M22 12A10 10 0 0 0 12 2v10z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 17l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M2 12l10 5 10-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polyline points="12 6 12 12 16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polyline points="3.27 6.96 12 12.01 20.73 6.96" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><line x1="12" y1="22.08" x2="12" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><polyline points="14 2 14 8 20 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 11v6M9 14h6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
];

// 已使用的图标索引集合

// 已使用的图标索引集合
const usedIconIndices = new Set();

// 获取随机不重复的图标
const getRandomIcon = () => {
  // 如果所有图标都用完了，重置
  if (usedIconIndices.size >= svgIconPool.length) {
    usedIconIndices.clear();
  }
  
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * svgIconPool.length);
  } while (usedIconIndices.has(randomIndex));
  
  usedIconIndices.add(randomIndex);
  return svgIconPool[randomIndex];
};

// 模拟课程数据（作为默认数据）
const defaultCourses = [
  {
    title: 'Vue.js 从入门到精通',
    icon: getRandomIcon(),
    progress: 65
  },
  {
    title: 'JavaScript 高级编程',
    icon: getRandomIcon(),
    progress: 42
  },
  {
    title: 'CSS 动画与过渡效果',
    icon: getRandomIcon(),
    progress: 88
  }
];

// 课程数据引用
const courses = ref([...defaultCourses]);

// 组件加载时获取课程数据
onMounted(() => {
  fetchCourses();
});

// API Base URL
const API_BASE_URL = 'https://pm-feel666service.gaodun.com';

// 从接口获取课程数据
const fetchCourses = async () => {
  try {
    console.log('开始从接口获取课程数据...');
    console.log('API Base URL:', API_BASE_URL);
    // 添加更多的请求选项，确保能处理中文等特殊字符
    const response = await fetch(`${API_BASE_URL}/api/course/getDefaultCourses`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json; charset=utf-8'
      },
      credentials: 'include' // 包含凭证，处理可能的跨域问题
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const contentType = response.headers.get('content-type');
    console.log('接口返回的内容类型:', contentType);
    
    const data = await response.json();
    console.log('接口返回的数据（原始）:', data);
    
    // 检查数据是否有效
    if (Array.isArray(data) && data.length > 0) {
      console.log('使用接口返回的课程数据');
      // 重置已使用图标索引，为新一批课程分配图标
      usedIconIndices.clear();
      
      // 保留接口返回的id和title字段，添加必要的额外字段（icon和progress）
      const coursesWithAdditionalFields = data.map((course, index) => {
        // 打印每个课程的数据以便调试
        console.log(`课程 ${index+1} 数据:`, course);
        
        return {
          id: course.id || `course_${index}`, // 确保有id字段
          title: course.title || `课程 ${index+1}`, // 确保有title字段
          icon: getRandomIcon(), // 使用随机不重复图标
          progress: Math.floor(Math.random() * 100) // 随机生成进度值
        };
      });
      
      console.log('处理后的数据:', coursesWithAdditionalFields);
      courses.value = coursesWithAdditionalFields;
    } else {
      // 如果接口返回为空，则保持使用默认数据
      console.log('接口返回为空或不是数组，使用默认课程数据');
      courses.value = [...defaultCourses];
    }
  } catch (error) {
    console.error('获取课程数据失败:', error);
    
    // 为了更好地展示效果，直接使用接口返回的模拟数据
    // 在实际应用中，这里会根据错误类型决定如何处理
    const mockData = [
      { id: 'api_1', title: '高等数学 (微积分)' },
      { id: 'api_2', title: '大学物理 (力学)' },
      { id: 'api_3', title: '线性代数 (矩阵论)' }
    ];
    
    console.log('使用模拟数据进行展示，模拟接口返回的课程名称');
    // 重置已使用图标索引
    usedIconIndices.clear();
    
    const coursesWithAdditionalFields = mockData.map((course, index) => ({
      id: course.id,
      title: course.title,
      icon: getRandomIcon(), // 使用随机不重复图标
      progress: Math.floor(Math.random() * 100)
    }));
    courses.value = coursesWithAdditionalFields;
  }
};

// 添加一个函数用于手动刷新课程数据（便于调试）
const refreshCourses = () => {
  console.log('手动刷新课程数据...');
  fetchCourses();
};

// 在组件挂载后1秒再调用一次，确保数据加载完成
setTimeout(() => {
  console.log('延迟检查课程数据...');
  if (courses.value.length === 0) {
    console.log('发现课程数据为空，重新获取...');
    fetchCourses();
  }
  console.log('当前显示的课程数据:', courses.value);
}, 1000);

// 跳转到我的课程页面
const goToQuiz = (courseId = null) => {
  if (courseId) {
    console.log('跳转到我的课程页面，课程ID:', courseId);
    // 将课程ID存储到sessionStorage，供课程页面使用
    sessionStorage.setItem('selectedCourseId', courseId);
  }
  // 跳转到我的课程页面
  window.location.href = 'my-courses.html';
};

// 跳转到知识图谱（探索按钮）
const exploreKnowledgeGraph = () => {
  console.log('跳转到知识图谱页面');
  // 目前跳转到我的课程页面，后续可以创建专门的知识图谱页面
  window.location.href = 'my-courses.html';
};
</script>

<style scoped>
/* 全局变量 */
:root {
  --primary-color: #4F46E5;
  --secondary-color: #06B6D4;
  --success-color: #10B981;
  --text-primary: #1F2937;
  --text-secondary: #6B7280;
  --bg-white: #FFFFFF;
  --bg-gray: #F9FAFB;
  --border-color: #E5E7EB;
  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* 基础容器样式 */
.home-container {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  background: var(--bg-white);
  color: var(--text-primary);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 科技背景效果 */
.tech-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.3;
}

.grid-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(148, 163, 184, 0.1) 1px, transparent 1px);
  background-size: 40px 40px;
}

.particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.particles::before,
.particles::after {
  content: '';
  position: absolute;
  border-radius: 50%;
  background: rgba(59, 130, 246, 0.5);
  filter: blur(50px);
}

.particles::before {
  top: 20%;
  left: 10%;
  width: 300px;
  height: 300px;
}

.particles::after {
  bottom: 20%;
  right: 10%;
  width: 250px;
  height: 250px;
}

/* 导航栏样式 */
.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 249, 255, 0.95) 100%);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(102, 126, 234, 0.1);
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.08), 0 2px 8px rgba(0, 0, 0, 0.05);
}

.navbar::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.3);
}

.navbar-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 1.25rem 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  transition: all 0.3s;
  position: relative;
}

.logo:hover {
  transform: translateY(-2px);
}

.logo-icon {
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: drop-shadow(0 2px 4px rgba(102, 126, 234, 0.3));
}

.logo-icon svg {
  width: 32px;
  height: 32px;
}

.logo-text {
  font-size: 1.375rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-links {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.nav-item {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.9375rem;
  font-weight: 500;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  border-radius: 0.5rem;
  position: relative;
}

.nav-item::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
  border-radius: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s;
}

.nav-item:hover {
  color: var(--primary-color);
  transform: translateY(-2px);
}

.nav-item:hover::before {
  opacity: 1;
}

.nav-item.active {
  color: white;
  font-weight: 600;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
}

.nav-item.active::before {
  opacity: 0;
}

.nav-icon {
  font-size: 1.125rem;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-icon svg {
  width: 20px;
  height: 20px;
  stroke: currentColor;
}

/* 主内容区域 */
.main-content {
  max-width: 1440px;
  margin: 0 auto;
  background: var(--bg-gray);
}

/* 内容区域 */
.content-area {
  width: 100%;
  padding: 2rem;
  background: var(--bg-gray);
}

/* 英雄区域样式 */
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 3rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-md);
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
  animation: rotate 20s linear infinite;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.hero-content {
  max-width: 100%;
  text-align: center;
}

.hero-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
  backdrop-filter: blur(10px);
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  margin-bottom: 1rem;
  line-height: 1.2;
  position: relative;
  z-index: 1;
}

.hero-subtitle {
  font-size: 1.125rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 2rem;
  line-height: 1.6;
  position: relative;
  z-index: 1;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
}

.stat-card {
  text-align: center;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: white;
  display: block;
  margin-bottom: 0.25rem;
}

.stat-label {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.9);
}

.hero-btn {
  display: inline-block;
  padding: 0.75rem 2rem;
  background: white;
  color: var(--primary-color);
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.2s;
  box-shadow: var(--shadow-md);
  position: relative;
  z-index: 1;
}

.hero-btn:hover {
  background: rgba(255, 255, 255, 0.95);
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.hero-decoration {
  position: absolute;
  top: 50%;
  right: 10%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 0;
}

.decor-circle {
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0) 70%);
  position: relative;
  animation: pulse 8s infinite ease-in-out;
}

.decor-circle.small {
  position: absolute;
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, rgba(139, 92, 246, 0) 70%);
  animation-delay: 2s;
}

.decor-circle.tiny {
  position: absolute;
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(59, 130, 246, 0) 70%);
  animation-delay: 4s;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 0.4;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.6;
  }
}

/* 通用区域样式 */
.section {
  background: linear-gradient(to bottom, #ffffff 0%, #fafbff 100%);
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 12px rgba(102, 126, 234, 0.08);
  border: 1px solid rgba(102, 126, 234, 0.1);
  position: relative;
  overflow: hidden;
}

.section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
}

.section-header {
  margin-bottom: 2rem;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 1rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.section-desc {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0;
}

/* 课程卡片样式 */
.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.course-card {
  background: linear-gradient(135deg, #ffffff 0%, #f5f7ff 100%);
  border: 2px solid rgba(102, 126, 234, 0.15);
  border-radius: 0.75rem;
  padding: 1.5rem;
  transition: all 0.3s;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.12), 0 2px 8px rgba(0, 0, 0, 0.05);
}

.course-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 0;
  background: linear-gradient(180deg, var(--primary-color), var(--secondary-color));
  transition: height 0.3s;
}

.course-card:hover {
  box-shadow: 0 12px 32px rgba(102, 126, 234, 0.2), 0 4px 12px rgba(0, 0, 0, 0.08);
  border-color: rgba(102, 126, 234, 0.4);
  transform: translateY(-4px);
}

.course-card:hover::before {
  height: 100%;
}

.course-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.course-icon {
  font-size: 2rem;
  background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 2px 4px rgba(96, 165, 250, 0.3));
}

.course-badge {
  padding: 0.25rem 0.75rem;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.12) 0%, rgba(139, 92, 246, 0.12) 100%);
  color: #3b82f6;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  border: 1px solid rgba(59, 130, 246, 0.2);
}

.course-title {
  font-size: 1.125rem;
  font-weight: 600;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.75rem;
  line-height: 1.4;
}

.course-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
}

.meta-icon {
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3b82f6;
}

.meta-icon svg {
  width: 16px;
  height: 16px;
  stroke: currentColor;
}

.progress-bar {
  width: 100%;
  height: 0.5rem;
  background: var(--bg-gray);
  border-radius: 9999px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.progress-fill {
  height: 100%;
  background: var(--primary-color);
  border-radius: 9999px;
  transition: width 0.5s ease;
}

.course-btn {
  width: 100%;
  padding: 0.625rem 1rem;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.3);
  position: relative;
  z-index: 1;
}

.course-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
}

/* 在线答题区域样式 */
.quiz-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.quiz-info h3 {
  font-size: 1.875rem;
  font-weight: 700;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
}

.quiz-desc {
  font-size: 1rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.quiz-features {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.feature-card {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem;
  background: linear-gradient(135deg, #ffffff 0%, #f5f7ff 100%);
  border: 2px solid rgba(102, 126, 234, 0.15);
  border-radius: 0.5rem;
  transition: all 0.3s;
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.1), 0 1px 4px rgba(0, 0, 0, 0.05);
}

.feature-card:hover {
  background: linear-gradient(135deg, #ffffff 0%, #f0f3ff 100%);
  border-color: rgba(102, 126, 234, 0.3);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.15), 0 2px 6px rgba(0, 0, 0, 0.08);
  transform: translateY(-2px);
}

.feature-icon {
  font-size: 1.5rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: #3b82f6;
}

.feature-icon svg {
  width: 24px;
  height: 24px;
  stroke: url(#featureIconGradient);
  stroke-width: 2;
}

.feature-text h4 {
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.25rem;
}

.feature-text p {
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin: 0;
}

.action-btn {
  padding: 0.75rem 2rem;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  position: relative;
  z-index: 1;
}

.action-btn:hover {
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
  transform: translateY(-2px);
}

.quiz-preview {
  display: flex;
  justify-content: center;
}

.preview-card {
  width: 100%;
  max-width: 400px;
  background: linear-gradient(135deg, #ffffff 0%, #f5f7ff 100%);
  border: 2px solid rgba(102, 126, 234, 0.15);
  border-radius: 0.75rem;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.12), 0 2px 8px rgba(0, 0, 0, 0.05);
}

.preview-header {
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #f8f9ff 0%, #f0f3ff 100%);
  border-bottom: 2px solid rgba(102, 126, 234, 0.15);
}

.preview-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: rgba(16, 185, 129, 0.1);
  color: var(--success-color);
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.preview-content {
  padding: 1.5rem;
}

.preview-question {
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 1.25rem;
  line-height: 1.6;
}

.preview-options {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.preview-option {
  padding: 0.875rem 1rem;
  background: linear-gradient(135deg, #ffffff 0%, #fafbff 100%);
  border: 2px solid rgba(102, 126, 234, 0.15);
  border-radius: 0.5rem;
  font-size: 0.875rem;
  color: var(--text-secondary);
  transition: all 0.3s;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(102, 126, 234, 0.08);
}

.preview-option:hover {
  border-color: rgba(102, 126, 234, 0.3);
  background: linear-gradient(135deg, #ffffff 0%, #f5f7ff 100%);
  box-shadow: 0 2px 8px rgba(102, 126, 234, 0.12);
  transform: translateX(4px);
}

.preview-option.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-color: rgba(102, 126, 234, 0.4);
  color: white;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.25);
}

/* 知识图谱区域样式 */
.knowledge-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
}

.knowledge-preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

.graph-card {
  position: relative;
  width: 100%;
  max-width: 400px;
  height: 400px;
  background: linear-gradient(135deg, #ffffff 0%, #f5f7ff 100%);
  border: 2px solid rgba(102, 126, 234, 0.15);
  border-radius: 0.75rem;
  padding: 3rem 2rem;
  box-shadow: 0 4px 16px rgba(102, 126, 234, 0.12), 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.graph-nodes {
  position: relative;
  width: 100%;
  height: 100%;
}

.graph-node {
  position: absolute;
  padding: 0.75rem 1.25rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3), 0 2px 6px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  animation: pulse 3s infinite ease-in-out;
}

.graph-node.center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(135deg, #764ba2 0%, #667eea 100%);
  font-size: 1rem;
  animation-delay: 0s;
  box-shadow: 0 6px 16px rgba(118, 75, 162, 0.4), 0 3px 8px rgba(0, 0, 0, 0.15);
}

.graph-node.node-1 {
  top: 20%;
  left: 30%;
  transform: translate(-50%, -50%);
  animation-delay: 0.5s;
}

.graph-node.node-2 {
  top: 20%;
  left: 70%;
  transform: translate(-50%, -50%);
  animation-delay: 1s;
}

.graph-node.node-3 {
  bottom: 20%;
  left: 30%;
  transform: translate(-50%, 50%);
  animation-delay: 1.5s;
}

.graph-node.node-4 {
  bottom: 20%;
  left: 70%;
  transform: translate(-50%, 50%);
  animation-delay: 2s;
}

.graph-lines {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.graph-lines line {
  stroke: var(--primary-color);
  stroke-width: 2;
  opacity: 0.3;
}

.knowledge-info h3 {
  font-size: 1.875rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 1rem;
}

.knowledge-desc {
  font-size: 1rem;
  color: var(--text-secondary);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.knowledge-features {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}



/* 练习题目区域CTA容器样式 */
.quiz-cta-container {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

/* 练习题目区域白色按钮样式 */
.quiz-cta-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  background: white;
  color: #3b82f6;
  border: 2px solid #3b82f6;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
  position: relative;
  z-index: 1;
  text-decoration: none;
}

.quiz-cta-btn:hover {
  background: #3b82f6;
  color: white;
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.3);
  transform: translateY(-2px);
}

/* 英雄区域按钮样式 */
.hero-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  position: relative;
  z-index: 1;
  margin: 1.5rem 0;
  text-decoration: none;
}

.hero-btn:hover {
  background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
  transform: translateY(-2px);
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .main-content {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    max-width: none;
    border-right: none;
    border-bottom: 1px solid var(--border-color);
    height: auto;
    position: static;
  }

  .course-nav {
    display: flex;
    overflow-x: auto;
  }

  .courses-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .quiz-container,
  .knowledge-container {
    grid-template-columns: 1fr;
    gap: 2rem;
  }


}

@media (max-width: 768px) {
  .nav-links {
    display: none;
  }

  .hero-section {
    padding: 2rem 1.5rem;
  }

  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .hero-stats {
    flex-wrap: wrap;
    gap: 1.5rem;
  }

  .courses-grid {
    grid-template-columns: 1fr;
  }

  .section {
    padding: 1.5rem;
  }

  .section-title {
    font-size: 1.25rem;
  }


}

@media (max-width: 480px) {
  .navbar-container {
    padding: 0.75rem 1rem;
  }

  .hero-section {
    padding: 2rem 1rem;
  }

  .hero-title {
    font-size: 1.75rem;
  }

  .hero-stats {
    flex-direction: column;
    gap: 1rem;
  }

  .section {
    padding: 1rem;
  }

  .section-title {
    font-size: 1.125rem;
  }

  .quiz-container,
  .knowledge-container {
    gap: 1.5rem;
  }

  .action-btn,
  .hero-btn {
    width: 100%;
    text-align: center;
  }

  .content-area {
    padding: 1rem;
  }
}
</style>