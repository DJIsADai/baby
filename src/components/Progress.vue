<template>
    <div class="progress-container">
      <div :class="'progress-bar progress-start-'+start"></div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from 'vue';

  const start=ref('false');

  document.addEventListener('start-progress',()=>{
    console.log('ok');
    setTimeout(()=>{
        start.value='true';
    },0)
    })


    document.addEventListener('end-progress',()=>{
    console.log('ok');
        setTimeout(()=>{
            start.value='end';
            setTimeout(()=>{
                start.value='false';
            },1600);
        },0)
    })

 
  
    // watch(() => props.start, (newVal) => {
    //     console.log(newVal);
    // });
//   const progress = ref(0);
//   const totalDuration = 90000; // 1.3分钟总时长
//   const slowDownAt = 90; // 当进度条到达90%
  
//   console.log('props:',props.start);
  
// //   watch(() => props.start, (newVal) => {
// //     console.log(1111);
   
// //   });
//   if ( props.start) {
//       startProgress();
//     }
    
  
//   function startProgress() {
//     progress.value = 0;
//     const interval = totalDuration * 0.9 / slowDownAt; // 计算到达90%所需时间
//     const step = () => {
//       if (progress.value < slowDownAt) {
//         progress.value += 0.1;
//         setTimeout(step, interval/10);
//       }
//     };
//     step();
//   }
  
//   function completeProgress() {
//     // 模拟缓慢完成最后的10%
//     const interval = totalDuration * 0.1 / (100 - slowDownAt); // 计算完成剩余10%所需时间
//     const step = () => {
//       if (progress.value < 100) {
//         progress.value += 0.1; // 减慢增长速度
//         setTimeout(step, interval);
//       }
//     };
//     step();
//   }
  
//   // 暴露方法给父组件调用
//   defineExpose({ completeProgress });
  </script>
  
  <style>
  .progress-container {
    width: 100%;
    background-color: #eee;
    border-radius: 4px;
    margin: 20px 0;
    overflow: hidden;
  }
  .progress-bar {
    height: 20px;
    background-color: #007bff;
    width: 0;
  }

  .progress-start-true {
    width: 90%;
    transition: width 80s linear;
  }

  .progress-start-end {
    width: 100%;
    transition: width 1.5s linear;
  }

  .progress-start-false {
    width: 0;
  }





  </style>
  