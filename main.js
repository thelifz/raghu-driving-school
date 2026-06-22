document.addEventListener("DOMContentLoaded", () => {
    // 1. Initial State Setup
    gsap.set(".logo-text", { opacity: 0, x: -30 });
    
    // Hero Section
    gsap.set(".hero-title", { opacity: 0, x: -40 });
    gsap.set(".hero-subtitle", { opacity: 0, x: -40 });
    gsap.set(".hero-btn", { opacity: 0, y: 20 });
    gsap.set(".hero-image", { opacity: 0, scale: 0.9, x: 50 });

    // 2. Preloader & Entrance Animation
    const entranceTl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 } });
    entranceTl.pause(); // Pause entrance animation until preloader finishes

    const preloaderTl = gsap.timeline();

    // Set initial position off-screen at the bottom
    gsap.set("#svg-car", { x: 145, y: 450 });
    gsap.set(["#tire-fl", "#tire-fr"], { transformOrigin: "center" });

    // Preloader parking sequence
    preloaderTl
        // Drives forward
        .to("#svg-car", { y: 60, duration: 1.2, ease: "power2.out" })
        .to({}, { duration: 0.2 })
        
        // Turn wheels RIGHT before reversing
        .to(["#tire-fl", "#tire-fr"], { rotation: 30, duration: 0.3 })
        
        // Reverse and angle into spot
        .to("#svg-car", { 
            x: 180, 
            y: 110, 
            rotation: -35, 
            duration: 1.5, 
            ease: "power1.inOut" 
        }, "+=0.1")
        
        // Turn wheels LEFT to straighten
        .to(["#tire-fl", "#tire-fr"], { rotation: -30, duration: 0.5 }, "-=0.5")
        
        // Straighten out inside spot
        .to("#svg-car", { 
            x: 240, 
            y: 160, 
            rotation: 0, 
            duration: 1.2, 
            ease: "power2.inOut" 
        })
        
        // Wheels straight
        .to(["#tire-fl", "#tire-fr"], { rotation: 0, duration: 0.3 }, "-=0.6")
        
        // Text changes
        .to("#loading-text", { opacity: 0, duration: 0.3 }, "-=1")
        .call(() => {
            const lt = document.getElementById("loading-text");
            if(lt) { lt.innerText = "PERFECT!"; gsap.to(lt, { opacity: 1, duration: 0.3 }); }
        }, [], "-=0.7")
        
        // Brief pause
        .to({}, { duration: 0.6 })
        // Fade out preloader wrapper
        .to("#preloader", {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
            onComplete: () => {
                const p = document.getElementById("preloader");
                if(p) p.style.display = "none";
                // Start entrance animation
                entranceTl.play();
                entranceTl.to(".logo-text", { opacity: 1, x: 0 })
                  .to(".hero-title", { opacity: 1, x: 0 }, "-=0.9")
                  .to(".hero-subtitle", { opacity: 1, x: 0 }, "-=1.0")
                  .to(".hero-btn", { opacity: 1, y: 0 }, "-=1.0")
                  .to(".hero-image", { opacity: 1, scale: 1, x: 0, duration: 1.5, ease: "back.out(1.05)" }, "-=1.2");
            }
        });

    // 4. Register ScrollTrigger and animate Location & Process Section
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".location-container", {
        scrollTrigger: {
            trigger: ".location-section",
            start: "top 75%",
            toggleActions: "play reverse play reverse"
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    });

    gsap.from(".step-card", {
        scrollTrigger: {
            trigger: ".process-section",
            start: "top 75%",
            toggleActions: "play reverse play reverse"
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
    });

    // 5. Interactive Hover for Process Cards
    const stepCards = document.querySelectorAll(".step-card");
    stepCards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            gsap.to(card, { y: -10, duration: 0.3, ease: "power2.out", boxShadow: "0 20px 40px rgba(59, 130, 246, 0.15)" });
        });
        card.addEventListener("mouseleave", () => {
            gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out", boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)" });
        });
    });

    // 6. Animate Pricing Section
    gsap.from(".pricing-card", {
        scrollTrigger: {
            trigger: ".pricing-section",
            start: "top 75%",
            toggleActions: "play reverse play reverse"
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
    });

    // 7. Animate Reviews Section
    gsap.from(".review-card", {
        scrollTrigger: {
            trigger: ".reviews-section",
            start: "top 75%",
            toggleActions: "play reverse play reverse"
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
    });

    // 8. Animate CTA Section
    gsap.from(".cta-container > *", {
        scrollTrigger: {
            trigger: ".cta-section",
            start: "top 80%",
            toggleActions: "play reverse play reverse"
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
    });

    // 9. Animate Footer
    gsap.from(".footer-container > *", {
        scrollTrigger: {
            trigger: ".footer",
            start: "top 90%",
            toggleActions: "play reverse play reverse"
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out"
    });
    // 10. Lead Capture Modal Logic
    const modal = document.getElementById('leadModal');
    const closeModalBtn = document.getElementById('closeModal');
    const applyButtons = document.querySelectorAll('.btn-whatsapp, .hero-btn, .cta-primary-btn');
    const leadForm = document.getElementById('leadForm');

    if (modal && closeModalBtn && applyButtons.length > 0 && leadForm) {
        // Open modal
        applyButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                modal.classList.add('active');
            });
        });

        // Close modal
        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });

        // Close modal on outside click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });

        // Phone number formatting
        const phoneInput = document.getElementById('phoneNumber');
        phoneInput.addEventListener('input', function(e) {
            let val = this.value;
            if (!val.startsWith('+91 ')) {
                let digits = val.replace(/\D/g, '');
                if (digits.startsWith('91')) digits = digits.substring(2);
                val = '+91 ' + digits;
            }
            let prefix = '+91 ';
            let digits = val.substring(4).replace(/\D/g, '');
            if (digits.length > 10) digits = digits.substring(0, 10);
            this.value = prefix + digits;
        });
        
        phoneInput.addEventListener('keydown', function(e) {
            if ((e.key === 'Backspace' || e.key === 'Delete') && this.selectionStart <= 4) {
                e.preventDefault();
            }
        });

        // Handle form submission
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Gather data
            const fullName = document.getElementById('fullName').value;
            const phoneNumber = document.getElementById('phoneNumber').value;
            const gender = document.getElementById('gender').value;
            const trainingPlan = document.getElementById('trainingPlan').value;
            const preferredCar = document.getElementById('preferredCar').value;
            const preferredTime = document.getElementById('preferredTime').value;

            // Construct message
            const message = `*New Registration Application* 🚗\n\n` +
                            `*Name:* ${fullName}\n` +
                            `*Phone Number:* ${phoneNumber}\n` +
                            `*Gender:* ${gender}\n` +
                            `*Training Plan:* ${trainingPlan}\n` +
                            `*Preferred Car:* ${preferredCar}\n` +
                            `*Preferred Time:* ${preferredTime}\n\n` +
                            `Looking forward to starting!`;

            // URL encode
            const encodedMessage = encodeURIComponent(message);
            const whatsappNumber = '+919632152568'; // Using the placeholder from prompt
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

            // Open WhatsApp & close modal
            window.open(whatsappUrl, '_blank');
            modal.classList.remove('active');
            leadForm.reset();
        });
    }
});
