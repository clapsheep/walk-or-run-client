import { isAuthenticated } from '@/core/auth/services/loginService'
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

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
      component: () => import('@/layouts/AdminLayout.vue'),
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      },
      children: [
        {
          path: 'challenges/ongoing',
          name: 'admin-ongoing-challenges',
          component: () => import('@/views/admin/OngoingChallengeView.vue')
        },
        {
          path: 'challenges/ended',
          name: 'admin-ended-challenges',
          component: () => import('@/views/admin/EndedChallengeView.vue')
        },
        {
          path: 'challenges/schedule',
          name: 'admin-schedule',
          component: () => import('@/views/admin/ScheduleManageView.vue')
        }
      ],
      redirect: { name: 'admin-ongoing-challenges' }
    },
    {
      path: '/admin/challenge/create',
      name: 'create-challenge',
      component: () => import('@/views/admin/CreateChallengeView.vue'),
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
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
  const userStore = useUserStore()

  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ path: '/signin' })
    return
  }

  if (to.meta.requiresAdmin && userStore.userRole !== 'ADMIN') {
    next({ path: '/' })
    return
  }

  next()
})

export default router
