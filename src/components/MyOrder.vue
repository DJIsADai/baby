<template>
  <TransitionRoot as="template" :show="MyOrderOpen">
    <Dialog as="div" class="relative z-10" @close="emitToParent">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-6"
            >
              <div class="bg-white">
                <div
                  class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pb-24"
                >
                  <div class="max-w-xl">
                    <h1
                      class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl"
                    >
                      Order history
                    </h1>
                   
                  </div>

                  <div class="mt-16">
                    <h2 class="sr-only">Recent orders</h2>

                    <div class="space-y-20">
                      <div v-for="order in orders" :key="order.number">

                        <table class="mt-4 w-full text-gray-500 sm:mt-6">
                          <caption class="sr-only">
                            Products
                          </caption>
                          <thead
                            class="sr-only text-left text-sm text-gray-500 sm:not-sr-only"
                          >
                            <tr>
                              <!-- class="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3" -->

                              <th
                                scope="col"
                                class="hidden py-3 pr-8 font-normal sm:table-cell"
                              >
                              Generated Image
                              </th>
                              <th
                                scope="col"
                                class="hidden py-3 pr-8 font-normal sm:table-cell"
                              >
                              Father Photo
                              </th>
                              <th
                                scope="col"
                                class="hidden py-3 pr-8 font-normal sm:table-cell"
                              >
                              Mather Photo
                              </th>
                              <th
                                scope="col"
                                class="hidden py-3 pr-8 font-normal sm:table-cell"
                              >
                              Generated Time
                              </th>
                              <th
                                scope="col"
                                class="w-0 py-3 text-right font-normal"
                              >
                              Operate
                              </th>
                            </tr>
                          </thead>
                          <tbody
                            class="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t"
                          >
                            <tr
                              v-for="product in order.products"
                              :key="product.id"
                            >
                              <td class="py-6 pr-8">
                                <div class="flex items-center">
                                  <img
                                    :src="product.url"
                                    class=" h-16 w-16 rounded object-cover object-center"
                                  />
                                </div>
                              </td>

                              <td class="hidden py-6 pr-8 sm:table-cell">
                                <img :src="base64ToBlobUrl(product.father_base64)" class="mr-6 h-16 w-16 rounded object-cover object-center" alt="">
                              </td>

                              <td class="hidden py-6 pr-8 sm:table-cell">
                                <img :src="base64ToBlobUrl(product.mather_base64)" class="mr-6 h-16 w-16 rounded object-cover object-center" alt="">
                              </td>

                              <td class="hidden py-6 pr-8 sm:table-cell">
                                {{timestampToYMD(product.timestamp)  }}
                              </td>
                              <td
                                class="whitespace-nowrap py-6 text-right font-medium"
                              >
                                <a :href="product.href" class="text-indigo-600">
                                    Download
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
  
  <script setup>
import { ref,defineProps,onMounted } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { CheckIcon } from "@heroicons/vue/24/outline";
import localForage from "localforage";
import {base64ToBlobUrl,timestampToYMD} from '../tools/toolsFun.js'

const props = defineProps({
    MyOrderOpen: Boolean
});
// 定义可以发射的事件
const emit = defineEmits(['child-event']);

// 方法用于发射事件
function emitToParent() {
  emit('child-event', 'Message from Child to Parent');
}

const orders = [
  {
    number: 'WU88191111',
    products: [
      {
        id: 1,
        father_base64:'',
        generateType:'',
        mather_base64:'',
        timestamp:'',
        url:''
      },
    ],
  },
];


//挂在事件
onMounted(async () => {
  const existingData = (await localForage.getItem("imageDataArray")) || [];
  orders[0].products=existingData
});

</script>