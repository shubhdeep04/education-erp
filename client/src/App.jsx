
// import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from "react-router-dom"
// import { useState, useEffect } from "react"

// /* ─── Google Fonts ─────────────────────────────────────────── */
// const fontLink = document.createElement("link")
// fontLink.rel = "stylesheet"
// fontLink.href =
//   "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap"
// document.head.appendChild(fontLink)

// /* ─── CSS Variables & Global Styles ───────────────────────── */
// const globalStyle = document.createElement("style")
// globalStyle.textContent = `
//   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//   :root {
//     --gold: #C9A84C;
//     --gold-light: #E8C97A;
//     --dark: #0D0D0D;
//     --dark2: #181818;
//     --dark3: #222;
//     --cream: #FAF6F0;
//     --text: #E8E4DC;
//     --text-muted: #9A9488;
//     --radius: 12px;
//     --nav-h: 72px;
//     --transition: 0.35s cubic-bezier(0.4,0,0.2,1);
//   }
//   html { scroll-behavior: smooth; }
//   body {
//     font-family: 'DM Sans', sans-serif;
//     background: var(--dark);
//     color: var(--text);
//     min-height: 100vh;
//     overflow-x: hidden;
//   }
//   ::selection { background: var(--gold); color: var(--dark); }
//   ::-webkit-scrollbar { width: 6px; }
//   ::-webkit-scrollbar-track { background: var(--dark2); }
//   ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 3px; }

//   @keyframes fadeUp {
//     from { opacity: 0; transform: translateY(32px); }
//     to   { opacity: 1; transform: translateY(0); }
//   }
//   @keyframes fadeIn {
//     from { opacity: 0; } to { opacity: 1; }
//   }
//   @keyframes slideRight {
//     from { transform: scaleX(0); } to { transform: scaleX(1); }
//   }
//   @keyframes float {
//     0%,100% { transform: translateY(0px); }
//     50%      { transform: translateY(-12px); }
//   }
//   @keyframes shimmer {
//     0%   { background-position: -200% center; }
//     100% { background-position:  200% center; }
//   }
//   @keyframes pulse-ring {
//     0%   { transform: scale(1);   opacity: 0.6; }
//     100% { transform: scale(1.6); opacity: 0; }
//   }

//   .fade-up   { animation: fadeUp 0.7s var(--transition) both; }
//   .fade-in   { animation: fadeIn 0.6s ease both; }
//   .delay-1   { animation-delay: 0.1s; }
//   .delay-2   { animation-delay: 0.2s; }
//   .delay-3   { animation-delay: 0.35s; }
//   .delay-4   { animation-delay: 0.5s; }

//   .gold-text {
//     background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 50%, var(--gold) 100%);
//     background-size: 200% auto;
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     background-clip: text;
//     animation: shimmer 3s linear infinite;
//   }

//   .card {
//     background: linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02));
//     border: 1px solid rgba(201,168,76,0.15);
//     border-radius: var(--radius);
//     backdrop-filter: blur(12px);
//     transition: all var(--transition);
//   }
//   .card:hover {
//     border-color: rgba(201,168,76,0.45);
//     transform: translateY(-4px);
//     box-shadow: 0 24px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.1);
//   }

//   .btn-primary {
//     display: inline-flex; align-items: center; gap: 8px;
//     padding: 14px 32px;
//     background: linear-gradient(135deg, var(--gold), var(--gold-light));
//     color: var(--dark);
//     font-family: 'DM Sans', sans-serif;
//     font-weight: 600;
//     font-size: 15px;
//     letter-spacing: 0.5px;
//     border: none; border-radius: 8px;
//     cursor: pointer; text-decoration: none;
//     transition: all var(--transition);
//     position: relative; overflow: hidden;
//   }
//   .btn-primary::after {
//     content: '';
//     position: absolute; inset: 0;
//     background: linear-gradient(135deg, var(--gold-light), var(--gold));
//     opacity: 0;
//     transition: opacity var(--transition);
//   }
//   .btn-primary:hover::after { opacity: 1; }
//   .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(201,168,76,0.4); }

//   .btn-outline {
//     display: inline-flex; align-items: center; gap: 8px;
//     padding: 13px 30px;
//     background: transparent;
//     color: var(--gold);
//     font-family: 'DM Sans', sans-serif;
//     font-weight: 500;
//     font-size: 15px;
//     border: 1.5px solid rgba(201,168,76,0.5);
//     border-radius: 8px;
//     cursor: pointer; text-decoration: none;
//     transition: all var(--transition);
//   }
//   .btn-outline:hover {
//     background: rgba(201,168,76,0.1);
//     border-color: var(--gold);
//     transform: translateY(-2px);
//   }

//   .section-label {
//     display: inline-block;
//     font-size: 11px;
//     font-weight: 600;
//     letter-spacing: 3px;
//     text-transform: uppercase;
//     color: var(--gold);
//     margin-bottom: 16px;
//   }
//   .section-title {
//     font-family: 'Playfair Display', serif;
//     font-size: clamp(32px, 5vw, 52px);
//     font-weight: 700;
//     line-height: 1.15;
//     color: var(--cream);
//     margin-bottom: 16px;
//   }
//   .section-desc {
//     font-size: 16px;
//     line-height: 1.7;
//     color: var(--text-muted);
//     max-width: 560px;
//   }

//   .divider {
//     width: 60px; height: 3px;
//     background: linear-gradient(90deg, var(--gold), transparent);
//     border-radius: 2px;
//     margin: 16px 0 32px;
//     animation: slideRight 0.8s ease both;
//     transform-origin: left;
//   }

//   /* Navbar */
//   nav {
//     position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
//     height: var(--nav-h);
//     display: flex; align-items: center;
//     padding: 0 5%;
//     transition: all var(--transition);
//   }
//   nav.scrolled {
//     background: rgba(13,13,13,0.92);
//     backdrop-filter: blur(20px);
//     border-bottom: 1px solid rgba(201,168,76,0.12);
//     box-shadow: 0 8px 32px rgba(0,0,0,0.4);
//   }
//   .nav-logo {
//     font-family: 'Playfair Display', serif;
//     font-size: 22px;
//     font-weight: 900;
//     text-decoration: none;
//     display: flex; align-items: center; gap: 10px;
//     flex-shrink: 0;
//   }
//   .nav-logo span { color: var(--cream); }
//   .nav-logo .dot { color: var(--gold); }
//   .nav-links {
//     display: flex; align-items: center; gap: 36px;
//     list-style: none;
//     margin: 0 auto 0 60px;
//   }
//   .nav-links a {
//     font-size: 14px;
//     font-weight: 500;
//     color: var(--text-muted);
//     text-decoration: none;
//     letter-spacing: 0.3px;
//     position: relative;
//     transition: color var(--transition);
//   }
//   .nav-links a::after {
//     content: '';
//     position: absolute; left: 0; bottom: -4px;
//     width: 0; height: 2px;
//     background: var(--gold);
//     border-radius: 1px;
//     transition: width var(--transition);
//   }
//   .nav-links a:hover, .nav-links a.active { color: var(--cream); }
//   .nav-links a:hover::after, .nav-links a.active::after { width: 100%; }
//   .nav-cta { margin-left: auto; }
//   .hamburger {
//     display: none;
//     flex-direction: column; gap: 5px;
//     cursor: pointer; padding: 6px;
//     margin-left: auto;
//     background: none; border: none;
//   }
//   .hamburger span {
//     display: block; width: 24px; height: 2px;
//     background: var(--gold);
//     border-radius: 1px;
//     transition: all var(--transition);
//   }
//   .hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px,5px); }
//   .hamburger.open span:nth-child(2) { opacity: 0; }
//   .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px,-5px); }

//   .mobile-menu {
//     position: fixed; top: var(--nav-h); left: 0; right: 0;
//     background: rgba(13,13,13,0.97);
//     backdrop-filter: blur(20px);
//     border-bottom: 1px solid rgba(201,168,76,0.12);
//     padding: 24px 5% 32px;
//     z-index: 999;
//     animation: fadeUp 0.3s ease both;
//   }
//   .mobile-menu ul { list-style: none; }
//   .mobile-menu ul li { padding: 12px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
//   .mobile-menu ul li a { font-size: 18px; color: var(--text); text-decoration: none; font-weight: 500; }
//   .mobile-menu ul li a.active { color: var(--gold); }

//   @media (max-width: 900px) {
//     .nav-links, .nav-cta { display: none; }
//     .hamburger { display: flex; }
//   }

//   /* Hero */
//   .hero {
//     min-height: 100vh;
//     position: relative;
//     display: flex; align-items: center;
//     overflow: hidden;
//   }
//   .hero-bg {
//     position: absolute; inset: 0;
//     background-image: url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&q=80');
//     background-size: cover; background-position: center;
//     filter: brightness(0.25);
//     transition: transform 0.1s ease-out;
//   }
//   .hero-overlay {
//     position: absolute; inset: 0;
//     background: linear-gradient(135deg, rgba(13,13,13,0.8) 0%, rgba(13,13,13,0.4) 60%, rgba(201,168,76,0.05) 100%);
//   }
//   .hero-content {
//     position: relative; z-index: 2;
//     max-width: 1200px; margin: 0 auto;
//     padding: 0 5%;
//     width: 100%;
//   }
//   .hero-badge {
//     display: inline-flex; align-items: center; gap: 8px;
//     background: rgba(201,168,76,0.12);
//     border: 1px solid rgba(201,168,76,0.3);
//     border-radius: 100px;
//     padding: 8px 18px;
//     font-size: 12px; font-weight: 600;
//     letter-spacing: 2px; text-transform: uppercase;
//     color: var(--gold);
//     margin-bottom: 28px;
//   }
//   .hero-badge .pulse {
//     width: 8px; height: 8px;
//     background: var(--gold);
//     border-radius: 50%;
//     position: relative;
//   }
//   .hero-badge .pulse::after {
//     content: '';
//     position: absolute; inset: 0;
//     background: var(--gold); border-radius: 50%;
//     animation: pulse-ring 1.5s ease-out infinite;
//   }
//   .hero-title {
//     font-family: 'Playfair Display', serif;
//     font-size: clamp(44px, 7vw, 88px);
//     font-weight: 900;
//     line-height: 1.05;
//     color: var(--cream);
//     margin-bottom: 24px;
//     max-width: 800px;
//   }
//   .hero-title em { font-style: italic; }
//   .hero-desc {
//     font-size: clamp(16px, 2vw, 19px);
//     line-height: 1.75;
//     color: rgba(232,228,220,0.7);
//     max-width: 520px;
//     margin-bottom: 44px;
//   }
//   .hero-actions { display: flex; gap: 16px; flex-wrap: wrap; }
//   .hero-stats {
//     position: relative; z-index: 2;
//     display: flex; gap: 48px;
//     padding: 28px 5%;
//     background: rgba(13,13,13,0.7);
//     backdrop-filter: blur(12px);
//     border-top: 1px solid rgba(201,168,76,0.12);
//     flex-wrap: wrap;
//   }
//   .stat-item { text-align: center; }
//   .stat-num {
//     font-family: 'Playfair Display', serif;
//     font-size: 36px; font-weight: 900;
//     color: var(--gold);
//     display: block;
//   }
//   .stat-label { font-size: 13px; color: var(--text-muted); letter-spacing: 0.5px; margin-top: 4px; }

