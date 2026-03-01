/* site.js — shared across all pages
   Inline injection: works with file:// and http:// equally */
(function () {

    var HEADER_HTML = `
<div class="topbar">
    🇮🇳 Proudly serving Indian financial planning since 2012 &nbsp;|&nbsp; Your data never leaves your device — <a href="index.html#privacy">learn more</a>
</div>
<header class="site-header">
    <div class="header-inner">
        <a href="index.html" class="logo-wrap">
            <img src="images/logo.png" alt="ArthaStambh.com">
        </a>
        <nav class="main-nav" id="main-nav">
            <a href="index.html">Home</a>
            <a href="quick-calculators.html">Quick Calculators</a>
            <a href="products.html">Products</a>
            <a href="contact.html">Contact Us</a>
        </nav>
    </div>
</header>`;

    var FOOTER_HTML = `
<footer class="site-footer">
    <div class="footer-inner">
        <nav class="footer-nav">
            <a href="index.html">Home</a>
            <span class="sep">|</span>
            <a href="quick-calculators.html">Quick Calculators</a>
            <span class="sep">|</span>
            <a href="products.html">Products</a>
            <span class="sep">|</span>
            <a href="contact.html">Contact Us</a>
            <span class="sep">|</span>
            <a href="terms.html">Terms of Use</a>
            <span class="sep">|</span>
            <a href="privacy.html">Privacy Policy</a>
        </nav>
        <p class="footer-copy">© ArthaStambh.com 2012–2026. All Rights Reserved.</p>
        <p class="footer-disclaimer">
            <strong>Disclaimer:</strong> The calculators on this website are provided as self-help financial planning tools for your independent use. While all care has been taken to ensure accuracy, results are estimates based on the assumptions you provide and do not constitute financial advice. Actual outcomes may vary due to changes in market conditions, inflation, tax laws, and personal circumstances. ArthaStambh does not collect, store, or transmit any personal or financial data — all calculations run entirely within your browser and your data remains on your device at all times. Consult a certified financial planner before making any financial decisions.
        </p>
    </div>
</footer>`;

    var AD_LEFT  = `<div class="ad-col-left"><div class="ad-slot"></div></div>`;
    var AD_RIGHT = `<div class="ad-col-right"><div class="ad-slot"></div></div>`;

    // Inject header
    var hp = document.getElementById('header-placeholder');
    if (hp) hp.innerHTML = HEADER_HTML;

    // Inject footer
    var fp = document.getElementById('footer-placeholder');
    if (fp) fp.innerHTML = FOOTER_HTML;

    // Wrap main content with ad columns if page-body-wrap exists
    var pbw = document.getElementById('page-body-wrap');
    if (pbw) {
        pbw.insertAdjacentHTML('afterbegin', AD_LEFT);
        pbw.insertAdjacentHTML('beforeend', AD_RIGHT);
    }

    // Set active nav link based on current page filename
    function setActiveNav() {
        var page = location.pathname.split('/').pop() || 'index.html';
        if (page === '') page = 'index.html';
        document.querySelectorAll('nav.main-nav a').forEach(function(a) {
            a.classList.toggle('active', a.getAttribute('href') === page);
        });
    }
    setActiveNav();

    // Scroll-triggered fade-in
    function initFadeIn() {
        if (!window.IntersectionObserver) {
            document.querySelectorAll('.fade-in').forEach(function(el) { el.classList.add('visible'); });
            return;
        }
        var obs = new IntersectionObserver(function(entries) {
            entries.forEach(function(e) {
                if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
            });
        }, { threshold: 0.08 });
        document.querySelectorAll('.fade-in').forEach(function(el) { obs.observe(el); });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initFadeIn);
    } else {
        initFadeIn();
    }
})();
