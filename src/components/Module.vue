    <template>
  <TransitionRoot as="template" :show="moduleOpen">
    <Dialog as="div" class="relative z-10">
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
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6"
            >
              <div class="module">
                <div class="title">
                  <a
                    @click="() => GenerateType('parents')"
                    :class="{ titleActive: clickTitle === 'parents' }"
                    >Predict from parents'photos</a
                  >
                  <a
                    @click="() => GenerateType('3D')"
                    :class="{ titleActive: clickTitle === '3D' }"
                    >Predict from 3D ultrasound imaging</a
                  >
                  <img
                    @click="emitToParent"
                    class="title-close"
                    src="../assets/imge/fenge.png"
                    alt=""
                  />
                </div>
                <p v-if="isVisible" class="message">请先上传图片</p>

                <hr />

                <div class="module-container" v-if="clickTitle === 'parents'">
                  <!-- 右侧 -->
                  <div class="module-left" >
                    <div v-if="father_example" class="example_photo"></div>
                    <label class="label" for="fa">
                      <img
                        v-if="fatherPhotoUrl"
                        :src="fatherPhotoUrl"
                        class="uploaded-photo"
                        alt="Father's photo"
                      />
                      <img
                        v-if="!fatherPhotoUrl"
                        class="module-left-img"
                        src="../assets/imge/add.png"
                        alt=""
                      />
                      <p v-if="!fatherPhotoUrl">Upload</p>

                      <input
                        type="file"
                        id="fa"
                        style="display: none"
                        @change="(event) => handleFileChange(event, 'father')"
                      />
                    </label>

                    <div class="photoText" >
                      
                      👨🏻 Father's photo
                      <img
                        v-if="uploadData.fatherPhoto"
                        @click="() => handleDeleteImage('fa')"
                        class="photoText-image"
                        src="../assets/imge/garbage-can.svg"
                        alt=""
                      />
                    </div>
                  </div>

                  <div class="module-x" v-if="!isLoading"></div>
                  <div v-else class="mask-layer">
                    <h2>Baby photos are being generated ...</h2>
                    <Loading />
                    <div class="tips-box">
                      <h3 v-if="isLoading">Do you know?</h3>
                      <p v-if="isLoading">
                        {{ currentTip }}
                      </p>
                    </div>
                    <button
                      type="button"
                      @click="() => (isLoading = false)"
                      class="Cancel Generate-button"
                    >
                      Cancel
                    </button>
                  </div>

                  <!-- 左侧 -->
                  <div class="module-right">
                    <div v-if="father_example" class="example_photo_"></div>
                    <label class="label" for="ma">
                      <img
                        v-if="motherPhotoUrl"
                        :src="motherPhotoUrl"
                        class="uploaded-photo"
                        alt="Mother's photo"
                      />
                      <img
                        v-if="!motherPhotoUrl"
                        class="module-left-img"
                        src="../assets/imge/add.png"
                        alt=""
                      />
                      <p v-if="!motherPhotoUrl">Upload</p>
                      <input
                        type="file"
                        id="ma"
                        style="display: none"
                        @change="(event) => handleFileChange(event, 'mother')"
                      />
                    </label>

                    <div class="photoText">
                      👩 Mather's photo
                      <img
                        v-if="uploadData.matherPhoto"
                        class="photoText-image"
                        @click="() => handleDeleteImage('mather')"
                        src="../assets/imge/garbage-can.svg"
                        alt=""
                      />
                    </div>
                  </div>

                  <div class="success-box" v-if="isSuccess">
                    <img
                    @click="emitToParent"
                    class="title-close_"
                    src="../assets/imge/fenge.png"
                    alt=""
                  />
                    <h4>🎉Generated successfully!</h4>
                    <img :src="generateBabyImage" alt="" />
                    <button type="button" class="Generate-button" @click="()=>downloadImageAsBlob(generateBabyImage)">
                      Download photos
                    </button>
                  </div>
                </div>

                <!-- 肤色生成器 -->
                <div class="module-container" v-else>
                  <!-- 肤色 -->
                  <div class="module-left-3D">
                    <div class="color-container">
                      <p>Father's skin color</p>
                      <div class="colorbox">
                        <span
                          v-for="color in fatherColor"
                          :key="color + 'father'"
                          :class="{ active: color.isSelect }"
                          @click="setActive(color.color, 'father')"
                          :style="{ backgroundColor: color.color }"
                        ></span>
                      </div>
                    </div>

                    <div class="color-container">
                      <p>Mather's skin color</p>
                      <div class="colorbox">
                        <span
                          v-for="color in matherColor"
                          :key="color + 'mather'"
                          :class="{ active: color.isSelect }"
                          @click="setActive(color.color, 'mather')"
                          :style="{ backgroundColor: color.color }"
                        ></span>
                      </div>
                    </div>
                  </div>
                  <div class="module-x" v-if="!isLoading"></div>
                  <div v-else class="mask-layer">
                    <h2>Baby photos are being generated ...</h2>
                    <Loading />
                    <div class="tips-box">
                      <h3 v-if="isLoading">Do you know?</h3>
                      <p v-if="isLoading">
                        {{ currentTip }}
                      </p>
                    </div>
                    <button
                      type="button"
                      @click="() => (isLoading = false)"
                      class="Cancel Generate-button"
                    >
                      Cancel
                    </button>
                  </div>
                  <!-- 左侧 -->
                  <div class="module-right">
                    <label class="label" for="threeD">
                      <img
                        v-if="sanDPhotoUrl"
                        :src="sanDPhotoUrl"
                        class="uploaded-photo"
                        alt="Mother's photo"
                      />
                      <img
                        v-if="!sanDPhotoUrl"
                        class="module-left-img"
                        src="../assets/imge/add.png"
                        alt=""
                      />
                      <p class="upload-3D" v-if="!sanDPhotoUrl">Upload</p>
                      <input
                        type="file"
                        id="threeD"
                        style="display: none"
                        @change="(event) => handleFileChange(event, 'threeD')"
                      />
                    </label>

                    <div class="photoText sanD">
                      3D ultrasound imaging
                      <img
                        @click="() => handleDeleteImage('threeD')"
                        class="photoText-image"
                        src="../assets/imge/garbage-can.svg"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="button-box">
                <button
                  type="button"
                  class="Generate-button"
                  @click="handleGenerate"
                >
                  Generate
                </button>
                <div class="example_btn" @mouseenter=" ()=>handle_example_photo(true,'father')" @mouseleave="handle_example_photo(false,'father')"></div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
  
  <script setup>
