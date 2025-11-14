document.addEventListener("DOMContentLoaded", () => {
  const API_BASE = "https://flare-backend-six.vercel.app";
// Change in production

  // ================================================================
  // 1. FALLBACK DATA (Offline / API Down)
  // ================================================================
  const FALLBACK = {
    about: {
      subtitle: "Who We Are",
      title: "Flare is a web/software development Agency. We design thoughtful digital experiences and beautiful brand aesthetics.",
      description: "At Flare we ignite digital transformation through intelligent technology solutions and strategic IT consulting. We help businesses from startups to enterprises simplify complexity, modernize their systems, and scale with confidence in the digital age.",
      photoUrl: "https://images.unsplash.com/photo-1519389950473-47ba2b3d4b5a",
      steps: [
        { title: "Define", description: "We start by understanding you—your goals, audience, and challenges.", order: 1 },
        { title: "Design", description: "We bring your ideas to life with clean, modern, user-friendly interfaces.", order: 2 },
        { title: "Build", description: "We engineer possibility with optimized, scalable code and features.", order: 3 },
        { title: "Launch", description: "We deploy fast, flawless, and make your brand stand out from day one.", order: 4 },
      ],
    },
    services: [
      { title: "Product Design | UI/UX.", description: "We build fast, responsive, and reliable digital products that work seamlessly across devices.", iconClass: "service-icon--product-design", order: 1 },
      { title: "Full-Stack DEV", description: "Secure, scalable backend with APIs, databases, and third-party integrations.", iconClass: "service-icon--branding", order: 2 },
      { title: "App Scaling, Optimization & Cloud Deployment", description: "We ensure your app stays fast, secure, and stable — from 100 to 100,000 users.", iconClass: "service-icon--frontend", order: 3 },
      { title: "Maintenance, Security & Long-Term Support", description: "Ongoing updates, security, and support so you can focus on growth.", iconClass: "service-icon--research", order: 4 },
    ],
    portfolio: [
      {
        title: "The Red Wheel", category: "Branding", thumbUrl: "images/portfolio/red-wheel.jpg",
        thumb2xUrl: "images/portfolio/red-wheel@2x.jpg", fullUrl: "images/portfolio/gallery/g-red-wheel.jpg",
        fullSize: "1050x700", projectUrl: "https://www.behance.net/", description: "Vero molestiae sed aut natus excepturi.", order: 1
      },
      {
        title: "Music Life", category: "Frontend Design", thumbUrl: "images/portfolio/music-life.jpg",
        thumb2xUrl: "images/portfolio/music-life@2x.jpg", fullUrl: "images/portfolio/gallery/g-music-life.jpg",
        fullSize: "1050x700", projectUrl: "https://www.behance.net/", description: "Vero molestiae sed aut natus excepturi.", order: 2
      },
      {
        title: "OI Logo", category: "Branding", thumbUrl: "images/portfolio/oi-logo.jpg",
        thumb2xUrl: "images/portfolio/oi-logo@2x.jpg", fullUrl: "images/portfolio/gallery/g-oi-logo.jpg",
        fullSize: "1050x700", projectUrl: "https://www.behance.net/", description: "Vero molestiae sed aut natus excepturi.", order: 3
      },
      {
        title: "Corrugated Sheets", category: "Frontend Design", thumbUrl: "images/portfolio/corrugated-sheets.jpg",
        thumb2xUrl: "images/portfolio/corrugated-sheets@2x.jpg", fullUrl: "images/portfolio/gallery/g-corrugated-sheets.jpg",
        fullSize: "1050x700", projectUrl: "https://www.behance.net/", description: "Vero molestiae sed aut natus excepturi.", order: 4
      },
      {
        title: "Wooocraft", category: "Frontend Design", thumbUrl: "images/portfolio/woodcraft.jpg",
        thumb2xUrl: "images/portfolio/woodcraft@2x.jpg", fullUrl: "images/portfolio/gallery/g-woodcraft.jpg",
        fullSize: "1050x700", projectUrl: "https://www.behance.net/", description: "Vero molestiae sed aut natus excepturi.", order: 5
      },
      {
        title: "The Lamp", category: "Frontend Design", thumbUrl: "images/portfolio/lamp.jpg",
        thumb2xUrl: "images/portfolio/lamp@2x.jpg", fullUrl: "images/portfolio/gallery/g-lamp.jpg",
        fullSize: "1050x700", projectUrl: "https://www.behance.net/", description: "Vero molestiae sed aut natus excepturi.", order: 6
      },
    ],
    // clients: [], // Fill with your 8 client objects
    // testimonials: [], // Fill with your 4 testimonial objects
    contact: { email: "bitflow.com@gmail.com", phone: "+234-916-036-4498", address: "1600 Amphitheatre Parkway\nMile 3, PH RIVERS\nNIGERIA" },
    social: [
      { platform: "Facebook", url: "#0", order: 1 },
      { platform: "Twitter", url: "#0", order: 2 },
      { platform: "Instagram", url: "#0", order: 3 },
      { platform: "Whatsapp", url: "https://wa.me/+2349160364498", order: 4 },
    ],
  };

  // ================================================================
  // 2. UTILS
  // ================================================================
  const escapeHtml = (text) => {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  };
  const refreshAOS = () => typeof AOS !== "undefined" && AOS.refresh();
  const fetchJSON = async (url, fallback) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      console.warn(`[API] ${url} failed → using fallback`, err);
      return fallback;
    }
  };

  // ================================================================
  // 3. RENDER FUNCTIONS
  // ================================================================
  const renderAbout = (data) => {
    const intro = document.getElementById("about-intro");
    const steps = document.getElementById("about-steps");
    if (!intro || !steps) return;

    intro.innerHTML = `
      <div class="column large-12">
        <div class="section-title" data-num="01" data-aos="fade-up">
          <h3 class="h6">${escapeHtml(data.subtitle)}</h3>
        </div>
      </div>
      <div class="column large-6 w-900-stack s-about__intro-text">
        <h1 class="display-1" data-aos="fade-up">${escapeHtml(data.title)}</h1>
        <p class="lead" data-aos="fade-up">${escapeHtml(data.description)}</p>
      </div>
      <div class="column large-6 w-900-stack s-about__photo-block">
        <div class="s-about__photo" data-aos="fade-up" style="background-image:url('${data.photoUrl}');"></div>
      </div>
    `;

    steps.innerHTML = "";
    data.steps.sort((a, b) => a.order - b.order).forEach((step) => {
      const div = document.createElement("div");
      div.className = "column item item-process";
      div.setAttribute("data-aos", "fade-up");
      div.innerHTML = `<h3 class="item-title">${escapeHtml(step.title)}</h3><p>${escapeHtml(step.description)}</p>`;
      steps.appendChild(div);
    });

    refreshAOS();
  };

  const renderServices = (services) => {
    const el = document.getElementById("services");
    if (!el) return;
    const sorted = services.sort((a, b) => a.order - b.order);
    const items = sorted.map((s) => `
      <div class="column item item-service" data-aos="fade-up">
        <span class="service-icon ${escapeHtml(s.iconClass)}"></span>
        <h3 class="item-title">${escapeHtml(s.title)}</h3>
        <p>${escapeHtml(s.description)}</p>
      </div>
    `).join("");

    el.innerHTML = `
      <div class="row">
        <div class="column large-12">
          <div class="section-title" data-num="02" data-aos="fade-up">
            <h3 class="h6">Our Expertise</h3>
          </div>
        </div>
      </div>
      <div class="row block-large-1-2 block-tab-full s-services__services item-list">
        ${items}
      </div>
    `;

    refreshAOS();
  };

  const renderPortfolio = (items) => {
    const el = document.getElementById("portfolio");
    if (!el) return;

    const sorted = items.sort((a, b) => a.order - b.order);
    const list = sorted.map(item => `
      <div class="column" data-aos="fade-up">
        <div class="folio-item">
          <div class="folio-item__thumb">
            <a class="folio-item__thumb-link" href="${item.fullUrl}" title="${escapeHtml(item.title)}" data-size="${item.fullSize}">
              <img src="${item.thumbUrl}" ${item.thumb2xUrl ? `srcset="${item.thumbUrl} 1x, ${item.thumb2xUrl} 2x"` : ''} alt="${escapeHtml(item.title)}">
            </a>
          </div>
          <div class="folio-item__info">
            <div class="folio-item__cat">${escapeHtml(item.category)}</div>
            <h4 class="folio-item__title">${escapeHtml(item.title)}</h4>
          </div>
          ${item.projectUrl ? `<a href="${item.projectUrl}" target="_blank" class="folio-item__project-link">Project Link</a>` : ''}
          <div class="folio-item__caption">
            <p>${escapeHtml(item.description)}</p>
          </div>
        </div>
      </div>
    `).join("");

    el.innerHTML = `<div class="row s-portfolio__list block-large-1-2 block-tab-full collapse">${list}</div>`;

    if (typeof PhotoSwipeLightbox !== "undefined") {
      new PhotoSwipeLightbox({
        gallery: '#portfolio .s-portfolio__list',
        children: 'a.folio-item__thumb-link',
        pswpModule: PhotoSwipe,
      }).init();
    }

    refreshAOS();
  };

 // ----------------- Clients -----------------
