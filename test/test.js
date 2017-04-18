// test.js
// ========

var assert = require('assert');

//import all the stuff to test
var Objects = require('../helper/Domain');
var filterDomain = require('../helper/filterDomain');
var parse = require('../helper/parser');
var Queue = require('../helper/Queue');


//Do the tests

//Queue
describe('Queue Object Constructor', () => {
  describe('new Queue', () => {
    it('should create a new Object with an empty links array', () => {
      let aQueue = new Queue();
      assert(typeof aQueue, 'object');
      assert(typeof aQueue.links, 'array');
    })
  })
})

//filterDomain
describe('filterDomain', () => {
  it(`should filter domains from absolute URL's`, () => {
    assert('mochajs.org', filterDomain('http://mochajs.org/'));
    assert('stackoverflow.com', filterDomain('http://stackoverflow.com/questions'));
    assert('docs.google.com', filterDomain('https://docs.google.com/spreadsheets'));
    assert('web.whatsapp.com', filterDomain('https://web.whatsapp.com'));
  })
})

//Domain Object
describe('Domain Object Constructor', () => {
    let aDomain = new Objects.Domain('developer.mozilla.org');
    let aPage = new Objects.Page('https://developer.mozilla.org/en-US/docs/Learn');
    let alink = new Objects.Link('https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML', 'Introduction to HTML');
    aPage.addLink(alink);
    aDomain.addPage(aPage)

    it('should create a new Object with domain string and pages array', () => {  
      assert(aDomain.domain, 'developer.mozilla.org');
      assert(typeof aDomain.pages, 'array');
    })
    it('should create new page object with url string and empty links array', () => {
      assert(aPage.url, 'https://developer.mozilla.org/en-US/docs/Learn');
      assert(typeof aPage.links, 'array');
    })
    it('should create a new Link Object with destination and description', () => {
      assert(alink.dest, 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML');
      assert(alink.desc ,'Introduction to HTML');
    })
    it('should push the Link Object to the links Array in the Page Object', () => {
      assert(aPage.links[0], alink);
    })
    it('should add the Page Object to the pages array in the domain object', () => {
      assert(aDomain.pages[0], aPage)
    })
})

//parser
describe('Parse HTML', () => {
 let html = `<html><div class="a"><span id="a"><a href="http://google.com">Google</a></span><a href="http://bing.com">Bing</a></html>`;
  it(`should filter all '<a..' tags and their description`, () => {
    assert(parse(html), [['http://google.com', 'Google'], ['http://bing.com', 'Bing']]);
  })
})