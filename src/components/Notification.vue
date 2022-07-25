<script setup lang='ts'>
withDefaults(
  defineProps<{ value?: boolean }>(),
  { value: false },
)
</script>

<template>
  <div
    class="fixed top-0 left-0 right-0 z-50 text-center"
    :class="value ? '' : 'pointer-events-none overflow-hidden'"
  >
    <div
      class="px-24px py-10px rounded inline-block bg-pseudoblack border-pseudoblack text-white m-24px transition-all duration-300 border rounded-12px"
      :style="value ? {} : { transform: 'translateY(-150%)' }"
      :class="value ? 'shadow' : 'shadow-none'"
    >
      <slot />
    </div>
  </div>
</template>
