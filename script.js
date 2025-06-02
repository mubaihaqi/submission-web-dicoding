document.addEventListener("DOMContentLoaded", () => {
  // Fitur 1: Animasi fade-in untuk kartu waktu awal muncul di layar
  const initCardAnimation = () => {
    const cards = document.querySelectorAll(".card");
    if (!cards.length) {
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observerCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    cards.forEach((card) => observer.observe(card));
  };

  // Fitur 2: Accordion untuk artikel wisata
  const initWisataAccordion = () => {
    const wisataArticle = document.getElementById("wisata");
    if (!wisataArticle) return;

    const sections = wisataArticle.querySelectorAll("article#wisata > section");

    sections.forEach((section, index) => {
      const h3 = section.querySelector("h3");
      const imageDiv = section.querySelector("div");

      if (h3 && imageDiv) {
        const contentId = `wisata-accordion-content-${index}`;
        imageDiv.id = contentId;

        h3.setAttribute("aria-expanded", "false");
        h3.setAttribute("aria-controls", contentId);
        h3.setAttribute("tabindex", "0");

        h3.addEventListener("click", () => {
          const isActive = section.classList.toggle("active");
          h3.setAttribute("aria-expanded", isActive.toString());
        });

        h3.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            const isActive = section.classList.toggle("active");
            h3.setAttribute("aria-expanded", isActive.toString());
          }
        });
      }
    });
  };

  // Fitur 3: Efek transparan + blur untku navbar waktu discrool
  const initNavbarScrollEffect = () => {
    const nav = document.querySelector("nav");
    const pageHero = document.querySelector(".page-hero");

    if (!nav || !pageHero) {
      console.warn("Navbar or Page Hero element not found for scroll effect.");
      return;
    }

    const navHeight = nav.offsetHeight;

    const observerOptions = {
      root: null,
      rootMargin: `0px 0px -${window.innerHeight - navHeight}px 0px`,
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          nav.classList.add("navbar-scrolled");
        } else {
          nav.classList.remove("navbar-scrolled");
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    observer.observe(pageHero);
  };

  const initNavbarFixed = () => {
    const nav = document.querySelector("nav");
    const header = document.querySelector("header");
    if (!nav || !header) return;

    const navOffset = nav.offsetTop;

    window.addEventListener("scroll", () => {
      if (window.scrollY >= header.offsetHeight) {
        nav.classList.add("navbar-fixed");
        document.body.classList.add("navbar-fixed-padding");
      } else {
        nav.classList.remove("navbar-fixed");
        document.body.classList.remove("navbar-fixed-padding");
      }
    });
  };

  initCardAnimation();
  initWisataAccordion();
  initNavbarScrollEffect();
  initNavbarFixed();
});
