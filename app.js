document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const views = document.querySelectorAll('.view');
    const mainNav = document.getElementById('main-nav');

    // Function to switch views
    function switchView(targetId) {
        // Remove active class from all navigation links
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Add active class to clicked links (could be multiple e.g. mobile & desktop)
        const activeLinks = document.querySelectorAll(`.nav-link[data-target="${targetId}"]`);
        activeLinks.forEach(link => link.classList.add('active'));

        // Hide all views
        views.forEach(view => {
            view.classList.remove('active');
            view.classList.add('hidden'); // hidden class can be used if needed, but styling uses specific display logic
        });

        // Show target view
        const targetView = document.getElementById(targetId);
        if (targetView) {
            targetView.classList.remove('hidden');
            targetView.classList.add('active');
        }

        // Handle Navbar visibility (Hide completely on login page for better UX)
        if (targetId === 'login') {
            mainNav.style.display = 'none';
        } else {
            mainNav.style.display = 'block';
        }
        
        // Scroll to top on view change
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Add click event listeners to all navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-target');
            if (targetId) {
                switchView(targetId);
            }
        });
    });

    // Handle Login Form Submission (Mock Authentication)
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate successful login and redirect to Home
            switchView('home');
            
            // Update auth button to represent Logout state
            const authBtn = document.getElementById('auth-btn');
            if (authBtn) {
                authBtn.innerHTML = '<i class="ph ph-sign-out"></i> Logout';
                // Mock logout logic
                const handleLogout = (e) => {
                    e.preventDefault();
                    e.stopPropagation(); // prevent triggering nav-link click logic that switches view directly
                    switchView('login');
                    authBtn.innerHTML = 'Login';
                    authBtn.removeEventListener('click', handleLogout);
                };
                
                // Need to override the standard nav behavior for this specific button when it's logout
                authBtn.addEventListener('click', handleLogout);
            }
        });
    }

    // Initialize Application
    // Start on the login page as required by the typical app flow
    switchView('login');
});
