const fs = require('fs');
const files = ['index.html', 'our-lead.html', 'privacy-policy.html', 'terms-of-use.html', 'work-with-us.html', 'get-a-quote.html'];

files.forEach(f => {
  if (fs.existsSync(f)) {
    let html = fs.readFileSync(f, 'utf8');
    
    // Replace specific instances of "work-with-us.html" and their text
    html = html.replace(/<a href="work-with-us\.html" class="btn-primary">Work With Our Team<\/a>/g, '<a href="get-a-quote.html" class="btn-primary">Get a Quote</a>');
    html = html.replace(/<a href="work-with-us\.html" class="btn-primary why-header__cta">Start a Project<\/a>/g, '<a href="get-a-quote.html" class="btn-primary why-header__cta">Get a Quote</a>');
    html = html.replace(/<li><a href="work-with-us\.html">Work With Us<\/a><\/li>/g, '<li><a href="get-a-quote.html">Get a Quote</a></li>');
    html = html.replace(/<a href="work-with-us\.html" class="btn-outline"([^>]+)>Work With Us<\/a>/g, '<a href="get-a-quote.html" class="btn-outline"$1>Get a Quote</a>');
    
    fs.writeFileSync(f, html);
  }
});

console.log('Replaced all Work With Us links to Get a Quote');
