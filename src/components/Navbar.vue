<script lang="ts">
import { getSearchResults, isDark } from '../store'

export default defineComponent(() => ({
  ...getSearchResults(),
  isDark,
}))
</script>

<template>
  <div class="flex flex-row justify-between text-14px px-3 py-6px">
    <a href="https://library.relume.io/" class="flex flex-row align-middle items-center font-500">
      <div class="mx-2">
        <svg width="7" height="11" viewBox="0 0 7 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 1.38123L2 5.80623L6 10.2312" stroke="#161616" stroke-width="1.5" />
        </svg>
      </div>
      <div>Relume Library</div>
    </a>
    <div class="flex flex-row align-middle items-center text-12px font-500 opacity-50">
      <div class="whitespace-nowrap">
        Built in partnership with
      </div>
      <div class="ml2">
        <Logo style="height: 17px" />
      </div>
    </div>
  </div>

  <nav
    class="dragging bg-grey py-14px"
    flex="~ gap4 none"
    p4 relative z-10 text-xl
    :class="$route.path !== '/' ? 'md:hidden' : ''"
  >
    <!-- In Collections -->
    <template v-if="$route.path !== '/'">
      <div
        class="non-dragging"
        icon-button flex-none
        i-carbon:arrow-left
        @click="$router.replace('/')"
      />
    </template>

    <!-- Homepage Only -->
    <template v-else>
      <RouterLink
        class="non-dragging"
        i-carbon:search icon-button flex-none
        to="/collection/all"
      />
      <div flex-auto />
      <LogoIcons style="height: 28px" />
      <div flex-auto />
      <!-- <a
        class="non-dragging"
        i-carbon-logo-github icon-button flex-none
        href="https://github.com/antfu/icones"
        target="_blank"
      />
      <DarkSwitcher flex-none /> -->
    </template>

    <!-- Searching -->
    <div v-if="collection" class="flex">
      <form action="/collection/all" role="search" method="get" @submit.prevent>
        <input
          v-model="search"
          aria-label="Search"
          class="color-base text-base outline-none py-2 px-4 flex-auto m-0 w-full bg-transparent"
          name="s"
          placeholder="Search..."
        >
      </form>
    </div>
  </nav>
</template>
