// header.js - เมนูที่ใช้ร่วมทุกหน้า
// วิธีใช้: ใส่ <div id="site-nav"></div> ในหน้า แล้วเรียก <script src="header.js"></script> ท้ายหน้า
(function () {
  var host = document.getElementById("site-nav");
  if (!host) return; // ไม่มีที่ใส่เมนูในหน้านี้ ก็ไม่ต้องทำอะไร

  host.innerHTML =
    '<div id="nav">' +
      '<a href="index.html" class="item logo"><img src="https://bmsbme.psu.ac.th/filemanager/file/1/logo_psu.001.png" alt="BMS&amp;BME" height="44"></a>' +

      '<div id="about-wrap">' +
        '<a href="#" class="item" id="about-btn">About us</a>' +
        '<div id="about-menu">' +
          '<a href="about.html">Who we are</a>' +
          '<a href="mission.html">Our mission</a>' +
          '<a href="people.html">Our staff</a>' +
        '</div>' +
      '</div>' +

      '<div id="program-wrap">' +
        '<a href="#" class="item" id="program-btn">Our programs</a>' +
        '<div id="program-menu">' +
          '<a href="bms.html">Biomedical Sciences</a>' +
          '<a href="bme.html">Biomedical Engineering</a>' +
        '</div>' +
      '</div>' +

      /* ===== Academics (mega dropdown 4 คอลัมน์) ===== */
      '<div id="academics-wrap">' +
        '<a href="#" class="item" id="academics-btn">Academics</a>' +
        '<div id="academics-menu">' +
          '<div class="col">' +
            '<h4>Academics</h4>' +
            '<a href="overview.html">Overview</a>' +
            '<a href="course-descriptions.html">Course Descriptions</a>' +
          '</div>' +
          '<div class="col">' +
            '<h4>Biomedical Sciences</h4>' +
            '<a href="phd-programme.html">Ph.D. Program</a>' +
            '<a href="phd-plos.html">M.Sc.Program</a>' +
          '</div>' +
          '<div class="col">' +
            '<h4>Biomedical Engineering</h4>' +
            '<a href="msc-programme.html">Ph.D. Program</a>' +
            '<a href="msc-plos.html">M.Sc.Program</a>' +
          '</div>' +
          '<div class="col">' +
            '<h4>Scholarship</h4>' +
            '<a href="Scholarship.html">PSU-Graduate Studies</a>' +
            '<a href="ScholarshipPSU.html">MedPSU-Graduate Studies</a>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<a href="admission.html" class="item nav-link">Admission</a>' +
      '<a href="contact us.html" class="item nav-link">Contact</a>' +

      '<div class="right">' +
        '<a href="#" class="item btn" id="search-open">&#128269; Search</a>' +
        '<form id="search-form" action="search.html" method="get">' +
          '<input type="text" name="q" id="search-input" placeholder="Search..." autocomplete="off">' +
          '<button type="submit" id="search-go">Search</button>' +
          '<button type="button" id="search-close" title="Close">&#10005;</button>' +
        '</form>' +
      '</div>' +

      '<button type="button" id="burger" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
      '<div id="mobile-menu">' +
        '<a href="#" id="m-about-btn">About us &#9662;</a>' +
        '<div id="m-about-sub">' +
          '<a href="about.html">Who we are</a>' +
          '<a href="mission.html">Our mission</a>' +
          '<a href="people.html">Our staff</a>' +
        '</div>' +
        '<a href="#" id="m-program-btn">Our programs &#9662;</a>' +
        '<div id="m-program-sub">' +
          '<a href="bms.html">Biomedical Sciences</a>' +
          '<a href="bme.html">Biomedical Engineering</a>' +
        '</div>' +
        '<a href="#" id="m-academics-btn">Academics &#9662;</a>' +
        '<div id="m-academics-sub">' +
          '<div class="m-head">Academics</div>' +
          '<a href="overview.html">Overview</a>' +
          '<a href="course-descriptions.html">Course Descriptions</a>' +
          '<div class="m-head">Biomedical Sciences</div>' +
          '<a href="phd-programme.html">Ph.D. Program</a>' +
          '<a href="phd-plos.html">M.Sc.Program</a>' +
          '<div class="m-head">Biomedical Engineering</div>' +
          '<a href="msc-programme.html">Ph.D. Program</a>' +
          '<a href="msc-plos.html">M.Sc.Program</a>' +
          '<div class="m-head">Scholarship</div>' +
          '<a href="Scholarship.html">PSU-Graduate Studies</a>' +
          '<a href="ScholarshipPSU.html">MedPSU-Graduate Studies</a>' +
        '</div>' +
        '<a href="admission.html">Admission</a>' +
        '<a href="contact us.html">Contact</a>' +
        '<form id="m-search" action="search.html" method="get">' +
          '<input type="text" name="q" placeholder="Search..." autocomplete="off">' +
          '<button type="submit">&#128269; Search</button>' +
        '</form>' +
      '</div>' +
    '</div>';

  var navBar = document.getElementById("nav");
  var burger = document.getElementById("burger");
  var mobileMenu = document.getElementById("mobile-menu");
    // ขีดเส้นใต้เมนูของหน้าที่กำลังแสดงอยู่
  function norm(p) {
    p = (p || "").split("#")[0].split("?")[0].toLowerCase();
    p = p.replace(/\/+$/, "").split("/").pop();   // เอาชื่อหน้าท้ายสุด
    p = p.replace(/\.html?$/, "");                // ตัด .html ออก
    return p === "" ? "index" : p;
  }
  var page = norm(decodeURIComponent(location.pathname));

  var groups = {
    "about-btn":   ["about", "mission", "people"],
    "program-btn": ["bms", "bme"],
    "academics-btn": ["overview", "course-descriptions",
                      "phd-programme", "phd-plos", "msc-programme", "msc-plos", "Scholarship"]
  };

  // Admission, Contact
  var navLinks = navBar.querySelectorAll("a.nav-link");
  for (var i = 0; i < navLinks.length; i++) {
    if (norm(navLinks[i].getAttribute("href")) === page) navLinks[i].classList.add("active");
  }
  // About us, Our programs, Academics (ขีดที่ปุ่มแม่เมื่อเปิดหน้าในเมนูย่อย)
  for (var id in groups) {
    if (groups[id].indexOf(page) !== -1) document.getElementById(id).classList.add("active");
  }
  // เมนูมือถือ
  var mLinks = mobileMenu.querySelectorAll("a[href]");
  for (var j = 0; j < mLinks.length; j++) {
    var h = mLinks[j].getAttribute("href");
    if (h !== "#" && norm(h) === page) mLinks[j].classList.add("active");
  }
  // เปลี่ยนสีแถบเมนูเมื่อ scroll
  function onScrollNav() {
    var y = window.pageYOffset || document.documentElement.scrollTop || 0;
    var solid = document.body.className.indexOf("nav-solid") !== -1;
    if (solid || y > 20) { navBar.classList.add("scrolled"); } else { navBar.classList.remove("scrolled"); }
  }
  window.addEventListener("scroll", onScrollNav);
  onScrollNav();

  // เมนู 3 ขีด (มือถือ)
  function setMobileOpen(open) {
    if (open) { navBar.classList.add("open"); } else { navBar.classList.remove("open"); }
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  }
  burger.onclick = function () {
    setMobileOpen(!navBar.classList.contains("open"));
  };

  // เมนูย่อยบนมือถือ (About us / Our programs / Academics)
  function setupMobileSub(btnId, subId) {
    document.getElementById(btnId).onclick = function (e) {
      e.preventDefault();
      var sub = document.getElementById(subId);
      sub.style.display = (sub.style.display === "block") ? "none" : "block";
    };
  }
  setupMobileSub("m-about-btn", "m-about-sub");
  setupMobileSub("m-program-btn", "m-program-sub");
  setupMobileSub("m-academics-btn", "m-academics-sub");

  // กดลิงก์ในเมนูมือถือแล้วปิดเมนู (ยกเว้นปุ่มที่เปิดเมนูย่อย)
  mobileMenu.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest("a") : null;
    if (a && a.id !== "m-about-btn" && a.id !== "m-program-btn" && a.id !== "m-academics-btn") setMobileOpen(false);
  });
