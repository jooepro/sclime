const DOMAIN_PRICE_USD = 2000; // Change the domain price here.
const getSellerEmail = () => ['yousefshabank', '@', 'gmail.com'].join(''); // Change the seller email parts here.

(() => {
  const formattedDomainPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(DOMAIN_PRICE_USD);

  document.querySelector('#domain-price').textContent = `${formattedDomainPrice} USD`;
  document.querySelector('#buy-now-link').textContent = `Buy Now at ${formattedDomainPrice}`;
  document.querySelector('#price-badge').textContent = `Buy Now: ${formattedDomainPrice}`;
  document.querySelector('#faq-price').textContent = formattedDomainPrice;
  document.querySelector('#faq-seller-email').textContent = getSellerEmail();
  document.querySelector('#footer-email').textContent = getSellerEmail();

  const offerAmount = document.querySelector('#offer-amount');
  document.querySelector('#buy-now-link').addEventListener('click', () => {
    offerAmount.value = DOMAIN_PRICE_USD;
  });
  document.querySelector('#different-offer-link').addEventListener('click', () => {
    offerAmount.value = '';
    window.setTimeout(() => offerAmount.focus(), 0);
  });

  const offerForm = document.querySelector('#offer-form');
  const gmailLink = document.querySelector('#gmail-link');
  const copyEmailButton = document.querySelector('#copy-email-button');
  const copyStatus = document.querySelector('#copy-status');
  const offerIntro = document.querySelector('#offer-intro');
  offerIntro.textContent = `Buy now for ${formattedDomainPrice}, or send me your offer below.`;

  const fields = {
    name: document.querySelector('#buyer-name'),
    email: document.querySelector('#buyer-email'),
    amount: document.querySelector('#offer-amount'),
    message: document.querySelector('#buyer-message'),
  };
  const errorNodes = {
    name: document.querySelector('#buyer-name-error'),
    email: document.querySelector('#buyer-email-error'),
    amount: document.querySelector('#offer-amount-error'),
    message: document.querySelector('#buyer-message-error'),
  };

  const clearErrors = () => Object.values(errorNodes).forEach((node) => { node.textContent = ''; });
  const validateOffer = () => {
    clearErrors();
    let isValid = true;
    if (!fields.name.value.trim()) { errorNodes.name.textContent = 'Please enter your name.'; isValid = false; }
    if (!fields.email.value.trim()) { errorNodes.email.textContent = 'Please enter your email address.'; isValid = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.value.trim())) { errorNodes.email.textContent = 'Please enter a valid email address.'; isValid = false; }
    if (!Number.isFinite(Number(fields.amount.value)) || Number(fields.amount.value) <= 0) { errorNodes.amount.textContent = 'Offer amount must be a positive number.'; isValid = false; }
    if (!fields.message.value.trim()) { errorNodes.message.textContent = 'Please add a message.'; isValid = false; }
    return isValid;
  };

  const buildEmail = () => {
    const amount = Number(fields.amount.value);
    const isBuyNow = amount >= DOMAIN_PRICE_USD;
    const subject = isBuyNow ? `Buy Now: Sclime.com (${formattedDomainPrice})` : 'Offer for Sclime.com';
    const bodyLines = [
      `Name: ${fields.name.value.trim()}`,
      `Email: ${fields.email.value.trim()}`,
      `Company: ${document.querySelector('#buyer-company').value.trim() || 'Not provided'}`,
      `Offer amount: ${fields.amount.value.trim()} USD`,
      `Message: ${fields.message.value.trim()}`,
    ];
    if (isBuyNow) bodyLines.push("I'd like to buy Sclime.com at the listed price.");
    const body = bodyLines.join('\n');
    return { subject, body, email: getSellerEmail() };
  };

  offerForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!validateOffer()) return;
    const { email, subject, body } = buildEmail();
    gmailLink.href = `https://mail.google.com/mail/?view=cm&to=${encodeURIComponent(email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  copyEmailButton.addEventListener('click', async () => {
    const email = getSellerEmail();
    try {
      await navigator.clipboard.writeText(email);
      copyStatus.textContent = 'Copied!';
      window.setTimeout(() => { copyStatus.textContent = ''; }, 1800);
    } catch {
      copyStatus.textContent = 'Copy failed — please use the Gmail option.';
    }
  });

  document.querySelectorAll('.faq-question').forEach((question) => {
    question.addEventListener('click', () => {
      const isExpanded = question.getAttribute('aria-expanded') === 'true';
      const answer = document.querySelector(`#${question.getAttribute('aria-controls')}`);
      question.setAttribute('aria-expanded', String(!isExpanded));
      answer.setAttribute('aria-hidden', String(isExpanded));
      question.closest('.faq-item').classList.toggle('is-open', !isExpanded);
    });
  });

  const revealTargets = document.querySelectorAll('main > section, .glass-card');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  revealTargets.forEach((target) => target.classList.add('reveal'));
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealTargets.forEach((target) => target.classList.add('is-visible'));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    revealTargets.forEach((target) => revealObserver.observe(target));
  }

  const starfield = document.querySelector('.starfield');
  const starCount = 72;

  for (let index = 0; index < starCount; index += 1) {
    const star = document.createElement('span');
    star.className = 'star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 72}%`;
    star.style.opacity = `${0.18 + Math.random() * 0.42}`;
    star.style.transform = `scale(${0.55 + Math.random() * 0.8})`;
    starfield.appendChild(star);
  }

  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-links a, .nav-cta');

  menuToggle?.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => link.addEventListener('click', () => {
    navMenu.classList.remove('is-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  }));

})();
