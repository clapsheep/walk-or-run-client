<script setup lang="ts">
import { ref, computed } from 'vue'

import {
  FlagIcon,
  ChartBarSquareIcon,
  UserIcon,
  UserGroupIcon,
  Cog6ToothIcon,
  ArrowLeftEndOnRectangleIcon,
  ArrowLeftStartOnRectangleIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  HomeIcon,
} from '@heroicons/vue/24/outline'
import { RouterLink } from 'vue-router'

import NavButton from '@/components/atoms/NavButton.vue'
import LogoutButton from '@/components/atoms/LogoutButton.vue'
import { useLogout } from '@/core/auth/composables/useLogout'
import { logoutFetch } from '@/core/auth/AuthApi'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const { logout, isLoading } = useLogout(logoutFetch)
const isNavCollapsed = ref(false)
const isLoggedIn = computed(() => !!userStore.userId)
const isAdmin = computed(() => userStore.userRole === 'ADMIN')

const welcomeMessages = [
  '오늘도 힘찬 발걸음 시작해볼까요?',
  '건강한 하루 되세요!',
  '오늘의 목표를 향해 달려보세요!',
  '작은 걸음도 큰 변화의 시작입니다',
  '당신의 건강한 하루를 응원합니다',
  '매일매일 조금씩, 꾸준히 함께해요',
  '오늘의 러닝으로 더 건강해질 당신을 응원해요',
  '한 걸음 한 걸음이 목표를 향한 여정입니다',
  '지금 이 순간, 당신의 건강을 위한 선택!',
  '오늘도 당신의 도전을 응원합니다',
  '작은 습관이 큰 변화를 만듭니다',
  '함께라서 더 즐거운 운동하기',
  '당신의 건강한 선택을 응원합니다',
  '오늘도 멋진 하루 보내세요!',
  '새로운 기록을 향해 달려보세요',
]

const welcomeMessage = computed(() => {
  const randomIndex = Math.floor(Math.random() * welcomeMessages.length)
  return welcomeMessages[randomIndex]
})

const menus = [
  {
    name: '홈',
    path: '/',
    icon: HomeIcon,
    activeRoutes: ['/home', '/dashboard'],
  },
  {
    name: '챌린지',
    path: '/challenge',
    icon: FlagIcon,
  },
  {
    name: '계정',
    path: '/account',
    icon: UserIcon,
  },
  {
    name: '유저 찾기',
    path: '/find-user',
    icon: UserGroupIcon,
  },
]

const adminMenus = [
  {
    name: '관리자',
    path: '/admin',
    icon: Cog6ToothIcon,
  },
]
const authMenus = [
  {
    name: '로그인',
    path: '/signin',
    icon: ArrowLeftEndOnRectangleIcon,
  },
  {
    name: '회원가입',
    path: '/signup',
    icon: UserGroupIcon,
  },
]
</script>
<template>
  <nav
    class="relative shrink-0 rounded-[20px] transition-all duration-300"
    :class="{ 'w-[100px]': isNavCollapsed, 'w-64': !isNavCollapsed }"
  >
    <div class="flex h-full flex-col rounded-[20px] bg-gray-100 shadow-sm">
      <!-- 로고 영역 -->
      <div class="flex h-20 items-center justify-center border-b border-gray-300 px-4">
        <RouterLink to="/" class="flex h-14 items-center justify-center">
          <img
            class="h-full w-full object-contain"
            :src="isNavCollapsed ? '/logo/logo_sm.png' : '/logo/logo_navy1.png'"
            alt="로고"
          />
        </RouterLink>
      </div>

      <!-- 메뉴 영역 -->
      <div class="flex-1 overflow-y-auto">
        <ul class="space-y-2 border-b border-gray-300 p-4">
          <li v-for="(menu, index) in menus" :key="index">
            <NavButton
              :to="menu.path"
              :icon="menu.icon"
              :name="menu.name"
              :isCollapsed="isNavCollapsed"
              :active-routes="menu.activeRoutes"
            />
          </li>
          <li v-if="isAdmin" v-for="(menu, index) in adminMenus" :key="'admin-' + index">
            <NavButton
              :to="menu.path"
              :icon="menu.icon"
              :name="menu.name"
              :isCollapsed="isNavCollapsed"
            />
          </li>
        </ul>

        <!-- 로그인 상태에 따른 영역 -->
        <div v-if="isLoggedIn" class="space-y-2 p-4">
          <LogoutButton
            :icon="ArrowLeftStartOnRectangleIcon"
            :isCollapsed="isNavCollapsed"
            :onLogout="logout"
          />
        </div>
        <ul v-else class="space-y-2 p-4">
          <li v-for="(menu, index) in authMenus" :key="index">
            <NavButton
              :to="menu.path"
              :icon="menu.icon"
              :name="menu.name"
              :isCollapsed="isNavCollapsed"
            />
          </li>
        </ul>
      </div>

      <!-- 프로필 카드 (로그인한 사용자만) -->
      <div v-if="isLoggedIn && !isNavCollapsed" class="mt-auto">
        <div class="border-t border-neutral-200 bg-white p-4">
          <div class="flex items-center space-x-3">
            <img
              :src="'/images/defaultUserProfile.png'"
              alt="Profile"
              class="h-12 w-12 rounded-full object-cover"
            />
            <div class="flex-1 overflow-hidden">
              <p class="truncate whitespace-pre-line text-sm font-medium text-neutral-900">
                {{ userStore.userEmail }}
              </p>
              <p class="mt-1 text-sm text-gray-600">{{ welcomeMessage }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 축소된 프로필 (로그인한 사용자만) -->
      <div v-if="isLoggedIn && isNavCollapsed" class="mt-auto">
        <div class="border-t border-neutral-200 bg-white p-2">
          <img
            :src="'/images/defaultUserProfile.png'"
            alt="Profile"
            class="mx-auto h-8 w-8 rounded-full object-cover"
          />
        </div>
      </div>

      <!-- Nav바 접기/펼치기 버튼 -->
      <button
        @click="isNavCollapsed = !isNavCollapsed"
        class="bg-brand-yellow absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full text-gray-900 shadow-md transition-all duration-200 hover:bg-primary-400 hover:text-white"
      >
        <ChevronDoubleLeftIcon v-show="!isNavCollapsed" class="h-4 w-4" />
        <ChevronDoubleRightIcon v-show="isNavCollapsed" class="h-4 w-4" />
      </button>
    </div>
  </nav>
</template>
