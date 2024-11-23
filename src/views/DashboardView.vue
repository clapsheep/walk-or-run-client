<script setup lang="ts">
import ExerciseTimeChart from '@/components/charts/ExerciseTimeChart.vue';
import SpeedChart from '@/components/charts/SpeedChart.vue';
import StepChart from '@/components/charts/StepChart.vue';


</script>

<template>
  <div class="p-4 bg-gray-100 min-h-screen">
    <h1 class="text-2xl font-bold mb-6 text-gray-800">운동 기록 대시보드</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StepChart />
      <SpeedChart />
      <ExerciseTimeChart />
    </div>
    </div>
  </template>
