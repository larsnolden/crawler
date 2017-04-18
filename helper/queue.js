// Queue.js
// ========

function Queue() {
  this.sameDomain = [];
  this.external = [];
  this.addUrl = (url, type) => {
    if ([type].length > 1) {
      for (let dest of [type].keys) {
        if (dest == url) return
      }
    }
    [type].push(url);
  }
}

module.exports = Queue;