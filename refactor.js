const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'ClimaTech.jsx');
let content = fs.readFileSync(filePath, 'utf-8');

// Replace the FontStyle block completely with the new refined theme
const newFontStyle = `const FontStyle = () => (
  <style>{\`
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      background: var(--bg);
      color: var(--text);
      font-family: 'Inter', sans-serif;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }

    :root {
      --bg: #0B1120;
      --surface: #111827;
      --surface2: #1F2937;
      --card: #111827;
      --border: #374151;
      --border-accent: rgba(16, 185, 129, 0.3);
      --green: #10B981;
      --green-dim: #059669;
      --green-glow: rgba(16, 185, 129, 0.15);
      --cyan: #0EA5E9;
      --amber: #F59E0B;
      --red: #EF4444;
      --purple: #8B5CF6;
      --text: #F3F4F6;
      --text-sec: #9CA3AF;
      --text-muted: #6B7280;
    }

    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }
    ::-webkit-scrollbar-thumb:hover { background: #4B5563; }

    @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
    @keyframes glow-pulse { 0%,100% { box-shadow: 0 0 15px rgba(16, 185, 129, 0.2); } 50% { box-shadow: 0 0 30px rgba(16, 185, 129, 0.4); } }
    @keyframes scan { 0% { top: -2px; } 100% { top: 100%; } }
    @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
    @keyframes count-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes fade-up { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes slide-right { from { width: 0; } to { width: 100%; } }
    @keyframes pulse-dot { 0%,100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.6; transform: scale(0.8); } }
    @keyframes typing { 0%,100% { opacity: 1; } 50% { opacity: 0; } }

    .glass {
      background: rgba(17, 24, 39, 0.7);
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: 1px solid var(--border);
      border-radius: 16px;
      box-shadow: 0 4px 24px -1px rgba(0, 0, 0, 0.2);
    }
    .glass-hover { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
    .glass-hover:hover {
      border-color: var(--border-accent);
      box-shadow: 0 10px 30px -5px rgba(16, 185, 129, 0.1);
      transform: translateY(-2px);
    }
    .btn-primary {
      background: var(--green);
      color: #ffffff;
      font-weight: 600;
      border: none;
      padding: 12px 24px;
      border-radius: 10px;
      cursor: pointer;
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      transition: all 0.2s ease;
      box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
    }
    .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 16px rgba(16, 185, 129, 0.4); background: #34D399; }
    .btn-ghost {
      background: transparent;
      color: var(--text);
      border: 1px solid var(--border);
      padding: 12px 24px;
      border-radius: 10px;
      cursor: pointer;
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      transition: all 0.2s ease;
    }
    .btn-ghost:hover { background: rgba(255,255,255,0.05); border-color: var(--text-sec); }
    .stat-num { font-family: 'Outfit', sans-serif; font-size: 2.2rem; font-weight: 700; color: var(--green); letter-spacing: -0.02em; }
    .mono { font-family: 'JetBrains Mono', monospace; }
    .display { font-family: 'Outfit', sans-serif; letter-spacing: -0.01em; }
    .label { font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-sec); }
    .scan-line { position: absolute; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.4), transparent); animation: scan 3s linear infinite; pointer-events: none; }
  \`}</style>
);`;

// Replace FontStyle block
content = content.replace(/const FontStyle = \(\) => \([\s\S]*?<\//style>[\s\S]*?\);\n/g, newFontStyle + '\n');

// Standardizing fonts
content = content.replace(/Space Grotesk/g, 'Outfit');
content = content.replace(/DM Sans/g, 'Inter');

// Exact Hex Colors Refactoring to Variables
const replacements = [
  { search: /#00ff87/g, replace: 'var(--green)' },
  { search: /#00c2ff/g, replace: 'var(--cyan)' },
  { search: /#ffb627/g, replace: 'var(--amber)' },
  { search: /#ff4d6d/g, replace: 'var(--red)' },
  { search: /#b57bff/g, replace: 'var(--purple)' },
  { search: /#050a07/g, replace: 'var(--bg)' },
  { search: /#0d1a12/g, replace: 'var(--surface)' },
  { search: /#111f16/g, replace: 'var(--surface2)' },
  { search: /#1a2e1f/g, replace: 'var(--border)' },
  { search: /#c8e6d0/g, replace: 'var(--text)' },
  { search: /#6b9e7a/g, replace: 'var(--text-sec)' },
  { search: /#2e4d38/g, replace: 'var(--text-muted)' },
  // specific colors mapped to variables to fit new theme
  { search: /#3F7E44/g, replace: 'var(--green)' },
  { search: /#FCC30B/g, replace: 'var(--amber)' },
  { search: /#19486A/g, replace: 'var(--cyan)' },
  // Gradients inside string interpolation should use var
  { search: /rgba\(0,255,135/g, replace: 'rgba(16,185,129' },
  { search: /rgba\(0,194,255/g, replace: 'rgba(14,165,233' },
  { search: /rgba\(255,182,39/g, replace: 'rgba(245,158,11' },
  { search: /rgba\(181,123,255/g, replace: 'rgba(139,92,246' },
  { search: /rgba\(255,77,109/g, replace: 'rgba(239,68,68' },
  { search: /rgba\(5,10,7/g, replace: 'rgba(11,17,32' },
  { search: /rgba\(13,26,18/g, replace: 'rgba(17,24,39' },
];

replacements.forEach(({ search, replace }) => {
  content = content.replace(search, replace);
});

// Since some gradients previously mapped inline to hex we'll clean them up.
// Example: "linear-gradient(135deg, #00ff87, #00c2ff)" became "linear-gradient(135deg, var(--green), var(--cyan))" which is perfectly valid syntax in modern browsers.

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Refactor complete!');
