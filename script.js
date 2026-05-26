/* ============================================================
   ARYAN PANGE — Comic Noir Portfolio
   JavaScript: All Interactive Effects
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ── 1. Global Canvas Particle Dots Effect ────────────────
    const canvas = document.getElementById('global-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const PARTICLE_COUNT = 200;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 1.5,
                vy: (Math.random() - 0.5) * 1.5,
                radius: Math.random() * 3.5 + 1
            });
        }

        let mouse = { x: null, y: null };

        window.addEventListener('mousemove', e => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(p => {
                // Move
                p.x += p.vx;
                p.y += p.vy;

                // Bounce off walls
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                // Mouse repulsion
                if (mouse.x !== null && mouse.y !== null) {
                    let dx = mouse.x - p.x;
                    let dy = mouse.y - p.y;
                    let dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 150) {
                        p.x -= (dx / dist) * 2;
                        p.y -= (dy / dist) * 2;
                    }
                }

                // Draw
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(255, 0, 0, 0.8)';
                ctx.fill();
            });

            requestAnimationFrame(drawParticles);
        }

        drawParticles();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // ── 2. Tilt / 3D Perspective Effect ──────────────────────
    document.querySelectorAll('.tilt-effect').forEach(panel => {
        panel.addEventListener('mousemove', e => {
            const rect = panel.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;
            panel.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        panel.addEventListener('mouseleave', () => {
            panel.style.transform = '';
        });
    });

    // ── 3. Scroll Pop-in Animations ──────────────────────────
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.pop-in').forEach(el => observer.observe(el));

    // ── 4. Education Toggle ──────────────────────────────────
    const eduBtn = document.getElementById('edu-next-btn');
    if (eduBtn) {
        eduBtn.addEventListener('click', () => {
            const details = document.getElementById('edu-details');
            details.classList.toggle('expanded');
            eduBtn.textContent = details.classList.contains('expanded')
                ? 'Hide Details'
                : 'Explore Journey';
        });
    }

    // ── 5. Certifications Toggle ─────────────────────────────
    const certsBtn = document.getElementById('certs-btn');
    if (certsBtn) {
        certsBtn.addEventListener('click', () => {
            const moreCerts = document.getElementById('more-certs');
            moreCerts.classList.toggle('show');
            certsBtn.textContent = moreCerts.classList.contains('show')
                ? 'Hide Details'
                : 'View More';
        });
    }

    // ── 6. Past Archives (Internships) Toggle ────────────────
    const pastTrigger = document.getElementById('past-archives-trigger');
    if (pastTrigger) {
        pastTrigger.addEventListener('click', () => {
            const panel = document.getElementById('internships-panel');
            panel.classList.toggle('expanded');
        });
    }

    // ── 7. Internship Entry Toggles ──────────────────────────
    const internEntries = document.querySelectorAll('.intern-entry');
    internEntries.forEach(entry => {
        entry.addEventListener('click', () => {
            const details = entry.querySelector('.toggle-content');
            if (details) {
                details.classList.toggle('expanded');
            }
        });
    });

    // ── 8. Spotlight X-Ray Effect Tracking ───────────────────
    const spotlightLayer = document.getElementById('spotlight-layer');
    if (spotlightLayer) {
        window.addEventListener('mousemove', e => {
            requestAnimationFrame(() => {
                spotlightLayer.style.setProperty('--mouse-x', `${e.clientX}px`);
                spotlightLayer.style.setProperty('--mouse-y', `${e.clientY}px`);
            });
        });
    }

    // ── 9. Mobile Menu Toggle ────────────────────────────────
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('open');

            // Animate hamburger → X
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (navLinks.classList.contains('open')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            });
        });
    }

    // ── 10. Email Button — Copy, Dropdown, and Open Mail ─────
    const emailBtn = document.getElementById('email-btn');
    const emailDropdown = document.getElementById('email-dropdown');
    const emailCopiedMsg = document.getElementById('email-copied-msg');

    if (emailBtn && emailDropdown) {
        emailBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const email = 'aryanpange010@gmail.com';

            // Copy to clipboard
            navigator.clipboard.writeText(email).then(() => {
                // Show dropdown
                emailDropdown.classList.add('show');

                // Flash the "Copied!" text
                if (emailCopiedMsg) {
                    emailCopiedMsg.classList.add('flash');
                    setTimeout(() => emailCopiedMsg.classList.remove('flash'), 2000);
                }

                // Hide dropdown after 3s
                setTimeout(() => emailDropdown.classList.remove('show'), 3000);
            }).catch(() => {
                // Fallback: still show dropdown
                emailDropdown.classList.add('show');
                setTimeout(() => emailDropdown.classList.remove('show'), 3000);
            });

            // Also open the default email client
            window.location.href = 'mailto:' + email;
        });
    }

    // ── 11. Smooth scroll for nav links ──────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        // Skip the email button — it has its own handler
        if (anchor.id === 'email-btn') return;

        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
