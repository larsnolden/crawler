// test.js
// ========

var assert = require('assert');

//import all the stuff to test
var Domain = require('../helper/domain');
var filterDomain = require('../helper/filterDomain');
var parser = require('../helper/parser');
var Queue = require('../helper/queue');

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
    assert('web.whatsapp.com', filterDomain('https://web.whatsapp.com'))
  })
})

//Domain Object
describe('Domain Object Constructor', () => {
  describe('new Domain Object', () => {
    it('should create a new Object with domain string and pages array', () => {
      let aDomain = new Domain('developer.mozilla.org');
      assert(aDomain.domain, 'developer.mozilla.org');
      assert(typeof aDomain.pages, 'array');
    })
  })
  describe('new Page Object nested in Domain Object', () => {
    it('should create new page object with url string and empty pages array', () => {
      aDomain.page('https://developer.mozilla.org/en-US/docs/Learn');
      assert(aDomain)
    })
  })
})