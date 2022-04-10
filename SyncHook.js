// const { SyncHook } = require("tapable");

class SyncHook {
  constructor(limit = []) {
    this.limit = limit;
    this.tasks = [];
  }
  tap(name, task) {
    this.tasks.push(task);
  }
  call(...args) {
    const param = args.slice(0, this.limit.length);
    this.tasks.forEach((item) => item(...param));
  }
}

const FrontEnd = new SyncHook(["name", "age"]); // 添加参数约定
FrontEnd.tap("webpack", (name, age) => {
  console.log(name + " get webpack" + age);
});
FrontEnd.tap("react", (name) => {
  console.log(name + " get react");
});

FrontEnd.call("wujian", 28);