//   /* Sections */
//   .section { padding: 100px 5%; max-width: 1200px; margin: 0 auto; }
//   .section-wide { padding: 100px 5%; }

//   /* Features Grid */
//   .features-grid {
//     display: grid;
//     grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
//     gap: 24px;
//     margin-top: 60px;
//   }
//   .feature-card {
//     padding: 36px 32px;
//   }
//   .feature-icon {
//     width: 52px; height: 52px;
//     background: linear-gradient(135deg, rgba(201,168,76,0.2), rgba(201,168,76,0.05));
//     border: 1px solid rgba(201,168,76,0.3);
//     border-radius: 14px;
//     display: flex; align-items: center; justify-content: center;
//     font-size: 22px;
//     margin-bottom: 24px;
//   }
//   .feature-title { font-size: 19px; font-weight: 600; color: var(--cream); margin-bottom: 10px; }
//   .feature-desc { font-size: 14px; line-height: 1.7; color: var(--text-muted); }

//   /* Courses */
//   .courses-grid {
//     display: grid;
//     grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//     gap: 24px;
//     margin-top: 60px;
//   }
//   .course-card { overflow: hidden; }
//   .course-thumb {
//     height: 200px;
//     background-size: cover; background-position: center;
//     position: relative;
//   }
//   .course-thumb::after {
//     content: '';
//     position: absolute; inset: 0;
//     background: linear-gradient(to bottom, transparent 40%, rgba(13,13,13,0.9));
//   }
//   .course-badge {
//     position: absolute; top: 16px; left: 16px; z-index: 1;
//     background: var(--gold); color: var(--dark);
//     font-size: 11px; font-weight: 700;
//     letter-spacing: 1px; text-transform: uppercase;
//     padding: 4px 12px; border-radius: 100px;
//   }
//   .course-body { padding: 28px; }
//   .course-meta { display: flex; gap: 16px; margin-bottom: 12px; }
//   .course-meta span { font-size: 12px; color: var(--text-muted); display: flex; align-items: center; gap: 5px; }
//   .course-name { font-size: 18px; font-weight: 600; color: var(--cream); margin-bottom: 10px; line-height: 1.4; }
//   .course-desc-text { font-size: 14px; color: var(--text-muted); line-height: 1.6; margin-bottom: 20px; }
//   .course-footer { display: flex; align-items: center; justify-content: space-between; }
//   .course-price { font-family: 'Playfair Display', serif; font-size: 22px; color: var(--gold); }
//   .course-link {
//     font-size: 13px; font-weight: 600;
//     color: var(--gold); text-decoration: none;
//     display: flex; align-items: center; gap: 5px;
//     transition: gap var(--transition);
//   }
//   .course-link:hover { gap: 10px; }

//   /* Gallery */
//   .gallery-grid {
//     display: grid;
//     grid-template-columns: repeat(4, 1fr);
//     grid-template-rows: 220px 220px;
//     gap: 12px;
//     margin-top: 60px;
//   }
//   .gallery-item {
//     position: relative; overflow: hidden; border-radius: var(--radius);
//     cursor: pointer;
//   }
//   .gallery-item:nth-child(1) { grid-column: span 2; grid-row: span 2; }
//   .gallery-item:nth-child(4) { grid-column: span 2; }
//   .gallery-img {
//     width: 100%; height: 100%;
//     background-size: cover; background-position: center;
//     transition: transform 0.6s ease;
//   }
//   .gallery-item:hover .gallery-img { transform: scale(1.07); }
//   .gallery-overlay {
//     position: absolute; inset: 0;
//     background: linear-gradient(to top, rgba(13,13,13,0.85), transparent);
//     opacity: 0; transition: opacity var(--transition);
//     display: flex; align-items: flex-end; padding: 20px;
//   }
//   .gallery-item:hover .gallery-overlay { opacity: 1; }
//   .gallery-caption { font-size: 14px; font-weight: 500; color: var(--cream); }

//   @media (max-width: 768px) {
//     .gallery-grid {
//       grid-template-columns: repeat(2, 1fr);
//       grid-template-rows: auto;
//     }
//     .gallery-item:nth-child(1) { grid-column: span 2; grid-row: span 1; }
//     .gallery-item:nth-child(4) { grid-column: span 2; }
//   }

//   /* Contact */
//   .contact-grid {
//     display: grid;
//     grid-template-columns: 1fr 1.2fr;
//     gap: 60px;
//     margin-top: 60px;
//     align-items: start;
//   }
//   @media (max-width: 768px) {
//     .contact-grid { grid-template-columns: 1fr; }
//   }
//   .contact-info-card { padding: 40px; }
//   .contact-item { display: flex; gap: 16px; margin-bottom: 28px; align-items: flex-start; }
//   .contact-icon {
//     width: 44px; height: 44px; flex-shrink: 0;
//     background: rgba(201,168,76,0.1);
//     border: 1px solid rgba(201,168,76,0.2);
//     border-radius: 10px;
//     display: flex; align-items: center; justify-content: center;
//     font-size: 18px;
//   }
//   .contact-item-title { font-size: 12px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: var(--gold); margin-bottom: 4px; }
//   .contact-item-value { font-size: 15px; color: var(--text-muted); line-height: 1.6; }

//   /* Form */
//   .form-group { margin-bottom: 20px; }
//   .form-label { display: block; font-size: 12px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; color: var(--gold); margin-bottom: 8px; }
//   .form-input, .form-textarea {
//     width: 100%; padding: 14px 18px;
//     background: rgba(255,255,255,0.04);
//     border: 1px solid rgba(255,255,255,0.1);
//     border-radius: 8px;
//     color: var(--text);
//     font-family: 'DM Sans', sans-serif;
//     font-size: 15px;
//     transition: all var(--transition);
//     outline: none;
//   }
//   .form-input:focus, .form-textarea:focus {
//     border-color: rgba(201,168,76,0.5);
//     background: rgba(201,168,76,0.04);
//     box-shadow: 0 0 0 3px rgba(201,168,76,0.08);
//   }
//   .form-textarea { min-height: 120px; resize: vertical; }
//   .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
//   @media (max-width: 480px) { .form-row { grid-template-columns: 1fr; } }

//   /* About */
//   .about-grid {
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//     gap: 80px;
//     align-items: center;
//     margin-top: 60px;
//   }
//   @media (max-width: 768px) { .about-grid { grid-template-columns: 1fr; gap: 40px; } }
//   .about-image {
//     position: relative;
//   }
//   .about-img-main {
//     width: 100%; height: 480px;
//     border-radius: 16px;
//     background-image: url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80');
//     background-size: cover; background-position: center;
//   }
//   .about-img-card {
//     position: absolute; bottom: -24px; right: -24px;
//     padding: 20px 28px;
//     min-width: 180px;
//     text-align: center;
//   }
//   .about-img-card .num {
//     font-family: 'Playfair Display', serif;
//     font-size: 40px; font-weight: 900; color: var(--gold); display: block;
//   }
//   .about-img-card .lbl { font-size: 13px; color: var(--text-muted); }
//   .about-values { display: flex; flex-direction: column; gap: 20px; margin-top: 32px; }
//   .value-item {
//     display: flex; gap: 16px; align-items: flex-start;
//     padding: 20px 24px;
//     border-left: 3px solid rgba(201,168,76,0.3);
//     transition: border-color var(--transition);
//   }
//   .value-item:hover { border-color: var(--gold); }
//   .value-icon { font-size: 22px; flex-shrink: 0; margin-top: 2px; }
//   .value-title { font-size: 16px; font-weight: 600; color: var(--cream); margin-bottom: 4px; }
//   .value-text { font-size: 14px; color: var(--text-muted); line-height: 1.6; }

//   /* Login */
//   .login-page {
//     min-height: 100vh;
//     display: grid;
//     grid-template-columns: 1fr 1fr;
//   }
//   @media (max-width: 768px) {
//     .login-page { grid-template-columns: 1fr; }
//     .login-visual { display: none; }
//   }
//   .login-visual {
//     background-image: url('https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900&q=80');
//     background-size: cover; background-position: center;
//     position: relative;
//   }
//   .login-visual::after {
//     content: '';
//     position: absolute; inset: 0;
//     background: linear-gradient(135deg, rgba(13,13,13,0.7), rgba(201,168,76,0.15));
//   }
//   .login-visual-content {
//     position: absolute; inset: 0; z-index: 2;
//     display: flex; flex-direction: column;
//     justify-content: flex-end; padding: 60px;
//   }
//   .login-quote {
//     font-family: 'Playfair Display', serif;
//     font-size: 28px; font-style: italic;
//     color: var(--cream); line-height: 1.4; margin-bottom: 16px;
//   }
//   .login-quote-author { font-size: 14px; color: var(--gold); }
//   .login-form-side {
//     display: flex; align-items: center; justify-content: center;
//     padding: 60px 5%;
//     background: var(--dark2);
//   }
//   .login-box { width: 100%; max-width: 420px; }
//   .login-logo {
//     font-family: 'Playfair Display', serif;
//     font-size: 26px; font-weight: 900;
//     color: var(--cream); margin-bottom: 12px;
//   }
//   .login-logo span { color: var(--gold); }
//   .login-subtitle { color: var(--text-muted); font-size: 15px; margin-bottom: 44px; }
//   .role-tabs {
//     display: flex; gap: 8px; margin-bottom: 32px;
//     background: rgba(255,255,255,0.04);
//     border-radius: 10px; padding: 4px;
//   }
//   .role-tab {
//     flex: 1; padding: 10px;
//     text-align: center; font-size: 13px; font-weight: 600;
//     border-radius: 8px; cursor: pointer;
//     transition: all var(--transition);
//     color: var(--text-muted);
//     border: none; background: none;
//     font-family: 'DM Sans', sans-serif;
//   }
//   .role-tab.active {
//     background: linear-gradient(135deg, var(--gold), var(--gold-light));
//     color: var(--dark);
//     box-shadow: 0 4px 12px rgba(201,168,76,0.35);
//   }