import { ref, reactive, watchEffect, defineProps, watch, onMounted } from "vue";
import localForage from "localforage";
import Loading from "./Loading.vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { CheckIcon } from "@heroicons/vue/24/outline";
import {
  fetchAndStoreImageData,
  resizeImageToMaxSize,
} from "../tools/toolsFun.js";
const open = ref(true);
const props = defineProps({
  moduleOpen: Boolean,
  moduleType: String,
});

const fatherPhotoUrl = ref(null);
const motherPhotoUrl = ref(null);
const sanDPhotoUrl = ref(null);
const isSuccess = ref(false);
const clickTitle = ref(props.moduleType);
const isLoading = ref(false);
const uploadData = reactive({
  fatherPhoto: null,
  matherPhoto: null,
  threePhoto: null,
});

const fatherColor = reactive([
  { color: "#FFFFF0", isSelect: true, title: "Ivory" },
  { color: "#FFEAC4", isSelect: false, title: "Light" },
  { color: "#FFDBAC", isSelect: false, title: "Fair" },
  { color: "#D8BFAA", isSelect: false, title: "Medium" },
  { color: "#C2B280", isSelect: false, title: "Olive" },
  { color: "#D2B48C", isSelect: false, title: "Tan" },
  { color: "#A65E2E", isSelect: false, title: "Brown" },
  { color: "#5C4033", isSelect: false, title: "Dark Brown" },
  { color: "#322C2C", isSelect: false, title: "Black" },
]);
const matherColor = reactive([
  { color: "#FFFFF0", isSelect: true, title: "Ivory" },
  { color: "#FFEAC4", isSelect: false, title: "Light" },
  { color: "#FFDBAC", isSelect: false, title: "Fair" },
  { color: "#D8BFAA", isSelect: false, title: "Medium" },
  { color: "#C2B280", isSelect: false, title: "Olive" },
  { color: "#D2B48C", isSelect: false, title: "Tan" },
  { color: "#A65E2E", isSelect: false, title: "Brown" },
  { color: "#5C4033", isSelect: false, title: "Dark Brown" },
  { color: "#322C2C", isSelect: false, title: "Black" },
]);
const babyCareTips = reactive([
  "Newborns need about 14 to 17 hours of sleep spread over a 24-hour period.",
  "Hold your baby with support under their head and neck, as their muscles are not fully developed yet.",
  "Ensure proper latching during breastfeeding to facilitate effective feeding and reduce nipple soreness.",
  "Change diapers frequently to avoid diaper rash.",
  "Newborns only need a few baths per week to protect their skin from being over-washed.",
  "Crying is a baby's way of communication; try to understand what different cries might indicate.",
  "Maintain a comfortable room temperature to avoid overheating or chilling the baby.",
  "Stimulate your baby's senses with different sounds, textures, and visual activities.",
  "Place your baby on their back to sleep to prevent Sudden Infant Death Syndrome (SIDS).",
  "Regular baby massages can help relax your baby and strengthen the parent-child bond.",
  "Visit the pediatrician regularly for check-ups and vaccinations as recommended.",
  "Monitor your baby's poop for changes in color and consistency, which can indicate their health status.",
  "Avoid exposing your baby to secondhand smoke to reduce the risk of respiratory diseases.",
  "Start communicating with your baby early through reading, singing, and peaceful talking for cognitive development.",
  "Choose age-appropriate toys to encourage cognitive and motor skills development.",
  "Keep track of your baby's developmental milestones.",
  "Begin introducing solid foods around 6 months of age.",
  "Ensure the home environment is safe for a curious baby.",
  "Use brightly colored objects and patterns to stimulate your baby's vision.",
  "Try to establish a regular sleep routine for your baby.",
]);
const currentTip = ref(""); // 当前显示的提示
const parentsColor = reactive({ fatherColor: "", matherColor: "" });

