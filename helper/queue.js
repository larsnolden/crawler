// Queue.js
// ========

function Queue() {
  this.links = [];
}

Queue.prototype.add = (url) => {
  for (dest in this.links) {
    if (dest === url) return
  }
  this.links.push(url);
}

Queue.prototype.next = () => {
  if(this.links[0] != 'undefined') {
    let nextLink = this.links[0];
    this.links.shift();
  }
  else {
    //select some still unvisited site
    //link = unvisited link
  }
  return nextLink;
}

module.exports = Queue;