//   /* Dashboard */
//   .dashboard-layout {
//     display: grid;
//     grid-template-columns: 260px 1fr;
//     min-height: 100vh;
//   }
//   @media (max-width: 900px) {
//     .dashboard-layout { grid-template-columns: 1fr; }
//     .sidebar { display: none; }
//   }
//   .sidebar {
//     background: var(--dark2);
//     border-right: 1px solid rgba(255,255,255,0.06);
//     padding: 100px 0 40px;
//     position: sticky; top: 0; height: 100vh;
//     overflow-y: auto;
//   }
//   .sidebar-section { padding: 0 20px 32px; }
//   .sidebar-label {
//     font-size: 10px; font-weight: 700;
//     letter-spacing: 2px; text-transform: uppercase;
//     color: var(--text-muted); padding: 0 12px;
//     margin-bottom: 8px;
//   }
//   .sidebar-link {
//     display: flex; align-items: center; gap: 12px;
//     padding: 11px 12px; border-radius: 8px;
//     font-size: 14px; font-weight: 500;
//     color: var(--text-muted); text-decoration: none;
//     transition: all var(--transition);
//     cursor: pointer;
//     margin-bottom: 2px;
//   }
//   .sidebar-link:hover { background: rgba(255,255,255,0.05); color: var(--cream); }
//   .sidebar-link.active { background: rgba(201,168,76,0.12); color: var(--gold); }
//   .sidebar-link .icon { font-size: 17px; width: 24px; text-align: center; }
//   .dashboard-main { padding: 100px 40px 60px; background: var(--dark); }
//   @media (max-width: 600px) { .dashboard-main { padding: 100px 20px 40px; } }
//   .dashboard-greeting { margin-bottom: 40px; }
//   .greeting-sub { font-size: 13px; color: var(--text-muted); letter-spacing: 1px; text-transform: uppercase; margin-bottom: 6px; }
//   .greeting-name {
//     font-family: 'Playfair Display', serif;
//     font-size: 36px; font-weight: 700; color: var(--cream);
//   }
//   .greeting-name em { color: var(--gold); font-style: normal; }
//   .stat-cards {
//     display: grid;
//     grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//     gap: 20px; margin-bottom: 40px;
//   }
//   .stat-card { padding: 28px 24px; }
//   .stat-card-icon { font-size: 28px; margin-bottom: 16px; }
//   .stat-card-val {
//     font-family: 'Playfair Display', serif;
//     font-size: 32px; font-weight: 700; color: var(--cream);
//     margin-bottom: 6px;
//   }
//   .stat-card-label { font-size: 13px; color: var(--text-muted); }
//   .stat-card-change { font-size: 12px; margin-top: 8px; color: #4ade80; }
//   .activity-table {
//     width: 100%; border-collapse: collapse;
//     margin-top: 24px;
//   }
//   .activity-table th {
//     text-align: left; padding: 12px 16px;
//     font-size: 11px; font-weight: 700;
//     letter-spacing: 1.5px; text-transform: uppercase;
//     color: var(--text-muted);
//     border-bottom: 1px solid rgba(255,255,255,0.06);
//   }
//   .activity-table td {
//     padding: 14px 16px; font-size: 14px;
//     color: var(--text-muted);
//     border-bottom: 1px solid rgba(255,255,255,0.04);
//     transition: background var(--transition);
//   }
//   .activity-table tr:hover td { background: rgba(255,255,255,0.02); color: var(--cream); }
//   .status-badge {
//     display: inline-block; padding: 3px 10px;
//     border-radius: 100px; font-size: 11px; font-weight: 600;
//   }
//   .status-active { background: rgba(74,222,128,0.15); color: #4ade80; }
//   .status-pending { background: rgba(201,168,76,0.15); color: var(--gold); }
//   .status-done { background: rgba(148,163,184,0.15); color: #94a3b8; }

//   /* Services */
//   .services-hero {
//     padding: 160px 5% 80px;
//     text-align: center;
//     background: radial-gradient(ellipse at center top, rgba(201,168,76,0.08) 0%, transparent 70%);
//   }
//   .services-grid {
//     display: grid;
//     grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
//     gap: 24px;
//     padding: 0 5% 100px;
//     max-width: 1200px; margin: 0 auto;
//   }
//   .service-card { padding: 40px 32px; text-align: center; }
//   .service-num {
//     font-family: 'Playfair Display', serif;
//     font-size: 48px; font-weight: 900;
//     color: rgba(201,168,76,0.15);
//     line-height: 1; margin-bottom: 20px;
//   }
//   .service-icon { font-size: 32px; margin-bottom: 16px; }
//   .service-title { font-size: 19px; font-weight: 600; color: var(--cream); margin-bottom: 12px; }
//   .service-text { font-size: 14px; color: var(--text-muted); line-height: 1.7; }

//   /* Footer */
//   footer {
//     background: var(--dark2);
//     border-top: 1px solid rgba(255,255,255,0.06);
//     padding: 60px 5% 32px;
//   }
//   .footer-grid {
//     display: grid;
//     grid-template-columns: 1.5fr 1fr 1fr 1fr;
//     gap: 48px;
//     max-width: 1200px; margin: 0 auto 48px;
//   }
//   @media (max-width: 768px) {
//     .footer-grid { grid-template-columns: 1fr 1fr; gap: 32px; }
//   }
//   @media (max-width: 480px) {
//     .footer-grid { grid-template-columns: 1fr; }
//   }
//   .footer-brand p { font-size: 14px; color: var(--text-muted); line-height: 1.7; margin-top: 16px; max-width: 280px; }
//   .footer-heading { font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: var(--gold); margin-bottom: 20px; }
//   .footer-links { list-style: none; display: flex; flex-direction: column; gap: 10px; }
//   .footer-links a { font-size: 14px; color: var(--text-muted); text-decoration: none; transition: color var(--transition); }
//   .footer-links a:hover { color: var(--cream); }
//   .footer-bottom {
//     border-top: 1px solid rgba(255,255,255,0.06);
//     padding-top: 28px;
//     display: flex; justify-content: space-between; align-items: center;
//     max-width: 1200px; margin: 0 auto;
//     flex-wrap: wrap; gap: 12px;
//   }
//   .footer-bottom p { font-size: 13px; color: var(--text-muted); }
//   .social-links { display: flex; gap: 12px; }
//   .social-link {
//     width: 36px; height: 36px;
//     border: 1px solid rgba(255,255,255,0.1);
//     border-radius: 50%;
//     display: flex; align-items: center; justify-content: center;
//     font-size: 14px; text-decoration: none;
//     transition: all var(--transition);
//     color: var(--text-muted);
//   }
//   .social-link:hover {
//     border-color: var(--gold);
//     background: rgba(201,168,76,0.1);
//     color: var(--gold);
//   }
// `
// document.head.appendChild(globalStyle)

// /* ─── Navbar ───────────────────────────────────────────────── */
// function Navbar() {
//   const [scrolled, setScrolled] = useState(false)
//   const [menuOpen, setMenuOpen] = useState(false)
//   const location = useLocation()

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20)
//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   useEffect(() => { setMenuOpen(false) }, [location])

//   const links = [
//     { to: "/", label: "Home" },
//     { to: "/about", label: "About" },
//     { to: "/courses", label: "Courses" },
//     { to: "/services", label: "Services" },
//     { to: "/gallery", label: "Gallery" },
//     { to: "/contact", label: "Contact" },
//   ]

//   return (
//     <>
//       <nav className={scrolled ? "scrolled" : ""}>
//         <Link to="/" className="nav-logo">
//           <span>EDUCATION<em className="dot">●</em>ERP</span>
//         </Link>
//         <ul className="nav-links">
//           {links.map(l => (
//             <li key={l.to}>
//               <Link to={l.to} className={location.pathname === l.to ? "active" : ""}>{l.label}</Link>
//             </li>
//           ))}
//         </ul>
//         <Link to="/login" className="nav-cta btn-primary" style={{ fontSize: 13, padding: "10px 22px" }}>
//           Sign In →
//         </Link>
//         <button className={`hamburger ${menuOpen ? "open" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
//           <span /><span /><span />
//         </button>
//       </nav>

//       {menuOpen && (
//         <div className="mobile-menu">
//           <ul>
//             {links.map(l => (
//               <li key={l.to}>
//                 <Link to={l.to} className={location.pathname === l.to ? "active" : ""}>{l.label}</Link>
//               </li>
//             ))}
//             <li style={{ marginTop: 20 }}>
//               <Link to="/login" className="btn-primary" style={{ width: "100%", justifyContent: "center" }}>Sign In →</Link>
//             </li>
//           </ul>
//         </div>
//       )}
//     </>
//   )
// }

// /* ─── Footer ───────────────────────────────────────────────── */
// function Footer() {
//   return (
//     <footer>
//       <div className="footer-grid">
//         <div className="footer-brand">
//           <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, fontWeight: 900, color: "var(--cream)" }}>
//             Edu<span style={{ color: "var(--gold)" }}>●</span>Sphere
//           </div>
//           <p>Empowering learners through world-class education. Building tomorrow's leaders, today.</p>
//         </div>
//         <div>
//           <div className="footer-heading">Quick Links</div>
//           <ul className="footer-links">
//             {["Home", "About", "Courses", "Services"].map(i => (
//               <li key={i}><Link to={`/${i === "Home" ? "" : i.toLowerCase()}`}>{i}</Link></li>
//             ))}
//           </ul>
//         </div>
//         <div>
//           <div className="footer-heading">Programs</div>
//           <ul className="footer-links">
//             {["Science", "Commerce", "Arts", "Technology", "Sports"].map(i => (
//               <li key={i}><a href="#">{i}</a></li>
//             ))}
//           </ul>
//         </div>
//         <div>
//           <div className="footer-heading">Contact</div>
//           <ul className="footer-links">
//             <li><a href="#">📍 BHOPAL , M.P.</a></li>
//             <li><a href="#">📞 +91 98765 43210</a></li>
//             <li><a href="#">✉️ info@edusphere.in</a></li>
//           </ul>
//         </div>
//       </div>
//       <div className="footer-bottom">
//         <p>© 2025 EDUCATIONERP. All rights reserved.</p>
//         <div className="social-links">
//           {["𝕏", "in", "f", "▶"].map((s, i) => (
//             <a key={i} href="#" className="social-link">{s}</a>
//           ))}
//         </div>
//       </div>
//     </footer>
//   )
// }

// /* ─── Home ─────────────────────────────────────────────────── */
// function Home() {
//   const navigate = useNavigate()
//   const features = [
//     { icon: "🎓", title: "Expert Faculty", desc: "Learn from industry veterans and experienced educators with decades of real-world expertise." },
//     { icon: "💻", title: "Digital Learning", desc: "Access cutting-edge digital tools, recorded lectures, and interactive online resources anytime." },
//     { icon: "🏆", title: "Proven Results", desc: "95% pass rate with hundreds of students placed in top universities and companies." },
//     { icon: "🤝", title: "Mentorship", desc: "Personal guidance from dedicated mentors who are invested in your individual success." },
//     { icon: "📊", title: "Progress Tracking", desc: "Real-time dashboards to track your academic journey, attendance, and performance." },
//     { icon: "🌍", title: "Global Network", desc: "Connect with alumni across the globe and build lifelong professional relationships." },
//   ]

