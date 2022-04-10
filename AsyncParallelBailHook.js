// const { AsyncParallelBailHook } = require("tapable");

class AsyncParallelBailHook {
  constructor(limit = []) {
    this.limit = limit;
    this.tasks = [];
  }
  tapPromise(name, task) {
    this.tasks.push(task);
  }
  promise(...args) {
    const param = args.slice(0, this.limit.length);

    const newTasks = this.tasks.map((task) => {
      return new Promise((resolve, reject) => {
        task(...args)
          .then(resolve)
          .catch((err) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
      });
    });
    return Promise.all(newTasks);
  }
}

const FrontEnd = new AsyncParallelBailHook(["name"]);
FrontEnd.tapPromise("webpack", (name) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(name + " get webpack ");
      reject();
    }, 1000);
  });
});
FrontEnd.tapPromise("react", (name, cb) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(name + " get react ");
      resolve();
    }, 2000);
  });
});
FrontEnd.promise("小王").then(
  () => {
    console.log("end");
  },
  (err) => {
    console.log("听说：", err);
  }
);
