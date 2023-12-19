'use strict';

// loading will be end when document or page is loaded

const preloaded = document.querySelector('[data-preaload]');

window.addEventListener('load', ()=> {
    preloaded.classList.add('loaded');
    document.body.classList.add('loaded');
})


// Add event listner on all multiple elements

const addEventOnElements = function (elements, eventType, callback) {
    for (let i = 0, len = elements.length; i < len; i++) {
       elements[i].addEventListener(eventType, callback);        
    }
}

const navbar = document.querySelector('[data-navbar]');
const navbarTogglers = document.querySelectorAll('[data-nav-toggler]');
const overlay = document.querySelector('[data-overlay]');

const toggleNavbar = ()=>{
    navbar.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('active');
}

addEventOnElements(navbarTogglers, 'click', toggleNavbar);

// Header and Back to btn

const header = document.querySelector('[data-header]');
const backTopBtn = document.querySelector('[data-back-top-btn]');

let lastScrollPos = 0;

const hideHeader = ()=> {
    const isScrollBottom = lastScrollPos < window.scrollY;
    if(isScrollBottom){
        header.classList.add('hide');
    }else {
        header.classList.remove('hide');
    }

    lastScrollPos = window.scrollY;
}

window.addEventListener('scroll', ()=>{
    if(window.scrollY >= 50){
        header.classList.add('active');
        backTopBtn.classList.add('active');
        hideHeader();
    }else{
        header.classList.remove('active');
        backTopBtn.classList.remove('active');
    }
})


// HERO SLIDER 

const heroSlider = document.querySelector('[data-hero-slider]');
const heroSliderItems = document.querySelectorAll('[data-hero-slider-item]'); // Note the use of querySelectorAll
const heroSliderPrevBtn = document.querySelector('[data-prev-btn]');
const heroSliderNextBtn = document.querySelector('[data-next-btn]');

let currentSliderPos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () { // Fixed the typo here
    lastActiveSliderItem.classList.remove('active');
    heroSliderItems[currentSliderPos].classList.add('active');
    lastActiveSliderItem = heroSliderItems[currentSliderPos];
}

const slideNext = function () {
    if (currentSliderPos >= heroSliderItems.length - 1) {
        currentSliderPos = 0;
    } else {
        currentSliderPos++;
    }

    updateSliderPos();
}

heroSliderNextBtn.addEventListener('click', slideNext);

const slidePrev = function () {
    if (currentSliderPos <= 0) {
        currentSliderPos = heroSliderItems.length - 1;
    } else {
        currentSliderPos--;
    }

    updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

// Auto slides

let autoSlideInterval;

const autoSlide = function () {
    autoSlideInterval = setInterval(() => {
        slideNext();
    }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
    clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);


// parallax

const parallaxItems = document.querySelectorAll('[data-parallax-item]');

document.addEventListener('mousemove', (event) => {
    const mouseX = (event.clientX / window.innerWidth - 0.5) * 30;
    const mouseY = (event.clientY / window.innerHeight - 0.5) * 30;

    parallaxItems.forEach((item) => {
        const speed = Number(item.dataset.parallaxSpeed) || 1;
        const itemX = mouseX * speed;
        const itemY = mouseY * speed;

        item.style.transform = `translate(${itemX}px, ${itemY}px)`;
    });
});

