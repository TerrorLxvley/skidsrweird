document.addEventListener('DOMContentLoaded', function() {
  
    const cursor = document.getElementById('custom-cursor');
    
    if (cursor) {
        
        cursor.style.display = 'block';
        
        
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
       
        document.addEventListener('click', function(e) {
            e.preventDefault();
            return false;
        }, true);
        
       
        document.addEventListener('mouseout', function() {
            cursor.style.display = 'none';
        });
        
        
        document.addEventListener('mouseover', function() {
            cursor.style.display = 'block';
        });

    }
    
   
    const bgMusic = document.getElementById('bg-music');
    if (bgMusic) bgMusic.volume = 0.3;
   
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
   
    const urlParams = new URLSearchParams(window.location.search);
    const tabParam = urlParams.get('tab');
    
    if (tabParam) {
        
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        
        tabs.forEach(tab => {
            if (tab.getAttribute('data-tab') === tabParam) {
                tab.classList.add('active');
                
                const tabId = tab.getAttribute('data-tab');
                const tabContent = document.getElementById(tabId);
                if (tabContent) {
                    tabContent.classList.add('active');
                }
            }
        });
    }
    
   
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                if (e.target.href.includes('index.html')) {
                    const tabId = this.getAttribute('data-tab');
                    if (!e.target.href.includes('?')) {
                        e.target.href += '?tab=' + tabId;
                    }
                }
                return;
            }

           
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

         
            this.classList.add('active');

          
            const tabId = this.getAttribute('data-tab');

           
            const tabContent = document.getElementById(tabId);
            if (tabContent) {
                tabContent.classList.add('active');
            }

          
            let newUrl = '/';
            if (tabId !== 'home') {
                newUrl += '?tab=' + tabId;
            }
            window.history.replaceState({}, '', newUrl);
        });
    });
    
    
    const searchBar = document.getElementById('victim-search');
    if (searchBar) {
        searchBar.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const victimItems = document.querySelectorAll('.victim-item');
            
            victimItems.forEach(item => {
                const victimName = item.querySelector('.victim-name').textContent.toLowerCase();
                const victimId = item.querySelector('.victim-id').textContent.toLowerCase();
                
               
                if (victimName.includes(searchTerm) || victimId.includes(searchTerm)) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

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
    
    updateTime();
    setInterval(updateTime, 1000);
});
