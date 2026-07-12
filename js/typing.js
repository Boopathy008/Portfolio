/* =============================================================
   TYPED.JS — Hero role animation
   ============================================================= */
document.addEventListener('DOMContentLoaded', function () {
  var typedEl = document.getElementById('typed-role');
  if (!typedEl || typeof Typed === 'undefined') return;

  new Typed('#typed-role', {
    strings: [
      'Java Full Stack Developer',
      'Spring Boot Developer',
      'Backend Developer',
      'REST API Developer',
      'AI Application Developer'
    ],
    typeSpeed: 55,
    backSpeed: 30,
    backDelay: 1400,
    startDelay: 300,
    loop: true,
    smartBackspace: true,
    cursorChar: '|'
  });
});
