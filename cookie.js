// cookie.js - Cookie consent card
(function () {
  var KEY = "cookie_consent";

  try { if (localStorage.getItem(KEY)) return; } catch (e) {}

  var bar = document.createElement("div");
  bar.id = "cookie-bar";
  bar.setAttribute("role", "dialog");
  bar.setAttribute("aria-label", "Cookie consent");
  bar.innerHTML =
    '<div class="cookie-icon">' +
      '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M21 12.5A9 9 0 1 1 11.5 3a3.5 3.5 0 0 0 4 4 3.5 3.5 0 0 0 5.5 5.5z"/>' +
        '<circle cx="8.5" cy="11" r="1" fill="currentColor"/>' +
        '<circle cx="12" cy="16" r="1" fill="currentColor"/>' +
        '<circle cx="15.5" cy="12.5" r="1" fill="currentColor"/>' +
      '</svg>' +
    '</div>' +
    '<div class="cookie-body">' +
      '<h4>We value your privacy</h4>' +
      '<p>We use cookies to improve your browsing experience and analyse site traffic. ' +
      'You can accept or decline non-essential cookies. ' +
      '<a href="privacy.html">Learn more</a></p>' +
      '<div class="cookie-actions">' +
        '<button type="button" id="cookie-decline">Decline</button>' +
        '<button type="button" id="cookie-accept">Accept all</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(bar);

  function choose(value) {
    try { localStorage.setItem(KEY, value); } catch (e) {}
    bar.classList.remove("show");
    setTimeout(function () { bar.remove(); }, 400);
  }
  document.getElementById("cookie-accept").onclick = function () { choose("accepted"); };
  document.getElementById("cookie-decline").onclick = function () { choose("declined"); };

  setTimeout(function () { bar.classList.add("show"); }, 150);
})();