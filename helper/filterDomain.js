// filterDomain.js
// ========

const filterDomain = (url) => {
  let domain = url.split('/');
  for (frag of domain) {
    if (frag.includes('.')) return frag
  }
}

module.exports = filterDomain;