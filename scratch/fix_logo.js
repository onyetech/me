const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

// Remove the previously appended shade overlay
const overlayMarker = '/* ─── LOGO SHADE OVERLAY';
if (css.includes(overlayMarker)) {
  css = css.substring(0, css.indexOf(overlayMarker));
}

// Strip out existing filter: invert(...) to stop the logo from being orange
css = css.replace(/filter:\s*invert[^;]+;/g, '');

// Append the robust logo gradient CSS
const newCss = `
/* ─── LOGO SHADE OVERLAY ────────────────────────────────────────── */
.nav-logo, .footer-brand {
  position: relative;
  display: inline-block;
}

/* Hide the actual image but keep its dimensions */
.nav-logo img, .footer-brand img {
  opacity: 0 !important;
}

/* Paint the gradient mask over the container */
.nav-logo::after, .footer-brand::after {
  content: '';
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  
  /* 3 intervals: grey, gold, grey at 30 degrees */
  background: linear-gradient(30deg, #808080 0%, #d4af37 50%, #808080 100%);
  
  -webkit-mask-image: url('images/logo.webp');
  -webkit-mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: left center;
  mask-image: url('images/logo.webp');
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: left center;
  
  pointer-events: none;
}
`;

fs.writeFileSync('style.css', css + newCss);
console.log('Fixed style.css');
