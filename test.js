const { AsyncParallelHook } = require("tapable");

let queue1 = new AsyncParallelHook(["name"]);
console.time("cost");
queue1.tap("1", function (name) {
  console.log(name, 1);
});
queue1.tap("2", function (name) {
  console.log(name, 2);
});
queue1.tap("3", function (name) {
  console.log(name, 3);
});
queue1.callAsync("webpack", (err) => {
  console.timeEnd("cost");
});

// Results of the
/* 
webpack 1
webpack 2
webpack 3
cost: 4.520ms
*/
