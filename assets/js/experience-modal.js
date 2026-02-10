/**
 * Open experience detail modal when a project/experience card is clicked.
 * Injects the corresponding hidden content (company, what I did, why I liked it, skills) into the modal.
 */
(function () {
  var modal = document.getElementById('experience-modal');
  var bodyEl = document.getElementById('experience-modal-body');
  var backdrop = modal && modal.querySelector('.experience-modal-backdrop');
  var closeBtn = modal && modal.querySelector('.experience-modal-close');

  function openExperience(experienceId) {
    var content = document.getElementById(experienceId);
    if (!bodyEl || !content) return;
    bodyEl.innerHTML = content.innerHTML;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }

  function closeExperience() {
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function onKeydown(e) {
    if (!modal || !modal.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeExperience();
  }

  document.querySelectorAll('.experience-card').forEach(function (card) {
    card.addEventListener('click', function () {
      var id = card.getAttribute('data-experience');
      if (id) openExperience(id);
    });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        var id = card.getAttribute('data-experience');
        if (id) openExperience(id);
      }
    });
  });

  if (backdrop) backdrop.addEventListener('click', closeExperience);
  if (closeBtn) closeBtn.addEventListener('click', closeExperience);
  document.addEventListener('keydown', onKeydown);
})();
