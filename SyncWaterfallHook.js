// const { SyncWaterfallHook } = require("tapable");

class SyncWaterfallHook {
  constructor(limit = []) {
    this.limit = limit;
    this.tasks = [];
  }
  tap(name, task) {
    this.tasks.push(task);
  }
  call(...args) {
    const params = args.slice(0, this.limit.length);
    this.tasks.reduce((prev, cur) => {
      return cur(prev);
    }, ...params);
  }
}

const FrontEnd = new SyncWaterfallHook(["name"]);
FrontEnd.tap("webpack", (name) => {
  console.log(name + " get webpack ");
  return "学完webpack了，该学react了";
});
FrontEnd.tap("react", (name) => {
  console.log(name + " get react");
});

FrontEnd.call("xiaoming");
