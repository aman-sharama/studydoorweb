'use strict';



/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}



/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navLinks, "click", closeNavbar);



/**
 * header active when scroll down to 100px
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

const activeElem = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", activeElem);



const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});


// blog page js 
document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("dark-mode-toggle");
  toggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
  });

  function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function () {
      const context = this;
      const args = arguments;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(function () {
          if (Date.now() - lastRan >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  }

  const sidebarToggle = document.querySelector(".sidebar-toggle");
  sidebarToggle.addEventListener("click", function () {
    document.body.classList.toggle("sidebar-visible");
  });

  const sidebar = document.querySelector(".sidebar");
  const readingProgressContainer = document.querySelector(
    ".reading-progress-container"
  );
  const headers = document.querySelectorAll(".post-content :is(h1, h2, h3)");

  headers.forEach((header, index) => {
    const headerId = header.id || `header${index + 1}`;
    header.id = headerId;
    header.setAttribute("tabindex", "0");

    const link = document.createElement("a");
    link.href = `#${headerId}`;
    link.textContent = header.textContent;
    link.className = "sidebar-link";
    link.dataset.headerId = headerId;

    sidebar.insertBefore(link, readingProgressContainer);
  });

  const sidebarLinks = document.querySelectorAll(".sidebar-link");
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      const targetId = this.getAttribute("href").substring(1);
      const targetHeader = document.getElementById(targetId);

      if (targetHeader) {
        const headerOffset =
          targetHeader.getBoundingClientRect().top +
          window.pageYOffset -
          window.innerHeight / 2 +
          targetHeader.offsetHeight / 2;
        window.scrollTo({ top: headerOffset, behavior: "smooth" });
      }
    });
  });

  function handleScroll() {
    const headers = document.querySelectorAll(".post-content :is(h1, h2, h3)");
    let lastPassedHeaderId = null;

    headers.forEach((header) => {
      if (header.getBoundingClientRect().top < window.innerHeight / 2) {
        lastPassedHeaderId = header.id;
      }
    });

    const sidebarLinks = document.querySelectorAll(".sidebar-link");
    sidebarLinks.forEach((link) => {
      if (lastPassedHeaderId === link.dataset.headerId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

    const firstHeader = document.querySelector(
      ".post-content :is(h1, h2, h3):first-of-type"
    );
    const content = document.querySelector(".post-content");
    const paragraphs = content.querySelectorAll("p");
    const lastParagraph = paragraphs[paragraphs.length - 1];

    const startOffset =
      firstHeader.getBoundingClientRect().top +
      window.pageYOffset -
      window.innerHeight / 2;
    const endOffset =
      lastParagraph.getBoundingClientRect().bottom +
      window.pageYOffset -
      window.innerHeight / 2;

    const scrollTop = window.pageYOffset;
    const scrollRange = endOffset - startOffset;
    const scrollPosition = scrollTop - startOffset;

    let progress = scrollPosition / scrollRange;
    progress = Math.max(0, Math.min(1, progress));

    document.querySelector(".reading-progress-bar").style.width =
      progress * 100 + "%";
  }

  document.addEventListener("scroll", throttle(handleScroll, 25));
});



// about us page js start here  

const cardImages = document.querySelectorAll(".card-image");
const cardTitles = document.querySelectorAll(".card-title");
const cardDescriptions = document.querySelectorAll(".card-description");
const cardMediaIcons = document.querySelectorAll(".card-mediaIcons a");
const cardImgs = document.querySelectorAll(".card-image img");
const cardTitleSpans = document.querySelectorAll(".card-title span");
const cardDescSpans = document.querySelectorAll(".card-description span");
const mediaIcons = document.querySelectorAll(".card-mediaIcons a i");

const renderCard = () => {
  //Remove the skeleton loading effect
  cardImages.forEach((cardImage) => {
    cardImage.classList.remove("loading");
  });
  cardTitles.forEach((cardTitle) => {
    cardTitle.classList.remove("loading");
  });
  cardDescriptions.forEach((cardDescription) => {
    cardDescription.classList.remove("loading");
  });
  cardMediaIcons.forEach((cardMediaIcon) => {
    cardMediaIcon.classList.remove("loading");
  });

  //Show the hidden html elements
  cardImgs.forEach((cardImg) => {
    cardImg.style.visibility = "visible";
  });
  cardTitleSpans.forEach((cardTitleSpan) => {
    cardTitleSpan.style.visibility = "visible";
  });
  cardDescSpans.forEach((cardDescSpan) => {
    cardDescSpan.style.visibility = "visible";
  });
  mediaIcons.forEach((mediaIcon) => {
    mediaIcon.style.visibility = "visible";
  });
};

//Execute renderCard on setTimeout
setTimeout(() => {
  renderCard();
}, 1000);

//Execute renderCard after the page loaded
//window.addEventListener("load", () => {
//renderCard();
//});
