import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '@/services/authService'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'root',
      component: () => import('@/views/HomeView.vue'),
      beforeEnter: (to, from, next) => {
        if (isAuthenticated()) {
          next({ name: 'dashboard' })
        } else {
          next({ name: 'home' })
        }
      }
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/DashboardView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/challenge',
      name: 'challenge',
      component: () => import('@/views/ChallengeView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('@/views/AccountView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/AdminView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('@/views/SigninView.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/SignupView.vue'),
    },
    {
      path: '/find-email',
      name: 'find-email',
      component: () => import('@/views/FindEmailView.vue'),
    },
    {
      path: '/find-password',
      name: 'find-password',
      component: () => import('@/views/FindPasswordView.vue'),
    },
    {
      path: '/change-password',
      name: 'change-password',
      component: () => import('@/views/ChangePasswordView.vue'),
    },
  ],
})

// 전역 네비게이션 가드
router.beforeEach((to, from, next) => {
  // 인증이 필요한 페이지에 접근할 때
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'signin' })
  } else {
    next()
  }
})

export default router
