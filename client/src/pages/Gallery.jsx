

// import { useState } from "react"
// import Footer from "../components/Footer"

// /* ─── Data ─────────────────────────────────────────────── */
// const IMAGES = [
//   { src:"https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900&q=70",  caption:"Annual Convocation 2024",    category:"Events",   year:"2024" },
//   { src:"https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=70",  caption:"Science Exhibition",         category:"Academic", year:"2024" },
//   { src:"https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=70",  caption:"Library Reading Hall",       category:"Campus",   year:"2024" },
//   { src:"https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=900&q=70",  caption:"Sports Day 2024",            category:"Sports",   year:"2024" },
//   { src:"https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&q=70",     caption:"Computer Lab Session",       category:"Academic", year:"2024" },
//   { src:"https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=70",     caption:"Modern Classrooms",          category:"Campus",   year:"2023" },
//   { src:"https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=70",  caption:"Chemistry Lab Experiments",  category:"Academic", year:"2023" },
//   { src:"https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=70",  caption:"Teacher of the Year Award",  category:"Events",   year:"2023" },
//   { src:"https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&q=70",  caption:"Central Library",            category:"Campus",   year:"2023" },
//   { src:"https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&q=70",  caption:"Cultural Fest 2023",         category:"Events",   year:"2023" },
//   { src:"https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&q=70",     caption:"Cricket Tournament Finals",  category:"Sports",   year:"2023" },
//   { src:"https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=70",  caption:"Art & Craft Exhibition",     category:"Events",   year:"2022" },
//   { src:"https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=70",  caption:"Parent-Teacher Meet",        category:"Events",   year:"2022" },
//   { src:"https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=70",  caption:"Biology Lab Practicals",     category:"Academic", year:"2022" },
//   { src:"https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&q=70",  caption:"Basketball Championship",    category:"Sports",   year:"2022" },
// ]

// const CATEGORIES = ["All", "Academic", "Events", "Sports", "Campus"]
// const YEARS      = ["All Years", "2024", "2023", "2022"]

// export default function Gallery() {
//   const [category,   setCategory]   = useState("All")
//   const [year,       setYear]       = useState("All Years")
//   const [lightbox,   setLightbox]   = useState(null)  // index of open image
//   const [layout,     setLayout]     = useState("masonry") // masonry | grid

//   const filtered = IMAGES.filter(img =>
//     (category === "All" || img.category === category) &&
//     (year === "All Years" || img.year === year)
//   )

//   const openLightbox  = (i) => setLightbox(i)
//   const closeLightbox = ()  => setLightbox(null)
//   const prevImg = () => setLightbox(i => (i - 1 + filtered.length) % filtered.length)
//   const nextImg = () => setLightbox(i => (i + 1) % filtered.length)

//   const catColors = { Academic:"#60a5fa", Events:"var(--gold)", Sports:"#4ade80", Campus:"#a78bfa" }

//   return (
//     <div>
//       <style>{`
//         .gallery-masonry {
//           columns: 4; column-gap: 12px;
//         }
//         .gallery-masonry-item {
//           break-inside: avoid; margin-bottom: 12px;
//           border-radius: 12px; overflow: hidden;
//           cursor: pointer; position: relative;
//         }
//         .gallery-uniform-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
//           gap: 12px;
//         }
//         .gallery-uniform-item {
//           aspect-ratio: 4/3; border-radius: 12px;
//           overflow: hidden; cursor: pointer; position: relative;
//         }
//         .gallery-img-inner {
//           width: 100%; height: 100%;
//           object-fit: cover;
//           transition: transform 0.5s ease;
//           display: block;
//         }
//         .gallery-hover-overlay {
//           position: absolute; inset: 0;
//           background: linear-gradient(to top, rgba(13,13,13,0.88), transparent 55%);
//           opacity: 0; transition: opacity 0.3s;
//           display: flex; align-items: flex-end; padding: 14px;
//           flex-direction: column; justify-content: flex-end; gap: 4px;
//         }
//         .gallery-masonry-item:hover .gallery-hover-overlay,
//         .gallery-uniform-item:hover .gallery-hover-overlay { opacity: 1; }
//         .gallery-masonry-item:hover .gallery-img-inner,
//         .gallery-uniform-item:hover .gallery-img-inner { transform: scale(1.06); }

