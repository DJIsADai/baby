<template>
    <header class="absolute z-10 w-full">
        <nav class="mx-auto flex max-w-7xl items-center justify-between gap-x-6 p-6 lg:px-8" aria-label="Global">
            <div class="flex lg:flex-1">
                <a href="#" class="-m-1.5 p-1.5 flex items-center">
                    <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                    <span class="text-sm font-semibold leading-6 text-gray-900 ml-2">Baby Generator</span>
                </a>
            </div>

            <div class="hidden lg:flex lg:gap-x-12">

            </div>

            <div class="flex flex-1 items-center justify-end gap-x-6">
                <a v-for="item in navigation" :key="item.name" :href="item.href"  
                    @click="()=>handleOpenMyOrder(item.name)"
                    class="text-sm font-semibold leading-6 text-gray-900">{{ item.name }}</a>
            </div>

            <div class="flex lg:hidden">
                <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    @click="mobileMenuOpen = true">
                    <span class="sr-only">Open main menu</span>
                    <Bars3Icon class="h-6 w-6" aria-hidden="true" />
                </button>
            </div>
        </nav>
        <Dialog as="div" class="lg:hidden" @close="mobileMenuOpen = false" :open="mobileMenuOpen">
            <div class="fixed inset-0 z-10" />
            <DialogPanel
                class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                <div class="flex items-center gap-x-6">
                    <a href="#" class="-m-1.5 p-1.5">
                        <span class="sr-only">Baby Generator</span>
                        <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                            alt="" />
                    </a>
                    <a href="#"
                        class="ml-auto rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
                        up</a>
                    <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="mobileMenuOpen = false">
                        <span class="sr-only">Close menu</span>
                        <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div class="mt-6 flow-root">
                    <div class="-my-6 divide-y divide-gray-500/10">
                        <div class="space-y-2 py-6">
                            <a v-for="item in navigation" :key="item.name" :href="item.href"
                                class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">{{
                                    item.name }}</a>
                        </div>
                        <div class="py-6">
                            <a href="#"
                                class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">Log
                                in</a>
                        </div>
                    </div>
                </div>
            </DialogPanel>
        </Dialog>
    </header>
    <hero :handleOpen_="handleOpen_"></hero>
    <content :handleOpen_="handleOpen_"></content>
    <!-- 订单组件 -->
    <MyOrder :MyOrderOpen="MyOrderOpen" @child-event="handleChildEvent"/>
    <!-- 模态框组件 -->
    <Module :moduleOpen="moduleOpen" @child-event_="handleChildEvent_" :moduleType="moduleType"/>

</template>

<script setup>
import { ref } from 'vue'
import { Dialog, DialogPanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'
import hero from './hero.vue';
import content from './Content.vue';
import MyOrder from './components/MyOrder.vue';
import Module from "./components/Module.vue";

const navigation = [
    { name: 'My Order', href: '#' },
    { name: 'Privacy', href: '#' },
    { name: 'About', href: '#' },
]

const mobileMenuOpen = ref(false)
//订单模态框
const MyOrderOpen = ref(false)
//生成模态框
const moduleOpen = ref(false)
//模态框类型
const moduleType = ref('')



const handleOpenMyOrder=(type)=>{
    if(type==='My Order') {
        MyOrderOpen.value=true
    }
}

function handleChildEvent(data) {
  MyOrderOpen.value=false
}
function handleChildEvent_(data) {
    moduleOpen.value=false
}

function handleOpen_(type) {
    if(type==='parents'){
        moduleOpen.value=true
        moduleType.value='parents'
    }else{
        moduleOpen.value=true
        moduleType.value='3D'

    }
}

defineExpose({ handleOpenMyOrder })
</script>



