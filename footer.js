// footer.js - footer ที่ใช้ร่วมทุกหน้า
// วิธีใช้: ใส่ <div id="site-footer"></div> ในหน้า แล้วเรียก <script src="footer.js"></script> ท้ายหน้า
(function () {
  var mount = document.getElementById("site-footer");
  if (!mount) return;

  mount.innerHTML =
    '<footer class="site-foot">' +
      '<div class="c">' +
        '<div class="g">' +
          '<details class="col" open><summary>Department</summary><ul>' +
            '<li><a href="about.html">About us</a></li>' +
            '<li><a href="people.html">Our staff</a></li>' +
            '<li><a href="contact.html">Contact</a></li>' +
          '</ul></details>' +
          '<details class="col" open><summary>Study</summary><ul>' +
            '<li><a href="bms.html">Biomedical Sciences</a></li>' +
            '<li><a href="bme.html">Biomedical Engineering</a></li>' +
            '<li><a href="admission.html">Admission</a></li>' +
          '</ul></details>' +
          '<details class="col" open><summary>Research</summary><ul>' +
            '<li><a href="#">Research areas</a></li>' +
            '<li><a href="#">Research groups</a></li>' +
            '<li><a href="#">Publications</a></li>' +
          '</ul></details>' +
          '<details class="col" open><summary>Links</summary><ul>' +
            '<li><a href="#">Faculty of Medicine</a></li>' +
            '<li><a href="#">Prince of Songkla University</a></li>' +
            '<li><a href="#">Library</a></li>' +
          '</ul></details>' +
        '</div>' +
        '<div class="fb">Department of Biomedical Sciences and Biomedical Engineering, Faculty of Medicine, Prince of Songkla University</div>' +
      '</div>' +
    '</footer>';

  // desktop/tablet = เปิดทุกหัวข้อ, มือถือ (<=600px) = พับทั้งหมด
  var mq = window.matchMedia("(max-width:900px)");
  function sync() {
    var items = mount.querySelectorAll("details");
    for (var i = 0; i < items.length; i++) items[i].open = !mq.matches;
  }
  sync();
  if (mq.addEventListener) mq.addEventListener("change", sync);
  else mq.addListener(sync);
})();