const generateBabyImage = ref('');
const _generateType = ref(null);
const isVisible = ref(false);
const father_example= ref(false);
const mather_example= ref(false);

// 定义可以发射的事件
const emit = defineEmits(["child-event_"]);
// 方法用于发射事件
function emitToParent() {
  emit("child-event_", "Message from Child to Parent");
}

// 设置激活的<span>的函数
const setActive = (color, parents) => {
  if (parents === "mather") {
    matherColor.forEach((item) => (item.isSelect = item.color === color));
  } else {
    fatherColor.forEach((item) => (item.isSelect = item.color === color));
  }
};

//监视颜色变化
watchEffect(() => {
  const selected = matherColor.find((item) => item.isSelect === true);
  parentsColor.matherColor = selected ? selected.title : "";
});
watchEffect(() => {
  const selected = fatherColor.find((item) => item.isSelect === true);
  parentsColor.fatherColor = selected ? selected.title : "";
});

// 设置提示语录
function getRandomTip() {
  const tipIndex = Math.floor(Math.random() * babyCareTips.length);
  currentTip.value = babyCareTips[tipIndex];
}

//上传图片处理
const handleFileChange = async (event, parent) => {
  const file = event.target.files[0];
  try {
    const resizedBase64 = await resizeImageToMaxSize(file);
    if (!file) {
      return;
    }
    const url = URL.createObjectURL(file);
    if (parent === "father") {
      fatherPhotoUrl.value = url;
      uploadData.fatherPhoto = resizedBase64;
    } else if (parent === "mother") {
      motherPhotoUrl.value = url;
      uploadData.matherPhoto = resizedBase64;
    } else if (parent === "threeD") {
      sanDPhotoUrl.value = url;
      uploadData.threePhoto = resizedBase64;
    }
  } catch (error) {
    console.error("Error converting file to Base64:", error);
  }
};

