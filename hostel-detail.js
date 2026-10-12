/* ==========================================================
   UCC Hostel Finder - Room Detail & Paystack Integration
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Get Hostel ID from URL query string
    const urlParams = new URLSearchParams(window.location.search);
    const hostelId = parseInt(urlParams.get('id'), 10) || 1;

    // 2. Find matching hostel record from hostel-data.js
    if (typeof hostels === 'undefined' || !Array.isArray(hostels)) {
        console.error('hostels data not found.');
        return;
    }

    const currentHostel = hostels.find(h => h.id === hostelId) || hostels[0];

    // 3. Populate Page Details
    document.getElementById('hostel-name').textContent = currentHostel.name;
    document.getElementById('hostel-location').innerHTML = `<i class="fa-solid fa-location-dot"></i> ${currentHostel.location}, Cape Coast`;
    document.getElementById('hostel-price').textContent = `GH₵ ${currentHostel.price.toLocaleString()}`;
    document.getElementById('hostel-description').textContent = currentHostel.description || 'Clean and secured hostel located close to lecture theaters with reliable water supply and study areas.';

    // Main Image & Thumbnails
    const mainImg = document.getElementById('main-gallery-img');
    const thumbnailGrid = document.getElementById('thumbnail-grid');
    
    // Fallback image gallery array
    const images = currentHostel.images || [
        currentHostel.image,
        'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80'
    ];

    mainImg.src = images[0];

    thumbnailGrid.innerHTML = '';
    images.forEach((imgSrc, index) => {
        const thumb = document.createElement('img');
        thumb.src = imgSrc;
        if (index === 0) thumb.classList.add('active');

        thumb.addEventListener('click', () => {
            mainImg.src = imgSrc;
            document.querySelectorAll('.thumbnail-grid img').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
        });

        thumbnailGrid.appendChild(thumb);
    });

    // Render Amenities Grid
    const amenitiesGrid = document.getElementById('amenities-grid');
    const defaultAmenities = currentHostel.amenities || ['Free Wi-Fi', 'Water Tank', '24/7 Security', 'Self Meter'];
    
    amenitiesGrid.innerHTML = '';
    defaultAmenities.forEach(amenity => {
        const badge = document.createElement('div');
        badge.className = 'amenity-badge';
        badge.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #16a34a;"></i> ${amenity}`;
        amenitiesGrid.appendChild(badge);
    });

    // Check if this hostel contact was already unlocked in session
    if (sessionStorage.getItem(`unlocked_${currentHostel.id}`)) {
        revealContact(currentHostel);
    }

    // 4. Paystack Unlock Trigger
    const unlockBtn = document.getElementById('unlock-btn');
    if (unlockBtn) {
        unlockBtn.addEventListener('click', () => {
            payWithPaystack(currentHostel);
        });
    }
});

// Paystack Payment Handler
function payWithPaystack(hostel) {
    const userEmail = prompt("Please enter your email to proceed with Paystack payment:", "student@ucc.edu.gh or any");
    if (!userEmail) return;

    // Standard Paystack Pop
    let handler = PaystackPop.setup({
        key: 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // Replace with your Paystack Public Key
        email: userEmail,
        amount: 50 * 100, // GH₵ 50 in pesewas
        currency: 'GHS',
        ref: 'UCC_HF_' + Math.floor((Math.random() * 1000000000) + 1),
        onClose: function() {
            alert('Payment window closed. Manager contact remains locked.');
        },
        callback: function(response) {
            alert('Payment Successful! Reference: ' + response.reference);
            sessionStorage.setItem(`unlocked_${hostel.id}`, 'true');
            revealContact(hostel);
        }
    });

    handler.openIframe();
}

// Reveal Manager Phone & WhatsApp details after unlock
function revealContact(hostel) {
    document.getElementById('locked-state').style.display = 'none';
    document.getElementById('unlocked-state').style.display = 'block';

    const phone = hostel.phone || '+233 24 123 4567';
    const manager = hostel.manager || 'Hostel Manager';

    document.getElementById('manager-name').textContent = `Manager: ${manager}`;
    document.getElementById('manager-phone').textContent = phone;
    
    const cleanPhone = phone.replace(/[^0-9]/g, '');
    document.getElementById('whatsapp-btn').href = `https://wa.me/${cleanPhone}?text=Hello%20${encodeURIComponent(manager)},%20I%20saw%20${encodeURIComponent(hostel.name)}%20on%20UCC%20Hostel%20Finder%20and%20would%20like%20to%20inquire%20about%20room%20availability.`;
}