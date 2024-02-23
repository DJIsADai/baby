<template>
    <div class="bg-white">
        <div class="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
            <div class="mx-auto mt-10 max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
                <div class="px-6 lg:px-0 lg:pt-4">
                    <div class="mx-auto max-w-2xl">
                        <div class="max-w-lg">
                            <h1 class="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">AI Baby Generator
                            </h1>
                            <p class="mt-6 text-lg leading-8 text-gray-600">Baby Generator predicts baby's appearance using
                                AI technology. Predict what the baby may look<br>from <span
                                    class="underline underline-offset-4 decoration-orange-600 decoration-2">parents'
                                    photos</span>
                                or <span class="underline underline-offset-4 decoration-orange-600 decoration-2"> 3D
                                    ultrasound
                                    imaging</span>.</p>
                            <div class="mt-10 flex items-center gap-x-6">
                                <a href="#"
                                    class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 shrink-0"
                                    @click="()=>handleOpen_('parents')"
                                    >
                                    Predict from parents' photos</a>
                                <a  @click="()=>handleOpen_()" href="#" class="text-sm font-semibold leading-6 text-gray-900">Predict from 3D
                                    ultrasound imaging<span aria-hidden="true">→</span></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
                    <div class="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 md:-mr-20 lg:-mr-36"
                        aria-hidden="true" />
                    <div class="shadow-lg md:rounded-3xl">
                        <div class="[clip-path:inset(0)] md:[clip-path:inset(0_round_theme(borderRadius.3xl))]">
                            <div class="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white md:ml-20 lg:ml-36"
                                aria-hidden="true" />
                            <div class="relative md:pr-0">
                                <img
                                    src="https://plus.unsplash.com/premium_photo-1661773229283-0b4965f45d6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2664&q=80">
                                <div class="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 md:rounded-3xl"
                                    aria-hidden="true" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
        </div>
    </div>
</template>

<script setup>
import { ChevronRightIcon } from '@heroicons/vue/20/solid'
import { defineProps } from 'vue';
// 使用defineProps接收父组件传递的函数
const props = defineProps({
    handleOpen_: Function
});
</script>