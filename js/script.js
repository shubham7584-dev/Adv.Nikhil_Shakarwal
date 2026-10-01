/* =========================================================
   ADVOCATE WEBSITE - MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       LOADER
    ===================================================== */

    const loader = document.querySelector(".loader");

    function hideLoader() {

        if (!loader) {
            document.body.classList.remove("loading");
            return;
        }

        loader.classList.add("hide");
        document.body.classList.remove("loading");

        setTimeout(function () {
            loader.style.display = "none";
        }, 600);
    }

    /*
       Maximum 2.5 seconds ka safety fallback.
       Agar kisi image ya script ki wajah se load event delay ho,
       website permanently loader par stuck nahi hogi.
    */

    const loaderFallback = setTimeout(hideLoader, 2500);

    window.addEventListener("load", function () {
        clearTimeout(loaderFallback);

        setTimeout(function () {
            hideLoader();
        }, 300);
    });


    /* =====================================================
       DROPDOWN PARENT LINKS
       Our Services / Our Expertise open the scroll list on click.
       They do not navigate to the old services/practice pages.
    ===================================================== */

    document.querySelectorAll(".nav-links .has-dropdown > .dropdown-toggle").forEach(function (toggle) {
        toggle.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();

            const parent = toggle.parentElement;
            const wasOpen = parent.classList.contains("is-open");

            document.querySelectorAll(".nav-links .has-dropdown.is-open").forEach(function (item) {
                item.classList.remove("is-open");
            });

            if (!wasOpen) {
                parent.classList.add("is-open");
            }
        });
    });

    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", function () {

            navLinks.classList.toggle("active");

            const icon = menuToggle.querySelector("i");

            if (icon) {

                if (navLinks.classList.contains("active")) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                } else {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            }

        });


        const navItems = navLinks.querySelectorAll("a");

        navItems.forEach(function (link) {

            link.addEventListener("click", function () {

                if (link.classList.contains("dropdown-toggle")) {
                    return;
                }

                navLinks.classList.remove("active");

                const icon = menuToggle.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            });

        });

    }


    /* =====================================================
       STICKY HEADER
       Same behavior on Home and every inner page.
       The header becomes fixed after scrolling and returns to
       the normal top layout when the page is back at the top.
    ===================================================== */

    const header = document.querySelector("header");
    let lastScrollY = window.scrollY;
    let tickingHeader = false;

    function handleHeader() {

        if (!header) return;

        const currentY = window.scrollY;

        if (currentY > 80) {
            header.classList.add("sticky");

            if (document.body.classList.contains("inner-page")) {
                document.body.classList.add("header-has-sticky-space");
            }
        } else {
            header.classList.remove("sticky");
            document.body.classList.remove("header-has-sticky-space");
        }

        lastScrollY = currentY;
        tickingHeader = false;
    }

    window.addEventListener("scroll", function () {
        if (!tickingHeader) {
            window.requestAnimationFrame(handleHeader);
            tickingHeader = true;
        }
    }, { passive: true });

    handleHeader();


    /* =====================================================
       HERO SLIDER
    ===================================================== */

    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    let currentSlide = 0;
    let sliderInterval = null;


    function showSlide(index) {

        if (!slides.length) return;

        if (index >= slides.length) {
            index = 0;
        }

        if (index < 0) {
            index = slides.length - 1;
        }

        currentSlide = index;

        slides.forEach(function (slide) {
            slide.classList.remove("active");
        });

        dots.forEach(function (dot) {
            dot.classList.remove("active");
        });

        slides[currentSlide].classList.add("active");

        if (dots[currentSlide]) {
            dots[currentSlide].classList.add("active");
        }

    }


    function startSlider() {

        if (slides.length <= 1) return;

        sliderInterval = setInterval(function () {

            showSlide(currentSlide + 1);

        }, 5000);

    }


    function restartSlider() {

        if (sliderInterval) {
            clearInterval(sliderInterval);
        }

        startSlider();

    }


    if (slides.length > 0) {

        showSlide(0);

        dots.forEach(function (dot, index) {

            dot.addEventListener("click", function () {

                showSlide(index);
                restartSlider();

            });

        });

        startSlider();

    }


    /* =====================================================
       HERO PREVIOUS / NEXT BUTTONS
    ===================================================== */

    const previousButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    if (previousButton) {

        previousButton.addEventListener("click", function () {

            showSlide(currentSlide - 1);
            restartSlider();

        });

    }

    if (nextButton) {

        nextButton.addEventListener("click", function () {

            showSlide(currentSlide + 1);
            restartSlider();

        });

    }


    /* =====================================================
       COUNTER ANIMATION
    ===================================================== */

    const counters = document.querySelectorAll(".counter");

    function animateCounter(counter) {

        const target = Number(counter.getAttribute("data-target"));

        if (isNaN(target)) return;

        let current = 0;

        const duration = 1800;
        const startTime = performance.now();


        function updateCounter(currentTime) {

            const elapsed = currentTime - startTime;

            const progress = Math.min(elapsed / duration, 1);

            const easedProgress =
                1 - Math.pow(1 - progress, 3);

            current = Math.floor(target * easedProgress);

            counter.textContent = current;

            if (progress < 1) {

                requestAnimationFrame(updateCounter);

            } else {

                counter.textContent = target;

            }

        }

        requestAnimationFrame(updateCounter);

    }


    if ("IntersectionObserver" in window) {

        const counterObserver = new IntersectionObserver(

            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        animateCounter(entry.target);

                        observer.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.5
            }

        );


        counters.forEach(function (counter) {
            counterObserver.observe(counter);
        });

    } else {

        counters.forEach(function (counter) {
            animateCounter(counter);
        });

    }


    /* =====================================================
       FADE-UP ANIMATION
    ===================================================== */

    const fadeElements = document.querySelectorAll(".fade-up");

    if ("IntersectionObserver" in window) {

        const fadeObserver = new IntersectionObserver(

            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(entry.target);

                    }

                });

            },

            {
                threshold: 0.12
            }

        );


        fadeElements.forEach(function (element) {

            fadeObserver.observe(element);

        });

    } else {

        fadeElements.forEach(function (element) {

            element.classList.add("show");

        });

    }


    /* =====================================================
       SCROLL TO TOP
    ===================================================== */

    const scrollTopButton = document.querySelector(".scroll-top");

    function updateScrollTop() {

        if (!scrollTopButton) return;

        if (window.scrollY > 500) {

            scrollTopButton.classList.add("show");

        } else {

            scrollTopButton.classList.remove("show");

        }

    }

    window.addEventListener("scroll", updateScrollTop, { passive: true });

    updateScrollTop();


    if (scrollTopButton) {

        scrollTopButton.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const yearElement = document.querySelector("#year");

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       ACTIVE NAV LINK
    ===================================================== */

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    const navigationLinks =
        document.querySelectorAll(".nav-links a");

    navigationLinks.forEach(function (link) {

        const href =
            link.getAttribute("href");

        if (!href) return;

        const linkPage =
            href.split("/").pop();

        if (linkPage === currentPage) {

            navigationLinks.forEach(function (item) {
                item.classList.remove("active");
            });

            link.classList.add("active");

        }

    });


    /* =====================================================
       BOOK APPOINTMENT / CONTACT FORM
       Sends the submitted details directly to WhatsApp.
    ===================================================== */

    const whatsappNumber = "918851724074";

    function setupReactiveAppointmentForm(form) {

        if (!form || form.dataset.appointmentReady === "true") return;
        form.dataset.appointmentReady = "true";

        form.addEventListener("submit", function (event) {

            event.preventDefault();

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            const submitButton =
                form.querySelector("button[type='submit']");

            const getValue = function (name) {
                const field = form.querySelector(`[name="${name}"]`);
                return field ? field.value.trim() : "";
            };

            const name = getValue("name");
            const email = getValue("email");
            const phone = getValue("phone");
            const practice = getValue("practice");
            const subject = getValue("subject");
            const message = getValue("message");

            const matter = subject || practice || "Legal Consultation";

            const whatsappMessage =
                "*Book Appointment Request*%0A%0A" +
                "*Name:* " + encodeURIComponent(name) + "%0A" +
                "*Phone:* " + encodeURIComponent(phone) + "%0A" +
                "*Email:* " + encodeURIComponent(email) + "%0A" +
                "*Matter:* " + encodeURIComponent(matter) + "%0A" +
                "*Message:* " + encodeURIComponent(message || "Not provided");

            const whatsappUrl =
                "https://wa.me/" + whatsappNumber + "?text=" + whatsappMessage;

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.dataset.originalText = submitButton.textContent.trim();
                submitButton.textContent = "Opening WhatsApp...";
            }

            window.open(whatsappUrl, "_blank", "noopener,noreferrer");

            setTimeout(function () {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent =
                        submitButton.dataset.originalText || "Book Appointment";
                }
                form.reset();
            }, 1200);
        });
    }

    document.querySelectorAll(".appointment form, #contactForm").forEach(
        setupReactiveAppointmentForm
    );

    /* =====================================================
       EXPERTISE PAGE SIDEBAR FORM
       Sends the enquiry directly to Adv. Nikhil Shakarwal
       on WhatsApp with the submitted details.
    ===================================================== */

    function setupExpertiseWhatsAppForm(form) {
        if (!form || form.dataset.whatsappReady === "true") return;
        form.dataset.whatsappReady = "true";

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            const getValue = function (name) {
                const field = form.querySelector(`[name="${name}"]`) || form.querySelector(`#${name}`);
                return field ? field.value.trim() : "";
            };

            const name = getValue("name");
            const email = getValue("email");
            const phone = getValue("phone");
            const subject = getValue("subject") || "Legal Consultation";
            const message = getValue("message") || "Not provided";

            const whatsappMessage =
                "Hello Adv. Nikhil Shakarwal,\n\n" +
                "I would like to discuss my legal matter.\n\n" +
                "Name: " + name + "\n" +
                "Phone: " + phone + "\n" +
                "Email: " + email + "\n" +
                "Matter: " + subject + "\n" +
                "Message: " + message;

            const whatsappUrl =
                "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(whatsappMessage);

            const submitButton = form.querySelector("button[type='submit']");
            const originalText = submitButton ? submitButton.textContent.trim() : "Send Message";

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = "Opening WhatsApp...";
            }

            window.open(whatsappUrl, "_blank", "noopener,noreferrer");

            setTimeout(function () {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = originalText;
                }
            }, 1200);
        });
    }

    document.querySelectorAll(".service-sidebar .contact-card form").forEach(
        setupExpertiseWhatsAppForm
    );

    /* =====================================================
       SMOOTH INTERNAL LINKS
    ===================================================== */

    const internalLinks =
        document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });




    /* =====================================================
       CONSOLE MESSAGE
    ===================================================== */

    console.log(
        "Adv. Nikhil Shakarwal website loaded successfully."
    );

});
