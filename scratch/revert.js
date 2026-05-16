const fs = require('fs');
const files = ['index.html', 'our-lead.html', 'privacy-policy.html', 'terms-of-use.html', 'work-with-us.html'];

files.forEach(f => {
  if (fs.existsSync(f)) {
    let c = fs.readFileSync(f, 'utf8');
    c = c.replace(/href="style\.min\.css"/g, 'href="style.css"');
    c = c.replace(/src="script\.min\.js"/g, 'src="script.js"');
    fs.writeFileSync(f, c, 'utf8');
    console.log(`Reverted ${f}`);
  }
});
