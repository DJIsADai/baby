<template>
  <div class="bg-white px-6 pt-0 py-32 lg:px-8">
    <div class="mx-auto max-w-4xl text-base leading-7 text-gray-700">
      <p class="text-base font-semibold leading-7 text-indigo-600">
        Introducing
      </p>
      <h2
        class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
      >
        What will my baby look like?
      </h2>
      <p class="mt-6 leading-8">
        Everyone looks forward to see what their baby will look like. To satisfy
        this curiosity, the Baby Generator tool has emerged, offering parents an
        intriguing and promising way to predict their future baby’s appearance.
      </p>

      <h2
        class="mt-10 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
      >
        How does the Baby Generator work?
      </h2>
      <p class="mt-6 leading-8">
        Leveraging advanced technologies such as machine learning and deep
        neural networks, the Baby Generator combines genetic analysis, facial
        features, and inheritance patterns to enable predictions based on
        parents’ photos.
      </p>

      <div class="box3">
        <div class="parentsphotos">
          <img class="imag" src="./assets/imge/fmp@2x.png" alt="">
          
          <div class="h4" >
            Predict from parents' photos 
            <div class="GenerateBtn"    @click="()=>handleOpen_('parents')">Generate Now</div>
          </div>
        </div>
        <!-- <div class="Dphotos">
          <img class="imag" src="./assets/imge/3dp@2x.png" alt="">

          <h4 class="h4">
            Predict from<br />
            3D ultrasound imaging
          </h4>
          <div class="GenerateBtn"    @click="()=>handleOpen_()">Generate Now</div>
        </div> -->
      </div>
      <h2
        class="mt-10 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
      >
        Is the AI baby prediction accurate?
      </h2>
      <p class="mt-6 leading-8">
        Recent research has shown significant breakthroughs in the techniques
        utilized by the Baby Generator. By analyzing facial features of the
        parents, it can accurately predict various aspects of the baby's
        appearance, including eye color, nose shape, and face structure, with an
        accuracy rate surpassing 80%.
      </p>
      <h2
        class="mt-10 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
      >
        What is the role of the Baby Generator?
      </h2>
      <div class="mt-10 max-w-2xl">
        <p>
          Although the accuracy and reliability of the Baby Generator require
          further validation and research, it undoubtedly provides parents with
          newfound prospects and delights in exploring their baby's development.
        </p>
        <ul role="list" class="mt-8 max-w-xl space-y-8 text-gray-600">
          <li class="flex gap-x-3">
            <CheckCircleIcon
              class="mt-1 h-5 w-5 flex-none text-indigo-600"
              aria-hidden="true"
            />
            <span
              ><strong class="font-semibold text-gray-900"
                >Adding joy and Anticipation.</strong
              >
              The Baby Generator offers a marvelous opportunity for individuals
              to predict their baby's features by utilizing parental photos or
              3D ultrasound images, adding joy and anticipation to future family
              life.</span
            >
          </li>
          <li class="flex gap-x-3">
            <CheckCircleIcon
              class="mt-1 h-5 w-5 flex-none text-indigo-600"
              aria-hidden="true"
            />
            <span
              ><strong class="font-semibold text-gray-900"
                >Medical Value.</strong
              >
              The predictive outcomes of the Baby Generator could contribute to
              breakthroughs in medical diagnostics and genetic research.</span
            >
          </li>
        </ul>
      </div>
      <p class="text-base mt-10 font-semibold leading-7 text-indigo-600">
        User Reviews
      </p>
      <h2
        class="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
      >
        What do users have to say about it?
      </h2>
      <figure class="mt-10 border-l border-indigo-600 pl-9">
        <blockquote class="font-semibold text-gray-900">
          <p>
            “Just used 'AI Baby Generator' with my husband's and my photos and wow, the result was adorable! It was a fun peek into our future and made us even more excited to meet our baby. Super easy to use and absolutely heartwarming. Highly recommend to any curious expectant parents!”
          </p>
        </blockquote>
        <figcaption class="mt-6 flex gap-x-4">
          <img
            class="h-6 w-6 flex-none rounded-full bg-gray-50"
            src="./assets/imge/_1.jpg"
            alt=""
          />
          <div class="text-sm leading-6">
            Frida Mullins
          </div>
        </figcaption>
      </figure>

      <figure class="mt-10 border-l border-indigo-600 pl-9">
        <blockquote class="font-semibold text-gray-900">
          <p>
            "Had a blast with 'AI Baby Generator'! It turned our photos into a sweet glimpse of our baby-to-be. Simple, fun, and truly uplifting. Great for soon-to-be parents looking for a smile!"
          </p>
        </blockquote>
        <figcaption class="mt-6 flex gap-x-4">
          <img
            class="h-6 w-6 flex-none rounded-full bg-gray-50"
            src="./assets/imge/_11.jpg"
            alt=""
          />
          <div class="text-sm leading-6">
            Alejandra Reid
          </div>
        </figcaption>
      </figure>
      <figure class="mt-10 border-l border-indigo-600 pl-9">
        <blockquote class="font-semibold text-gray-900">
          <p>
            "Just tried this online tool with photos of my wife and me, and we were absolutely delighted with the cute preview of our future baby! It's brought us so much joy and made the wait for our little one even more special. Super easy to use and a wonderful way to add a bit of fun to the journey of becoming parents. Highly recommend to any expectant couples curious about their baby's looks. A fantastic experience!"
          </p>
        </blockquote>
        <figcaption class="mt-6 flex gap-x-4">
          <img
            class="h-6 w-6 flex-none rounded-full bg-gray-50"
            src="./assets/imge/_0.jpg"
            alt=""
          />
          <div class="text-sm leading-6">
            Kareem Watkins         
          </div>
        </figcaption>
      </figure>
      <figure class="mt-10 border-l border-indigo-600 pl-9">
        <blockquote class="font-semibold text-gray-900">
          <p>
            "Recently tried a fun online tool with our baby's 3D ultrasound images, and the result was simply heartwarming! It gave us a sweet glimpse of what our little one might look like, filling us with happiness and anticipation. The process was easy and delightful, making this experience a cherished part of our pregnancy journey. "
          </p>
        </blockquote>
        <figcaption class="mt-6 flex gap-x-4">
          <img
            class="h-6 w-6 flex-none rounded-full bg-gray-50"
            src="./assets/imge/_111.jpg"
            alt=""
          />
          <div class="text-sm leading-6">
            Isabel Johnson
          </div>
        </figcaption>
      </figure>
      <figure class="mt-10 border-l border-indigo-600 pl-9">
        <blockquote class="font-semibold text-gray-900">
          <p>
            "Just had an amazing experience using this online tool to get a glimpse of our future baby's face, and it was absolutely delightful! The prediction brought so much joy and made us even more excited to meet our little one. It was quick, easy, and the moment of seeing the potential likeness was truly special."
          </p>
        </blockquote>
        <figcaption class="mt-6 flex gap-x-4">
          <img
            class="h-6 w-6 flex-none rounded-full bg-gray-50"
            src="./assets/imge/_001.jpg "
            alt=""
          />
          <div class="text-sm leading-6">
            Maria Hill
          </div>
        </figcaption>
      </figure>
    </div>
  </div>
</template>
  
<script setup>
import { defineProps } from 'vue';

import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/vue/20/solid";
// 使用defineProps接收父组件传递的函数
const props = defineProps({
    handleOpen_: Function
});



</script>