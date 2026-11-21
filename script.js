// ====== GANTI BAGIAN INI ======
var NAMA = "Nama Pacarmu";   // muncul di judul dan surat
var DARI = "Namamu";         // tanda tangan di akhir surat
// ==============================
 
document.getElementById("name").textContent = NAMA;
document.getElementById("name2").textContent = NAMA;
document.getElementById("from").textContent = DARI;
 
// Confetti
var cv = document.getElementById("c"), ctx = cv.getContext("2d"), parts = [], running = false;
function size(){ cv.width = innerWidth; cv.height = innerHeight; }
size(); addEventListener("resize", size);
 
var colors = ["#ff7a9c", "#ffd27a", "#8fd3ff", "#b9f0b0", "#fff6f0"];
 
function burst(){
  for (var i = 0; i < 140; i++) {
    parts.push({
      x: innerWidth / 2, y: innerHeight * 0.4,
      vx: (Math.random() - .5) * 12, vy: -Math.random() * 12 - 3,
      s: Math.random() * 7 + 4, r: Math.random() * 6,
      c: colors[i % colors.length], life: 160
    });
  }
  if (!running) { running = true; tick(); }
}
 
function tick(){
  ctx.clearRect(0, 0, cv.width, cv.height);
  parts = parts.filter(function(p){ return p.life > 0; });
  parts.forEach(function(p){
    p.x += p.vx; p.y += p.vy; p.vy += .25; p.r += .15; p.life--;
    ctx.save();
    ctx.translate(p.x, p.y); ctx.rotate(p.r);
    ctx.fillStyle = p.c; ctx.globalAlpha = Math.min(1, p.life / 40);
    ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
    ctx.restore();
  });
  if (parts.length) requestAnimationFrame(tick); else running = false;
}
 
// Balon
var balloonColors = ["#ff7a9c", "#ffd27a", "#8fd3ff", "#b9f0b0", "#c9a7ff", "#ff9f6b"];
function balloons(){
  for (var i = 0; i < 16; i++) {
    var b = document.createElement("div");
    b.className = "balloon";
    b.style.left = (3 + Math.random() * 90) + "%";
    b.style.setProperty("--c", balloonColors[i % balloonColors.length]);
    b.style.setProperty("--d", (7 + Math.random() * 5) + "s");
    b.style.setProperty("--delay", (Math.random() * 2) + "s");
    b.addEventListener("animationend", function(){ this.remove(); });
    document.body.appendChild(b);
  }
}
 
// Foto muncul satu per satu
function showPhotos(reduced){
  var photos = document.querySelectorAll(".photo");
  photos.forEach(function(p, i){
    setTimeout(function(){ p.classList.add("show"); }, reduced ? 0 : 600 + i * 450);
  });
  // Foto 7 (hati spesial) muncul paling akhir, setelah foto 1-6
  var love = document.querySelector(".love");
  setTimeout(function(){ love.classList.add("show"); }, reduced ? 0 : 600 + photos.length * 450 + 300);
}
 
// Tiup lilin
var done = false;
function blow(){
  if (done) return;
  done = true;
  var reduced = matchMedia("(prefers-reduced-motion:reduce)").matches;
  document.getElementById("cake").classList.add("out");
  document.getElementById("blow").hidden = true;
  document.getElementById("hint").textContent = "Permohonanmu sudah terkirim.";
  if (!reduced) { burst(); balloons(); }
  showPhotos(reduced);
  var letter = document.getElementById("letter");
  letter.hidden = false;
  // beri waktu menikmati balon dan foto sebelum turun ke surat
  setTimeout(function(){ letter.scrollIntoView({ behavior: "smooth", block: "start" }); }, 3500);
}
 
document.getElementById("blow").addEventListener("click", blow);
var cake = document.getElementById("cake");
cake.addEventListener("click", blow);
cake.addEventListener("keydown", function(e){
  if (e.key === "Enter" || e.key === " ") blow();
});
 
// ====== Hiasan latar: bintang dan hati melayang ======
(function(){
  var sky = document.getElementById("sky");
  var r = Math.random;
  var small = matchMedia("(max-width:899px)").matches;
 
  var starColors = ["#ffffff", "#ffffff", "#ffe9b0", "#ffc2d4"];
  for (var i = 0; i < (small ? 35 : 70); i++) {
    var st = document.createElement("span");
    st.className = "star";
    st.style.left = (r() * 100) + "%";
    st.style.top = (r() * 100) + "%";
    st.style.setProperty("--s", (1.5 + r() * 3) + "px");
    st.style.setProperty("--c", starColors[Math.floor(r() * starColors.length)]);
    st.style.setProperty("--t", (2.5 + r() * 4) + "s");
    st.style.setProperty("--dl", (r() * 5) + "s");
    sky.appendChild(st);
  }
 
  var heartColors = ["rgba(255,122,156,.55)", "rgba(255,170,195,.5)", "rgba(255,210,122,.45)", "rgba(200,170,255,.5)"];
  for (var k = 0; k < (small ? 8 : 14); k++) {
    var h = document.createElement("span");
    h.className = "bgheart";
    h.textContent = "\u2665";
    h.style.setProperty("--l", (r() * 96) + "%");
    h.style.setProperty("--s", (12 + r() * 20) + "px");
    h.style.setProperty("--c", heartColors[k % heartColors.length]);
    h.style.setProperty("--d", (14 + r() * 12) + "s");
    h.style.setProperty("--dl", (-r() * 20) + "s");
    sky.appendChild(h);
  }
})();
 