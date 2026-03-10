const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'ClimaTech.jsx');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. --- CSS Variables and FontStyle ---
const newFontStyle = `const FontStyle = () => (
  <style>{\`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=Figtree:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      background: var(--bg);
      color: var(--text);
      font-family: 'Figtree', sans-serif;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E");
    }

    :root {
      --bg: #F9F7F1;
      --surface: #FFFFFF;
      --surface2: #F0EDE4;
      --card: #FFFFFF;
      --border: #E2DFD3;
      --border-accent: rgba(26, 67, 49, 0.15);
      --green: #1A4331;        /* Deep Forest */
      --green-dim: #2D5A46;
      --green-glow: rgba(26, 67, 49, 0.1);
      --cyan: #0F4C5C;         /* Ocean Deep */
      --amber: #F0A202;        /* Sunglow */
      --red: #D95D39;          /* Terracotta */
      --purple: #6B4E71;       /* Heather */
      --text: #1C2321;
      --text-sec: #59615D;
      --text-muted: #8F9793;
    }

    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }

    @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-4px); } }
    @keyframes fade-up { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes pulse-dot { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.6; transform: scale(0.85); } }

    /* The new organic component design */
    .glass {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 24px 8px 24px 8px; /* Organic/asymmetrical outline */
      box-shadow: 0 12px 32px -12px rgba(28, 35, 33, 0.05), 0 4px 12px -4px rgba(28, 35, 33, 0.02);
    }
    .glass-hover { transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1); }
    .glass-hover:hover {
      border-color: var(--border-accent);
      box-shadow: 0 20px 40px -12px rgba(26, 67, 49, 0.1);
      transform: translateY(-3px) scale(1.005);
      border-radius: 8px 24px 8px 24px;
    }
    
    .btn-primary {
      background: var(--green);
      color: #F9F7F1;
      font-weight: 500;
      border: none;
      padding: 14px 28px;
      border-radius: 12px 4px 12px 4px;
      cursor: pointer;
      font-family: 'Figtree', sans-serif;
      font-size: 15px;
      transition: all 0.3s ease;
      letter-spacing: 0.02em;
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      background: var(--green-dim);
      border-radius: 4px 12px 4px 12px;
      box-shadow: 0 8px 20px rgba(26, 67, 49, 0.15);
    }
    .btn-ghost {
      background: transparent;
      color: var(--green);
      border: 1px solid var(--green-glow);
      padding: 14px 28px;
      border-radius: 12px 4px 12px 4px;
      cursor: pointer;
      font-family: 'Figtree', sans-serif;
      font-size: 15px;
      font-weight: 500;
      transition: all 0.3s ease;
    }
    .btn-ghost:hover {
       background: rgba(26, 67, 49, 0.04);
       border-color: var(--green);
       border-radius: 4px 12px 4px 12px;
    }

    .stat-num { font-family: 'Fraunces', serif; font-size: 2.2rem; font-weight: 400; color: var(--green); letter-spacing: -0.01em; }
    .mono { font-family: 'JetBrains Mono', monospace; }
    .display { font-family: 'Fraunces', serif; font-weight: 400; letter-spacing: -0.01em; }
    .label { font-family: 'Figtree', sans-serif; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.12em; color: var(--text-sec); }
    
    /* Rid of the scan line for the organic theme */
    .scan-line { display: none; }
  \`}</style>
);`;

const oldStartStr = 'const FontStyle = () => (';
const oldEndStr = '</style>\n);';
const startIdx = content.indexOf(oldStartStr);
if (startIdx !== -1) {
  const endIdx = content.indexOf(oldEndStr, startIdx);
  if (endIdx !== -1) {
    const fullBlockStr = content.substring(startIdx, endIdx + oldEndStr.length);
    content = content.replace(fullBlockStr, newFontStyle);
  }
}

// 2. --- Replace ParticleCanvas with WatercolorCanvas ---
// This regex specifically targets the function ParticleCanvas and the closing brace.
const watercolorCode = `function ParticleCanvas() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div style={{
        position: "absolute", top: "-10%", left: "-10%", width: "50vw", height: "50vw",
        background: "radial-gradient(circle, rgba(217,93,57,0.08) 0%, rgba(217,93,57,0) 70%)",
        filter: "blur(60px)", animation: "float 14s ease-in-out infinite alternate"
      }} />
      <div style={{
        position: "absolute", bottom: "-10%", right: "-10%", width: "60vw", height: "60vw",
        background: "radial-gradient(circle, rgba(15,76,92,0.06) 0%, rgba(15,76,92,0) 70%)",
        filter: "blur(80px)", animation: "float 18s ease-in-out infinite alternate-reverse"
      }} />
      <div style={{
        position: "absolute", top: "40%", left: "30%", width: "40vw", height: "40vw",
        background: "radial-gradient(circle, rgba(240,162,2,0.05) 0%, rgba(240,162,2,0) 70%)",
        filter: "blur(70px)", animation: "float 22s ease-in-out infinite alternate"
      }} />
    </div>
  );
}`;

content = content.replace(/function ParticleCanvas.*?return \((?:[^`]*?)\);\n\}/s, watercolorCode);

// 3. --- Color Resets for Light Mode / Organic overrides ---
// Revert dark mode inline styles and typography classes
content = content.replace(/"white"/g, '"var(--text)"');
content = content.replace(/color: "white"/g, 'color: "var(--text)"');
content = content.replace(/#ffffff/g, 'var(--text)');
content = content.replace(/rgba\(13,26,18,[\d.]+\)/g, 'var(--surface)');
content = content.replace(/rgba\(0,255,135,[\d.]+\)/g, 'rgba(26, 67, 49, 0.08)');
content = content.replace(/rgba\(0,194,255,[\d.]+\)/g, 'rgba(15,76,92,0.08)');
content = content.replace(/rgba\(255,182,39,[\d.]+\)/g, 'rgba(240,162,2,0.08)');
content = content.replace(/fontFamily:\s*"DM Sans"/g, 'fontFamily: "Figtree"');
content = content.replace(/fontFamily:\s*"Space Grotesk"/g, 'fontFamily: "Fraunces"');
content = content.replace(/fontFamily:\s*"Outfit"/g, 'fontFamily: "Fraunces"');
content = content.replace(/fontFamily:\s*"Inter"/g, 'fontFamily: "Figtree"');

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Botanical structural refactor complete!');
