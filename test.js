let queue3 = new AsyncSeriesHook(["name"]);
console.time("cost3");
queue3.tapPromise("1", function (name) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      console.log(name, 1);
      resolve();
    }, 1000);
  });
});
queue3.tapPromise("2", function (name, callback) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      console.log(name, 2);
      resolve();
    }, 2000);
  });
});
queue3.tapPromise("3", function (name, callback) {
  return new Promise(function (resolve) {
    setTimeout(function () {
      console.log(name, 3);
      resolve();
    }, 3000);
  });
});
queue3.promise("webapck").then((err) => {
  console.log(err);
  console.timeEnd("cost3");
});

// Results of the
/* 
webapck 1
webapck 2
webapck 3
undefined
cost3: 6021.817ms
*/
