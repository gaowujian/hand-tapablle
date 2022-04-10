// const { AsyncSeriesHook } = require("tapable");

class AsyncSeriesHook {
  constructor(limit = []) {
    this.limit = limit;
    this.tasks = [];
  }
  tapPromise(name, task) {
    this.tasks.push(task);
  }
  promise(...args) {
    return new Promise((resolve, reject) => {
      // ! 递归的写法 不够优雅
      //   let task = this.tasks.shift();
      //   const next = (item) => {
      //     if (!item) {
      //       resolve();
      //     } else {
      //       item(...args)
      //         .then(() => {
      //           const nextTask = this.tasks.shift();
      //           next(nextTask);
      //         })
      //         .catch(() => {
      //           reject();
      //         });
      //     }
      //   };
      //   next(task);

      const [first, ...others] = this.tasks;
      return others
        .reduce(
          (preTask, curTask) =>
            preTask(...args)
              .then(() => curTask(...args))
              .catch(reject),
          first
        )
        .then(resolve)
        .catch(reject);
    });
  }
}

const FrontEnd = new AsyncSeriesHook(["name"]);
console.time("webpack");
console.time("react");
FrontEnd.tapPromise("webpack", (name, cb) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(name + " get webpack ");
      console.timeEnd("webpack");
      resolve();
    }, 1000);
  });
});
FrontEnd.tapPromise("react", (name, cb) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(name + " get react ");
      console.timeEnd("react");
      resolve();
    }, 1000);
  });
});

FrontEnd.promise("小王")
  .then(() => {
    console.log("end");
  })
  .catch((err) => {
    console.log("err:", err);
  });