// 生成类型
const GenerateType = (type) => {
  if (type === "parents") {
    clickTitle.value = "parents";
  } else {
    clickTitle.value = "3D";
  }
};

//删除图片
const handleDeleteImage = (type) => {
  if (type === "fa") {
    fatherPhotoUrl.value = null;
    uploadData.fatherPhoto=null;
  } else if (type === "mather") {
    motherPhotoUrl.value = null;
    uploadData.matherPhoto=null;
  } else if (type === "threeD") {
    sanDPhotoUrl.value = null;
    uploadData.threePhoto=null;

  }
};

//生成函数
const handleGenerate = async () => {
  if(!uploadData.fatherPhoto&&!uploadData.matherPhoto){
    isVisible.value=true
    setTimeout(() => {
    isVisible.value = false;
  }, 3000);
    return 
  }
  getRandomTip();
  setInterval(getRandomTip, 5000);
  isLoading.value = true;
  let data = null;

  if (clickTitle.value === "parents") {
    data = await generateBaby_by_parents(
      uploadData.fatherPhoto,
      uploadData.matherPhoto
    );

    try {
      const storageObject = {
        url: data?.image_url,
        id: data?.image_id,
        father_base64: uploadData.fatherPhoto,
        mather_base64: uploadData.matherPhoto,
        generateType: _generateType.value,
        timestamp: Date.now(), // 记录当前时间戳
      };
      generateBabyImage.value=data?.image_url
      await fetchAndStoreImageData(storageObject);
    } catch (error) {
      console.error("获取数据失败", error);
    }
    isLoading.value = false;
    isSuccess.value=true;
    uploadData.fatherPhoto=''
    uploadData.matherPhoto=''
  } else if (_generateType.value === "3D") {
    data = await generateBaby_by_3D(parentsColor, uploadData.threePhoto);
  }
};

watch(
  () => props.moduleType,
  (newValue) => {
    clickTitle.value = newValue;
  }
);

async function generateBaby_by_parents(imag1, imag2) {
  const image_template = imag1.split("data:image/png;base64,")[1];
  const image_target = imag2.split("data:image/png;base64,")[1];

  try {
    const response = await fetch("https://api.baby-generator.ai/generate/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image_template,
        image_target,
      }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
  }
}
async function generateBaby_by_3D(color, imag) {
  const image_target = imag.split("data:image/png;base64,")[1];

  try {
    const response = await fetch("https://api.baby-generator.ai/generate3d/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dadColor: "Ivory",
        momColor: "Tan",
        image_target: image_target,
      }),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log(data);
    return {
      id: data?.image_id,
      url: data?.image_url,
    };
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
  }
}


//下载图片
const downloadImageAsBlob = async (imageUrl) => {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob(); // 将响应体转换为Blob对象
    const downloadUrl = window.URL.createObjectURL(blob); // 创建一个临时URL
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = "downloaded_image.png"; // 指定下载文件名
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl); // 释放创建的临时URL
  } catch (error) {
    console.error('下载图片失败', error);
  }
};


//示例图片函数
const handle_example_photo=async(parameter,type)=>{
  if(parameter&&type==='father'){
    father_example.value=true
    console.log('111');
    
  }else if(parameter&&type==='mather'){
    mather_example.value=true
  }else if(!parameter&&type==='father'){
    father_example.value=false
  }else if(!parameter&&type==='mather'){
    mather_example.value=false
  }
}

</script>



<style scoped>
.title {
  display: flex;
  justify-content: flex-start;
  gap: 20px;
  padding-bottom: 10px;
  font-weight: 200;
  font-size: 14px;
  position: relative;
}

.title > a {
  cursor: pointer;
}
.titleActive {
  font-weight: bold;
  font-size: 16px;
}

