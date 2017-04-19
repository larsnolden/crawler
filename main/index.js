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
  let domainObj = getDomain(domainName).then(domainObj => {
    console.log(`initial Domain Object: ${JSON.stringify(domainObj)}`);
    //add initial domain Obj to Couch DB

    //crawl infinetly
    while (queue.external.length > 0) {
      let nextUrl = queue.external.shift();
      console.log(`start crawling new page: ${nextUrl}`)
      let nextDomainName = filterDomain(nextUrl);
      getDomain(nextDomainName).then(domainObj => {
        //add Domain Obj to Couchbase
      })
    }
  })
}

//crawl main function
const getDomain = (domainName) => {
  return new Promise((resolve) => {
    let domain = new Objects.Domain(domainName);

    const getPageWrapper = (nextUrl = 'http://' + domainName) => {
      let page = getPage(nextUrl, domainName).then((page => {
        domain.addPage(page);
        console.log(`Page added: ${nextUrl}`)
        console.log(`internal Queue ${queue.internal.length}`);
        //get ext page with same domain
        if (queue.internal.length > 0) {
          nextUrl = queue.internal.shift()
          getPageWrapper(nextUrl)
        }
      }), error => {
        console.log(`getPage Error: ${error}`)
      })
    }

    getPageWrapper()
    if (queue.internal.length < 1) resolve(domain);
  })
}

const getPage = (url, domainName) => {
  return new Promise((resolve, reject) => {
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

              //add relative links and make them absolute
              if (link[0].startsWith('/')) {
                //make relative links absolute
                queue.addUrl('http://' + domainName + link[0], 'internal');
              } else if (link[0].includes(domainName) && link[0].startsWith('http') || link[0].startsWith('www')) {
                //add all absolute of the same Domain 
                queue.addUrl(link[0], 'internal');
              } else if (!link[0].includes(domainName) && link[0].startsWith('http') || link[0].startsWith('www')) {
                queue.addUrl(link, 'external');
              }
              link = new Objects.Link(link[0], link[1]);
              page.addLink(link);
            }
            console.log(`got Page ${url}`)
            resolve(page);
          }), (error) => {
            reject(error)
          })
      })
  })
}