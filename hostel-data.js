   /**
 * HOSTEL DATA STORE
 * This serves as the centralized database for demo hostels.
 */

const hostels = [
    // ==========================================
    // AMAMOMA HOSTELS
    // ==========================================
    {
        id: 101, // Give each real hostel a unique ID
        name: "Mercy Hostel",
        location: "Amamoma",
        price: 4500,
        roomType: "4-in-a-room",
        description: "A very popular and secure hostel right next to the Amamoma taxi rank. Great water supply.",
        images: [
            "img/Sagamar Inn.jpg", // Replace with your actual image paths
            "img/Restroom 2.jpg"
        ],
        video: "vid/iii.mp4",
        amenities: ["Wi-Fi", "Water", "Security", "Kitchen", "Wardrobe"],
        availability: "Available",
        manager: {
            name: "Mr. Kweku",
            phone: "024 123 4567",
            whatsapp: "233241234567",
            email: "kweku@example.com"
        },
        paymentDetails: {
            momoNetwork: "MTN Mobile Money",
            momoName: "Mercy Hostel Lodge",
            momoNumber: "024 123 4567",
            bank: "GCB Bank",
            accountName: "Mercy Hostel",
            accountNumber: "1234567890123"
        }
    },
    {
        id: 102,
        name: "Edi Bee Hostel",
        location: "Amamoma",
        price: 5000,
        roomType: "2-in-a-room",
        description: "Premium rooms with individual meters and modern washrooms.",
        images: [
            "img/download.jpguu.jpg",
            "img/Restroom 2.jpg"
        ],
        video: "videos/edibee.mp4",
        amenities: ["Water", "Security", "Cleaning service", "Parking"],
        availability: "2 Rooms Left",
        manager: {
            name: "Auntie Esi",
            phone: "020 987 6543",
            whatsapp: "233209876543",
            email: "esi@example.com"
        },
        paymentDetails: {
            momoNetwork: "Telecel Cash",
            momoName: "Edi Bee Enterprise",
            momoNumber: "020 987 6543",
            bank: "N/A",
            accountName: "N/A",
            accountNumber: "N/A"
        }
    },

    // ==========================================
    // KWAPROW HOSTELS
    // ==========================================
    {
        id: 103,
        name: "Comfort Hostel",
        location: "Kwaprow",
        price: 3800,
        roomType: "3-in-a-room",
        description: "Quiet environment perfect for serious students. Only 5 minutes walk to campus.",
        images: [
            "img/HOSTEL CHIC.jpg",
            "img/download.jpgff.jpg"
        ],
        video: "",
        amenities: ["Water", "Security", "Study Area"],
        availability: "Available",
        manager: {
            name: "John Doe",
            phone: "055 000 1111",
            whatsapp: "233550001111",
            email: "john@example.com"
        },
        paymentDetails: {
            momoNetwork: "MTN Mobile Money",
            momoName: "John Doe",
            momoNumber: "055 000 1111",
            bank: "N/A",
            accountName: "N/A",
            accountNumber: "N/A"
        }
    },

    // ==========================================
    // APEWOSIKA HOSTELS
    // ==========================================

     {
        id: 104,
        name: "Edi Bee Hostel",
        location: "Apewosika",
        price: 5000,
        roomType: "2-in-a-room",
        description: "Premium rooms with individual meters and modern washrooms.",
        images: [
            "img/download.jpguu.jpg",
            "img/Restroom 2.jpg"
        ],
        video: "vid/@amityuniversity8455_#amityuniversitynoida_#amityuniversityhostel_#hostel_#amityhosteltour_#NonAC(360p) (1) (1) (1).mp4",
        amenities: ["Water", "Security", "Cleaning service", "Parking"],
        availability: "2 Rooms Left",
        manager: {
            name: "Auntie Esi",
            phone: "020 987 6543",
            whatsapp: "233209876543",
            email: "esi@example.com"
        },
        paymentDetails: {
            momoNetwork: "Telecel Cash",
            momoName: "Edi Bee Enterprise",
            momoNumber: "020 987 6543",
            bank: "N/A",
            accountName: "N/A",
            accountNumber: "N/A"
        }
    },


    // ==========================================
    // ABURA
    // ==========================================

     {
        id: 105,
        name: "Abura",
        location: "Abura",
        price: 5000,
        roomType: "2-in-a-room",
        description: "Premium rooms with individual meters and modern washrooms.",
        images: [
            "img/download.jpguu.jpg",
            "img/Restroom 2.jpg"
        ],
        video: "videos/edibee.mp4",
        amenities: ["Water", "Security", "Cleaning service", "Parking"],
        availability: "2 Rooms Left",
        manager: {
            name: "Auntie Esi",
            phone: "020 987 6543",
            whatsapp: "233209876543",
            email: "esi@example.com"
        },
        paymentDetails: {
            momoNetwork: "Telecel Cash",
            momoName: "Edi Bee Enterprise",
            momoNumber: "020 987 6543",
            bank: "N/A",
            accountName: "N/A",
            accountNumber: "N/A"
        }
    },



    // ==========================================
    // OLA
    // ==========================================

     {
        id: 106,
        name: "Edi Bee Hostel",
        location: "Ola",
        price: 5000,
        roomType: "2-in-a-room",
        description: "Premium rooms with individual meters and modern washrooms.",
        images: [
            "img/download.jpguu.jpg",
            "img/Restroom 2.jpg"
        ],
        video: "videos/edibee.mp4",
        amenities: ["Water", "Security", "Cleaning service", "Parking"],
        availability: "2 Rooms Left",
        manager: {
            name: "Auntie Esi",
            phone: "020 987 6543",
            whatsapp: "233209876543",
            email: "esi@example.com"
        },
        paymentDetails: {
            momoNetwork: "Telecel Cash",
            momoName: "Edi Bee Enterprise",
            momoNumber: "020 987 6543",
            bank: "N/A",
            accountName: "N/A",
            accountNumber: "N/A"
        }
    },
];