const renderClients = (clients) => {
  const section = document.getElementById("clients");
  if (!section) return;

  section.innerHTML = `
    <div class="row narrower s-clients__top h-text-center">
      <div class="column">
        <h1 class="display-1" data-aos="fade-up">
          We've had the privilege of working with
          some of the largest and most iconic brands
        </h1>
      </div>
    </div>

    <div class="row clients-outer">
      <div class="column">
        <div class="clients" data-aos="fade-up"></div>
      </div>
    </div>

    <div class="row testimonials collapse">
      <div class="column large-12">
        <div class="testimonial-slider" data-aos="fade-up"></div>
      </div>
    </div>
  `;

  const clientsContainer = section.querySelector(".clients");
  if (!clientsContainer) return;

  clients
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .forEach((c) => {
      const link = document.createElement("a");
      link.href = c.linkUrl || "#0";
      link.className = "clients__slide";
      link.title = c.name;
      link.innerHTML = `<img src="${c.logoUrl}" alt="${c.name}" />`;
      clientsContainer.appendChild(link);
    });

  if ($(clientsContainer).hasClass("slick-initialized")) $(clientsContainer).slick("unslick");
  $(clientsContainer).slick({
    arrows: false,
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 1000, settings: { slidesToShow: 4 } },
      { breakpoint: 800, settings: { slidesToShow: 3, slidesToScroll: 2 } },
      { breakpoint: 500, settings: { slidesToShow: 2, slidesToScroll: 2 } },
    ],
  });
};

