// ?async/await的特点:

// todo 可以让异步逻辑用同步写法实现
// todo 最底层的await返回需要是Promise对象
// todo 可以通过多层 async function 的同步写法代替传统的callback嵌套

function getSyncTime() {
  return new Promise((resolve, reject) => {
    try {
      let startTime = new Date().getTime();
      setTimeout(() => {
        let endTime = new Date().getTime();
        let data = endTime - startTime;
        resolve(data);
      }, 500);
    } catch (err) {
      reject(err);
    }
  });
}

async function getSyncData() {
  let time = await getSyncTime();
  console.log(time);
  let data = `endTime - startTime = ${time}`;
  console.log(data);
  return data;
}

async function getData() {
  let data = await getSyncData();
  console.log(data);
}

getData();
