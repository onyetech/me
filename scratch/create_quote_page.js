const fs = require('fs');

// 1. Create get-a-quote.html from work-with-us.html
let content = fs.readFileSync('work-with-us.html', 'utf8');

// Update meta/title
content = content.replace(/<title>.*?<\/title>/, '<title>Get a Quote - Onyetech Creative Hub</title>');
content = content.replace(/href="https:\/\/onyetech\.github\.io\/me\/work-with-us\.html"/g, 'href="https://onyetech.github.io/me/get-a-quote.html"');
content = content.replace(/content="https:\/\/onyetech\.github\.io\/me\/work-with-us\.html"/g, 'content="https://onyetech.github.io/me/get-a-quote.html"');

// Update form action
content = content.replace(/action="[^"]*"/, 'action="https://formspree.io/f/mqejzagk"');

// Update heading
content = content.replace(/<h3>Start Your Project<\/h3>/, '<h3>Get a Free Quote</h3>');
content = content.replace(/<p>Fill out the details below.*?<\/p>/, '<p>Fill out the details below and our team will get back to you with a comprehensive quote within 24 hours.</p>');

fs.writeFileSync('get-a-quote.html', content);

// 2. Update navigation across the site to unlink "Get a Quote" from "work-with-us.html"
const files = ['index.html', 'privacy-policy.html', 'terms-of-use.html', 'our-lead.html', 'work-with-us.html'];
files.forEach(f => {
  let html = fs.readFileSync(f, 'utf8');
  // Specifically replace "Get a Quote" buttons to point to get-a-quote.html
  html = html.replace(/href="work-with-us\.html"([^>]*>Get a Quote<\/a>)/g, 'href="get-a-quote.html"$1');
  fs.writeFileSync(f, html);
});

console.log('Created get-a-quote.html and updated nav buttons!');
