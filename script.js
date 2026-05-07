// Smooth section reveal on scroll
const sections = document.querySelectorAll('.section');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.18 }
);

sections.forEach(sec => observer.observe(sec));

// Simple auto product slider
const track = document.querySelector('.slider-track');
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.slider-dots');

if (track && slides.length) {
  let index = 0;

  // create dots
  slides.forEach((_, i) => {
    const btn = document.createElement('button');
    if (i === 0) btn.classList.add('active');
    btn.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(btn);
  });

  const dots = dotsContainer.querySelectorAll('button');

  function goToSlide(i) {
    index = i;
    const offset = -i * (slides[0].offsetWidth + 16);
    track.style.transform = `translateX(${offset}px)`;
    dots.forEach(d => d.classList.remove('active'));
    dots[i].classList.add('active');
  }

  function autoSlide() {
    index = (index + 1) % slides.length;
    goToSlide(index);
  }

  let sliderTimer = setInterval(autoSlide, 3000);

  // pause on hover
  track.addEventListener('mouseenter', () => clearInterval(sliderTimer));
  track.addEventListener('mouseleave', () => {
    sliderTimer = setInterval(autoSlide, 3000);
  });

  window.addEventListener('resize', () => goToSlide(index));
}
