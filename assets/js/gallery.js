/**
 * Interest galleries: open modal on Baking / Travel / Music click, slide through images.
 * Baking has 4 slides; Travel and Music show placeholder for now.
 */
(function () {
  var modal = document.getElementById('gallery-modal');
  var backdrop = modal && modal.querySelector('.gallery-modal-backdrop');
  var closeBtn = modal && modal.querySelector('.gallery-close');
  var slidesContainer = document.getElementById('gallery-slides');
  var titleEl = document.getElementById('gallery-title');
  var counterEl = document.getElementById('gallery-counter');
  var dotsEl = document.getElementById('gallery-dots');
  var prevBtn = modal && modal.querySelector('.gallery-prev');
  var nextBtn = modal && modal.querySelector('.gallery-next');

  var currentIndex = 0;
  var slides = [];
  var dots = [];

  function getSlides() {
    return slidesContainer ? Array.from(slidesContainer.querySelectorAll('.gallery-slide')) : [];
  }

  var comingSoonEl = document.getElementById('gallery-coming-soon');
  var controlsEl = modal && modal.querySelector('.gallery-controls');
  var dotsWrap = modal && modal.querySelector('.gallery-dots');

  function openModal(galleryName) {
    if (!modal) return;
    if (galleryName === 'travel' || galleryName === 'music') {
      if (titleEl) titleEl.textContent = galleryName.charAt(0).toUpperCase() + galleryName.slice(1);
      if (comingSoonEl) comingSoonEl.style.display = 'block';
      if (slidesContainer) slidesContainer.style.display = 'none';
      if (controlsEl) controlsEl.style.display = 'none';
      if (dotsWrap) dotsWrap.style.display = 'none';
    } else {
      if (titleEl) titleEl.textContent = 'Baking';
      if (comingSoonEl) comingSoonEl.style.display = 'none';
      if (slidesContainer) slidesContainer.style.display = '';
      if (controlsEl) controlsEl.style.display = 'flex';
      if (dotsWrap) dotsWrap.style.display = 'flex';
      slides = getSlides();
      currentIndex = 0;
      updateSlide();
      renderDots();
    }
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function setSlide(index) {
    var n = slides.length;
    if (n === 0) return;
    currentIndex = ((index % n) + n) % n;
    updateSlide();
    if (counterEl) counterEl.textContent = (currentIndex + 1) + ' / ' + n;
    dots.forEach(function (d, i) {
      d.classList.toggle('is-active', i === currentIndex);
    });
  }

  function updateSlide() {
    slides.forEach(function (slide, i) {
      slide.setAttribute('data-active', i === currentIndex);
    });
    if (counterEl && slides.length) counterEl.textContent = (currentIndex + 1) + ' / ' + slides.length;
  }

  function renderDots() {
    if (!dotsEl) return;
    dotsEl.innerHTML = '';
    dots = [];
    for (var i = 0; i < slides.length; i++) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'gallery-dot' + (i === 0 ? ' is-active' : '');
      btn.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      (function (idx) {
        btn.addEventListener('click', function () { setSlide(idx); });
      })(i);
      dotsEl.appendChild(btn);
      dots.push(btn);
    }
  }

  function onKeydown(e) {
    if (!modal || !modal.classList.contains('is-open')) return;
    if (e.key === 'Escape') {
      closeModal();
      return;
    }
    if (e.key === 'ArrowLeft') {
      setSlide(currentIndex - 1);
      return;
    }
    if (e.key === 'ArrowRight') {
      setSlide(currentIndex + 1);
      return;
    }
  }

  // Open gallery when clicking an interest button
  document.querySelectorAll('.interest-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openModal(btn.getAttribute('data-gallery'));
    });
  });

  if (backdrop) backdrop.addEventListener('click', closeModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (prevBtn) prevBtn.addEventListener('click', function () { setSlide(currentIndex - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { setSlide(currentIndex + 1); });
  document.addEventListener('keydown', onKeydown);
})();
