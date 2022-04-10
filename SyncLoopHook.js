// const { SyncLoopHook } = require("tapable");

class SyncLoopHook {
  constructor(limit = []) {
    this.limit = limit;
    this.tasks = [];
  }
  tap(name, task) {
    this.tasks.push(task);
  }
  call(...args) {
    const param = args.slice(0, this.limit.length);
    let i = 0;
    while (i < this.tasks.length) {
      const result = this.tasks[i](...param);
      if (result) continue;
      i++;
    }
  }
}

const FrontEnd = new SyncLoopHook(["name"]);
let num = 0;
FrontEnd.tap("webpack", (name) => {
  console.log(name + " get webpack ");
  return ++num === 3 ? undefined : "再学一次";
});
FrontEnd.tap("react", (name) => {
  console.log(name + " get react");
});

FrontEnd.call("xiaoming");
