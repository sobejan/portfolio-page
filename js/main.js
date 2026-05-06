/* ==========================================================
   SOBEJAN SRIKANTHAN — Portfolio Script
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------------------
       NAV — scroll background + hamburger toggle
       -------------------------------------------------- */
    const nav = document.getElementById('nav');
    const menuToggle = document.getElementById('menuToggle');
    const menuOverlay = document.getElementById('menuOverlay');

    const heroSection = document.getElementById('hero');
    const handleNavScroll = () => {
        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const heroBottom = heroSection ? heroSection.offsetTop + heroSection.offsetHeight : 300;
        nav.classList.toggle('scrolled', scrollY > heroBottom - 100);
    };
    window.addEventListener('scroll', handleNavScroll, { passive: true });
    handleNavScroll();

    menuToggle.addEventListener('click', () => {
        const isOpen = menuOverlay.classList.toggle('active');
        menuToggle.classList.toggle('active');
        document.body.style.overflowY = isOpen ? 'hidden' : '';
    });

    document.querySelectorAll('.menu-overlay__link').forEach(link => {
        link.addEventListener('click', () => {
            menuOverlay.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflowY = '';
        });
    });


    /* --------------------------------------------------
       SMOOTH SCROLL for anchor links
       -------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });


    /* --------------------------------------------------
       SCROLL REVEAL ANIMATION
       -------------------------------------------------- */
    const revealElements = document.querySelectorAll(
        '.about__story, .about__stat, .skills__category, .projects__card, .certifications__card, .contact__content'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(el => {
        el.classList.add('reveal-on-scroll');
        revealObserver.observe(el);
    });


    /* --------------------------------------------------
       ACTIVE NAV SECTION TRACKING
       -------------------------------------------------- */
    const sections = document.querySelectorAll('section[id]');
    const menuLinks = document.querySelectorAll('.menu-overlay__link');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                menuLinks.forEach(link => {
                    link.style.color = link.getAttribute('href') === `#${id}`
                        ? '#64ffda'
                        : '';
                });
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-80px 0px -40% 0px'
    });

    sections.forEach(section => sectionObserver.observe(section));


    /* --------------------------------------------------
       TERMINAL CURSOR BLINK
       -------------------------------------------------- */
    const cursors = document.querySelectorAll('.hero__cursor');
    let visible = true;
    setInterval(() => {
        visible = !visible;
        cursors.forEach(c => {
            c.style.opacity = visible ? '1' : '0';
        });
    }, 530);

});
