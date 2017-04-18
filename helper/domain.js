// domain.js
// ========

function Domain(domain) {
  this.domain = domain,
  this.pages = [],
  this.addPage = (page) => {
    this.pages.push(page);
  }
} 

function Page(url) {
    //somehow have to save pages in pages array 
    this.url = url,
    this.links = []
    this.addLink = (link) => {
      this.links.push(link);
    }  
}

function Link(dest, desc) {
  this.dest = dest,
  this.desc = desc
}

module.exports = { Domain, Page, Link};