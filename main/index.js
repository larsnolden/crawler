const fetch = require('node-fetch');
const readline = require('readline');
const cheerio = require('cheerio')
const Domain = require('./helper/domain');

//queue for url to be parsed in order
let queue = []

var domain = new Domain('google.com');
console.log(domain);



//setup Terminal interaction / IO
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

  console.log(`Crawlin ${url}`);
 fetch(url)
    .then((result) => result.text(), (failure) => console.log(failure))
    .then((html) => {
      console.log('fetch sucessfull')
      return {html, url}
    })



//Search Start
const newCrawl = (url) => {
  rl.question('Crawl (Full URL): ', (url) => {
    //crawl this url
    FetchBody(url);
  })
}

const crawl = (url) => {
  console.log(`queue: ${queue[0]}`);
  FetchBody(url);
}



newCrawl();
//couchdb