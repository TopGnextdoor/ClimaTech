import { useState, useEffect, useRef, useCallback } from "react";



import {
  Zap, Shield, MessageSquare, Leaf, TrendingUp, Globe,
  ChevronDown, ArrowUpRight, ArrowRight, Star, Users,
  BarChart2, Activity, DollarSign, Target, Search,
  Bell, Settings, LogOut, Menu, X, Upload, Send,
  CheckCircle, AlertTriangle, Info, Play, Eye,
  Layers, Wind, Sun, Cpu, Droplets, Trees, Car,
  FileText, ChevronRight, Filter, Award, Briefcase
} from "lucide-react";
import {
  RadialBarChart, RadialBar, BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie,
  Cell, CartesianGrid
} from "recharts";

// ─── Font Import ──────────────────────────────────────────────────────────────
const FontStyle = () => (
  <style>{`
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
  `}</style>
);

// ─── Particle Canvas ──────────────────────────────────────────────────────────
function ParticleCanvas() {
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
}

// ─── Animated Count Up ────────────────────────────────────────────────────────
function CountUp({ end, suffix = "", prefix = "", duration = 1800 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const start = Date.now();
      const tick = () => {
        const t = Math.min(1, (Date.now() - start) / duration);
        const ease = 1 - Math.pow(1 - t, 4);
        setVal(Math.floor(ease * end));
        if (t < 1) requestAnimationFrame(tick);
      };
      tick();
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, duration]);
  return <span ref={ref}>{prefix}{val.toLocaleString()}{suffix}</span>;
}

// ─── Progress Ring ────────────────────────────────────────────────────────────
function ProgressRing({ value = 0, size = 120, stroke = 10, color = "var(--green)", label, sublabel, animate = true }) {
  const [displayed, setDisplayed] = useState(animate ? 0 : value);
  useEffect(() => {
    if (!animate) return;
    const t = setTimeout(() => {
      let cur = 0;
      const step = () => {
        cur = Math.min(value, cur + value / 40);
        setDisplayed(cur);
        if (cur < value) requestAnimationFrame(step);
      };
      step();
    }, 300);
    return () => clearTimeout(t);
  }, [value, animate]);

  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const dash = circ * (displayed / 100);

  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <defs>
          <filter id={`glow-${color.replace("#","")}`}>
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
          filter={`url(#glow-${color.replace("#","")})`}
          style={{ transition: "stroke-dasharray 0.1s" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 2 }}>
        <span className="mono" style={{ fontSize: size > 100 ? "1.4rem" : "0.85rem", fontWeight: 700, color }}>{Math.round(displayed)}</span>
        {label && <span style={{ fontSize: "9px", color: "var(--text-sec)", textAlign: "center", fontFamily: "JetBrains Mono", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</span>}
        {sublabel && <span style={{ fontSize: "8px", color: "var(--text-muted)", textAlign: "center" }}>{sublabel}</span>}
      </div>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({ label, value, change, changeUp = true, icon: Icon, color = "var(--green)", delay = 0 }) {
  return (
    <div className="glass glass-hover" style={{ padding: "20px", animation: `fade-up 0.5s ease ${delay}s both`, position: "relative", overflow: "hidden" }}>
      <div className="scan-line" />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <span className="label">{label}</span>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {Icon && <Icon size={16} color={color} />}
        </div>
      </div>
      <div className="stat-num" style={{ color, fontSize: "1.8rem" }}>{value}</div>
      {change && (
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 6 }}>
          <ArrowUpRight size={12} color={changeUp ? "var(--green)" : "var(--red)"} style={{ transform: changeUp ? "none" : "rotate(90deg)" }} />
          <span style={{ fontSize: "11px", color: changeUp ? "var(--green)" : "var(--red)", fontFamily: "JetBrains Mono" }}>{change}</span>
          <span style={{ fontSize: "11px", color: "var(--text-sec)" }}>vs last month</span>
        </div>
      )}
    </div>
  );
}

// ─── Badge ────────────────────────────────────────────────────────────────────
function Badge({ children, color = "var(--green)", bg }) {
  return (
    <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: "10px", fontFamily: "JetBrains Mono", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color, background: bg || `${color}18`, border: `1px solid ${color}30` }}>
      {children}
    </span>
  );
}

// ─── Floating Dock Navigation ───────────────────────────────────────────────────────────────
function FloatingDock({ page, setPage }) {
  if (page === "landing" || page === "login" || page === "register") return null;
  return (
    <div style={{
      position: "fixed", bottom: 32, left: "50%", transform: "translateX(-50%)", zIndex: 9999,
      display: "flex", alignItems: "center", gap: 8, padding: "12px 24px",
      background: "rgba(255,255,255,0.75)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
      border: "1px solid var(--border)", borderRadius: "32px",
      boxShadow: "0 20px 40px -10px rgba(28, 35, 33, 0.1), 0 8px 16px -4px rgba(28, 35, 33, 0.05)"
    }}>
      <div style={{ display: "flex", gap: 12 }}>
        <button className="btn-ghost" style={{ padding: "10px 16px", background: page === "startup" ? "var(--border-accent)" : "transparent", borderColor: page === "startup" ? "var(--green)" : "transparent", fontSize: "14px", borderRadius: "20px" }} onClick={() => setPage("startup")}>Startup</button>
        <button className="btn-ghost" style={{ padding: "10px 16px", background: page === "investor" ? "rgba(15,76,92,0.1)" : "transparent", borderColor: page === "investor" ? "var(--cyan)" : "transparent", fontSize: "14px", borderRadius: "20px", color: page === "investor" ? "var(--cyan)" : "var(--text)" }} onClick={() => setPage("investor")}>Investor</button>
        <button className="btn-ghost" style={{ padding: "10px 16px", background: page === "dd" ? "rgba(240,162,2,0.1)" : "transparent", borderColor: page === "dd" ? "var(--amber)" : "transparent", fontSize: "14px", borderRadius: "20px", color: page === "dd" ? "var(--amber)" : "var(--text)" }} onClick={() => setPage("dd")}>Due Diligence</button>
      </div>
      <div style={{ width: 1, height: 24, background: "var(--border)", margin: "0 8px" }} />
      <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--green-glow)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", border: "1px solid var(--border-accent)" }}>
        <Bell size={18} color="var(--green)" />
      </div>
      <div style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--text)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", marginLeft: 4 }} onClick={() => setPage("landing")}>
        <LogOut size={14} color="var(--bg)" />
      </div>
    </div>
  );
}

