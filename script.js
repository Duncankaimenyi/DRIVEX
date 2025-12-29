
        // ===== INITIAL DATA =====
        const cars = [
            { id: 1, name: "Mercedes-Benz E-Class", category: "luxury", price: 120, seats: 5, transmission: "Automatic", luggage: 3, image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
            { id: 2, name: "BMW X5", category: "suv", price: 140, seats: 7, transmission: "Automatic", luggage: 4, image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
            { id: 3, name: "Porsche 911", category: "sports", price: 250, seats: 4, transmission: "Automatic", luggage: 2, image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
            { id: 4, name: "Toyota Alphard", category: "suv", price: 90, seats: 7, transmission: "Automatic", luggage: 5, image: "https://images.unsplash.com/photo-1563720223485-8d6d5c5c8b1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
            { id: 5, name: "Tesla Model S", category: "luxury", price: 160, seats: 5, transmission: "Automatic", luggage: 3, image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
            { id: 6, name: "Honda Civic", category: "sedan", price: 45, seats: 5, transmission: "Automatic", luggage: 3, image: "https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
            { id: 7, name: "Range Rover Velar", category: "suv", price: 180, seats: 5, transmission: "Automatic", luggage: 4, image: "https://images.unsplash.com/photo-1507136566006-cfc505b114fc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
            { id: 8, name: "Audi A6", category: "sedan", price: 110, seats: 5, transmission: "Automatic", luggage: 3, image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" },
        ];

        let selectedCar = null;
        let currentBookingStep = 1;

        // ===== DOM ELEMENTS =====
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navMenu = document.getElementById('navMenu');
        const header = document.getElementById('header');
        const loginBtn = document.getElementById('loginBtn');
        const bookNowBtn = document.getElementById('bookNowBtn');
        const exploreCarsBtn = document.getElementById('exploreCarsBtn');
        const howItWorksBtn = document.getElementById('howItWorksBtn');
        const ctaBookBtn = document.getElementById('ctaBookBtn');
        const loadMoreCarsBtn = document.getElementById('loadMoreCars');
        
        const loginModal = document.getElementById('loginModal');
        const bookingModal = document.getElementById('bookingModal');
        const successModal = document.getElementById('successModal');
        
        const closeLoginModal = document.getElementById('closeLoginModal');
        const closeBookingModal = document.getElementById('closeBookingModal');
        const closeSuccessModal = document.getElementById('closeSuccessModal');
        const cancelBooking = document.getElementById('cancelBooking');
        
        const carsGrid = document.getElementById('carsGrid');
        const carFilter = document.getElementById('carFilter');
        const carSelectionGrid = document.getElementById('carSelectionGrid');
        
        const quickBookingForm = document.getElementById('quickBookingForm');
        const bookingDetailsForm = document.getElementById('bookingDetailsForm');
        const paymentForm = document.getElementById('paymentForm');
        
        const nextStep1 = document.getElementById('nextStep1');
        const nextStep2 = document.getElementById('nextStep2');
        const nextStep3 = document.getElementById('nextStep3');
        const prevStep2 = document.getElementById('prevStep2');
        const prevStep3 = document.getElementById('prevStep3');
        const prevStep4 = document.getElementById('prevStep4');
        const confirmBookingBtn = document.getElementById('confirmBooking');

        // ===== INITIALIZATION =====
        document.addEventListener('DOMContentLoaded', function() {
            // Load initial data
            renderCars(cars);
            renderCarsForBooking(cars);
            setupEventListeners();
            setupDateInputs();
            setupTestimonialSlider();
            
            // Show animations
            setTimeout(() => {
                document.querySelectorAll('.animate-fade, .animate-left, .animate-right').forEach(el => {
                    el.style.opacity = '1';
                    el.style.transform = 'translate(0)';
                });
            }, 100);
            
            console.log('DriveX Car Rental loaded successfully!');
        });

        // ===== SETUP FUNCTIONS =====
        function setupEventListeners() {
            // Mobile menu
            mobileMenuBtn.addEventListener('click', toggleMobileMenu);
            document.addEventListener('click', closeMobileMenuOnClickOutside);
            
            // Header scroll effect
            window.addEventListener('scroll', handleHeaderScroll);
            
            // Navigation
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', handleNavClick);
            });
            
            // Modal controls
            loginBtn.addEventListener('click', () => showModal(loginModal));
            bookNowBtn.addEventListener('click', () => showModal(bookingModal));
            exploreCarsBtn.addEventListener('click', () => scrollToSection('cars'));
            howItWorksBtn.addEventListener('click', showHowItWorks);
            ctaBookBtn.addEventListener('click', () => showModal(bookingModal));
            
            // Close modals
            closeLoginModal.addEventListener('click', () => hideModal(loginModal));
            closeBookingModal.addEventListener('click', () => hideModal(bookingModal));
            closeSuccessModal.addEventListener('click', () => hideModal(successModal));
            cancelBooking.addEventListener('click', () => hideModal(bookingModal));
            
            // Modal backdrop click
            [loginModal, bookingModal, successModal].forEach(modal => {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) hideModal(modal);
                });
            });
            
            // Car filtering
            carFilter.addEventListener('click', handleCarFilter);
            
            // Quick booking form
            quickBookingForm.addEventListener('submit', handleQuickBooking);
            
            // Booking steps navigation
            nextStep1.addEventListener('click', () => goToBookingStep(2));
            nextStep2.addEventListener('click', () => goToBookingStep(3));
            nextStep3.addEventListener('click', () => goToBookingStep(4));
            prevStep2.addEventListener('click', () => goToBookingStep(1));
            prevStep3.addEventListener('click', () => goToBookingStep(2));
            prevStep4.addEventListener('click', () => goToBookingStep(3));
            
            // Car selection
            document.addEventListener('click', handleCarSelection);
            
            // Payment method change
            const paymentMethod = document.getElementById('paymentMethod');
            if (paymentMethod) {
                paymentMethod.addEventListener('change', handlePaymentMethodChange);
            }
            
            // Confirm booking
            confirmBookingBtn.addEventListener('click', handleBookingConfirmation);
            
            // Load more cars
            if (loadMoreCarsBtn) {
                loadMoreCarsBtn.addEventListener('click', handleLoadMoreCars);
            }
            
            // Auth tabs
            document.querySelectorAll('.auth-tab').forEach(tab => {
                tab.addEventListener('click', handleAuthTabClick);
            });
            
            // Show register/login
            const showRegister = document.getElementById('showRegister');
            const showLogin = document.getElementById('showLogin');
            if (showRegister) showRegister.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelector('.auth-tab[data-tab="register"]').click();
            });
            if (showLogin) showLogin.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelector('.auth-tab[data-tab="login"]').click();
            });
            
            // Form submissions
            const loginForm = document.getElementById('loginForm');
            const registerForm = document.getElementById('registerForm');
            
            if (loginForm) {
                loginForm.addEventListener('submit', handleLogin);
            }
            
            if (registerForm) {
                registerForm.addEventListener('submit', handleRegister);
            }
        }

        function setupDateInputs() {
            const today = new Date().toISOString().split('T')[0];
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const tomorrowStr = tomorrow.toISOString().split('T')[0];
            
            const pickupDate = document.getElementById('pickupDate');
            const returnDate = document.getElementById('returnDate');
            
            if (pickupDate) {
                pickupDate.min = today;
                pickupDate.value = today;
                pickupDate.addEventListener('change', updateReturnDateMin);
            }
            
            if (returnDate) {
                returnDate.min = tomorrowStr;
                returnDate.value = tomorrowStr;
            }
        }

        function setupTestimonialSlider() {
            const slides = document.querySelectorAll('.testimonial-slide');
            const dots = document.querySelectorAll('.slider-dot');
            let currentSlide = 0;
            
            function showSlide(index) {
                slides.forEach(slide => slide.classList.remove('active'));
                dots.forEach(dot => dot.classList.remove('active'));
                
                slides[index].classList.add('active');
                dots[index].classList.add('active');
            }
            
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    currentSlide = index;
                    showSlide(currentSlide);
                });
            });
            
            // Auto slide
            setInterval(() => {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            }, 5000);
        }

        // ===== RENDERING FUNCTIONS =====
        function renderCars(carsArray) {
            if (!carsGrid) return;
            
            carsGrid.innerHTML = carsArray.map(car => `
                <div class="car-card" data-category="${car.category}">
                    <div class="car-badge">${car.category.toUpperCase()}</div>
                    <div class="car-image">
                        <img src="${car.image}" alt="${car.name}" loading="lazy">
                    </div>
                    <div class="car-content">
                        <div class="car-header">
                            <h3 class="car-title">${car.name}</h3>
                            <div class="car-price">$${car.price}<span>/day</span></div>
                        </div>
                        <div class="car-meta">
                            <div class="car-meta-item">
                                <i class="fas fa-users"></i>
                                <span>${car.seats} seats</span>
                            </div>
                            <div class="car-meta-item">
                                <i class="fas fa-cog"></i>
                                <span>${car.transmission}</span>
                            </div>
                            <div class="car-meta-item">
                                <i class="fas fa-suitcase"></i>
                                <span>${car.luggage} bags</span>
                            </div>
                        </div>
                        <p style="color: var(--secondary); font-size: 14px; margin: 10px 0; line-height: 1.6;">
                            Premium ${car.category} with full features and insurance included.
                        </p>
                        <div class="car-footer">
                            <button class="btn btn-secondary btn-sm view-details-btn" data-car-id="${car.id}">
                                <i class="fas fa-info-circle"></i> Details
                            </button>
                            <button class="btn btn-primary btn-sm book-car-btn" data-car-id="${car.id}">
                                <i class="fas fa-calendar-check"></i> Book Now
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function renderCarsForBooking(carsArray) {
            if (!carSelectionGrid) return;
            
            carSelectionGrid.innerHTML = carsArray.map(car => `
                <div class="car-selection-item" data-car-id="${car.id}">
                    <div class="car-selection-image">
                        <img src="${car.image}" alt="${car.name}">
                    </div>
                    <div style="flex: 1;">
                        <h4 style="margin-bottom: 5px; color: var(--dark);">${car.name}</h4>
                        <div style="display: flex; gap: 15px; color: var(--secondary); font-size: 14px;">
                            <span><i class="fas fa-users"></i> ${car.seats} seats</span>
                            <span><i class="fas fa-cog"></i> ${car.transmission}</span>
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 20px; font-weight: 700; color: var(--primary); margin-bottom: 5px;">$${car.price}/day</div>
                        <button class="btn btn-primary btn-sm select-car-btn" data-car-id="${car.id}">
                            Select
                        </button>
                    </div>
                </div>
            `).join('');
        }

        // ===== EVENT HANDLERS =====
        function toggleMobileMenu() {
            navMenu.classList.toggle('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }

        function closeMobileMenuOnClickOutside(e) {
            if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }

        function handleHeaderScroll() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Update active nav link
            const sections = document.querySelectorAll('section[id]');
            const scrollY = window.pageYOffset;
            
            sections.forEach(section => {
                const sectionHeight = section.offsetHeight;
                const sectionTop = section.offsetTop - 100;
                const sectionId = section.getAttribute('id');
                const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                    if (navLink) navLink.classList.add('active');
                }
            });
        }

        function handleNavClick(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
            
            // Close mobile menu
            navMenu.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        }

        function showModal(modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
            
            // Reset booking modal
            if (modal === bookingModal) {
                goToBookingStep(1);
                selectedCar = null;
                document.querySelectorAll('.car-selection-item').forEach(item => {
                    item.classList.remove('selected');
                });
            }
        }

        function hideModal(modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }

        function handleCarFilter(e) {
            if (e.target.classList.contains('filter-btn')) {
                // Update active button
                document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                
                // Filter cars
                const filter = e.target.dataset.filter;
                if (filter === 'all') {
                    renderCars(cars);
                } else {
                    const filteredCars = cars.filter(car => car.category === filter);
                    renderCars(filteredCars);
                }
            }
        }

        function handleQuickBooking(e) {
            e.preventDefault();
            
            const pickupLocation = document.getElementById('pickupLocation').value;
            const pickupDate = document.getElementById('pickupDate').value;
            const returnDate = document.getElementById('returnDate').value;
            const carType = document.getElementById('carType').value;
            
            // Basic validation
            if (!pickupLocation || !pickupDate || !returnDate || !carType) {
                alert('Please fill in all fields');
                return;
            }
            
            // Show booking modal
            showModal(bookingModal);
            
            // Filter cars by type if selected
            if (carType && carType !== '') {
                const filteredCars = cars.filter(car => car.category === carType);
                renderCarsForBooking(filteredCars);
            }
        }

        function handleCarSelection(e) {
            // View car details
            if (e.target.classList.contains('view-details-btn') || e.target.closest('.view-details-btn')) {
                const btn = e.target.classList.contains('view-details-btn') ? e.target : e.target.closest('.view-details-btn');
                const carId = btn.dataset.carId;
                const car = cars.find(c => c.id == carId);
                
                if (car) {
                    alert(`${car.name}\n\n• Category: ${car.category}\n• Price: $${car.price}/day\n• Seats: ${car.seats}\n• Transmission: ${car.transmission}\n• Luggage: ${car.luggage} bags\n\nBook this premium vehicle for your next journey!`);
                }
            }
            
            // Book car from grid
            if (e.target.classList.contains('book-car-btn') || e.target.closest('.book-car-btn')) {
                const btn = e.target.classList.contains('book-car-btn') ? e.target : e.target.closest('.book-car-btn');
                const carId = btn.dataset.carId;
                const car = cars.find(c => c.id == carId);
                
                if (car) {
                    selectedCar = car;
                    showModal(bookingModal);
                }
            }
            
            // Select car in booking modal
            if (e.target.classList.contains('select-car-btn') || e.target.closest('.select-car-btn')) {
                const btn = e.target.classList.contains('select-car-btn') ? e.target : e.target.closest('.select-car-btn');
                const carId = btn.dataset.carId;
                const car = cars.find(c => c.id == carId);
                
                if (car) {
                    selectedCar = car;
                    
                    // Update UI
                    document.querySelectorAll('.car-selection-item').forEach(item => {
                        item.classList.remove('selected');
                    });
                    btn.closest('.car-selection-item').classList.add('selected');
                    
                    // Enable next button
                    nextStep1.disabled = false;
                }
            }
        }

        function goToBookingStep(step) {
            currentBookingStep = step;
            
            // Hide all steps
            document.querySelectorAll('.booking-step').forEach(stepEl => {
                stepEl.classList.remove('active');
            });
            
            // Show current step
            document.getElementById(`step${step}`).classList.add('active');
            
            // Update progress
            document.querySelectorAll('.progress-step').forEach(stepEl => {
                stepEl.classList.remove('active');
            });
            document.querySelector(`.progress-step[data-step="${step}"]`).classList.add('active');
            
            // Update data if needed
            if (step === 3) {
                updateTotalAmount();
            } else if (step === 4) {
                updateBookingSummary();
            }
        }

        function updateTotalAmount() {
            if (!selectedCar) return;
            
            const pickupDate = document.getElementById('pickupDate').value;
            const returnDate = document.getElementById('returnDate').value;
            
            if (pickupDate && returnDate) {
                const days = Math.ceil((new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24));
                const total = selectedCar.price * Math.max(days, 1);
                document.getElementById('totalAmount').value = `$${total.toFixed(2)}`;
            }
        }

        function updateBookingSummary() {
            if (!selectedCar) return;
            
            const name = document.querySelector('#bookingDetailsForm input[type="text"]')?.value || 'John Doe';
            const email = document.querySelector('#bookingDetailsForm input[type="email"]')?.value || 'john@example.com';
            const pickupDate = document.getElementById('pickupDate').value;
            const returnDate = document.getElementById('returnDate').value;
            
            if (pickupDate && returnDate) {
                const days = Math.ceil((new Date(returnDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24));
                const total = selectedCar.price * Math.max(days, 1);
                
                document.getElementById('bookingSummary').innerHTML = `
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                        <div style="font-weight: 600; color: var(--dark);">Car:</div>
                        <div>${selectedCar.name}</div>
                        
                        <div style="font-weight: 600; color: var(--dark);">Customer:</div>
                        <div>${name}</div>
                        
                        <div style="font-weight: 600; color: var(--dark);">Email:</div>
                        <div>${email}</div>
                        
                        <div style="font-weight: 600; color: var(--dark);">Pickup Date:</div>
                        <div>${formatDate(pickupDate)}</div>
                        
                        <div style="font-weight: 600; color: var(--dark);">Return Date:</div>
                        <div>${formatDate(returnDate)}</div>
                        
                        <div style="font-weight: 600; color: var(--dark);">Duration:</div>
                        <div>${Math.max(days, 1)} days</div>
                        
                        <div style="font-weight: 600; color: var(--dark);">Daily Rate:</div>
                        <div>$${selectedCar.price}/day</div>
                        
                        <div style="font-weight: 700; font-size: 18px; color: var(--primary);">Total Amount:</div>
                        <div style="font-weight: 700; font-size: 18px; color: var(--primary);">$${total.toFixed(2)}</div>
                    </div>
                `;
            }
        }

        function handlePaymentMethodChange() {
            const method = this.value;
            const cardDetails = document.getElementById('cardDetails');
            
            if (method === 'card') {
                cardDetails.style.display = 'block';
            } else {
                cardDetails.style.display = 'none';
            }
        }

        function handleBookingConfirmation() {
            // Check if terms are accepted
            const termsCheckbox = document.querySelector('#step4 input[type="checkbox"]');
            if (!termsCheckbox.checked) {
                alert('Please accept the Terms & Conditions to continue.');
                return;
            }
            
            // Show loading
            document.getElementById('loading').classList.remove('hidden');
            
            // Simulate API call
            setTimeout(() => {
                // Hide loading
                document.getElementById('loading').classList.add('hidden');
                
                // Generate booking ID
                const bookingId = 'DRIVEX-' + Math.floor(Math.random() * 1000000);
                document.getElementById('bookingId').textContent = `Booking ID: ${bookingId}`;
                
                // Show success modal
                hideModal(bookingModal);
                showModal(successModal);
                
                // Reset forms
                quickBookingForm.reset();
                bookingDetailsForm.reset();
                paymentForm.reset();
                selectedCar = null;
                setupDateInputs();
            }, 1500);
        }

        function handleLoadMoreCars() {
            // In a real app, this would load more cars from an API
            alert('Loading more premium cars...\n\nIn a production application, this would fetch additional vehicles from the server database.');
        }

        function handleAuthTabClick() {
            const tab = this.dataset.tab;
            
            // Update active tab
            document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding form
            document.querySelectorAll('.auth-form').forEach(form => form.classList.remove('active'));
            document.getElementById(`${tab}Form`).classList.add('active');
        }

        function handleLogin(e) {
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const password = this.querySelector('input[type="password"]').value;
            
            if (!email || !password) {
                alert('Please fill in all fields');
                return;
            }
            
            // Simulate login
            alert(`Welcome back! Successfully logged in with: ${email}`);
            hideModal(loginModal);
            this.reset();
        }

        function handleRegister(e) {
            e.preventDefault();
            
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const phone = this.querySelector('input[type="tel"]').value;
            const password = this.querySelector('input[type="password"]').value;
            const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;
            
            if (!name || !email || !phone || !password || !confirmPassword) {
                alert('Please fill in all fields');
                return;
            }
            
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            // Simulate registration
            alert(`Account created successfully!\n\nWelcome ${name}! Check your email (${email}) to verify your account.`);
            hideModal(loginModal);
            this.reset();
        }

        // ===== UTILITY FUNCTIONS =====
        function scrollToSection(sectionId) {
            const section = document.getElementById(sectionId);
            if (section) {
                window.scrollTo({
                    top: section.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }

        function showHowItWorks() {
            alert('How It Works:\n\n1. Choose your car from our premium collection\n2. Select dates and pickup location\n3. Complete booking in 3 easy steps\n4. Get your car delivered or pick it up\n5. Enjoy your ride!\n\nNeed help? Contact our 24/7 support.');
        }

        function updateReturnDateMin() {
            const pickupDate = document.getElementById('pickupDate').value;
            const returnDate = document.getElementById('returnDate');
            
            if (pickupDate && returnDate) {
                const minDate = new Date(pickupDate);
                minDate.setDate(minDate.getDate() + 1);
                returnDate.min = minDate.toISOString().split('T')[0];
                
                if (new Date(returnDate.value) < minDate) {
                    returnDate.value = minDate.toISOString().split('T')[0];
                }
            }
        }

        function formatDate(dateString) {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        }
    