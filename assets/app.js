/* Kendrick vs. Drake, Clipped — page logic for index.html */
(function(){
"use strict";
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => [...r.querySelectorAll(s)];
const plain = h => { const d=document.createElement("div"); d.innerHTML=h; return d.textContent; };
const esc = s => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const PHONE = `<svg width="14" height="20" viewBox="0 0 14 20" aria-hidden="true"><rect x="1" y="1" width="12" height="18" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="7" cy="15.6" r="1.1" fill="currentColor"/></svg>`;
const WAVE = `<svg width="22" height="14" viewBox="0 0 22 14" aria-hidden="true"><path d="M1 7v0M4 4v6M7 2v10M10 5v4M13 1v12M16 3v8M19 5v4M21 6v2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" fill="none"/></svg>`;
const SIDECOL = {drake:"var(--drake)",kendrick:"var(--kendrick)",platform:"var(--accent)",court:"var(--court)",other:"var(--other)"};

/* ---------- citations ---------- */
function fillCites(root){
  $$("a.cite", root||document).forEach(a => {
    const r = REFS[a.dataset.k];
    if(!r){ console.warn("Missing ref", a.dataset.k); return; }
    a.innerHTML = a.classList.contains("yr") ? r.year : r.cite;
    a.href = "references.html#r-" + a.dataset.k;
    a.title = plain(r.apa);
  });
}
window.fillCites = fillCites;

/* =================== STORY VIEW =================== */
function renderTimeline(){
  const tl = $("#tl"); if(!tl) return;
  let html = "", row = 1, lastP = 0;
  EVENTS.forEach(e => {
    if(e.p !== lastP){ html += `<div class="phase" id="phase-${e.p}" style="grid-row:${row}">${PHASES[e.p]}</div>`; row++; lastP = e.p; }
    const pos = (e.side==="drake"||e.side==="kendrick") ? e.side : "center";
    html += `<div class="item ${pos} ${e.side}" id="ev-${e.id}" data-loc="Story · Timeline · ${esc(plain(e.title))} (${esc(e.date)})" data-side="${e.side}" data-sf="${e.sfFlag?1:0}" style="grid-row:${row}">
      <article class="card">
        <div class="meta"><time class="mono">${e.date}</time><span class="badge">${SIDE_LABEL[e.side]}</span>${e.upcoming?'<span class="upcoming">Upcoming</span>':""}${e.sfFlag?`<span class="sfpill">${PHONE} Short-form moment</span>`:""}</div>
        <h3>${e.title}</h3><p>${e.what}</p>
        ${e.sf?`<div class="sf">${PHONE}<p><b>Short-form angle.</b> ${e.sf}</p></div>`:""}
      </article></div>`;
    row++;
  });
  tl.innerHTML = html;
}
let currentFilter = "all";
function applyFilter(){
  const items = $$("#tl .item"); let shown = 0;
  items.forEach(it => { const ok = currentFilter==="all" || it.dataset.side===currentFilter; it.hidden = !ok; if(ok) shown++; });
  const lensOn = $("#lens").getAttribute("aria-checked")==="true";
  const sfShown = items.filter(it => !it.hidden && it.dataset.sf==="1").length;
  $("#count").textContent = lensOn ? `Showing ${shown} of ${items.length} moments · ${sfShown} highlighted as short-form moments` : `Showing ${shown} of ${items.length} moments`;
}
function renderDayChart(){
  const svg = $("#daychart"); if(!svg) return;
  const days=17, W=900, H=300, L=56, R=16, T=54, B=46, plotW=W-L-R, plotH=H-T-B, colW=plotW/days, barW=colW*0.62, max=2;
  const data = {0:[["drake",2]],11:[["kendrick",1]],14:[["kendrick",1],["drake",1]],15:[["kendrick",2]],16:[["drake",1],["platform",1]]};
  const y = v => T + plotH - (v/max)*plotH;
  let s = "";
  [0,1,2].forEach(v => { s += `<line x1="${L}" x2="${W-R}" y1="${y(v)}" y2="${y(v)}" stroke="var(--line)"/><text x="${L-10}" y="${y(v)+5}" text-anchor="end" font-size="14">${v}</text>`; });
  s += `<text x="20" y="${T+plotH/2}" font-size="12" transform="rotate(-90 20 ${T+plotH/2})" text-anchor="middle">Releases per day</text>`;
  for(const [d,stack] of Object.entries(data)){ let base=0; const x=L+d*colW+(colW-barW)/2; stack.forEach(([w,n])=>{ s+=`<rect x="${x}" y="${y(base+n)}" width="${barW}" height="${y(base)-y(base+n)-2}" rx="3" fill="${SIDECOL[w]}"/>`; base+=n; }); }
  const labels = {0:"Apr 19",4:"Apr 23",8:"Apr 27",11:"Apr 30",14:"May 3",16:"May 5"};
  for(const [d,t] of Object.entries(labels)) s += `<text x="${L+d*colW+colW/2}" y="${H-B+24}" text-anchor="middle" font-size="13">${t}</text>`;
  const bx1=L+colW+4, bx2=L+11*colW-4;
  s += `<path d="M${bx1} ${T-14} V${T-8} H${bx2} V${T-14}" fill="none" stroke="var(--muted)" stroke-width="1.5"/><text x="${(bx1+bx2)/2}" y="${T-22}" text-anchor="middle" font-size="14" style="fill:var(--ink)">10 days with no new diss tracks</text>`;
  const cx1=L+14*colW+2, cx2=L+17*colW-2;
  s += `<path d="M${cx1} ${T-14} V${T-8} H${cx2} V${T-14}" fill="none" stroke="var(--ink)" stroke-width="1.5"/><text x="${cx2}" y="${T-22}" text-anchor="end" font-size="14" font-weight="700" style="fill:var(--ink)">5 songs in 3 days</text>`;
  svg.insertAdjacentHTML("beforeend", s);
}
function renderParticipability(){
  const el = $("#prows"); if(!el) return;
  el.innerHTML = PSONGS.map(([name,side,sc]) => {
    const tot = sc.reduce((a,b)=>a+b,0);
    return `<div class="prow" role="img" aria-label="${name}: ${tot} out of 20 (hook ${sc[0]}, beat ${sc[1]}, quotable ${sc[2]}, no-context ${sc[3]})">
      <div class="name"><i style="background:${SIDECOL[side]}"></i>${name}</div>
      <div class="pbar">${sc.map((v,i)=>`<span class="s${i+1}" style="width:${v/20*100}%"></span>`).join("")}</div>
      <div class="tot">${tot}/20</div></div>`;
  }).join("");
}
let loopIdx = 0;
function renderLoop(){
  const svg = $("#loopsvg"); if(!svg) return;
  const cx=260, cy=235, R=140, nodeR=34; let s = `<circle class="ring" cx="${cx}" cy="${cy}" r="${R}"/>`;
  LOOP.forEach((n,i) => { const a=(-90+(i+0.5)*60)*Math.PI/180; s += `<path class="arrow" d="M-6 -6 L6 0 L-6 6 Z" transform="translate(${cx+R*Math.cos(a)} ${cy+R*Math.sin(a)}) rotate(${(i+0.5)*60})"/>`; });
  LOOP.forEach((n,i) => {
    const a=(-90+i*60)*Math.PI/180, x=cx+R*Math.cos(a), y=cy+R*Math.sin(a);
    s += `<g class="node" data-i="${i}" tabindex="0" role="button" aria-label="Step ${i+1}: ${n.t}" aria-pressed="false"><circle cx="${x}" cy="${y}" r="${nodeR}"/><text class="num" x="${x}" y="${y+8}">${i+1}</text></g>`;
    const anchor = Math.abs(Math.cos(a))<0.2 ? "middle" : (Math.cos(a)>0 ? "start":"end");
    const lx = anchor==="middle" ? x : (anchor==="start" ? x+nodeR+10 : x-nodeR-10);
    const ly = anchor==="middle" ? (Math.sin(a)<0 ? y-nodeR-26 : y+nodeR+20) : y-3;
    s += `<text class="lbl" x="${lx}" y="${ly}" text-anchor="${anchor}">${n.short[0]}<tspan x="${lx}" dy="15">${n.short[1]}</tspan></text>`;
  });
  s += `<text class="center" x="${cx}" y="${cy-4}">each lap:</text><text class="center" x="${cx}" y="${cy+14}">hours, not weeks</text>`;
  svg.innerHTML = s;
  $$(".node", svg).forEach(g => {
    g.addEventListener("click", () => setLoop(+g.dataset.i));
    g.addEventListener("keydown", ev => { if(ev.key==="Enter"||ev.key===" "){ ev.preventDefault(); setLoop(+g.dataset.i);} });
  });
  setLoop(0);
}
function setLoop(i){
  loopIdx = (i+LOOP.length)%LOOP.length;
  $$("#loopsvg .node").forEach(g => { const on=+g.dataset.i===loopIdx; g.classList.toggle("on",on); g.setAttribute("aria-pressed",on); });
  const n = LOOP[loopIdx], p = $("#looppanel");
  p.innerHTML = `<span class="k">Step ${loopIdx+1} of ${LOOP.length}</span><h3>${n.t}</h3><p>${n.ex}</p>`;
  fillCites(p);
}

/* =================== SONGS VIEW =================== */
const songById = Object.fromEntries(SONGS.map(s=>[s.id,s]));
const bsById = Object.fromEntries(BACKSTORY.map(b=>[b.id,b]));
let currentSong = "notlikeus";

function renderDrop(){
  const box = $("#drop"); if(!box) return;
  // songs spaced in release order; the gap between releases is printed on the axis
  const W = box.clientWidth || 1000, pad = 24, n = SONGS.length, step = (W - 2*pad)/n;
  const xOf = i => pad + (i + 0.5)*step;
  let html = `<div class="axis"></div><span class="side d">Drake</span><span class="side k">Kendrick</span>`;
  SONGS.forEach((s,i) => {
    html += `<button class="songchip" data-song="${s.id}" data-x="${xOf(i)}" data-side="${s.artist}" style="--c:${SIDECOL[s.artist]}" aria-pressed="false">${s.title}<small>${s.prologue?"Prologue · ":""}${s.date.replace(" · "," / ")}</small></button>`;
    if(i < n-1 && DROP_GAPS[i]) html += `<span class="gap" style="left:${xOf(i)+step/2}px">${DROP_GAPS[i]}</span>`;
  });
  box.innerHTML = html;
  // lane layout (two passes: measure, then place)
  const lanes = {drake:[], kendrick:[]};
  $$(".songchip", box).sort((a,b)=>a.dataset.x-b.dataset.x).forEach(ch => {
    const side = ch.dataset.side, x = +ch.dataset.x, w = ch.offsetWidth;
    let lane = lanes[side].findIndex(r => x - w/2 > r + 8);
    if(lane === -1){ lane = lanes[side].length; lanes[side].push(-1e9); }
    lanes[side][lane] = x + w/2;
    const h = ch.offsetHeight, gap = 10;
    const top = side==="drake" ? 150 - 22 - (lane+1)*(h+gap) + gap : 150 + 26 + lane*(h+gap);
    ch.style.left = (x - w/2) + "px"; ch.style.top = top + "px";
    const stem = document.createElement("span"); stem.className = "stem";
    stem.style.cssText = `left:${x-1}px;background:${SIDECOL[side]};` + (side==="drake" ? `top:${top+h}px;height:${150-(top+h)}px` : `top:152px;height:${top-152}px`);
    box.appendChild(stem);
  });
  $$(".songchip", box).forEach(ch => {
    ch.setAttribute("aria-pressed", ch.dataset.song===currentSong);
    ch.addEventListener("click", () => { selectSong(ch.dataset.song); history.replaceState(null,"","#song-"+ch.dataset.song); });
  });
}
let dropTimer;
window.addEventListener("resize", () => { clearTimeout(dropTimer); dropTimer = setTimeout(renderDrop, 150); });
function chipList(ids, label){
  if(!ids.length) return "";
  return `<div class="linkchips"><span>${label}</span>${ids.map(id=>`<button data-go="${id}" style="--c:${SIDECOL[songById[id].artist]}">${songById[id].title}</button>`).join("")}</div>`;
}
/* [[bs:id|words]] → backstory, [[song:id|words]] → another song,
   [[lg:id|words]] → legal timeline, [[ev:id|words]] → story timeline */
function linkify(t){
  return t.replace(/\[\[(bs|song|lg|ev):([a-z0-9-]+)\|(.+?)\]\]/g, (m,k,id,w) => {
    if(k==="bs") return `<a class="xl xl-bs" href="#bs-${id}" data-bs="${id}" title="Backstory: ${esc(plain(bsById[id].title))}">${w}</a>`;
    if(k==="song") return `<a class="xl xl-song" href="#song-${id}" data-go="${id}" title="Song: ${esc(plain(songById[id].title))}">${w}</a>`;
    if(k==="lg") return `<a class="xl xl-lg" href="#${id}" title="Legal timeline">${w}</a>`;
    return `<a class="xl xl-ev" href="#ev-${id}" title="Story timeline">${w}</a>`;
  });
}
const inlineBs = t => [...t.matchAll(/\[\[bs:([a-z0-9-]+)\|/g)].map(m=>m[1]);
const mmss = t => Math.floor(t/60)+":"+String(t%60).padStart(2,"0");
function songPlayer(s){
  if(s.noplay) return `<div class="noplay"><b>No player for this song.</b> ${s.noplay}</div>`;
  if(!s.play) return "";
  const r = REFS[s.play.ref];
  return `<div class="songplay" id="play-${s.id}" data-loc="Songs · ${esc(plain(s.title))} · player">
    <div class="spframe"><button class="vthumb" data-play="${s.play.yt}" aria-label="Play ${esc(plain(s.title))}">
      <img src="https://i.ytimg.com/vi/${s.play.yt}/hqdefault.jpg" alt="" loading="lazy" onerror="this.remove()">
      <span class="play"><span><svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M5 3 L15 9 L5 15 Z"/></svg></span></span></button></div>
    <p class="spcap">Official upload: <a href="${r.url}" target="_blank" rel="noopener">${r.t}</a> · ${esc(r.a)} (<a class="cite" data-k="${s.play.ref}"></a>)</p>
  </div>`;
}
/* Official cover art, shown through Spotify's own player rather than copied onto the site */
function songCover(s){
  if(s.nocover) return `<div class="songcover none"><p class="eyebrow">Cover art</p><p>${s.nocover}</p></div>`;
  if(!s.cover) return "";
  return `<figure class="songcover" id="cover-${s.id}" data-loc="Songs · ${esc(plain(s.title))} · cover art">
    <iframe src="https://open.spotify.com/embed/track/${s.cover.sp}?utm_source=generator" title="${esc(plain(s.title))}: cover art and preview on Spotify" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
    <figcaption><span class="eyebrow">Cover art</span> ${s.cover.note} <span class="covsrc">Shown through Spotify’s official player ${c(s.cover.ref)}.</span></figcaption>
  </figure>`;
}
/* One outside breakdown video per song, from the commentator's own channel */
function songBreakdown(s){
  const b = s.breakdown; if(!b) return "";
  const r = REFS[b.ref];
  const who = r.a.replace(/\.$/,"").replace(/^Markman, R$/,"Rob Markman");
  const url = r.url + (b.start ? `&t=${b.start}s` : "");
  return `<section class="songbd" id="bd-${s.id}" data-loc="Songs · ${esc(plain(s.title))} · breakdown video">
    <p class="eyebrow">Breakdown video</p>
    <p class="bdlead">${b.lead || "Want someone to walk you through every reference? This video goes line by line."}</p>
    <div class="spframe bdframe"><button class="vthumb" data-bd="${b.yt}" data-start="${b.start||0}" aria-label="Play breakdown video: ${esc(plain(r.t))}">
      <img src="https://i.ytimg.com/vi/${b.yt}/hqdefault.jpg" alt="" loading="lazy" onerror="this.remove()">
      <span class="play"><span><svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M5 3 L15 9 L5 15 Z"/></svg></span></span></button></div>
    <p class="spcap"><a href="${url}" target="_blank" rel="noopener">${r.t}</a> · ${esc(who)} (<a class="cite" data-k="${b.ref}"></a>). ${b.note}</p>
    <p class="bdnote">This is a commentator’s reading of the song, not an official explanation. The site’s own claims are cited to the sources in the References.</p>
  </section>`;
}
function playBreakdown(btn){
  const box = btn.closest(".bdframe"); if(!box) return;
  const st = +btn.dataset.start;
  box.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${btn.dataset.bd}?autoplay=1&rel=0${st?`&start=${st}`:""}" title="Breakdown video" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
}
function playSong(yt, start){
  const box = $(".songplay .spframe", $("#songpanel")); if(!box) return;
  box.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${yt}?autoplay=1&rel=0${start?`&start=${start}`:""}" title="Song player" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>`;
}
function selectSong(id){
  if(!songById[id]) id = "notlikeus";
  currentSong = id;
  const s = songById[id];
  $$(".songchip").forEach(ch => ch.setAttribute("aria-pressed", ch.dataset.song===id));
  const genius = "https://genius.com/search?q=" + encodeURIComponent(s.title + " " + (s.artist==="drake"?"Drake":"Kendrick Lamar"));
  const panel = $("#songpanel");
  panel.id = "songpanel"; panel.style.setProperty("--c", SIDECOL[s.artist]);
  panel.setAttribute("data-loc", `Songs · ${plain(s.title)}`);
  panel.innerHTML = `<div id="song-${s.id}" data-loc="Songs · ${esc(plain(s.title))}">
    <div class="by">${s.by}</div>
    <h2>${s.title}</h2>
    <div class="songmeta"><span><b>Released:</b> ${s.date}</span><span><b>First home:</b> ${s.home}</span></div>
    ${songCover(s)}
    ${songPlayer(s)}
    <div class="btnrow"><a class="btn" href="${s.genius?REFS[s.genius].url:genius}" target="_blank" rel="noopener">Read the lyrics on Genius ↗</a>${s.genius?`<span class="gcite">(<a class="cite" data-k="${s.genius}"></a>)</span>`:""}${s.breakdown?`<a class="btn" href="#bd-${s.id}" data-bdjump>Watch a breakdown video ↓</a>`:""}</div>
    ${chipList(s.answers,"Answers:")}${chipList(s.answeredBy,"Answered by:")}
    <p class="xlegend">Underlined phrases jump to what they refer to: <span class="xl xl-bs">backstory</span> <span class="xl xl-song">another song</span> <span class="xl xl-lg">legal timeline</span> <span class="xl xl-ev">story timeline</span></p>
    <ol class="parts">${s.parts.map((p,i)=>{ const back=[...new Set([...p.back,...inlineBs(p.text)])]; return `<li id="song-${s.id}-${i+1}">
      <span class="plabel">${String(i+1).padStart(2,"0")} · ${p.label}</span>${p.t!=null&&s.play?` <button class="tsbtn" data-t="${p.t}" aria-label="Play from ${mmss(p.t)}">▶ ${mmss(p.t)}</button>`:""}
      <p>${linkify(p.text)}</p>
      ${back.length?`<div class="backchips"><span>Points back to:</span>${back.map(b=>`<button data-bs="${b}">${bsById[b].date} · ${plain(bsById[b].title)}</button>`).join("")}</div>`:""}
    </li>`; }).join("")}</ol>
    ${songBreakdown(s)}</div>`;
  fillCites(panel);
  $$("[data-play]", panel).forEach(b => b.addEventListener("click", () => playSong(b.dataset.play, 0)));
  $$("[data-bd]", panel).forEach(b => b.addEventListener("click", () => playBreakdown(b)));
  $$("[data-bdjump]", panel).forEach(a => a.addEventListener("click", e => { e.preventDefault(); const t = $("#bd-"+s.id); history.replaceState(null,"","#bd-"+s.id); t.scrollIntoView({behavior:reduced?"auto":"smooth",block:"start"}); t.classList.remove("flash"); void t.offsetWidth; t.classList.add("flash"); }));
  $$(".tsbtn", panel).forEach(b => b.addEventListener("click", () => { playSong(s.play.yt, +b.dataset.t); $(".songplay",panel).scrollIntoView({behavior:reduced?"auto":"smooth",block:"nearest"}); }));
  $$("[data-go]", panel).forEach(b => b.addEventListener("click", e => { e.preventDefault(); selectSong(b.dataset.go); history.replaceState(null,"","#song-"+b.dataset.go); $("#songgrid").scrollIntoView({behavior:reduced?"auto":"smooth",block:"start"}); }));
  $$("[data-bs]", panel).forEach(b => b.addEventListener("click", e => { e.preventDefault(); focusBackstory(b.dataset.bs); }));
  // highlight backstory
  const hits = new Set(s.parts.flatMap(p=>[...p.back,...inlineBs(p.text)]));
  $$("#bslist li").forEach(li => { const on = hits.has(li.dataset.id); li.classList.toggle("hit",on); li.classList.toggle("dim",!on); });
  $$("#bsaxis .dot").forEach(d => d.classList.toggle("hit", hits.has(d.dataset.id)));
  const box = $("#backstory"), first = $("#bslist li.hit");
  if(first && box && getComputedStyle(box).position==="sticky") box.scrollTo({top: Math.max(0, first.offsetTop - 140)});
  $("#bshint").textContent = hits.size ? `“${plain(s.title)}” points back to ${hits.size} earlier moment${hits.size>1?"s":""}, highlighted below.` : `This song mostly responds to the songs just before it. Use the “Answers” links above.`;
}
function focusBackstory(id){
  const li = $("#bs-"+id); if(!li) return;
  const box = $("#backstory");
  if(getComputedStyle(box).position==="sticky"){ box.scrollTo({top: li.offsetTop - 120, behavior: reduced?"auto":"smooth"}); }
  else li.scrollIntoView({behavior:reduced?"auto":"smooth",block:"center"});
  li.classList.remove("flash"); void li.offsetWidth; li.classList.add("flash");
}
function renderBackstory(){
  const list = $("#bslist"); if(!list) return;
  const usedBy = {};
  SONGS.forEach(s => s.parts.forEach(p => p.back.forEach(b => { (usedBy[b]=usedBy[b]||new Set()).add(s.id); })));
  list.innerHTML = BACKSTORY.map(b => `<li id="bs-${b.id}" data-id="${b.id}" data-loc="Songs · Backstory · ${esc(plain(b.title))}">
    <span class="bd">${b.date}</span><h4>${b.title}</h4><p>${b.text}</p>
    ${usedBy[b.id]?`<div class="usedby">Referenced in: ${[...usedBy[b.id]].map(id=>songById[id].title).join(", ")}</div>`:""}</li>`).join("");
  // mini axis 2011–2024
  const ax = $("#bsaxis"); const y0 = Date.UTC(2011,0,1), y1 = Date.UTC(2024,11,31);
  const pct = d => ((Date.parse(d+"T00:00:00Z")-y0)/(y1-y0)*100).toFixed(2);
  let h = `<div class="line"></div>`;
  [2011,2014,2017,2020,2024].forEach(y => h += `<span class="yr" style="left:${pct(y+"-07-01")}%">${y}</span>`);
  BACKSTORY.forEach(b => h += `<button class="dot" data-id="${b.id}" style="left:${pct(b.d)}%" title="${esc(b.date+" · "+plain(b.title))}" aria-label="${esc(b.date+": "+plain(b.title))}"></button>`);
  ax.innerHTML = h;
  $$(".dot", ax).forEach(d => d.addEventListener("click", () => focusBackstory(d.dataset.id)));
  fillCites(list);
}

/* =================== LEGAL VIEW =================== */
const LANES = [["real","Real world","var(--kendrick)"],["court","Courts","var(--court)"],["industry","Industry, AI & politics","var(--accent)"]];
function renderLegal(){
  const svg = $("#lanesvg"); if(!svg) return;
  const W=1000, H=270, L=160, R=20, t0=Date.UTC(2024,2,1), t1=Date.UTC(2027,0,1);
  const x = d => L + (Date.parse(d+"T00:00:00Z")-t0)/(t1-t0)*(W-L-R);
  const laneY = {real:90, court:150, industry:210};
  let s = "";
  // music battle zone
  s += `<rect x="${x("2024-03-22")}" y="30" width="${x("2024-05-05")-x("2024-03-22")}" height="${H-60}" fill="var(--kendrick)" opacity=".08"/>`;
  s += `<text x="${x("2024-03-22")+4}" y="44" font-size="12" style="fill:var(--ink)" font-weight="700">Music battle</text>`;
  // years
  ["2024","2025","2026"].forEach(yr => { const xx = x(yr+"-01-01"); if(xx>=L){ s += `<line x1="${xx}" x2="${xx}" y1="30" y2="${H-30}" stroke="var(--line)"/>`; } s += `<text x="${Math.max(xx,L)+4}" y="${H-12}" font-size="13">${yr}</text>`; });
  s += `<line x1="${x("2026-11-22")}" x2="${x("2026-11-22")}" y1="30" y2="${H-30}" stroke="var(--ink)" stroke-dasharray="3 3"/><text x="${x("2026-11-22")-4}" y="${H-12}" font-size="12" text-anchor="end" style="fill:var(--ink)">today</text>`;
  LANES.forEach(([k,label,col]) => {
    s += `<line x1="${L}" x2="${W-R}" y1="${laneY[k]}" y2="${laneY[k]}" stroke="var(--line)" stroke-width="2"/>`;
    s += `<text x="${L-12}" y="${laneY[k]+5}" text-anchor="end" font-size="14" font-weight="700" style="fill:${col}">${label}</text>`;
  });
  // exit marker
  const ex = x("2024-04-24");
  s += `<line x1="${ex}" x2="${ex}" y1="56" y2="${H-30}" stroke="var(--ink)" stroke-width="2"/><text x="${ex+6}" y="64" font-size="12" font-weight="700" style="fill:var(--ink)">Exit point: Apr 24, 2024</text>`;
  LEGAL.forEach((e,i) => {
    const col = LANES.find(l=>l[0]===e.lane)[2];
    s += `<g class="ldot" tabindex="0" role="button" data-target="${e.id}" aria-label="${i+1}. ${esc(e.date)}: ${esc(plain(e.title))}"><title>${i+1}. ${esc(e.date)}: ${esc(plain(e.title))}</title>
      <circle cx="${x(e.d)}" cy="${laneY[e.lane]}" r="${e.upcoming?9:8}" fill="${e.upcoming?"var(--card)":col}" stroke="${col}" stroke-width="2"/></g>`;
  });
  svg.innerHTML = s;
  $$(".ldot", svg).forEach(g => {
    const go = () => { const el=$("#"+g.dataset.target); el.scrollIntoView({behavior:reduced?"auto":"smooth",block:"center"}); el.classList.remove("flash"); void el.offsetWidth; el.classList.add("flash"); };
    g.addEventListener("click", go); g.addEventListener("keydown", ev => { if(ev.key==="Enter"||ev.key===" "){ev.preventDefault();go();} });
  });
  // cards grouped by year
  let html = "", lastY = "";
  LEGAL.forEach((e,i) => {
    const yr = e.d.slice(0,4);
    if(yr!==lastY){ html += `<div class="yearhead">${yr}</div>`; lastY = yr; }
    const lane = LANES.find(l=>l[0]===e.lane);
    html += `<article class="lcard lane-${e.lane}" id="${e.id}" data-loc="Legal · ${esc(plain(e.title))} (${esc(e.date)})">
      <div class="num">${i+1}</div>
      <div><div class="meta"><time class="mono">${e.date}</time><span class="badge" style="--c:${lane[2]}">${lane[1]}</span>${e.exit?`<span class="exitpill">${e.exit}</span>`:""}${e.upcoming?'<span class="upcoming">Upcoming</span>':""}</div>
      <h3>${e.title}</h3><p>${e.text}</p></div></article>`;
  });
  $("#lcards").innerHTML = html;
}

/* =================== CREATORS VIEW =================== */
function videoCard(v){
  const r = v.ref ? REFS[v.ref] : null;
  const title = r ? r.t : (v.title||"");
  const who = r ? r.a.replace(/\.$/,"") : (v.by||"");
  const when = r ? (r.md ? r.md.replace(/^, /,"")+" "+r.y : r.y) : (v.date||"");
  if(v.platform==="soundcloud"){
    return `<div class="vcard sc"><iframe src="https://w.soundcloud.com/player/?url=${encodeURIComponent("https://api.soundcloud.com/tracks/"+v.id)}&visual=true&show_artwork=true" title="${esc(plain(title))}" loading="lazy" allow="autoplay; encrypted-media"></iframe>
      <div class="vbody"><span class="vtype">${v.type}</span><h3>${title}</h3><span class="who">${esc(who)} · ${esc(when)}</span><p class="why">${v.why}</p>
      <div class="links"><a href="${r.url}" target="_blank" rel="noopener">Open on SoundCloud ↗</a> <span>(<a class="cite" data-k="${v.ref}"></a>)</span></div></div></div>`;
  }
  if(v.platform==="tiktok"){
    return `<div class="vcard tt"><iframe src="https://www.tiktok.com/embed/v2/${esc(v.id)}" title="${esc(plain(title))}" loading="lazy" allow="encrypted-media; fullscreen" allowfullscreen></iframe>
      <div class="vbody"><span class="vtype">${v.type||"TikTok"}</span><h3>${title}</h3><span class="who">${esc(who)} · ${esc(when)}</span>${v.why?`<p class="why">${v.why}</p>`:""}
      <div class="links"><a href="${esc(v.url)}" target="_blank" rel="noopener">Open on TikTok ↗</a>${v.ref?` <span>(<a class="cite" data-k="${v.ref}"></a>)</span>`:""}</div></div></div>`;
  }
  const url = r ? r.url : v.url;
  return `<div class="vcard"><button class="vthumb" data-yt="${esc(v.id)}" aria-label="Play: ${esc(plain(title))}">
      <img src="https://i.ytimg.com/vi/${esc(v.id)}/hqdefault.jpg" alt="" loading="lazy" onerror="this.remove()">
      <span class="play"><span><svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true"><path d="M5 3 L15 9 L5 15 Z"/></svg></span></span></button>
    <div class="vbody"><span class="vtype">${v.type}</span><h3>${title}</h3><span class="who">${esc(who)} · ${esc(when)}</span><p class="why">${v.why}</p>
    <div class="links"><a href="${url}" target="_blank" rel="noopener">Watch on YouTube ↗</a> <span>(<a class="cite" data-k="${v.ref}"></a>)</span></div></div></div>`;
}
function renderCreators(){
  const box = $("#cwphases"); if(!box) return;
  const nav = $("#cwnav");
  if(nav) nav.insertAdjacentHTML("beforeend", CREATOR_PHASES.map(p => `<a href="#${p.id}">${esc(p.nav||plain(p.title))}</a>`).join(""));
  box.innerHTML = CREATOR_PHASES.map((p,i) => {
    const n = p.videos.length;
    const slides = p.videos.map((v,j) => {
      const r = REFS[v.ref], t = r ? plain(r.t) : (v.title||"");
      const who = r ? plain(r.a).replace(/\.$/,"") : (v.by||"");
      const kind = v.platform || "youtube";
      const thumb = kind==="youtube" ? `https://i.ytimg.com/vi/${v.id}/mqdefault.jpg` : "";
      // SoundCloud's oEmbed service allows other sites to ask for a track's artwork; TikTok's does not,
      // so TikTok previews show the platform's own embed, shrunk to fit the card and not clickable.
      const oembed = kind==="soundcloud" && r ? `https://soundcloud.com/oembed?format=json&url=${encodeURIComponent(r.url)}` : "";
      const mini = kind==="tiktok" ? `<iframe class="vprev-frame" src="https://www.tiktok.com/embed/v2/${esc(v.id)}" loading="lazy" tabindex="-1" aria-hidden="true" title=""></iframe>` : "";
      return {id:`v-${v.ref||p.id+"-"+(j+1)}`, t, who, kind, thumb, oembed, mini, type:plain(v.type || (kind==="tiktok"?"TikTok":"")), html:videoCard(v)};
    });
    return `<section class="cwphase" id="${p.id}" data-loc="Creators · ${esc(p.title)}">
      <p class="eyebrow">${String(i+1).padStart(2,"0")} · ${p.when}</p>
      <h2>${p.title}</h2>
      <div class="vcar" data-i="0">
        <div class="vcar-strip" role="tablist" aria-label="Clips in “${esc(plain(p.title))}”">${slides.map((s,j) =>
          `<button type="button" role="tab" class="vprev" id="${s.id}-tab" aria-controls="${s.id}" aria-selected="${j===0}" tabindex="${j===0?0:-1}">
            <span class="vprev-img ${s.kind}"${s.oembed?` data-oembed="${esc(s.oembed)}"`:""}>${s.thumb?`<img src="${s.thumb}" alt="" loading="lazy" onerror="this.remove()">`:""}${s.mini}
              <span class="vprev-ph" aria-hidden="true">${s.kind==="tiktok"?PHONE:s.kind==="soundcloud"?WAVE:""}<b>${s.kind==="tiktok"?"TikTok":s.kind==="soundcloud"?"SoundCloud":"YouTube"}</b><small>${esc(s.who)}</small></span>
              <span class="vprev-n">${j+1}</span></span>
            <span class="vprev-type">${esc(s.type)}</span>
            <span class="vprev-t">${esc(s.t)}</span>
          </button>`).join("")}</div>
        <div class="vcar-stage">${slides.map((s,j) =>
          `<div class="vslide" id="${s.id}" role="tabpanel" aria-labelledby="${s.id}-tab" data-loc="Creators · ${esc(p.title)} · clip ${j+1} of ${n}"${j?" hidden":""}>${s.html}</div>`).join("")}</div>
        <div class="vcar-bar">
          <button type="button" class="vcar-prev" aria-label="Previous clip" disabled>‹ Prev</button>
          <span class="vcar-count" aria-live="polite">Clip 1 of ${n}</span>
          <button type="button" class="vcar-next" aria-label="Next clip"${n<2?" disabled":""}>Next ›</button>
        </div>
      </div>
      <div class="summary"><p class="eyebrow">My summary</p><p>${p.summary}</p></div>
    </section>`;
  }).join("");
  $$(".vthumb", box).forEach(b => b.addEventListener("click", () => {
    const f = document.createElement("iframe");
    f.src = `https://www.youtube-nocookie.com/embed/${b.dataset.yt}?autoplay=1&rel=0`;
    f.title = b.getAttribute("aria-label").replace(/^Play: /,"");
    f.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    f.allowFullscreen = true; f.referrerPolicy = "strict-origin-when-cross-origin";
    f._thumb = b;
    b.replaceWith(f);
  }));
  $$(".vcar", box).forEach(car => {
    $(".vcar-prev", car).addEventListener("click", () => showSlide(car, +car.dataset.i - 1, true));
    $(".vcar-next", car).addEventListener("click", () => showSlide(car, +car.dataset.i + 1, true));
    $$(".vcar-strip [role=tab]", car).forEach((t,j) => t.addEventListener("click", () => showSlide(car, j, true)));
    $(".vcar-strip", car).addEventListener("keydown", e => {
      const i = +car.dataset.i, last = $$(".vslide", car).length - 1;
      const to = {ArrowLeft:i-1, ArrowRight:i+1, Home:0, End:last}[e.key];
      if(to===undefined) return;
      e.preventDefault(); showSlide(car, Math.max(0, Math.min(last, to)), true, true);
    });
  });
}
/* SoundCloud previews: ask SoundCloud's public oEmbed service for the track artwork the
   first time Creator watch opens. If that fails, the labelled placeholder tile stays. */
let previewsLoaded = false;
function loadPreviews(){
  if(previewsLoaded) return; previewsLoaded = true;
  $$(".vprev-img[data-oembed]").forEach(el => {
    fetch(el.dataset.oembed).then(r => r.ok ? r.json() : null).then(j => {
      if(!j || !/^https:\/\//.test(j.thumbnail_url||"")) return;
      const img = new Image(); img.alt = ""; img.referrerPolicy = "no-referrer";
      img.onload = () => el.classList.add("has-img"); img.onerror = () => img.remove();
      img.src = j.thumbnail_url; el.prepend(img);
    }).catch(() => {});
  });
}
/* Stop whatever is playing in a clip that is being hidden: YouTube goes back to its
   thumbnail, TikTok and SoundCloud frames are swapped for fresh (unloaded) copies. */
function resetSlide(s){
  $$("iframe", s).forEach(f => f._thumb ? f.replaceWith(f._thumb) : f.replaceWith(f.cloneNode(true)));
}
function showSlide(car, j, user, focusTab){
  const slides = $$(".vslide", car), tabs = $$(".vcar-strip [role=tab]", car);
  if(j < 0 || j >= slides.length) return;
  const cur = +car.dataset.i;
  if(cur !== j){ resetSlide(slides[cur]); slides[cur].hidden = true; }
  slides[j].hidden = false; car.dataset.i = j;
  tabs.forEach((t,k) => { t.setAttribute("aria-selected", k===j); t.tabIndex = k===j ? 0 : -1; });
  if(focusTab) tabs[j].focus();
  $(".vcar-prev", car).disabled = j === 0;
  $(".vcar-next", car).disabled = j === slides.length - 1;
  $(".vcar-count", car).textContent = `Clip ${j+1} of ${slides.length}`;
  const strip = $(".vcar-strip", car);
  strip.scrollTo({left:Math.max(0, tabs[j].offsetLeft - (strip.clientWidth - tabs[j].offsetWidth)/2), behavior: reduced ? "auto" : "smooth"});
  if(user){ const top = car.getBoundingClientRect().top;
    if(top < stackH || top > innerHeight * .6) car.scrollIntoView({block:"start"}); }
}

/* =================== ROUTER =================== */
const VIEWS = ["story","songs","legal","creators"];
/* ---------- sticky section menus (.subnav) ----------
   The site header and the open view's section menu both stick to the top, so anchor
   jumps are padded by their combined height, and the menu link for the section on
   screen is highlighted and kept scrolled into view inside the menu. */
let stackH = 100;
function layoutVars(){
  const head = $(".sitehead"), hh = head ? head.offsetHeight : 0;
  const sub = $$(".subnav").find(n => n.offsetParent !== null), sh = sub ? sub.offsetHeight : 0;
  document.documentElement.style.setProperty("--headh", hh + "px");
  stackH = hh + sh;
  document.documentElement.style.scrollPaddingTop = (stackH + 10) + "px";
}
function fadeEdges(w){
  const max = w.scrollWidth - w.clientWidth;
  w.classList.toggle("fade-l", max > 2 && w.scrollLeft > 2);
  w.classList.toggle("fade-r", max > 2 && w.scrollLeft < max - 2);
}
$$(".subnav .wrap").forEach(w => w.addEventListener("scroll", () => fadeEdges(w), {passive:true}));
let spyTick = 0;
function spy(){
  spyTick = 0;
  $$(".subnav").forEach(nav => {
    if(nav.offsetParent === null) return;
    fadeEdges($(".wrap", nav));
    const links = $$("a[href^='#']", nav);
    let cur = links[0];
    links.forEach(a => { const t = document.getElementById(a.getAttribute("href").slice(1));
      if(t && t.offsetParent !== null && t.getBoundingClientRect().top <= stackH + 40) cur = a; });
    if(innerHeight + scrollY >= document.documentElement.scrollHeight - 4) cur = links[links.length-1];
    links.forEach(a => a === cur ? a.setAttribute("aria-current","location") : a.removeAttribute("aria-current"));
    if(cur && cur !== nav._cur){
      nav._cur = cur;
      const w = $(".wrap", nav), left = cur.offsetLeft - (w.clientWidth - cur.offsetWidth)/2;
      w.scrollTo({left:Math.max(0,left), behavior: reduced ? "auto" : "smooth"});
    }
  });
}
addEventListener("scroll", () => { if(!spyTick) spyTick = requestAnimationFrame(spy); }, {passive:true});
addEventListener("resize", () => { layoutVars(); spy(); });

function showView(v){
  $$("[data-view]").forEach(s => s.hidden = s.dataset.view !== v);
  layoutVars(); requestAnimationFrame(spy);
  if(v==="creators") loadPreviews();
  $$(".tabs a[data-tab]").forEach(a => a.setAttribute("aria-current", a.dataset.tab===v ? "page" : "false"));
  if(v==="songs") renderDrop();   // chips need a visible box to measure
  document.title = {story:"Kendrick vs. Drake, Clipped",songs:"Song timeline · Clipped",legal:"Legal timeline · Clipped",creators:"Creator watch · Clipped"}[v];
}
function route(){
  const h = decodeURIComponent(location.hash.slice(1));
  if(!h || h==="story"){ showView("story"); if(!h) return; window.scrollTo(0,0); return; }
  if(VIEWS.includes(h)){ showView(h); window.scrollTo(0,0); return; }
  const sm = h.match(/^(song|play|cover|bd)-([a-z0-9]+)/);
  if(sm){
    const id = sm[2];
    showView("songs"); selectSong(id);
    const el = $("#"+CSS.escape(h)) || $("#songgrid");
    requestAnimationFrame(()=>{ el.scrollIntoView({block:"start"}); el.classList.add("flash"); });
    return;
  }
  const el = document.getElementById(h);
  if(el){
    const v = el.closest("[data-view]");
    if(v) showView(v.dataset.view);
    const slide = el.closest(".vslide");
    if(slide){ const car = slide.closest(".vcar");
      showSlide(car, $$(".vslide", car).indexOf(slide));
      requestAnimationFrame(()=>{ car.scrollIntoView({block:"start"}); slide.classList.remove("flash"); void slide.offsetWidth; slide.classList.add("flash"); });
      return; }
    if(h.startsWith("bs-")) requestAnimationFrame(()=>focusBackstory(h.slice(3)));
    else requestAnimationFrame(()=>{ el.scrollIntoView({block:"start"}); if(el.classList.contains("item")||el.classList.contains("lcard")||el.classList.contains("cwphase")){ el.classList.remove("flash"); void el.offsetWidth; el.classList.add("flash"); } });
  }
}

/* =================== INIT =================== */
renderTimeline(); renderDayChart(); renderParticipability(); renderLoop();
renderBackstory(); renderDrop(); selectSong(currentSong);
renderLegal(); renderCreators();
fillCites(); applyFilter();

$$(".chip").forEach(b => b.addEventListener("click", () => {
  currentFilter = b.dataset.f; $$(".chip").forEach(x => x.setAttribute("aria-pressed", x===b)); applyFilter();
}));
$("#lens").addEventListener("click", e => {
  const btn = e.currentTarget, on = btn.getAttribute("aria-checked")!=="true";
  btn.setAttribute("aria-checked", on); $("#tl").classList.toggle("lens-on", on); applyFilter();
});
$$(".phasejump button").forEach(b => b.addEventListener("click", () => {
  if(currentFilter!=="all") $("#f-all").click();
  const el = $("#phase-"+b.dataset.p); if(el) el.scrollIntoView({behavior:reduced?"auto":"smooth",block:"start"});
}));
$("#loopPrev").addEventListener("click", () => setLoop(loopIdx-1));
$("#loopNext").addEventListener("click", () => setLoop(loopIdx+1));
window.addEventListener("hashchange", route);
addEventListener("load", () => { layoutVars(); spy(); });
// re-layout song chips once fonts load (widths change)
if(document.fonts && document.fonts.ready) document.fonts.ready.then(()=>{ renderDrop(); selectSong(currentSong); });
route();

/* sanity: every reference is cited somewhere on this page */
(function(){
  const used = new Set($$("a.cite").map(a=>a.dataset.k));
  const all = JSON.stringify([EVENTS,SONGS,BACKSTORY,LEGAL,CREATOR_PHASES,LOOP]);
  (all.match(/data-k=\\?"([^"\\]+)\\?"/g)||[]).forEach(m=>used.add(m.replace(/.*data-k=\\?"/,"").replace(/\\?"$/,"")));
  CREATOR_PHASES.forEach(p=>p.videos.forEach(v=>v.ref&&used.add(v.ref)));
  SONGS.forEach(s=>{ if(s.play) used.add(s.play.ref); if(s.genius) used.add(s.genius); if(s.cover) used.add(s.cover.ref); if(s.breakdown) used.add(s.breakdown.ref); });
  const unused = Object.keys(REFS).filter(k=>!used.has(k));
  if(unused.length) console.warn("Uncited references:", unused.join(", "));
})();
})();
