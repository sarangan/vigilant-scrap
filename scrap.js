const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('post.csv');
// Write Headers
writeStream.write(`Title \n`);
request('https://www.npmjs.com/package/cheerio', (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);
    $('li').each((i, el) => {
      const title = $(el)
        .find('code')
        .text()
        .replace(/\s\s+/g, '');
      // Write Row To CSV
      if(title){
        writeStream.write(`${title} \n`);
      }
    });
    console.log('Scraping Done...');
  }
});
