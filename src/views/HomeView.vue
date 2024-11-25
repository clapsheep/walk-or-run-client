<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BasicButton from '@/components/atoms/BasicButton.vue'

const router = useRouter()

// 데모 차트 데이터
const chartData = {
  labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
  datasets: [
    {
      label: '걸음 수',
      data: [5000, 7000, 8500, 10000, 12000, 15000],
      borderColor: '#FF5A5F',
      backgroundColor: 'rgba(255, 90, 95, 0.1)',
      fill: true,
    },
  ],
}

// 데모 챌린지 데이터
const challenges = [
  {
    id: 1,
    title: '매일 1만보 걷기',
    participants: 128,
    progress: 75,
    daysLeft: 5,
    color: 'primary',
  },
  {
    id: 2,
    title: '30일 달리기 챌린지',
    participants: 256,
    progress: 60,
    daysLeft: 12,
    color: 'secondary',
  },
  {
    id: 3,
    title: '주 3회 운동하기',
    participants: 89,
    progress: 85,
    daysLeft: 3,
    color: 'accent',
  },
]

const navigateToSignup = () => {
  router.push('/signup')
}

const navigateToLogin = () => {
  router.push('/signin')
}
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="relative bg-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          class="flex min-h-[80vh] flex-col items-center justify-center py-20 text-center sm:py-24 lg:py-32"
        >
          <h1
            class="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl"
          >
            <span class="block">당신의 운동을 기록하고</span>
            <span class="block pt-2 text-primary-500 sm:pt-4">함께 성장하세요</span>
          </h1>
          <p
            class="mx-auto mt-6 max-w-md whitespace-pre-line text-base text-gray-500 sm:mt-8 sm:text-lg md:mt-10 md:max-w-3xl md:text-xl"
          >
            삼성헬스 데이터 분석 · 러닝 & 걷기 통계 · 챌린지 참여<br />
            함께 성장하는 건강한 라이프스타일의 시작
          </p>
          <div
            class="mx-auto mt-8 max-w-md space-y-3 px-4 sm:mt-10 sm:flex sm:space-x-4 sm:space-y-0 sm:px-0 md:mt-12"
          >
            <BasicButton
              @click="navigateToSignup"
              color="primary"
              size="lg"
              variant="filled"
              class="w-full sm:w-auto"
            >
              시작하기
            </BasicButton>
            <BasicButton
              @click="navigateToLogin"
              color="primary"
              size="lg"
              variant="outlined"
              class="w-full sm:w-auto"
            >
              로그인
            </BasicButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Features Section -->
    <div class="py-12">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="lg:text-center">
          <h2 class="text-lg font-semibold text-secondary-500">데이터 시각화</h2>
          <p class="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            한눈에 보는 운동 기록
          </p>
        </div>

        <!-- Demo Dashboard -->
        <div class="mt-10">
          <div class="overflow-hidden rounded-lg bg-white shadow">
            <div class="px-4 py-5 sm:p-6">
              <!-- Chart Component Placeholder -->
              <div class="h-64 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4">
                <div class="flex h-full flex-col items-center justify-center">
                  <div class="text-center">
                    <div class="text-lg font-medium text-gray-900">월별 운동 통계</div>
                    <div class="mt-2 grid grid-cols-6 gap-4">
                      <div
                        v-for="(value, index) in chartData.datasets[0].data"
                        :key="index"
                        class="flex flex-col items-center"
                      >
                        <div
                          class="h-32 w-8 rounded-t-lg bg-primary-500"
                          :style="{ height: value / 200 + 'px' }"
                        ></div>
                        <div class="mt-1 text-sm text-gray-500">{{ chartData.labels[index] }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Challenges Section -->
        <div class="mt-16">
          <div class="lg:text-center">
            <h2 class="text-lg font-semibold text-accent-500">챌린지</h2>
            <p class="mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
              함께하는 운동의 즐거움
            </p>
          </div>

          <div class="mt-10">
            <div class="grid gap-6 lg:grid-cols-3">
              <div
                v-for="challenge in challenges"
                :key="challenge.id"
                class="overflow-hidden rounded-lg bg-white shadow"
              >
                <div class="px-4 py-5 sm:p-6">
                  <h3 class="text-lg font-medium leading-6 text-gray-900">{{ challenge.title }}</h3>
                  <div class="mt-2">
                    <div class="flex items-center justify-between text-sm text-gray-500">
                      <span>참여자 {{ challenge.participants }}명</span>
                      <span>{{ challenge.daysLeft }}일 남음</span>
                    </div>
                    <div class="mt-4">
                      <div class="relative h-2 rounded-full bg-gray-200">
                        <div
                          class="absolute h-2 rounded-full"
                          :class="`bg-${challenge.color}-500`"
                          :style="{ width: `${challenge.progress}%` }"
                        ></div>
                      </div>
                    </div>
                    <div class="mt-4">
                      <BasicButton
                        @click="navigateToSignup"
                        :color="challenge.color as any"
                        variant="outlined"
                        class="w-full"
                      >
                        참여하기
                      </BasicButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CTA Section -->
    <div class="bg-primary-600">
      <div class="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
        <h2 class="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          <span class="block">지금 바로 시작하세요</span>
        </h2>
        <p class="mt-4 text-lg leading-6 text-primary-100">
          Walk or Run과 함께 즐거운 운동 습관을 만들어보세요.
        </p>
        <BasicButton
          @click="navigateToSignup"
          color="accent"
          size="lg"
          variant="filled"
          class="mt-8 w-full sm:w-auto"
        >
          무료로 시작하기
        </BasicButton>
      </div>
    </div>
  </div>
</template>