// ─── LANDING PAGE ─────────────────────────────────────────────────────────────
function Landing({ setPage }) {
  const features = [
    { icon: Zap, title: "AI Matchmaking", desc: "sentence-transformers + FAISS finds your perfect capital partner from 200+ investors in seconds.", tag: "Most Used", color: "var(--green)" },
    { icon: Shield, title: "Risk Intelligence", desc: "XGBoost model scores 80+ factors. SHAP explainability shows exactly why your score is what it is.", color: "var(--cyan)" },
    { icon: MessageSquare, title: "Document Q&A", desc: "Upload pitch deck. Ask any question. Mistral 7B answers from your actual document pages.", color: "var(--amber)" },
  ];

  return (
    <div style={{ display: "flex", width: "100%", height: "100vh", overflow: "hidden" }}>
      {/* Left Pane (Fixed) */}
      <div style={{ flex: 1, position: "relative", background: "var(--bg)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "60px", borderRight: "1px solid var(--border)" }}>
        <ParticleCanvas />
        <div style={{ position: "absolute", top: 40, left: 40, display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 12, height: 12, borderRadius: "4px 8px", background: "var(--green)", animation: "float 4s ease infinite" }} />
          <span className="display" style={{ fontSize: "1.4rem", fontWeight: 700, color: "var(--green)" }}>ClimaTech</span>
        </div>
        
        <div style={{ position: "relative", zIndex: 1, maxWidth: 600 }}>
          <div className="label" style={{ marginBottom: 24, padding: "8px 16px", background: "var(--green-glow)", border: "1px solid var(--border-accent)", borderRadius: "20px", display: "inline-block", color: "var(--green)" }}>
            🌍 UNITED NATIONS SDG INITIATIVE
          </div>
          <h1 className="display" style={{ fontSize: "clamp(3.5rem, 6vw, 5.5rem)", color: "var(--text)", lineHeight: 0.95, marginBottom: 32 }}>
            Fund the Future<br />
            <span style={{ color: "var(--green)", fontStyle: "italic" }}>of Our Planet.</span>
          </h1>
          <p style={{ fontSize: "1.2rem", color: "var(--text-sec)", lineHeight: 1.6, maxWidth: 480, fontFamily: "Figtree" }}>
            AI-powered climate tech matchmaking, risk assessment, and due diligence. Built for investors and innovators accelerating net zero.
          </p>
        </div>
      </div>

      {/* Right Pane (Scrollable) */}
      <div style={{ flex: 1, overflowY: "auto", background: "var(--surface)", position: "relative", padding: "80px 60px" }}>
        
        {/* Nav on top right */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, marginBottom: 80 }}>
          <button className="btn-ghost" onClick={() => setPage("login")}>Sign In</button>
          <button className="btn-primary" onClick={() => setPage("register")}>List Your Startup →</button>
        </div>

        {/* Floating Mockup / Stats in Reading Pane */}
        <div className="glass glass-hover" style={{ padding: "32px", marginBottom: 60 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <div>
              <div className="label" style={{ marginBottom: 8 }}>PLATFORM VELOCITY</div>
              <h2 className="display" style={{ fontSize: "2rem", color: "var(--text)" }}>$8,200M+ Tracked</h2>
            </div>
            <ProgressRing value={82} size={80} color="var(--amber)" label="SDG" />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
             <div style={{ background: "var(--bg)", padding: "16px", borderRadius: "12px 4px 12px 4px" }}>
                <div className="mono" style={{ fontSize: "1.4rem", color: "var(--green)", fontWeight: 500 }}>2,400+</div>
                <div className="label" style={{ fontSize: "9px" }}>Climate Startups</div>
             </div>
             <div style={{ background: "var(--bg)", padding: "16px", borderRadius: "12px 4px 12px 4px" }}>
                <div className="mono" style={{ fontSize: "1.4rem", color: "var(--cyan)", fontWeight: 500 }}>94%</div>
                <div className="label" style={{ fontSize: "9px" }}>Match Accuracy</div>
             </div>
          </div>
        </div>

        {/* Features Narrative */}
        <div style={{ marginBottom: 60 }}>
          <div className="label" style={{ marginBottom: 16 }}>Core Infrastructure</div>
          <h2 className="display" style={{ fontSize: "2.4rem", color: "var(--text)", marginBottom: 32 }}>Built for Scale</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {features.map((f, i) => (
              <div key={i} style={{ display: "flex", gap: 24, alignItems: "flex-start", paddingBottom: 24, borderBottom: i < 2 ? "1px solid var(--border)" : "none" }}>
                <div style={{ width: 56, height: 56, borderRadius: "16px 4px 16px 4px", background: `${f.color}15`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <f.icon size={24} color={f.color} />
                </div>
                <div>
                  <h3 className="display" style={{ fontSize: "1.4rem", color: "var(--text)", marginBottom: 8 }}>{f.title}</h3>
                  <p style={{ color: "var(--text-sec)", fontSize: "14px", lineHeight: 1.6 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div style={{ padding: "40px", background: "var(--bg)", borderRadius: "24px 8px 24px 8px", border: "1px solid var(--border)", textAlign: "center" }}>
          <h2 className="display" style={{ fontSize: "2rem", marginBottom: 16 }}>Ready to Accelerate?</h2>
          <button className="btn-primary" style={{ fontSize: "16px", padding: "16px 36px" }} onClick={() => setPage("register")}>Join the Network</button>
        </div>

      </div>
    </div>
  );
}

// ─── AUTH PAGES ───────────────────────────────────────────────────────────────
function AuthPage({ mode, setPage }) {
  const [role, setRole] = useState("");
  const [step, setStep] = useState(mode === "register" ? 1 : 0);
  const [form, setForm] = useState({ email: "", password: "", name: "", org: "" });
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setPage(role === "investor" ? "investor" : "startup"); }, 1200);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 24px", zIndex: 1, position: "relative" }}>
      <div style={{ width: "100%", maxWidth: 420, animation: "fade-up 0.5s ease both" }}>
        <div className="glass" style={{ padding: "36px 32px", borderColor: "rgba(16,185,129,0.15)" }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--text)", fontFamily: "Fraunces" }}>
              {mode === "login" ? "Welcome back" : step === 1 ? "Choose your role" : step === 2 ? "Create account" : "You're all set"}
            </div>
            <p style={{ color: "var(--text-sec)", fontSize: "13px", marginTop: 6 }}>
              {mode === "login" ? "Sign in to your ClimaTech account" : `Step ${step} of 3`}
            </p>
          </div>

          {mode === "register" && (
            <div style={{ display: "flex", gap: 8, marginBottom: 24 }}>
              {[1,2,3].map(n => (
                <div key={n} style={{ flex: 1, height: 3, borderRadius: 2, background: n <= step ? "var(--green)" : "var(--border)", transition: "background 0.3s" }} />
              ))}
            </div>
          )}

          {(mode === "login" || step === 2) && (
            <>
              {step === 2 && (
                <>
                  <div style={{ marginBottom: 14 }}>
                    <label className="label" style={{ display: "block", marginBottom: 6 }}>Full Name</label>
                    <input value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Alex Johnson" style={{ width: "100%", background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 14px", color: "var(--text)", fontFamily: "Figtree", fontSize: "14px", outline: "none" }} />
                  </div>
                  <div style={{ marginBottom: 14 }}>
                    <label className="label" style={{ display: "block", marginBottom: 6 }}>Organization</label>
                    <input value={form.org} onChange={e => setForm({...form, org: e.target.value})} placeholder="SolarGrid Innovations Ltd." style={{ width: "100%", background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 14px", color: "var(--text)", fontFamily: "Figtree", fontSize: "14px", outline: "none" }} />
                  </div>
                </>
              )}
              <div style={{ marginBottom: 14 }}>
                <label className="label" style={{ display: "block", marginBottom: 6 }}>Email Address</label>
                <input value={form.email} onChange={e => setForm({...form, email: e.target.value})} placeholder="you@climatetech.io" type="email" style={{ width: "100%", background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 14px", color: "var(--text)", fontFamily: "Figtree", fontSize: "14px", outline: "none" }} />
              </div>
              <div style={{ marginBottom: 24, position: "relative" }}>
                <label className="label" style={{ display: "block", marginBottom: 6 }}>Password</label>
                <input value={form.password} onChange={e => setForm({...form, password: e.target.value})} placeholder="••••••••" type={showPass ? "text" : "password"} style={{ width: "100%", background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 14px", color: "var(--text)", fontFamily: "Figtree", fontSize: "14px", outline: "none", paddingRight: 44 }} />
                <button onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: 12, top: "62%", transform: "translateY(-50%)", background: "none", border: "none", color: "var(--text-sec)", cursor: "pointer" }}>
                  <Eye size={14} />
                </button>
              </div>
              <button className="btn-primary" style={{ width: "100%", padding: "13px", fontSize: "15px" }} onClick={mode === "login" ? handleSubmit : () => setStep(3)} disabled={loading}>
                {loading ? "Signing in..." : mode === "login" ? "Sign In" : "Continue"}
              </button>
            </>
          )}

          {mode === "register" && step === 1 && (
            <>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
                {[
                  { r: "startup", icon: "🚀", title: "I'm a Climate Startup", desc: "List your project, get matched with investors, track funding.", color: "var(--green)" },
                  { r: "investor", icon: "📈", title: "I'm an Investor", desc: "Discover vetted climate projects, AI due diligence, manage portfolio.", color: "var(--cyan)" }
                ].map(o => (
                  <div key={o.r} onClick={() => setRole(o.r)} style={{ padding: "16px 18px", borderRadius: 12, border: `1.5px solid ${role === o.r ? o.color : "var(--border)"}`, background: role === o.r ? `${o.color}08` : "var(--surface2)", cursor: "pointer", transition: "all 0.2s", opacity: role && role !== o.r ? 0.5 : 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: "1.5rem" }}>{o.icon}</span>
                      <div>
                        <div style={{ fontWeight: 600, color: role === o.r ? o.color : "var(--text)", fontSize: "14px" }}>{o.title}</div>
                        <div style={{ fontSize: "12px", color: "var(--text-sec)", marginTop: 3 }}>{o.desc}</div>
                      </div>
                      {role === o.r && <CheckCircle size={16} color={o.color} style={{ marginLeft: "auto", flexShrink: 0 }} />}
                    </div>
                  </div>
                ))}
              </div>
              <button className="btn-primary" style={{ width: "100%", padding: "13px" }} onClick={() => role && setStep(2)} disabled={!role}>
                Continue →
              </button>
            </>
          )}

          {mode === "register" && step === 3 && (
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(16,185,129,0.1)", border: "2px solid var(--green)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                <CheckCircle size={28} color="var(--green)" />
              </div>
              <p style={{ color: "var(--text-sec)", marginBottom: 24, fontSize: "14px" }}>
                Creating your <strong style={{ color: "var(--text)" }}>{role}</strong> account for <strong style={{ color: "var(--text)" }}>{form.org || "your organization"}</strong>.
              </p>
              <button className="btn-primary" style={{ width: "100%", padding: "13px" }} onClick={handleSubmit} disabled={loading}>
                {loading ? "Creating account..." : "Launch Dashboard 🚀"}
              </button>
            </div>
          )}

          <div style={{ marginTop: 20, textAlign: "center" }}>
            {mode === "login" ? (
              <span style={{ fontSize: "13px", color: "var(--text-sec)" }}>No account? <span style={{ color: "var(--green)", cursor: "pointer" }} onClick={() => setPage("register")}>Sign up free</span></span>
            ) : (
              <span style={{ fontSize: "13px", color: "var(--text-sec)" }}>Already registered? <span style={{ color: "var(--green)", cursor: "pointer" }} onClick={() => setPage("login")}>Sign in</span></span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── STARTUP DASHBOARD ────────────────────────────────────────────────────────
function StartupDashboard() {
  const riskData = [
    { name: "TRL Level", impact: 0.31, dir: 1 }, { name: "Runway", impact: -0.18, dir: -1 },
    { name: "Team Size", impact: 0.14, dir: 1 }, { name: "Burn Rate", impact: 0.22, dir: 1 },
  ];

  return (
    <div style={{ padding: "60px 24px 120px", minHeight: "100vh", position: "relative", maxWidth: 1400, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, animation: "fade-up 0.5s ease both" }}>
        <div>
          <div className="label" style={{ marginBottom: 8 }}>OVERVIEW</div>
          <h1 className="display" style={{ fontSize: "2.4rem", color: "var(--text)" }}>SolarGrid Innovations</h1>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <Badge color="var(--green)">Solar</Badge>
          <Badge color="var(--text-sec)">Seed Stage</Badge>
        </div>
      </div>

      {/* Modern Bento Grid Structure */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gridAutoRows: "minmax(min-content, auto)", gap: 24 }}>
        
        {/* Top Left: Funding Progress (Col Span 2) */}
        <div className="glass glass-hover" style={{ gridColumn: "span 2", padding: 32, animation: "fade-up 0.5s ease 0.1s both", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
            <div className="label">FUNDING PROGRESS</div>
            <DollarSign size={20} color="var(--green)" />
          </div>
          <div>
            <div className="stat-num" style={{ fontSize: "3.5rem" }}>$1.6M</div>
            <div style={{ color: "var(--text-sec)", fontSize: "14px", marginBottom: 20 }}>raised of $2.4M goal</div>
            <div style={{ height: 12, borderRadius: 6, background: "var(--bg)", border: "1px solid var(--border)", overflow: "hidden", position: "relative" }}>
              <div style={{ width: "67%", height: "100%", background: "var(--green)", borderRadius: 6 }} />
            </div>
          </div>
        </div>

        {/* Full-width SDG Impact Panel */}
        <div className="glass glass-hover" style={{ gridColumn: "span 4", padding: 36, animation: "fade-up 0.5s ease 0.2s both" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
            <div>
              <div className="label" style={{ marginBottom: 8 }}>UN SDG CLIMATE IMPACT ASSESSMENT</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
                <div className="stat-num" style={{ color: "var(--cyan)", fontSize: "3.8rem" }}>81</div>
                <div style={{ color: "var(--text-sec)", fontSize: "1rem" }}>/100 Composite Score</div>
                <div style={{ padding: "4px 12px", background: "rgba(15,76,92,0.1)", border: "1px solid var(--cyan)", borderRadius: "20px", fontSize: "11px", color: "var(--cyan)", fontFamily: "JetBrains Mono", marginLeft: 8 }}>HIGH IMPACT</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
              <div style={{ textAlign: "center" }}>
                <div className="mono" style={{ fontSize: "1.6rem", color: "var(--green)", fontWeight: 600 }}>14,520</div>
                <div style={{ fontSize: "10px", color: "var(--text-sec)", textTransform: "uppercase", letterSpacing: "0.08em" }}>tCO₂e Avoided / yr</div>
              </div>
              <div style={{ width: 1, height: 40, background: "var(--border)" }} />
              <div style={{ textAlign: "center" }}>
                <div className="mono" style={{ fontSize: "1.6rem", color: "var(--amber)", fontWeight: 600 }}>8,400</div>
                <div style={{ fontSize: "10px", color: "var(--text-sec)", textTransform: "uppercase", letterSpacing: "0.08em" }}>MWh / yr Generated</div>
              </div>
              <div style={{ width: 1, height: 40, background: "var(--border)" }} />
              <div style={{ textAlign: "center" }}>
                <div className="mono" style={{ fontSize: "1.6rem", color: "var(--red)", fontWeight: 600 }}>1,240</div>
                <div style={{ fontSize: "10px", color: "var(--text-sec)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Households Powered</div>
              </div>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {/* Left: Per-SDG Goal Breakdown */}
            <div>
              <div className="label" style={{ marginBottom: 16 }}>SDG GOAL PERFORMANCE</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { goal: "SDG 7", name: "Affordable & Clean Energy", score: 88, color: "var(--amber)", icon: "⚡", desc: "Solar micro-grid deployment across 3 rural regions" },
                  { goal: "SDG 13", name: "Climate Action", score: 79, color: "var(--green)", icon: "🌍", desc: "Direct GHG displacement from fossil fuel substitution" },
                  { goal: "SDG 11", name: "Sustainable Cities", score: 71, color: "var(--cyan)", icon: "🏙️", desc: "Urban rooftop integration reducing grid strain" },
                  { goal: "SDG 9", name: "Industry & Innovation", score: 66, color: "var(--purple)", icon: "⚙️", desc: "Proprietary inverter technology patented in 4 markets" },
                  { goal: "SDG 17", name: "Partnerships for Goals", score: 58, color: "var(--red)", icon: "🤝", desc: "Active MoUs with 2 national utility companies" },
                ].map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ fontSize: "1.1rem", flexShrink: 0 }}>{s.icon}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                        <div>
                          <span className="mono" style={{ fontSize: "11px", color: s.color, fontWeight: 600 }}>{s.goal}</span>
                          <span style={{ fontSize: "12px", color: "var(--text)", marginLeft: 8 }}>{s.name}</span>
                        </div>
                        <span className="mono" style={{ fontSize: "12px", color: s.color, fontWeight: 700 }}>{s.score}</span>
                      </div>
                      <div style={{ height: 6, background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 3, overflow: "hidden" }}>
                        <div style={{ width: `${s.score}%`, height: "100%", background: s.color, borderRadius: 3, transition: "width 1s ease" }} />
                      </div>
                      <div style={{ fontSize: "10px", color: "var(--text-muted)", marginTop: 4 }}>{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: CO2 Trajectory + Mini Rings */}
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <div className="label" style={{ marginBottom: 14 }}>CO₂e AVOIDANCE TRAJECTORY (tCO₂e)</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    { year: "2023", val: 4200, max: 20000 }, { year: "2024", val: 9800, max: 20000 },
                    { year: "2025", val: 14520, max: 20000 }, { year: "2026", val: 18400, max: 20000, proj: true },
                    { year: "2027", val: 20000, max: 20000, proj: true },
                  ].map((yr, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div className="mono" style={{ fontSize: "10px", color: "var(--text-sec)", width: 32, flexShrink: 0 }}>{yr.year}</div>
                      <div style={{ flex: 1, height: 18, background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 4, overflow: "hidden", position: "relative" }}>
                        <div style={{
                          width: `${(yr.val / yr.max) * 100}%`, height: "100%",
                          background: yr.proj ? `repeating-linear-gradient(45deg, var(--cyan), var(--cyan) 4px, transparent 4px, transparent 8px)` : "var(--cyan)",
                          borderRadius: 4, opacity: yr.proj ? 0.5 : 1
                        }} />
                      </div>
                      <div className="mono" style={{ fontSize: "10px", color: yr.proj ? "var(--text-muted)" : "var(--cyan)", width: 44, textAlign: "right", flexShrink: 0 }}>
                        {(yr.val / 1000).toFixed(1)}k{yr.proj ? "*" : ""}
                      </div>
                    </div>
                  ))}
                  <div style={{ fontSize: "9px", color: "var(--text-muted)", marginTop: 4 }}>* Projected values based on expansion roadmap</div>
                </div>
              </div>

              <div style={{ borderTop: "1px solid var(--border)", paddingTop: 20 }}>
                <div className="label" style={{ marginBottom: 12 }}>SDG RING SCORES</div>
                <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                  <ProgressRing value={88} size={72} color="var(--amber)" label="SDG 7" stroke={7} />
                  <ProgressRing value={79} size={72} color="var(--green)" label="SDG 13" stroke={7} />
                  <ProgressRing value={71} size={72} color="var(--cyan)" label="SDG 11" stroke={7} />
                  <ProgressRing value={66} size={72} color="var(--purple)" label="SDG 9" stroke={7} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Left: Risk Intelligence (Col Span 1, Row Span 2) */}
        <div className="glass glass-hover" style={{ gridColumn: "span 1", gridRow: "span 2", padding: 32, animation: "fade-up 0.5s ease 0.3s both" }}>
          <div className="label" style={{ marginBottom: 24 }}>RISK INTELLIGENCE</div>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
            <ProgressRing value={73} size={140} color="var(--red)" label="MEDIUM" sublabel="RISK SCORE" stroke={8} />
          </div>
          <div className="label" style={{ marginBottom: 16 }}>XGBoost SHAP Factors</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {riskData.map((r, i) => (
              <div key={i}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", marginBottom: 6, color: "var(--text)", fontFamily: "Figtree" }}>
                  <span>{r.name}</span>
                  <span style={{ color: r.dir > 0 ? "var(--red)" : "var(--green)", fontFamily: "JetBrains Mono" }}>{r.impact > 0 ? "+" : ""}{r.impact}</span>
                </div>
                <div style={{ height: 4, background: "var(--bg)", border: "1px solid var(--border)", borderRadius: 2 }}>
                  <div style={{ width: `${Math.abs(r.impact) * 200}%`, height: "100%", background: r.dir > 0 ? "var(--red)" : "var(--green)", borderRadius: 2 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Middle Right: Investor Matches List (Col Span 3, Row Span 2)  */}
        <div className="glass glass-hover" style={{ gridColumn: "span 3", gridRow: "span 2", padding: 32, animation: "fade-up 0.5s ease 0.4s both", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <div className="label">ACTIVE INVESTOR MATCHES</div>
            <Badge color="var(--green)">14 Matches Found</Badge>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1, overflowY: "auto", paddingRight: "8px" }}>
            {[
              { name: "GreenFund Capital", org: "London, UK", score: 94, sector: "Solar", stage: "Seed", color: "var(--green)" },
              { name: "Climate Ventures", org: "Berlin, DE", score: 87, sector: "Wind", stage: "Series A", color: "var(--cyan)" },
              { name: "SDG Impact Fund", org: "Nairobi, KE", score: 82, sector: "Solar", stage: "Seed", color: "var(--amber)" },
              { name: "TerraNova Partners", org: "New York, USA", score: 79, sector: "CleanTech", stage: "Seed", color: "var(--purple)" }
            ].map((m, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", background: "var(--bg)", borderRadius: "16px 4px 16px 4px", border: "1px solid var(--border)" }}>
                 <div style={{ width: 44, height: 44, borderRadius: "50%", background: m.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, opacity: 0.15, marginLeft: -52, position: "absolute" }}></div>
                 <div style={{ width: 44, height: 44, borderRadius: "10px 4px 10px 4px", background: "var(--surface)", border: `1px solid ${m.color}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span className="mono" style={{ fontSize: "14px", color: m.color, fontWeight: 500 }}>{m.name[0]}{m.name.split(" ")[1]?.[0]}</span>
                 </div>
                 <div style={{ flex: 1 }}>
                    <div className="display" style={{ fontSize: "1.1rem", color: "var(--text)", marginBottom: 4 }}>{m.name}</div>
                    <div style={{ fontSize: "12px", color: "var(--text-sec)" }}>{m.org} · <span style={{ color: "var(--green)" }}>{m.sector}</span></div>
                 </div>
                 <div style={{ textAlign: "right" }}>
                   <div className="mono" style={{ fontSize: "1.2rem", color: m.color, fontWeight: 500 }}>{m.score}%</div>
                   <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>Match</div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── INVESTOR DASHBOARD ───────────────────────────────────────────────────────
function InvestorDashboard() {
  const [activeTab, setActiveTab] = useState("matches");
  const sectorData = [
    { name: "Solar", value: 38, color: "var(--amber)" },
    { name: "Wind", value: 24, color: "var(--cyan)" },
    { name: "Carbon Capture", value: 18, color: "var(--green)" },
    { name: "EV Tech", value: 12, color: "var(--purple)" },
    { name: "Green H₂", value: 8, color: "var(--red)" },
  ];
  const investData = [
    { month: "Oct", amt: 1200000 }, { month: "Nov", amt: 2100000 }, { month: "Dec", amt: 2800000 },
    { month: "Jan", amt: 4100000 }, { month: "Feb", amt: 5200000 }, { month: "Mar", amt: 6800000 },
  ];
  const pipeline = [
    { stage: "Proposed", color: "var(--text-sec)", deals: [{ name: "OceanWind Tech", amt: "$3.2M", sector: "Wind" }, { name: "BioFuel AI", amt: "$1.8M", sector: "Other" }] },
    { stage: "Under Review", color: "var(--cyan)", deals: [{ name: "SolarGrid", amt: "$2.4M", sector: "Solar" }] },
    { stage: "Due Diligence", color: "var(--amber)", deals: [{ name: "CarbonX", amt: "$5.0M", sector: "Carbon" }, { name: "GreenH2", amt: "$4.2M", sector: "H₂" }] },
    { stage: "Term Sheet", color: "var(--purple)", deals: [{ name: "EV Matrix", amt: "$7.5M", sector: "EV" }] },
    { stage: "Closed ✓", color: "var(--green)", deals: [{ name: "WindFarm Pro", amt: "$12M", sector: "Wind" }] },
  ];

  return (
    <div style={{ padding: "80px 24px 48px", minHeight: "100vh", zIndex: 1, position: "relative", maxWidth: 1300, margin: "0 auto" }}>
      <div style={{ marginBottom: 24, animation: "fade-up 0.5s ease both" }}>
        <div className="label" style={{ marginBottom: 6 }}>INVESTOR DASHBOARD</div>
        <h1 className="display" style={{ fontSize: "1.8rem", fontWeight: 700, color: "var(--text)" }}>GreenFund Capital <Badge color="var(--cyan)">Impact VC</Badge></h1>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
        <StatCard label="Total Deployed" value="$6.8M" change="+31%" changeUp icon={DollarSign} delay={0} />
        <StatCard label="Active Deals" value="8" change="+3" changeUp icon={Activity} color="var(--cyan)" delay={0.08} />
        <StatCard label="Avg Deal Size" value="$850K" change="+12%" changeUp icon={BarChart2} color="var(--amber)" delay={0.16} />
        <StatCard label="CO₂ Avoided" value="42k t" change="+18%" changeUp icon={Leaf} color="var(--green)" delay={0.24} />
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
        {["matches","portfolio"].map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{ padding: "8px 20px", borderRadius: 8, border: `1px solid ${activeTab === t ? "rgba(16,185,129,0.3)" : "var(--border)"}`, background: activeTab === t ? "rgba(16,185,129,0.08)" : "transparent", color: activeTab === t ? "var(--green)" : "var(--text-sec)", cursor: "pointer", fontFamily: "Figtree", fontSize: "13px", fontWeight: 500, textTransform: "capitalize", transition: "all 0.2s" }}>
            {t === "matches" ? "🎯 Matches" : "💼 Portfolio"}
          </button>
        ))}
      </div>

      {activeTab === "matches" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 14 }}>
          {[
            { name: "SolarGrid Innovations", org: "Chennai, India", sector: "Solar", trl: 7, goal: "$2.4M", stage: "Seed", score: 94, sdg: [7,13], risk: "Medium", co2: "14.5k tonnes", reasons: ["Both focused on solar sector","Same geography (Asia)","SDG 13 aligned"] },
            { name: "CarbonX Sequestration", org: "Houston, USA", sector: "Carbon Capture", trl: 6, goal: "$5.0M", stage: "Series A", score: 87, sdg: [13,17], risk: "Low", co2: "220k tonnes", reasons: ["High CO₂ impact potential","Series A stage match","Strong IP portfolio"] },
            { name: "GreenH2 Systems", org: "Hamburg, Germany", sector: "Green Hydrogen", trl: 8, goal: "$4.2M", stage: "Series A", score: 82, sdg: [7,13,17], risk: "Low", co2: "28k tonnes", reasons: ["All 3 SDGs aligned","Europe focus match","High TRL = lower risk"] },
          ].map((m, i) => (
            <div key={i} className="glass glass-hover" style={{ padding: "20px 24px", animation: `fade-up 0.4s ease ${0.1 * i}s both`, borderTop: `2px solid ${m.score > 90 ? "var(--green)" : m.score > 84 ? "var(--cyan)" : "var(--amber)"}` }}>
              <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                    <span className="display" style={{ fontWeight: 700, fontSize: "1.05rem", color: "var(--text)" }}>{m.name}</span>
                    <Badge color={m.risk === "Low" ? "var(--green)" : "var(--amber)"}>{m.risk} Risk</Badge>
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--text-sec)", marginBottom: 10 }}>{m.org} · {m.sector} · TRL {m.trl}</div>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {m.sdg.map(s => <Badge key={s} color={s===7?"var(--amber)":s===13?"var(--green)":"var(--cyan)"}>{`SDG ${s}`}</Badge>)}
                    <Badge color="var(--text-sec)">{m.stage}</Badge>
                  </div>
                  <div style={{ marginTop: 12, padding: "8px 12px", borderRadius: 8, background: "var(--surface2)", fontSize: "11px", color: "var(--text-sec)" }}>
                    <span style={{ color: "var(--text-muted)" }}>Why matched: </span>
                    {m.reasons.join(" · ")}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 16, alignItems: "center", flexShrink: 0 }}>
                  <div style={{ textAlign: "center" }}>
                    <ProgressRing value={m.score} size={80} stroke={7} color={m.score > 90 ? "var(--green)" : m.score > 84 ? "var(--cyan)" : "var(--amber)"} />
                    <div style={{ fontSize: "9px", color: "var(--text-sec)", marginTop: 4 }}>Match Score</div>
                  </div>
                  <div>
                    <div className="mono" style={{ fontSize: "1.3rem", fontWeight: 700, color: "var(--green)", marginBottom: 4 }}>{m.goal}</div>
                    <div style={{ fontSize: "11px", color: "var(--text-sec)", marginBottom: 12 }}>Seeking · {m.co2} CO₂</div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button className="btn-ghost" style={{ padding: "8px 14px", fontSize: "12px" }}>View</button>
                      <button className="btn-primary" style={{ padding: "8px 14px", fontSize: "12px" }}>Express Interest</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "portfolio" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20, marginBottom: 20 }}>
            <div className="glass" style={{ padding: 24 }}>
              <div className="label" style={{ marginBottom: 12 }}>Cumulative Investment</div>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={investData}>
                  <defs>
                    <linearGradient id="investGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--green)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="var(--green)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="month" tick={{ fill: "var(--text-sec)", fontSize: 10, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={v => `$${(v/1e6).toFixed(1)}M`} tick={{ fill: "var(--text-sec)", fontSize: 10, fontFamily: "JetBrains Mono" }} axisLine={false} tickLine={false} />
                  <Tooltip formatter={v => [`$${(v/1e6).toFixed(2)}M`, "Deployed"]} contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 11 }} />
                  <Area type="monotone" dataKey="amt" stroke="var(--green)" fill="url(#investGrad)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="glass" style={{ padding: 24 }}>
              <div className="label" style={{ marginBottom: 12 }}>Portfolio by Sector</div>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={sectorData} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={3} dataKey="value">
                    {sectorData.map((e, i) => <Cell key={i} fill={e.color} />)}
                  </Pie>
                  <Tooltip formatter={(v) => [`${v}%`]} contentStyle={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 11 }} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {sectorData.map((s, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: s.color }} />
                    <span style={{ fontSize: "10px", color: "var(--text-sec)" }}>{s.name} {s.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Deal Pipeline Kanban */}
          <div className="glass" style={{ padding: 24 }}>
            <div className="label" style={{ marginBottom: 16 }}>Deal Pipeline</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 10, overflowX: "auto" }}>
              {pipeline.map((col, i) => (
                <div key={i} style={{ minWidth: 150 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, paddingBottom: 8, borderBottom: `2px solid ${col.color}` }}>
                    <span style={{ fontSize: "11px", color: col.color, fontFamily: "JetBrains Mono", fontWeight: 600 }}>{col.stage}</span>
                    <span style={{ width: 18, height: 18, borderRadius: "50%", background: `${col.color}20`, fontSize: "9px", color: col.color, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "JetBrains Mono" }}>{col.deals.length}</span>
                  </div>
                  {col.deals.map((d, j) => (
                    <div key={j} className="glass-hover" style={{ padding: "10px 12px", borderRadius: 8, border: "1px solid var(--border)", marginBottom: 8, background: "var(--surface2)", cursor: "grab" }}>
                      <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--text)", marginBottom: 4 }}>{d.name}</div>
                      <div className="mono" style={{ fontSize: "11px", color: col.color }}>{d.amt}</div>
                      <div style={{ marginTop: 4 }}><Badge color="var(--text-sec)">{d.sector}</Badge></div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── DUE DILIGENCE ────────────────────────────────────────────────────────────
function DueDiligence() {
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: "system", text: "Document indexed successfully. 24 pages · Mistral 7B ready. Ask anything about SolarGrid's pitch deck." },
    { role: "user", text: "What is the projected monthly burn rate?" },
    { role: "ai", text: "Based on the financial projections on page 14, SolarGrid's current monthly burn rate is $42,000, primarily driven by R&D salaries.", sources: [{ page: 14 }], confidence: "HIGH" },
  ]);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: "user", text: input }]);
    setInput("");
    setTimeout(() => {
      setMessages(m => [...m, { role: "ai", text: "Based on the document context, this is a simulated response generated for the new UI structural preview.", confidence: "MEDIUM" }]);
    }, 1000);
  };

  return (
    <div style={{ padding: "80px 40px", minHeight: "100vh", position: "relative", maxWidth: 1200, margin: "0 auto", paddingBottom: 120 }}>
      {/* Full Bleed Document Viewer Area */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
        <div>
           <div className="label" style={{ marginBottom: 8 }}>DOCUMENT ANALYSIS</div>
           <h1 className="display" style={{ fontSize: "2rem" }}>SolarGrid_Pitch_Deck_2025.pdf</h1>
        </div>
        <button className="btn-primary" onClick={() => setChatOpen(true)}>
          <MessageSquare size={16} style={{ marginRight: 8, verticalAlign: "middle" }} /> Open AI Assistant
        </button>
      </div>

      <div className="glass" style={{ height: "65vh", padding: 40, borderStyle: "dashed", borderColor: "var(--text-muted)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <FileText size={64} color="var(--green)" style={{ marginBottom: 24, opacity: 0.2 }} />
        <h2 className="display" style={{ fontSize: "1.8rem", color: "var(--text-sec)", marginBottom: 12 }}>Document Render View</h2>
        <p style={{ color: "var(--text-muted)" }}>24 pages · PDF automatically indexed by Mistral 7B RAG pipeline.</p>
      </div>

      {/* Sliding Drawer for Chat */}
      <div style={{
        position: "fixed", top: 0, right: chatOpen ? 0 : "-500px", width: "480px", height: "100vh",
        background: "var(--surface)", borderLeft: "1px solid var(--border)",
        boxShadow: chatOpen ? "-20px 0 60px rgba(0,0,0,0.05)" : "none",
        transition: "all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1)", zIndex: 10000,
        display: "flex", flexDirection: "column"
      }}>
        {/* Drawer Header */}
        <div style={{ padding: "24px 32px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--bg)" }}>
          <div>
            <div className="display" style={{ fontSize: "1.2rem", color: "var(--green)" }}>Due Diligence AI</div>
            <div className="label" style={{ fontSize: "9px" }}>Mistral 7B · RAG Active</div>
          </div>
          <button className="btn-ghost" style={{ padding: "8px 12px" }} onClick={() => setChatOpen(false)}>
            <X size={16} />
          </button>
        </div>

        {/* Drawer Chat Body */}
        <div style={{ flex: 1, padding: "32px", overflowY: "auto", background: "var(--surface)" }}>
          {messages.map((m, i) => (
            <div key={i} style={{ marginBottom: 24, display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", animation: "fade-up 0.3s ease both" }}>
              {m.role === "system" && (
                 <div className="label" style={{ background: "var(--bg)", padding: "12px 16px", borderRadius: "8px", border: "1px solid var(--border)", color: "var(--text-sec)", textTransform: "none", letterSpacing: "normal" }}>{m.text}</div>
              )}
              {m.role === "user" && (
                 <div style={{ background: "var(--green)", color: "var(--bg)", padding: "12px 16px", borderRadius: "16px 4px 16px 16px", fontSize: "14px", fontFamily: "Figtree", maxWidth: "80%" }}>{m.text}</div>
              )}
              {m.role === "ai" && (
                 <div style={{ background: "var(--surface2)", border: "1px solid var(--border)", padding: "16px 20px", borderRadius: "4px 16px 16px 16px", maxWidth: "90%" }}>
                   <p style={{ fontSize: "14px", color: "var(--text)", lineHeight: 1.6, marginBottom: m.sources ? 12 : 0 }}>{m.text}</p>
                   {m.sources && (
                     <div style={{ display: "flex", gap: 8 }}>
                       {m.sources.map((s, j) => (
                         <Badge key={j} color="var(--purple)">Page {s.page}</Badge>
                       ))}
                     </div>
                   )}
                 </div>
              )}
            </div>
          ))}
        </div>

        {/* Drawer Chat Input */}
        <div style={{ padding: "24px 32px", borderTop: "1px solid var(--border)", background: "var(--bg)" }}>
          <div style={{ display: "flex", gap: 12 }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Ask about the document..." style={{ flex: 1, padding: "14px 20px", borderRadius: "24px 8px 24px 8px", border: "1px solid var(--border)", background: "var(--surface)", fontFamily: "Figtree", outline: "none" }} />
            <button className="btn-primary" style={{ padding: "14px", borderRadius: "12px 4px 12px 4px", display: "flex", alignItems: "center" }} onClick={send}>
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Dim Overlay when drawer is open */}
      <div style={{
        position: "fixed", inset: 0, background: "rgba(28, 35, 33, 0.2)", backdropFilter: "blur(2px)",
        opacity: chatOpen ? 1 : 0, pointerEvents: chatOpen ? "auto" : "none", transition: "opacity 0.4s ease", zIndex: 9999
      }} onClick={() => setChatOpen(false)} />
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("landing");

  const renderPage = () => {
    switch (page) {
      case "landing": return <Landing setPage={setPage} />;
      case "login": return <AuthPage mode="login" setPage={setPage} />;
      case "register": return <AuthPage mode="register" setPage={setPage} />;
      case "startup": return <StartupDashboard />;
      case "investor": return <InvestorDashboard />;
      case "dd": return <DueDiligence />;
      default: return <Landing setPage={setPage} />;
    }
  };

  return (
    <>
      <FontStyle />
      <div style={{ minHeight: "100vh", background: "var(--bg)", position: "relative" }}>
        <ParticleCanvas density={page === "landing" ? 90 : 50} />
        {/* Ambient orbs */}
        <div style={{ position: "fixed", top: "20%", left: "10%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
        <div style={{ position: "fixed", bottom: "30%", right: "8%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,233,0.03) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
        <FloatingDock page={page} setPage={setPage} />
        <div style={{ position: "relative", zIndex: 1 }}>
          {renderPage()}
        </div>
      </div>
    </>
  );
}
