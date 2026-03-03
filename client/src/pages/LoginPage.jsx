import { useState, useEffect, useRef } from "react";
import Aurora from "../components/Aurora";

const ADMIN_EMAIL = "admin@admin.com";
const ADMIN_PASSWORD = "admin";

function SplitText({ text, className, style, delay = 0, stagger = 40 }) {
  const [visible, setVisible] = useState([]);
  useEffect(() => {
    const timers = text
      .split("")
      .map((_, i) =>
        setTimeout(() => setVisible((v) => [...v, i]), delay + i * stagger),
      );
    return () => timers.forEach(clearTimeout);
  }, [text, delay, stagger]);
  return (
    <span className={className} style={style}>
      {text.split("").map((char, i) => (
        <span key={i} style={{
          display: "inline-block",
          opacity: visible.includes(i) ? 1 : 0,
          transform: visible.includes(i) ? "translateY(0)" : "translateY(14px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
          whiteSpace: char === " " ? "pre" : "normal",
        }}>
          {char}
        </span>
      ))}
    </span>
  );
}

function BlurIn({ children, delay = 0, className, style }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div className={className} style={{
      ...style,
      opacity: show ? 1 : 0,
      filter: show ? "blur(0px)" : "blur(10px)",
      transform: show ? "translateY(0)" : "translateY(8px)",
      transition: "opacity 0.8s ease, filter 0.8s ease, transform 0.8s ease",
    }}>
      {children}
    </div>
  );
}

function PulseDot({ color = "#7cff67" }) {
  return (
    <span style={{ position: "relative", display: "inline-block", width: 8, height: 8 }}>
      <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: color, animation: "pulse-ring 2s ease infinite" }} />
      <span style={{ position: "absolute", inset: 1, borderRadius: "50%", background: color }} />
    </span>
  );
}

