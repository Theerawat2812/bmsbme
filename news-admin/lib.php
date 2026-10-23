<?php
declare(strict_types=1);

function e($s) { return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8'); }
function loadJson($f) { $d = is_file($f) ? json_decode((string)file_get_contents($f), true) : null; return is_array($d) ? $d : []; }
function saveJson($f, $d) { file_put_contents($f, json_encode($d, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT), LOCK_EX); }

function siteRoot() { return dirname(__DIR__); }                       // โฟลเดอร์เดียวกับ index.html
function rootUrl() {
    $d = rtrim(str_replace('\\', '/', dirname(dirname($_SERVER['SCRIPT_NAME'] ?? '/news-admin/x.php'))), '/');
    return $d . '/';
}
function siteOrigin() {
    return ((!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? 'https' : 'http') . '://' . ($_SERVER['HTTP_HOST'] ?? 'localhost');
}
function slugFor(array $n) {
    $t = trim((string)preg_replace('/[^a-z0-9]+/', '-', strtolower((string)($n['title'] ?? ''))), '-');
    $t = trim(substr($t, 0, 50), '-');
    return ($n['date'] ?? date('Y-m-d')) . '-' . ($t !== '' ? $t . '-' : '') . substr((string)$n['id'], 0, 4);
}
function excerpt($t, $len = 160) {
    $t = trim((string)preg_replace('/\s+/', ' ', (string)$t));
    return mb_strlen($t) > $len ? rtrim(mb_substr($t, 0, $len)) . '…' : $t;
}
function pageFile(array $n) { return siteRoot() . '/news/' . basename((string)$n['slug']) . '.html'; }
function buildPage(array $n) {
    $dir = siteRoot() . '/news';
    if (!is_dir($dir) && !@mkdir($dir, 0755, true)) return false;
    return @file_put_contents(pageFile($n), renderStory($n), LOCK_EX) !== false;
}
function deletePage(array $n) { if (!empty($n['slug'])) @unlink(pageFile($n)); }

function renderStory(array $n) {
    $root = rootUrl(); $site = siteOrigin() . $root;
    $title = e($n['title']); $cat = e($n['category']);
    $date = date('j M Y', (int)strtotime((string)$n['date']));
    $desc = e(excerpt($n['content'], 160));
    $url  = $site . 'news/' . $n['slug'] . '.html';
    $img  = !empty($n['cover']) ? 'news-admin/uploads/' . $n['cover'] : '';
    $photos = array_values((array)($n['photos'] ?? [])); $used = [];
    $fig = function ($i) use ($photos, $title) {
        return '<figure class="np-photo"><img src="news-admin/uploads/' . e($photos[$i]) . '" alt="' . $title . '" loading="lazy"></figure>';
    };
    $text = preg_replace('/^[ \t]*\[photo\s*(\d+)\][ \t]*$/mi', "\n\n[photo $1]\n\n", str_replace("\r", '', trim((string)$n['content'])));
    $paras = '';
    foreach (preg_split('/\n{2,}/', (string)$text) as $p) {
        $p = trim($p); if ($p === '') continue;
        if (preg_match('/^\[photo\s*(\d+)\]$/i', $p, $m) && isset($photos[(int)$m[1] - 1])) {
            $used[(int)$m[1] - 1] = true; $paras .= $fig((int)$m[1] - 1) . "\n"; continue;
        }
        $paras .= '<p>' . nl2br(e($p)) . "</p>\n";
    }
    $gal = '';
    foreach ($photos as $i => $unused) if (empty($used[$i])) $gal .= $fig($i);
    if ($gal !== '') $paras .= '<div class="np-gallery">' . $gal . "</div>\n";
    ob_start(); ?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<base href="<?= e($root) ?>">
<title><?= $title ?> | News | Biomedical Sciences &amp; Biomedical Engineering, PSU</title>
<meta name="description" content="<?= $desc ?>">
<link rel="canonical" href="<?= e($url) ?>">
<meta property="og:type" content="article">
<meta property="og:title" content="<?= $title ?>">
<meta property="og:description" content="<?= $desc ?>">
<meta property="og:url" content="<?= e($url) ?>">
<?php if ($img): ?><meta property="og:image" content="<?= e($site . $img) ?>">
<?php endif; ?>
<link rel="stylesheet" href="header.css">
<link rel="stylesheet" href="footer.css">
<link rel="stylesheet" href="news.css">
</head>
<body class="nav-solid">
<div id="site-nav"></div>

<header class="np np-hero">
  <div class="np-wrap">
    <a class="np-eyebrow" href="news.html">News &amp; announcements</a>
    <h1><?= $title ?></h1>
    <div class="np-meta"><span class="np-cat"><?= $cat ?></span><time datetime="<?= e($n['date']) ?>"><?= e($date) ?></time></div>
  </div>
</header>

<main class="np np-article">
  <?php if ($img): ?><figure class="np-cover"><img src="<?= e($img) ?>" alt="<?= $title ?>"></figure>
  <?php endif; ?>
  <div class="np-body">
<?= $paras ?>
  </div>
  <p class="np-actions"><a class="np-btn" href="news.html">Back to all news</a></p>
</main>

<section class="np np-more" id="npMore">
  <div class="np-wrap">
    <div class="np-morehead"><h2>More news</h2><a class="np-rm" href="news.html">All news</a></div>
    <div class="np-grid" id="npRelated"></div>
  </div>
</section>

<div id="site-footer"></div>

<script>
(function(){var nav=document.getElementById('site-nav');function u(){if(nav)nav.classList.toggle('scrolled',window.scrollY>40);}window.addEventListener('scroll',u,{passive:true});u();})();
</script>
<script src="header.js"></script>
<script src="footer.js"></script>
<script src="cookie.js"></script>
<script src="news.js"></script>
<script>
document.addEventListener('click',function(e){var i=e.target.closest&&e.target.closest('.np-photo img'); if(!i)return;
  var o=document.createElement('div'); o.className='np-lb'; var b=document.createElement('img'); b.src=i.src; b.alt=i.alt; o.appendChild(b); o.onclick=function(){o.remove();}; document.body.appendChild(o);});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){var o=document.querySelector('.np-lb'); if(o)o.remove();}});
</script>
<script>
NewsUI.api('limit=4').then(function(items){
  var cur=<?= json_encode($n['slug']) ?>, box=document.getElementById('npRelated');
  var l=items.filter(function(x){return x.slug!==cur;}).slice(0,3);
  if(!l.length){document.getElementById('npMore').hidden=true;return;}
  l.forEach(function(x){box.appendChild(NewsUI.card(x));});
}).catch(function(){document.getElementById('npMore').hidden=true;});
</script>
</body>
</html>
<?php
    return ob_get_clean();
}
