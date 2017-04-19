// filterDomain.js
// ========
const filterDomain = (url) => {
  if (typeof url != 'string') {
    let err = new Error('filterDomain: URL is not of type string');
    throw (err);
  }
  let domain = url.split('/');
  for (frag of domain) {
    if (frag.includes('.')) return frag
  }
}

module.exports = filterDomain;