// ----------------- Testimonials -----------------
const renderTestimonials = (testimonials) => {
  const container = document.querySelector("#clients .testimonial-slider");
  if (!container) return;

  container.innerHTML = "";

  testimonials
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .forEach((t) => {
      const slide = document.createElement("div");
      slide.className = "testimonial-slider__slide";
      slide.innerHTML = `
        <p>${escapeHtml(t.content)}</p>
        <div class="testimonial-slider__author">
          <img src="${t.authorImage}" alt="Author image" class="testimonial-slider__avatar">
          <cite class="testimonial-slider__cite">
            <strong>${escapeHtml(t.authorName)}</strong>
            <span>${escapeHtml(t.authorTitle)}</span>
          </cite>
        </div>
      `;
      container.appendChild(slide);
    });

  if ($(container).hasClass("slick-initialized")) $(container).slick("unslick");
  $(container).slick({
    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [{ breakpoint: 600, settings: { arrows: false, dots: true } }],
  });
};


  const renderContactFooter = (contact, social) => {
    const contactEl = document.querySelector(".s-contact");
    const footerEl = document.querySelector(".s-footer");
    if (!contactEl || !footerEl) return;

    const addressLines = contact.address.split('\n').map(line => `<br>${escapeHtml(line)}`).join('');
    contactEl.innerHTML = `
      <div class="row narrower s-contact__top h-text-center">
        <div class="column">
          <h3 class="h6">Get In Touch</h3>
          <h1 class="display-1">Have an idea or an epic project in mind? Talk to us. Shoot us a message at</h1>
        </div>
      </div>
      <div class="row h-text-center">
        <div class="column">
          <p class="s-contact__email"><a href="mailto:${contact.email}">${escapeHtml(contact.email)}</a></p>
        </div>
      </div>
    `;

    const socialHTML = social.sort((a, b) => a.order - b.order)
      .map(s => `<li><a href="${s.url}" target="_blank">${escapeHtml(s.platform)}</a></li>`).join("");

    footerEl.innerHTML = `
      <div class="row row-y-top">
        <div class="column large-8 medium-12">
          <div class="row">
            <div class="column large-7 tab-12 s-footer__block">
              <h4 class="h6">Where to Find Us</h4>
              <p>1600 Amphitheatre Parkway ${addressLines}<br><a href="tel:${contact.phone}">${escapeHtml(contact.phone)}</a></p>
            </div>
            <div class="column large-5 tab-12 s-footer__block">
              <h4 class="h6">Follow Us</h4>
              <ul class="s-footer__list">${socialHTML}</ul>
            </div>
          </div>
        </div>
        <div class="column large-4 medium-12 s-footer__block--end">
          <a href="mailto:${contact.email}" class="btn h-full-width">Let's Talk</a>
          <div class="ss-copyright">
            <span>Copyright Flare 2025</span> 
            <span>Design by <a href="">Samtek</a></span>
          </div>
          <div class="ss-go-top">
            <a class="smoothscroll" title="Back to Top" href="#top">top</a>
          </div>
        </div>
      </div>
    `;

    refreshAOS();
  };

  // ================================================================
  // 4. INIT
  // ================================================================
  const init = async () => {
    const [about, services, portfolio, clients, testimonials, contact, social] = await Promise.all([
      fetchJSON(`${API_BASE}/about`, FALLBACK.about),
      fetchJSON(`${API_BASE}/services`, FALLBACK.services),
      fetchJSON(`${API_BASE}/portfolio`, FALLBACK.portfolio),
      fetchJSON(`${API_BASE}/clients`),
      fetchJSON(`${API_BASE}/testimonials`),
      fetchJSON(`${API_BASE}/contact`, FALLBACK.contact),
      fetchJSON(`${API_BASE}/social`, FALLBACK.social),
    ]);

    renderAbout(about);
    renderServices(services);
    renderPortfolio(portfolio);
    renderClients(clients);
    renderTestimonials(testimonials);
    renderContactFooter(contact, social);
  };

  // Start
  init();

});
