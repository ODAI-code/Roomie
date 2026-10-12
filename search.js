/* Search and Location-Based Grouping Logic */

document.addEventListener('DOMContentLoaded', () => {
    const homeContainer = document.getElementById('homepage-hostels');
    const allHostelsContainer = document.getElementById('all-hostels');

    // On Homepage: Render hostels grouped by location
    if (homeContainer) {
        renderHostelsByLocation(hostels, homeContainer);
    }

    // On Hostels Page: Render standard flat grid (with sidebar filtering)
    if (allHostelsContainer) {
        renderHostels(hostels, allHostelsContainer);
    }
});

// Standard flat list rendering (used on hostels.html or search results)
function renderHostels(data, container) {
    if (!data || data.length === 0) {
        container.innerHTML = '<h3 style="grid-column: 1/-1;">No hostels found matching your criteria.</h3>';
        return;
    }
    container.innerHTML = data.map(h => createHostelCard(h)).join('');
}

// Grouped rendering by location (used on index.html)
function renderHostelsByLocation(data, container) {
    if (!data || data.length === 0) {
        container.innerHTML = '<h3>No hostels found matching your criteria.</h3>';
        return;
    }

    // 1. Group hostels by location name
    const groupedHostels = {};
    data.forEach(hostel => {
        if (!groupedHostels[hostel.location]) {
            groupedHostels[hostel.location] = [];
        }
        groupedHostels[hostel.location].push(hostel);
    });

    // 2. Build HTML for each location group
    let groupedHTML = '';
    for (const location in groupedHostels) {
        const locationCards = groupedHostels[location]
            .map(h => createHostelCard(h))
            .join('');

        groupedHTML += `
            <div class="location-group" style="margin-bottom: 50px; width: 100%;">
                <h2 style="color: var(--primary-color); border-bottom: 3px solid var(--accent-color); display: inline-block; padding-bottom: 5px; margin-bottom: 25px;">
                    📍 ${location} Hostels
                </h2>
                <div class="hostel-grid">
                    ${locationCards}
                </div>
            </div>
        `;
    }

    // 3. Inject grouped sections into homepage container
    container.innerHTML = groupedHTML;
}

// Dynamic Search Function
function handleSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    const homeContainer = document.getElementById('homepage-hostels');
    const allHostelsContainer = document.getElementById('all-hostels');

    const filtered = hostels.filter(h => {
        return h.name.toLowerCase().includes(query) || 
               h.location.toLowerCase().includes(query) ||
               h.roomType.toLowerCase().includes(query) ||
               h.amenities.some(a => a.toLowerCase().includes(query));
    });

    if (homeContainer) {
        // If searching on homepage, maintain location grouping for filtered results
        renderHostelsByLocation(filtered, homeContainer);
    } else if (allHostelsContainer) {
        renderHostels(filtered, allHostelsContainer);
    }
}

// Filter by single location (when clicking location buttons)
function filterByLocation(location) {
    const allHostelsContainer = document.getElementById('all-hostels');
    
    if (!allHostelsContainer) {
        // If clicked from homepage, navigate to hostels.html with location filter
        window.location.href = `hostels.html?loc=${encodeURIComponent(location)}`;
        return;
    }

    if (location === 'All') {
        renderHostels(hostels, allHostelsContainer);
    } else {
        const filtered = hostels.filter(h => h.location === location);
        renderHostels(filtered, allHostelsContainer);
    }
}

/* Auto-filter when navigating from locations.html with ?loc=Amamoma */
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const locParam = urlParams.get('loc');
    const allHostelsContainer = document.getElementById('all-hostels');

    if (locParam && allHostelsContainer) {
        const filtered = hostels.filter(h => h.location.toLowerCase() === locParam.toLowerCase());
        renderHostels(filtered, allHostelsContainer);
        
        // Update header title if present
        const pageHeading = document.querySelector('.section-title');
        if (pageHeading) {
            pageHeading.textContent = `${locParam} Hostels`;
        }
    }
});

