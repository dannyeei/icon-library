<script setup lang='ts'>
import { ref } from 'vue'
import type { PresentType } from '../data'
import { categories, collections, favoritedCollections, recentCollections } from '../data'

const categorized = computed(() => [
  // {
  //   name: 'Favorites',
  //   type: 'favorite' as PresentType,
  //   collections: favoritedCollections.value,
  // },
  // {
  //   name: 'Recent',
  //   type: 'recent' as PresentType,
  //   collections: recentCollections.value,
  // },
  ...categories.map(category => ({
    name: category,
    type: 'normal' as PresentType,
    collections: collections.filter(collection => collection.category === category),
  })),
])

const defaultSvgProcessingParams = {
  replaceWH: true,
  replaceFill: true,
  replaceStroke: true,
  removeFillOpacity: true,
}

const svgSource = ref('')
const svgResult = ref('')
const svgResultNode = ref(null as HTMLTextAreaElement | null)
const svgResultPreviewNode = ref(null as Element | null)

const processSvgContent = (text: string) => {
  const params = defaultSvgProcessingParams
  let result = text
  if (params.replaceWH) {
    result = result.replaceAll(/(svg[^>]*width=\\?")[^\\?"]*(\\?")/gm, '$1currentWidth$2')
    result = result.replaceAll(/(svg[^>]*height=\\?")[^\\?"]*(\\?")/gm, '$1currentHeight$2')
  }
  if (params.replaceFill)
    result = result.replaceAll(/\sfill=\\?"((?!none).)(?:[^"\\])*\\?"/gm, ' fill="currentColor"')
  if (params.replaceStroke)
    result = result.replaceAll(/\sstroke=\\?"((?!none).)(?:[^"\\])*\\?"/gm, ' stroke="currentColor"')
  if (params.removeFillOpacity)
    result = result.replaceAll(/\sfill-opacity=\\?"\d\.?\d*\\?"/gm, '')

  return result
}
const fixSvg = () => {
  svgResult.value = processSvgContent(svgSource.value)
  if (svgResultPreviewNode.value)
    svgResultPreviewNode.value.innerHTML = svgResult.value
}
const copied = ref(false)

const copyResult = (status: boolean) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(svgResult.value)
  }
  else {
    if (svgResultNode.value) {
      svgResultNode.value.focus()
      svgResultNode.value.select()
      document.execCommand('copy')
    }
  }
  copied.value = status
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
const pasteAndCopy = async() => {
  if (navigator.clipboard?.readText) {
    // does not work in Firefox
    svgSource.value = await navigator.clipboard.readText()
    fixSvg()
    copyResult(true)
  }
}

const mousedownProcessor = (event: MouseEvent) => {
  console.log(event.button, event.button === 2)
  if (event.button === 2)
    pasteAndCopy()
}

watch(svgSource, () => {
  fixSvg()
})
</script>

<template>
  <WithNavbar>
    <div class="container mx-auto">
      <div class="text-center pt-40px pb-32px">
        <div class="text-18px font-500">
          Copy and Paste icons into your Webflow projects.
        </div>
        <div class="mt-8px text-16px font-400 opacity-50">
          All icons have been formatted for Webflow. <a class="underline" target="_blank" href="https://www.loom.com/share/70668d4dfbe44ab090f6b947de9af621">Watch Demo</a>
          <!-- Learn more -->
        </div>
      </div>
      <template v-for="c of categorized" :key="c.name">
        <div v-if="c.collections.length" px4>
          <!-- <div px-2 op50 mt6 text-lg>
          {{ c.name }}
        </div> -->
          <CollectionEntries
            of-hidden
            :collections="c.collections"
            :type="c.type"
          />
        </div>
      </template>
      <div class="px-6 text-16px">
        <div class="flex flex-row items-center my-24px">
          <hr class="flex flex-grow opacity-15">
          <div class="text-18px text-black opacity-50 mx-6">
            OR
          </div>
          <hr class="flex flex-grow opacity-15">
        </div>
        <div class="text-center">
          <div class="text-18px mb-8px font-500">
            In 1 click, transform your SVG into a friendly format for Webflow development.
          </div>
          <div class="mb-32px opacity-50">
            Then copy and paste the code into a HTML embed in Webflow.
          </div>
        </div>
        <div class="flex flex-row text-16px font-500">
          <div class="flex-1 mr-3">
            <div class="mb-3">
              1. Paste in your SVG below
            </div>
            <textarea
              v-model="svgSource"
              class="bg-grey rounded-8px pa-12px w-full resize-none h-183px outline-none"
              @mousedown="mousedownProcessor"
            />
          </div>
          <div class="flex-1 ml-3">
            <div class="mb-3">
              2. Copy SVG code
            </div>
            <textarea
              ref="svgResultNode"
              v-model="svgResult"
              class="bg-grey rounded-8px pa-12px w-full resize-none h-183px outline-none"
            />
            <div class="mx-12px -mt-80px">
              <div class="flex flex-row justify-between items-end w-full">
                <div v-show="svgResult" class="h-64px pa-12px bg-white rounded-3 z-1">
                  <div ref="svgResultPreviewNode" class="h-40px overflow-hidden" />
                </div>
                <div class="h-64px" />
                <button
                  class="btn h-36px bg-pseudoblack text-white mr-1 mb-1"
                  @click="copyResult"
                >
                  Copy
                </button>
              </div>
            </div>
            <!-- <div v-show="svgResult" class="mx-12px -mt-80px">
              <div class="flex flex-row justify-between items-end w-full">
                <div
                  class="h-64px w-64px pa-12px bg-white rounded-3 z-1"
                >
                  <div ref="svgResultPreviewNode" class="w-40px h-40px" />
                </div>
                <button
                  class="btn h-36px bg-black text-white mr-1 mb-1 opacity-75"
                  @click="copyResult"
                >
                  Copy
                </button>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <Notification :value="copied">
      <!-- <Icon icon="mdi:check" class="inline-block mr-2 font-xl align-middle" /> -->
      <img src="@/fonts/check.svg" class="inline-block mr-16px">
      <span class="align-middle">Copied to clipboard!</span>
    </Notification>
    <Footer />
  </WithNavbar>
</template>
