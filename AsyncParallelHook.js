// const { AsyncParallelHook } = require("tapable");

class AsyncParallelHook {
  constructor(limit = []) {
    this.limit = limit;
    this.asyncTasks = [];
    this.promiseTasks = [];
  }

  tapAsync(name, task) {
    this.asyncTasks.push(task);
  }
  callAsync(...args) {
    const param = args.slice(0, this.limit.length);
    const cb = typeof args[this.limit.length] === "function" ? args[this.limit.length] : null;

    // =========处理异步任务==========
    let count = 0;
    const len = this.asyncTasks.length;
    for (let i = 0; i < this.asyncTasks.length; i++) {
      const listener = this.asyncTasks[i];
      listener(...param, () => {
        if (++count === len) {
          if (cb) {
            cb();
          }
        }
      });
    }
  }
  tapPromise(name, task) {
    this.promiseTasks.push(task);
  }
  promise(...args) {
    const param = args.slice(0, this.limit.length);
    return Promise.all(this.promiseTasks.map((task) => task(...param)));
  }
}

console.time("cost");
const FrontEnd = new AsyncParallelHook(["name"]);

FrontEnd.tapAsync("webpack", (name, cb) => {
  setTimeout(() => {
    console.log(name + " get webpack ");
    cb();
  }, 1000);
});
FrontEnd.tapAsync("react", (name, cb) => {
  setTimeout(() => {
    console.log(name + " get react");
    cb();
  }, 2000);
});

FrontEnd.callAsync("小王", () => {
  console.log("end");
  console.timeEnd("cost");
});

// FrontEnd.tapPromise("webpack", (name) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log(name + " get webpack ");
//       resolve();
//     }, 1000);
//   });
// });
// FrontEnd.tapPromise("react", (name) => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log(name + " get react ");
//       resolve();
//     }, 1000);
//   });
// });

// FrontEnd.promise("小王").then(() => {
//   console.log("end");
// });
