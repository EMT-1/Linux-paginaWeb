/* Pantalla "ABC of bleeding control" · tokens, neumorfismo suave y Material Icons */
:root{
  --primary:#f06543;
  --paper:#e8e9eb;
  --stone:#e0dfd5;
  --ink:#313638;
  --accent:#f09d51;

  --blue:#e95418;
  --blue-100:#e8edff;
  --blue-200:#d8e2ff;
  --blue-300:#f5ae7f;

  --bg:linear-gradient(135deg, var(--stone) 0%, var(--paper) 100%);
  --radius:22px;
  --radius-sm:16px;
  --elev:0 18px 40px rgba(10,10,10,.14);
  --elev-soft:10px 10px 30px #c9c7c0, -10px -10px 30px #ffffff;
  --inset: inset 4px 4px 8px #c9cdd2, inset -4px -4px 8px #ffffff;
  --focus:0 0 0 3px color-mix(in srgb, var(--blue) 35%, transparent);
  --font: "Segoe UI", system-ui, -apple-system, Roboto, Inter, sans-serif;
}

*{box-sizing:border-box}
html,body{height:100%}
body{margin:0; background:#efefef; font-family:var(--font); color:var(--ink)}

.ms,.material-symbols-outlined{
  font-family:'Material Symbols Outlined';
  font-weight:400; font-style:normal; font-size:24px; line-height:1;
  display:inline-block; vertical-align:middle;
  font-variation-settings:'FILL' 0,'wght' 500,'GRAD' 0,'opsz' 24;
}

.stage{
  min-height:100%; display:grid; place-items:center; padding:24px;
  background:radial-gradient(1200px 600px at 10% 10%, #fff, #f3f3f5);
}

.phone{
  width:390px; aspect-ratio:9/19.5; background:var(--bg);
  border-radius:40px; box-shadow:var(--elev); position:relative; overflow:hidden;
  border:1px solid rgba(0,0,0,.06);
}

.notch{
  position:absolute; top:8px; left:50%; transform:translateX(-50%);
  width:110px; height:28px; background:#0a0a0a; border-radius:16px;
  box-shadow:0 2px 6px rgba(0,0,0,.3); z-index:2;
}

.status{
  display:flex; justify-content:space-between; align-items:center;
  padding:16px 18px 10px; font-size:.9rem; color:rgba(0,0,0,.65);
}
.status__icons{display:flex; gap:10px}
.time{letter-spacing:.5px}

.app{
  padding:12px 18px 0; height:calc(100% - 150px); overflow:auto; scrollbar-width:none;
}
.app::-webkit-scrollbar{display:none}

.hero{
  background:#fff; border-radius:28px; padding:18px 18px 16px;
  box-shadow:var(--elev-soft);
  display:flex; align-items:flex-start; justify-content:space-between; gap:12px;
}
.hero__title{
  margin:0; font-size:clamp(1.4rem, 3.8vw, 1.8rem); line-height:1.1; color:#111;
}
.progress{
  margin-top:2px; padding:6px 10px; border-radius:999px;
  background:var(--paper); color:#111; font-weight:700;
  box-shadow:var(--inset);
}

.cards{display:grid; gap:12px; margin:14px 0 0}

.card{
  position:relative; display:flex; gap:12px; align-items:flex-start;
  background:var(--blue-300); color:#0e1b3a;
  padding:16px; border-radius:24px;
  box-shadow:var(--elev-soft); border:1px solid rgba(0,0,0,.04);
}
.card--primary{background:var(--blue); color:#fff}
.card__icon{
  width:40px; height:40px; border-radius:12px; display:grid; place-items:center;
  background:rgba(255,255,255,.18); color:#fff;
}
.card:not(.card--primary) .card__icon{
  background:rgba(255,255,255,.55); color:#0e1b3a;
}
.card__title{margin:0; font-size:1.05rem}
.card__desc{margin:.25rem 0 0; font-size:.92rem; opacity:.85}

.card::after{
  content:attr(data-letter);
  position:absolute; right:14px; top:50%; transform:translateY(-50%);
  font-size:4rem; font-weight:800; letter-spacing:.05em;
  color:rgba(246, 143, 69,.35); pointer-events:none; user-select:none;
}
.card:not(.card--primary)::after{color:rgba(246, 143, 69,.50)}

.toolbar{
  position:absolute; left:0; right:0; bottom:10px;
  display:flex; align-items:center; justify-content:space-between;
  padding:0 16px;
}
.btn{
  min-width:108px; height:44px; padding:0 14px; border:0; border-radius:22px;
  display:inline-grid; grid-auto-flow:column; gap:8px; place-content:center; place-items:center;
  font-weight:800; cursor:pointer; transition:transform .06s ease, filter .25s ease;
  box-shadow:0 10px 22px rgba(0,0,0,.12);
}
.btn--ghost{
  background:#fff; color:#0e1b3a; border:1px solid rgba(0,0,0,.06);
}
.btn--cta{
  background:#b53514; color:#fff;
}
.btn:hover{filter:brightness(1.04)}
.btn:active{transform:translateY(1px)}

.fab{
  width:44px; height:44px; border-radius:50%; border:0; cursor:pointer;
  background:#fff; color:#0e1b3a; display:grid; place-items:center;
  box-shadow:0 10px 22px rgba(0,0,0,.12); border:1px solid rgba(0,0,0,.06);
}

@media (max-width:440px){
  .phone{width:92vw}
}

.spline-box{
  width: min(1000px,100%);
  margin: 3rem auto;
  aspect-ratio: 16/9;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 40x rgba(0,0,0, 0.35);
  background:#0b1220;
}

spline-viewer{
  display: block;
  width: 100%;
  height: 100%;
  position: fixed;
  inset: 0;
  outline: none;
  pointer-events: none;
}