//   return (
//     <div>
//       {/* HERO */}
//       <div className="hero" style={{ flexDirection: "column" }}>
//         <div className="hero-bg" />
//         <div className="hero-overlay" />
//         <div className="hero-content" style={{ paddingTop: "var(--nav-h)" }}>
//           <div className="fade-up hero-badge">
//             <span className="pulse" />
//             Now Enrolling for 2025–26
//           </div>
//           <h1 className="fade-up delay-1 hero-title">
//             Shape Your <em className="gold-text">Future</em><br />with Excellence
//           </h1>
//           <p className="fade-up delay-2 hero-desc">
//             EDUCATIONERPis where ambition meets opportunity. Join thousands of students on the path to academic mastery and lifelong success.
//           </p>
//           <div className="fade-up delay-3 hero-actions">
//             <button className="btn-primary" onClick={() => navigate("/courses")}>Explore Courses →</button>
//             <button className="btn-outline" onClick={() => navigate("/about")}>Our Story</button>
//           </div>
//         </div>
//         <div className="hero-stats fade-in delay-4" style={{ width: "100%" }}>
//           {[["5,000+", "Students Enrolled"], ["120+", "Courses Offered"], ["98%", "Satisfaction Rate"], ["25+", "Years of Excellence"]].map(([n, l]) => (
//             <div className="stat-item" key={l}>
//               <span className="stat-num">{n}</span>
//               <span className="stat-label">{l}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* FEATURES */}
//       <div className="section">
//         <span className="section-label fade-up">Why Choose Us</span>
//         <h2 className="section-title fade-up delay-1">Built for <span className="gold-text">Brilliance</span></h2>
//         <div className="divider" />
//         <p className="section-desc fade-up delay-2">Everything you need to thrive academically — under one roof.</p>
//         <div className="features-grid">
//           {features.map((f, i) => (
//             <div key={i} className={`card feature-card fade-up delay-${(i % 3) + 1}`}>
//               <div className="feature-icon">{f.icon}</div>
//               <div className="feature-title">{f.title}</div>
//               <div className="feature-desc">{f.desc}</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* CTA BANNER */}
//       <div style={{
//         margin: "0 5% 80px",
//         borderRadius: 20,
//         background: "linear-gradient(135deg, rgba(201,168,76,0.12), rgba(201,168,76,0.04))",
//         border: "1px solid rgba(201,168,76,0.25)",
//         padding: "60px 48px",
//         display: "flex", alignItems: "center", justifyContent: "space-between",
//         flexWrap: "wrap", gap: 24,
//         backgroundImage: "url('https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200&q=70')",
//         backgroundSize: "cover", backgroundPosition: "center",
//         position: "relative", overflow: "hidden"
//       }}>
//         <div style={{ position: "absolute", inset: 0, background: "rgba(13,13,13,0.82)" }} />
//         <div style={{ position: "relative", zIndex: 1 }}>
//           <div className="section-label">Limited Seats Available</div>
//           <h2 className="section-title" style={{ fontSize: "clamp(26px,4vw,42px)", marginBottom: 0 }}>
//             Ready to Begin Your <span className="gold-text">Journey?</span>
//           </h2>
//         </div>
//         <div style={{ position: "relative", zIndex: 1, display: "flex", gap: 16, flexWrap: "wrap" }}>
//           <button className="btn-primary" onClick={() => navigate("/login")}>Apply Now →</button>
//           <button className="btn-outline" onClick={() => navigate("/contact")}>Talk to Us</button>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   )
// }

// /* ─── About ────────────────────────────────────────────────── */
// function About() {
//   const values = [
//     { icon: "🎯", title: "Mission-Driven", text: "Every decision we make is guided by our commitment to student success and educational excellence." },
//     { icon: "💡", title: "Innovation First", text: "We continuously evolve our teaching methods to match the demands of a fast-changing world." },
//     { icon: "❤️", title: "Student-Centric", text: "Students are at the heart of everything — their growth, wellbeing, and future always come first." },
//   ]
//   return (
//     <div>
//       <div style={{
//         padding: "160px 5% 80px",
//         background: "linear-gradient(to bottom, rgba(201,168,76,0.05), transparent)"
//       }}>
//         <div style={{ maxWidth: 1200, margin: "0 auto" }}>
//           <span className="section-label fade-up">Our Story</span>
//           <h1 className="section-title fade-up delay-1" style={{ fontSize: "clamp(38px,6vw,68px)" }}>
//             25 Years of <span className="gold-text">Shaping Minds</span>
//           </h1>
//           <div className="divider" />

//           <div className="about-grid">
//             <div className="about-image fade-up delay-1">
//               <div className="about-img-main" />
//               <div className="card about-img-card">
//                 <span className="num">25+</span>
//                 <span className="lbl">Years of Legacy</span>
//               </div>
//             </div>
//             <div className="fade-up delay-2">
//               <p className="section-desc" style={{ maxWidth: "100%", fontSize: 17, marginBottom: 28 }}>
//                 Founded in 2000, EduSphere began as a single classroom with a bold vision — to provide world-class education accessible to every aspiring student in central India.
//               </p>
//               <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.8, marginBottom: 36 }}>
//                 Today, we're a full-scale institution with over 5,000 students, 200+ faculty members, and a legacy of academic excellence that spans two and a half decades. Our alumni have gone on to lead in medicine, engineering, law, business, and the arts across the globe.
//               </p>
//               <div className="about-values">
//                 {values.map((v, i) => (
//                   <div key={i} className="value-item">
//                     <span className="value-icon">{v.icon}</span>
//                     <div>
//                       <div className="value-title">{v.title}</div>
//                       <div className="value-text">{v.text}</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   )
// }

// /* ─── Courses ──────────────────────────────────────────────── */
// function Courses() {
//   const courses = [
//     {
//       thumb: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=70",
//       badge: "Science", name: "Physics & Mathematics Advanced",
//       desc: "Deep dive into mechanics, calculus, and modern physics for competitive exam excellence.",
//       duration: "12 months", students: "320", price: "₹18,000"
//     },
//     {
//       thumb: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=70",
//       badge: "Commerce", name: "Business & Accountancy Pro",
//       desc: "Comprehensive coverage of accounts, economics, and business studies with industry insights.",
//       duration: "12 months", students: "280", price: "₹15,000"
//     },
//     {
//       thumb: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&q=70",
//       badge: "Technology", name: "Computer Science & AI",
//       desc: "Modern curriculum covering programming fundamentals, data structures, and AI concepts.",
//       duration: "10 months", students: "410", price: "₹22,000"
//     },
//     {
//       thumb: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=70",
//       badge: "Arts", name: "Liberal Arts & Humanities",
//       desc: "Explore history, literature, psychology, and social sciences with expert faculty guidance.",
//       duration: "12 months", students: "190", price: "₹12,000"
//     },
//     {
//       thumb: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&q=70",
//       badge: "Language", name: "English Communication Mastery",
//       desc: "Build confidence in spoken and written English essential for academics and careers.",
//       duration: "6 months", students: "520", price: "₹8,000"
//     },
//     {
//       thumb: "https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?w=600&q=70",
//       badge: "Entrance", name: "JEE / NEET Foundation",
//       desc: "Structured preparation with mock tests, doubt clearing, and performance analytics.",
//       duration: "18 months", students: "680", price: "₹35,000"
//     },
//   ]

//   return (
//     <div>
//       <div style={{ padding: "160px 5% 60px", background: "linear-gradient(to bottom, rgba(201,168,76,0.05), transparent)" }}>
//         <div style={{ maxWidth: 1200, margin: "0 auto" }}>
//           <span className="section-label fade-up">All Programs</span>
//           <h1 className="section-title fade-up delay-1">Find Your <span className="gold-text">Course</span></h1>
//           <div className="divider" />
//           <p className="section-desc fade-up delay-2">From foundation to advanced — we have a program designed for every goal.</p>

//           <div className="courses-grid" style={{ marginTop: 60 }}>
//             {courses.map((c, i) => (
//               <div key={i} className={`card course-card fade-up delay-${(i % 3) + 1}`}>
//                 <div className="course-thumb" style={{ backgroundImage: `url('${c.thumb}')` }}>
//                   <span className="course-badge">{c.badge}</span>
//                 </div>
//                 <div className="course-body">
//                   <div className="course-meta">
//                     <span>⏱ {c.duration}</span>
//                     <span>👥 {c.students} students</span>
//                   </div>
//                   <div className="course-name">{c.name}</div>
//                   <div className="course-desc-text">{c.desc}</div>
//                   <div className="course-footer">
//                     <span className="course-price">{c.price}</span>
//                     <a href="#" className="course-link">Enroll Now →</a>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   )
// }

// /* ─── Services ─────────────────────────────────────────────── */
// function Services() {
//   const services = [
//     { num: "01", icon: "🎓", title: "Academic Counselling", text: "One-on-one guidance sessions to help students choose the right career path and course." },
//     { num: "02", icon: "📚", title: "Library & E-Resources", text: "Access to 10,000+ books, journals, and premium online learning platforms." },
//     { num: "03", icon: "💻", title: "Digital Labs", text: "State-of-the-art computer labs with high-speed internet available 7 days a week." },
//     { num: "04", icon: "🏋️", title: "Sports & Wellness", text: "Indoor sports, yoga classes, and mental health support to keep you at your best." },
//     { num: "05", icon: "🚌", title: "Transport Facility", text: "Comfortable bus service covering all major areas of the city with GPS tracking." },
//     { num: "06", icon: "🏠", title: "Hostel Accommodation", text: "Safe, affordable, and comfortable hostel facilities for outstation students." },
//     { num: "07", icon: "🍽️", title: "Cafeteria", text: "Hygienic, nutritious meals at subsidized rates to fuel your academic day." },
//     { num: "08", icon: "🏆", title: "Scholarships", text: "Merit-based and need-based scholarships for deserving and underprivileged students." },
//   ]
//   return (
//     <div>
//       <div className="services-hero">
//         <span className="section-label fade-up">What We Offer</span>
//         <h1 className="section-title fade-up delay-1">Beyond <span className="gold-text">the Classroom</span></h1>
//         <div className="divider" style={{ margin: "16px auto 0" }} />
//         <p className="section-desc fade-up delay-2" style={{ margin: "16px auto 0", textAlign: "center" }}>
//           A holistic educational environment where every student can thrive.
//         </p>
//       </div>
//       <div className="services-grid">
//         {services.map((s, i) => (
//           <div key={i} className={`card service-card fade-up delay-${(i % 3) + 1}`}>
//             <div className="service-num">{s.num}</div>
//             <div className="service-icon">{s.icon}</div>
//             <div className="service-title">{s.title}</div>
//             <div className="service-text">{s.text}</div>
//           </div>
//         ))}
//       </div>
//       <Footer />
//     </div>
//   )
// }

