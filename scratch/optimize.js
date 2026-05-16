const fs = require('fs');
const files = ['index.html', 'our-lead.html', 'privacy-policy.html', 'terms-of-use.html', 'work-with-us.html'];

files.forEach(f => {
  if (fs.existsSync(f)) {
    let c = fs.readFileSync(f, 'utf8');
    
    // Phones
    c = c.replace(/\+2349054197743/g, '+2348062646669');
    c = c.replace(/2349054197743/g, '2348062646669');
    c = c.replace(/\+234 905 419 7743/g, '+234 806 264 6669');
    
    // Assets
    c = c.replace(/href="style\.css"/g, 'href="style.min.css"');
    c = c.replace(/src="script\.js"/g, 'src="script.min.js"');
    c = c.replace(/images\/logo\.png/g, 'images/logo.webp');
    c = c.replace(/images\/Gemini_Generated_Image_blncdblncdblncdb-removebg-preview\.png/g, 'images/preloader-logo.webp');
    
    fs.writeFileSync(f, c, 'utf8');
    console.log(`Optimized ${f}`);
  }
});
