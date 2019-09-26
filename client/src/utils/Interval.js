/**
 * Managed interval function
 * Usage:
    var i = new Interval(() => {
      console.log("Ticked on interval!")
    }, 1000);
    i.start();
 */


function Interval(fn, time) {
  var timer = false;
 
  this.start = function () {
    if (!this.isRunning())
      timer = setInterval(fn, time);
  };
 
  this.stop = function () {
    clearInterval(timer);
    timer = false;
  };
 
  this.isRunning = function () {
    return timer !== false;
  };
}

module.exports = Interval