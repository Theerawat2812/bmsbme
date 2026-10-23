<?php
declare(strict_types=1);
session_set_cookie_params(['httponly' => true, 'samesite' => 'Lax', 'secure' => !empty($_SERVER['HTTPS'])]);
session_start();
header('X-Robots-Tag: noindex, nofollow');
header('Content-Type: text/html; charset=utf-8');

$dataFile = __DIR__ . '/data/news.json';
$cfgFile  = __DIR__ . '/data/config.json';
$upDir    = __DIR__ . '/uploads/';
$categories = ['News', 'Announcement', 'Event', 'Achievement', 'Admission']; // edit categories here

require __DIR__ . '/lib.php';

if (empty($_SESSION['csrf'])) $_SESSION['csrf'] = bin2hex(random_bytes(16));
$cfg = loadJson($cfgFile);
$msg = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $act = $_POST['action'] ?? '';
    $csrfOk = hash_equals($_SESSION['csrf'], $_POST['csrf'] ?? '');

    if (!$cfg && $act === 'setup' && $csrfOk) {
        $u = trim($_POST['username'] ?? ''); $p = $_POST['password'] ?? '';
        if ($u !== '' && strlen($p) >= 8) {
            saveJson($cfgFile, ['username' => $u, 'password_hash' => password_hash($p, PASSWORD_DEFAULT)]);
            header('Location: admin.php'); exit;
        }
        $msg = 'Enter a username and a password of at least 8 characters.';
    } elseif ($act === 'login' && $csrfOk && $cfg) {
        if (hash_equals($cfg['username'], $_POST['username'] ?? '') && password_verify($_POST['password'] ?? '', $cfg['password_hash'])) {
            session_regenerate_id(true);
            $_SESSION['auth'] = true;
            header('Location: admin.php'); exit;
        }
        sleep(1); $msg = 'Incorrect username or password.';
    } elseif (!empty($_SESSION['auth']) && $csrfOk) {
        if ($act === 'logout') { session_destroy(); header('Location: admin.php'); exit; }

        $news = loadJson($dataFile);
        if ($act === 'delete') {
            foreach ($news as $i => $n) if ($n['id'] === ($_POST['id'] ?? '')) {
                if (!empty($n['cover'])) @unlink($upDir . basename($n['cover']));
                deletePage($n);
                unset($news[$i]);
            }
            saveJson($dataFile, array_values($news));
            header('Location: admin.php?ok=1'); exit;
        }
        if ($act === 'rebuild') {
            $built = 0;
            foreach ($news as &$n) { if (empty($n['slug'])) $n['slug'] = slugFor($n); if (buildPage($n)) $built++; }
            unset($n); saveJson($dataFile, array_values($news));
            header('Location: admin.php?ok=1&built=' . $built); exit;
        }
        if ($act === 'save') {
            $title = trim($_POST['title'] ?? ''); $content = trim($_POST['content'] ?? '');
            $cat = in_array($_POST['category'] ?? '', $categories, true) ? $_POST['category'] : $categories[0];
            $date = preg_match('/^\d{4}-\d{2}-\d{2}$/', $_POST['date'] ?? '') ? $_POST['date'] : date('Y-m-d');
            if ($title === '' || $content === '') { $msg = 'Please enter a title and content.'; }
            else {
                $id = $_POST['id'] ?? ''; $idx = null;
                foreach ($news as $i => $n) if ($n['id'] === $id) $idx = $i;
                $item = $idx !== null ? $news[$idx] : ['id' => bin2hex(random_bytes(6)), 'cover' => ''];
                $f = $_FILES['cover'] ?? null;
                if ($f && $f['error'] === UPLOAD_ERR_OK) {
                    $ext = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp', 'image/gif' => 'gif'][(new finfo(FILEINFO_MIME_TYPE))->file($f['tmp_name'])] ?? null;
                    if (!$ext || $f['size'] > 5 * 1024 * 1024) { $msg = 'Cover image must be JPG, PNG, WEBP or GIF, up to 5 MB.'; }
                    else {
                        $name = bin2hex(random_bytes(8)) . '.' . $ext;
                        if (move_uploaded_file($f['tmp_name'], $upDir . $name)) {
                            if ($item['cover']) @unlink($upDir . basename($item['cover']));
                            $item['cover'] = $name;
                        }
                    }
                }
                $skipped = 0; $photos = (array)($item['photos'] ?? []);
                foreach ((array)($_POST['remove_photos'] ?? []) as $rp) {
                    $k = array_search($rp, $photos, true);
                    if ($k !== false) { @unlink($upDir . basename((string)$rp)); unset($photos[$k]); }
                }
                $photos = array_values($photos);
                $pf = $_FILES['photos'] ?? null;
                if ($pf && is_array($pf['name'])) {
                    $mimes = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp', 'image/gif' => 'gif'];
                    foreach ($pf['name'] as $k => $unused) {
                        if ($pf['error'][$k] === UPLOAD_ERR_NO_FILE) continue;
                        $ext = $pf['error'][$k] === UPLOAD_ERR_OK ? ($mimes[(new finfo(FILEINFO_MIME_TYPE))->file($pf['tmp_name'][$k])] ?? null) : null;
                        if (!$ext || $pf['size'][$k] > 5 * 1024 * 1024 || count($photos) >= 12) { $skipped++; continue; }
                        $name = bin2hex(random_bytes(8)) . '.' . $ext;
                        if (move_uploaded_file($pf['tmp_name'][$k], $upDir . $name)) $photos[] = $name; else $skipped++;
                    }
                }
                if ($msg === '') {
                    $item['photos'] = $photos;
                    $item = array_merge($item, ['title' => $title, 'content' => $content, 'category' => $cat, 'date' => $date]);
                    if (empty($item['slug'])) $item['slug'] = slugFor($item);
                    if ($idx !== null) $news[$idx] = $item; else $news[] = $item;
                    saveJson($dataFile, array_values($news));
                    header('Location: admin.php?ok=1' . (buildPage($item) ? '' : '&warn=1') . ($skipped ? '&skip=' . $skipped : '')); exit;
                }
            }
        }
    }
}

