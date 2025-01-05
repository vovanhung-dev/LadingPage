/*
Template Name: Appexy - Tailwind CSS Landing Page Template
Version: 1.0
Author: coderthemes
Email: support@coderthemes.com
File: js file
*/

// Sticky Navbar
function windowScroll() {
    const navbar = document.getElementById("navbar-sticky");
    if (navbar) {
        if (document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50) {
            navbar.classList.add("nav-sticky");

        } else {
            navbar.classList.remove("nav-sticky");
        }
    }
}
window.addEventListener("scroll", (ev) => {
    ev.preventDefault();
    windowScroll();
});

// Back To Top Start   
window.onscroll = function () {
    scrollFunction();
};

function scrollFunction() {
    var mybutton = document.getElementById("back-to-top");
    if (mybutton != null) {
        if (document.body.scrollTop > 500 || document.documentElement.scrollTop > 500) {
            mybutton.classList.add("opacity-100");
            mybutton.classList.remove("opacity-0");
        } else {
            mybutton.classList.add("opacity-0");
            mybutton.classList.remove("opacity-100");
        }
    }
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// #testimonial_1
function testimonial_1() {
    new Swiper(".hero-6-swiper", {
        spaceBetween: 30,
        effect: "fade",
        loop: true,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            320: {
                slidesPerView: 1,
            },
        },
    });
};
testimonial_1();

function index2() {
    
    new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 10,
        centeredSlides: true,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            dynamicBullets: true,
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        breakpoints: {
            0: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              576: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3.5,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4.2,
                spaceBetween: 20,
              },
        },
    });
    
};

index2();

// Navbar Active Class
var spy = new Gumshoe('#navbar-navlist a', {
    // Active classes
    // navClass: 'active', // applied to the nav list item
    // contentClass: 'active', // applied to the content
    offset: 80
});




// counter
const counter = document.querySelectorAll('.counter_value');
const speed = 250; // The lower the slower

counter.forEach(counter_value => {
    const updateCount = () => {
        const target = +counter_value.getAttribute('data-target');
		const count = +counter_value.innerText;
        
		// Lower inc to slow and higher to slow
		const inc = target / speed;
        
		// console.log('inc:',inc);
		// console.log('count:',count);

		// Check if target is reached
		if (count < target) {
            // Add inc to count and output in counter_value
			counter_value.innerText = (count + inc).toFixed(0);
			// Call function every ms
			setTimeout(updateCount, 1);
		} else {
            counter_value.innerText = target;
		}
	};
    
	updateCount();
});