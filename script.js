(() => {
  const media = window.OPEN_SUMMIT_MEDIA || [];
  const image = document.getElementById('slide-image');
  const caption = document.getElementById('media-caption');
  const counter = document.getElementById('counter');
  const ticks = Array.from(document.querySelectorAll('.tick'));
  const arrows = Array.from(document.querySelectorAll('.nav-arrow'));
  const openButton = document.getElementById('open-lightbox');
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeButton = document.querySelector('.lightbox-close');
  const lightboxArrows = Array.from(document.querySelectorAll('.lightbox-arrow'));
  let index = 0;
  let lightboxOpen = false;

  function render() {
    const item = media[index];
    image.src = item.src;
    image.alt = `Conference slide: ${item.caption}`;
    caption.textContent = item.caption;
    counter.textContent = `${index + 1} / ${media.length}`;
    ticks.forEach((tick, tickIndex) => {
      const active = tickIndex === index;
      tick.classList.toggle('is-active', active);
      tick.setAttribute('aria-selected', String(active));
      tick.setAttribute('tabindex', active ? '0' : '-1');
    });
    if (lightboxOpen) renderLightbox();
  }

  function renderLightbox() {
    const item = media[index];
    lightboxImage.src = item.src;
    lightboxImage.alt = `Conference slide enlarged: ${item.caption}`;
    lightboxCaption.textContent = item.caption;
  }

  function go(nextIndex) {
    index = (nextIndex + media.length) % media.length;
    render();
  }

  function openLightbox() {
    lightboxOpen = true;
    renderLightbox();
    lightbox.hidden = false;
    document.body.classList.add('lightbox-active');
    closeButton.focus({ preventScroll: true });
  }

  function closeLightbox() {
    lightboxOpen = false;
    lightbox.hidden = true;
    document.body.classList.remove('lightbox-active');
    openButton.focus({ preventScroll: true });
  }

  arrows.forEach((button) => {
    button.addEventListener('click', () => go(index + (button.dataset.dir === 'next' ? 1 : -1)));
  });

  lightboxArrows.forEach((button) => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      go(index + (button.dataset.lightboxDir === 'next' ? 1 : -1));
    });
  });

  ticks.forEach((tick) => tick.addEventListener('click', () => go(Number(tick.dataset.slide))));
  openButton.addEventListener('click', openLightbox);
  closeButton.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') go(index + 1);
    if (event.key === 'ArrowLeft') go(index - 1);
    if (event.key === 'Escape' && lightboxOpen) closeLightbox();
  });

  render();
})();