//         @media (max-width: 1024px) { .gallery-masonry { columns: 3 !important; } }
//         @media (max-width: 768px)  { .gallery-masonry { columns: 2 !important; } }
//         @media (max-width: 480px)  {
//           .gallery-masonry { columns: 1 !important; }
//           .gallery-uniform-grid { grid-template-columns: repeat(2, 1fr) !important; }
//         }
//       `}</style>

//       {/* ══ HERO ══ */}
//       <div style={{ padding:"160px 5% 60px", background:"linear-gradient(to bottom,rgba(201,168,76,0.05),transparent)" }}>
//         <div style={{ maxWidth:1200, margin:"0 auto" }}>
//           <span className="section-label fade-up">Campus Life</span>
//           <h1 className="section-title fade-up delay-1">A Glimpse of <span className="gold-text">EduSphere</span></h1>
//           <div className="divider" />
//           <p className="section-desc fade-up delay-2">Moments that define us — from classrooms to championships, every memory matters.</p>

//           {/* Stats Row */}
//           <div style={{ display:"flex", gap:32, marginTop:28, flexWrap:"wrap" }}>
//             {[["📸","200+","Photos"],["🎥","50+","Videos"],["🏆","25+","Events"],["📅","2000–2024","Since"]].map(([icon,v,l],i) => (
//               <div key={i} style={{ display:"flex", alignItems:"center", gap:10 }}>
//                 <span style={{ fontSize:20 }}>{icon}</span>
//                 <div>
//                   <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, color:"var(--gold)" }}>{v}</div>
//                   <div style={{ fontSize:11, color:"var(--text-muted)" }}>{l}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* ══ FILTERS + LAYOUT TOGGLE ══ */}
//       <div style={{ background:"var(--dark2)", borderTop:"1px solid rgba(255,255,255,0.05)", borderBottom:"1px solid rgba(255,255,255,0.05)", padding:"16px 5%", position:"sticky", top:"var(--nav-h)", zIndex:100 }}>
//         <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", gap:12, alignItems:"center", flexWrap:"wrap" }}>
//           {/* Category filters */}
//           <div style={{ display:"flex", gap:6, flexWrap:"wrap", flex:1 }}>
//             {CATEGORIES.map(c => (
//               <button key={c} onClick={()=>setCategory(c)} style={{ padding:"7px 16px", borderRadius:100, fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", border:`1px solid ${category===c?"var(--gold)":"rgba(255,255,255,0.08)"}`, background:category===c?"linear-gradient(135deg,var(--gold),var(--gold-light))":"rgba(255,255,255,0.04)", color:category===c?"var(--dark)":"var(--text-muted)", transition:"all 0.2s" }}>{c}</button>
//             ))}
//           </div>

//           {/* Year filter */}
//           <select value={year} onChange={e=>setYear(e.target.value)} style={{ padding:"7px 14px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"var(--text-muted)", fontSize:12, fontFamily:"'DM Sans',sans-serif", outline:"none" }}>
//             {YEARS.map(y => <option key={y} value={y} style={{ background:"#181818" }}>{y}</option>)}
//           </select>

//           {/* Layout toggle */}
//           <div style={{ display:"flex", gap:4 }}>
//             {[["masonry","⊟"],["grid","⊞"]].map(([v,icon]) => (
//               <button key={v} onClick={()=>setLayout(v)} style={{ width:34, height:34, borderRadius:6, border:`1px solid ${layout===v?"var(--gold)":"rgba(255,255,255,0.1)"}`, background:layout===v?"rgba(201,168,76,0.12)":"rgba(255,255,255,0.04)", color:layout===v?"var(--gold)":"var(--text-muted)", cursor:"pointer", fontSize:16 }}>{icon}</button>
//             ))}
//           </div>

//           <span style={{ fontSize:12, color:"var(--text-muted)", flexShrink:0 }}>{filtered.length} photos</span>
//         </div>
//       </div>

