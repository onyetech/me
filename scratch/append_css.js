const fs = require('fs');

const css = `
/* ─── LOGO SHADE OVERLAY ────────────────────────────────────────── */
.nav-logo, .footer-brand {
  position: relative;
  display: inline-block;
}

.nav-logo::after, .footer-brand::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  /* 3 intervals: grey, gold, grey at 30 degrees */
  background: linear-gradient(30deg, transparent 20%, rgba(128,128,128,0.85) 40%, rgba(212,175,55,0.9) 50%, rgba(128,128,128,0.85) 60%, transparent 80%);
  background-size: 200% 200%;
  
  /* Mask it so the shade only covers the solid parts of the logo */
  -webkit-mask-image: url('images/logo.webp');
  -webkit-mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-image: url('images/logo.webp');
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
  
  /* Animate the shade sweeping across */
  animation: logoShadeSweep 6s infinite ease-in-out;
  pointer-events: none;
  z-index: 10;
}

@keyframes logoShadeSweep {
  0% { background-position: -200% -200%; }
  40% { background-position: 200% 200%; }
  100% { background-position: 200% 200%; }
}
`;

fs.appendFileSync('style.css', css);
console.log('CSS appended');
