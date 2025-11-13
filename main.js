// Ensure the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
	// Scroll to top on page reload and remove hash from URL
	window.history.scrollRestoration = 'manual'; // prevent browser from restoring scroll
	window.scrollTo(0, 0); // go to top

	// Optional: clear hash if URL has one
	if (window.location.hash) {
		history.replaceState(null, null, ' '); // removes hash without reloading
	}

	// =========================
	// 1. GSAP Animations
	// =========================
	if (typeof gsap !== 'undefined') {
		gsap.from('header', { y: -100, opacity: 0, duration: 1 });
		gsap.from('.hero-content h1', { opacity: 0, y: 30, duration: 1 });
		gsap.from('.hero-content h2', { opacity: 0, y: 30, delay: 0.3 });
		gsap.from('.hero-content p', { opacity: 0, y: 30, delay: 0.6 });
		gsap.from('.hero-content a', { opacity: 0, y: 30, delay: 0.9 });
	}

	// =========================
	// 2. Contact Form Reset
	// =========================
	const form = document.querySelector('.contact-form');
	if (form) {
		form.addEventListener('submit', (e) => {
			// Optional: delay to allow Formspree or other service to process
			setTimeout(() => {
				form.reset(); // Clear all fields after submission
			}, 500);
		});
	}

	// =========================
	// 3. Scroll Spy / Active Nav
	// =========================
	const header = document.querySelector('header');
	const sections = document.querySelectorAll('section');
	const navLinks = document.querySelectorAll('nav a');

	// Dynamically get header height (works with vh units)
	function getHeaderHeight() {
		return header ? header.getBoundingClientRect().height : 0;
	}

	// ---- CLICK HANDLER ----
	navLinks.forEach((link) => {
		link.addEventListener('click', (e) => {
			// Remove "active" from all links
			navLinks.forEach((link) => link.classList.remove('active'));
			// Delay adding "active" to allow scroll animation to complete
			setTimeout(() => {
				// Add "active" to the clicked one
				link.classList.add('active');
			}, 1000);
		});
	});

	// ---- SCROLL SPY ----
	window.addEventListener('scroll', () => {
		let currentSection = '';
		const headerHeight = getHeaderHeight();

		sections.forEach((section) => {
			const sectionTop = section.offsetTop - headerHeight - 5;
			const sectionHeight = section.offsetHeight;
			if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
				currentSection = section.getAttribute('id');
			}
		});

		// Update active state
		navLinks.forEach((link) => {
			link.classList.remove('active');
			if (link.getAttribute('href') === '#' + currentSection) {
				link.classList.add('active');
			}
		});
	});
});