export default function LoginPage({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focusField, setFocusField] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  useEffect(() => {
    const handleMove = (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      setMousePos({ x: dx * 4, y: dy * 4 });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("All fields required.");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));

    // TODO: swap this block with real API call when backend is ready:
    // const res = await fetch("http://localhost:8080/api/auth/login", {
    //   method: "POST", headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email, password }),
    // });
    // if (!res.ok) { setError("Invalid credentials."); setLoading(false); return; }
    // const { token } = await res.json();
    // localStorage.setItem("token", token);
    // onLogin();

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      localStorage.setItem("token", "hardcoded-admin-token");
      onLogin();
    } else {
      setError("Invalid email or password.");
    }
    setLoading(false);
  };

  const inputStyle = (field) => ({
    width: "100%",
    background: focusField === field ? "rgba(44,0,219,0.08)" : "rgba(255,255,255,0.03)",
    border: focusField === field ? "1px solid rgba(124,255,103,0.4)" : "1px solid rgba(255,255,255,0.08)",
    borderRadius: 10,
    padding: "13px 16px 13px 44px",
    color: "#f5faf4",
    fontSize: 14,
    fontFamily: "'DM Sans', sans-serif",
    outline: "none",
    transition: "all 0.4s ease",
    boxShadow: focusField === field ? "0 0 0 3px rgba(44,0,219,0.12), inset 0 1px 0 rgba(255,255,255,0.05)" : "none",
    letterSpacing: "0.01em",
  });

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden", background: "#020008" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(300%); } }
        @keyframes pulse-ring { 0%,100% { transform:scale(1);opacity:1; } 50% { transform:scale(2.2);opacity:0; } }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes breathe { 0%,100% { opacity:0.25; } 50% { opacity:0.5; } }
        @keyframes float-up { 0% { transform:translateY(0) translateX(0);opacity:0; } 20%{opacity:1;} 80%{opacity:0.5;} 100%{transform:translateY(-130px) translateX(20px);opacity:0; } }
        .enter-btn:hover { box-shadow: 0 0 48px rgba(44,0,219,0.55), 0 0 90px rgba(44,0,219,0.2) !important; transform: translateY(-2px) !important; }
        .enter-btn:active { transform: translateY(0) !important; }
        ::placeholder { color: rgba(179,178,184,0.3) !important; }
      `}</style>

      {/* Aurora BG */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Aurora colorStops={["#f5faf4", "#b3b2b8", "#2c00db"]} blend={0.5} amplitude={1.0} speed={1} />
      </div>

      {/* Overlay */}
      <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(170deg, rgba(2,0,8,0.5) 0%, rgba(2,0,8,0.2) 35%, rgba(2,0,8,0.78) 75%, rgba(2,0,8,0.97) 100%)" }} />

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{
          position: "absolute", zIndex: 2,
          width: i % 3 === 0 ? 3 : 2, height: i % 3 === 0 ? 3 : 2,
          borderRadius: "50%",
          background: i % 2 === 0 ? "rgba(124,255,103,0.8)" : "rgba(44,0,219,0.9)",
          left: `${12 + i * 10}%`, bottom: `${18 + (i % 4) * 9}%`,
          animation: `float-up ${4 + i * 0.7}s ease ${i * 0.9}s infinite`,
        }} />
      ))}

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>

        <BlurIn delay={200}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 100, background: "rgba(124,255,103,0.05)", border: "1px solid rgba(124,255,103,0.14)", marginBottom: 28 }}>
            <PulseDot color="#7cff67" />
            <span style={{ color: "rgba(124,255,103,0.65)", fontSize: 11, fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.14em", textTransform: "uppercase" }}>
              Systems Online
            </span>
          </div>
        </BlurIn>

        <div style={{ textAlign: "center", marginBottom: 6 }}>
          <SplitText text="HOMAS" delay={400} stagger={60}
            style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, lineHeight: 1, color: "#f5faf4", fontSize: "clamp(3.8rem, 9vw, 6.5rem)", display: "block" }} />
        </div>

        <BlurIn delay={950}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(0.95rem, 2vw, 1.2rem)", fontStyle: "italic", fontWeight: 300, color: "rgba(179,178,184,0.55)", letterSpacing: "0.14em", textAlign: "center", marginBottom: 40 }}>
            Hospital Management System <br />
            Administrative Access Portal.
          </p>
        </BlurIn>

        <BlurIn delay={1150} style={{ width: "100%", maxWidth: 400 }}>
          <div ref={cardRef} style={{
            background: "rgba(255,255,255,0.04)", backdropFilter: "blur(32px)", WebkitBackdropFilter: "blur(32px)",
            border: "1px solid rgba(255,255,255,0.07)", borderRadius: 20, padding: "36px 32px",
            transform: `perspective(900px) rotateX(${-mousePos.y * 0.35}deg) rotateY(${mousePos.x * 0.35}deg)`,
            transition: "transform 0.15s ease",
            boxShadow: "0 32px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.05)",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: 1, background: "linear-gradient(90deg, transparent, rgba(124,255,103,0.35), rgba(44,0,219,0.45), transparent)" }} />
            <div style={{ position: "relative", height: 1, overflow: "hidden", opacity: 0.35, marginBottom: 28 }}>
              <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.1)" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, rgba(124,255,103,0.7), rgba(44,0,219,0.7), transparent)", animation: "shimmer 4s ease 1.5s infinite" }} />
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ position: "relative" }}>
                <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", opacity: focusField === "email" ? 0.65 : 0.25, transition: "opacity 0.3s" }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#b3b2b8" strokeWidth="1.5">
                  <rect x="2" y="4" width="20" height="16" rx="3" /><path d="m2 7 10 7 10-7" />
                </svg>
                <input type="email" placeholder="admin@medicore.com" value={email} onChange={(e) => setEmail(e.target.value)} onFocus={() => setFocusField("email")} onBlur={() => setFocusField(null)} style={inputStyle("email")} autoComplete="email" />
              </div>

              <div style={{ position: "relative" }}>
                <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", opacity: focusField === "password" ? 0.65 : 0.25, transition: "opacity 0.3s" }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#b3b2b8" strokeWidth="1.5">
                  <rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <input type={showPassword ? "text" : "password"} placeholder="••••••••••" value={password} onChange={(e) => setPassword(e.target.value)} onFocus={() => setFocusField("password")} onBlur={() => setFocusField(null)} style={{ ...inputStyle("password"), paddingRight: 44 }} autoComplete="current-password" />
                <button type="button" onClick={() => setShowPassword((p) => !p)} tabIndex={-1} style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", opacity: 0.3, padding: 2 }}>
                  {showPassword
                    ? <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f5faf4" strokeWidth="1.5"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                    : <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f5faf4" strokeWidth="1.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  }
                </button>
              </div>

              {error && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#ff7070", fontSize: 12, fontFamily: "'DM Sans', sans-serif" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  {error}
                </div>
              )}

              <div style={{ height: 6 }} />

              <button type="submit" disabled={loading} className="enter-btn" style={{
                width: "100%", padding: "14px", borderRadius: 10,
                border: "1px solid rgba(44,0,219,0.55)",
                background: loading ? "rgba(44,0,219,0.25)" : "linear-gradient(135deg, rgba(44,0,219,0.88) 0%, rgba(82,39,255,0.72) 50%, rgba(44,0,219,0.88) 100%)",
                color: "#f5faf4", fontSize: 12, fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                letterSpacing: "0.12em", textTransform: "uppercase",
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                transition: "all 0.3s ease", boxShadow: "0 4px 28px rgba(44,0,219,0.28)",
                position: "relative", overflow: "hidden",
              }}>
                {!loading && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.07) 50%, transparent 60%)", animation: "shimmer 3.5s ease 2.5s infinite" }} />}
                {loading ? (
                  <><span style={{ width: 15, height: 15, borderRadius: "50%", border: "2px solid rgba(245,250,244,0.25)", borderTopColor: "#f5faf4", animation: "spin 0.8s linear infinite", display: "inline-block" }} /><span>Authenticating</span></>
                ) : (
                  <><span>Enter Portal</span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg></>
                )}
              </button>
            </form>

            <div style={{ marginTop: 28, position: "relative", height: 1, overflow: "hidden", opacity: 0.25 }}>
              <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.1)" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, transparent, rgba(44,0,219,0.8), transparent)", animation: "shimmer 4s ease 0.8s infinite" }} />
            </div>
            <p style={{ marginTop: 14, textAlign: "center", color: "rgba(179,178,184,0.22)", fontSize: 10, fontFamily: "monospace", letterSpacing: "0.1em", animation: "breathe 5s ease infinite" }}>
              AUTHORIZED PERSONNEL ONLY
            </p>
          </div>
        </BlurIn>

        <BlurIn delay={1600}>
          <div style={{ marginTop: 28, display: "flex", alignItems: "center", gap: 12, color: "rgba(179,178,184,0.18)", fontSize: 11, fontFamily: "monospace", letterSpacing: "0.06em" }}>
            <span>v1.0.0</span><span>·</span><span>© 2025 HOMAS</span><span>·</span><span>HMS</span>
          </div>
        </BlurIn>
      </div>
    </div>
  );
}