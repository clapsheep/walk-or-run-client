<script setup>
import { ref } from 'vue'
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
} from '@heroicons/vue/24/outline'
import { RouterLink } from 'vue-router'
import NavButton from '@/components/atoms/NavButton.vue'
import LogoutButton from '@/components/atoms/LogoutButton.vue'

const isNavCollapsed = ref(false)

const menus = [
  {
    name: '홈',
    path: '/',
    icon: ChartBarSquareIcon,
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
    name: '관리자',
    path: '/admin',
    icon: Cog6ToothIcon,
  },
]
const authMenus = [
  {
    name: '로그인',
    path: '/login',
    icon: ArrowLeftEndOnRectangleIcon,
  },
  {
    name: '회원가입',
    path: '/register',
    icon: UserGroupIcon,
  },
]
</script>
<template>
  <nav
    class="relative shrink-0 rounded-[20px] transition-all duration-300"
    :class="{ 'w-[100px]': isNavCollapsed, 'w-64': !isNavCollapsed }"
  >
    <div class="bg-background-primary flex h-full flex-col rounded-[20px] shadow-sm">
      <!-- 로고 영역 -->
      <div class="flex h-20 items-center justify-center border-b border-neutral-200 px-4">
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
        <ul class="space-y-2 border-b border-neutral-200 p-4">
          <li v-for="(menu, index) in menus" :key="index">
            <NavButton
              :to="menu.path"
              :icon="menu.icon"
              :name="menu.name"
              :isCollapsed="isNavCollapsed"
            />
          </li>
        </ul>

        <!-- 로그인 상태에 따른 영역 -->
        <div class="space-y-2 p-4">
          <LogoutButton :icon="ArrowLeftStartOnRectangleIcon" :isCollapsed="isNavCollapsed" />
        </div>
        <ul class="space-y-2 p-4">
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

      <div class="bg-background-highlight-primary border-t border-neutral-200 p-4">
        <div class="mb-4 flex items-center" v-if="!isNavCollapsed">
          <div class="ml-3">
            <p class="text-sm font-medium text-neutral-800">[사용자 이름]</p>
            <p class="text-xs text-neutral-500">[이메일]</p>
          </div>
        </div>
      </div>

      <!-- Nav바 접기/펼치기 버튼 -->
      <button
        @click="isNavCollapsed = !isNavCollapsed"
        class="text-brand-dark hover:bg-brand-yellowDark absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full bg-brand-yellow shadow-md transition-all duration-200"
      >
        <ChevronDoubleLeftIcon v-show="!isNavCollapsed" class="h-4 w-4" />
        <ChevronDoubleRightIcon v-show="isNavCollapsed" class="h-4 w-4" />
      </button>
    </div>
  </nav>
</template>