//       {/* ══ GALLERY ══ */}
//       <div style={{ padding:"40px 5% 80px" }}>
//         <div style={{ maxWidth:1200, margin:"0 auto" }}>
//           {filtered.length === 0 ? (
//             <div style={{ textAlign:"center", padding:"80px 0" }}>
//               <div style={{ fontSize:48, marginBottom:16 }}>📷</div>
//               <div style={{ fontSize:18, color:"var(--cream)", marginBottom:8 }}>No photos found</div>
//               <button className="btn-outline" style={{ fontSize:13 }} onClick={()=>{setCategory("All");setYear("All Years")}}>Clear Filters</button>
//             </div>
//           ) : layout === "masonry" ? (
//             <div className="gallery-masonry">
//               {filtered.map((img,i) => (
//                 <div key={i} className="gallery-masonry-item" onClick={()=>openLightbox(i)}>
//                   <img src={img.src} alt={img.caption} className="gallery-img-inner" style={{ height:"auto" }} />
//                   <div className="gallery-hover-overlay">
//                     <span style={{ fontSize:10, fontWeight:700, letterSpacing:1, textTransform:"uppercase", color:catColors[img.category]||"var(--gold)", background:`${catColors[img.category]||"rgba(201,168,76"}18`, padding:"2px 8px", borderRadius:100 }}>{img.category}</span>
//                     <span style={{ fontSize:13, fontWeight:600, color:"var(--cream)" }}>{img.caption}</span>
//                     <span style={{ fontSize:11, color:"rgba(255,255,255,0.5)" }}>{img.year}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="gallery-uniform-grid">
//               {filtered.map((img,i) => (
//                 <div key={i} className="gallery-uniform-item" onClick={()=>openLightbox(i)}>
//                   <img src={img.src} alt={img.caption} className="gallery-img-inner" />
//                   <div className="gallery-hover-overlay">
//                     <span style={{ fontSize:10, fontWeight:700, letterSpacing:1, textTransform:"uppercase", color:catColors[img.category]||"var(--gold)", background:`${catColors[img.category]||"rgba(201,168,76"}18`, padding:"2px 8px", borderRadius:100 }}>{img.category}</span>
//                     <span style={{ fontSize:13, fontWeight:600, color:"var(--cream)" }}>{img.caption}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* ══ LIGHTBOX ══ */}
//       {lightbox !== null && (
//         <div style={{ position:"fixed", inset:0, zIndex:9999, background:"rgba(0,0,0,0.95)", display:"flex", alignItems:"center", justifyContent:"center" }}
//           onClick={closeLightbox}>
//           {/* Close */}
//           <button onClick={closeLightbox} style={{ position:"absolute", top:20, right:20, width:44, height:44, borderRadius:"50%", background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)", color:"white", fontSize:20, cursor:"pointer" }}>✕</button>

//           {/* Prev */}
//           <button onClick={e=>{e.stopPropagation();prevImg()}} style={{ position:"absolute", left:16, width:48, height:48, borderRadius:"50%", background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)", color:"white", fontSize:22, cursor:"pointer" }}>‹</button>

//           {/* Image */}
//           <div onClick={e=>e.stopPropagation()} style={{ maxWidth:"90vw", maxHeight:"85vh", display:"flex", flexDirection:"column", alignItems:"center", gap:16 }}>
//             <img src={filtered[lightbox]?.src} alt={filtered[lightbox]?.caption} style={{ maxWidth:"100%", maxHeight:"75vh", objectFit:"contain", borderRadius:12, boxShadow:"0 24px 64px rgba(0,0,0,0.8)" }} />
//             <div style={{ textAlign:"center" }}>
//               <div style={{ fontSize:16, fontWeight:600, color:"var(--cream)", marginBottom:4 }}>{filtered[lightbox]?.caption}</div>
//               <div style={{ display:"flex", gap:10, justifyContent:"center", alignItems:"center" }}>
//                 <span style={{ fontSize:12, color:catColors[filtered[lightbox]?.category]||"var(--gold)" }}>{filtered[lightbox]?.category}</span>
//                 <span style={{ color:"rgba(255,255,255,0.3)" }}>·</span>
//                 <span style={{ fontSize:12, color:"var(--text-muted)" }}>{filtered[lightbox]?.year}</span>
//                 <span style={{ color:"rgba(255,255,255,0.3)" }}>·</span>
//                 <span style={{ fontSize:12, color:"var(--text-muted)" }}>{lightbox+1} / {filtered.length}</span>
//               </div>
//             </div>
//           </div>

