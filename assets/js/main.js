import { initTheme } from './modules/ui/theme.js';
import { initMobileMenu } from './modules/ui/mobileMenu.js';
import { initNavigation } from './modules/ui/navigation.js';
import { initTypewriter } from './modules/animations/typewriter.js';
import { initCodeAnimation } from './modules/animations/codeAnimation.js';
import { initCanvasAnimation } from './modules/animations/canvasAnimation.js';
import { initScrollAnimations } from './modules/animations/scrollAnimations.js';
import { initSmoothScroll } from './modules/features/smoothScroll.js';
import { initContactForm } from './modules/features/contactForm.js';
import { initVisitorCounter } from './modules/features/visitorCounter.js';
import { initEmailLink } from './modules/features/emailLink.js';
import { selectPackage } from './modules/features/pricing.js';

initTheme();
initTypewriter();
initCodeAnimation();
initCanvasAnimation();
initScrollAnimations();
initMobileMenu();
initNavigation();
initSmoothScroll();
initContactForm();
initVisitorCounter();
initEmailLink();

window.selectPackage = selectPackage;
