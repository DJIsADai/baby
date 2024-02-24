<template>
  <transition name="fade">
    <div v-if="visible" class="toast" :class="type">
      <div
        id="toast-success"
        class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
        role="alert"
      >
        <div
          class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200"
        >
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"
            />
          </svg>
          <span class="sr-only">Check icon</span>
        </div>
        <div class="ms-3 text-sm font-normal">{{ message }}</div>
        <button
          type="button"
          class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
          data-dismiss-target="#toast-success"
          aria-label="Close"
          @click="hide"
        >
          <span class="sr-only">Close</span>
          <svg
            class="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
        </button>
      </div>

      <!-- <button >关闭</button> -->
    </div>
  </transition>
</template>
  
  <script>
export default {
  props: {
    message: String,
    id: String,
    type: {
      type: String,
      default: "info", // 'info', 'success', 'warning', 'error'
    },
    duration: {
      type: Number,
      default: 3000, // 默认3秒后自动关闭
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  created() {
    document.addEventListener("toast-show", (e) => {
      this.show(e.detail);
    });
  },
  methods: {
    show(detail) {
      console.log('1111555',detail.message);
      
      this.visible = true;
      setTimeout(() => this.hide(), this.duration); // 超过指定时间后自动关闭
    },
    hide() {
      this.visible = false;
    },
  },
  mounted() {
    //this.show();
  },
};
</script>
  
  <style>
/* 添加淡入淡出效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active 在 <2.1.8 版本中 */ {
  opacity: 0;
}

/* Toast和按钮的CSS样式 */
.toast {
  /* Toast的CSS样式 */
}
/* 根据type添加不同的样式 */
.info {
  /* 样式 */
}
.success {
  /* 样式 */
}
.warning {
  /* 样式 */
}
.error {
  /* 样式 */
}
</style>
  
