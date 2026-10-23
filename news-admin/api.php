<?php
// ส่งข่าวเป็น JSON  ตัวอย่าง: api.php?limit=4   หรือ  api.php?limit=1000 (ทั้งหมด)
require __DIR__ . '/lib.php';
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-cache');
$news = loadJson(__DIR__ . '/data/news.json');
if (!empty($_GET['category'])) $news = array_filter($news, fn($n) => $n['category'] === $_GET['category']);
usort($news, fn($a, $b) => strcmp($b['date'], $a['date']));
$limit = max(1, min(1000, (int)($_GET['limit'] ?? 10)));
$out = array_map(function ($n) {
    $slug = $n['slug'] ?? slugFor($n);
    return [
        'id' => $n['id'], 'slug' => $slug, 'url' => 'news/' . $slug . '.html',
        'title' => $n['title'], 'content' => $n['content'],
        'category' => $n['category'], 'date' => $n['date'],
        'cover' => $n['cover'] ? 'uploads/' . $n['cover'] : null,
    ];
}, array_slice(array_values($news), 0, $limit));
echo json_encode($out, JSON_UNESCAPED_UNICODE);
