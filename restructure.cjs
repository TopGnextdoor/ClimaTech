const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'ClimaTech.jsx');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Replace Nav with FloatingDock
const floatingDockStr = `// ─── Floating Dock Navigation ───────────────────────────────────────────────────────────────
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
}`;

content = content.replace(/\/\/ ─── Navigation ──[\s\S]*?function Nav\(\{ page, setPage \}\) \{[\s\S]*?\}\);?\n\}/s, floatingDockStr);


// 2. Replace Landing with 50/50 Split Landing
const splitLandingStr = `// ─── LANDING PAGE ─────────────────────────────────────────────────────────────
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
                <div style={{ width: 56, height: 56, borderRadius: "16px 4px 16px 4px", background: \`\${f.color}15\`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
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
}`;

content = content.replace(/\/\/ ─── LANDING PAGE ──[\s\S]*?function Landing\(\{ setPage \}\) \{[\s\S]*?\/\/ ─── AUTH PAGES ──/s, splitLandingStr + "\n\n// ─── AUTH PAGES ──");

// 3. Bento Box StartupDashboard
const startupBentoStr = `// ─── STARTUP DASHBOARD ────────────────────────────────────────────────────────
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

        {/* Top Right: SDG Impact (Col Span 2) */}
        <div className="glass glass-hover" style={{ gridColumn: "span 2", padding: 32, animation: "fade-up 0.5s ease 0.2s both" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
            <div className="label">CLIMATE IMPACT</div>
            <Leaf size={20} color="var(--cyan)" />
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ flex: 1, paddingRight: 24 }}>
              <div className="stat-num" style={{ color: "var(--cyan)", fontSize: "3rem" }}>81<span style={{ fontSize: "1.2rem", color: "var(--text-sec)" }}>/100</span></div>
              <div style={{ color: "var(--text-sec)", fontSize: "14px", marginBottom: 16 }}>Overall Transformative Score</div>
              <div style={{ display: "flex", gap: 16 }}>
                <div>
                   <div className="mono" style={{ color: "var(--text)", fontWeight: 500 }}>4,200</div>
                   <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>Trees/yr</div>
                </div>
                <div>
                   <div className="mono" style={{ color: "var(--text)", fontWeight: 500 }}>14.5k</div>
                   <div style={{ fontSize: "10px", color: "var(--text-muted)" }}>tCO2e</div>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 16 }}>
              <ProgressRing value={88} size={70} color="var(--amber)" label="SDG 7" stroke={6} />
              <ProgressRing value={79} size={70} color="var(--green)" label="SDG 13" stroke={6} />
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
                  <div style={{ width: \`\${Math.abs(r.impact) * 200}%\`, height: "100%", background: r.dir > 0 ? "var(--red)" : "var(--green)", borderRadius: 2 }} />
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
                 <div style={{ width: 44, height: 44, borderRadius: "10px 4px 10px 4px", background: "var(--surface)", border: \`1px solid \${m.color}\`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
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
}`;

content = content.replace(/\/\/ ─── STARTUP DASHBOARD ──[\s\S]*?function StartupDashboard\(\) \{[\s\S]*?\/\/ ─── INVESTOR DASHBOARD/s, startupBentoStr + "\n\n// ─── INVESTOR DASHBOARD");


// 4. Overlap Drawer DueDiligence
const ddDrawerStr = `// ─── DUE DILIGENCE ────────────────────────────────────────────────────────────
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
}`;

content = content.replace(/\/\/ ─── DUE DILIGENCE ──[\s\S]*?function DueDiligence\(\) \{[\s\S]*?\/\/ ─── ROOT APP/s, ddDrawerStr + "\n\n// ─── ROOT APP");


// 5. App level Nav Swap - Ensure we call <FloatingDock> instead of <Nav>
content = content.replace(/<Nav page=\{page\} setPage=\{setPage\} \/>/g, '<FloatingDock page={page} setPage={setPage} />');

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Structural refactor complete!');
