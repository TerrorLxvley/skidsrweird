document.addEventListener('DOMContentLoaded', function() {
    // Custom cursor implementation
    const cursor = document.getElementById('custom-cursor');
    
    if (cursor) {
        // Show the cursor element
        cursor.style.display = 'block';
        
        // Update cursor position on mouse move
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        // Disable all default click effects
        document.addEventListener('click', function(e) {
            e.preventDefault();
            return false;
        }, true);
        
        // Handle cursor leaving the window
        document.addEventListener('mouseout', function() {
            cursor.style.display = 'none';
        });
        
        // Handle cursor entering the window
        document.addEventListener('mouseover', function() {
            cursor.style.display = 'block';
        });

    }
    
    // Set background music volume to 50%
    const bgMusic = document.getElementById('bg-music');
    if (bgMusic) bgMusic.volume = 0.1;
    // Get all tabs and tab content
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Check for tab parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    
    if (tabParam) {
        // Remove active class from all tabs and tab contents
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to tab from URL parameter
        tabs.forEach(tab => {
            if (tab.getAttribute('data-tab') === tabParam) {
                tab.classList.add('active');
                // Add active class to corresponding tab content
                const tabId = tab.getAttribute('data-tab');
                const tabContent = document.getElementById(tabId);
                if (tabContent) {
                    tabContent.classList.add('active');
                }
            }
        });
    }
    
    // Add click event to each tab
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            // If the tab contains an anchor tag, don't handle the click here
            if (e.target.tagName === 'A') {
                // Add tab parameter to the URL if it's linking to index.html
                if (e.target.href.includes('index.html')) {
                    const tabId = this.getAttribute('data-tab');
                    if (!e.target.href.includes('?')) {
                        e.target.href += '?tab=' + tabId;
                    }
                }
                return;
            }

            // Remove active class from all tabs and tab contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked tab
            this.classList.add('active');

            // Get the tab data attribute
            const tabId = this.getAttribute('data-tab');

            // Add active class to corresponding tab content
            const tabContent = document.getElementById(tabId);
            if (tabContent) {
                tabContent.classList.add('active');
            }

            // Use the History API to update the URL without reloading the page
            let newUrl = '/';
            if (tabId !== 'home') {
                newUrl += '?tab=' + tabId;
            }
            window.history.replaceState({}, '', newUrl);
        });
    });
    
    // Search functionality for victim list
    const searchBar = document.getElementById('victim-search');
    if (searchBar) {
        searchBar.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const victimItems = document.querySelectorAll('.victim-item');
            
            victimItems.forEach(item => {
                const victimName = item.querySelector('.victim-name').textContent.toLowerCase();
                const victimId = item.querySelector('.victim-id').textContent.toLowerCase();
                
                // Check if the search term is in the name or ID
                if (victimName.includes(searchTerm) || victimId.includes(searchTerm)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
    
    // Update current time in footer
    function updateTime() {
        const timeElement = document.getElementById('current-time');
        if (timeElement) {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const seconds = now.getSeconds().toString().padStart(2, '0');
            timeElement.textContent = `${hours}:${minutes}:${seconds}`;
        }
    }
    
    // Update time immediately and then every second
    updateTime();
    setInterval(updateTime, 1000);
});