// กดนอกเมนูมือถือ -> ปิดเมนู
document.addEventListener("click", function (e) {
  if (!navBar.classList.contains("open")) return;
  if (burger.contains(e.target) || mobileMenu.contains(e.target)) return;
  setMobileOpen(false);
});

// กด Escape -> ปิดเมนูมือถือ
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") setMobileOpen(false);
});
  document.getElementById("m-search").onsubmit = function (e) {
    if (this.q.value.replace(/\s+/g, "") === "") { e.preventDefault(); this.q.focus(); }
  };
  window.addEventListener("resize", function () {
    if (window.innerWidth > 900) setMobileOpen(false);
  });

  // Dropdown เดสก์ท็อป (About us / Our programs / Academics): เปิดอันหนึ่งแล้วอีกอันปิด
  var dropdowns = [];
  function closeAllDropdowns() {
    for (var i = 0; i < dropdowns.length; i++) dropdowns[i].menu.style.display = "none";
  }
  // showAs: ค่า display ตอนเปิด ("block" ปกติ, "grid" สำหรับ mega menu)
  function setupDropdown(wrapId, btnId, menuId, showAs) {
    var wrap = document.getElementById(wrapId);
    var btn = document.getElementById(btnId);
    var menu = document.getElementById(menuId);
    showAs = showAs || "block";
    dropdowns.push({ wrap: wrap, menu: menu });
    btn.onclick = function (e) {
      e.preventDefault();
      var willOpen = menu.style.display !== showAs;
      closeAllDropdowns();
      if (willOpen) menu.style.display = showAs;
    };
  }
  setupDropdown("about-wrap", "about-btn", "about-menu");
  setupDropdown("program-wrap", "program-btn", "program-menu");
  setupDropdown("academics-wrap", "academics-btn", "academics-menu", "grid");

  document.addEventListener("click", function (e) {
    for (var i = 0; i < dropdowns.length; i++) {
      if (dropdowns[i].wrap.contains(e.target)) return; // คลิกในดรอปดาวน์ตัวเอง ให้ปุ่มจัดการเอง
    }
    closeAllDropdowns();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeAllDropdowns();
  });
  function goSearch(value) {
    value = value.replace(/^\s+|\s+$/g, "");
    if (value === "") return false;
    window.location.href = "search.html?q=" + encodeURIComponent(value);
    return true;
  }
  // Search: กด Search -> เปิดช่องพิมพ์ / กด Enter หรือปุ่ม Search -> ไปหน้า search.html?q=...
  var openBtn = document.getElementById("search-open");
  var searchForm = document.getElementById("search-form");
  var searchInput = document.getElementById("search-input");

  function closeSearch() {
    searchForm.style.display = "none";
    openBtn.style.display = "";          // คืนค่าตาม CSS (inline-flex)
    searchInput.value = "";
  }
  openBtn.onclick = function (e) {
    e.preventDefault();
    closeAllDropdowns();
    openBtn.style.display = "none";
    searchForm.style.display = "flex";   // เดิม inline-block
    searchInput.focus();
  };
  document.getElementById("search-close").onclick = closeSearch;
  searchForm.onsubmit = function (e) {
    e.preventDefault();
    if (!goSearch(searchInput.value)) searchInput.focus();
  };
  searchInput.onkeydown = function (e) { if (e.key === "Escape") closeSearch(); };
})();