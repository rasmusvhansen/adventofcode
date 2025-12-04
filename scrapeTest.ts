import { writeFileSync } from 'fs';
import * as cheerio from 'cheerio';

const url = process.argv[2];
console.log(`Scraping ${url}`);

const $ = await cheerio.fromURL(url);

writeFileSync('test.txt', $('pre').text(), 'utf8');
