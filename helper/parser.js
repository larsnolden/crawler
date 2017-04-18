// parser.js
// ========
const cheerio = require('cheerio')
var filterDomain = require('./filterDomain');

const parse = (html) => {
  return new Promise((resolve, reject) => {
    if (typeof html != 'string') {
      let err = new Error('parse: html or domain not of type string');
      throw (err);
    }

    try {
      let parser = cheerio.load(html);
      let links = [];

      //get all links from body
      parser('a').each(function (i, elem) {
        //proceed if '<a>' tag has href and desc
        if (typeof elem.attribs.href != 'undefined' && elem.attribs.href != null && elem.attribs.href != null && elem.children.length != 0) {

          let link = elem.attribs.href;
          let desc = elem.children[0].data;
          //console.log(`link: ${link}`, `desc: ${desc}`);
          links.push([link, desc]);
        }
      })
      resolve(links)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = parse;