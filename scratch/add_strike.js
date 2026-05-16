const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');

const strikeCss = `
/* Slanted strike on the logo */
.nav-logo::before, .footer-brand::before {
  content: '';
  position: absolute;
  top: 50%;
  left: -5%;
  width: 110%;
  height: 2px;
  background: #d4af37; /* Gold strike */
  transform: translateY(-50%) rotate(-15deg);
  z-index: 20;
  box-shadow: 0 0 5px rgba(212, 175, 55, 0.5);
  pointer-events: none;
}
`;

// Append the strike CSS at the very end of the file
fs.writeFileSync('style.css', css + '\n' + strikeCss);
console.log('Strike added');
