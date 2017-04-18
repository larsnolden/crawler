const fetch = require('node-fetch');
const readline = require('readline');
var Objects = require('../helper/Domain');
var filterDomain = require('../helper/filterDomain');
var parse = require('../helper/parser');
var Queue = require('../helper/Queue');

//queue for url to be parsed in order
let queue = new Queue;

//setup Terminal interaction / IO
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('Crawl (Full URL): ', (url) => {
  crawl(url);
})

const crawl = (startUrl) => {
  let domainName = filterDomain(startUrl);
  let domainObj = getDomain(domainName).then((domainObj) => {
    console.log(JSON.stringify(domainObj));
    //add to Couch DB
  });

  while (true) {
    let nextUrl = queue.external.shift();
    let nextDomainName = filterDomain(nextUrl);
    getDomain(nextDomainName).then((domainObj) => {
      //add Domain Obj to Couchbase
    })
  }
}

//crawl main function
const getDomain = (domainName) => {
  return new Promise((resolve) => {
    let domain = new Objects.Domain(domainName);

    if (queue.links.length == 0) {
      startUrl = 'http://' + domainName;
      let page = getPage(startUrl, domainName);
      domain.addPage(page);
    }
    while (queue.links.length > 0) {
      let nextUrl = queue.sameDoamain.shift();
      let page = getPage(nextUrl, domainName);
      domain.addPage(page);
    }
    resolve(domain);
  })
}

const getPage = (url, domainName) => {
  fetch(url)
    .then((result) => result.text(), (failure) => console.log(`Fetch Error ${failure}`))
    .then((html) => {
      console.log('fetch sucessfull');
      //[[dest, desc]]
      parse(html)
        .then((links => {
          //Page Object to be populated with Links
          let page = new Objects.Page(url);

          //add links with same domain to queue
          for (let link of links) {
            //add absolute links with same domain
            if (link[0].includes(domainName)) {
              queue.addUrl(link[0], 'sameDomain');
            }
            //add relative links and make them absolute
            else if (link[0].startsWith('/')) {
              queue.addUrl('http://' + domainName + link[0], 'sameDomain');
            } else {
              queue.addUrl(link, 'external');
            }
            link = new Objects.Link(link[0], link[1]);
            page.addLink(link);
          }
          return page;
        }), (error) => {
          console.log(error);
        })
    })
}