// /* ─── Gallery ──────────────────────────────────────────────── */
// function Gallery() {
//   const imgs = [
//     { src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=900&q=70", caption: "Annual Convocation 2024" },
//     { src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&q=70", caption: "Science Exhibition" },
//     { src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=600&q=70", caption: "Library Reading Hall" },
//     { src: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=900&q=70", caption: "Sports Day 2024" },
//     { src: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=600&q=70", caption: "Computer Lab Session" },
//   ]
//   return (
//     <div>
//       <div style={{ padding: "160px 5% 60px", background: "linear-gradient(to bottom, rgba(201,168,76,0.05), transparent)" }}>
//         <div style={{ maxWidth: 1200, margin: "0 auto" }}>
//           <span className="section-label fade-up">Campus Life</span>
//           <h1 className="section-title fade-up delay-1">A Glimpse of <span className="gold-text">EduSphere</span></h1>
//           <div className="divider" />

//           <div className="gallery-grid fade-up delay-2">
//             {imgs.map((img, i) => (
//               <div key={i} className="gallery-item">
//                 <div className="gallery-img" style={{ backgroundImage: `url('${img.src}')` }} />
//                 <div className="gallery-overlay">
//                   <span className="gallery-caption">{img.caption}</span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   )
// }

// /* ─── Contact ──────────────────────────────────────────────── */
// function Contact() {
//   const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" })
//   const [sent, setSent] = useState(false)

//   const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })
//   const submit = () => { setSent(true); setTimeout(() => setSent(false), 4000) }

//   return (
//     <div>
//       <div style={{ padding: "160px 5% 80px", background: "linear-gradient(to bottom, rgba(201,168,76,0.05), transparent)" }}>
//         <div style={{ maxWidth: 1200, margin: "0 auto" }}>
//           <span className="section-label fade-up">Get in Touch</span>
//           <h1 className="section-title fade-up delay-1">We'd Love to <span className="gold-text">Hear from You</span></h1>
//           <div className="divider" />

//           <div className="contact-grid">
//             <div className="card contact-info-card fade-up delay-1">
//               <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: "var(--cream)", marginBottom: 28 }}>
//                 Contact Information
//               </h3>
//               {[
//                 { icon: "📍", title: "Address", value: "EDUCATIONERP Campus, Civil Lines,\nKhandwa, Madhya Pradesh 450001" },
//                 { icon: "📞", title: "Phone", value: "+91 98765 43210\n+91 73213 00000" },
//                 { icon: "✉️", title: "Email", value: "info@educationerp.in\nadmissions@edusphere.in" },
//                 { icon: "⏰", title: "Hours", value: "Mon–Sat: 8:00 AM – 6:00 PM\nSunday: Closed" },
//               ].map((item, i) => (
//                 <div key={i} className="contact-item">
//                   <div className="contact-icon">{item.icon}</div>
//                   <div>
//                     <div className="contact-item-title">{item.title}</div>
//                     <div className="contact-item-value" style={{ whiteSpace: "pre-line" }}>{item.value}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="card fade-up delay-2" style={{ padding: "40px" }}>
//               <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 22, color: "var(--cream)", marginBottom: 28 }}>
//                 Send a Message
//               </h3>
//               {sent && (
//                 <div style={{ background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 8, padding: "14px 18px", marginBottom: 24, color: "#4ade80", fontSize: 14 }}>
//                   ✅ Message sent! We'll get back to you within 24 hours.
//                 </div>
//               )}
//               <div className="form-row">
//                 <div className="form-group">
//                   <label className="form-label">Name</label>
//                   <input className="form-input" name="name" value={form.name} onChange={handle} placeholder="Your full name" />
//                 </div>
//                 <div className="form-group">
//                   <label className="form-label">Phone</label>
//                   <input className="form-input" name="phone" value={form.phone} onChange={handle} placeholder="+91 XXXXX XXXXX" />
//                 </div>
//               </div>
//               <div className="form-group">
//                 <label className="form-label">Email</label>
//                 <input className="form-input" name="email" value={form.email} onChange={handle} placeholder="your@email.com" />
//               </div>
//               <div className="form-group">
//                 <label className="form-label">Subject</label>
//                 <input className="form-input" name="subject" value={form.subject} onChange={handle} placeholder="How can we help?" />
//               </div>
//               <div className="form-group">
//                 <label className="form-label">Message</label>
//                 <textarea className="form-textarea" name="message" value={form.message} onChange={handle} placeholder="Tell us more..." />
//               </div>
//               <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={submit}>
//                 Send Message →
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   )
// }

// /* ─── Login ────────────────────────────────────────────────── */
// function Login() {
//   const [role, setRole] = useState("student")
//   const [form, setForm] = useState({ email: "", password: "" })
//   const navigate = useNavigate()

//   const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })
//   const doLogin = () => {
//     const routes = { admin: "/admin-dashboard", student: "/student-dashboard", teacher: "/teacher-dashboard" }
//     navigate(routes[role])
//   }

//   return (
//     <div className="login-page" style={{ paddingTop: "var(--nav-h)" }}>
//       <div className="login-visual">
//         <div className="login-visual-content">
//           <div className="login-quote">"Education is the most powerful weapon which you can use to change the world."</div>
//           <div className="login-quote-author">— Nelson Mandela</div>
//         </div>
//       </div>
//       <div className="login-form-side">
//         <div className="login-box fade-up">
//           <div className="login-logo">Edu<span>●</span>Sphere</div>
//           <div className="login-subtitle">Sign in to your portal</div>

//           <div className="role-tabs">
//             {["student", "teacher", "admin"].map(r => (
//               <button key={r} className={`role-tab ${role === r ? "active" : ""}`} onClick={() => setRole(r)}>
//                 {r === "student" ? "🎓 Student" : r === "teacher" ? "📖 Teacher" : "⚙️ Admin"}
//               </button>
//             ))}
//           </div>

//           <div className="form-group">
//             <label className="form-label">Email / Username</label>
//             <input className="form-input" name="email" value={form.email} onChange={handle} placeholder={`${role}@edusphere.in`} />
//           </div>
//           <div className="form-group">
//             <label className="form-label">Password</label>
//             <input className="form-input" type="password" name="password" value={form.password} onChange={handle} placeholder="••••••••" />
//           </div>
//           <div style={{ textAlign: "right", marginBottom: 24, marginTop: -8 }}>
//             <a href="#" style={{ fontSize: 13, color: "var(--gold)", textDecoration: "none" }}>Forgot password?</a>
//           </div>
//           <button className="btn-primary" style={{ width: "100%", justifyContent: "center" }} onClick={doLogin}>
//             Sign in as {role.charAt(0).toUpperCase() + role.slice(1)} →
//           </button>
//           <p style={{ textAlign: "center", marginTop: 24, fontSize: 14, color: "var(--text-muted)" }}>
//             New here? <a href="#" style={{ color: "var(--gold)", textDecoration: "none" }}>Contact admissions →</a>
//           </p>
//         </div>
//       </div>
//     </div>
//   )
// }

// /* ─── Dashboards ───────────────────────────────────────────── */
// function DashboardLayout({ role, sideLinks, children }) {
//   const navigate = useNavigate()
//   const roleColors = { Admin: "var(--gold)", Student: "#60a5fa", Teacher: "#a78bfa" }
//   const color = roleColors[role] || "var(--gold)"

//   return (
//     <div className="dashboard-layout" style={{ paddingTop: "var(--nav-h)" }}>
//       <div className="sidebar">
//         <div style={{ padding: "0 20px 28px", borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: 24 }}>
//           <div style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 8 }}>
//             Logged in as
//           </div>
//           <div style={{ fontWeight: 700, color, fontSize: 16 }}>{role} Portal</div>
//         </div>
//         {sideLinks.map((group, gi) => (
//           <div key={gi} className="sidebar-section">
//             <div className="sidebar-label">{group.label}</div>
//             {group.links.map((l, li) => (
//               <a key={li} className={`sidebar-link ${li === 0 && gi === 0 ? "active" : ""}`}>
//                 <span className="icon">{l.icon}</span>{l.name}
//               </a>
//             ))}
//           </div>
//         ))}
//         <div style={{ padding: "0 20px", marginTop: "auto" }}>
//           <a className="sidebar-link" onClick={() => navigate("/login")} style={{ color: "#f87171" }}>
//             <span className="icon">🚪</span>Sign Out
//           </a>
//         </div>
//       </div>
//       <div className="dashboard-main">{children}</div>
//     </div>
//   )
// }

// // function AdminDashboard() {
// //   const cards = [
// //     { icon: "👥", val: "5,284", label: "Total Students", change: "↑ 12% this semester" },
// //     { icon: "📖", val: "142", label: "Active Courses", change: "↑ 8 new this month" },
// //     { icon: "🧑‍🏫", val: "68", label: "Faculty Members", change: "↑ 3 new hires" },
// //     { icon: "💰", val: "₹42.6L", label: "Monthly Revenue", change: "↑ 18% YoY" },
// //   ]
// //   const table = [
// //     { name: "Ananya Sharma", course: "JEE Foundation", role: "Student", status: "active" },
// //     { name: "Ravi Mishra", course: "NEET Prep", role: "Student", status: "pending" },
// //     { name: "Dr. S. Patel", course: "Physics", role: "Faculty", status: "active" },
// //     { name: "Meera Joshi", course: "Commerce", role: "Student", status: "done" },
// //     { name: "Arjun Rao", course: "Computer Science", role: "Student", status: "active" },
// //   ]
// //   const sideLinks = [
// //     { label: "Main", links: [{ icon: "📊", name: "Dashboard" }, { icon: "👥", name: "Students" }, { icon: "🧑‍🏫", name: "Faculty" }] },
// //     { label: "Academics", links: [{ icon: "📚", name: "Courses" }, { icon: "📅", name: "Timetable" }, { icon: "📝", name: "Exams" }] },
// //     { label: "Finance", links: [{ icon: "💰", name: "Fees & Billing" }, { icon: "📈", name: "Reports" }] },
// //   ]

