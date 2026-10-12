/* Paystack Payment & Booking Logic */

let selectedHostelForPayment = null;

function initiatePayment(hostelId) {
    selectedHostelForPayment = hostels.find(h => h.id === hostelId);
    
    // Close room modal if open
    closeModal('roomModal');

    // Populate payment modal info
    document.getElementById('payHostelName').textContent = selectedHostelForPayment.name;
    document.getElementById('payHostelPrice').textContent = `GH₵ ${selectedHostelForPayment.price}`;
    
    // Open payment modal
    paymentModal.style.display = 'flex';
}

function processPayment(event) {
    event.preventDefault();
    
    const name = document.getElementById('studentName').value;
    const email = document.getElementById('studentEmail').value;
    const phone = document.getElementById('studentPhone').value;

    /* 
       IMPORTANT SECURITY NOTICE:
       In production, transaction verification MUST happen on the server-side.
       Never store secret keys in frontend JavaScript.
    */
    
    // REPLACE WITH ACTUAL PAYSTACK PUBLIC KEY
    const publicKey = 'pk_test_3f27673b65ff4a1ce1c0fda8d35e3e03b164b67f'; 
    
    let handler = PaystackPop.setup({
        key: publicKey,
        email: email,
        amount: 5000, // 35 GHS = 5000 pesewas
        currency: 'GHS',
        ref: 'UCC_HF_' + Math.floor((Math.random() * 1000000000) + 1),
        metadata: {
            custom_fields: [
                { display_name: "Student Name", variable_name: "student_name", value: name },
                { display_name: "Phone Number", variable_name: "phone_number", value: phone },
                { display_name: "Hostel ID", variable_name: "hostel_id", value: selectedHostelForPayment.id }
            ]
        },
        callback: function(response) {
            // Payment successful!
            // NOTE: In production, send response.reference to your backend for verification before showing data.
            closeModal('paymentModal');
            showSuccessDetails(selectedHostelForPayment);
        },
        onClose: function() {
            alert('Transaction was not completed, window closed.');
        }
    });

    handler.openIframe();
}

function showSuccessDetails(hostel) {
    const m = hostel.manager;
    const p = hostel.paymentDetails;
    
    const detailsHtml = `
        <h3>Manager Name: ${m.name}</h3>
        <p><strong>Phone:</strong> ${m.phone}</p>
        <p><strong>WhatsApp:</strong> ${m.whatsapp}</p>
        <p><strong>Email:</strong> ${m.email}</p>
        <hr style="margin:15px 0;">
        <h4>Payment Information:</h4>
        <p><strong>Network:</strong> ${p.momoNetwork}</p>
        <p><strong>Account Name:</strong> ${p.momoName}</p>
        <p><strong>Number:</strong> ${p.momoNumber}</p>
    `;
    
    document.getElementById('managerDetailsContainer').innerHTML = detailsHtml;
    
    // Setup Action Buttons
    document.getElementById('btnCall').onclick = () => window.open(`tel:${m.phone}`);
    document.getElementById('btnWa').onclick = () => window.open(`https://wa.me/${m.whatsapp}`);
    
    successModal.style.display = 'flex';
}