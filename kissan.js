document.addEventListener("DOMContentLoaded", function() {

    // =====================
    // 1. SMOOTH SCROLL NAVIGATION
    // =====================
    // Target all internal anchor links in the nav and the hero button
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return; // Skip links pointing to the top of the page

            e.preventDefault();
            const targetID = href.substring(1);
            const targetSection = document.getElementById(targetID);
            
            if (targetSection) {
                // Adjust headerOffset to account for the sticky header height
                const headerOffset = 100; 
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({ top: offsetPosition, behavior: "smooth" });
            }
        });
    });

    // =====================
    // 2. MODAL LOGIC (Login/Signup)
    // =====================
    const loginBtn = document.getElementById('loginBtn');
    const signupBtn = document.getElementById('signupBtn');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    
    // Close and Switch Buttons
    const loginClose = document.getElementById('loginClose');
    const signupClose = document.getElementById('signupClose');
    const switchToSignup = document.getElementById('switchToSignup');
    const switchToLogin = document.getElementById('switchToLogin');
    
    // Open Modals
    if (loginBtn) loginBtn.addEventListener('click', () => loginModal.style.display = 'flex');
    if (signupBtn) signupBtn.addEventListener('click', () => signupModal.style.display = 'flex');

    // Close Modals
    if (loginClose) loginClose.addEventListener('click', () => loginModal.style.display = 'none');
    if (signupClose) signupClose.addEventListener('click', () => signupModal.style.display = 'none');

    // Close Modals on outside click
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) loginModal.style.display = 'none';
        if (e.target === signupModal) signupModal.style.display = 'none';
    });
    
    // Switch between Login and Signup modals
    if (switchToSignup) {
        switchToSignup.addEventListener('click', (e) => {
            e.preventDefault();
            if (loginModal) loginModal.style.display = 'none';
            if (signupModal) signupModal.style.display = 'flex';
        });
    }
    
    if (switchToLogin) {
        switchToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            if (signupModal) signupModal.style.display = 'none';
            if (loginModal) loginModal.style.display = 'flex';
        });
    }

    // Modal Form Submission (Example only)
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            alert(`Login Attempt:\nEmail: ${email}`);
            loginModal.style.display = 'none';
            loginForm.reset(); 
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            alert(`Signup Attempt:\nName: ${name}\nEmail: ${email}`);
            signupModal.style.display = 'none';
            signupForm.reset(); 
        });
    }


    // =====================
    // 3. PRODUCT FILTERING LOGIC
    // =====================
    const categoryButtons = document.querySelectorAll('.category-btn');
    const productCards = document.querySelectorAll('.product-card');

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active class
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Filter cards
            productCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || category === cardCategory) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // =====================
    // 4. IMAGE SLIDER LOGIC
    // =====================
    const sliderContainer = document.querySelector('.slider-container');
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.slider-arrow.prev');
    const nextButton = document.querySelector('.slider-arrow.next');
    const controlsContainer = document.querySelector('.slider-controls');
    let currentIndex = 0;
    const totalSlides = slides.length;
    
    // Function to update the slider position
    function updateSlider() {
        if (slides.length === 0) return;
        // Get the width of one slide to calculate the translation distance
        const slideWidth = slides[0].clientWidth; 
        slider.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
        updateDots();
    }
    
    // Function to update/create dots
    function updateDots() {
        if (controlsContainer) {
            controlsContainer.innerHTML = '';
            
            slides.forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('slider-dot');
                if (index === currentIndex) {
                    dot.classList.add('active');
                }
                dot.addEventListener('click', () => {
                    currentIndex = index;
                    updateSlider();
                });
                controlsContainer.appendChild(dot);
            });
        }
    }

    // Navigation handlers
    if (prevButton) {
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalSlides - 1;
            updateSlider();
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex < totalSlides - 1) ? currentIndex + 1 : 0;
            updateSlider();
        });
    }

    // Recalculate slider position on window resize
    window.addEventListener('resize', updateSlider);

    // Initial setup
    updateSlider(); 
    
    // Autoplay functionality
    let slideInterval = setInterval(() => {
        currentIndex = (currentIndex < totalSlides - 1) ? currentIndex + 1 : 0;
        updateSlider();
    }, 5000); // Auto-slide every 5 seconds

    // Pause autoplay on hover
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
        sliderContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(() => {
                currentIndex = (currentIndex < totalSlides - 1) ? currentIndex + 1 : 0;
                updateSlider();
            }, 5000);
        });
    }
});