// //   return (
// //     <DashboardLayout role="Admin" sideLinks={sideLinks}>
// //       <div className="dashboard-greeting fade-up">
// //         <div className="greeting-sub">Good morning</div>
// //         <div className="greeting-name">Welcome back, <em>Administrator</em> 👋</div>
// //       </div>
// //       <div className="stat-cards">
// //         {cards.map((c, i) => (
// //           <div key={i} className={`card stat-card fade-up delay-${i + 1}`}>
// //             <div className="stat-card-icon">{c.icon}</div>
// //             <div className="stat-card-val">{c.val}</div>
// //             <div className="stat-card-label">{c.label}</div>
// //             <div className="stat-card-change">{c.change}</div>
// //           </div>
// //         ))}
// //       </div>
// //       <div className="card fade-up delay-3" style={{ padding: "28px", overflowX: "auto" }}>
// //         <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, color: "var(--cream)", marginBottom: 8 }}>Recent Activity</div>
// //         <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16 }}>Latest enrollments & updates</div>
// //         <table className="activity-table">
// //           <thead>
// //             <tr>
// //               <th>Name</th><th>Course</th><th>Role</th><th>Status</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {table.map((r, i) => (
// //               <tr key={i}>
// //                 <td style={{ color: "var(--cream)" }}>{r.name}</td>
// //                 <td>{r.course}</td>
// //                 <td>{r.role}</td>
// //                 <td>
// //                   <span className={`status-badge status-${r.status}`}>
// //                     {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
// //                   </span>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       </div>
// //     </DashboardLayout>
// //   )
// // }
// function AdminDashboard() {

//   const [activePage, setActivePage] =
//     useState("dashboard")

//   const cards = [
//     {
//       icon: "👥",
//       val: "5,284",
//       label: "Total Students",
//       change: "↑ 12% this semester"
//     },
//     {
//       icon: "📖",
//       val: "142",
//       label: "Active Courses",
//       change: "↑ 8 new this month"
//     },
//     {
//       icon: "🧑‍🏫",
//       val: "68",
//       label: "Faculty Members",
//       change: "↑ 3 new hires"
//     },
//     {
//       icon: "💰",
//       val: "₹42.6L",
//       label: "Monthly Revenue",
//       change: "↑ 18% YoY"
//     },
//   ]

//   const table = [
//     {
//       name: "Ananya Sharma",
//       course: "JEE Foundation",
//       role: "Student",
//       status: "active"
//     },
//     {
//       name: "Ravi Mishra",
//       course: "NEET Prep",
//       role: "Student",
//       status: "pending"
//     },
//     {
//       name: "Dr. S. Patel",
//       course: "Physics",
//       role: "Faculty",
//       status: "active"
//     },
//     {
//       name: "Meera Joshi",
//       course: "Commerce",
//       role: "Student",
//       status: "done"
//     },
//     {
//       name: "Arjun Rao",
//       course: "Computer Science",
//       role: "Student",
//       status: "active"
//     },
//   ]

//   const sideLinks = [
//     {
//       label: "Main",
//       links: [
//         { icon: "📊", name: "Dashboard", key: "dashboard" },
//         { icon: "👥", name: "Students", key: "students" },
//         { icon: "🧑‍🏫", name: "Faculty", key: "faculty" }
//       ]
//     },

//     {
//       label: "Academics",
//       links: [
//         { icon: "📚", name: "Courses", key: "courses" },
//         { icon: "📅", name: "Timetable", key: "timetable" },
//         { icon: "📝", name: "Exams", key: "exams" }
//       ]
//     },

//     {
//       label: "Finance",
//       links: [
//         { icon: "💰", name: "Fees & Billing", key: "finance" },
//         { icon: "📈", name: "Reports", key: "reports" }
//       ]
//     },
//   ]

//   return (

//     <DashboardLayout
//       role="Admin"
//       sideLinks={sideLinks}
//     >

//       {/* SIDEBAR BUTTONS */}

//       <div
//         style={{
//           display: "flex",
//           gap: "10px",
//           flexWrap: "wrap",
//           marginBottom: "30px"
//         }}
//       >

//         {sideLinks.map((group) =>

//           group.links.map((item) => (

//             <button
//               key={item.key}
//               onClick={() =>
//                 setActivePage(item.key)
//               }
//               style={{
//                 padding: "12px 18px",
//                 border: "none",
//                 borderRadius: "8px",
//                 cursor: "pointer",
//                 backgroundColor:
//                   activePage === item.key
//                     ? "#c9a84c"
//                     : "#1f2937",
//                 color: "white",
//                 fontWeight: "600"
//               }}
//             >
//               {item.icon} {item.name}
//             </button>

//           ))

//         )}

//       </div>

//       {/* DASHBOARD */}

//       {activePage === "dashboard" && (

//         <>
//           <div className="dashboard-greeting fade-up">
//             <div className="greeting-sub">
//               Good morning
//             </div>

//             <div className="greeting-name">
//               Welcome back,
//               <em> Administrator </em> 👋
//             </div>
//           </div>

//           <div className="stat-cards">

//             {cards.map((c, i) => (

//               <div
//                 key={i}
//                 className={`card stat-card fade-up delay-${i + 1}`}
//               >

//                 <div className="stat-card-icon">
//                   {c.icon}
//                 </div>

//                 <div className="stat-card-val">
//                   {c.val}
//                 </div>

//                 <div className="stat-card-label">
//                   {c.label}
//                 </div>

//                 <div className="stat-card-change">
//                   {c.change}
//                 </div>

//               </div>

//             ))}

//           </div>

//           <div
//             className="card fade-up delay-3"
//             style={{
//               padding: "28px",
//               overflowX: "auto"
//             }}
//           >

//             <div
//               style={{
//                 fontFamily:
//                   "'Playfair Display',serif",
//                 fontSize: 20,
//                 color: "var(--cream)",
//                 marginBottom: 8
//               }}
//             >
//               Recent Activity
//             </div>

//             <div
//               style={{
//                 fontSize: 13,
//                 color: "var(--text-muted)",
//                 marginBottom: 16
//               }}
//             >
//               Latest enrollments & updates
//             </div>

//             <table className="activity-table">

//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Course</th>
//                   <th>Role</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>

//               <tbody>

//                 {table.map((r, i) => (

//                   <tr key={i}>

//                     <td
//                       style={{
//                         color: "var(--cream)"
//                       }}
//                     >
//                       {r.name}
//                     </td>

//                     <td>{r.course}</td>

//                     <td>{r.role}</td>

//                     <td>

//                       <span
//                         className={`status-badge status-${r.status}`}
//                       >
//                         {r.status
//                           .charAt(0)
//                           .toUpperCase() +
//                           r.status.slice(1)}
//                       </span>

//                     </td>

//                   </tr>

//                 ))}

//               </tbody>

//             </table>

//           </div>
//         </>

//       )}

//       {/* STUDENTS */}

//       {/* STUDENTS */}

// {activePage === "students" && (

//   <div>

//     {/* TOP CARDS */}

//     <div
//       style={{
//         display: "grid",
//         gridTemplateColumns:
//           "repeat(auto-fit,minmax(220px,1fr))",
//         gap: "20px",
//         marginBottom: "30px"
//       }}
//     >

//       <div
//         className="card"
//         style={{
//           padding: "25px",
//           borderLeft: "5px solid #2563eb"
//         }}
//       >
//         <h3 style={{ fontSize: "18px" }}>
//           👨‍🎓 Total Students
//         </h3>

//         <h1
//           style={{
//             fontSize: "38px",
//             marginTop: "15px",
//             color: "#2563eb"
//           }}
//         >
//           5,284
//         </h1>

//         <p style={{ marginTop: "10px" }}>
//           ↑ 12% this semester
//         </p>
//       </div>

//       <div
//         className="card"
//         style={{
//           padding: "25px",
//           borderLeft: "5px solid #16a34a"
//         }}
//       >
//         <h3 style={{ fontSize: "18px" }}>
//           ✅ Active Students
//         </h3>

//         <h1
//           style={{
//             fontSize: "38px",
//             marginTop: "15px",
//             color: "#16a34a"
//           }}
//         >
//           5,010
//         </h1>

//         <p style={{ marginTop: "10px" }}>
//           Regular attendance
//         </p>
//       </div>

//       <div
//         className="card"
//         style={{
//           padding: "25px",
//           borderLeft: "5px solid #f59e0b"
//         }}
//       >
//         <h3 style={{ fontSize: "18px" }}>
//           🆕 New Admissions
//         </h3>

//         <h1
//           style={{
//             fontSize: "38px",
//             marginTop: "15px",
//             color: "#f59e0b"
//           }}
//         >
//           120
//         </h1>

//         <p style={{ marginTop: "10px" }}>
//           This month
//         </p>
//       </div>

//       <div
//         className="card"
//         style={{
//           padding: "25px",
//           borderLeft: "5px solid #dc2626"
//         }}
//       >
//         <h3 style={{ fontSize: "18px" }}>
//           📚 Courses Running
//         </h3>

//         <h1
//           style={{
//             fontSize: "38px",
//             marginTop: "15px",
//             color: "#dc2626"
//           }}
//         >
//           142
//         </h1>

//         <p style={{ marginTop: "10px" }}>
//           Across all departments
//         </p>
//       </div>

//     </div>

//     {/* STUDENT TABLE */}

//     <div
//       className="card"
//       style={{
//         padding: "30px",
//         overflowX: "auto"
//       }}
//     >

//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: "20px"
//         }}
//       >

//         <div>

//           <h2
//             style={{
//               fontSize: "28px",
//               marginBottom: "8px"
//             }}
//           >
//             👨‍🎓 Student Management
//           </h2>

//           <p style={{ color: "#9ca3af" }}>
//             Manage all students details,
//             admissions and records
//           </p>

//         </div>

//         <button
//           style={{
//             padding: "12px 20px",
//             backgroundColor: "#2563eb",
//             color: "white",
//             border: "none",
//             borderRadius: "8px",
//             cursor: "pointer",
//             fontWeight: "600"
//           }}
//         >
//           + Add New Student
//         </button>

//       </div>

//       <table className="activity-table">

//         <thead>

//           <tr>

//             <th>Student Name</th>

//             <th>Course</th>

//             <th>Phone</th>

//             <th>Status</th>

//             <th>Performance</th>

//             <th>Action</th>

//           </tr>

//         </thead>

//         <tbody>

//           <tr>

//             <td>
//               <div>
//                 <strong>
//                   Aarav Sharma
//                 </strong>

//                 <br />

//                 <span
//                   style={{
//                     fontSize: "13px",
//                     color: "#9ca3af"
//                   }}
//                 >
//                   aarav@gmail.com
//                 </span>
//               </div>
//             </td>

//             <td>Computer Science</td>

//             <td>9876543210</td>

//             <td>
//               <span
//                 className="status-badge status-active"
//               >
//                 Active
//               </span>
//             </td>

//             <td>92%</td>

//             <td>

//               <button
//                 style={{
//                   padding: "8px 14px",
//                   backgroundColor: "#2563eb",
//                   border: "none",
//                   borderRadius: "6px",
//                   color: "white",
//                   marginRight: "10px",
//                   cursor: "pointer"
//                 }}
//               >
//                 Edit
//               </button>

