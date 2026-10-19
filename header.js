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
          '<a href="whoweare.html">Who we are</a>' +
          '<a href="mission.html">Our mission</a>' +
          '<a href="staff.html">Our staff</a>' +
        '</div>' +
      '</div>' +

      '<div id="program-wrap">' +
        '<a href="#" class="item" id="program-btn">Our programs</a>' +
        '<div id="program-menu">' +
          '<a href="BMS.html">Biomedical Sciences</a>' +
          '<a href="bme.html">Biomedical Engineering</a>' +
        '</div>' +
      '</div>' +

      /* ===== Academics (mega dropdown 2 คอลัมน์) ===== */
      '<div id="academics-wrap">' +
        '<a href="#" class="item" id="academics-btn">Academics</a>' +
        '<div id="academics-menu">' +
          '<div class="col">' +
            '<h4>Study Information</h4>' +
            '<a href="overview.html">Overview</a>' +
            '<a href="course-descriptions.html">Course Descriptions</a>' +
          '</div>' +
          '<div class="col">' +
            '<h4>Scholarship</h4>' +
            '<a href="Scholarship.html">PSU Graduate School Scholarships</a>' +
            '<a href="ScholarshipPSU.html">Faculty of Medicine Scholarships</a>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<a href="admission.html" class="item nav-link">Admission</a>' +
      '<a href="alumni.html" class="item nav-link">Alumni</a>' +

      /* ===== Services ===== */
      '<div id="services-wrap">' +
        '<a href="#" class="item" id="services-btn">Services</a>' +
        '<div id="services-menu">' +
          '<a href="research_consultation_service.html">Research Consulting Service - RCS</a>' +
          '<a href="bioact.html">Biological Activity Testing Center - BioAct</a>' +
        '</div>' +
      '</div>' +

      '<a href="contact us.html" class="item nav-link">Contact</a>' +

      '<div class="right">' +
        /* ปุ่ม Search: ไม่มีตัวหนังสือ ไอคอนแว่นขยายมาจาก CSS */
        '<a href="#" class="item" id="search-open" aria-label="Search" title="Search"></a>' +
        '<form id="search-form" action="search.html" method="get">' +
          '<input type="text" name="q" id="search-input" placeholder="Search..." autocomplete="off">' +
          '<button type="submit" id="search-go">Search</button>' +
          '<button type="button" id="search-close" title="Close">&#10005;</button>' +
          '<div id="search-results"></div>' +
        '</form>' +
      '</div>' +

      '<button type="button" id="burger" aria-label="Menu" aria-expanded="false"><span></span><span></span><span></span></button>' +
      '<div id="mobile-menu">' +
        '<a href="#" id="m-about-btn">About us</a>' +
        '<div id="m-about-sub">' +
          '<a href="whoweare.html">Who we are</a>' +
          '<a href="mission.html">Our mission</a>' +
          '<a href="staff.html">Our staff</a>' +
        '</div>' +
        '<a href="#" id="m-program-btn">Our programs</a>' +
        '<div id="m-program-sub">' +
          '<a href="BMS.html">Biomedical Sciences</a>' +
          '<a href="bme.html">Biomedical Engineering</a>' +
        '</div>' +
        '<a href="#" id="m-academics-btn">Academics</a>' +
        '<div id="m-academics-sub">' +
          '<div class="m-head">Study Information</div>' +
          '<a href="overview.html">Overview</a>' +
          '<a href="course-descriptions.html">Course Descriptions</a>' +
          '<div class="m-head">Scholarship</div>' +
          '<a href="Scholarship.html">PSU Graduate School Scholarships</a>' +
          '<a href="ScholarshipPSU.html">Faculty of Medicine Scholarships</a>' +
        '</div>' +
        '<a href="admission.html">Admission</a>' +
        '<a href="alumni.html">Alumni</a>' +
        '<a href="#" id="m-services-btn">Services</a>' +
        '<div id="m-services-sub">' +
          '<a href="research_consultation_service.html">Research Consulting Service - RCS</a>' +
          '<a href="bioact.html">Biological Activity Testing Center - BioAct</a>' +
        '</div>' +
        '<a href="contact us.html">Contact</a>' +
        '<form id="m-search" action="search.html" method="get">' +
          '<input type="text" name="q" placeholder="Search..." autocomplete="off">' +
          '<button type="submit">&#128269; Search</button>' +
        '</form>' +
        '<div id="m-search-results"></div>' +
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

  // ชื่อหน้าเป็นตัวพิมพ์เล็กทั้งหมด (norm แปลงเป็นตัวเล็กแล้ว)
  var groups = {
    "about-btn":     ["about", "mission", "staff"],
    "program-btn":   ["bms", "bme"],
    "academics-btn": ["overview", "course-descriptions", "bmscurriculum", "bmecurriculum",
                      "phd-programme", "phd-plos", "msc-programme", "msc-plos",
                      "scholarship", "scholarshippsu"],
    "services-btn":  ["rcs", "bioact"]
  };

  // Admission, Alumni, Contact
  var navLinks = navBar.querySelectorAll("a.nav-link");
  for (var i = 0; i < navLinks.length; i++) {
    if (norm(navLinks[i].getAttribute("href")) === page) navLinks[i].classList.add("active");
  }
  // About us, Our programs, Academics, Services (ขีดที่ปุ่มแม่เมื่อเปิดหน้าในเมนูย่อย)
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
    if (!open) {
      var mb = document.getElementById("m-search-results");
      if (mb) { mb.__tok = (mb.__tok || 0) + 1; mb.style.display = "none"; mb.innerHTML = ""; }
    }
  }
  burger.onclick = function () {
    setMobileOpen(!navBar.classList.contains("open"));
  };

  // เมนูย่อยบนมือถือ (About us / Our programs / Academics / Services)
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
  setupMobileSub("m-services-btn", "m-services-sub");

  // กดลิงก์ในเมนูมือถือแล้วปิดเมนู (ยกเว้นปุ่มที่เปิดเมนูย่อย)
  mobileMenu.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest("a") : null;
    if (a && a.id !== "m-about-btn" && a.id !== "m-program-btn" && a.id !== "m-academics-btn" && a.id !== "m-services-btn") setMobileOpen(false);
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
    e.preventDefault();
    var v = this.q.value.trim();
    if (v === "") { this.q.focus(); return; }
    goToResults(v);                       // Enter / ปุ่ม Search -> ไปหน้าผลการค้นหา
  };
  window.addEventListener("resize", function () {
    if (window.innerWidth > 1100) setMobileOpen(false);
  });

  // Dropdown เดสก์ท็อป (About us / Our programs / Academics / Services): เปิดอันหนึ่งแล้วอีกอันปิด
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
  setupDropdown("services-wrap", "services-btn", "services-menu");

  document.addEventListener("click", function (e) {
    for (var i = 0; i < dropdowns.length; i++) {
      if (dropdowns[i].wrap.contains(e.target)) return; // คลิกในดรอปดาวน์ตัวเอง ให้ปุ่มจัดการเอง
    }
    closeAllDropdowns();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeAllDropdowns();
  });

  // ===== Search: พิมพ์แล้วผลขึ้นเป็นแถบใต้ช่องค้นหาแบบเรียลไทม์ =====
  // กด Enter / ปุ่ม Search / See all = ไปหน้า search.html?q=คำที่พิมพ์
  // รายชื่อหน้าที่ให้ค้นหา — เพิ่มหน้าใหม่ได้ที่นี่ (ใช้ชุดเดียวกับ search.html)
  var SEARCH_PAGES = [
    { url: "index.html",               name: "Home" },
    { url: "whoweare.html",            name: "Who we are" },
    { url: "mission.html",             name: "Our mission" },
    { url: "staff.html",               name: "Our staff" },
    { url: "BMS.html",                 name: "Biomedical Sciences" },
    { url: "bme.html",                 name: "Biomedical Engineering" },
    { url: "overview.html",            name: "Academics Overview" },
    { url: "course-descriptions.html", name: "Course Descriptions" },
    { url: "BMScurriculum.html",       name: "Biomedical Sciences Curriculum" },
    { url: "BMEcurriculum.html",       name: "Biomedical Engineering Curriculum" },
    { url: "Scholarship.html",         name: "PSU Graduate School Scholarships" },
    { url: "ScholarshipPSU.html",      name: "Faculty of Medicine Scholarships" },
    { url: "rcs.html",                 name: "Research Consulting Service (RCS)" },
    { url: "bioact.html",              name: "Biological Activity Testing Center (BioAct)" },
    { url: "admission.html",           name: "Admission" },
    { url: "alumni.html",              name: "Alumni" },
    { url: "contact us.html",          name: "Contact" }
  ];
  var MAX_RESULTS = 6;                 // จำนวนผลที่โชว์ในแถบ (ที่เหลือดูได้ที่ See all)
  var SEARCH_PAGE = "search.html";

  var openBtn = document.getElementById("search-open");
  var searchForm = document.getElementById("search-form");
  var searchInput = document.getElementById("search-input");
  var resultsBox = document.getElementById("search-results");

  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function escRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
  function countOf(hay, needle) { return hay.split(needle).length - 1; }
  function goToResults(value) {
    window.location.href = SEARCH_PAGE + "?q=" + encodeURIComponent(value);
  }

  // โหลดข้อความของทุกหน้าครั้งเดียว (ตอนเปิดช่องค้นหาครั้งแรก) แล้วเก็บไว้ใช้ซ้ำ
  var searchIndex = null, indexLoading = null;
  function loadIndex() {
    if (searchIndex) return Promise.resolve(searchIndex);
    if (indexLoading) return indexLoading;
    indexLoading = Promise.all(SEARCH_PAGES.map(function (p) {
      return fetch(encodeURI(p.url))
        .then(function (r) { if (!r.ok) throw new Error("x"); return r.text(); })
        .then(function (html) {
          var doc = new DOMParser().parseFromString(html, "text/html");
          ["script", "style", "noscript"].forEach(function (sel) {
            var list = doc.querySelectorAll(sel);
            for (var i = 0; i < list.length; i++) list[i].remove();
          });
          var text = (doc.body ? doc.body.textContent : "").replace(/\s+/g, " ").trim();
          return { url: p.url, title: (doc.title || p.name).trim(), text: text };
        })
        .catch(function () { return null; });
    })).then(function (list) {
      list = list.filter(Boolean);
      indexLoading = null;
      if (list.length) searchIndex = list;   // ถ้าโหลดไม่ได้เลย ไม่จำไว้ จะได้ลองใหม่ครั้งหน้า
      return list;
    });
    return indexLoading;
  }

  // ค้นหาแล้วแสดงผลในกล่องที่ส่งมา (box = แถบเดสก์ท็อป หรือแถบในเมนู 3 ขีด)
  function runSearch(value, box) {
    value = value.replace(/^\s+|\s+$/g, "");
    var token = box.__tok = (box.__tok || 0) + 1;
    if (value === "") { box.style.display = "none"; box.innerHTML = ""; return; }
    var terms = value.toLowerCase().split(/\s+/).filter(Boolean);
    var re = new RegExp("(" + terms.map(escRe).join("|") + ")", "gi");
    function hl(text) {
      return text.split(re).map(function (part, i) { return i % 2 ? "<mark>" + esc(part) + "</mark>" : esc(part); }).join("");
    }
    box.style.display = "block";
    if (!searchIndex) box.innerHTML = '<div class="sr-msg">Searching...</div>';

    loadIndex().then(function (pages) {
      if (token !== box.__tok) return;             // มีการพิมพ์ใหม่แล้ว ทิ้งผลเก่า
      if (!pages.length) {
        box.innerHTML = '<div class="sr-msg">Cannot load pages for searching. Please open the site through a web server.</div>';
        return;
      }
      var hits = [];
      pages.forEach(function (pg) {
        var lower = pg.text.toLowerCase(), tl = pg.title.toLowerCase();
        var score = 0, first = -1;
        for (var i = 0; i < terms.length; i++) {
          var inText = countOf(lower, terms[i]), inTitle = countOf(tl, terms[i]);
          if (!inText && !inTitle) return;          // ต้องมีครบทุกคำ
          score += inText + inTitle * 10;
          var idx = lower.indexOf(terms[i]);
          if (idx !== -1 && (first === -1 || idx < first)) first = idx;
        }
        var start = first > 60 ? first - 60 : 0;
        var snippet = (start > 0 ? "… " : "") + pg.text.substr(start, 120) + (start + 120 < pg.text.length ? " …" : "");
        hits.push({ pg: pg, score: score, snippet: snippet });
      });
      hits.sort(function (a, b) { return b.score - a.score; });

      if (!hits.length) { box.innerHTML = '<div class="sr-msg">No results for "' + esc(value) + '"</div>'; return; }
      var html = hits.slice(0, MAX_RESULTS).map(function (h) {
        return '<a class="sr-item" href="' + esc(encodeURI(h.pg.url)) + '">' +
          '<span class="sr-title">' + hl(h.pg.title) + '</span>' +
          '<span class="sr-snip">' + hl(h.snippet) + '</span></a>';
      }).join("");
      // See all: แสดงทุกครั้งที่ค้นเจอ กดแล้วไปหน้าผลค้นหาทั้งหมด
      html += '<a class="sr-all" href="' + SEARCH_PAGE + '?q=' + encodeURIComponent(value) + '">See all ' +
        hits.length + (hits.length === 1 ? ' result' : ' results') + '</a>';
      box.innerHTML = html;
    });
  }

  function closeSearch() {
    resultsBox.__tok = (resultsBox.__tok || 0) + 1;
    searchForm.style.display = "none";
    resultsBox.style.display = "none";
    resultsBox.innerHTML = "";
    searchInput.value = "";
  }
  openBtn.onclick = function (e) {
    e.preventDefault();
    if (searchForm.style.display === "flex") { closeSearch(); return; }
    closeAllDropdowns();
    searchForm.style.display = "flex";   // แสดงใต้แถบเมนู
    searchInput.focus();
    loadIndex();                         // เริ่มโหลดข้อมูลล่วงหน้า
  };
  // คลิกนอกช่องค้นหา/ผลลัพธ์ -> ปิด
  document.addEventListener("click", function (e) {
    if (searchForm.style.display !== "flex") return;
    if (searchForm.contains(e.target) || openBtn.contains(e.target)) return;
    closeSearch();
  });
  document.getElementById("search-close").onclick = closeSearch;

  // พิมพ์ = ผลขึ้นทันที (หน่วงเล็กน้อย)
  var typingTimer = null;
  searchInput.oninput = function () {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(function () { runSearch(searchInput.value, resultsBox); }, 200);
  };
  // กด Enter หรือปุ่ม Search = ไปหน้าผลการค้นหา
  searchForm.onsubmit = function (e) {
    e.preventDefault();
    clearTimeout(typingTimer);
    var v = searchInput.value.trim();
    if (v === "") { searchInput.focus(); return; }
    goToResults(v);
  };
  searchInput.onkeydown = function (e) { if (e.key === "Escape") closeSearch(); };

  // ===== Search ในเมนู 3 ขีด (มือถือ/จอย่อ): พิมพ์แล้วผลขึ้นทันทีเหมือนเดสก์ท็อป =====
  var mInput = document.querySelector("#m-search input");
  var mBox = document.getElementById("m-search-results");
  var mTimer = null;
  mInput.oninput = function () {
    clearTimeout(mTimer);
    mTimer = setTimeout(function () { runSearch(mInput.value, mBox); }, 200);
  };
  mInput.onfocus = function () { loadIndex(); };   // โหลดข้อมูลล่วงหน้า

  // ให้หน้า search.html ใช้รายชื่อหน้าและข้อมูลชุดเดียวกัน (แก้ที่เดียวพอ)
  window.SITE_SEARCH = { pages: SEARCH_PAGES, loadIndex: loadIndex };
})();