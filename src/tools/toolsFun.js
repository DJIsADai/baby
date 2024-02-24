import localForage from'localforage';

//存储图片
export const fetchAndStoreImageData = async (newData) => {
    try {
  
      // 尝试从localForage获取现存的图片数据数组
      const existingData = await localForage.getItem('imageDataArray') || [];
  
      // 将新数据添加到数组中，包括时间戳
      const updatedData = [...existingData, { ...newData, timestamp: Date.now() }];
  
      // 将更新后的数组保存回localForage
      await localForage.setItem('imageDataArray', updatedData);
      console.log('新数据已添加到存储数组');
    } catch (error) {
      console.error('获取或存储数据失败', error);
    }
  };
  
  //base64转URL
export function base64ToBlobUrl(base64Data) {
   try {
     // 将Base64编码的字符串转换为二进制数据
     const byteString = atob(base64Data.split(',')[1]);
     // 获取mime类型
     const mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
   
     // 创建一个Uint8Array来存储二进制数据
     const arrayBuffer = new ArrayBuffer(byteString.length);
     const uint8Array = new Uint8Array(arrayBuffer);
     for (let i = 0; i < byteString.length; i++) {
       uint8Array[i] = byteString.charCodeAt(i);
     }
   
     // 创建Blob对象
     const blob = new Blob([uint8Array], {type: mimeString});
   
     // 创建并返回Blob URL
     const blobUrl = URL.createObjectURL(blob);
     return blobUrl;
   } catch (error) {
    
   }
  }

  //图片转格式
export function convertFileToBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No file provided");
    }

    const reader = new FileReader();
    reader.onload = function (event) {
      resolve(event.target.result); // 解析Base64编码的字符串
    };
    reader.onerror = function (error) {
      reject(error); // 在读取过程中发生错误时拒绝Promise
    };

    reader.readAsDataURL(file); // 以DataURL的形式读取文件内容
  });
}

//图片压缩
export function resizeImageToMaxSize(file, maxSizeKB = 250) {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("未提供文件");
      return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      let width = img.width;
      let height = img.height;
      const maxSide = Math.max(width, height);

      // 初始调整，确保最长边不超过一个预设的值，例如800px
      const initialScale = maxSide > 250 ? 250 / maxSide : 1;
      width *= initialScale;
      height *= initialScale;

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      // 绘制调整尺寸后的图片到canvas
      ctx.drawImage(img, 0, 0, width, height);

      // 尝试减少图片尺寸并检查大小
      let dataUrl = canvas.toDataURL("image/png");
      let attempt = 0;

      function adjustSize() {
        if (dataUrl.length <= maxSizeKB * 1024 || attempt > 10) {
          resolve(dataUrl); // 成功压缩到目标大小以下
        } else {
          // 每次减少10%的尺寸
          width *= 0.9;
          height *= 0.9;
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          dataUrl = canvas.toDataURL("image/png");
          attempt++;
          adjustSize(); // 递归调用直到满足条件
        }
      }

      adjustSize();
    };

    img.onerror = () => {
      reject("图片加载错误");
    };
  });
}


// 时间戳转年月日
export function timestampToYMD(timestamp) {
  let date = new Date(timestamp);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  let formattedDate = year + '-' + (month < 10 ? '0' : '') + month + '-' + (day < 10 ? '0' : '') + day;
  
  return formattedDate;
}


// export function handleFileChange_(event) {
//   const file = event.target.files[0];
//   if (file) {
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       // e.target.result 是文件的数据URL
//       imageUrl.value = e.target.result;
//     };
//    return  reader.readAsDataURL(file); // 将文件读取为DataURL
//   }
// }