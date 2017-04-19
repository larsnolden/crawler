// Queue.js
// ========

function Queue() {
  this.internal = [];
  this.external = [];
  this.addUrl = (url, type) => {
    if (type == "external") {
      for (let link of this.external) {
        if (url == link) return
      }
      this.external.push(url)
    }
    if (type == "internal") {
      for (let link of this.internal) {
        if (url == link) return
      }
      this.internal.push(url)
    }
    //console.log(`added ${url} as ${type} to queue`)
  }
}

module.exports = Queue;