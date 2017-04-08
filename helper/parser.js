// parser.js
// ========

const parseBody = (body, url) => {
  let domain = getDomain(url);

  try {
    let parser = cheerio.load(body);
    console.log('parsing')

    //get all links from body
    parser('a').each(function (i, elem) {
      console.log('loop');
       //proceed if '<a>' tag has href and desc
       if (typeof elem.attribs.href != "undefined" && typeof elem.children[0] != "undefined") {
         console.log('test passed');
         let link = elem.attribs.href;
         let desc = elem.children[0].data;
         console.log(link);
         console.log(desc);
        //add absolute links with same domain
        if (link.includes(domain)) {
            queueAddDest(link);
          }
        //add relative links and make them absolute
        else if (link.startsWith('/')) {
            link = 'http://' + domain + link;
            queueAddDest(link);
          } else {
            //let Link = new Page.Link(link)
          }
        }
      }
    )
  }
  catch(error) {
    console.log(`Parse Error: ${error}`);
  }

  //crawl nex avail. URL
  crawl(queue.next());
}

module.exports = parseBody;