//           {/* Next */}
//           <button onClick={e=>{e.stopPropagation();nextImg()}} style={{ position:"absolute", right:16, width:48, height:48, borderRadius:"50%", background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)", color:"white", fontSize:22, cursor:"pointer" }}>›</button>
//         </div>
//       )}

//       {/* ══ VIDEO REEL CTA ══ */}
//       <div style={{ padding:"0 5% 80px" }}>
//         <div style={{ maxWidth:1200, margin:"0 auto", borderRadius:20, overflow:"hidden", position:"relative" }}>
//           <div style={{ backgroundImage:"url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=70')", backgroundSize:"cover", backgroundPosition:"center", padding:"80px 5%", position:"relative" }}>
//             <div style={{ position:"absolute", inset:0, background:"rgba(13,13,13,0.82)" }} />
//             <div style={{ position:"relative", zIndex:1, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:24 }}>
//               <div>
//                 <span className="section-label">Video Gallery</span>
//                 <h2 className="section-title" style={{ fontSize:"clamp(24px,4vw,40px)", marginBottom:8 }}>Watch Our <span className="gold-text">Story Unfold</span></h2>
//                 <p style={{ fontSize:15, color:"var(--text-muted)", maxWidth:420 }}>From annual events to classroom moments — watch the EduSphere experience come alive.</p>
//               </div>
//               <a href="https://youtube.com" target="_blank" rel="noreferrer" className="btn-primary" style={{ fontSize:14, gap:10 }}>
//                 <span style={{ fontSize:18 }}>▶</span> Watch on YouTube
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   )
// }







import { useState, useEffect, useRef } from "react"
import Footer from "../components/Footer"

const DEFAULT_IMAGES = [
  { id:1,  url:"https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900&q=70", caption:"Annual Convocation 2024",   category:"Events",   year:"2024", album:"Convocation 2024" },
  { id:2,  url:"https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=70", caption:"Science Exhibition",         category:"Academic", year:"2024", album:"" },
  { id:3,  url:"https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=70", caption:"Library Reading Hall",       category:"Campus",   year:"2024", album:"" },
  { id:4,  url:"https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=900&q=70", caption:"Sports Day 2024",            category:"Sports",   year:"2024", album:"Sports 2024" },
  { id:5,  url:"https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&q=70",    caption:"Computer Lab Session",       category:"Academic", year:"2024", album:"" },
  { id:6,  url:"https://images.unsplash.com/photo-1562774053-701939374585?w=600&q=70",    caption:"Modern Classrooms",          category:"Campus",   year:"2023", album:"" },
  { id:7,  url:"https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=70", caption:"Chemistry Lab Experiments",  category:"Academic", year:"2023", album:"" },
  { id:8,  url:"https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=70", caption:"Teacher of the Year Award",  category:"Events",   year:"2023", album:"Awards 2023" },
  { id:9,  url:"https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=600&q=70", caption:"Central Library",            category:"Campus",   year:"2023", album:"" },
  { id:10, url:"https://images.unsplash.com/photo-1577896851231-70ef18881754?w=600&q=70", caption:"Cultural Fest 2023",         category:"Events",   year:"2023", album:"Cultural 2023" },
  { id:11, url:"https://images.unsplash.com/photo-1544717305-2782549b5136?w=600&q=70",    caption:"Cricket Tournament Finals",  category:"Sports",   year:"2023", album:"Sports 2023" },
  { id:12, url:"https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=70", caption:"Art & Craft Exhibition",     category:"Events",   year:"2022", album:"" },
  { id:13, url:"https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=70", caption:"Parent-Teacher Meet",        category:"Events",   year:"2022", album:"" },
  { id:14, url:"https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=70", caption:"Biology Lab Practicals",     category:"Academic", year:"2022", album:"" },
  { id:15, url:"https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=600&q=70", caption:"Basketball Championship",    category:"Sports",   year:"2022", album:"Sports 2022" },
]

