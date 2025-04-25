var menuicon = document.getElementById("menuicon");
var sidenav = document.getElementById("sidenav");

menuicon.addEventListener("click", function() {
    sidenav.classList.toggle("active");
});

// Try to get promo and close elements, but don't throw an error if they don't exist
var promo = document.getElementById("promo");
var close = document.getElementById("close");
if (promo && close) {
    close.addEventListener("click", function() {
        promo.style.display = "none";
    });
}

// Banner Slider Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, initializing slider");

    // Slider variables
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.getElementById('prev-slide');
    const nextButton = document.getElementById('next-slide');
    const indicators = document.querySelectorAll('.slide-indicator');
    let currentSlide = 0;
    const totalSlides = slides.length;

    console.log("Found " + totalSlides + " slides");

    // Function to show a specific slide
    function showSlide(index) {
        console.log("Showing slide " + index);

        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.classList.add('hidden');
        });

        // Show the selected slide
        slides[index].classList.remove('hidden');
        slides[index].classList.add('active');

        // Update indicators
        indicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.classList.add('active');
                indicator.classList.remove('opacity-40');
                indicator.classList.add('opacity-70');
            } else {
                indicator.classList.remove('active');
                indicator.classList.remove('opacity-70');
                indicator.classList.add('opacity-40');
            }
        });

        // Update current slide index
        currentSlide = index;
    }

    // Function to show next slide
    function nextSlide() {
        console.log("Next slide clicked");
        let newIndex = currentSlide + 1;
        if (newIndex >= totalSlides) {
            newIndex = 0; // Loop back to first slide
        }
        showSlide(newIndex);
    }

    // Function to show previous slide
    function prevSlide() {
        console.log("Previous slide clicked");
        let newIndex = currentSlide - 1;
        if (newIndex < 0) {
            newIndex = totalSlides - 1; // Loop to last slide
        }
        showSlide(newIndex);
    }

    // Add event listeners to navigation buttons
    if (prevButton && nextButton) {
        console.log("Adding event listeners to navigation buttons");
        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);
    } else {
        console.warn("Navigation buttons not found");
    }

    // Add event listeners to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            console.log("Indicator " + index + " clicked");
            showSlide(index);
        });
    });

    // Auto-advance slides every 5 seconds
    const autoSlideInterval = setInterval(nextSlide, 5000);

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');

    // Add click event listener to each navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Prevent default anchor behavior
            e.preventDefault();

            // Get the target section id from the href attribute
            const targetId = this.getAttribute('href');

            // Get the target section element
            const targetSection = document.querySelector(targetId);

            // If the target section exists, scroll to it smoothly
            if (targetSection) {
                // Close mobile menu if it's open
                if (sidenav && sidenav.classList.contains('active')) {
                    sidenav.classList.remove('active');
                }

                // Scroll to the target section with smooth behavior
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Update URL hash without causing a jump
                history.pushState(null, null, targetId);
            }
        });
    });
});