//               <button
//                 style={{
//                   padding: "8px 14px",
//                   backgroundColor: "#dc2626",
//                   border: "none",
//                   borderRadius: "6px",
//                   color: "white",
//                   cursor: "pointer"
//                 }}
//               >
//                 Delete
//               </button>

//             </td>

//           </tr>

//           <tr>

//             <td>
//               <div>
//                 <strong>
//                   Priya Patel
//                 </strong>

//                 <br />

//                 <span
//                   style={{
//                     fontSize: "13px",
//                     color: "#9ca3af"
//                   }}
//                 >
//                   priya@gmail.com
//                 </span>
//               </div>
//             </td>

//             <td>Business Studies</td>

//             <td>9123456780</td>

//             <td>
//               <span
//                 className="status-badge status-pending"
//               >
//                 Pending
//               </span>
//             </td>

//             <td>88%</td>

//             <td>

//               <button
//                 style={{
//                   padding: "8px 14px",
//                   backgroundColor: "#2563eb",
//                   border: "none",
//                   borderRadius: "6px",
//                   color: "white",
//                   marginRight: "10px",
//                   cursor: "pointer"
//                 }}
//               >
//                 Edit
//               </button>

//               <button
//                 style={{
//                   padding: "8px 14px",
//                   backgroundColor: "#dc2626",
//                   border: "none",
//                   borderRadius: "6px",
//                   color: "white",
//                   cursor: "pointer"
//                 }}
//               >
//                 Delete
//               </button>

//             </td>

//           </tr>

//           <tr>

//             <td>
//               <div>
//                 <strong>
//                   Rahul Verma
//                 </strong>

//                 <br />

//                 <span
//                   style={{
//                     fontSize: "13px",
//                     color: "#9ca3af"
//                   }}
//                 >
//                   rahul@gmail.com
//                 </span>
//               </div>
//             </td>

//             <td>JEE Foundation</td>

//             <td>9988776655</td>

//             <td>
//               <span
//                 className="status-badge status-done"
//               >
//                 Completed
//               </span>
//             </td>

//             <td>95%</td>

//             <td>

//               <button
//                 style={{
//                   padding: "8px 14px",
//                   backgroundColor: "#2563eb",
//                   border: "none",
//                   borderRadius: "6px",
//                   color: "white",
//                   marginRight: "10px",
//                   cursor: "pointer"
//                 }}
//               >
//                 Edit
//               </button>

//               <button
//                 style={{
//                   padding: "8px 14px",
//                   backgroundColor: "#dc2626",
//                   border: "none",
//                   borderRadius: "6px",
//                   color: "white",
//                   cursor: "pointer"
//                 }}
//               >
//                 Delete
//               </button>

//             </td>

//           </tr>

//         </tbody>

//       </table>

//     </div>

//   </div>

// )}
//       {/* FACULTY */}

//       {/* FACULTY */}

// {activePage === "faculty" && (

//   <div>

//     {/* TOP CARDS */}

//     <div
//       style={{
//         display: "grid",
//         gridTemplateColumns:
//           "repeat(auto-fit,minmax(220px,1fr))",
//         gap: "20px",
//         marginBottom: "30px"
//       }}
//     >

//       <div
//         className="card"
//         style={{
//           padding: "25px",
//           borderLeft: "5px solid #7c3aed"
//         }}
//       >
//         <h3 style={{ fontSize: "18px" }}>
//           🧑‍🏫 Total Faculty
//         </h3>

//         <h1
//           style={{
//             fontSize: "38px",
//             marginTop: "15px",
//             color: "#7c3aed"
//           }}
//         >
//           68
//         </h1>

//         <p style={{ marginTop: "10px" }}>
//           Experienced Teachers
//         </p>
//       </div>

//       <div
//         className="card"
//         style={{
//           padding: "25px",
//           borderLeft: "5px solid #16a34a"
//         }}
//       >
//         <h3 style={{ fontSize: "18px" }}>
//           ✅ Active Faculty
//         </h3>

//         <h1
//           style={{
//             fontSize: "38px",
//             marginTop: "15px",
//             color: "#16a34a"
//           }}
//         >
//           61
//         </h1>

//         <p style={{ marginTop: "10px" }}>
//           Currently Teaching
//         </p>
//       </div>

//       <div
//         className="card"
//         style={{
//           padding: "25px",
//           borderLeft: "5px solid #f59e0b"
//         }}
//       >
//         <h3 style={{ fontSize: "18px" }}>
//           📚 Departments
//         </h3>

//         <h1
//           style={{
//             fontSize: "38px",
//             marginTop: "15px",
//             color: "#f59e0b"
//           }}
//         >
//           12
//         </h1>

//         <p style={{ marginTop: "10px" }}>
//           Different Streams
//         </p>
//       </div>

//       <div
//         className="card"
//         style={{
//           padding: "25px",
//           borderLeft: "5px solid #dc2626"
//         }}
//       >
//         <h3 style={{ fontSize: "18px" }}>
//           ⭐ Top Rating
//         </h3>

//         <h1
//           style={{
//             fontSize: "38px",
//             marginTop: "15px",
//             color: "#dc2626"
//           }}
//         >
//           4.9
//         </h1>

//         <p style={{ marginTop: "10px" }}>
//           Student Feedback
//         </p>
//       </div>

//     </div>

//     {/* FACULTY TABLE */}

//     <div
//       className="card"
//       style={{
//         padding: "30px",
//         overflowX: "auto"
//       }}
//     >

//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: "20px"
//         }}
//       >

//         <div>

//           <h2
//             style={{
//               fontSize: "28px",
//               marginBottom: "8px"
//             }}
//           >
//             🧑‍🏫 Faculty Management
//           </h2>

//           <p style={{ color: "#9ca3af" }}>
//             Manage teachers, departments and faculty details
//           </p>

//         </div>

//         <button
//           style={{
//             padding: "12px 20px",
//             backgroundColor: "#7c3aed",
//             color: "white",
//             border: "none",
//             borderRadius: "8px",
//             cursor: "pointer",
//             fontWeight: "600"
//           }}
//         >
//           + Add Faculty
//         </button>

//       </div>

//       <table className="activity-table">

//         <thead>

//           <tr>

//             <th>Faculty Name</th>

//             <th>Department</th>

//             <th>Phone</th>

//             <th>Status</th>

//             <th>Experience</th>

//             <th>Action</th>

//           </tr>

//         </thead>

//         <tbody>

//           <tr>

//             <td>
//               <div>
//                 <strong>
//                   Dr. Sunita Patel
//                 </strong>

//                 <br />

//                 <span
//                   style={{
//                     fontSize: "13px",
//                     color: "#9ca3af"
//                   }}
//                 >
//                   sunita@gmail.com
//                 </span>
//               </div>
//             </td>

//             <td>Physics</td>

//             <td>9876543210</td>

//             <td>
//               <span
//                 className="status-badge status-active"
//               >
//                 Active
//               </span>
//             </td>

//             <td>12 Years</td>

//             <td>

//               <button
//                 style={{
//                   padding: "8px 14px",
//                   backgroundColor: "#2563eb",
//                   border: "none",
//                   borderRadius: "6px",
//                   color: "white",
//                   marginRight: "10px",
//                   cursor: "pointer"
//                 }}
//               >
//                 Edit
//               </button>

//               <button
//                 style={{
//                   padding: "8px 14px",
//                   backgroundColor: "#dc2626",
//                   border: "none",
//                   borderRadius: "6px",
//                   color: "white",
//                   cursor: "pointer"
//                 }}
//               >
//                 Delete
//               </button>

//             </td>

//           </tr>

//           <tr>

//             <td>
//               <div>
//                 <strong>
//                   Rahul Mehta
//                 </strong>

//                 <br />

//                 <span
//                   style={{
//                     fontSize: "13px",
//                     color: "#9ca3af"
//                   }}
//                 >
//                   rahul@gmail.com
//                 </span>
//               </div>
//             </td>

//             <td>Mathematics</td>

//             <td>9988776655</td>

//             <td>
//               <span
//                 className="status-badge status-active"
//               >
//                 Active
//               </span>
//             </td>

//             <td>8 Years</td>

//             <td>

//               <button
//                 style={{
//                   padding: "8px 14px",
//                   backgroundColor: "#2563eb",
//                   border: "none",
//                   borderRadius: "6px",
//                   color: "white",
//                   marginRight: "10px",
//                   cursor: "pointer"
//                 }}
//               >
//                 Edit
//               </button>

//               <button
//                 style={{
//                   padding: "8px 14px",
//                   backgroundColor: "#dc2626",
//                   border: "none",
//                   borderRadius: "6px",
//                   color: "white",
//                   cursor: "pointer"
//                 }}
//               >
//                 Delete
//               </button>

//             </td>

//           </tr>

//           <tr>

//             <td>
//               <div>
//                 <strong>
//                   Priya Sharma
//                 </strong>

//                 <br />

//                 <span
//                   style={{
//                     fontSize: "13px",
//                     color: "#9ca3af"
//                   }}
//                 >
//                   priya@gmail.com
//                 </span>
//               </div>
//             </td>

//             <td>Computer Science</td>

//             <td>9123456780</td>

//             <td>
//               <span
//                 className="status-badge status-pending"
//               >
//                 Pending
//               </span>
//             </td>

//             <td>5 Years</td>

//             <td>

//               <button
//                 style={{
//                   padding: "8px 14px",
//                   backgroundColor: "#2563eb",
//                   border: "none",
//                   borderRadius: "6px",
//                   color: "white",
//                   marginRight: "10px",
//                   cursor: "pointer"
//                 }}
//               >
//                 Edit
//               </button>

//               <button
//                 style={{
//                   padding: "8px 14px",
//                   backgroundColor: "#dc2626",
//                   border: "none",
//                   borderRadius: "6px",
//                   color: "white",
//                   cursor: "pointer"
//                 }}
//               >
//                 Delete
//               </button>

//             </td>

//           </tr>

//         </tbody>

//       </table>

//     </div>

//   </div>

// )}

//       {/* COURSES */}

//       {/* COURSES */}

// {activePage === "courses" && (

//   <div className="card" style={{ padding: "30px" }}>

//     <h2 style={{ marginBottom: "25px" }}>
//       📚 Course Management
//     </h2>

//     <table className="activity-table">

//       <thead>

//         <tr>

//           <th>Course Name</th>

//           <th>Duration</th>

//           <th>Students</th>

//           <th>Faculty</th>

//           <th>Status</th>

//           <th>Action</th>

//         </tr>

//       </thead>

//       <tbody>

//         <tr>

//           <td>Computer Science</td>

//           <td>12 Months</td>

//           <td>420</td>

