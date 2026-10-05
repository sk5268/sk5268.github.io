/* ==========================================================================
   Srimadhava Khandavilli — portfolio interactions
   Small, dependency-free, progressive: everything degrades to readable HTML.
   ========================================================================== */

(() => {
    "use strict";

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------------------------------------------------------------- nav */
    const nav = document.getElementById("site-nav");
    const rail = document.getElementById("scroll-rail");
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");
    const yearEl = document.getElementById("year");

    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    /* scroll state: border + progress rail */
    let rafPending = false;

    function onScroll() {
        if (rafPending) return;
        rafPending = true;
        requestAnimationFrame(() => {
            const y = window.scrollY || document.documentElement.scrollTop;
            const max = document.documentElement.scrollHeight - window.innerHeight;
            const pct = max > 0 ? Math.min(100, (y / max) * 100) : 0;

            if (nav) nav.classList.toggle("scrolled", y > 12);
            if (rail) rail.style.width = pct + "%";

            rafPending = false;
        });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();

    /* mobile menu */
    function setMenu(open) {
        if (!menuToggle || !navLinks) return;
        menuToggle.setAttribute("aria-expanded", String(open));
        menuToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
        navLinks.classList.toggle("is-open", open);
        document.body.classList.toggle("nav-open", open);
    }

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
        });

        navLinks.addEventListener("click", (e) => {
            if (e.target instanceof HTMLAnchorElement) setMenu(false);
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") setMenu(false);
        });

        // close if the viewport grows back to desktop
        window.matchMedia("(min-width: 861px)").addEventListener("change", (e) => {
            if (e.matches) setMenu(false);
        });
    }

    /* ------------------------------------------------------------ reveal */
    const revealEls = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window) || prefersReduced) {
        revealEls.forEach((el) => el.classList.add("is-in"));
    } else {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add("is-in");
                    observer.unobserve(entry.target);
                });
            },
            { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
        );
        revealEls.forEach((el) => observer.observe(el));
    }

    /* ------------------------------------------------- active nav link */
    const sections = Array.from(document.querySelectorAll("main section[id]"));
    const linkFor = new Map();
    document.querySelectorAll(".nav-links a[href^='#']").forEach((a) => {
        linkFor.set(a.getAttribute("href").slice(1), a);
    });

    if ("IntersectionObserver" in window && sections.length && linkFor.size) {
        const spy = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    linkFor.forEach((a) => a.classList.remove("active"));
                    const link = linkFor.get(entry.target.id);
                    if (link) link.classList.add("active");
                });
            },
            { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
        );
        sections.forEach((s) => spy.observe(s));
    }

    /* ------------------------------------------------------ stat counters */
    const statNums = Array.from(document.querySelectorAll(".stat-bar .num"));

    function runCounter(el) {
        const target = Number(el.dataset.count);
        if (!Number.isFinite(target)) return;

        const suffix = el.dataset.suffix || "";
        const duration = 1100;
        const start = performance.now();

        function tick(now) {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = Math.round(target * eased) + suffix;
            if (t < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
    }

    if (statNums.length && "IntersectionObserver" in window && !prefersReduced) {
        const counterObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    runCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                });
            },
            { threshold: 0.6 }
        );
        statNums.forEach((el) => counterObserver.observe(el));
    }

    /* ------------------------------------------- external link hardening */
    document.querySelectorAll('a[target="_blank"]').forEach((a) => {
        if (!a.rel.includes("noopener")) a.rel = "noopener noreferrer";
    });
})();
