(function() {

      /**
       * ----------------------------------------------------------------
       * App State & Data
       * ----------------------------------------------------------------
       */

      // Main application state
      const App = {
        state: {
          isAuthenticated: false,
          currentUser: null, // NEW: For multi-user
          currentPage: 'login-page',
          isDarkMode: false,
          isSidebarOpen: false,
          currentTripId: null,
          trips: [], // This will be loaded per-user
          locations: {},
          toastTimer: null,
        },

        // --- Data Definitions ---
        data: {
          locations: {
            india: [
              { name: 'Jaipur, Rajasthan', description: 'The "Pink City", known for its regal forts...', detailedDescription: "Jaipur, the capital of Rajasthan, is known as the Pink City due to the distinctive color of its buildings. It was founded in 1727 by Maharaja Sawai Jai Singh II.", activities: ["Visit Amer Fort", "Explore Hawa Mahal", "Shop at Johari Bazaar"] },
              { name: 'Kerala Backwaters', description: '"God\'s Own Country", famous for its serene...', detailedDescription: "The Kerala backwaters are a network of brackish lagoons and lakes lying parallel to the Arabian Sea coast. A highlight is the houseboat (Kettuvallam) cruise.", activities: ["Take a houseboat cruise", "Watch a Kathakali performance", "Get an Ayurvedic massage"] },
              { name: 'Goa', description: 'Hottest beach destination, known for beaches...', detailedDescription: "Goa is a state in western India with coastlines stretching along the Arabian Sea. Its long history as a Portuguese colony is evident in its preserved 17th-century churches.", activities: ["Relax on Baga Beach", "Visit Old Goa's churches", "Explore Anjuna Flea Market"] },
              { name: 'Agra, Uttar Pradesh', description: 'Home to the Taj Mahal.', detailedDescription: "Agra is a major tourist destination because of its many Mughal-era buildings, most notably the Tāj Mahal, Agra Fort and Fatehpūr Sikrī, all UNESCO World Heritage Sites.", activities: ["Visit the Taj Mahal at sunrise", "Explore Agra Fort", "Visit Fatehpur Sikri"] },
            ],
            international: [
              { name: 'Bangkok, Thailand', description: 'Vibrant city with ornate shrines...', detailedDescription: "Bangkok, Thailand's capital, is a large city known for ornate shrines and vibrant street life. The boat-filled Chao Phraya River feeds its network of canals.", activities: ["Visit the Grand Palace", "Explore Wat Arun", "Experience the street food"] },
              { name: 'Istanbul, Turkey', description: 'The city that straddles Europe and Asia.', detailedDescription: "Istanbul is a major city in Turkey that straddles Europe and Asia across the Bosphorus Strait. Its Old City reflects the cultural influences of the many empires that once ruled here.", activities: ["Visit the Hagia Sophia", "Explore the Blue Mosque", "Shop at the Grand Bazaar"] },
              { name: 'London, UK', description: 'A global hub of culture, history, and finance.', detailedDescription: "London, the capital of England, is a 21st-century city with history stretching back to Roman times. At its centre stand the imposing Houses of Parliament and the iconic ‘Big Ben’ clock tower.", activities: ["Ride the London Eye", "Visit the British Museum", "See the Tower of London"] },
              { name: 'Paris, France', description: 'The "City of Light," famed for art and fashion.', detailedDescription: "Paris, France's capital, is a global center for art, fashion, gastronomy and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine.", activities: ["Ascend the Eiffel Tower", "Explore the Louvre Museum", "Visit Montmartre"] },
            ],
            worldHeritage: [
              { name: 'Taj Mahal, India', description: 'An ivory-white marble mausoleum.', detailedDescription: "The Taj Mahal was commissioned by Shah Jahan in 1632 to house the tomb of his favourite wife, Mumtaz Mahal. It is the jewel of Muslim art in India.", activities: ["View at sunrise/sunset", "Walk the gardens", "Visit the interior mausoleum"] },
              { name: 'Great Wall of China', description: 'A series of fortifications thousands of miles long.', detailedDescription: "The Great Wall of China is a series of fortifications that were built across the historical northern borders of ancient Chinese states and Imperial China as protection against various nomadic groups.", activities: ["Hike the Mutianyu section", "Take a cable car", "Visit a watchtower"] },
              { name: 'Machu Picchu, Peru', description: 'An Incan citadel high in the Andes.', detailedDescription: "Machu Picchu is an Incan citadel set high in the Andes Mountains in Peru. Built in the 15th century, it’s renowned for its sophisticated dry-stone walls.", activities: ["Hike the Inca Trail", "Explore the Temple of the Sun", "Climb Huayna Picchu"] },
              { name: 'Pyramids of Giza, Egypt', description: 'The most iconic ancient wonders.', detailedDescription: "The Giza pyramid complex includes the Great Pyramid of Giza, the Pyramid of Khafre, and the Pyramid of Menkaure, along with the Great Sphinx.", activities: ["Enter the Great Pyramid", "Take a camel ride", "See the Great Sphinx"] },
            ]
          },
          // Default trips for a new user
          trips: [
            {
              id: 1, title: "Goa Weekend", type: "short", date: "2025-12-10",
              tasks: [
                { id: 1, text: "Book flights", completed: true },
                { id: 2, text: "Reserve beach hut", completed: true },
              ],
              carbon: [
                { id: 1, activity: "Flight (Roundtrip)", co2: 120 },
                { id: 2, activity: "Scooter rental", co2: 15 },
              ],
              reminders: [
                { id: 1, text: "Check into flight", datetime: "2025-12-09T18:00" },
              ],
              memories: [
                { id: 1, name: "beach-sunset.jpg", type: "image" },
                { id: 2, name: "first-curry.mp4", type: "video" },
              ]
            },
            {
              id: 2, title: "Himalayan Trek (Ladakh)", type: "long", date: "2026-01-20",
              tasks: [
                { id: 1, text: "Get trekking permits", completed: false },
                { id: 2, text: "Buy thermal wear", completed: true },
                { id: 3, text: "Book acclimatization hotel", completed: false },
                { id: 4, text: "Train for altitude", completed: false },
              ],
              carbon: [{ id: 1, activity: "Flight to Leh", co2: 210 }],
              reminders: [{ id: 1, text: "Start Diamox", datetime: "2026-01-19T08:00" }],
              memories: []
            },
            {
              id: 3, title: "Rajasthan Heritage Tour", type: "long", date: "2026-02-15",
              tasks: [
                { id: 1, text: "Book train tickets", completed: true },
                { id: 2, text: "Hire driver for Jaipur", completed: false },
              ],
              carbon: [{ id: 1, activity: "Train (Sleeper)", co2: 30 }],
              reminders: [],
              memories: [
                { id: 1, name: "amer-fort.jpg", type: "image" },
                { id: 2, name: "city-palace.jpg", type: "image" },
              ]
            },
          ]
        },

        // --- DOM Element Cache ---
        // Cache frequently accessed DOM elements
        el: {},

        /**
         * ----------------------------------------------------------------
         * Initialization
         * ----------------------------------------------------------------
         */
        
        init() {
          console.log("App initializing...");
          
          // 1. Cache DOM Elements
          this.cacheDom();
          
          // 2. Load non-user data
          this.state.locations = this.data.locations;
          
          // 3. Render all Lucide icons
          this.renderIcons();
          
          // 4. Bind all event listeners
          this.bindEvents();
          
          // 5. Load global state (like dark mode)
          this.loadGlobalState();
          this.updateDarkMode(this.state.isDarkMode);
          
          // 6. Check auth state from sessionStorage
          const user = sessionStorage.getItem('tripfolioUser');
          if (user) {
            this.state.isAuthenticated = true;
            this.state.currentUser = user;
            this.loadUserData(); // Load this user's trips and last page
            
            this.el.authPages.forEach(page => page.style.display = 'none');
            this.el.mainApp.style.display = 'flex';
            this.navigate(this.state.currentPage || 'dashboard-page');
            this.el.settingsProfileName.textContent = user; // Update settings page
          } else {
            this.el.authPages.forEach(page => page.style.display = 'none');
            this.el.mainApp.style.display = 'none';
            this.el.loginPage.style.display = 'block';
            this.state.currentPage = 'login-page';
          }
        },

        cacheDom() {
          // Auth
          this.el.authPages = document.querySelectorAll('#login-page, #register-page, #otp-page');
          this.el.loginPage = document.getElementById('login-page');
          this.el.registerPage = document.getElementById('register-page');
          this.el.otpPage = document.getElementById('otp-page');
          this.el.loginForm = document.getElementById('login-form');
          this.el.registerForm = document.getElementById('register-form');
          this.el.otpForm = document.getElementById('otp-form');
          this.el.goToRegister = document.getElementById('go-to-register');
          this.el.goToLogin = document.getElementById('go-to-login');
          this.el.otpEmailDisplay = document.getElementById('otp-email-display');
          
          // Main App
          this.el.mainApp = document.getElementById('main-app');
          this.el.appPages = document.querySelectorAll('.app-page');
          this.el.sidebar = document.getElementById('sidebar');
          this.el.sidebarOverlay = document.getElementById('sidebar-overlay');
          this.el.sidebarCollapseBtn = document.getElementById('sidebar-collapse-btn');
          this.el.menuToggleButton = document.getElementById('menu-toggle-button');
          this.el.mobilePageTitle = document.getElementById('mobile-page-title');
          this.el.navLinks = document.querySelectorAll('.nav-link');
          this.el.logoutButton = document.getElementById('logout-button');
          
          // Dashboard
          this.el.statTotalTrips = document.getElementById('stat-total-trips');
          this.el.statTotalTasks = document.getElementById('stat-total-tasks');
          this.el.statTotalCarbon = document.getElementById('stat-total-carbon');
          this.el.dashboardUpcomingTrips = document.getElementById('dashboard-upcoming-trips');
          this.el.dashboardRecentMemories = document.getElementById('dashboard-recent-memories');

          // All Trips
          this.el.addTripButton = document.getElementById('add-trip-btn');
          this.el.tripListContainer = document.getElementById('trip-list-container');
          this.el.tripFilterButtons = document.querySelectorAll('.trip-filter-btn');
          
          // All Memories
          this.el.allMemoriesContainer = document.getElementById('all-memories-container');

          // Trip Details
          this.el.tripDetailsPage = document.getElementById('trip-details-page');
          this.el.backToTripsBtn = document.getElementById('back-to-trips-btn');
          this.el.tripDetailsTitle = document.getElementById('trip-details-title');
          this.el.tripTabButtons = document.querySelectorAll('.trip-tab-btn');
          this.el.tripTabContents = document.querySelectorAll('.trip-tab-content');
          this.el.taskProgressCircle = document.getElementById('task-progress-circle');
          this.el.taskProgressText = document.getElementById('task-progress-text');
          this.el.addTaskForm = document.getElementById('add-task-form');
          this.el.addTaskInput = document.getElementById('add-task-input');
          this.el.taskList = document.getElementById('task-list');
          this.el.carbonTotalText = document.getElementById('carbon-total-text');
          this.el.addCarbonForm = document.getElementById('add-carbon-form');
          this.el.addCarbonActivity = document.getElementById('add-carbon-activity');
          this.el.addCarbonCo2 = document.getElementById('add-carbon-co2');
          this.el.carbonList = document.getElementById('carbon-list');
          this.el.addReminderForm = document.getElementById('add-reminder-form');
          this.el.addReminderText = document.getElementById('add-reminder-text');
          this.el.addReminderDatetime = document.getElementById('add-reminder-datetime');
          this.el.reminderList = document.getElementById('reminder-list');
          this.el.addMemoryBtn = document.getElementById('add-memory-btn');
          this.el.addMemoryInput = document.getElementById('add-memory-input');
          this.el.memoryList = document.getElementById('memory-list');
          this.el.deleteTripBtn = document.getElementById('delete-trip-btn');

          // Explore
          this.el.exploreSearchInput = document.getElementById('explore-search-input');
          this.el.exploreListsContainer = document.getElementById('explore-lists-container');
          
          // Settings
          this.el.darkModeToggle = document.getElementById('dark-mode-toggle');
          this.el.clearDataBtn = document.getElementById('clear-data-btn');
          this.el.settingsProfileName = document.getElementById('settings-profile-name'); // New

          // Global
          this.el.modalContainer = document.getElementById('modal-container');
          this.el.modalTitle = document.getElementById('modal-title');
          this.el.modalBody = document.getElementById('modal-body');
          this.el.toast = document.getElementById('toast-notification');
          this.el.toastMessage = document.getElementById('toast-message');
          this.el.toastIcon = document.getElementById('toast-icon');
          this.el.toastClose = document.getElementById('toast-close');
          this.el.loadingOverlay = document.getElementById('loading-overlay');
        },

        bindEvents() {
          // Auth
          this.el.loginForm.addEventListener('submit', (e) => this.handleAuth(e, 'login'));
          this.el.registerForm.addEventListener('submit', (e) => this.handleAuth(e, 'register'));
          this.el.otpForm.addEventListener('submit', (e) => this.handleAuth(e, 'otp'));
          this.el.goToRegister.addEventListener('click', () => this.navigate('register-page'));
          this.el.goToLogin.addEventListener('click', () => this.navigate('login-page'));

          // Navigation
          this.el.menuToggleButton.addEventListener('click', () => this.toggleSidebar());
          this.el.sidebarOverlay.addEventListener('click', () => this.toggleSidebar());
          this.el.sidebarCollapseBtn.addEventListener('click', () => this.toggleSidebarCollapse());
          this.el.logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.logout();
          });
          this.el.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
              e.preventDefault();
              this.navigate(link.dataset.page);
            });
          });

          // All Trips
          this.el.tripFilterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.filterTrips(e));
          });
          this.el.addTripButton.addEventListener('click', () => this.showAddTripModal());
          
          // All Memories
          this.el.allMemoriesContainer.addEventListener('click', (e) => {
             const card = e.target.closest('.memory-card');
             if (card) {
               const tripId = Number(card.dataset.tripId);
               this.openTripDetails(tripId, 'memories');
             }
          });

          // Trip Details
          this.el.backToTripsBtn.addEventListener('click', () => this.navigate('all-trips-page'));
          this.el.tripTabButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTripTab(e));
          });
          this.el.addTaskForm.addEventListener('submit', (e) => this.handleTask(e, 'add'));
          this.el.taskList.addEventListener('click', (e) => this.handleTask(e, 'click'));
          this.el.addCarbonForm.addEventListener('submit', (e) => this.handleCarbon(e, 'add'));
          this.el.carbonList.addEventListener('click', (e) => this.handleCarbon(e, 'click'));
          this.el.addReminderForm.addEventListener('submit', (e) => this.handleReminder(e, 'add'));
          this.el.reminderList.addEventListener('click', (e) => this.handleReminder(e, 'click'));
          this.el.addMemoryBtn.addEventListener('click', () => this.el.addMemoryInput.click());
          this.el.addMemoryInput.addEventListener('change', (e) => this.handleMemory(e, 'add'));
          this.el.memoryList.addEventListener('click', (e) => this.handleMemory(e, 'click'));
          this.el.deleteTripBtn.addEventListener('click', () => this.deleteTrip());
          
          // Explore
          this.el.exploreSearchInput.addEventListener('input', (e) => this.renderExplore());
          this.el.exploreListsContainer.addEventListener('click', (e) => this.handleExploreClick(e));

          // Settings
          this.el.darkModeToggle.addEventListener('change', () => this.toggleDarkMode());
          this.el.clearDataBtn.addEventListener('click', () => this.clearAllData());

          // Global
          this.el.toastClose.addEventListener('click', () => this.showToast(null));
        },
        
        /**
         * ----------------------------------------------------------------
         * State & Data Management (localStorage)
         * ----------------------------------------------------------------
         */

        // Loads global, non-user settings
        loadGlobalState() {
          const isDark = localStorage.getItem('tripfolioDarkMode');
          this.state.isDarkMode = (isDark === 'true');
        },

        // Saves global, non-user settings
        saveGlobalState() {
          localStorage.setItem('tripfolioDarkMode', this.state.isDarkMode);
        },
        
        // Loads data for the currently logged-in user
        loadUserData() {
          if (!this.state.currentUser) return;
          const allData = JSON.parse(localStorage.getItem('tripfolioData')) || {};
          
          // Get user data, or set default data for a new user
          const userData = allData[this.state.currentUser] || { 
            trips: JSON.parse(JSON.stringify(this.data.trips)), // Deep copy default trips
            currentPage: 'dashboard-page' 
          };
          
          this.state.trips = userData.trips;
          this.state.currentPage = userData.currentPage;
        },

        // Saves data for the currently logged-in user
        saveUserData() {
          if (!this.state.currentUser) return;
          
          const allData = JSON.parse(localStorage.getItem('tripfolioData')) || {};
          allData[this.state.currentUser] = {
            trips: this.state.trips,
            currentPage: this.state.currentPage,
          };
          localStorage.setItem('tripfolioData', JSON.stringify(allData));
        },
        
        clearAllData() {
          if (!this.state.currentUser) return;
          
          if (confirm("Are you sure you want to clear ALL data for your account? This will reset your trips.")) {
            const allData = JSON.parse(localStorage.getItem('tripfolioData')) || {};
            
            // Delete user's data and set to default
            allData[this.state.currentUser] = {
              trips: JSON.parse(JSON.stringify(this.data.trips)), // Deep copy default
              currentPage: 'dashboard-page'
            };
            
            localStorage.setItem('tripfolioData', JSON.stringify(allData));
            
            this.loadUserData(); // Reload the fresh default data
            this.renderDashboard();
            this.showToast('Your account data has been reset.', 'success');
          }
        },

        /**
         * ----------------------------------------------------------------
         * Authentication & Navigation
         * ----------------------------------------------------------------
         */
        
        handleAuth(event, type) {
          event.preventDefault();
          this.showLoading(true);
          
          // Simulate server delay
          setTimeout(() => {
            try {
              if (type === 'login') {
                const email = this.el.loginForm.querySelector('#login-email').value;
                // Simulated login: any email/password works
                this.state.isAuthenticated = true;
                this.state.currentUser = email;
                sessionStorage.setItem('tripfolioUser', email); // Store user in session
                
                this.loadUserData(); // Load this user's data
                
                this.el.authPages.forEach(page => page.style.display = 'none');
                this.el.mainApp.style.display = 'flex';
                this.el.settingsProfileName.textContent = email; // Update settings page
                this.navigate(this.state.currentPage); // Navigate to their last page
                this.showToast('Welcome back!', 'success');
              } 
              else if (type === 'register') {
                const email = this.el.registerForm.querySelector('#register-email').value;
                this.state.currentUser = email; // Store temporarily for OTP
                this.el.otpEmailDisplay.textContent = email;
                this.navigate('otp-page');
                this.showToast('Simulated OTP sent!', 'info');
              } 
              else if (type === 'otp') {
                const otp = this.el.otpForm.querySelector('#otp-code').value;
                if (otp === '123456') { // Mock OTP
                  this.state.isAuthenticated = true;
                  const email = this.state.currentUser;
                  sessionStorage.setItem('tripfolioUser', email);
                  
                  this.loadUserData(); // This will load default data for new user
                  this.saveUserData(); // Save the default data to localStorage
                  
                  this.el.authPages.forEach(page => page.style.display = 'none');
                  this.el.mainApp.style.display = 'flex';
                  this.el.settingsProfileName.textContent = email; // Update settings page
                  this.navigate('dashboard-page');
                  this.showToast('Registration successful! Welcome!', 'success');
                } else {
                  this.showToast('Invalid OTP. Please use 123456.', 'error');
                }
              }
            } catch (err) {
              this.showToast(`An error occurred: ${err.message}`, 'error');
            } finally {
              this.showLoading(false);
            }
          }, 1000);
        },
        
        logout() {
          this.state.isAuthenticated = false;
          this.state.currentUser = null;
          this.state.trips = [];
          sessionStorage.removeItem('tripfolioUser');
          
          this.el.mainApp.style.display = 'none';
          this.el.loginPage.style.display = 'block';
          this.state.currentPage = 'login-page';
          this.showToast('You have been logged out.', 'info');
        },

        navigate(pageId) {
          if (!pageId || pageId.includes('-page') === false) {
             console.warn('Invalid page navigation attempt:', pageId);
             pageId = 'dashboard-page'; // Default to dashboard
          }

          // Hide all pages
          this.el.appPages.forEach(page => page.classList.remove('active'));

          // Show the target page
          const targetPage = document.getElementById(pageId);
          if (targetPage) {
            targetPage.classList.add('active');
            this.state.currentPage = pageId;
            this.saveUserData(); // Save the current page for this user

            // Update mobile header title
            let title = pageId.replace('-page', '').replace(/-/g, ' ');
            title = title.charAt(0).toUpperCase() + title.slice(1);
            if (pageId === 'all-trips-page') title = 'My Trips';
            if (pageId === 'all-memories-page') title = 'All Memories';
            if (pageId === 'tour-guide-page') title = 'Tour Guides'; // New
            if (pageId === 'trip-details-page') title = this.state.currentTripId ? this.state.trips.find(t => t.id === this.state.currentTripId).title : 'Trip Details';
            this.el.mobilePageTitle.textContent = title;

            // Update active nav link
            this.el.navLinks.forEach(link => {
              link.classList.toggle('active', link.dataset.page === pageId);
            });
            
            // Close sidebar on mobile
            this.toggleSidebar(false);

            // Re-render content for the new page
            switch (pageId) {
              case 'dashboard-page':
                this.renderDashboard();
                break;
              case 'all-trips-page':
                this.renderAllTrips();
                break;
              case 'all-memories-page':
                this.renderAllMemories();
                break;
              case 'trip-details-page':
                // This is handled when a trip is clicked
                break;
              case 'explore-page':
                this.renderExplore();
                break;
              case 'tour-guide-page':
                // Static content, but we init tilt
                break;
            }
            
            // Re-init tilt for any new cards
            this.initVanillaTilt();
            
          } else {
            console.error(`Page not found: ${pageId}`);
            this.navigate('dashboard-page'); // Fallback
          }
        },
        
        toggleSidebar(forceState) {
          if (window.innerWidth < 768) { // Only on mobile
            this.state.isSidebarOpen = (forceState !== undefined) ? forceState : !this.state.isSidebarOpen;
            this.el.sidebar.classList.toggle('open', this.state.isSidebarOpen);
            this.el.sidebarOverlay.classList.toggle('open', this.state.isSidebarOpen);
          }
        },
        
        toggleSidebarCollapse() {
          if (window.innerWidth >= 768) { // Only on desktop
            this.el.mainApp.classList.toggle('sidebar-collapsed');
            // Re-render icons after transition finishes
            setTimeout(() => this.renderIcons(), 300);
          }
        },
        
        /**
         * ----------------------------------------------------------------
         * Page Renderers
         * ----------------------------------------------------------------
         */
         
        renderDashboard() {
          // 1. Calculate Stats
          const completedTasks = this.state.trips.reduce((acc, trip) => acc + trip.tasks.filter(t => t.completed).length, 0);
          const totalTasks = this.state.trips.reduce((acc, trip) => acc + trip.tasks.length, 0);
          const totalCarbon = this.state.trips.reduce((acc, trip) => acc + trip.carbon.reduce((cAcc, c) => cAcc + c.co2, 0), 0);
          
          // 2. Update Stat Cards
          this.el.statTotalTrips.textContent = this.state.trips.length;
          this.el.statTotalTasks.textContent = `${completedTasks}/${totalTasks}`;
          this.el.statTotalCarbon.textContent = `${totalCarbon.toFixed(0)} kg`;
          
          // 3. Render Upcoming Trips
          const upcomingTrips = this.state.trips
            .filter(trip => new Date(trip.date) > new Date())
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .slice(0, 3);
            
          if (upcomingTrips.length === 0) {
            this.el.dashboardUpcomingTrips.innerHTML = `<p class="text-gray-500 dark:text-gray-400">No upcoming trips. Time to plan one!</p>`;
          } else {
            this.el.dashboardUpcomingTrips.innerHTML = upcomingTrips.map(trip => `
              <div class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer" onclick="App.openTripDetails(${trip.id})">
                <div>
                  <p class="font-semibold text-gray-800 dark:text-white">${trip.title}</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400">${new Date(trip.date).toDateString()}</p>
                </div>
                <i data-lucide="chevron-right" class="icon-md text-gray-400"></i>
              </div>
            `).join('');
          }
          
          // 4. Render Recent Memories
          const recentMemories = this.state.trips
            .flatMap(trip => trip.memories.map(mem => ({ ...mem, tripId: trip.id, tripTitle: trip.title })))
            .slice(-6); // Get last 6
            
          if (recentMemories.length === 0) {
            this.el.dashboardRecentMemories.innerHTML = `<p class="col-span-3 text-gray-500 dark:text-gray-400">No memories added yet.</p>`;
          } else {
            this.el.dashboardRecentMemories.innerHTML = recentMemories.map(mem => `
              <div class="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 flex-col p-2 cursor-pointer group relative" onclick="App.openTripDetails(${mem.tripId}, 'memories')">
                <i data-lucide="${mem.type === 'image' ? 'image' : 'video'}" class="icon-lg"></i>
                <span class="text-xs text-center truncate w-full" title="${mem.name}">${mem.name}</span>
                <div class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span class="text-white text-xs text-center">${mem.tripTitle}</span>
                </div>
              </div>
            `).join('');
          }
          
          this.renderIcons();
        },

        renderAllTrips(filter = 'all') {
          // Update active filter button
          this.el.tripFilterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
          });
          
          const filteredTrips = this.state.trips.filter(trip => {
            if (filter === 'all') return true;
            return trip.type === filter;
          });
          
          if (filteredTrips.length === 0) {
            this.el.tripListContainer.innerHTML = `<div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg text-center text-gray-500 dark:text-gray-400">
              No ${filter !== 'all' ? filter : ''} trips found.
            </div>`;
            return;
          }
          
          this.el.tripListContainer.innerHTML = filteredTrips.map(trip => {
            const completed = trip.tasks.filter(t => t.completed).length;
            const total = trip.tasks.length;
            const carbon = trip.carbon.reduce((acc, c) => acc + c.co2, 0);
            
            return `
              <div class="tilt-card bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden cursor-pointer relative" onclick="App.openTripDetails(${trip.id})">
                <button class="absolute top-4 right-4 text-red-400 hover:text-red-600 z-10 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/50" onclick="event.stopPropagation(); App.deleteTrip(${trip.id})">
                  <i data-lucide="trash-2" class="icon-md"></i>
                </button>
                <div class="p-6">
                  <div class="flex justify-between items-start">
                    <div>
                      <span class="text-xs font-semibold uppercase px-2 py-0.5 rounded-full ${trip.type === 'short' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200'}">
                        ${trip.type}
                      </span>
                      <h3 class="text-2xl font-bold text-gray-900 dark:text-white mt-2">${trip.title}</h3>
                      <p class="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
                        <i data-lucide="calendar" class="icon-sm mr-1.5"></i>
                        ${new Date(trip.date).toDateString()}
                      </p>
                    </div>
                    <i data-lucide="chevron-right" class="icon-lg text-gray-400 mt-1"></i>
                  </div>
                  <div class="flex space-x-4 mt-4 text-center">
                    <div>
                      <p class="font-bold text-lg text-blue-600 dark:text-blue-400">${completed}/${total}</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">Tasks</p>
                    </div>
                    <div>
                      <p class="font-bold text-lg text-green-600 dark:text-green-400">${carbon.toFixed(0)}<span class="text-sm">kg</span></p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">CO₂</p>
                    </div>
                    <div>
                      <p class="font-bold text-lg text-red-500 dark:text-red-400">${trip.memories.length}</p>
                      <p class="text-xs text-gray-500 dark:text-gray-400">Memories</p>
                    </div>
                  </div>
                </div>
              </div>
            `;
          }).join('');
          
          this.renderIcons();
          this.initVanillaTilt();
        },
        
        renderAllMemories() {
          const allMemories = this.state.trips.flatMap(trip => 
            trip.memories.map(mem => ({ ...mem, tripId: trip.id, tripTitle: trip.title }))
          );
          
          if (allMemories.length === 0) {
            this.el.allMemoriesContainer.innerHTML = `<p class="col-span-full text-center text-gray-500 dark:text-gray-400">No memories found. Add some to your trips!</p>`;
            return;
          }

          this.el.allMemoriesContainer.innerHTML = allMemories.map(mem => `
            <div class="memory-card aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 flex-col p-2 relative group cursor-pointer" data-trip-id="${mem.tripId}">
              <i data-lucide="${mem.type === 'image' ? 'image' : 'video'}" class="icon-lg"></i>
              <span class="text-xs text-center truncate w-full mt-1" title="${mem.name}">${mem.name}</span>
              <span class="absolute bottom-2 left-2 text-xs font-semibold text-white bg-black/50 px-1.5 py-0.5 rounded">${mem.tripTitle}</span>
            </div>
          `).join('');
          
          this.renderIcons();
        },
        
        deleteTrip(id) {
          // If id is not passed (from details page), get from state
          const tripId = id || this.state.currentTripId; 
          if (!tripId) return;
          
          const trip = this.state.trips.find(t => t.id === tripId);
          if (!trip) return;
          
          if (confirm(`Are you sure you want to permanently delete the trip "${trip.title}"?`)) {
            this.state.trips = this.state.trips.filter(t => t.id !== tripId);
            this.saveUserData();
            
            // If we were on the details page, go back. Otherwise, re-render all trips.
            if (this.state.currentPage === 'trip-details-page') {
              this.navigate('all-trips-page');
            } else {
              this.renderAllTrips();
            }
            
            this.showToast('Trip deleted.', 'info');
          }
        },

        filterTrips(event) {
          const filter = event.target.dataset.filter;
          this.renderAllTrips(filter);
        },
        
        openTripDetails(tripId, defaultTab = 'tasks') {
          this.state.currentTripId = tripId;
          this.renderTripDetails();
          this.navigate('trip-details-page');
          this.switchTripTab(null, defaultTab); // Default to tasks tab, or specified tab
        },
        
        renderTripDetails() {
          const trip = this.state.trips.find(t => t.id === this.state.currentTripId);
          if (!trip) {
            this.showToast('Could not find trip.', 'error');
            this.navigate('all-trips-page');
            return;
          }
          
          this.el.tripDetailsTitle.textContent = trip.title;
          
          // Render all content, even if hidden, so tabs work
          this.renderTasks(trip);
          this.renderCarbon(trip);
          this.renderReminders(trip);
          this.renderMemories(trip);
        },
        
        renderTasks(trip) {
          const completed = trip.tasks.filter(t => t.completed).length;
          const total = trip.tasks.length;
          const percentage = total > 0 ? (completed / total) * 100 : 0;
          
          // Update Progress Circle
          const circle = this.el.taskProgressCircle;
          if (circle) {
            const radius = circle.r.baseVal.value;
            const circumference = radius * 2 * Math.PI;
            const offset = circumference - (percentage / 100) * circumference;
            circle.style.strokeDasharray = `${circumference} ${circumference}`;
            circle.style.strokeDashoffset = offset;
            this.el.taskProgressText.textContent = `${Math.round(percentage)}%`;
          }
          
          // Render Task List
          if (total === 0) {
            this.el.taskList.innerHTML = `<p class="text-gray-500 dark:text-gray-400 text-center">No tasks added yet.</p>`;
          } else {
            this.el.taskList.innerHTML = trip.tasks.map(task => `
              <div class="flex items-center p-3 rounded-lg ${task.completed ? 'bg-green-50 dark:bg-green-900/50' : 'bg-gray-50 dark:bg-gray-700'}">
                <button class="task-toggle-btn" data-task-id="${task.id}">
                  <i data-lucide="${task.completed ? 'check-square' : 'square'}" class="icon-lg ${task.completed ? 'text-green-500' : 'text-gray-400'}"></i>
                </button>
                <span class="flex-1 mx-3 ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200'}">
                  ${task.text}
                </span>
                <button class="task-delete-btn" data-task-id="${task.id}">
                  <i data-lucide="trash-2" class="icon-md text-red-500 hover:text-red-700"></i>
                </button>
              </div>
            `).join('');
          }
          this.renderIcons();
        },

        renderCarbon(trip) {
          const totalCO2 = trip.carbon.reduce((sum, entry) => sum + entry.co2, 0);
          this.el.carbonTotalText.innerHTML = `${totalCO2.toFixed(1)} <span class="text-lg">kg CO₂</span>`;
          
          if (trip.carbon.length === 0) {
            this.el.carbonList.innerHTML = `<p class="text-gray-500 dark:text-gray-400 text-center text-sm">No entries added.</p>`;
          } else {
            this.el.carbonList.innerHTML = trip.carbon.map(entry => `
              <div class="flex justify-between p-2 bg-gray-50 rounded-lg dark:bg-gray-700">
                <span class="text-gray-700 dark:text-gray-200">${entry.activity}</span>
                <div class="flex items-center">
                  <span class="font-medium text-gray-800 dark:text-white mr-2">${entry.co2.toFixed(1)} kg</span>
                  <button class="carbon-delete-btn" data-entry-id="${entry.id}">
                    <i data-lucide="trash-2" class="icon-sm text-red-500 hover:text-red-700"></i>
                  </button>
                </div>
              </div>
            `).join('');
          }
          this.renderIcons();
        },
        
        renderReminders(trip) {
          if (trip.reminders.length === 0) {
            this.el.reminderList.innerHTML = `<p class="text-gray-500 dark:text-gray-400 text-center text-sm">No reminders set.</p>`;
          } else {
            this.el.reminderList.innerHTML = trip.reminders.map(rem => `
              <div class="flex justify-between p-2 bg-gray-50 rounded-lg dark:bg-gray-700">
                <div>
                  <p class="text-gray-700 dark:text-gray-200">${rem.text}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">${new Date(rem.datetime).toLocaleString()}</p>
                </div>
                <button class="reminder-delete-btn" data-entry-id="${rem.id}">
                  <i data-lucide="trash-2" class="icon-sm text-red-500 hover:text-red-700"></i>
                </button>
              </div>
            `).join('');
          }
          this.renderIcons();
        },
        
        renderMemories(trip) {
          if (trip.memories.length === 0) {
            this.el.memoryList.innerHTML = `<p class="col-span-3 text-gray-500 dark:text-gray-400 text-center text-sm">No memories uploaded.</p>`;
          } else {
            this.el.memoryList.innerHTML = trip.memories.map(mem => `
              <div class="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400 flex-col p-1 relative group">
                <i data-lucide="${mem.type === 'image' ? 'image' : 'video'}" class="icon-lg"></i>
                <span class="text-xs text-center truncate w-full mt-1" title="${mem.name}">${mem.name}</span>
                <button class="memory-delete-btn absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity" data-entry-id="${mem.id}">
                  <i data-lucide="trash-2" class="icon-xs"></i>
                </button>
              </div>
            `).join('');
          }
          this.renderIcons();
        },
        
        renderExplore() {
          const searchTerm = this.el.exploreSearchInput.value.toLowerCase();
          
          const createList = (title, icon, locations) => {
            const filtered = locations.filter(loc => 
              loc.name.toLowerCase().includes(searchTerm) || 
              loc.description.toLowerCase().includes(searchTerm)
            );
            
            if (filtered.length === 0) return '';
            
            return `
              <section class="mb-8">
                <h2 class="text-2xl font-bold mb-4 flex items-center text-gray-800 dark:text-white">
                  <i data-lucide="${icon}" class="icon-lg mr-2"></i>
                  ${title}
                </h2>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  ${filtered.map((loc, index) => `
                    <div class="tilt-card explore-card bg-white dark:bg-gray-800 rounded-2xl shadow-lg cursor-pointer" data-category="${title.toLowerCase().split(' ')[0]}" data-index="${index}">
                      <div class="p-6">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white">${loc.name}</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">${loc.description}</p>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </section>
            `;
          };
          
          this.el.exploreListsContainer.innerHTML = [
            createList('Popular in India', 'map-pin', this.state.locations.india),
            createList('International Hotspots', 'globe', this.state.locations.international),
            createList('World Heritage Sites', 'landmark', this.state.locations.worldHeritage)
          ].join('');
          
          this.renderIcons();
          this.initVanillaTilt();
        },

        /**
         * ----------------------------------------------------------------
         * Event Handlers
         * ----------------------------------------------------------------
         */

        switchTripTab(event, forceTab) {
          const tabName = forceTab || event.currentTarget.dataset.tab;
          
          this.el.tripTabButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
          });
          
          this.el.tripTabContents.forEach(content => {
            // This logic is tricky. In a col-span layout, we can't just hide.
            // We adjust visibility/presence based on which tab is active.
            const contentName = content.id.replace('tab-content-', '');
            
            if (window.innerWidth >= 1024) { // Desktop layout
              if (tabName === 'tasks') {
                content.style.display = (contentName === 'tasks') ? 'block' : 'none';
              } else {
                content.style.display = (contentName === 'tasks') ? 'none' : (contentName === tabName ? 'block' : 'none');
              }
            } else { // Mobile layout
              content.style.display = (contentName === tabName) ? 'block' : 'none';
            }
          });
          
          // Re-adjust for desktop view
          if (window.innerWidth >= 1024) {
             document.getElementById('tab-content-tasks').style.display = 'block';
             if (tabName === 'tasks') {
               document.getElementById('tab-content-carbon').style.display = 'none';
               document.getElementById('tab-content-scheduler').style.display = 'none';
               document.getElementById('tab-content-memories').style.display = 'none';
             } else {
               document.getElementById(`tab-content-${tabName}`).style.display = 'block';
             }
          }
        },

        handleTask(event, action) {
          event.preventDefault();
          const trip = this.state.trips.find(t => t.id === this.state.currentTripId);
          if (!trip) return;

          if (action === 'add') {
            const text = this.el.addTaskInput.value.trim();
            if (text) {
              trip.tasks.push({ id: Date.now(), text, completed: false });
              this.el.addTaskInput.value = '';
              this.showToast('Task added!', 'success');
            }
          } 
          else if (action === 'click') {
            const toggleBtn = event.target.closest('.task-toggle-btn');
            const deleteBtn = event.target.closest('.task-delete-btn');
            
            if (toggleBtn) {
              const taskId = Number(toggleBtn.dataset.taskId);
              const task = trip.tasks.find(t => t.id === taskId);
              if (task) task.completed = !task.completed;
            }
            if (deleteBtn) {
              const taskId = Number(deleteBtn.dataset.taskId);
              trip.tasks = trip.tasks.filter(t => t.id !== taskId);
              this.showToast('Task removed.', 'info');
            }
          }
          
          this.renderTasks(trip);
          this.saveUserData();
        },
        
        handleCarbon(event, action) {
          event.preventDefault();
          const trip = this.state.trips.find(t => t.id === this.state.currentTripId);
          if (!trip) return;
          
          if (action === 'add') {
            const activity = this.el.addCarbonActivity.value.trim();
            const co2 = parseFloat(this.el.addCarbonCo2.value);
            if (activity && co2 > 0) {
              trip.carbon.push({ id: Date.now(), activity, co2 });
              this.el.addCarbonActivity.value = '';
              this.el.addCarbonCo2.value = '';
              this.showToast('Carbon entry added.', 'success');
            } else {
              this.showToast('Please enter valid activity and CO2.', 'error');
            }
          }
          else if (action === 'click') {
            const deleteBtn = event.target.closest('.carbon-delete-btn');
            if (deleteBtn) {
              const entryId = Number(deleteBtn.dataset.entryId);
              trip.carbon = trip.carbon.filter(c => c.id !== entryId);
              this.showToast('Carbon entry removed.', 'info');
            }
          }
          
          this.renderCarbon(trip);
          this.saveUserData();
        },
        
        handleReminder(event, action) {
          event.preventDefault();
          const trip = this.state.trips.find(t => t.id === this.state.currentTripId);
          if (!trip) return;
          
          if (action === 'add') {
            const text = this.el.addReminderText.value.trim();
            const datetime = this.el.addReminderDatetime.value;
            if (text && datetime) {
              trip.reminders.push({ id: Date.now(), text, datetime });
              this.el.addReminderText.value = '';
              this.el.addReminderDatetime.value = '';
              this.showToast('Reminder set!', 'success');
            } else {
              this.showToast('Please enter text and date/time.', 'error');
            }
          }
          else if (action === 'click') {
            const deleteBtn = event.target.closest('.reminder-delete-btn');
            if (deleteBtn) {
              const entryId = Number(deleteBtn.dataset.entryId);
              trip.reminders = trip.reminders.filter(r => r.id !== entryId);
              this.showToast('Reminder removed.', 'info');
            }
          }
          
          this.renderReminders(trip);
          this.saveUserData();
        },
        
       handleMemory(event, action) {
            event.preventDefault();
            const trip = this.state.trips.find(t => t.id === this.state.currentTripId);
            if (!trip) return;

            if (action === 'add') {
                const files = this.el.addMemoryInput.files;
                if (files.length === 0) return;

                // --- START Memory Limit Logic (Free Tier) ---
                const MAX_IMAGES = 10;
                const MAX_VIDEOS = 2;

                const currentImages = trip.memories.filter(m => m.type === 'image').length;
                const currentVideos = trip.memories.filter(m => m.type === 'video').length;

                let incomingImages = 0;
                let incomingVideos = 0;

                // First, count how many new images/videos are being uploaded
                for (const file of files) {
                    if (file.type.startsWith('image/')) {
                        incomingImages++;
                    } else if (file.type.startsWith('video/')) {
                        incomingVideos++;
                    }
                }
                
                // Check if the total will exceed the limits
                if (currentImages + incomingImages > MAX_IMAGES || currentVideos + incomingVideos > MAX_VIDEOS) {
                    let message = `Free limit reached. Max ${MAX_IMAGES} photos and ${MAX_VIDEOS} videos allowed.`;
                    message += ` To add more, please subscribe for 4000 rs per year.`;

                    this.el.addMemoryInput.value = ''; // Clear file input
                    this.showToast(message, 'error');
                    return; // Stop the upload process
                }
                // --- END Memory Limit Logic ---

                for (const file of files) {
                    const type = file.type.startsWith('image/') ? 'image' : 'video';
                    trip.memories.push({ id: Date.now(), name: file.name, type });
                }
                this.showToast(`${files.length} memor${files.length > 1 ? 'ies' : 'y'} added.`, 'success');

            } else if (action === 'click') {
                const deleteBtn = event.target.closest('.memory-delete-btn');
                if (deleteBtn) {
                    const entryId = Number(deleteBtn.dataset.entryId);
                    trip.memories = trip.memories.filter(m => m.id !== entryId);
                    this.showToast('Memory removed.', 'info');
                }
            }
            
            this.renderMemories(trip);
            this.saveUserData();
        },
        
        handleExploreClick(event) {
          const card = event.target.closest('.explore-card');
          if (!card) return;
          
          const categoryKeyMap = {
            'popular': 'india',
            'international': 'international',
            'world': 'worldHeritage'
          };
          const category = card.dataset.category;
          const categoryKey = categoryKeyMap[category];
          
          const index = Number(card.dataset.index);
          const location = this.state.locations[categoryKey][index];
          
          if (location) {
            this.showLocationModal(location);
          }
        },

        showAddTripModal() {
          this.el.modalTitle.textContent = 'Plan a New Trip';
          this.el.modalBody.innerHTML = `
            <form id="new-trip-form" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Trip Title</label>
                <input id="new-trip-title" type="text" placeholder="e.g., Paris Adventure" required class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
                <input id="new-trip-date" type="date" required class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:[color-scheme:dark]">
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">Trip Type</label>
                <select id="new-trip-type" class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="short">Short Trip</option>
                  <option value="long">Long Trip</option>
                </select>
              </div>
              <button type="submit" class="w-full py-3 px-4 rounded-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Create Trip</button>
            </form>
          `;
          this.el.modalContainer.classList.add('open');
          
          // Add listener to the new form
          document.getElementById('new-trip-form').addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('new-trip-title').value;
            const date = document.getElementById('new-trip-date').value;
            const type = document.getElementById('new-trip-type').value;
            
            if (title && date && type) {
              const newTrip = {
                id: Date.now(),
                title,
                date,
                type,
                tasks: [], carbon: [], reminders: [], memories: []
              };
              this.state.trips.push(newTrip);
              this.saveUserData();
              this.renderAllTrips();
              this.hideModal();
              this.showToast('Trip created successfully!', 'success');
            }
          });
        },
        
        showLocationModal(location) {
          this.el.modalTitle.textContent = location.name;
          this.el.modalBody.innerHTML = `
            <p class="text-gray-600 dark:text-gray-300 mb-6">
              ${location.detailedDescription || location.description}
            </p>
            
            ${location.activities && location.activities.length > 0 ? `
              <div>
                <h4 class="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
                  <i data-lucide="activity" class="icon-md mr-2 text-blue-500"></i>
                  Things to Do
                </h4>
                <ul class="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                  ${location.activities.map(activity => `<li>${activity}</li>`).join('')}
                </ul>
              </div>
            ` : ''}
          `;
          this.el.modalContainer.classList.add('open');
          this.renderIcons(); // Render icons inside the new modal
        },
        
        hideModal() {
          this.el.modalContainer.classList.remove('open');
        },

        /**
         * ----------------------------------------------------------------
         * UI Utilities
         * ----------------------------------------------------------------
         */
        
        showToast(message, type = 'success') {
          if (this.state.toastTimer) {
            clearTimeout(this.state.toastTimer);
          }
          
          if (!message) {
            this.el.toast.classList.remove('show');
            return;
          }

          // Set message
          this.el.toastMessage.textContent = message;
          
          // Set icon and color
          const iconContainer = this.el.toastIcon;
          let iconName;
          if (type === 'success') {
            iconContainer.className = "inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200";
            iconName = 'check';
          } else if (type === 'error') {
            iconContainer.className = "inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200";
            iconName = 'alert-triangle';
          } else { // info
            iconContainer.className = "inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-blue-500 bg-blue-100 rounded-lg dark:bg-blue-800 dark:text-blue-200";
            iconName = 'info';
          }
          iconContainer.innerHTML = `<i data-lucide="${iconName}" class="icon-md"></i>`;
          
          // Show toast
          this.el.toast.classList.add('show');
          this.renderIcons(); // Render toast icon
          
          // Hide after 3 seconds
          this.state.toastTimer = setTimeout(() => {
            this.el.toast.classList.remove('show');
          }, 3000);
        },

        toggleDarkMode() {
          this.state.isDarkMode = !this.state.isDarkMode;
          this.updateDarkMode(this.state.isDarkMode);
          this.saveGlobalState(); // Save dark mode to global state
        },
        
        updateDarkMode(isDark) {
          this.el.darkModeToggle.checked = isDark;
          if (isDark) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        },
        
        showLoading(isLoading) {
          this.el.loadingOverlay.classList.toggle('open', isLoading);
        },
        
        initVanillaTilt() {
          VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
            max: 10,
            speed: 400,
            glare: true,
            "max-glare": 0.25,
          });
        },

        /**
         * ----------------------------------------------------------------
         * Icon Renderer
         * ----------------------------------------------------------------
         */
        renderIcons() {
          // This is the core fix: Use the vanilla 'lucide' library
          // Make sure lucide is available
          if (typeof lucide !== 'undefined') {
            lucide.createIcons();
          } else {
            console.error('Lucide library not loaded.');
          }
        },
      };

      // Expose App to global scope for inline event handlers
      window.App = App;

      // Start the app
      // We moved scripts to the end of <body>, so DOM is ready
      // and libraries are loaded.
      App.init();

    })();