/* localStorage se load karo — agar kuch saved hai toh woh, warna DEFAULT */
function loadFromStorage() {
  try {
    const raw = localStorage.getItem("gallery")
    if (!raw) return DEFAULT_IMAGES
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_IMAGES
  } catch {
    return DEFAULT_IMAGES
  }
}

const CATEGORIES_STATIC = ["All", "Academic", "Events", "Sports", "Campus"]

export default function Gallery() {
  const [images,   setImages]   = useState(loadFromStorage)
  const [category, setCategory] = useState("All")
  const [year,     setYear]     = useState("All Years")
  const [lightbox, setLightbox] = useState(null)
  const [layout,   setLayout]   = useState("masonry")
  const pollRef = useRef(null)

  useEffect(() => {
    /* polling — har 1 second mein localStorage check karo */
    pollRef.current = setInterval(() => {
      const fresh = loadFromStorage()
      setImages(prev => {
        /* sirf update karo agar data badla ho */
        if (JSON.stringify(prev) !== JSON.stringify(fresh)) return fresh
        return prev
      })
    }, 1000)

    /* storage event — alag tab se change aaye toh */
    const onStorage = e => {
      if (e.key === "gallery") setImages(loadFromStorage())
    }
    window.addEventListener("storage", onStorage)

    return () => {
      clearInterval(pollRef.current)
      window.removeEventListener("storage", onStorage)
    }
  }, [])

  /* Dynamic values from live data */
  const allYears   = ["All Years", ...Array.from(new Set(images.map(i => i.year).filter(Boolean))).sort((a,b)=>b-a)]
  const allCats    = ["All", ...Array.from(new Set([...CATEGORIES_STATIC.slice(1), ...images.map(i=>i.category).filter(Boolean)]))]

  const filtered = images.filter(img =>
    (category === "All" || img.category === category) &&
    (year === "All Years" || img.year === year)
  )

  const closeLightbox = () => setLightbox(null)
  const prevImg = () => setLightbox(i => (i - 1 + filtered.length) % filtered.length)
  const nextImg = () => setLightbox(i => (i + 1) % filtered.length)

  const catColors = { Academic:"#60a5fa", Events:"var(--gold)", Sports:"#4ade80", Campus:"#a78bfa", Cultural:"#f87171", Other:"#94a3b8" }

  return (
    <div>
      <style>{`
        .gallery-masonry { columns: 4; column-gap: 12px; }
        .gallery-masonry-item { break-inside: avoid; margin-bottom: 12px; border-radius: 12px; overflow: hidden; cursor: pointer; position: relative; }
        .gallery-uniform-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 12px; }
        .gallery-uniform-item { aspect-ratio: 4/3; border-radius: 12px; overflow: hidden; cursor: pointer; position: relative; }
        .gallery-img-inner { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; display: block; }
        .gallery-hover-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(13,13,13,0.88), transparent 55%); opacity: 0; transition: opacity 0.3s; display: flex; align-items: flex-end; padding: 14px; flex-direction: column; justify-content: flex-end; gap: 4px; }
        .gallery-masonry-item:hover .gallery-hover-overlay,
        .gallery-uniform-item:hover .gallery-hover-overlay { opacity: 1; }
        .gallery-masonry-item:hover .gallery-img-inner,
        .gallery-uniform-item:hover .gallery-img-inner { transform: scale(1.06); }
        @media (max-width:1024px) { .gallery-masonry { columns: 3 !important; } }
        @media (max-width:768px)  { .gallery-masonry { columns: 2 !important; } }
        @media (max-width:480px)  { .gallery-masonry { columns: 1 !important; } .gallery-uniform-grid { grid-template-columns: repeat(2,1fr) !important; } }
      `}</style>

      {/* ══ HERO ══ */}
      <div style={{ padding:"160px 5% 60px", background:"linear-gradient(to bottom,rgba(201,168,76,0.05),transparent)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <span className="section-label fade-up">Campus Life</span>
          <h1 className="section-title fade-up delay-1">A Glimpse of <span className="gold-text">EduSphere</span></h1>
          <div className="divider" />
          <p className="section-desc fade-up delay-2">Moments that define us — from classrooms to championships, every memory matters.</p>
          <div style={{ display:"flex", gap:32, marginTop:28, flexWrap:"wrap" }}>
            {[["📸", images.length, "Photos"], ["🏆","25+","Events"], ["📅","2000–2025","Since"]].map(([icon,v,l],i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ fontSize:20 }}>{icon}</span>
                <div>
                  <div style={{ fontFamily:"'Playfair Display',serif", fontSize:20, fontWeight:700, color:"var(--gold)" }}>{v}</div>
                  <div style={{ fontSize:11, color:"var(--text-muted)" }}>{l}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ FILTERS ══ */}
      <div style={{ background:"var(--dark2)", borderTop:"1px solid rgba(255,255,255,0.05)", borderBottom:"1px solid rgba(255,255,255,0.05)", padding:"16px 5%", position:"sticky", top:"var(--nav-h)", zIndex:100 }}>
        <div style={{ maxWidth:1200, margin:"0 auto", display:"flex", gap:12, alignItems:"center", flexWrap:"wrap" }}>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap", flex:1 }}>
            {allCats.map(c => (
              <button key={c} onClick={()=>setCategory(c)} style={{ padding:"7px 16px", borderRadius:100, fontSize:12, fontWeight:600, cursor:"pointer", fontFamily:"'DM Sans',sans-serif", border:`1px solid ${category===c?"var(--gold)":"rgba(255,255,255,0.08)"}`, background:category===c?"linear-gradient(135deg,var(--gold),var(--gold-light))":"rgba(255,255,255,0.04)", color:category===c?"var(--dark)":"var(--text-muted)", transition:"all 0.2s" }}>{c}</button>
            ))}
          </div>
          <select value={year} onChange={e=>setYear(e.target.value)} style={{ padding:"7px 14px", background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:8, color:"var(--text-muted)", fontSize:12, fontFamily:"'DM Sans',sans-serif", outline:"none" }}>
            {allYears.map(y => <option key={y} value={y} style={{ background:"#181818" }}>{y}</option>)}
          </select>
          <div style={{ display:"flex", gap:4 }}>
            {[["masonry","⊟"],["grid","⊞"]].map(([v,icon]) => (
              <button key={v} onClick={()=>setLayout(v)} style={{ width:34, height:34, borderRadius:6, border:`1px solid ${layout===v?"var(--gold)":"rgba(255,255,255,0.1)"}`, background:layout===v?"rgba(201,168,76,0.12)":"rgba(255,255,255,0.04)", color:layout===v?"var(--gold)":"var(--text-muted)", cursor:"pointer", fontSize:16 }}>{icon}</button>
            ))}
          </div>
          <span style={{ fontSize:12, color:"var(--text-muted)", flexShrink:0 }}>{filtered.length} photos</span>
        </div>
      </div>

      {/* ══ GALLERY ══ */}
      <div style={{ padding:"40px 5% 80px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign:"center", padding:"80px 0" }}>
              <div style={{ fontSize:48, marginBottom:16 }}>📷</div>
              <div style={{ fontSize:18, color:"var(--cream)", marginBottom:8 }}>No photos found</div>
              <button className="btn-outline" style={{ fontSize:13 }} onClick={()=>{setCategory("All");setYear("All Years")}}>Clear Filters</button>
            </div>
          ) : layout === "masonry" ? (
            <div className="gallery-masonry">
              {filtered.map((img,i) => (
                <div key={img.id||i} className="gallery-masonry-item" onClick={()=>setLightbox(i)}>
                  <img src={img.url} alt={img.caption} className="gallery-img-inner" style={{ height:"auto" }} />
                  <div className="gallery-hover-overlay">
                    <span style={{ fontSize:10, fontWeight:700, letterSpacing:1, textTransform:"uppercase", color:catColors[img.category]||"var(--gold)", background:"rgba(0,0,0,0.4)", padding:"2px 8px", borderRadius:100 }}>{img.category}</span>
                    <span style={{ fontSize:13, fontWeight:600, color:"var(--cream)" }}>{img.caption}</span>
                    <span style={{ fontSize:11, color:"rgba(255,255,255,0.5)" }}>{img.year}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="gallery-uniform-grid">
              {filtered.map((img,i) => (
                <div key={img.id||i} className="gallery-uniform-item" onClick={()=>setLightbox(i)}>
                  <img src={img.url} alt={img.caption} className="gallery-img-inner" />
                  <div className="gallery-hover-overlay">
                    <span style={{ fontSize:10, fontWeight:700, letterSpacing:1, textTransform:"uppercase", color:catColors[img.category]||"var(--gold)", background:"rgba(0,0,0,0.4)", padding:"2px 8px", borderRadius:100 }}>{img.category}</span>
                    <span style={{ fontSize:13, fontWeight:600, color:"var(--cream)" }}>{img.caption}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ══ LIGHTBOX ══ */}
      {lightbox !== null && (
        <div style={{ position:"fixed", inset:0, zIndex:9999, background:"rgba(0,0,0,0.95)", display:"flex", alignItems:"center", justifyContent:"center" }} onClick={closeLightbox}>
          <button onClick={closeLightbox} style={{ position:"absolute", top:20, right:20, width:44, height:44, borderRadius:"50%", background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)", color:"white", fontSize:20, cursor:"pointer" }}>✕</button>
          <button onClick={e=>{e.stopPropagation();prevImg()}} style={{ position:"absolute", left:16, width:48, height:48, borderRadius:"50%", background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)", color:"white", fontSize:22, cursor:"pointer" }}>‹</button>
          <div onClick={e=>e.stopPropagation()} style={{ maxWidth:"90vw", maxHeight:"85vh", display:"flex", flexDirection:"column", alignItems:"center", gap:16 }}>
            <img src={filtered[lightbox]?.url} alt={filtered[lightbox]?.caption} style={{ maxWidth:"100%", maxHeight:"75vh", objectFit:"contain", borderRadius:12, boxShadow:"0 24px 64px rgba(0,0,0,0.8)" }} />
            <div style={{ textAlign:"center" }}>
              <div style={{ fontSize:16, fontWeight:600, color:"var(--cream)", marginBottom:4 }}>{filtered[lightbox]?.caption}</div>
              <div style={{ display:"flex", gap:10, justifyContent:"center", alignItems:"center" }}>
                <span style={{ fontSize:12, color:catColors[filtered[lightbox]?.category]||"var(--gold)" }}>{filtered[lightbox]?.category}</span>
                <span style={{ color:"rgba(255,255,255,0.3)" }}>·</span>
                <span style={{ fontSize:12, color:"var(--text-muted)" }}>{filtered[lightbox]?.year}</span>
                <span style={{ color:"rgba(255,255,255,0.3)" }}>·</span>
                <span style={{ fontSize:12, color:"var(--text-muted)" }}>{lightbox+1} / {filtered.length}</span>
              </div>
            </div>
          </div>
          <button onClick={e=>{e.stopPropagation();nextImg()}} style={{ position:"absolute", right:16, width:48, height:48, borderRadius:"50%", background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.2)", color:"white", fontSize:22, cursor:"pointer" }}>›</button>
        </div>
      )}

      {/* ══ VIDEO REEL CTA ══ */}
      <div style={{ padding:"0 5% 80px" }}>
        <div style={{ maxWidth:1200, margin:"0 auto", borderRadius:20, overflow:"hidden", position:"relative" }}>
          <div style={{ backgroundImage:"url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=70')", backgroundSize:"cover", backgroundPosition:"center", padding:"80px 5%", position:"relative" }}>
            <div style={{ position:"absolute", inset:0, background:"rgba(13,13,13,0.82)" }} />
            <div style={{ position:"relative", zIndex:1, display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:24 }}>
              <div>
                <span className="section-label">Video Gallery</span>
                <h2 className="section-title" style={{ fontSize:"clamp(24px,4vw,40px)", marginBottom:8 }}>Watch Our <span className="gold-text">Story Unfold</span></h2>
                <p style={{ fontSize:15, color:"var(--text-muted)", maxWidth:420 }}>From annual events to classroom moments — watch the EduSphere experience come alive.</p>
              </div>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" className="btn-primary" style={{ fontSize:14, gap:10 }}>
                <span style={{ fontSize:18 }}>▶</span> Watch on YouTube
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}