$auth = !empty($_SESSION['auth']);
$news = $auth ? loadJson($dataFile) : [];
if ($auth) {
    $chg = false;
    foreach ($news as &$n) { if (empty($n['slug'])) { $n['slug'] = slugFor($n); $chg = true; } if (!is_file(pageFile($n))) buildPage($n); }
    unset($n);
    if ($chg) saveJson($dataFile, $news);
}
usort($news, fn($a, $b) => strcmp($b['date'], $a['date']));
$edit = null;
if ($auth && isset($_GET['edit'])) foreach ($news as $n) if ($n['id'] === $_GET['edit']) $edit = $n;
$csrf = $_SESSION['csrf'];
?>
<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>News manager</title>
<style>
body{font-family:system-ui,"Noto Sans Thai",sans-serif;background:#f4f5f7;margin:0;color:#222}
.wrap{max-width:900px;margin:0 auto;padding:20px}
.card{background:#fff;border-radius:10px;padding:20px;margin-bottom:20px;box-shadow:0 1px 3px rgba(0,0,0,.08)}
label{display:block;margin:12px 0 4px;font-weight:600}
input,select,textarea{width:100%;padding:10px;border:1px solid #ccc;border-radius:6px;font:inherit;box-sizing:border-box}
textarea{min-height:200px}
button,.btn{background:#2563eb;color:#fff;border:0;padding:10px 18px;border-radius:6px;cursor:pointer;font:inherit;text-decoration:none;display:inline-block}
.btn2{background:#e5e7eb;color:#222}.del{background:#dc2626}
.msg{padding:10px;border-radius:6px;margin-bottom:12px}.err{background:#fee2e2}.ok{background:#dcfce7}
table{width:100%;border-collapse:collapse}td,th{padding:8px;border-bottom:1px solid #eee;text-align:left;vertical-align:middle}
img.th{width:60px;height:40px;object-fit:cover;border-radius:4px}
.top{display:flex;justify-content:space-between;align-items:center}
form.inline{display:inline}
</style></head><body><div class="wrap">

<?php if ($msg): ?><div class="msg err"><?= e($msg) ?></div><?php endif; ?>
<?php if (isset($_GET['warn'])): ?><div class="msg err">Saved, but the story page could not be created. Make the <b>news</b> folder (next to index.html) writable (chmod 775), then click "Rebuild all pages".</div>
<?php elseif (isset($_GET['ok'])): ?><div class="msg ok">Saved.<?= isset($_GET['skip']) ? ' ' . (int)$_GET['skip'] . ' photo(s) skipped (JPG/PNG/WEBP/GIF only, up to 5 MB each, max 12 per story).' : '' ?><?= isset($_GET['built']) ? ' Rebuilt ' . (int)$_GET['built'] . ' pages.' : '' ?></div><?php endif; ?>

<?php if (!$cfg): ?>
  <div class="card"><h2>First-time setup</h2><p>Create the admin account</p>
  <form method="post"><input type="hidden" name="csrf" value="<?= e($csrf) ?>"><input type="hidden" name="action" value="setup">
  <label>Username</label><input name="username" required>
  <label>Password (8+ characters)</label><input type="password" name="password" minlength="8" required>
  <p><button>Create account</button></p></form></div>

<?php elseif (!$auth): ?>
  <div class="card" style="max-width:380px;margin:60px auto"><h2>Sign in</h2>
  <form method="post"><input type="hidden" name="csrf" value="<?= e($csrf) ?>"><input type="hidden" name="action" value="login">
  <label>Username</label><input name="username" required autofocus>
  <label>Password</label><input type="password" name="password" required>
  <p><button>Sign in</button></p></form></div>

<?php else: ?>
  <div class="top"><h1>News manager</h1>
  <form method="post"><input type="hidden" name="csrf" value="<?= e($csrf) ?>"><input type="hidden" name="action" value="logout"><button class="btn2" style="color:#222">Sign out</button></form></div>

  <div class="card"><h2><?= $edit ? 'Edit story' : 'Add a new story' ?></h2>
  <form method="post" enctype="multipart/form-data">
    <input type="hidden" name="csrf" value="<?= e($csrf) ?>"><input type="hidden" name="action" value="save">
    <input type="hidden" name="id" value="<?= e($edit['id'] ?? '') ?>">
    <label>Title</label><input name="title" required value="<?= e($edit['title'] ?? '') ?>">
    <label>Category</label><select name="category">
      <?php foreach ($categories as $c): ?><option <?= ($edit['category'] ?? '') === $c ? 'selected' : '' ?>><?= e($c) ?></option><?php endforeach; ?></select>
    <label>Date</label><input type="date" name="date" value="<?= e($edit['date'] ?? date('Y-m-d')) ?>">
    <label>Cover image <?= $edit && $edit['cover'] ? '(leave empty to keep current)' : '' ?></label>
    <?php if ($edit && $edit['cover']): ?><img class="th" src="uploads/<?= e($edit['cover']) ?>"><?php endif; ?>
    <input type="file" name="cover" accept="image/*">
    <label>Photos inside the story <small style="font-weight:400">(optional, up to 12)</small></label>
    <?php foreach ((array)($edit['photos'] ?? []) as $i => $ph): ?>
      <label style="display:flex;align-items:center;gap:10px;font-weight:400;margin:6px 0"><img class="th" src="uploads/<?= e($ph) ?>"> <b>[photo <?= $i + 1 ?>]</b>
      <span style="display:flex;align-items:center;gap:4px"><input type="checkbox" name="remove_photos[]" value="<?= e($ph) ?>" style="width:auto"> remove</span></label>
    <?php endforeach; ?>
    <input type="file" name="photos[]" accept="image/*" multiple>
    <small style="color:#6b7280">To place a photo inside the text, type <b>[photo 1]</b> on its own line. Photos not placed in the text appear as a gallery under the story.</small>
    <label>Content</label><textarea name="content" required><?= e($edit['content'] ?? '') ?></textarea>
    <p><button>Save</button> <?php if ($edit): ?><a class="btn btn2" href="admin.php">Cancel</a><?php endif; ?></p>
  </form></div>

  <div class="card"><div class="top"><h2>All stories (<?= count($news) ?>)</h2>
  <form method="post"><input type="hidden" name="csrf" value="<?= e($csrf) ?>"><input type="hidden" name="action" value="rebuild"><button class="btn2">Rebuild all pages</button></form></div>
  <table><tr><th></th><th>Title</th><th>Category</th><th>Date</th><th></th></tr>
  <?php foreach ($news as $n): ?><tr>
    <td><?php if ($n['cover']): ?><img class="th" src="uploads/<?= e($n['cover']) ?>"><?php endif; ?></td>
    <td><?= e($n['title']) ?></td><td><?= e($n['category']) ?></td><td><?= e($n['date']) ?></td>
    <td><a class="btn btn2" target="_blank" href="../news/<?= e($n['slug']) ?>.html">View</a> <a class="btn btn2" href="?edit=<?= e($n['id']) ?>">Edit</a>
    <form class="inline" method="post" onsubmit="return confirm('Delete this story?')">
      <input type="hidden" name="csrf" value="<?= e($csrf) ?>"><input type="hidden" name="action" value="delete"><input type="hidden" name="id" value="<?= e($n['id']) ?>">
      <button class="del">Delete</button></form></td></tr>
  <?php endforeach; ?></table></div>
<?php endif; ?>
</div></body></html>
