// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { chromium } = require("playwright");
const fs = require('fs');

async function saveHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com");


  const articles = await page.evaluate(() => {
    const articleElements = document.querySelectorAll('.athing');
    const articles = [];
    for (let i = 0; i < 10 && i < articleElements.length; i++) {
      const titleElement = articleElements[i].querySelector('.titleline a');
      const title = titleElement ? titleElement.innerText : '';
      const url = titleElement ? titleElement.href : '';
      articles.push({ title, url });
    }
    return articles;
  });

  // Convert articles to CSV format
  const csvData = articles.map(article => `${article.title},${article.url}`).join('\n');

  // Write CSV data to a file
  fs.writeFileSync('articles.csv', 'Title,URL\n' + csvData);

  console.log('Articles saved to articles.csv');

  console.log(articles)
}

(async () => {
  await saveHackerNewsArticles();
})();
