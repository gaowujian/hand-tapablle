// const { AsyncSeriesWaterfallHook } = require("tapable");

class AsyncSeriesWaterfallHook {
  constructor(limit = []) {
    this.limit = limit;
    this.tasks = [];
  }
  tapPromise(name, task) {
    this.tasks.push(task);
  }
  promise(...args) {
    return new Promise((resolve, reject) => {
      const [first, ...others] = this.tasks;

      return others
        .reduce((pre, curTask) => {
          return pre.then((data) => curTask(data)).catch(reject);
        }, first(...args))
        .then(resolve)
        .catch(reject);
    });
  }
}
const FrontEnd = new AsyncSeriesWaterfallHook(["name"]);
FrontEnd.tapPromise("webpack", (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(name + " get webpack ");
      resolve("小李");
    }, 1000);
  });
});
FrontEnd.tapPromise("webpack", (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(name + " get webpack ");
      resolve("小张");
    }, 1000);
  });
});
FrontEnd.tapPromise("webpack", (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(name + " get webpack ");
      resolve("小红");
    }, 1000);
  });
});
FrontEnd.promise("小王")
  .then((data) => {
    console.log("全学完了", data);
    console.log("end");
  })
  .catch((err) => {
    console.log("err:", err);
  });
