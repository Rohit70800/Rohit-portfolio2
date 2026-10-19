/**
 * ==========================================================================
 * ROHIT PRAJAPATI - PORTFOLIO INTERACTIVE SCRIPT
 * Beginner-friendly, well-structured, modern JavaScript
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ----------------------------------------------------------------------
       1. Elements Selection
       ---------------------------------------------------------------------- */
    const navbar = document.getElementById('navbar');
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-item');
    const typedTextSpan = document.getElementById('typedText');
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');
    const toast = document.getElementById('toast');
    const copyButtons = document.querySelectorAll('.copy-btn');
    const currentYearSpan = document.getElementById('currentYear');
    const profileImg = document.getElementById('profileImg');

    /* ----------------------------------------------------------------------
       2. Dynamic Copyright Year
       ---------------------------------------------------------------------- */
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    /* ----------------------------------------------------------------------
       3. Typewriter Effect for Hero Subtitle
       ---------------------------------------------------------------------- */
    const roles = [
        "Computer Engineering Diploma Student",
        "Aspiring Web Developer | Fresher",
        "Student at Seth Jai Prakash Polytechnic, Damla",
        "Seeking Entry-Level Jobs & Internships"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const delayBetweenRoles = 2000;

    function typeWriter() {
        if (!typedTextSpan) return;

        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typedTextSpan.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typedTextSpan.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let currentSpeed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentRole.length) {
            // Finished typing word, wait before starting to delete
            currentSpeed = delayBetweenRoles;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting word, move to next role
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            currentSpeed = 500;
        }

        setTimeout(typeWriter, currentSpeed);
    }

    // Start typewriter
    setTimeout(typeWriter, 800);

    /* ----------------------------------------------------------------------
       4. Navbar Scroll Effect & Active Section Spy
       ---------------------------------------------------------------------- */
    function handleScroll() {
        if (navbar) {
            if (window.scrollY > 40) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Active link highlighting on scroll
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 140;
        const isBottom = (window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 60);

        if (isBottom) {
            navItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#contact') {
                    link.classList.add('active');
                }
            });
            return;
        }

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    /* ----------------------------------------------------------------------
       5. Mobile Navigation Menu Toggle
       ---------------------------------------------------------------------- */
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile nav when clicking a link
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('open');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });

        // Close mobile nav when clicking outside
        document.addEventListener('click', (e) => {
            if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                const icon = mobileToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }

    /* ----------------------------------------------------------------------
       6. Toast Notification Helper
       ---------------------------------------------------------------------- */
    let toastTimeout;
    function showToast(message, duration = 3000) {
        if (!toast) return;

        toast.textContent = message;
        toast.classList.add('show');

        clearTimeout(toastTimeout);
        toastTimeout = setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    }

    /* ----------------------------------------------------------------------
       7. Copy to Clipboard Functionality
       ---------------------------------------------------------------------- */
    copyButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const textToCopy = button.getAttribute('data-copy');
            if (!textToCopy) return;

            try {
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    await navigator.clipboard.writeText(textToCopy);
                } else {
                    // Fallback for older browsers
                    const textarea = document.createElement('textarea');
                    textarea.value = textToCopy;
                    textarea.style.position = 'fixed';
                    textarea.style.opacity = '0';
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textarea);
                }

                // Temporary icon feedback
                const icon = button.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-copy');
                    icon.classList.add('fa-check');
                    setTimeout(() => {
                        icon.classList.remove('fa-check');
                        icon.classList.add('fa-copy');
                    }, 2000);
                }

                showToast(`✓ Copied: ${textToCopy}`);
            } catch (err) {
                console.error('Copy failed:', err);
                showToast(`Could not auto-copy: ${textToCopy}`);
            }
        });
    });

    /* ----------------------------------------------------------------------
       8. Interactive Contact Form Submission
       ---------------------------------------------------------------------- */
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                if (formFeedback) {
                    formFeedback.className = 'form-feedback error';
                    formFeedback.textContent = 'Please fill out all required fields.';
                }
                return;
            }

            // Construct email mailto link for direct user messaging
            const mailtoSubject = encodeURIComponent(`[Portfolio Inquiry] ${subject || 'New Message'}`);
            const mailtoBody = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            const mailtoUrl = `mailto:rohit8381964035@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

            if (formFeedback) {
                formFeedback.className = 'form-feedback success';
                formFeedback.innerHTML = `Thank you, <strong>${name}</strong>! Opening your email client to send your message to Rohit Prajapati...`;
            }

            showToast("Opening email client to send your message...");

            // Trigger mailto client after brief delay
            setTimeout(() => {
                window.location.href = mailtoUrl;
            }, 800);

            contactForm.reset();
        });
    }

    /* ----------------------------------------------------------------------
       9. Smooth Scrolling for Internal Links
       ---------------------------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                targetEl.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    /* ----------------------------------------------------------------------
       10. Profile Image Verification & Load Check
       ---------------------------------------------------------------------- */
    if (profileImg) {
        if (profileImg.complete && profileImg.naturalHeight !== 0) {
            console.log('Rohit Prajapati profile photo loaded (cached):', profileImg.src);
        } else {
            profileImg.addEventListener('load', () => {
                console.log('Rohit Prajapati profile photo loaded successfully:', profileImg.src);
            });
            profileImg.addEventListener('error', () => {
                console.warn('Profile image failed to load. Check images/rohit-profile.png path.');
            });
        }
    }

});