const Locations = ["Amamoma", "Kwaprow", "Apewosika", "Abura", "Ola", "North Campus"];
const Amenities = ["Wi-Fi", "Water", "Security", "Kitchen", "Wardrobe", "Parking", "Cleaning service"];
const RoomTypes = ["1-in-a-room", "2-in-a-room", "3-in-a-room", "4-in-a-room"];

// // Helper function to generate dummy hostels
// function generateDemoHostels() {
//     let idCounter = 200; // Started at 200 so it doesn't conflict with your real hostel IDs
//     demoLocations.forEach(loc => {
//         for (let i = 1; i <= 4; i++) {
//             const price = Math.floor(Math.random() * (6000 - 2500 + 1)) + 2500;
//             const roomType = demoRoomTypes[Math.floor(Math.random() * demoRoomTypes.length)];
            
//             hostels.push({
//                 id: idCounter,
//                 name: `Demo Hostel ${idCounter} (${loc})`,
//                 location: loc,
//                 price: price,
//                 roomType: roomType,
//                 description: `A clean and secure student accommodation located in ${loc}.`,
//                 images: [
//                     "https://via.placeholder.com/800x600?text=Room+View+1",
//                     "https://via.placeholder.com/800x600?text=Room+View+2"
//                 ],
//                 video: "https://www.w3schools.com/html/mov_bbb.mp4",
//                 amenities: demoAmenities.slice(0, Math.floor(Math.random() * 4) + 3),
//                 availability: "Available",
//                 manager: {
//                     name: `Manager ${idCounter}`,
//                     phone: "024 XXX XXXX",
//                     whatsapp: "233240000000",
//                     email: `manager${idCounter}@demo.com`
//                 },
//                 paymentDetails: {
//                     momoNetwork: "MTN Mobile Money",
//                     momoName: "Demo Account",
//                     momoNumber: "024 XXX XXXX",
//                     bank: "Demo Bank",
//                     accountName: "Hostel Enterprise",
//                     accountNumber: "1234567890"
//                 }
//             });
//             idCounter++;
//         }
//     });
// }

// Keep this running while you build out the site so it looks full.
// When you have added enough REAL hostels above, delete or comment out this line!
generateHostels();
