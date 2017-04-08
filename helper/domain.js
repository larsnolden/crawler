// domain.js
// ========

function Domain(domain) {
  this.domain = domain,
  this.pages = []
} 

Domain.prototype.Page = function(url) {
  //somehow have to save pages in pages array 
  this.url = url,
  this.links = []
}

Domain.prototype.Link = function(dest, desc) {
  this.dest = dest,
  this.desc = desc
}

module.exports = Domain;