/* =============================================================
   MAHENDRA BOOPATHY — PORTFOLIO
   Main Script
   ============================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------------- Preloader ---------------- */
  var preloader = document.getElementById('preloader');
  window.addEventListener('load', function () {
    setTimeout(function () {
      if (preloader) preloader.classList.add('hide');
    }, 500);
  });

  /* ---------------- AOS Init ---------------- */
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 60
    });
  }

  /* ---------------- Navbar scroll state ---------------- */
  var navbar = document.getElementById('mainNavbar');
  function handleNavbarScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  handleNavbarScroll();
  window.addEventListener('scroll', handleNavbarScroll);

  /* ---------------- Collapse mobile menu on link click ---------------- */
  var navLinks = document.querySelectorAll('.nav-link-custom');
  var collapseEl = document.getElementById('navbarContent');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (collapseEl && collapseEl.classList.contains('show') && window.bootstrap) {
        var bsCollapse = window.bootstrap.Collapse.getInstance(collapseEl) ||
          new window.bootstrap.Collapse(collapseEl);
        bsCollapse.hide();
      }
    });
  });

  /* ---------------- Scroll progress bar ---------------- */
  var progressBar = document.getElementById('scroll-progress');
  function updateProgress() {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateProgress);
  updateProgress();

  /* ---------------- Active section highlighting ---------------- */
  var sections = document.querySelectorAll('section[id]');
  function highlightNav() {
    var scrollPos = window.scrollY + 140;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');
      var link = document.querySelector('.nav-link-custom[href="#' + id + '"]');
      if (!link) return;
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (l) { l.classList.remove('active'); });
        link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', highlightNav);
  highlightNav();

  /* ---------------- Back to top ---------------- */
  var backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 480) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------------- Skill bar fill on scroll into view ---------------- */
  var skillBars = document.querySelectorAll('.skill-bar-fill');
  var skillObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        el.style.width = el.getAttribute('data-percent') + '%';
        skillObserver.unobserve(el);
      }
    });
  }, { threshold: 0.4 });
  skillBars.forEach(function (bar) { skillObserver.observe(bar); });

  /* ---------------- Hero parallax blobs ---------------- */
  var blobs = document.querySelectorAll('.parallax-layer');
  window.addEventListener('scroll', function () {
    var scrolled = window.scrollY;
    blobs.forEach(function (blob, i) {
      var speed = 0.15 + i * 0.08;
      blob.style.transform = 'translateY(' + (scrolled * speed) + 'px)';
    });
  });

  /* ---------------- Contact form (static demo submission) ---------------- */
  const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("form-status");

if (contactForm) {

    contactForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.classList.add("was-validated");
            return;
        }

        contactForm.classList.add("was-validated");

        const submitBtn = contactForm.querySelector("button[type='submit']");
        const originalHTML = submitBtn.innerHTML;

        submitBtn.disabled = true;
        submitBtn.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

        formStatus.innerHTML = "";

        try {

            const formData = new FormData(contactForm);

            const response = await fetch(
                "https://api.web3forms.com/submit",
                {
                    method: "POST",
                    body: formData
                }
            );

            const result = await response.json();

            if (result.success) {

                formStatus.innerHTML =
                    "<span style='color:#22c55e;'>✅ Message sent successfully.</span>";

                contactForm.reset();
                contactForm.classList.remove("was-validated");

            } else {

                formStatus.innerHTML =
                    "<span style='color:#ef4444;'>❌ " +
                    result.message +
                    "</span>";
            }

        } catch (error) {

            formStatus.innerHTML =
                "<span style='color:#ef4444;'>❌ Failed to send message.</span>";

            console.error(error);

        } finally {

            submitBtn.disabled = false;
            submitBtn.innerHTML = originalHTML;

        }

    });

}

  /* ---------------- Current year in footer ---------------- */
  var yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

});