//           <td>Dr. Sharma</td>

//           <td>
//             <span className="status-badge status-active">
//               Active
//             </span>
//           </td>

//           <td>

//             <button
//               style={{
//                 padding: "8px 14px",
//                 marginRight: "10px",
//                 backgroundColor: "#2563eb",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "6px",
//                 cursor: "pointer"
//               }}
//             >
//               Edit
//             </button>

//             <button
//               style={{
//                 padding: "8px 14px",
//                 backgroundColor: "#dc2626",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "6px",
//                 cursor: "pointer"
//               }}
//             >
//               Delete
//             </button>

//           </td>

//         </tr>

//         <tr>

//           <td>Business Studies</td>

//           <td>10 Months</td>

//           <td>310</td>

//           <td>Mrs. Patel</td>

//           <td>
//             <span className="status-badge status-active">
//               Active
//             </span>
//           </td>

//           <td>

//             <button
//               style={{
//                 padding: "8px 14px",
//                 marginRight: "10px",
//                 backgroundColor: "#2563eb",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "6px",
//                 cursor: "pointer"
//               }}
//             >
//               Edit
//             </button>

//             <button
//               style={{
//                 padding: "8px 14px",
//                 backgroundColor: "#dc2626",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "6px",
//                 cursor: "pointer"
//               }}
//             >
//               Delete
//             </button>

//           </td>

//         </tr>

//         <tr>

//           <td>JEE Foundation</td>

//           <td>18 Months</td>

//           <td>520</td>

//           <td>Mr. Verma</td>

//           <td>
//             <span className="status-badge status-pending">
//               Pending
//             </span>
//           </td>

//           <td>

//             <button
//               style={{
//                 padding: "8px 14px",
//                 marginRight: "10px",
//                 backgroundColor: "#2563eb",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "6px",
//                 cursor: "pointer"
//               }}
//             >
//               Edit
//             </button>

//             <button
//               style={{
//                 padding: "8px 14px",
//                 backgroundColor: "#dc2626",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "6px",
//                 cursor: "pointer"
//               }}
//             >
//               Delete
//             </button>

//           </td>

//         </tr>

//       </tbody>

//     </table>

//   </div>

// )}
//       {/* TIMETABLE */}

//       {activePage === "timetable" && (

//         <div className="card" style={{ padding: "30px" }}>

//           <h2 style={{ marginBottom: "20px" }}>
//             📅 Timetable
//           </h2>

//           <p>09:00 AM - Physics</p>

//           <p>11:00 AM - Mathematics</p>

//           <p>01:00 PM - Chemistry</p>

//           <p>03:00 PM - English</p>

//         </div>

//       )}

//       {/* EXAMS */}

//       {activePage === "exams" && (

//         <div className="card" style={{ padding: "30px" }}>

//           <h2 style={{ marginBottom: "20px" }}>
//             📝 Exams
//           </h2>

//           <p>Mid Term Exam - 12 June</p>

//           <p>Physics Practical - 15 June</p>

//           <p>Final Semester - 25 June</p>

//         </div>

//       )}

//       {/* FINANCE */}

//       {activePage === "finance" && (

//         <div className="card" style={{ padding: "30px" }}>

//           <h2 style={{ marginBottom: "20px" }}>
//             💰 Fees & Billing
//           </h2>

//           <p>Total Revenue: ₹42.6L</p>

//           <p>Pending Fees: ₹3.2L</p>

//           <p>Scholarships Given: ₹5L</p>

//         </div>

//       )}

//       {/* REPORTS */}

//       {activePage === "reports" && (

//         <div className="card" style={{ padding: "30px" }}>

//           <h2 style={{ marginBottom: "20px" }}>
//             📈 Reports
//           </h2>

//           <p>Attendance Report</p>

//           <p>Performance Report</p>

//           <p>Fee Collection Report</p>

//         </div>

//       )}

//     </DashboardLayout>

//   )
// }

// function StudentDashboard() {
//   const cards = [
//     { icon: "📚", val: "6", label: "Enrolled Courses", change: "2 in progress" },
//     { icon: "✅", val: "84%", label: "Attendance", change: "↑ 3% this month" },
//     { icon: "🏆", val: "A+", label: "Last Grade", change: "Physics Quarterly" },
//     { icon: "📝", val: "3", label: "Upcoming Tests", change: "Next: Tomorrow" },
//   ]
//   const schedule = [
//     { time: "9:00 AM", subject: "Physics", teacher: "Dr. S. Patel", room: "Lab 2" },
//     { time: "11:00 AM", subject: "Mathematics", teacher: "Mrs. R. Gupta", room: "Room 14" },
//     { time: "2:00 PM", subject: "Chemistry", teacher: "Mr. A. Khan", room: "Lab 1" },
//     { time: "4:00 PM", subject: "English", teacher: "Ms. P. Joshi", room: "Room 8" },
//   ]
//   const sideLinks = [
//     { label: "Main", links: [{ icon: "🏠", name: "Dashboard" }, { icon: "📚", name: "My Courses" }, { icon: "📅", name: "Schedule" }] },
//     { label: "Progress", links: [{ icon: "📊", name: "Grades" }, { icon: "✅", name: "Attendance" }, { icon: "📝", name: "Assignments" }] },
//   ]

//   return (
//     <DashboardLayout role="Student" sideLinks={sideLinks}>
//       <div className="dashboard-greeting fade-up">
//         <div className="greeting-sub">Hello, Scholar</div>
//         <div className="greeting-name" style={{ color: "var(--cream)" }}>
//           Welcome back, <em style={{ color: "#60a5fa" }}>Aarav Kumar</em> 🎓
//         </div>
//       </div>
//       <div className="stat-cards">
//         {cards.map((c, i) => (
//           <div key={i} className={`card stat-card fade-up delay-${i + 1}`}>
//             <div className="stat-card-icon">{c.icon}</div>
//             <div className="stat-card-val" style={{ fontSize: 28 }}>{c.val}</div>
//             <div className="stat-card-label">{c.label}</div>
//             <div className="stat-card-change">{c.change}</div>
//           </div>
//         ))}
//       </div>
//       <div className="card fade-up delay-3" style={{ padding: "28px", overflowX: "auto" }}>
//         <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, color: "var(--cream)", marginBottom: 4 }}>Today's Schedule</div>
//         <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16 }}>Wednesday, {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</div>
//         <table className="activity-table">
//           <thead><tr><th>Time</th><th>Subject</th><th>Teacher</th><th>Room</th></tr></thead>
//           <tbody>
//             {schedule.map((r, i) => (
//               <tr key={i}>
//                 <td><span className="status-badge status-active">{r.time}</span></td>
//                 <td style={{ color: "var(--cream)" }}>{r.subject}</td>
//                 <td>{r.teacher}</td>
//                 <td>{r.room}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </DashboardLayout>
//   )
// }

// function TeacherDashboard() {
//   const cards = [
//     { icon: "👨‍🎓", val: "128", label: "My Students", change: "Across 4 batches" },
//     { icon: "📚", val: "4", label: "Subjects", change: "This semester" },
//     { icon: "📝", val: "12", label: "Pending Reviews", change: "Assignments to grade" },
//     { icon: "⭐", val: "4.8", label: "Student Rating", change: "From 340 reviews" },
//   ]
//   const pending = [
//     { student: "Priya Singh", subject: "Physics", task: "Chapter 7 Assignment", due: "Today" },
//     { student: "Rohan Verma", subject: "Physics", task: "Lab Report", due: "Tomorrow" },
//     { student: "Sneha Patel", subject: "Mathematics", task: "Problem Set 4", due: "2 days" },
//     { student: "Aditya Rao", subject: "Chemistry", task: "Practical Notes", due: "3 days" },
//   ]
//   const sideLinks = [
//     { label: "Main", links: [{ icon: "🏠", name: "Dashboard" }, { icon: "👨‍🎓", name: "My Students" }, { icon: "📅", name: "Schedule" }] },
//     { label: "Academic", links: [{ icon: "📝", name: "Assignments" }, { icon: "📊", name: "Grade Book" }, { icon: "📋", name: "Attendance" }] },
//   ]

//   return (
//     <DashboardLayout role="Teacher" sideLinks={sideLinks}>
//       <div className="dashboard-greeting fade-up">
//         <div className="greeting-sub">Good morning, Educator</div>
//         <div className="greeting-name" style={{ color: "var(--cream)" }}>
//           Welcome, <em style={{ color: "#a78bfa" }}>Dr. Sunita Patel</em> 📖
//         </div>
//       </div>
//       <div className="stat-cards">
//         {cards.map((c, i) => (
//           <div key={i} className={`card stat-card fade-up delay-${i + 1}`}>
//             <div className="stat-card-icon">{c.icon}</div>
//             <div className="stat-card-val" style={{ fontSize: 28 }}>{c.val}</div>
//             <div className="stat-card-label">{c.label}</div>
//             <div className="stat-card-change">{c.change}</div>
//           </div>
//         ))}
//       </div>
//       <div className="card fade-up delay-3" style={{ padding: "28px", overflowX: "auto" }}>
//         <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 20, color: "var(--cream)", marginBottom: 4 }}>Pending Reviews</div>
//         <div style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 16 }}>Submissions awaiting your feedback</div>
//         <table className="activity-table">
//           <thead><tr><th>Student</th><th>Subject</th><th>Task</th><th>Due</th></tr></thead>
//           <tbody>
//             {pending.map((r, i) => (
//               <tr key={i}>
//                 <td style={{ color: "var(--cream)" }}>{r.student}</td>
//                 <td>{r.subject}</td>
//                 <td>{r.task}</td>
//                 <td><span className={`status-badge ${r.due === "Today" ? "status-pending" : "status-active"}`}>{r.due}</span></td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </DashboardLayout>
//   )
// }

// /* ─── App ──────────────────────────────────────────────────── */
// export default function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/admin-dashboard" element={<AdminDashboard />} />
//         <Route path="/student-dashboard" element={<StudentDashboard />} />
//         <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
//         <Route path="/courses" element={<Courses />} />
//         <Route path="/services" element={<Services />} />
//         <Route path="/gallery" element={<Gallery />} />
//         <Route path="/contact" element={<Contact />} />
//       </Routes>
//     </BrowserRouter>
//   )
// }
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Login from "./pages/Login";

import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";


import "./styles/global.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/about"
          element={<About />}
        />

        <Route
          path="/courses"
          element={<Courses />}
        />

        <Route
          path="/services"
          element={<Services />}
        />

        <Route
          path="/gallery"
          element={<Gallery />}
        />

        <Route
          path="/contact"
          element={<Contact />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />

        <Route
          path="/student-dashboard"
          element={<StudentDashboard />}
        />
        <Route
          path="/teacher-dashboard"
            element={<TeacherDashboard />}
            />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;