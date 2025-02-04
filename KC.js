const nav = document.querySelector('#header nav')
const toggle = document.querySelectorAll('nav .toggle')

for (const element of toggle) {
  element.addEventListener('click', function () {
    nav.classList.toggle('show')
  })
}

const links = document.querySelectorAll('nav ul li a')

for (const link of links) {
  link.addEventListener('click', function () {
    nav.classList.remove('show')
  })
}

const header = document.querySelector('#header')
const navHeight = header.offsetHeight

function changeHeaderWhenScroll() {
  if (window.scrollY >= navHeight) {
    header.classList.add('scroll')
  } else {
   
    header.classList.remove('scroll')
  }
}


const scrollReveal = ScrollReveal({
  origin: 'top',
  distance: '30px',
  duration: 700,
  reset: true
})

scrollReveal.reveal(
  `#home .image, #home .text,
  #about .image, #about .text,
  #services header, #services .card,
  #testimonials header, #testimonials .testimonials
  #contact .text, #contact .links,
  footer .brand, footer .social
  `,
  { interval: 100 }
)


const backToTopButton = document.querySelector('.back-to-top')

function backToTop() {
  if (window.scrollY >= 560) {
    backToTopButton.classList.add('show')
  } else {
    backToTopButton.classList.remove('show')
  }
}

const sections = document.querySelectorAll('main section[id]')
function activateMenuAtCurrentSection() {
  const checkpoint = window.pageYOffset + (window.innerHeight / 8) * 4

  for (const section of sections) {
    const sectionTop = section.offsetTop
    const sectionHeight = section.offsetHeight
    const sectionId = section.getAttribute('id')

    const checkpointStart = checkpoint >= sectionTop
    const checkpointEnd = checkpoint <= sectionTop + sectionHeight

    if (checkpointStart && checkpointEnd) {
      document
        .querySelector('nav ul li a[href*=' + sectionId + ']')
        .classList.add('active')
    } else {
      document
        .querySelector('nav ul li a[href*=' + sectionId + ']')
        .classList.remove('active')
    }
  }
}

window.addEventListener('scroll', function () {
  changeHeaderWhenScroll()
  backToTop()
  activateMenuAtCurrentSection()
})
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

window.addEventListener('scroll', debounce(backToTop, 100));
const slides = [
  {
    img: "images/img-3.jpg",
    text: "<strong>Chic Leopard Print & Gold Accents</strong><br>Turn heads with this stunning nude and leopard print nail design. Featuring elegant gold accents and delicate embellishments, this look is perfect for anyone wanting a bold yet sophisticated manicure! ✨💅"
  },
  { 
    img: "images/img-4.jpg", 
    text: "<strong>Elegant Red French Tips with a Festive Twist</strong><br>This stunning nail design features a classic nude base with bold red French tips, adding a touch of sophistication. The accent nails are adorned with delicate ribbon-style designs, perfect for a festive or chic everyday look. Ideal for those who love a stylish yet classy manicure! 💅✨" 
  },
  { 
    img: "images/img-6.jpg",
    text: "<strong>Stylish Brown Knotless Braids 🌟</strong><br>Add a bold yet elegant touch to your look with our neatly parted brown knotless braids. Designed for comfort and versatility, this lightweight protective style is perfect for everyday wear or special occasions. Elevate your beauty with a flawless finish book your appointment today! 💁🏾‍♀️✨" 
  },
  {
    img: "images/img-7.jpg",
    text: "<strong>Elegant Abstract Nail Art 💅✨</strong><br>Upgrade your nail game with this stunning abstract design featuring soft nude and metallic accents. Perfect for a classy, modern look that complements any outfit. Whether for a special occasion or everyday glam, our expert nail artists will bring your vision to life. Book your nail appointment today! 💖🌸" 
  },
  { 
    img: "images/img-8.jpg",
    text: "<strong>Floral Elegance with a Modern Twist 🌸✨</strong>Show off your unique style with our chic floral nail art and sleek French tips 💅! Whether you're seeking bold creativity or timeless elegance, we deliver picture-perfect results. Your hands deserve this level of beauty and care! 🌟" 
  }
];

let currentIndex = 0;

function updateSlide() {
  const slider = document.getElementById("slider");
  slider.style.opacity = 0;
  setTimeout(() => {
    document.getElementById("slide-image").src = slides[currentIndex].img;
    document.getElementById("slide-text").innerHTML = slides[currentIndex].text;
    slider.style.opacity = 1;
  }, 500);
}

function prevSlide() {
  currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
  updateSlide();
}

function nextSlide() {
  currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
  updateSlide();
}
let autoSlideInterval;

function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    nextSlide();
  }, 5000); // Change slide every 5 seconds
}

function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Start auto-slide when the page loads
startAutoSlide();

// Pause auto-slide when the user interacts with the slider
const sliderContainer = document.querySelector('.slider-container');
sliderContainer.addEventListener('mouseenter', stopAutoSlide);
sliderContainer.addEventListener('mouseleave', startAutoSlide);