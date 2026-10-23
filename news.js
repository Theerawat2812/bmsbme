/* ตัวช่วยร่วมของหน้าข่าว (ใช้ในหน้าข่าวรวมและส่วน More news) */
window.NewsUI=(function(){
  var BASE='news-admin/';
  function mk(t,c,x){var e=document.createElement(t); if(c)e.className=c; if(x!==undefined)e.textContent=x; return e;}
  function fmt(d){var x=new Date(d+'T00:00:00'); return isNaN(x)?d:x.toLocaleDateString('en-GB',{day:'numeric',month:'short',year:'numeric'});}
  function cut(t,n){t=t.replace(/\s+/g,' ').trim(); return t.length>n?t.slice(0,n).replace(/\s+\S*$/,'')+'…':t;}
  function api(q){return fetch(BASE+'api.php?'+q).then(function(r){if(!r.ok)throw 0; return r.json();});}
  function card(n){
    var a=mk('a','np-card'); a.href=n.url;
    var m=mk('div','m'); if(n.cover){var i=mk('img'); i.src=BASE+n.cover; i.alt=''; i.loading='lazy'; m.appendChild(i);} a.appendChild(m);
    var b=mk('div','b'), meta=mk('div','np-meta');
    meta.appendChild(mk('span','np-cat',n.category)); meta.appendChild(mk('time','',fmt(n.date)));
    b.appendChild(meta); b.appendChild(mk('h3','',n.title)); b.appendChild(mk('p','',cut(n.content,120))); b.appendChild(mk('span','np-rm','Read more'));
    a.appendChild(b); return a;
  }
  return {BASE:BASE,mk:mk,fmt:fmt,cut:cut,api:api,card:card};
})();
