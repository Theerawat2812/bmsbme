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
          '<a href="BMS.html">Biomedical Sciences</a>' +
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
            '<a href="BMScurriculum.html#phd">Ph.D. Program</a>' +
            '<a href="BMScurriculum.html#msc">M.Sc. Program</a>' +
          '</div>' +
          '<div class="col">' +
            '<h4>Biomedical Engineering</h4>' +
            '<a href="BMEcurriculum.html#phd">Ph.D. Program</a>' +
            '<a href="BMEcurriculum.html#msc">M.Sc. Program</a>' +
          '</div>' +
          '<div class="col">' +
            '<h4>Scholarship</h4>' +
            '<a href="Scholarship.html">PSU-Graduate Studies</a>' +
            '<a href="ScholarshipPSU.html">MedPSU-Graduate Studies</a>' +
          '</div>' +
        '</div>' +
      '</div>' +

      '<a href="admission.html" class="item nav-link">Admission</a>' +
      '<a href="alumni.html" class="item nav-link">Alumni</a>' +
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
        '<a href="#" id="m-about-btn">About us &#9662;</a>' +
        '<div id="m-about-sub">' +
          '<a href="about.html">Who we are</a>' +
          '<a href="mission.html">Our mission</a>' +
          '<a href="people.html">Our staff</a>' +
        '</div>' +
        '<a href="#" id="m-program-btn">Our programs &#9662;</a>' +
        '<div id="m-program-sub">' +
          '<a href="BMS.html">Biomedical Sciences</a>' +
          '<a href="bme.html">Biomedical Engineering</a>' +
        '</div>' +
        '<a href="#" id="m-academics-btn">Academics &#9662;</a>' +
        '<div id="m-academics-sub">' +
          '<div class="m-head">Academics</div>' +
          '<a href="overview.html">Overview</a>' +
          '<a href="course-descriptions.html">Course Descriptions</a>' +
          '<div class="m-head">Biomedical Sciences</div>' +
          '<a href="BMScurriculum.html#phd">Ph.D. Program</a>' +
          '<a href="BMScurriculum.html#msc">M.Sc. Program</a>' +
          '<div class="m-head">Biomedical Engineering</div>' +
          '<a href="BMEcurriculum.html#phd">Ph.D. Program</a>' +
          '<a href="BMEcurriculum.html#msc">M.Sc. Program</a>' +
          '<div class="m-head">Scholarship</div>' +
          '<a href="Scholarship.html">PSU-Graduate Studies</a>' +
          '<a href="ScholarshipPSU.html">MedPSU-Graduate Studies</a>' +
        '</div>' +
        '<a href="admission.html">Admission</a>' +
        '<a href="alumni.html">Alumni</a>' +
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

  // ชื่อหน้าเป็นตัวพิมพ์เล็กทั้งหมด (norm แปลงเป็นตัวเล็กแล้ว)
  var groups = {
    "about-btn":     ["about", "mission", "people"],
    "program-btn":   ["bms", "bme"],
    "academics-btn": ["overview", "course-descriptions", "bmscurriculum", "bmecurriculum",
                      "phd-programme", "phd-plos", "msc-programme", "msc-plos",
                      "scholarship", "scholarshippsu"]
  };

  // Admission, Alumni, Contact
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
    if (window.innerWidth > 1100) setMobileOpen(false);
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

  // ===== Search: ผลการค้นหาขึ้นเป็นแถบใต้ช่องค้นหา =====
  // รายชื่อหน้าที่ให้ค้นหา — เพิ่มหน้าใหม่ได้ที่นี่ (ใช้ชุดเดียวกับ search.html)
  var SEARCH_PAGES = [
    { url: "index.html",               name: "Home" },
    { url: "about.html",               name: "Who we are" },
    { url: "mission.html",             name: "Our mission" },
    { url: "people.html",              name: "Our staff" },
    { url: "BMS.html",                 name: "Biomedical Sciences" },
    { url: "bme.html",                 name: "Biomedical Engineering" },
    { url: "overview.html",            name: "Academics Overview" },
    { url: "course-descriptions.html", name: "Course Descriptions" },
    { url: "BMScurriculum.html",       name: "Biomedical Sciences Curriculum" },
    { url: "BMEcurriculum.html",       name: "Biomedical Engineering Curriculum" },
    { url: "Scholarship.html",         name: "Scholarship (PSU-Graduate Studies)" },
    { url: "ScholarshipPSU.html",      name: "Scholarship (MedPSU-Graduate Studies)" },
    { url: "admission.html",           name: "Admission" },
    { url: "alumni.html",              name: "Alumni" },
    { url: "contact us.html",          name: "Contact" }
  ];
  var MAX_RESULTS = 6;

  var openBtn = document.getElementById("search-open");
  var searchForm = document.getElementById("search-form");
  var searchInput = document.getElementById("search-input");
  var resultsBox = document.getElementById("search-results");

  function esc(s) { return s.replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function escRe(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
  function countOf(hay, needle) { return hay.split(needle).length - 1; }

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

  var searchToken = 0;
  function runSearch(value) {
    value = value.replace(/^\s+|\s+$/g, "");
    var token = ++searchToken;
    if (value === "") { resultsBox.style.display = "none"; resultsBox.innerHTML = ""; return; }
    var terms = value.toLowerCase().split(/\s+/).filter(Boolean);
    var re = new RegExp("(" + terms.map(escRe).join("|") + ")", "gi");
    function hl(text) {
      return text.split(re).map(function (part, i) { return i % 2 ? "<mark>" + esc(part) + "</mark>" : esc(part); }).join("");
    }
    resultsBox.style.display = "block";
    if (!searchIndex) resultsBox.innerHTML = '<div class="sr-msg">Searching...</div>';

    loadIndex().then(function (pages) {
      if (token !== searchToken) return;           // มีการพิมพ์ใหม่แล้ว ทิ้งผลเก่า
      if (!pages.length) {
        resultsBox.innerHTML = '<div class="sr-msg">Cannot load pages for searching. Please open the site through a web server.</div>';
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

      if (!hits.length) { resultsBox.innerHTML = '<div class="sr-msg">No results for "' + esc(value) + '"</div>'; return; }
      var html = hits.slice(0, MAX_RESULTS).map(function (h) {
        return '<a class="sr-item" href="' + esc(encodeURI(h.pg.url)) + '">' +
          '<span class="sr-title">' + hl(h.pg.title) + '</span>' +
          '<span class="sr-snip">' + hl(h.snippet) + '</span></a>';
      }).join("");
      if (hits.length > MAX_RESULTS) {
        html += '<a class="sr-all" href="search.html?q=' + encodeURIComponent(value) + '">See all ' + hits.length + ' results</a>';
      }
      resultsBox.innerHTML = html;
    });
  }

  function closeSearch() {
    searchToken++;
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

  // พิมพ์แล้วค้นหาทันที (หน่วงเล็กน้อย) / กด Enter หรือปุ่ม Search ก็ค้นหาเลย
  var typingTimer = null;
  searchInput.oninput = function () {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(function () { runSearch(searchInput.value); }, 200);
  };
  searchForm.onsubmit = function (e) {
    e.preventDefault();
    clearTimeout(typingTimer);
    if (searchInput.value.replace(/\s+/g, "") === "") { searchInput.focus(); return; }
    runSearch(searchInput.value);
  };
  searchInput.onkeydown = function (e) { if (e.key === "Escape") closeSearch(); };
})();