.title-close,.title-close_ {
  width: 15px;
  height: 15px;
  position: absolute;
  right: 10px;
  cursor: pointer;
}
.title-close_{
  width: 20px  !important;
  height: 20px;
  position: absolute;
  top: 20px;
  right: 20px;
}
.title-close:hover {
  outline: 15px solid #4f46e5;
  background: #4f46e5;
}
.title-close_:hover {
  outline: 15px solid #000;
  background: #000;
}
.module-container {
  display: flex;
  height: 300px;
  justify-content: space-around;
  align-items: center;
}

.mask-layer {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  top: 0;
  z-index: 99;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-flow: column;
  padding: 20px;
  padding-top: 50px;
}
.mask-layer > h2 {
  margin-bottom: 35px;
}

.tips-box {
  margin-bottom: 10px;
  height: 80px;
  width: 100%;
  transform: translateY(-10px);
}
.tips-box > h3 {
  font-weight: bold;
  text-align: center;
  margin-top: 50px;
}
.tips-box > p {
  /* white-space: nowrap; */
  font-weight: 300;
  text-align: center;
  font-size: 14px;
}

.Cancel {
  margin-top: 60px;
}
.module-left,
.module-right {
  width: 200px;
  height: 200px;
  border: 2px dashed #000;
  border-radius: 10px;
  background-color: #cdcbf8;
  opacity: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
}
.photoText {
  position: absolute;
  bottom: -35px;
  width: 100%;
  height: 25px;
  display: flex;
  justify-content: space-around;
}
.photoText-image {
  width: 30px;
  height: 30px;
}

.module-left .module-left-img,
.module-right .module-left-img {
  width: 30px;
  height: 30px;
}
.module-left > p,
.module-right > p {
  transform: translateY(50px);
}

.module-left:hover,
.module-right:hover {
  opacity: 1;
}

.module-left {
}
/* .module-x {
  width: 30px;
  background-image: url("../assets/imge/fenge.png");
  background-size: contain;
  height: 30px;
} */
.module-right {
}

.uploaded-photo {
  width: 100%;
  max-height: 100%;
  height: auto;
}

.button-box {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
}

.Generate-button {
  width: 300px;
  height: 50px;
  border-radius: 10px;
  background-color: #1b1b1b;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  cursor: pointer;
}

.Generate-button:hover {
  background-color: #4f46e5;
}
.module-left-3D {
  width: 300px;
  height: 200px;
}

.colorbox {
  display: flex;
  margin: 20px 0;
}
.colorbox > span {
  width: 40px;
  height: 40px;
  background-clip: content-box;
  cursor: pointer;
  padding: 5px;
  border-radius: 5px;
}


.active {
  outline: 2px solid #4f46e5;
}
.color-container > p {
  font-size: 14px;
  font-weight: 500;
}
.upload-3D {
  font-weight: 500;
  font-size: 12px;
}

.photoText.sanD {
  font-size: 14px;
}

.label {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.label > p {
  transform: translateY(30px);
}

.success-box {
  width: 100%;
  height: 100%;
  background-color: #fff;
  position: absolute;
  top: 0;
  display: flex;
  flex-flow: column;
  justify-content: space-around;
  align-items: center;
}

.success-box > img {
  width: 250px;
  border-radius: 10px;
}
.success-box > h4 {
  font-size: 16px;
  font-weight: bold;
}

.message{
  position: absolute;
  top: 70px;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.message::before{
  content: '';
  display: inline-block;
  width: 30px;
  height: 30px;
  background-image: url('../assets/imge/hint.png');
  background-size: contain;
  margin-right: 10px;
}

.example_photo,.example_photo_{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: url('../assets/imge/_father.png');
  z-index: 100;
  background-size: contain;
}
.example_photo_{
  background-image: url('../assets/imge/_mather.png');
}

.example_btn{
  position: absolute;
  width: 30px;
  height: 30px;
  right: 40px;
  background-image: url('../assets/imge/light.png');
  background-size: contain;
}
</style>