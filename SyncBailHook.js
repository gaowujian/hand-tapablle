// const { SyncBailHook } = require("tapable");

class SyncBailHook {
  constructor(limit = []) {
    this.limit = limit;
    this.tasks = [];
  }
  tap(name, task) {
    this.tasks.push(task);
  }
  call(...args) {
    const param = args.slice(0, this.limit.length);
    for (let i = 0; i < this.tasks.length; i++) {
      const result = this.tasks[i](...param);
      if (result) return;
    }
  }
}

const FrontEnd = new SyncBailHook(["name"]);
FrontEnd.tap("webpack", (name) => {
  console.log(name + " get webpack ");
  return 1;
});
FrontEnd.tap("react", (name) => {
  console.log(name + " get react");
});
FrontEnd.start = (...args) => {
  FrontEnd.call(...args);
};
FrontEnd.start("xiaoming");
