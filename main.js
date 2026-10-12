/**
 * MAIN JAVASCRIPT
 * Handles DOM manipulation, search logic, modals, and Paystack integration.
 */

document.addEventListener('DOMContentLoaded', () => { 



// --- Campus Services Banner Auto-Slider ---
const slides = document.querySelectorAll('.promo-slide');
if (slides.length > 0) {
    let currentSlide = 0;
    
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 4000); // Rotates every 4 seconds
}



    
    
// --- FAQ Accordion Logic ---
const faqQuestions = document.querySelectorAll('.faq-question');
if (faqQuestions.length > 0) {
    faqQuestions.forEach(button => {
        button.addEventListener('click', () => {
            const faqItem = button.parentElement;
            
            // Toggle active state on clicked item
            const isActive = faqItem.classList.contains('active');
            
            // Close all open FAQs
            document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
            
            // If it wasn't active before, open it
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });
}




    // --- Mobile Menu Toggle ---
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // --- Dynamic WhatsApp Link ---
    const whatsappBtn = document.getElementById('whatsappBtn');
    if (whatsappBtn) {
        // Use a placeholder number as requested.
        const supportNumber = "233549593971";
        const message = encodeURIComponent("Hello UCC Hostel Finder, I need help finding a hostel.");
        whatsappBtn.href = `https://wa.me/${supportNumber}?text=${message}`;
    }

    // --- Hostel Grid Logic (Only runs on hostels.html) ---
    const hostelGrid = document.getElementById('hostelGrid');
    
    if (hostelGrid) {
        const searchInput = document.getElementById('searchInput');
        const filterLocation = document.getElementById('filterLocation');
        const filterRoom = document.getElementById('filterRoom');
        const applyFiltersBtn = document.getElementById('applyFiltersBtn');
        const resetFiltersBtn = document.getElementById('resetFiltersBtn');
        const noResults = document.getElementById('noResults');

        // Check URL parameters for quick filters from homepage
        const urlParams = new URLSearchParams(window.location.search);
        const queryParam = urlParams.get('query');
        const locationParam = urlParams.get('location');

        if (queryParam) searchInput.value = queryParam;
        if (locationParam && [...filterLocation.options].some(opt => opt.value === locationParam)) {
            filterLocation.value = locationParam;
        }

        // Render Function
        function renderHostels(data) {
            hostelGrid.innerHTML = '';
            
            if (data.length === 0) {
                noResults.classList.remove('hidden');
                return;
            }
            noResults.classList.add('hidden');

            data.forEach(hostel => {
                const card = document.createElement('div');
                card.className = 'hostel-card';
                
                // Build Amenities HTML
                const amenitiesHTML = hostel.amenities.map(a => `<span class="amenity-tag">✓ ${a}</span>`).join('');

                card.innerHTML = `
                    <div class="hostel-img-wrapper">
                        <img src="${hostel.images[0]}" alt="${hostel.name}" loading="lazy">
                        <span class="badge">${hostel.availability}</span>
                    </div>
                    <div class="hostel-info">
                        <h3>${hostel.name}</h3>
                        <p class="hostel-location">📍 ${hostel.location}</p>
                        <p class="hostel-price">GH₵ ${hostel.price} / academic year</p>
                        <p class="text-sm">Room: ${hostel.roomType}</p>
                        <div class="amenities-list mt-2">
                            ${amenitiesHTML}
                        </div>
                        <div class="card-actions">
                            <button class="btn btn-accent view-room-btn" data-id="${hostel.id}">View Room</button>
                            <button class="btn btn-primary book-pay-btn" data-id="${hostel.id}">Book & Pay</button>
                        </div>
                    </div>
                `;
                hostelGrid.appendChild(card);
            });

            attachModalEvents();
        }







        

        // Filter Logic
        function applyFilters() {
            const searchTerm = searchInput.value.toLowerCase();
            const location = filterLocation.value;
            const roomType = filterRoom.value;

            const filteredData = hostels.filter(h => {
                const matchesSearch = h.name.toLowerCase().includes(searchTerm) || 
                                      h.location.toLowerCase().includes(searchTerm) ||
                                      h.amenities.some(a => a.toLowerCase().includes(searchTerm));
                const matchesLoc = location === 'All' || h.location === location;
                const matchesRoom = roomType === 'All' || h.roomType === roomType;

                return matchesSearch && matchesLoc && matchesRoom;
            });

            renderHostels(filteredData);
        }

        // Event Listeners for Filters
        searchInput.addEventListener('keyup', applyFilters);
        applyFiltersBtn.addEventListener('click', applyFilters);
        resetFiltersBtn.addEventListener('click', () => {
            searchInput.value = '';
            filterLocation.value = 'All';
            filterRoom.value = 'All';
            applyFilters();
        });

        // Initial Render
        applyFilters();
    }

    // --- Modals Logic ---
    const roomModal = document.getElementById('roomModal');
    const paymentModal = document.getElementById('paymentModal');
    let currentSelectedHostel = null;

    // Close Modals
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target === roomModal) roomModal.style.display = 'none';
        if (e.target === paymentModal) paymentModal.style.display = 'none';
    });

    function attachModalEvents() {
        // View Room
        document.querySelectorAll('.view-room-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                const hostel = hostels.find(h => h.id === id);
                if(hostel) openRoomModal(hostel);
            });
        });




        // Book & Pay
        document.querySelectorAll('.book-pay-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = parseInt(e.target.getAttribute('data-id'));
                const hostel = hostels.find(h => h.id === id);
                if(hostel) openPaymentModal(hostel);
            });
        });
    }

    function openRoomModal(hostel) {
        const body = document.getElementById('roomModalBody');
        
        const thumbsHTML = hostel.images.map((img, index) => 
            `<img src="${img}" class="gallery-thumb ${index===0?'active':''}" data-src="${img}" alt="Thumbnail">`
        ).join('');

        const amenitiesHTML = hostel.amenities.map(a => `<span class="amenity-tag">${a}</span>`).join('');

        body.innerHTML = `
            <h2>${hostel.name}</h2>
            <p class="hostel-location">📍 ${hostel.location}</p>
            
            <img src="${hostel.images[0]}" class="gallery-main" id="mainGalleryImg" alt="${hostel.name}">
            <div class="gallery-thumbs" id="galleryThumbs">${thumbsHTML}</div>
            
            <div style="margin: 20px 0;">
                <h4>Room Video</h4>
                <video controls width="100%" style="border-radius:8px; margin-top:10px;">
                    <source src="${hostel.video}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            </div>

            <div class="mt-2">
                <h3 class="hostel-price">GH₵ ${hostel.price} / academic year</h3>
                <p><strong>Room Type:</strong> ${hostel.roomType}</p>
                <p><strong>Status:</strong> ${hostel.availability}</p>
                <div class="amenities-list mt-2">${amenitiesHTML}</div>
                <p style="margin-top:15px;">${hostel.description}</p>
            </div>
            
            <button class="btn btn-primary w-100 mt-2" onclick="document.getElementById('roomModal').style.display='none'; document.querySelector('.book-pay-btn[data-id=\\'${hostel.id}\\']').click();">Book & Pay</button>
        `;

        roomModal.style.display = 'block';




        // Gallery logic
        document.querySelectorAll('.gallery-thumb').forEach(thumb => {
            thumb.addEventListener('click', function() {
                document.getElementById('mainGalleryImg').src = this.getAttribute('data-src');
                document.querySelectorAll('.gallery-thumb').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }


    

    // --- Payment Logic ---
    function openPaymentModal(hostel) {
        currentSelectedHostel = hostel;
        
        // Reset state
        document.getElementById('paymentSuccess').classList.add('hidden');
        document.getElementById('paymentForm').classList.remove('hidden');
        document.getElementById('paymentForm').reset();
        
        const summary = document.getElementById('paymentHostelSummary');
        summary.innerHTML = `
            <p><strong>Hostel:</strong> ${hostel.name}</p>
            <p><strong>Location:</strong> ${hostel.location}</p>
            <p><strong>Room:</strong> ${hostel.roomType}</p>
            <p><strong>Rent:</strong> GH₵ ${hostel.price}</p>
            <hr style="margin:10px 0; border:0; border-top:1px solid #ccc;">
            <p><strong>Unlock Fee:</strong> <span style="color:#001f3f; font-weight:bold;">GH₵ 35.00</span></p>
        `;
        
        paymentModal.style.display = 'block';
    }

    const paymentForm = document.getElementById('paymentForm');
    if (paymentForm) {
        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('payName').value;
            const email = document.getElementById('payEmail').value;
            const phone = document.getElementById('payPhone').value;

            payWithPaystack(email, name, phone, currentSelectedHostel);
        });
    }

    function payWithPaystack(email, name, phone, hostel) {
        /**
         * IMPORTANT SECURITY NOTE:
         * This uses a frontend Paystack Public Key.
         * For production, replace 'pk_test_xxxxxxxxxxxxxxxxx' with your actual Paystack PUBLIC key.
         * NEVER expose your SECRET key in Javascript.
         * True payment verification MUST happen on a secure backend server.
         */
        const publicKey = "pk_test_3f27673b65ff4a1ce1c0fda8d35e3e03b164b67f"; 

        if (typeof PaystackPop === 'undefined') {
            alert('Payment gateway failed to load. Please check your internet connection.');
            return;
        }

        let handler = PaystackPop.setup({
            key: publicKey,
            email: email,
            amount: 35 * 100, // Amount in pesewas (50 GHS * 100)
            currency: 'GHS',
            metadata: {
                custom_fields: [
                    { display_name: "Student Name", variable_name: "student_name", value: name },
                    { display_name: "Phone Number", variable_name: "phone", value: phone },
                    { display_name: "Hostel Name", variable_name: "hostel_name", value: hostel.name },
                    { display_name: "Hostel ID", variable_name: "hostel_id", value: hostel.id }
                ]
            },
            callback: function(response) {
                // In production, send response.reference to your backend for verification.
                // For this frontend demo, we simulate success immediately.
                handlePaymentSuccess(response, hostel);
            },
            onClose: function() {
                alert('Payment window closed. Transaction was not completed.');
            }
        });
        handler.openIframe();
    }

    function handlePaymentSuccess(response, hostel) {
        document.getElementById('paymentForm').classList.add('hidden');
        
        const successDiv = document.getElementById('paymentSuccess');
        successDiv.classList.remove('hidden');
        
        successDiv.innerHTML = `
            <h3>Payment Successful!</h3>
            <p style="margin-bottom:15px;">Your hostel manager contact details have been unlocked.</p>
            <p><strong>Ref:</strong> ${response.reference}</p>
            <div style="background:#fff; padding:15px; border-radius:4px; margin-top:10px;">
                <h4 style="color:#001f3f;">Manager Details</h4>
                <p><strong>Name:</strong> ${hostel.manager.name}</p>
                <p><strong>Phone:</strong> ${hostel.manager.phone}</p>
                <p><strong>WhatsApp:</strong> ${hostel.manager.whatsapp}</p>
                
                <h4 style="color:#001f3f; margin-top:15px;">Payment Info</h4>
                <p><strong>MoMo Network:</strong> ${hostel.paymentDetails.momoNetwork}</p>
                <p><strong>MoMo Name:</strong> ${hostel.paymentDetails.momoName}</p>
                <p><strong>MoMo Number:</strong> ${hostel.paymentDetails.momoNumber}</p>
                <p><strong>Bank:</strong> ${hostel.paymentDetails.bank}</p>
                <p><strong>Account Name:</strong> ${hostel.paymentDetails.accountName}</p>
                <p><strong>Account No:</strong> ${hostel.paymentDetails.accountNumber}</p>
            </div>
            
            <div style="display:flex; gap:10px; margin-top:15px;">
                <a href="tel:${hostel.manager.phone.replace(/\s+/g, '')}" class="btn btn-primary" style="flex:1">Call</a>
                <a href="https://wa.me/${hostel.manager.whatsapp}" target="_blank" class="btn btn-accent" style="flex:1">WhatsApp</a>
            </div>
        `;
    }
});